const http = require('node:http');
const url = require('node:url');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { exec } = require('node:child_process');

const PRIMARY_PORT = parseInt(process.env.WEB_PORT || '5175', 10);
const FALLBACK_PORTS = [80];
const DIST_DIR = path.resolve(__dirname, '../dist');

const MIMES = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function getLocalIp() {
  try {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
          return net.address;
        }
      }
    }
  } catch {}
  return '127.0.0.1';
}

function handleStaticRequest(req, res) {
  const parsed = url.parse(req.url);
  let pathname = decodeURIComponent(parsed.pathname || '/');

  if (pathname === '/') pathname = '/index.html';
  let filePath = path.join(DIST_DIR, pathname);

  // If path has no extension and file does not exist, serve index.html (SPA routing)
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    if (path.extname(pathname) === '') {
      filePath = path.join(DIST_DIR, 'index.html');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const mime = MIMES[ext] || 'application/octet-stream';

  try {
    const stat = fs.statSync(filePath);
    const range = req.headers.range;

    // Handle range requests for audio/video media
    if (range && (ext === '.mp3' || ext === '.mp4')) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = end - start + 1;
      const stream = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': mime,
        'Access-Control-Allow-Origin': '*'
      });
      stream.pipe(res);
      return;
    }

    const content = fs.readFileSync(filePath);
    const headers = {
      'Content-Type': mime,
      'Content-Length': stat.size,
      'Access-Control-Allow-Origin': '*'
    };
    if (ext === '.html') {
      headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      headers['Pragma'] = 'no-cache';
      headers['Expires'] = '0';
    }
    res.writeHead(200, headers);
    res.end(content);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}

// Start listeners across primary port and fallback ports
const activeServers = [];
const activePorts = new Set();

function startServer(port, host = null) {
  const s = http.createServer(handleStaticRequest);
  s.on('error', () => {
    // Port in use or host unavailable; ignore gracefully
  });
  
  if (host) {
    s.listen(port, host, () => {
      activePorts.add(port);
    });
  } else {
    // Dual-stack (IPv4 + IPv6 localhost)
    s.listen(port, () => {
      activePorts.add(port);
    });
  }
  activeServers.push(s);
}

// 1. Listen on Primary Port 5175 (dual-stack + explicit 0.0.0.0 + explicit 127.0.0.1)
startServer(PRIMARY_PORT);
startServer(PRIMARY_PORT, '0.0.0.0');
startServer(PRIMARY_PORT, '127.0.0.1');

// 2. Also attempt fallback ports 5173, 5174, 80 so any URL works
for (const p of FALLBACK_PORTS) {
  if (p !== PRIMARY_PORT) {
    startServer(p);
    startServer(p, '0.0.0.0');
  }
}

const localIp = getLocalIp();
console.log('==========================================================');
console.log('  🎉 CS313 法语研习社 - 本地服务已成功就绪！');
console.log(`  💻 电脑推荐访问: http://localhost:${PRIMARY_PORT}/`);
console.log(`  🌐 本地备用直达: http://127.0.0.1:${PRIMARY_PORT}/`);
console.log(`  📱 手机局域网访问: http://${localIp}:${PRIMARY_PORT}/`);
console.log('==========================================================');

// Auto-open browser if --open flag is passed
if (process.argv.includes('--open')) {
  setTimeout(() => {
    exec(`start http://localhost:${PRIMARY_PORT}/`);
  }, 600);
}

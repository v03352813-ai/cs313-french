/**
 * CS313 法语研习社 · 原生 SQLite 高性能云数据库核心模块
 * 基于 Node.js 22 内置的 node:sqlite 引擎，启用 WAL 极速高并发事务模式
 */
const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const DB_DIR = path.resolve(__dirname, 'data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_PATH = path.join(DB_DIR, 'cs313_french.db');
const db = new DatabaseSync(DB_PATH);

// 1. 启用 WAL 高性能并发读写模式
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA synchronous = NORMAL;');

// 2. 初始化 5 大核心业务数据表
db.exec(`
  -- 表 1: 卡密与设备鉴权表 (严格限制 2 台设备)
  CREATE TABLE IF NOT EXISTS card_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_key TEXT UNIQUE NOT NULL,
    tier TEXT NOT NULL DEFAULT 'fr_lifetime',
    status TEXT NOT NULL DEFAULT 'active',
    batch_no TEXT NOT NULL DEFAULT '2026-FR-OFFICIAL',
    price REAL NOT NULL DEFAULT 49.9,
    bound_devices TEXT NOT NULL DEFAULT '[]',
    activated_at TEXT,
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_fr_card_key ON card_keys(card_key);

  -- 表 2: 学员账号表
  CREATE TABLE IF NOT EXISTS students (
    user_id TEXT PRIMARY KEY,
    card_key TEXT,
    nickname TEXT NOT NULL DEFAULT '法语研习社学员',
    current_device_id TEXT,
    created_at TEXT NOT NULL,
    last_active_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_fr_student_key ON students(card_key);

  -- 表 3: 学习进度与单词/语法多端同步表
  CREATE TABLE IF NOT EXISTS study_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT UNIQUE NOT NULL,
    mastered_vocab_ids TEXT NOT NULL DEFAULT '[]',
    mastered_grammar_ids TEXT NOT NULL DEFAULT '[]',
    study_streak INTEGER NOT NULL DEFAULT 0,
    last_checkin_date TEXT,
    custom_notes TEXT NOT NULL DEFAULT '{}',
    updated_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_fr_progress_user ON study_progress(user_id);

  -- 表 4: 真题答卷、得分与智能错题本表
  CREATE TABLE IF NOT EXISTS exam_records (
    record_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    paper_id TEXT NOT NULL,
    paper_title TEXT NOT NULL,
    score INTEGER NOT NULL,
    total_score INTEGER NOT NULL DEFAULT 100,
    time_spent_sec INTEGER NOT NULL DEFAULT 0,
    user_answers TEXT NOT NULL DEFAULT '{}',
    wrong_question_ids TEXT NOT NULL DEFAULT '[]',
    submitted_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_fr_exam_user ON exam_records(user_id);
  CREATE INDEX IF NOT EXISTS idx_fr_exam_paper ON exam_records(paper_id);

  -- 表 5: 云端新真题与内容增量更新表
  CREATE TABLE IF NOT EXISTS dynamic_content_updates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL,
    title TEXT NOT NULL,
    version INTEGER NOT NULL UNIQUE,
    payload TEXT NOT NULL,
    is_published INTEGER NOT NULL DEFAULT 1,
    published_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_fr_updates_version ON dynamic_content_updates(version);
`);

// 3. 预置种子卡密库
function seedDefaultCards() {
  const checkStmt = db.prepare('SELECT COUNT(*) as count FROM card_keys');
  const result = checkStmt.get();
  if (result.count === 0) {
    const now = new Date().toISOString();
    const seedCards = [
      { key: 'CS313-FR-8888-A1B2', tier: 'fr_lifetime', batch: '2026-OFFICIAL-01', price: 49.9 },
      { key: 'CS313-FR-9999-C3D4', tier: 'fr_lifetime', batch: '2026-OFFICIAL-01', price: 49.9 },
      { key: 'CS313-FR-7777-E5F6', tier: 'fr_lifetime', batch: '2026-OFFICIAL-01', price: 49.9 },
      { key: 'CS313-FRENCH-VIP', tier: 'fr_lifetime', batch: '2026-OFFICIAL-01', price: 49.9 },
      { key: 'BONJOUR-FRANCE-2026', tier: 'fr_lifetime', batch: '2026-OFFICIAL-01', price: 49.9 }
    ];

    const txtPath = path.resolve(__dirname, '../闲鱼发货卡密库_100条_法语终身VIP.txt');
    if (fs.existsSync(txtPath)) {
      try {
        const lines = fs.readFileSync(txtPath, 'utf8').split('\n');
        lines.forEach(line => {
          const trimmed = line.trim();
          if (trimmed.startsWith('CS313-FR-')) {
            seedCards.push({
              key: trimmed,
              tier: 'fr_lifetime',
              batch: '2026-XIANYU-100',
              price: 49.9
            });
          }
        });
      } catch (err) {
        console.warn('[SQLite DB] Failed to read French txt card file:', err.message);
      }
    }

    const insertStmt = db.prepare(`
      INSERT INTO card_keys (card_key, tier, status, batch_no, price, bound_devices, created_at)
      VALUES (?, ?, 'active', ?, ?, '[]', ?)
    `);

    seedCards.forEach(c => {
      try {
        insertStmt.run(c.key, c.tier, c.batch, c.price, now);
      } catch {}
    });

    console.log(`[SQLite DB] French DB seeded with ${seedCards.length} official card keys.`);
  }
}

seedDefaultCards();

function verifyAndBindCardKey(cardKey, device = {}) {
  const cleanKey = (cardKey || '').trim().toUpperCase();
  const stmt = db.prepare('SELECT * FROM card_keys WHERE card_key = ?');
  const card = stmt.get(cleanKey);

  if (!card) {
    return { success: false, message: '激活卡密不存在，请检查后重新输入' };
  }

  if (card.status === 'frozen' || card.status === 'revoked') {
    return { success: false, message: '该卡密已被店主冻结或作废，如有疑问请联系客服' };
  }

  let devices = [];
  try {
    devices = JSON.parse(card.bound_devices || '[]');
  } catch {
    devices = [];
  }

  const devId = device.deviceId || 'unknown_device';
  const existingDevice = devices.find(d => d.deviceId === devId);
  const now = new Date().toISOString();

  if (!existingDevice) {
    if (devices.length >= 2) {
      return {
        success: false,
        message: `该卡密已在 2 台设备 (${devices.map(d => d.name || d.deviceType || '设备').join('、')}) 上激活使用，超出最大设备限制！`
      };
    }

    devices.push({
      deviceId: devId,
      deviceType: device.deviceType || 'PC / 电脑端',
      browser: device.browser || '浏览器',
      ip: device.ip || '127.0.0.1',
      boundAt: now
    });

    const updateStmt = db.prepare(`
      UPDATE card_keys 
      SET bound_devices = ?, 
          status = 'used',
          activated_at = COALESCE(activated_at, ?)
      WHERE card_key = ?
    `);
    updateStmt.run(JSON.stringify(devices), now, cleanKey);
  }

  const userId = `std_${cleanKey.replace(/[^A-Z0-9]/g, '').slice(-12).toLowerCase()}`;
  const studentStmt = db.prepare(`
    INSERT INTO students (user_id, card_key, current_device_id, created_at, last_active_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET 
      last_active_at = excluded.last_active_at,
      current_device_id = excluded.current_device_id
  `);
  studentStmt.run(userId, cleanKey, devId, now, now);

  return {
    success: true,
    message: '🎉 法语终身 VIP 卡密激活成功！已解锁全部高阶联诵、变位神器与 DELF 全真机考！',
    license: {
      isVip: true,
      cardKey: cleanKey,
      tier: '法语单语种终身VIP',
      activatedAt: card.activated_at || now,
      boundDevicesCount: devices.length,
      maxDevices: 2,
      userId
    }
  };
}

function getStudentProgress(userId) {
  if (!userId) return null;
  const stmt = db.prepare('SELECT * FROM study_progress WHERE user_id = ?');
  const progress = stmt.get(userId);

  if (!progress) {
    return {
      userId,
      masteredVocabIds: [],
      masteredGrammarIds: [],
      studyStreak: 0,
      lastCheckinDate: null,
      customNotes: {},
      updatedAt: null
    };
  }

  return {
    userId: progress.user_id,
    masteredVocabIds: JSON.parse(progress.mastered_vocab_ids || '[]'),
    masteredGrammarIds: JSON.parse(progress.mastered_grammar_ids || '[]'),
    studyStreak: progress.study_streak,
    lastCheckinDate: progress.last_checkin_date,
    customNotes: JSON.parse(progress.custom_notes || '{}'),
    updatedAt: progress.updated_at
  };
}

function saveStudentProgress(userId, data = {}) {
  if (!userId) return { success: false, message: 'Missing userId' };
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO students (user_id, card_key, created_at, last_active_at)
    VALUES (?, 'guest', ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET last_active_at = excluded.last_active_at
  `).run(userId, now, now);

  const current = getStudentProgress(userId) || {};
  const mergedVocab = Array.from(new Set([...(current.masteredVocabIds || []), ...(data.masteredVocabIds || [])]));
  const mergedGrammar = Array.from(new Set([...(current.masteredGrammarIds || []), ...(data.masteredGrammarIds || [])]));
  const maxStreak = Math.max(current.studyStreak || 0, data.studyStreak || 0);
  const lastCheckin = data.lastCheckinDate || current.lastCheckinDate || now.slice(0, 10);
  const mergedNotes = { ...(current.customNotes || {}), ...(data.customNotes || {}) };

  const stmt = db.prepare(`
    INSERT INTO study_progress (user_id, mastered_vocab_ids, mastered_grammar_ids, study_streak, last_checkin_date, custom_notes, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      mastered_vocab_ids = excluded.mastered_vocab_ids,
      mastered_grammar_ids = excluded.mastered_grammar_ids,
      study_streak = excluded.study_streak,
      last_checkin_date = excluded.last_checkin_date,
      custom_notes = excluded.custom_notes,
      updated_at = excluded.updated_at
  `);

  stmt.run(
    userId,
    JSON.stringify(mergedVocab),
    JSON.stringify(mergedGrammar),
    maxStreak,
    lastCheckin,
    JSON.stringify(mergedNotes),
    now
  );

  return {
    success: true,
    progress: {
      userId,
      masteredVocabIds: mergedVocab,
      masteredGrammarIds: mergedGrammar,
      studyStreak: maxStreak,
      lastCheckinDate: lastCheckin,
      customNotes: mergedNotes,
      updatedAt: now
    }
  };
}

function saveExamRecord(record) {
  const now = new Date().toISOString();
  const recordId = record.recordId || `rec_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const stmt = db.prepare(`
    INSERT INTO exam_records (record_id, user_id, paper_id, paper_title, score, total_score, time_spent_sec, user_answers, wrong_question_ids, submitted_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    recordId,
    record.userId || 'guest_user',
    record.paperId,
    record.paperTitle || 'DELF / 考研二外法语模考',
    record.score,
    record.totalScore || 100,
    record.timeSpentSec || 0,
    JSON.stringify(record.userAnswers || {}),
    JSON.stringify(record.wrongQuestionIds || []),
    now
  );

  return {
    success: true,
    recordId,
    score: record.score,
    submittedAt: now
  };
}

function getExamRecords(userId) {
  const stmt = db.prepare('SELECT * FROM exam_records WHERE user_id = ? ORDER BY submitted_at DESC LIMIT 50');
  const rows = stmt.all(userId);

  return rows.map(r => ({
    recordId: r.record_id,
    userId: r.user_id,
    paperId: r.paper_id,
    paperTitle: r.paper_title,
    score: r.score,
    totalScore: r.total_score,
    timeSpentSec: r.time_spent_sec,
    userAnswers: JSON.parse(r.user_answers || '{}'),
    wrongQuestionIds: JSON.parse(r.wrong_question_ids || '[]'),
    submittedAt: r.submitted_at
  }));
}

function generateBatchCardKeys(count = 10, tier = 'fr_lifetime', batchNo = '2026-FR-BATCH', price = 49.9) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const generated = [];
  const now = new Date().toISOString();

  const insertStmt = db.prepare(`
    INSERT INTO card_keys (card_key, tier, status, batch_no, price, bound_devices, created_at)
    VALUES (?, ?, 'active', ?, ?, '[]', ?)
  `);

  for (let i = 0; i < count; i++) {
    let randomPart1 = '';
    let randomPart2 = '';
    for (let j = 0; j < 4; j++) {
      randomPart1 += chars[Math.floor(Math.random() * chars.length)];
      randomPart2 += chars[Math.floor(Math.random() * chars.length)];
    }
    const key = `CS313-FR-${randomPart1}-${randomPart2}`;
    try {
      insertStmt.run(key, tier, batchNo, price, now);
      generated.push(key);
    } catch {}
  }

  return {
    success: true,
    count: generated.length,
    keys: generated,
    batchNo,
    createdAt: now
  };
}

function getAdminStats() {
  const totalCards = db.prepare('SELECT COUNT(*) as count FROM card_keys').get().count;
  const usedCards = db.prepare("SELECT COUNT(*) as count FROM card_keys WHERE status = 'used'").get().count;
  const activeStudents = db.prepare('SELECT COUNT(*) as count FROM students').get().count;
  const totalExams = db.prepare('SELECT COUNT(*) as count FROM exam_records').get().count;
  const recentCards = db.prepare('SELECT * FROM card_keys ORDER BY created_at DESC LIMIT 50').all();

  return {
    totalCards,
    usedCards,
    activationRate: totalCards > 0 ? ((usedCards / totalCards) * 100).toFixed(1) + '%' : '0%',
    activeStudents,
    totalExams,
    recentCards: recentCards.map(c => ({
      ...c,
      boundDevices: JSON.parse(c.bound_devices || '[]')
    }))
  };
}

module.exports = {
  db,
  verifyAndBindCardKey,
  getStudentProgress,
  saveStudentProgress,
  saveExamRecord,
  getExamRecords,
  generateBatchCardKeys,
  getAdminStats
};

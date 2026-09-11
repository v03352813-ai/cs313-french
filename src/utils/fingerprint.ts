/**
 * CS313 法语研习社 - 设备指纹与环境识别工具
 * 生成硬件特征 Hash，用于 2 台设备绑定风控校验
 */

export interface DeviceInfo {
  deviceId: string;
  deviceName: string;
  deviceType: 'iPad/Tablet' | 'Mobile Phone' | 'Desktop PC';
  os: string;
  browser: string;
}

export function getDeviceFingerprint(): DeviceInfo {
  const nav = window.navigator;
  const screen = window.screen;

  // 1. 识别设备类型与名称
  const ua = nav.userAgent;
  let deviceType: 'iPad/Tablet' | 'Mobile Phone' | 'Desktop PC' = 'Desktop PC';
  let deviceName = 'PC 电脑端';
  let os = 'Windows / Mac';

  const isTouch = 'ontouchstart' in window || nav.maxTouchPoints > 0;
  const isIPad = /iPad/.test(ua) || (nav.platform === 'MacIntel' && nav.maxTouchPoints > 1);
  const isIPhone = /iPhone/.test(ua);
  const isAndroid = /Android/.test(ua);

  if (isIPad) {
    deviceType = 'iPad/Tablet';
    deviceName = 'iPad 平板设备';
    os = 'iPadOS';
  } else if (isIPhone) {
    deviceType = 'Mobile Phone';
    deviceName = 'iPhone 手机端';
    os = 'iOS';
  } else if (isAndroid) {
    if (isTouch && Math.min(screen.width, screen.height) > 600) {
      deviceType = 'iPad/Tablet';
      deviceName = 'Android 平板设备';
    } else {
      deviceType = 'Mobile Phone';
      deviceName = 'Android 手机端';
    }
    os = 'Android';
  } else if (isTouch && screen.width <= 768) {
    deviceType = 'Mobile Phone';
    deviceName = '移动设备';
  }

  // 2. 生成 Canvas 硬件指纹
  let canvasHash = '';
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = "14px 'Arial'";
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('CS313-FR-SECURE-2026', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('CS313-FR-SECURE-2026', 4, 17);
      canvasHash = canvas.toDataURL().slice(-30);
    }
  } catch {
    canvasHash = 'fallback-canvas';
  }

  // 3. 组合硬件与系统特征
  const rawString = [
    nav.language,
    screen.colorDepth,
    screen.width + 'x' + screen.height,
    nav.hardwareConcurrency || 4,
    new Date().getTimezoneOffset(),
    canvasHash,
    ua
  ].join('###');

  // DJB2 Hash 算法生成简短设备 ID
  let hash = 5381;
  for (let i = 0; i < rawString.length; i++) {
    hash = ((hash << 5) + hash) + rawString.charCodeAt(i);
    hash = hash & hash;
  }
  const deviceId = 'FR-DEV-' + Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');

  let browser = 'Chrome / Edge';
  if (/Safari/.test(ua) && !/Chrome/.test(ua)) browser = 'Safari';
  else if (/Firefox/.test(ua)) browser = 'Firefox';
  else if (/MicroMessenger/.test(ua)) browser = 'WeChat 内置浏览器';

  return {
    deviceId,
    deviceName,
    deviceType,
    os,
    browser
  };
}

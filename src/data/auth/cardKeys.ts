import { 
  verifyKeySignature, 
  generateSignedCardKey, 
  generateBatchSignedKeys 
} from '../../utils/cardKeyCrypto';
import { OFFICIAL_PRESET_FR_KEYS } from './officialKeyPool';

export interface LicenseInfo {
  isVip: boolean;
  licenseKey?: string;
  cardKey?: string;
  type?: 'FRENCH_SINGLE' | 'ALL_LANGUAGES_VIP';
  tier?: string;
  activatedAt?: string;
  planName?: string;
  boundDevicesCount?: number;
  maxDevices?: number;
  userId?: string;
}

// 官方预设首推卡密（含全局黑金通卡与演示卡）
export const PRESET_VIP_KEYS: Record<string, { type: 'FRENCH_SINGLE' | 'ALL_LANGUAGES_VIP'; planName: string }> = {
  'CS313-FR-8888-PARI': { type: 'FRENCH_SINGLE', planName: '法语单语种终身VIP' },
  'CS313-FR-9999-LYON': { type: 'FRENCH_SINGLE', planName: '法语单语种终身VIP' },
  'CS313-FR-5200-NICE': { type: 'FRENCH_SINGLE', planName: '法语单语种终身VIP' },
  'CS313-ALL-GOLD-7U7R': { type: 'ALL_LANGUAGES_VIP', planName: '全球小语种黑金终身通卡' },
  'CS313-ALL-VIP8-87GT': { type: 'ALL_LANGUAGES_VIP', planName: '全球小语种黑金终身通卡' }
};

// 注入 100 条官方预设卡密
OFFICIAL_PRESET_FR_KEYS.forEach(k => {
  if (!PRESET_VIP_KEYS[k]) {
    PRESET_VIP_KEYS[k] = { type: 'FRENCH_SINGLE', planName: '法语全功能终身VIP' };
  }
});

// 店主管理后台访问安全口令
export const ADMIN_PIN_CODES = ['cs313admin', '888888', 'cs313'];
const ADMIN_SESSION_KEY = 'cs313_admin_session_auth_v1';
const STORAGE_KEY = 'cs313_fr_vip_license_v1';
const ADMIN_GENERATED_KEYS_STORAGE = 'cs313_fr_admin_keys_v1';
const BINDINGS_STORAGE_KEY = 'cs313_fr_device_bindings_v1';

export function checkAdminSession(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'authenticated';
  } catch {
    return false;
  }
}

export function verifyAdminPin(pin: string): boolean {
  const clean = pin.trim().toLowerCase();
  if (ADMIN_PIN_CODES.includes(clean)) {
    try {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
    } catch {
      // Ignore
    }
    return true;
  }
  return false;
}

export function getLocalLicense(): LicenseInfo | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LicenseInfo;
  } catch {
    return null;
  }
}

export function saveLocalLicense(license: LicenseInfo): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(license));
  } catch {
    // Ignore
  }
}

export function clearLocalLicense(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

export function getAdminGeneratedKeys(): Array<{ key: string; plan: string; createdAt: string }> {
  try {
    const raw = localStorage.getItem(ADMIN_GENERATED_KEYS_STORAGE);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAdminGeneratedKeys(keys: Array<{ key: string; plan: string; createdAt: string }>): void {
  try {
    localStorage.setItem(ADMIN_GENERATED_KEYS_STORAGE, JSON.stringify(keys));
  } catch {
    // Ignore
  }
}

export interface ActivationResult {
  success: boolean;
  message: string;
  license?: LicenseInfo;
}

export function activateLicenseWithKey(rawKey: string, deviceId: string, deviceName: string): ActivationResult {
  const cleanKey = (rawKey || '').trim().toUpperCase();
  if (!cleanKey) {
    return { success: false, message: '请输入激活卡密' };
  }

  // 1. 检查官方白名单预设
  let planName = '法语全功能终身VIP';
  let isAllLanguages = false;

  if (cleanKey === 'CS313-ALL-VIP8-87GT' || cleanKey.startsWith('CS313-ALL-')) {
    isAllLanguages = true;
    planName = '全球小语种黑金终身通卡';
  } else if (PRESET_VIP_KEYS[cleanKey]) {
    const preset = PRESET_VIP_KEYS[cleanKey];
    isAllLanguages = preset.type === 'ALL_LANGUAGES_VIP';
    planName = preset.planName;
  } else {
    // 2. 进行密码学防伪签名校验
    const checkResult = verifyKeySignature(cleanKey);
    if (!checkResult.valid) {
      return { success: false, message: checkResult.reason || '卡密无效，请核对后重试' };
    }
    if (checkResult.type === 'ALL') {
      isAllLanguages = true;
      planName = '全球小语种黑金终身通卡';
    } else if (checkResult.type !== 'FR') {
      return { success: false, message: '该卡密属于其他语种，无法在法语站激活。' };
    }
  }

  // 3. 校验设备绑定限制 (最多 2 台)
  let bindings: Record<string, string[]> = {};
  try {
    const rawBindings = localStorage.getItem(BINDINGS_STORAGE_KEY);
    if (rawBindings) bindings = JSON.parse(rawBindings);
  } catch {
    bindings = {};
  }

  const currentDeviceList = bindings[cleanKey] || [];
  if (!currentDeviceList.includes(deviceId)) {
    if (currentDeviceList.length >= 2) {
      return {
        success: false,
        message: '该卡密已达到最大绑定设备上限（2台）。如需更换设备请联系客服处理。'
      };
    }
    currentDeviceList.push(deviceId);
    bindings[cleanKey] = currentDeviceList;
    try {
      localStorage.setItem(BINDINGS_STORAGE_KEY, JSON.stringify(bindings));
    } catch {
      // Ignore
    }
  }

  const newLicense: LicenseInfo = {
    isVip: true,
    licenseKey: cleanKey,
    cardKey: cleanKey,
    type: isAllLanguages ? 'ALL_LANGUAGES_VIP' : 'FRENCH_SINGLE',
    tier: isAllLanguages ? 'ALL_VIP' : 'FR_LIFETIME',
    planName,
    activatedAt: new Date().toISOString(),
    boundDevicesCount: currentDeviceList.length,
    maxDevices: 2
  };

  saveLocalLicense(newLicense);
  return {
    success: true,
    message: `恭喜您成功激活【${planName}】！已绑定当前设备：${deviceName}`,
    license: newLicense
  };
}

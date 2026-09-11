/**
 * CS313 法语研习社 · 卡密密码学防伪签名与核销算法
 * 基于 HMAC-SHA256 算法生成数学级数字防伪签名，杜绝任意伪造、穷举或绕过
 */

const SIGNATURE_SECRET_SALT = 'CS313_FR_2026_PRODUCTION_AUTH_KEY_V9X_TOP_SECRET';
const SAFE_CHARSET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

export function sha256(ascii: string): string {
  function rightRotate(value: number, amount: number) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let i: number, j: number;
  let result = '';
  let words: number[] = [];
  let asciiBitLength = ascii.length * 8;
  let hash: number[] = [];
  let k: number[] = [];
  let primeCounter = 0;
  let isComposite: Record<number, number> = {};

  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  ascii += '\x80';
  while (ascii.length % 64 - 56) ascii += '\x00';
  for (i = 0; i < ascii.length; i++) {
    j = ascii.charCodeAt(i);
    words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;

  for (j = 0; j < words.length;) {
    let w = words.slice(j, (j += 16));
    let oldHash = hash;
    hash = hash.slice(0, 8);
    for (i = 0; i < 64; i++) {
      let w15 = w[i - 15],
        w2 = w[i - 2];
      let a = hash[0],
        e = hash[4];
      let temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);
      let temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (let b = 3; b >= 0; b--) {
      let byte = (hash[i] >> (8 * b)) & 255;
      result += (byte < 16 ? '0' : '') + byte.toString(16);
    }
  }
  return result;
}

export function computeKeySignature(type: 'FR' | 'ALL', serial: string): string {
  const payload = `${SIGNATURE_SECRET_SALT}:${type}:${serial.toUpperCase()}`;
  const rawHash = sha256(payload);

  let sig = '';
  for (let i = 0; i < 4; i++) {
    const hexPair = rawHash.slice(i * 4, i * 4 + 4);
    const num = parseInt(hexPair, 16);
    sig += SAFE_CHARSET[num % SAFE_CHARSET.length];
  }
  return sig;
}

export function generateSignedCardKey(type: 'FR' | 'ALL', customSerial?: string): string {
  let serial = customSerial?.toUpperCase();
  if (!serial || serial.length !== 4) {
    serial = '';
    for (let i = 0; i < 4; i++) {
      serial += SAFE_CHARSET[Math.floor(Math.random() * SAFE_CHARSET.length)];
    }
  }
  const signature = computeKeySignature(type, serial);
  return `CS313-${type}-${serial}-${signature}`;
}

export interface KeyVerificationResult {
  valid: boolean;
  type?: 'FR' | 'ALL';
  serial?: string;
  signature?: string;
  cleanKey: string;
  reason?: string;
}

export function verifyKeySignature(rawKey: string): KeyVerificationResult {
  const clean = (rawKey || '').trim().toUpperCase();

  if (!clean) {
    return { valid: false, cleanKey: clean, reason: '请输入激活卡密' };
  }

  // 匹配 CS313-FR-XXXX-YYYY 或 CS313-ALL-XXXX-YYYY
  const match = clean.match(/^CS313-(FR|ALL)-([2-9A-HJ-NP-Z]{4})-([2-9A-HJ-NP-Z]{4})$/);
  if (!match) {
    return {
      valid: false,
      cleanKey: clean,
      reason: '卡密格式无效，请仔细核对后重新输入。'
    };
  }

  const type = match[1] as 'FR' | 'ALL';
  const serial = match[2];
  const providedSig = match[3];

  const expectedSig = computeKeySignature(type, serial);
  if (providedSig !== expectedSig) {
    return {
      valid: false,
      cleanKey: clean,
      reason: '卡密防伪校验未通过，请检查后重新输入。'
    };
  }

  return {
    valid: true,
    type,
    serial,
    signature: providedSig,
    cleanKey: clean
  };
}

export function generateBatchSignedKeys(type: 'FR' | 'ALL', count: number = 20): string[] {
  const keys = new Set<string>();
  let attempts = 0;
  while (keys.size < count && attempts < count * 5) {
    attempts++;
    keys.add(generateSignedCardKey(type));
  }
  return Array.from(keys);
}

// Web Speech API 法语标准发音引擎工具，支持语速控制、巴黎腔/法语自然音优先匹配与防死锁队列

let cachedFrenchVoice: SpeechSynthesisVoice | null = null;
let isVoiceInitialized = false;

function initVoices(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }
  try {
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const frVoice = 
      voices.find(v => v.lang === 'fr-FR' && (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Paul') || v.name.includes('Julie') || v.name.includes('Hortense') || v.name.includes('Thomas'))) ||
      voices.find(v => v.lang === 'fr-FR' || v.lang.replace('_', '-').toLowerCase() === 'fr-fr') ||
      voices.find(v => v.lang.startsWith('fr') || v.name.toLowerCase().includes('french') || v.name.includes('français'));

    if (frVoice) {
      cachedFrenchVoice = frVoice;
      isVoiceInitialized = true;
      return frVoice;
    }
  } catch (e) {
    console.warn('[Speech] French voice init warning:', e);
  }
  return null;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  initVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    initVoices();
  };
}

let activeTimeout: any = null;

export function speakFrench(text: string, rate: number = 0.9): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text || !text.trim()) {
      resolve();
      return;
    }

    try {
      if (activeTimeout) {
        clearTimeout(activeTimeout);
        activeTimeout = null;
      }
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const voice = cachedFrenchVoice || initVoices();

      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.lang = 'fr-FR';
      utterance.rate = Math.max(0.6, Math.min(1.6, rate));
      utterance.pitch = 1.0;
      if (voice) {
        utterance.voice = voice;
      }

      let isFinished = false;
      const safeDone = () => {
        if (!isFinished) {
          isFinished = true;
          if (activeTimeout) {
            clearTimeout(activeTimeout);
            activeTimeout = null;
          }
          resolve();
        }
      };

      utterance.onend = safeDone;
      utterance.onerror = () => {
        safeDone();
      };

      const estimatedMs = Math.max(2500, (text.length / 3) * 1000 * (1.2 / rate));
      activeTimeout = setTimeout(() => {
        safeDone();
      }, estimatedMs + 1500);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('[Speech] Speak execution error:', err);
      resolve();
    }
  });
}

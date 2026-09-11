import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  KeyRound, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Copy, 
  ExternalLink,
  Laptop,
  Smartphone,
  Tablet,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getDeviceFingerprint, DeviceInfo } from '../utils/fingerprint';
import { activateLicenseWithKey, LicenseInfo } from '../data/auth/cardKeys';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
  isVip: boolean;
  license: LicenseInfo | null;
  onActivated: (lic: LicenseInfo) => void;
}

export const VipModal: React.FC<VipModalProps> = ({
  isOpen,
  onClose,
  isVip,
  license,
  onActivated
}) => {
  const [inputKey, setInputKey] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedXianyu, setCopiedXianyu] = useState<boolean>(false);
  const [currentDevice] = useState<DeviceInfo>(() => getDeviceFingerprint());

  // 预设闲鱼链接，上架后可随时更新 ID
  const XIANYU_ITEM_ID = '1083031561914';
  const XIANYU_ITEM_URL = `https://h5.m.goofish.com/item?id=${XIANYU_ITEM_ID}`;

  const copyXianyuLink = async () => {
    try {
      await navigator.clipboard.writeText(XIANYU_ITEM_URL);
      setCopiedXianyu(true);
      setTimeout(() => setCopiedXianyu(false), 2500);
    } catch {
      // fallback
    }
  };

  if (!isOpen) return null;

  const handleActivate = () => {
    const key = inputKey.trim().toUpperCase();
    if (!key) {
      setErrorMsg('请输入激活卡密');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    setTimeout(() => {
      const res = activateLicenseWithKey(key, currentDevice.deviceId, currentDevice.deviceName);
      setIsLoading(false);
      if (res.success && res.license) {
        setSuccessMsg(res.message);
        onActivated(res.license);
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // Ignore
        }
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
      >
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-rose-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center shadow-lg shadow-amber-400/20">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">
                CS313 法语研习社 · 终身 VIP
              </h2>
              <p className="text-xs text-blue-200 mt-0.5">
                考研二外(241/242) & DELF 欧标真题全功能授权
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* If already VIP */}
          {isVip && license ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-200/80 text-emerald-900 text-xs font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>已成功开通：{license.planName}</span>
              </div>
              <p className="text-xs text-slate-600">
                卡密授权码：<strong className="font-mono text-slate-900">{license.cardKey}</strong>
              </p>
              <div className="text-[11px] text-slate-500">
                绑定设备上限：{license.boundDevicesCount || 1} / {license.maxDevices || 2} 台
              </div>
            </div>
          ) : (
            /* Activation Input Area */
            <div className="space-y-4">
              
              {/* Input Card Key */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                  <span>输入您的专属 VIP 激活卡密</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="格式：CS313-FR-XXXX-YYYY"
                    value={inputKey}
                    onChange={e => setInputKey(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 font-mono text-xs sm:text-sm uppercase focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                  <button
                    onClick={handleActivate}
                    disabled={isLoading}
                    className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold transition shadow-sm disabled:opacity-50"
                  >
                    {isLoading ? '核验中...' : '立即激活'}
                  </button>
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMsg}</span>
                  </p>
                )}

                {successMsg && (
                  <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{successMsg}</span>
                  </p>
                )}
              </div>

              {/* Purchase from Xianyu Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/80 border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>尚未获取卡密？前往闲鱼官方拍下</span>
                  </span>
                  <span className="text-xs font-black text-rose-600">
                    ¥49.9 / 终身买断
                  </span>
                </div>
                
                <p className="text-xs text-slate-600 leading-relaxed">
                  拍下后系统机器人 24 小时自动私信推送独立授权卡密，一次开通享全部模块，随新考期持续免费云端更新！
                </p>

                <div className="flex items-center gap-2">
                  <a
                    href={XIANYU_ITEM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                  >
                    <span>前往闲鱼官方拍下</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={copyXianyuLink}
                    className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs border border-slate-200 transition flex items-center gap-1"
                  >
                    {copiedXianyu ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedXianyu ? '已复制链接' : '复制链接'}</span>
                  </button>
                </div>
              </div>

              {/* Current Device Fingerprint Notice */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-[11px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {currentDevice.deviceType === 'Mobile Phone' ? <Smartphone className="w-4 h-4" /> : currentDevice.deviceType === 'iPad/Tablet' ? <Tablet className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
                  <span>当前识别设备：{currentDevice.deviceName} ({currentDevice.os})</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">{currentDevice.deviceId}</span>
              </div>

            </div>
          )}

          {/* Guarantee Badges */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500">
            <div>✔ 2台设备授权</div>
            <div>✔ 随考期云端迭代</div>
            <div>✔ 零二次杂费</div>
          </div>

        </div>

      </div>
    </div>
  );
};

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
  AlertCircle,
  ArrowRight
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
  reason?: string;
}

export const VipModal: React.FC<VipModalProps> = ({
  isOpen,
  onClose,
  isVip,
  license,
  onActivated,
  reason
}) => {
  const [inputKey, setInputKey] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedXianyu, setCopiedXianyu] = useState<boolean>(false);
  const [currentDevice] = useState<DeviceInfo>(() => getDeviceFingerprint());

  // 闲鱼官方拍下商品 ID
  const XIANYU_ITEM_ID = '1082533646466';
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
        // 激活成功后 1 秒自动关闭弹窗，进入系统开始学习
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
    >
      <div 
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden"
      >
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#80142A] via-[#9B1B36] to-[#680E20] text-white p-5 sm:p-6 relative pr-14">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 active:scale-90 flex items-center justify-center text-white transition cursor-pointer border border-white/20 shadow-sm"
            aria-label="关闭"
            title="关闭窗口"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#DDBF78] text-[#29354A] flex items-center justify-center shadow-lg shadow-[#DDBF78]/25 shrink-0">
              <Crown className="w-6 h-6 text-[#29354A]" />
            </div>
            <div className="min-w-0 pr-2">
              <h2 className="text-lg sm:text-xl font-black tracking-tight truncate">
                CS313 法语研习社 · 终身 VIP
              </h2>
              <p className="text-xs text-rose-100 mt-0.5 line-clamp-1">
                全国考研二外名校真题 & DELF 欧标全功能授权
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 sm:space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Reason Alert Banner */}
          {reason && (
            <div className="p-3.5 rounded-2xl bg-[#FCECEF] border border-[#80142A]/30 flex items-start gap-2.5 text-xs text-[#80142A]">
              <Sparkles className="w-4 h-4 text-[#80142A] shrink-0 mt-0.5" />
              <div className="font-bold leading-relaxed">{reason}</div>
            </div>
          )}

          {/* If already VIP */}
          {isVip && license ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-200/80 text-emerald-900 text-xs font-bold">
                  <Check className="w-3.5 h-3.5" />
                  <span>已成功开通：{license.planName}</span>
                </div>
                <p className="text-xs text-[#29354A]">
                  卡密授权码：<strong className="font-mono text-[#29354A]">{license.cardKey}</strong>
                </p>
                <div className="text-[11px] text-[#29354A]/70">
                  绑定设备上限：{license.boundDevicesCount || 1} / {license.maxDevices || 2} 台
                </div>
              </div>

              {/* 核心行动按钮：立即进入系统开始学习 */}
              <button
                onClick={onClose}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#80142A] via-[#9B1B36] to-[#80142A] hover:from-[#9B1B36] hover:to-[#680E20] text-white font-black text-sm sm:text-base shadow-lg shadow-[#80142A]/25 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🚀 权限已生效 · 立即开始学习</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Activation Input Area */
            <div className="space-y-4">
              
              {/* Input Card Key */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#29354A] flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-[#80142A]" />
                  <span>输入您的专属 VIP 激活卡密</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="在此粘贴或输入激活码"
                    value={inputKey}
                    onChange={e => setInputKey(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 font-mono text-xs sm:text-sm uppercase focus:outline-hidden focus:ring-2 focus:ring-[#80142A]/20 focus:bg-white transition text-[#80142A] font-bold placeholder:normal-case placeholder:font-normal placeholder:text-slate-400"
                  />
                  <button
                    onClick={handleActivate}
                    disabled={isLoading}
                    className="px-5 py-2.5 rounded-xl bg-[#80142A] hover:bg-[#680E20] text-white text-xs sm:text-sm font-bold transition shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? '核验中...' : '立即激活'}
                  </button>
                </div>

                {errorMsg && (
                  <p className="text-xs text-[#80142A] font-medium flex items-center gap-1">
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
              <div className="p-4 rounded-2xl bg-slate-50 border border-[#DDBF78]/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#80142A] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#DDBF78]" />
                    <span>尚未获取卡密？前往闲鱼官方拍下</span>
                  </span>
                  <span className="text-xs font-black text-[#80142A]">
                    ¥49.9 / 终身买断
                  </span>
                </div>
                
                <p className="text-xs text-[#29354A]/80 leading-relaxed">
                  拍下后系统机器人 24 小时自动私信推送独立授权卡密，一次开通享全部模块，随新考期持续免费云端更新！
                </p>

                <div className="flex items-center gap-2">
                  <a
                    href={XIANYU_ITEM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-[#DDBF78] hover:bg-[#C9A95C] text-[#29354A] font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
                  >
                    <span>前往闲鱼官方拍下</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#29354A]" />
                  </a>

                  <button
                    onClick={copyXianyuLink}
                    className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#29354A] font-bold text-xs border border-slate-200/80 transition flex items-center gap-1 cursor-pointer"
                  >
                    {copiedXianyu ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedXianyu ? '已复制链接' : '复制链接'}</span>
                  </button>
                </div>
              </div>

              {/* Current Device Fingerprint Notice */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[#29354A]/70 text-[11px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {currentDevice.deviceType === 'Mobile Phone' ? <Smartphone className="w-4 h-4" /> : currentDevice.deviceType === 'iPad/Tablet' ? <Tablet className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
                  <span>当前识别设备：{currentDevice.deviceName} ({currentDevice.os})</span>
                </div>
                <span className="font-mono text-[10px] text-stone-400">{currentDevice.deviceId}</span>
              </div>

            </div>
          )}

          {/* Guarantee Badges */}
          <div className="pt-2 border-t border-slate-200/80 grid grid-cols-3 gap-2 text-center text-[11px] text-stone-500">
            <div>✔ 2台设备授权</div>
            <div>✔ 随考期云端迭代</div>
            <div>✔ 零二次杂费</div>
          </div>

        </div>

      </div>
    </div>
  );
};

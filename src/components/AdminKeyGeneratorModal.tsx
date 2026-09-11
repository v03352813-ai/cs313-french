import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  Copy, 
  Check, 
  Sparkles, 
  Plus, 
  Download,
  ShieldAlert
} from 'lucide-react';
import { 
  generateSignedCardKey, 
  generateBatchSignedKeys 
} from '../utils/cardKeyCrypto';
import { 
  getAdminGeneratedKeys, 
  saveAdminGeneratedKeys,
  verifyAdminPin
} from '../data/auth/cardKeys';

interface AdminKeyGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminKeyGeneratorModal: React.FC<AdminKeyGeneratorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [pinInput, setPinInput] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>('');
  
  const [keyType, setKeyType] = useState<'FR' | 'ALL'>('FR');
  const [generateCount, setGenerateCount] = useState<number>(10);
  const [generatedBatch, setGeneratedBatch] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleVerifyPin = () => {
    if (verifyAdminPin(pinInput)) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('管理安全口令错误，请重试');
    }
  };

  const handleGenerate = () => {
    const keys = generateBatchSignedKeys(keyType, generateCount);
    setGeneratedBatch(keys);
    
    // Save to admin history
    const existing = getAdminGeneratedKeys();
    const newRecords = keys.map(k => ({
      key: k,
      plan: keyType === 'FR' ? '法语终身VIP' : '全球小语种通卡',
      createdAt: new Date().toLocaleString('zh-CN')
    }));
    saveAdminGeneratedKeys([...newRecords, ...existing]);
  };

  const handleCopyOne = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(generatedBatch.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#FCFAF6] rounded-3xl shadow-2xl border border-[#E8DECE] overflow-hidden"
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#A94A62] via-[#B8576E] to-[#933C52] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-[#DDBF78]" />
            <h2 className="font-bold text-base">
              CS313 法语研习社 · 店主发卡管理中枢
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {!isAuthenticated ? (
            /* PIN authentication */
            <div className="space-y-4 py-4 max-w-xs mx-auto text-center">
              <div className="w-12 h-12 rounded-full bg-[#F3EEE5] text-[#DDBF78] flex items-center justify-center mx-auto border border-[#DDBF78]/30">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#29354A] text-sm">请输入管理员口令</h3>
                <p className="text-xs text-stone-500 mt-0.5">仅限店主操作卡密批量生成与库存导入</p>
              </div>
              <input
                type="password"
                placeholder="输入管理口令..."
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleVerifyPin()}
                className="w-full px-4 py-2 rounded-xl bg-[#FCFAF6] border border-[#E8DECE] text-center text-sm focus:ring-2 focus:ring-[#A94A62]/20 text-[#29354A]"
              />
              {pinError && <p className="text-xs text-[#A94A62] font-bold">{pinError}</p>}
              <button
                onClick={handleVerifyPin}
                className="w-full py-2.5 rounded-xl bg-[#A94A62] hover:bg-[#933C52] text-white font-bold text-xs transition shadow-sm cursor-pointer"
              >
                验证登录
              </button>
            </div>
          ) : (
            /* Key Generator Console */
            <div className="space-y-5">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#29354A]">生成卡种类型</label>
                  <select
                    value={keyType}
                    onChange={e => setKeyType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FCFAF6] border border-[#E8DECE] text-xs font-semibold text-[#29354A]"
                  >
                    <option value="FR">CS313-FR- (法语单语种终身卡)</option>
                    <option value="ALL">CS313-ALL- (全语种黑金终身通卡)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#29354A]">批量生成数量</label>
                  <select
                    value={generateCount}
                    onChange={e => setGenerateCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#FCFAF6] border border-[#E8DECE] text-xs font-semibold text-[#29354A]"
                  >
                    <option value={5}>5 张卡密</option>
                    <option value={10}>10 张卡密</option>
                    <option value={20}>20 张卡密</option>
                    <option value={50}>50 张卡密</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                className="w-full py-2.5 rounded-xl bg-[#A94A62] hover:bg-[#933C52] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>立即生成高熵加密卡密</span>
              </button>

              {/* Generated Keys Display Box */}
              {generatedBatch.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#29354A]">本次生成结果 ({generatedBatch.length} 条)</span>
                    <button
                      onClick={handleCopyAll}
                      className="text-[#A94A62] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAll ? '已全部复制' : '一键全部复制'}</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FCFAF6] border border-[#E8DECE] font-mono text-xs max-h-48 overflow-y-auto space-y-1">
                    {generatedBatch.map((k, i) => (
                      <div key={k} className="flex items-center justify-between hover:bg-[#F3EEE5] p-1 rounded-md">
                        <span className="text-[#29354A]">{k}</span>
                        <button
                          onClick={() => handleCopyOne(k, i)}
                          className="text-[11px] text-stone-400 hover:text-[#A94A62] px-1.5 py-0.5 cursor-pointer"
                        >
                          {copiedIndex === i ? '已复制' : '复制'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

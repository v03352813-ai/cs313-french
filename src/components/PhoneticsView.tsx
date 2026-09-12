import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  HelpCircle, 
  Layers, 
  Check, 
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Lock
} from 'lucide-react';
import { FRENCH_PHONETICS, PRONUNCIATION_RULES, PhoneticItem } from '../data/french/phonetics';

interface PhoneticsViewProps {
  isVip?: boolean;
  onOpenVipModal?: (reason?: string) => void;
}

export const PhoneticsView: React.FC<PhoneticsViewProps> = ({
  isVip = false,
  onOpenVipModal
}) => {
  const [activeModule, setActiveModule] = useState<'soundboard' | 'rules'>('soundboard');
  const [activeCategory, setActiveCategory] = useState<'all' | 'oral_vowel' | 'nasal_vowel' | 'semi_vowel' | 'consonant'>('all');
  const [selectedItem, setSelectedItem] = useState<PhoneticItem>(FRENCH_PHONETICS[0]);
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: '全部 35 音标' },
    { id: 'oral_vowel', label: '口元音 (11个)' },
    { id: 'nasal_vowel', label: '鼻化元音 (4个) ★特色' },
    { id: 'semi_vowel', label: '半元音 (3个)' },
    { id: 'consonant', label: '辅音 (17个)' },
  ];

  const filteredItems = activeCategory === 'all'
    ? FRENCH_PHONETICS
    : FRENCH_PHONETICS.filter(item => item.type === activeCategory);

  const playSpeech = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.85; // 稍微放慢以清晰辨音
      setPlayingWord(text);
      utterance.onend = () => setPlayingWord(null);
      utterance.onerror = () => setPlayingWord(null);
      window.speechSynthesis.speak(utterance);
    } catch {
      setPlayingWord(null);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-3.5 pb-0">
      
      {/* Top Hero Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCECEF] text-[#80142A] text-xs font-bold border border-[#80142A]/25">
            <Sparkles className="w-3.5 h-3.5 text-[#DDBF78]" />
            <span>法兰西语音纯正发音规范</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#29354A] tracking-tight">
            法语 35 国际音标 & 5 大核心发音联诵规则
          </h1>
          <p className="text-xs sm:text-sm text-[#29354A]/80 leading-relaxed max-w-2xl font-medium">
            点击任意音标收听正统巴黎原声音频与嘴型指南；切换规则模块攻关连音联诵与考研避坑铁律。
          </p>
        </div>
      </div>

      {/* 关键：两大核心发音模块选择卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* 模块 1: 35 国际音标交互发音台 */}
        <div
          onClick={() => setActiveModule('soundboard')}
          className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 relative ${
            activeModule === 'soundboard'
              ? 'bg-gradient-to-br from-[#FFF9FA] via-[#FCF1F3] to-[#FCECEF]/70 border-[#80142A] shadow-md ring-2 ring-[#80142A]/20'
              : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
          }`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-2xs ${
            activeModule === 'soundboard' ? 'bg-[#80142A] text-white' : 'bg-slate-100 text-slate-700'
          }`}>
            🎙️
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className={`text-base sm:text-lg font-black ${activeModule === 'soundboard' ? 'text-[#80142A]' : 'text-slate-800'}`}>
                35 国际音标交互发音台
              </h3>
              <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full whitespace-nowrap ${
                activeModule === 'soundboard' ? 'bg-[#80142A] text-white shadow-2xs' : 'bg-slate-100 text-slate-600'
              }`}>
                35 国际音标全收录
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              左侧点按音标、右侧透视嘴型指南与高频词汇。掌握 11 口元音、4 鼻化元音、3 半元音与 17 辅音。
            </p>
          </div>
          {activeModule === 'soundboard' && (
            <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#80142A] text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* 模块 2: 5 大核心发音与联诵规则精析 */}
        <div
          onClick={() => setActiveModule('rules')}
          className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 relative ${
            activeModule === 'rules'
              ? 'bg-gradient-to-br from-[#FFFDF7] via-[#FAF4E2] to-[#F6EDD0]/70 border-[#B89047] shadow-md ring-2 ring-[#B89047]/20'
              : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
          }`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-2xs ${
            activeModule === 'rules' ? 'bg-[#B89047] text-white' : 'bg-slate-100 text-slate-700'
          }`}>
            📖
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className={`text-base sm:text-lg font-black ${activeModule === 'rules' ? 'text-[#8A6A1E]' : 'text-slate-800'}`}>
                5 大核心发音与联诵规则精析
              </h3>
              <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full whitespace-nowrap ${
                activeModule === 'rules' ? 'bg-[#8A6A1E] text-white shadow-2xs' : 'bg-slate-100 text-slate-600'
              }`}>
                重中之重 · 5大规则
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              搞清联诵 (Liaison)、哑音与嘘音h界限、词尾不发音与省音规则，攻克考研二外与 DELF 听力口语丢分重灾区，告别中式发音。
            </p>
          </div>
          {activeModule === 'rules' && (
            <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#B89047] text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>

      {/* 模块 1 呈现区: Interactive Soundboard + Detail Inspector */}
      {activeModule === 'soundboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
        
        {/* Left 8 Cols: Soundboard */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#80142A] text-white shadow-xs'
                    : 'bg-white text-[#29354A] hover:bg-slate-50 border border-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sound Cards Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
            {filteredItems.map(item => {
              const isSelected = selectedItem.ipa === item.ipa;
              const isNasal = item.type === 'nasal_vowel';
              return (
                <button
                  key={item.ipa}
                  onClick={() => {
                    setSelectedItem(item);
                    if (item.examples.length > 0) {
                      playSpeech(item.examples[0].word);
                    }
                  }}
                  className={`relative p-3 rounded-2xl flex flex-col items-center justify-center transition-all duration-150 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#80142A] text-white border-[#80142A] shadow-md scale-[1.04] z-10'
                      : isNasal
                      ? 'bg-[#FCECEF] text-[#80142A] border-[#80142A]/30 hover:bg-[#EFE2E6] hover:scale-[1.02]'
                      : 'bg-white text-[#29354A] border-slate-200/80 hover:bg-slate-50 hover:border-[#80142A]/30 hover:scale-[1.02]'
                  }`}
                >
                  <span className={`text-lg sm:text-xl font-black ${isSelected ? 'text-white' : 'text-[#29354A]'}`}>
                    {item.ipa}
                  </span>
                  <span className={`text-[10px] mt-0.5 font-bold truncate max-w-full ${isSelected ? 'text-white/80' : 'text-stone-500'}`}>
                    {item.spellingRules.slice(0, 2).join(', ')}
                  </span>
                  {isNasal && !isSelected && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#80142A]" title="鼻化元音"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Audio Hint */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center gap-2 text-xs text-[#29354A]">
            <Volume2 className="w-4 h-4 text-[#DDBF78] shrink-0" />
            <span>点击上方任意卡片即可发音，右侧可查看嘴型口诀与高频例词。</span>
          </div>
        </div>

        {/* Right 5 Cols: Detail Inspector */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-5">
            
            {/* Header of Inspector */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#29354A] font-mono">
                    {selectedItem.ipa}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#FCECEF] text-[#80142A] border border-[#80142A]/25 text-xs font-bold">
                    {selectedItem.name}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  常见拼写规则：{selectedItem.spellingRules.join(' / ')}
                </p>
              </div>

              <button
                onClick={() => playSpeech(selectedItem.examples.map(e => e.word).join(', '))}
                className="w-11 h-11 rounded-2xl bg-[#80142A] hover:bg-[#680E20] text-white flex items-center justify-center shadow-xs hover:scale-105 transition cursor-pointer"
                title="朗读全部例词"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Mouth Tips */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#29354A]">
                <HelpCircle className="w-4 h-4 text-[#DDBF78]" />
                <span>发音嘴型与技巧指南</span>
              </div>
              <p className="text-xs sm:text-sm text-[#29354A] bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 leading-relaxed font-medium">
                {selectedItem.mouthTips}
              </p>
            </div>

            {/* Practical Examples List */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#29354A]">
                <span>权威考纲核心例词与发音对照</span>
              </div>
              <div className="space-y-2">
                {selectedItem.examples.map(ex => (
                  <div
                    key={ex.word}
                    onClick={() => playSpeech(ex.word)}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/70 hover:border-[#80142A]/30 flex items-center justify-between cursor-pointer transition group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#29354A] group-hover:text-[#80142A]">
                          {ex.word}
                        </span>
                        <span className="text-xs text-stone-400 font-mono">
                          {ex.phonetic}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5 font-medium">
                        {ex.meaning}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-white group-hover:bg-[#80142A] text-stone-400 group-hover:text-white flex items-center justify-center shadow-2xs border border-slate-200/70 transition">
                      <Volume2 className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
      )}

      {/* 模块 2 呈现区: 4 Major Pronunciation & Liaison Rules Section */}
      {activeModule === 'rules' && (
        <section className="space-y-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#FCECEF] text-[#80142A] border border-[#80142A]/25 font-bold text-xs">
                重中之重
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#29354A] tracking-tight">
                5 大核心发音与联诵规则精析
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              搞清联诵 (Liaison)、哑音/嘘音h界限、词尾不发音与省音规则，是告别中式发音的唯一法则
            </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRONUNCIATION_RULES.map((rule, idx) => {
            const isLocked = !isVip && idx >= 2;
            const isLastOdd = idx === PRONUNCIATION_RULES.length - 1 && PRONUNCIATION_RULES.length % 2 !== 0;
            return (
              <div
                key={rule.id}
                onClick={() => {
                  if (isLocked) {
                    onOpenVipModal?.(`🔒【${rule.title}】为考研二外重点发音避坑高频考点！输入卡密激活 VIP 终身卡即可解锁全部发音与联诵规则！`);
                  }
                }}
                className={`p-5 rounded-3xl bg-white border shadow-xs space-y-3 transition relative ${
                  isLastOdd ? 'md:col-span-2' : ''
                } ${
                  isLocked 
                    ? 'border-amber-200/80 hover:border-[#80142A]/40 cursor-pointer bg-slate-50/60' 
                    : 'border-slate-200/80'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-black text-[#29354A] flex items-center gap-1.5">
                      <span>{rule.title}</span>
                      {isLocked && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" />
                          <span>VIP专属</span>
                        </span>
                      )}
                    </h3>
                    <span className="text-xs font-serif italic text-[#80142A] font-bold">
                      {rule.frenchTitle}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#FCECEF] text-[#80142A] text-[11px] font-bold border border-[#80142A]/25">
                    {rule.tag}
                  </span>
                </div>

                <p className="text-xs text-[#29354A]/80 leading-relaxed font-medium">
                  {rule.summary}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-50 text-[#29354A] font-mono text-xs font-bold border border-slate-200/70">
                  {rule.formula}
                </div>

                <div className={`pt-1 ${isLastOdd ? 'grid grid-cols-1 md:grid-cols-2 gap-2' : 'space-y-1.5'}`}>
                  {rule.examples.map(ex => (
                    <div 
                      key={ex.phrase}
                      onClick={(e) => {
                        if (isLocked) {
                          e.stopPropagation();
                          onOpenVipModal?.(`🔒【${rule.title}】为考研二外重点发音避坑高频考点！输入卡密激活 VIP 终身卡即可解锁全部发音与联诵规则！`);
                          return;
                        }
                        playSpeech(ex.phrase);
                      }}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/70 flex items-center justify-between cursor-pointer transition text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#29354A]">{ex.phrase}</span>
                          <span className="text-stone-400 font-mono">{ex.ipa}</span>
                          <span className="text-[#29354A]/70">({ex.meaning})</span>
                        </div>
                        <p className="text-[11px] text-[#80142A] mt-0.5 font-medium">{ex.explanation}</p>
                      </div>
                      <Volume2 className="w-3.5 h-3.5 text-stone-400 hover:text-[#80142A] shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      )}

      {/* 未激活学员提示横幅 (对齐日韩版二级页面底部 VIP 引导) */}
      {!isVip && (
        <div className="bg-gradient-to-r from-[#80142A] via-[#680E20] to-[#450914] rounded-2xl sm:rounded-3xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-[#80142A]/20">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-1.5 justify-center sm:justify-start font-black text-sm">
              <Sparkles className="w-4 h-4 text-[#DDBF78]" />
              <span>当前正在体验【法语 35 音标与基础联诵 · 免费体验】</span>
            </div>
            <p className="text-xs text-white/90 leading-relaxed">
              开通 VIP 终身卡（仅 ¥49.9），立享<strong>全部 5 大高阶联诵/省音规则</strong>、36套国家级模考全真大卷与 5000+ 性数精解词库！
            </p>
          </div>
          <button
            onClick={() => onOpenVipModal?.('🔒 开通 VIP 终身卡（仅 ¥49.9），即可解锁全部高阶联诵/省音避坑法则与全真机考大卷！')}
            className="px-5 py-2.5 rounded-2xl bg-white text-[#80142A] hover:bg-[#FCECEF] font-black text-xs shadow-md transition active:scale-98 shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-[#80142A]" />
            <span>输入卡密解锁全量特权 →</span>
          </button>
        </div>
      )}

    </div>
  );
};

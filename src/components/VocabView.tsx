import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Layers, 
  Search, 
  Volume2, 
  RotateCw, 
  Check, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  EyeOff,
  Shuffle,
  Play,
  Pause,
  List,
  Grid,
  CheckCircle2,
  Lock,
  KeyRound,
  Crown
} from 'lucide-react';
import { FRENCH_VOCAB_LIST, FrenchVocab } from '../data/french/vocabData';
import { speakFrench, stopFrenchSpeech } from '../utils/speech';

interface VocabViewProps {
  isVip?: boolean;
  onOpenVipModal?: (reason?: string) => void;
}

export const VocabView: React.FC<VocabViewProps> = ({
  isVip = false,
  onOpenVipModal
}) => {
  const [activeLevel, setActiveLevel] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maskMode, setMaskMode] = useState<'none' | 'hideZh' | 'hideFr'>('none');
  const [viewMode, setViewMode] = useState<'flashcard' | 'list'>('flashcard');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<0.8 | 1.0 | 1.2>(1.0); // 0.8 慢速 / 1.0 标准 / 1.2 快速

  // Mastered Words Tracker (LocalStorage)
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cs313_fr_mastered_vocabs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const levels = [
    { id: 'all', label: '全部词库', isFree: true },
    { id: 'A1', label: 'A1 入门 · 免费试学', isFree: true },
    { id: 'A2', label: 'A2 基础', isFree: false },
    { id: 'B1', label: 'B1 进阶', isFree: false },
    { id: 'B2', label: 'B2 提升', isFree: false },
    { id: 'KAOYAN', label: '考研二外高频', isFree: false }
  ];

  const filteredVocab = useMemo(() => {
    return FRENCH_VOCAB_LIST.filter(item => {
      const matchLevel = activeLevel === 'all' || item.level === activeLevel;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || 
        item.french.toLowerCase().includes(q) ||
        item.chinese.includes(q) ||
        (item.article && item.article.toLowerCase().includes(q));
      return matchLevel && matchSearch;
    });
  }, [activeLevel, searchQuery]);

  // Reset current index when filter or search changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsAutoPlaying(false);
  }, [activeLevel, searchQuery]);

  const currentItem: FrenchVocab | undefined = filteredVocab[currentIndex] || filteredVocab[0];

  // Auto Play Audio Loop (磨耳朵连读)
  const autoPlayTimerRef = useRef<any>(null);
  useEffect(() => {
    if (!isAutoPlaying || filteredVocab.length === 0) {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      return;
    }

    const item = filteredVocab[currentIndex];
    if (item) {
      speakFrench(`${item.article ? item.article + ' ' : ''}${item.french}`);
    }

    autoPlayTimerRef.current = setTimeout(() => {
      setCurrentIndex(prev => {
        if (prev >= filteredVocab.length - 1) {
          setIsAutoPlaying(false);
          return 0;
        }
        return prev + 1;
      });
      setIsFlipped(false);
    }, 2900);

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, currentIndex, filteredVocab]);

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredVocab.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(filteredVocab.length - 1);
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    if (filteredVocab.length <= 1) return;
    const rand = Math.floor(Math.random() * filteredVocab.length);
    setCurrentIndex(rand);
  };

  const toggleMastered = (id: string) => {
    setMasteredIds(prev => {
      const updated = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      try {
        localStorage.setItem('cs313_fr_mastered_vocabs', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const isVowelOrMuteH = (word: string) => {
    if (!word) return false;
    const first = word.trim().toLowerCase()[0];
    return ['a', 'e', 'i', 'o', 'u', 'y', 'é', 'è', 'ê', 'à', 'h'].includes(first);
  };

  const playVoice = (e?: React.MouseEvent, text?: string, customRate?: number) => {
    if (e) e.stopPropagation();
    const targetText = text || (currentItem ? `${currentItem.article ? currentItem.article + ' ' : ''}${currentItem.french}` : '');
    if (targetText) {
      speakFrench(targetText, customRate ?? speechRate);
    }
  };

  // 全键盘快捷键监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'Digit1' || e.code === 'KeyM') {
        e.preventDefault();
        if (currentItem) toggleMastered(currentItem.id);
      } else if (e.code === 'ArrowUp' || e.code === 'KeyR') {
        e.preventDefault();
        playVoice();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentItem, filteredVocab, speechRate]);

  return (
    <div className="space-y-3 sm:space-y-3.5 pb-0 animate-in fade-in duration-300">
      
      {/* 1. 顶部步骤导引条 (直观告知考纲词汇分级与已掌握统计) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FCECEF] text-[#80142A] text-xs font-black border border-[#80142A]/20">
              词汇切片 · 3D 闪卡
            </span>
            <h1 className="text-base sm:text-lg font-black text-[#29354A]">
              5,000+ 核心词汇 · 阴阳性双标 3D 翻转记忆库
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              已掌握 {masteredIds.length} 词
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            背法语单词最忌讳不记阴阳性！严格标定 <strong className="text-[#80142A]">阳性 (le)</strong> 与 <strong className="text-[#80142A]">阴性 (la)</strong>，3D 空间翻转查看释义与原比例句。
          </p>
        </div>

        {/* 顶部快捷开关: 遮挡模式 + 自动连读 + 随机抽词 + 视图切换 */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end shrink-0 flex-wrap pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
          
          {/* 遮挡测试模式 (自测神器) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setMaskMode('none')}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
                maskMode === 'none' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="正常模式"
            >
              全显
            </button>
            <button
              onClick={() => setMaskMode('hideZh')}
              className={`px-2 py-1 rounded-lg font-bold text-xs transition flex items-center gap-1 cursor-pointer ${
                maskMode === 'hideZh' ? 'bg-[#80142A] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="遮挡中文（看法语忆中文）"
            >
              <EyeOff className="w-3 h-3" />
              <span>遮中文</span>
            </button>
            <button
              onClick={() => setMaskMode('hideFr')}
              className={`px-2 py-1 rounded-lg font-bold text-xs transition flex items-center gap-1 cursor-pointer ${
                maskMode === 'hideFr' ? 'bg-[#80142A] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="遮挡法文（看中文忆法文）"
            >
              <EyeOff className="w-3 h-3" />
              <span>遮法文</span>
            </button>
          </div>

          {/* 语速调节 */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs gap-0.5">
            <button
              type="button"
              onClick={() => setSpeechRate(0.8)}
              className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer ${
                speechRate === 0.8 ? 'bg-[#80142A] text-white shadow-2xs font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="慢速磨耳朵 0.8x"
            >
              0.8x 慢速
            </button>
            <button
              type="button"
              onClick={() => setSpeechRate(1.0)}
              className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer ${
                speechRate === 1.0 ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="标准原速 1.0x"
            >
              1.0x
            </button>
            <button
              type="button"
              onClick={() => setSpeechRate(1.2)}
              className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer ${
                speechRate === 1.2 ? 'bg-[#80142A] text-white shadow-2xs font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="快速挑战 1.2x"
            >
              1.2x 快速
            </button>
          </div>

          {/* 自动连读磨耳朵 */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs ${
              isAutoPlaying 
                ? 'bg-amber-400 text-slate-950 font-black animate-pulse' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="自动循环连读当前词汇"
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 text-[#80142A] fill-current" />}
            <span>{isAutoPlaying ? '暂停连读' : '自动连读'}</span>
          </button>

          {/* 随机乱序抽词 */}
          <button
            onClick={handleShuffle}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition cursor-pointer shadow-2xs"
            title="随机抽取一个单词"
          >
            <Shuffle className="w-3.5 h-3.5 text-slate-600" />
          </button>

          {/* 视图切换 (3D 闪卡 / 列表清单) */}
          <button
            onClick={() => setViewMode(viewMode === 'flashcard' ? 'list' : 'flashcard')}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition cursor-pointer shadow-2xs"
            title={viewMode === 'flashcard' ? '切换为列表速查视图' : '切换为 3D 闪卡视图'}
          >
            {viewMode === 'flashcard' ? <List className="w-3.5 h-3.5 text-[#80142A]" /> : <Grid className="w-3.5 h-3.5 text-[#80142A]" />}
          </button>
        </div>
      </div>

      {/* 2. 词汇级别筛选条 & 搜索框 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {levels.map(lvl => {
            const isLocked = !isVip && !lvl.isFree;
            return (
              <button
                key={lvl.id}
                onClick={() => {
                  if (isLocked) {
                    onOpenVipModal?.(`🔒【${lvl.label}】为 VIP 专属高频词库！拍下激活码（仅 ¥49.9），即可解锁全部 5,000+ 核心词库与磨耳朵循环精听！`);
                    return;
                  }
                  setActiveLevel(lvl.id);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  activeLevel === lvl.id
                    ? 'bg-[#80142A] text-white shadow-xs font-black'
                    : isLocked
                    ? 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200/80'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80'
                }`}
              >
                {isLocked && <Lock className="w-3 h-3 text-amber-600 shrink-0" />}
                <span>{lvl.label}</span>
                {isLocked && (
                  <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-extrabold">
                    VIP
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="搜索法语或中文释义..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-white border border-slate-200/80 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#80142A]/20 focus:bg-white text-[#29354A] font-medium transition shadow-2xs"
          />
        </div>
      </div>

      {/* 3. 核心 3D 空间翻转大卡片模式 (Flashcard Mode) */}
      {viewMode === 'flashcard' && filteredVocab.length > 0 && currentItem ? (
        <div className="max-w-2xl mx-auto space-y-4 w-full">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-bold">
            <span>
              当前词卡: <strong className="text-slate-900 font-black">{currentIndex + 1}</strong> / {filteredVocab.length}
              <span className="text-[#80142A] ml-2 font-medium">({currentItem.category})</span>
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <RotateCw className="w-3.5 h-3.5" /> 点击卡片 3D 翻转
            </span>
          </div>

          {/* 🌟 免费试学节点拦截：非VIP学员在进阶词库中体验第11词时显示锁卡 */}
          {!isVip && activeLevel !== 'A1' && currentIndex >= 10 ? (
            <div className="w-full min-h-[340px] sm:min-h-[380px] bg-gradient-to-br from-[#FCECEF]/40 via-white to-slate-50 rounded-3xl p-6 sm:p-8 border border-[#80142A]/30 shadow-md flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#80142A] via-[#9B1B36] to-[#680E20] flex items-center justify-center text-white shadow-md shadow-[#80142A]/20">
                <KeyRound className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 max-w-md">
                <span className="px-3 py-1 rounded-full bg-[#FCECEF] text-[#80142A] text-xs font-black border border-[#80142A]/20">
                  ✨ 免费试学已达节点 (已体验前 10 词)
                </span>
                <h3 className="text-lg font-black text-[#29354A]">
                  输入卡密解锁全部 5,000+ 核心词库
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  当前为【免费试学模式】。拍下激活码（仅 ¥49.9），立享欧标 A1-B2 & 考研二外全量词库、阴阳性全景图解与循环磨耳朵连读！
                </p>
              </div>
              <button
                onClick={() => onOpenVipModal?.('输入卡密解锁全量 5000+ 法语核心词库与考研精讲')}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#80142A] to-[#9B1B36] hover:from-[#680E20] hover:to-[#80142A] text-white text-xs font-black shadow-md shadow-[#80142A]/20 active:scale-98 transition cursor-pointer flex items-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>输入卡密立即解锁全部词库 →</span>
              </button>
            </div>
          ) : (
            /* 3D Flip Container (空间立体翻转) */
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative w-full min-h-[340px] sm:min-h-[380px] cursor-pointer perspective-1000 select-none group"
            >
              <div className={`relative w-full h-full min-h-[340px] sm:min-h-[380px] duration-500 transform-style-3d transition-transform rounded-3xl ${
                isFlipped ? 'rotate-y-180' : ''
              }`}>
              
              {/* --- FRONT OF CARD (卡片正面: 法语单词 + 阴阳性 + 国际音标) --- */}
              {/* --- FRONT OF CARD (卡片正面: 严格根据阴阳性赋予天空蓝 / 柔樱粉 辨析边框与背景) --- */}
              <div className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 border-2 shadow-lg flex flex-col justify-between backface-hidden transition-all ${
                currentItem.gender === 'feminine'
                  ? 'bg-gradient-to-b from-rose-50/60 via-white to-rose-50/20 border-rose-300 ring-4 ring-rose-400/10 shadow-rose-200/30'
                  : currentItem.gender === 'masculine'
                  ? 'bg-gradient-to-b from-sky-50/60 via-white to-sky-50/20 border-sky-300 ring-4 ring-sky-400/10 shadow-sky-200/30'
                  : 'bg-white border-slate-200/90 shadow-slate-200/40'
              }`}>
                
                {/* Top Badge Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-black shadow-2xs ${
                      currentItem.gender === 'feminine'
                        ? 'bg-rose-500 text-white border border-rose-600'
                        : currentItem.gender === 'masculine'
                        ? 'bg-sky-600 text-white border border-sky-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {currentItem.gender === 'feminine' ? '♀ 阴性名词 (la / une)' : currentItem.gender === 'masculine' ? '♂ 阳性名词 (le / un)' : currentItem.pos}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold">
                      {currentItem.level} · {currentItem.category}
                    </span>
                  </div>
                  
                  {/* Mastered checkmark button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMastered(currentItem.id);
                    }}
                    className={`p-2 rounded-xl transition cursor-pointer ${
                      masteredIds.includes(currentItem.id)
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-slate-300 hover:text-slate-400 hover:bg-slate-50'
                    }`}
                    title={masteredIds.includes(currentItem.id) ? '已标记为掌握' : '标记为已掌握'}
                  >
                    <CheckCircle2 className="w-5 h-5 fill-current" />
                  </button>
                </div>

                {/* Center Word & Pronunciation */}
                <div className="text-center py-5 space-y-3">
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <h2 className={`text-4xl sm:text-5xl font-black tracking-tight font-serif transition-all ${
                      currentItem.gender === 'feminine' ? 'text-rose-950' : currentItem.gender === 'masculine' ? 'text-sky-950' : 'text-slate-900'
                    } ${maskMode === 'hideFr' && !isFlipped ? 'filter blur-md' : ''}`}>
                      {currentItem.article && (
                        <span className={`mr-2 font-normal opacity-85 ${
                          currentItem.gender === 'feminine' ? 'text-rose-600' : 'text-sky-600'
                        }`}>
                          {currentItem.article}
                        </span>
                      )}
                      {currentItem.french}
                    </h2>
                    
                    <div className="flex items-center gap-1 bg-white/95 p-1 rounded-2xl border border-slate-200/90 shadow-2xs">
                      <button
                        type="button"
                        onClick={(e) => playVoice(e, `${currentItem.article ? currentItem.article + ' ' : ''}${currentItem.french}`, speechRate)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-[#80142A] text-[#80142A] hover:text-white transition cursor-pointer flex items-center gap-1 font-bold text-xs"
                        title={`当前语速 (${speechRate}x) 朗读`}
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>朗读</span>
                      </button>
                      <div className="h-4 w-px bg-slate-200 mx-0.5" />
                      {([0.8, 1.0, 1.2] as const).map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSpeechRate(rate);
                            playVoice(e, `${currentItem.article ? currentItem.article + ' ' : ''}${currentItem.french}`, rate);
                          }}
                          className={`px-2 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                            speechRate === rate
                              ? 'bg-[#80142A] text-white shadow-2xs'
                              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                          }`}
                          title={`切换并以 ${rate}x 语速朗读`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className={`text-sm font-mono font-bold tracking-wider ${
                    currentItem.gender === 'feminine' ? 'text-rose-800/80' : currentItem.gender === 'masculine' ? 'text-sky-800/80' : 'text-stone-500'
                  } ${maskMode === 'hideFr' && !isFlipped ? 'filter blur-md' : ''}`}>
                    {currentItem.phonetic}
                  </p>

                  {/* 元音/h开头省音与联诵提示 */}
                  {currentItem.pos.includes('n.') && isVowelOrMuteH(currentItem.french) && (
                    <div className="text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl inline-flex items-center gap-1 mt-1 shadow-2xs">
                      <span>💡 <strong>省音/联诵提示</strong>：单数定冠词用 <strong>l'{currentItem.french}</strong>；复数定冠词 les 强制联诵 [z]（读作 [lez‿{currentItem.french}]）</span>
                    </div>
                  )}

                  {/* Masked Prompt Hint */}
                  {maskMode === 'hideFr' && !isFlipped && (
                    <p className="text-xs text-[#80142A] font-bold mt-2 animate-pulse">
                      (已遮挡法文，点击卡片 3D 翻转查看原文)
                    </p>
                  )}
                </div>

                {/* Bottom Hint & Keyboard shortcuts */}
                <div className="text-center space-y-1">
                  <p className="text-xs text-slate-400 font-bold flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#DDBF78]" />
                    <span>点击卡片翻转查看【中文释义 · 实战例句 · 阴阳性考点】</span>
                  </p>
                  <div className="hidden sm:flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">Space 翻转</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">← / → 切词</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">1 掌握</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">↑ 朗读</span>
                  </div>
                </div>
              </div>

              {/* --- BACK OF CARD (卡片背面: 3D 翻转呈现中文释义与原比例句) --- */}
              <div className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 border-2 shadow-xl flex flex-col justify-between rotate-y-180 backface-hidden overflow-y-auto ${
                currentItem.gender === 'feminine'
                  ? 'bg-gradient-to-br from-rose-50/90 via-white to-rose-50/30 border-rose-300'
                  : currentItem.gender === 'masculine'
                  ? 'bg-gradient-to-br from-sky-50/90 via-white to-sky-50/30 border-sky-300'
                  : 'bg-gradient-to-br from-[#FCECEF]/80 via-white to-slate-50 border-[#80142A]/30'
              }`}>
                
                {/* Top Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                      currentItem.gender === 'feminine' ? 'bg-rose-500 text-white' : currentItem.gender === 'masculine' ? 'bg-sky-600 text-white' : 'bg-[#80142A] text-white'
                    }`}>
                      {currentItem.article ? currentItem.article + ' ' : ''}{currentItem.french}
                    </span>
                    <span className="text-xs font-mono text-stone-500 font-semibold">{currentItem.phonetic}</span>
                    <span className="text-xs font-bold text-slate-500">
                      ({currentItem.gender === 'feminine' ? '阴性' : currentItem.gender === 'masculine' ? '阳性' : currentItem.pos})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/90 p-1 rounded-xl border border-slate-200 shadow-2xs">
                    <button
                      type="button"
                      onClick={(e) => playVoice(e, `${currentItem.article ? currentItem.article + ' ' : ''}${currentItem.french}`, speechRate)}
                      className="px-2 py-1 rounded-lg bg-slate-50 hover:bg-[#80142A] text-[#80142A] hover:text-white transition cursor-pointer flex items-center gap-1 font-bold text-xs"
                      title={`以当前语速 (${speechRate}x) 朗读`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{speechRate}x</span>
                    </button>
                  </div>
                </div>

                {/* Center Content: Meaning & Example */}
                <div className="space-y-4 my-auto py-2">
                  {/* Meaning */}
                  <div>
                    <span className={`text-[10px] font-bold tracking-wider uppercase ${
                      currentItem.gender === 'feminine' ? 'text-rose-700' : currentItem.gender === 'masculine' ? 'text-sky-700' : 'text-[#80142A]'
                    }`}>
                      中文释义
                    </span>
                    <p className={`text-2xl sm:text-3xl font-black text-slate-900 mt-0.5 ${
                      maskMode === 'hideZh' ? 'filter blur-md' : ''
                    }`}>
                      {currentItem.chinese}
                    </p>
                  </div>

                  {/* Example Sentence */}
                  {currentItem.example && (
                    <div className="bg-white/95 p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 space-y-1.5 shadow-2xs">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm sm:text-base font-serif font-bold text-[#29354A] leading-relaxed">
                          « {currentItem.example.fr} »
                        </p>
                        <button
                          onClick={(e) => playVoice(e, currentItem.example.fr)}
                          className="p-1 text-slate-400 hover:text-[#80142A] shrink-0 cursor-pointer"
                          title="朗读整句例句"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className={`text-xs text-slate-600 leading-relaxed font-medium ${
                        maskMode === 'hideZh' ? 'filter blur-md' : ''
                      }`}>
                        {currentItem.example.chinese || currentItem.example.zh}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Mastery Button */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <span className="text-xs text-slate-400 font-bold">
                    再次点击卡片 3D 翻回正面
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMastered(currentItem.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                      masteredIds.includes(currentItem.id)
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{masteredIds.includes(currentItem.id) ? '已记牢' : '标记为已掌握'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

          {/* 底部翻页控制器 */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrev}
              className="flex-1 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/80 text-[#29354A] font-bold text-sm flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer active:scale-98"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>上一个</span>
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition shadow-xs cursor-pointer"
              title="翻转卡片"
            >
              <RotateCw className="w-4 h-4" />
              <span>翻转</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-2xl bg-[#80142A] hover:bg-[#680E20] text-white font-bold text-sm flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer active:scale-98"
            >
              <span>下一个</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : viewMode === 'list' && filteredVocab.length > 0 ? (
        /* 4. 列表速查模式 (List View Mode) */
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {( (!isVip && activeLevel !== 'A1') ? filteredVocab.slice(0, 12) : filteredVocab ).map((v, idx) => {
              const isMastered = masteredIds.includes(v.id);
              return (
                <div 
                  key={v.id} 
                  className={`p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition ${
                    isMastered ? 'bg-emerald-50/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <button
                      onClick={() => toggleMastered(v.id)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition cursor-pointer ${
                        isMastered ? 'bg-emerald-500 text-white' : 'border border-slate-200 text-transparent hover:border-slate-400'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                    
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base sm:text-lg font-black text-slate-900 font-serif">
                          {v.article && <span className="text-[#80142A] mr-1.5 font-normal">{v.article}</span>}
                          {v.french}
                        </span>
                        <span className="text-xs font-mono text-stone-400 font-bold">{v.phonetic}</span>
                        <span className={`text-[10px] px-2 py-0.2 rounded font-bold ${
                          v.gender === 'feminine' ? 'bg-[#FCECEF] text-[#80142A]' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {v.gender === 'feminine' ? '阴性' : v.gender === 'masculine' ? '阳性' : v.pos}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium truncate">
                        {v.chinese}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => playVoice(e, `${v.article ? v.article + ' ' : ''}${v.french}`)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-[#FCECEF] text-[#80142A] transition cursor-pointer"
                      title="朗读"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* 列表模式 VIP 试学节点提示条 */}
            {!isVip && activeLevel !== 'A1' && filteredVocab.length > 12 && (
              <div className="p-6 bg-gradient-to-r from-[#FCECEF]/80 via-[#FFF9F9] to-white border-t border-[#80142A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
                <div className="space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Lock className="w-4 h-4 text-[#80142A]" />
                    <span className="text-xs font-black text-[#29354A]">
                      当前仅展示前 12 条试学词汇 · 剩余 {filteredVocab.length - 12} 条已锁定
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    拍下卡密激活 VIP 终身卡，立享全量 5,000+ 欧标与考研高频词库、原声连读与真题例句！
                  </p>
                </div>
                <button
                  onClick={() => onOpenVipModal?.('输入卡密解锁全量 5000+ 法语核心词库')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#80142A] to-[#9B1B36] hover:from-[#680E20] hover:to-[#80142A] text-white text-xs font-black shadow-xs shadow-[#80142A]/20 cursor-pointer shrink-0"
                >
                  🔑 输入卡密解锁全部 →
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200/80">
          未找到匹配的词汇条目
        </div>
      )}

    </div>
  );
};


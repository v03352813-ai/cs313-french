import React, { useState, useRef } from 'react';
import { 
  BookOpenCheck, 
  Search, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  ChevronLeft,
  Info,
  Lock,
  KeyRound,
  Volume2,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';
import { FRENCH_GRAMMAR_LIST, GrammarPoint } from '../data/french/grammarData';
import { speakFrench } from '../utils/speech';

interface GrammarViewProps {
  isVip?: boolean;
  onOpenVipModal?: (reason?: string) => void;
}

export const GrammarView: React.FC<GrammarViewProps> = ({
  isVip = false,
  onOpenVipModal
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPoint, setSelectedPoint] = useState<GrammarPoint>(FRENCH_GRAMMAR_LIST[0]);
  const [playingFr, setPlayingFr] = useState<string | null>(null);

  const detailScrollRef = useRef<HTMLDivElement | null>(null);
  const formulaRef = useRef<HTMLDivElement | null>(null);
  const rulesRef = useRef<HTMLDivElement | null>(null);
  const trapRef = useRef<HTMLDivElement | null>(null);

  const categories = [
    { id: 'all', label: '全部语法', isFree: true },
    { id: '冠词与名词', label: '冠词与名词 · 免费', isFree: true },
    { id: '代词系统', label: '代词全景 (直宾/间宾/y/en)', isFree: false },
    { id: '时态与语态', label: '时态分词配合', isFree: false },
    { id: '从句与虚拟式', label: '从句与虚拟式', isFree: false },
  ];

  const filteredPoints = FRENCH_GRAMMAR_LIST.filter(item => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.title.includes(searchQuery) ||
                        item.frenchTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.summary.includes(searchQuery);
    return matchCat && matchSearch;
  });

  const currentIndex = filteredPoints.findIndex(p => p.id === selectedPoint.id);
  const prevPoint = currentIndex > 0 ? filteredPoints[currentIndex - 1] : null;
  const nextPoint = currentIndex >= 0 && currentIndex < filteredPoints.length - 1 ? filteredPoints[currentIndex + 1] : null;

  const handleSelectPoint = (point: GrammarPoint, idx: number) => {
    const isLockedPoint = !isVip && point.category !== '冠词与名词' && idx >= 2;
    if (isLockedPoint) {
      onOpenVipModal?.(`🔒【${point.title}】为考研二外重点避坑指南（VIP专属）！输入卡密即可解锁全量文法解析！`);
      return;
    }
    setSelectedPoint(point);
    if (detailScrollRef.current) {
      detailScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPoint = () => {
    if (prevPoint) {
      handleSelectPoint(prevPoint, currentIndex - 1);
    }
  };

  const handleNextPoint = () => {
    if (nextPoint) {
      handleSelectPoint(nextPoint, currentIndex + 1);
    }
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSpeak = async (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingFr(text);
    await speakFrench(text, 0.9);
    setPlayingFr(null);
  };

  return (
    <div className="space-y-3.5 sm:space-y-4 pb-0">
      
      {/* Top Hero Banner */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCECEF] text-[#80142A] text-xs font-bold border border-[#80142A]/25">
            <BookOpenCheck className="w-3.5 h-3.5 text-[#DDBF78]" />
            <span>法兰西学术院正统文法规范 · 左右对称滑块学习台</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#29354A] tracking-tight">
            法语考研二外与 DELF 全能语法速查宝典
          </h1>
          <p className="text-xs sm:text-sm text-[#29354A]/80 leading-relaxed max-w-3xl">
            直击考研二外失分重灾区：副代词 y/en 深度解析、直接宾语提前过去分词配合、自反动词性数配合与虚拟式触发器，配独家【考研避坑指南】。
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout (左右对称 50%/50% 严格等高，右侧滑块滑动面板) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
        
        {/* Left Column (50%): Grammar Points Navigator Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex flex-col h-[680px] sm:h-[720px]">
          
          {/* Top: Search & Category Tabs */}
          <div className="space-y-2.5 pb-3 border-b border-slate-100 shrink-0">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="检索考点 (如 直宾提前, y/en, 虚拟式...)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200/80 text-xs sm:text-sm text-[#29354A] placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#80142A]/20 transition"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map(cat => {
                const isLocked = !isVip && !cat.isFree;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      if (isLocked) {
                        onOpenVipModal?.(`🔒【${cat.label}】为考研二外重点攻坚专区！输入卡密即可解锁副代词 y/en、虚拟式等全量文法考点！`);
                        return;
                      }
                      setActiveCategory(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                      activeCategory === cat.id
                        ? 'bg-[#80142A] text-white shadow-xs font-black'
                        : isLocked
                        ? 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200/80'
                        : 'bg-white text-[#29354A] hover:bg-slate-50 border border-slate-200/80'
                    }`}
                  >
                    {isLocked && <Lock className="w-3 h-3 text-amber-600 shrink-0" />}
                    <span>{cat.label}</span>
                    {isLocked && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-black">
                        VIP
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrollable List of Grammar Points */}
          <div className="flex-1 overflow-y-auto py-2 space-y-1.5 pr-1 scrollbar-thin">
            {filteredPoints.map((point, idx) => {
              const isSelected = selectedPoint.id === point.id;
              const isLockedPoint = !isVip && point.category !== '冠词与名词' && idx >= 2;
              return (
                <button
                  key={point.id}
                  onClick={() => handleSelectPoint(point, idx)}
                  className={`w-full p-3.5 rounded-2xl flex items-start justify-between text-left transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#FCECEF] text-[#80142A] border-2 border-[#80142A] shadow-xs'
                      : 'hover:bg-slate-50 border border-slate-100/70 text-[#29354A]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                        isSelected ? 'bg-[#80142A] text-white' : 'bg-slate-100 text-[#29354A]'
                      }`}>
                        {point.level}
                      </span>
                      <span className={`text-xs ${isSelected ? 'text-[#80142A]' : 'text-stone-500'}`}>{point.category}</span>
                      {isLockedPoint ? (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-black">
                          🔒 VIP
                        </span>
                      ) : (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                          ✓ 免费
                        </span>
                      )}
                    </div>
                    <h3 className={`font-bold text-xs sm:text-sm leading-snug ${isSelected ? 'text-[#80142A]' : 'text-[#29354A]'}`}>
                      {point.title}
                    </h3>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 mt-2 ${isSelected ? 'text-[#80142A]' : 'text-stone-300'}`} />
                </button>
              );
            })}
          </div>

          {/* Left Footer: Stats & Hint */}
          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 shrink-0 px-1">
            <span>共收录 {filteredPoints.length} 个重点语法考点</span>
            <span>点击考点实时同步右侧滑块</span>
          </div>
        </div>

        {/* Right Column (50%): Detailed Grammar Card with Smooth Scroll Slider */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col h-[680px] sm:h-[720px] relative">
          
          {/* Top Header of Selected Grammar Point (Fixed Header) */}
          <div className="space-y-2 pb-3.5 border-b border-slate-200/80 shrink-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#FCECEF] text-[#80142A] text-xs font-bold border border-[#80142A]/20">
                  {selectedPoint.level} · {selectedPoint.category}
                </span>
                <span className="text-xs text-stone-400 font-serif italic truncate max-w-[200px]">
                  {selectedPoint.frenchTitle}
                </span>
              </div>
              <span className="text-[11px] text-stone-400 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">
                ↕ 右侧内容可上下滑块滑动
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#29354A] tracking-tight">
              {selectedPoint.title}
            </h2>

            {/* Quick Section Slider Navigation Buttons */}
            <div className="flex items-center gap-1.5 pt-1 overflow-x-auto scrollbar-none">
              <button
                onClick={() => scrollToSection(formulaRef)}
                className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100/80 text-amber-900 text-[11px] font-bold border border-amber-200/60 transition cursor-pointer flex items-center gap-1 whitespace-nowrap"
              >
                <Sparkles className="w-3 h-3 text-[#DDBF78]" />
                <span>核心文法公式</span>
              </button>
              <button
                onClick={() => scrollToSection(rulesRef)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition cursor-pointer flex items-center gap-1 whitespace-nowrap"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>分项详解与例句</span>
              </button>
              <button
                onClick={() => scrollToSection(trapRef)}
                className="px-2.5 py-1 rounded-lg bg-[#FCECEF] hover:bg-[#fbdde3] text-[#80142A] text-[11px] font-bold border border-[#80142A]/20 transition cursor-pointer flex items-center gap-1 whitespace-nowrap"
              >
                <AlertTriangle className="w-3 h-3 text-[#80142A]" />
                <span>考研避坑指南</span>
              </button>
            </div>
          </div>

          {/* Middle: Scrollable Detailed Content with Smooth Slider (滑块滑动区域) */}
          <div ref={detailScrollRef} className="flex-1 overflow-y-auto py-4 space-y-4.5 pr-2 scrollbar-thin">
            
            {/* Formula Block (Anchor Ref) */}
            <div ref={formulaRef} className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/50 via-slate-50 to-white border border-amber-200/60 space-y-1.5 shadow-2xs">
              <div className="text-xs font-bold text-[#29354A] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#DDBF78]" />
                <span>核心黄金法则公式 (Règle d'or)</span>
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-[#80142A] bg-white/90 p-2.5 rounded-xl border border-amber-100 shadow-xs">
                {selectedPoint.formula}
              </div>
              <p className="text-xs text-[#29354A]/80 leading-relaxed pt-0.5">
                {selectedPoint.summary}
              </p>
            </div>

            {/* Rules and Examples List (Anchor Ref) */}
            <div ref={rulesRef} className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#80142A]" />
                  <span>分项详解与高频实战例句</span>
                </h4>
                <span className="text-[10px] text-slate-400">点击小喇叭朗读例句</span>
              </div>

              {selectedPoint.rules.map((rule, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/70 space-y-2.5">
                  <h4 className="font-bold text-sm text-[#29354A] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#80142A] text-white text-[10px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{rule.name}</span>
                  </h4>
                  <p className="text-xs text-[#29354A]/80 leading-relaxed font-medium">
                    {rule.description}
                  </p>
                  <div className="space-y-2 pt-1">
                    {rule.examples.map((ex, i) => {
                      const isSpeaking = playingFr === ex.fr;
                      return (
                        <div key={i} className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs space-y-1 shadow-2xs hover:border-[#80142A]/30 transition">
                          <div className="flex items-start justify-between gap-2">
                            <div className="font-serif font-bold text-sm text-[#29354A] leading-relaxed">
                              « {ex.fr} »
                            </div>
                            <button
                              onClick={(e) => handleSpeak(ex.fr, e)}
                              className={`p-1 rounded-lg shrink-0 transition cursor-pointer ${
                                isSpeaking
                                  ? 'bg-[#80142A] text-white animate-pulse'
                                  : 'text-slate-400 hover:text-[#80142A] hover:bg-[#FCECEF]'
                              }`}
                              title="朗读标准发音"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[#29354A]/70 text-xs font-medium">
                            {ex.zh}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Critical Exam Trap Alert (Anchor Ref) */}
            <div ref={trapRef} className="p-4 rounded-2xl bg-[#FCECEF] border border-[#80142A]/30 text-[#29354A] space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-xs text-[#80142A]">
                <AlertTriangle className="w-4 h-4 text-[#80142A]" />
                <span>考研二外 & 考级避坑指南 (Exam Trap)</span>
              </div>
              <p className="text-xs leading-relaxed text-[#29354A] font-medium">
                {selectedPoint.examTrap}
              </p>
            </div>

          </div>

          {/* Bottom Footer: Slide Navigator Controls (滑块翻页控制器) */}
          <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2 shrink-0">
            <button
              onClick={handlePrevPoint}
              disabled={!prevPoint}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                prevPoint 
                  ? 'bg-slate-100 hover:bg-slate-200 text-[#29354A] cursor-pointer' 
                  : 'bg-slate-50 text-slate-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>上一考点</span>
            </button>

            <div className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/50">
              考点 <span className="font-bold text-[#80142A]">{currentIndex + 1}</span> / {filteredPoints.length}
            </div>

            <button
              onClick={handleNextPoint}
              disabled={!nextPoint}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                nextPoint 
                  ? 'bg-[#80142A] hover:bg-[#680E20] text-white shadow-xs cursor-pointer' 
                  : 'bg-slate-50 text-slate-300 cursor-not-allowed'
              }`}
            >
              <span>下一考点</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};


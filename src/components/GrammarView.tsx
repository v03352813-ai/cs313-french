import React, { useState, useRef, useMemo, useEffect } from 'react';
import { 
  BookOpenCheck, 
  Search, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  Lock, 
  Network,
  GraduationCap,
  Globe2,
  Layers,
  ArrowRight,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { FRENCH_GRAMMAR_LIST, GrammarPoint } from '../data/french/grammarData';
import { speakFrench } from '../utils/speech';
import { FrenchGrammarVisualMindMap } from './FrenchGrammarVisualMindMap';

interface GrammarViewProps {
  isVip?: boolean;
  onOpenVipModal?: (reason?: string) => void;
}

export const GrammarView: React.FC<GrammarViewProps> = ({
  isVip = false,
  onOpenVipModal
}) => {
  const [trackFilter, setTrackFilter] = useState<'kaoyan' | 'delf' | 'all'>('kaoyan');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPoint, setSelectedPoint] = useState<GrammarPoint>(FRENCH_GRAMMAR_LIST[0]);
  const [playingFr, setPlayingFr] = useState<string | null>(null);

  const [showMindMap, setShowMindMap] = useState<boolean>(false);
  const [showBridgesGuide, setShowBridgesGuide] = useState<boolean>(true);

  const detailScrollRef = useRef<HTMLDivElement | null>(null);
  const formulaRef = useRef<HTMLDivElement | null>(null);
  const bridgeRef = useRef<HTMLDivElement | null>(null);
  const rulesRef = useRef<HTMLDivElement | null>(null);
  const trapRef = useRef<HTMLDivElement | null>(null);

  const categories = [
    { id: 'all', label: '全部类别', isFree: true },
    { id: '冠词与名词', label: '冠词与名词 · 免费', isFree: true },
    { id: '代词系统', label: '代词全景 (COD/COI/y/en)', isFree: false },
    { id: '时态与语态', label: '时态分词配合', isFree: false },
    { id: '从句与虚拟式', label: '从句/虚拟式/连接词', isFree: false },
  ];

  const kaoyanCount = useMemo(() => {
    return FRENCH_GRAMMAR_LIST.filter(item => item.tracks.includes('kaoyan')).length;
  }, []);

  const delfCount = useMemo(() => {
    return FRENCH_GRAMMAR_LIST.filter(item => item.tracks.includes('delf')).length;
  }, []);

  const filteredPoints = useMemo(() => {
    return FRENCH_GRAMMAR_LIST.filter(item => {
      let matchTrack = true;
      if (trackFilter === 'kaoyan') {
        matchTrack = item.tracks.includes('kaoyan');
      } else if (trackFilter === 'delf') {
        matchTrack = item.tracks.includes('delf');
      }
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = item.title.includes(searchQuery) ||
                          item.frenchTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.includes(searchQuery);
      return matchTrack && matchCat && matchSearch;
    });
  }, [trackFilter, activeCategory, searchQuery]);

  // Keep selectedPoint valid when filter changes
  useEffect(() => {
    if (filteredPoints.length > 0 && !filteredPoints.some(p => p.id === selectedPoint.id)) {
      setSelectedPoint(filteredPoints[0]);
    }
  }, [filteredPoints, selectedPoint.id]);

  const currentIndex = filteredPoints.findIndex(p => p.id === selectedPoint.id);
  const prevPoint = currentIndex > 0 ? filteredPoints[currentIndex - 1] : null;
  const nextPoint = currentIndex >= 0 && currentIndex < filteredPoints.length - 1 ? filteredPoints[currentIndex + 1] : null;

  const handleSelectPoint = (point: GrammarPoint, idx: number) => {
    const isLockedPoint = !isVip && point.category !== '冠词与名词' && idx >= 2;
    if (isLockedPoint) {
      onOpenVipModal?.(`🔒【${point.title}】为高频避坑考点（VIP专属）！输入卡密即可解锁全量文法解析！`);
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
    <div className="space-y-4 sm:space-y-5 pb-8">
      
      {/* ============================================================ */}
      {/* ① 醒目第一级分块：双轨核心架构网关 (Dual-Track Core Gateway) */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
        
        {/* 顶部标题与动态说明 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#FCECEF] text-[#80142A] text-xs font-black border border-[#80142A]/25 flex items-center gap-1.5">
                <BookOpenCheck className="w-3.5 h-3.5 text-[#DDBF78]" />
                <span>
                  {trackFilter === 'kaoyan' 
                    ? '🏛️ 全国考研二外重点体系' 
                    : trackFilter === 'delf' 
                    ? '🌍 DELF/DALF 欧标应用体系' 
                    : '📚 法语全景文法总库'}
                </span>
              </span>
              <span className="text-xs text-[#80142A] font-bold">
                ★ 独立双轨文法宝典
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#29354A] tracking-tight">
              {trackFilter === 'kaoyan'
                ? '全国高校考研二外文法避坑与踩分宝典'
                : trackFilter === 'delf'
                ? 'DELF / DALF 欧标应用文法与交际规范宝典'
                : '法语核心文法高频考点演练场'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {trackFilter === 'kaoyan'
                ? '直击全国各大名校（241/242/243 自命题）失分重灾区：副代词 y/en 深度辨析、直接宾语提前过去分词配合、自反代动词间宾陷阱与虚拟式避坑。'
                : trackFilter === 'delf'
                ? '聚焦法国教育部 CIEP 官方欧标交际与应用能力：论证逻辑连接词（Connecteurs logiques）、条件式委婉提议、间接引语时态配合与公函句式规范。'
                : '系统建立法语底层逻辑，涵盖 70+ 核心考点与 46 考点交互式思维导图，彻底告别语法死记硬背。'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 flex-wrap">
            <button
              onClick={() => setShowMindMap(!showMindMap)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition flex items-center gap-2 cursor-pointer shadow-2xs border ${
                showMindMap
                  ? 'bg-[#80142A] text-white border-[#80142A] shadow-md ring-2 ring-rose-200'
                  : 'bg-rose-50 hover:bg-rose-100 text-[#80142A] border-rose-200'
              }`}
              title="查看法语核心语法全景思维导图"
            >
              <Network className="w-4 h-4" />
              <span>{showMindMap ? '收起导图大树' : '🌳 全景思维导图'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${showMindMap ? 'bg-white/20 text-white' : 'bg-[#80142A] text-white'}`}>
                46考点大树
              </span>
            </button>
          </div>
        </div>

        {/* 关键：两大独立核心赛道大卡片（醒目、气派、彻底分块清晰！） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {/* 赛道卡片 1: 考研二外 */}
          <div
            onClick={() => {
              setTrackFilter('kaoyan');
              setActiveCategory('all');
            }}
            className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 relative ${
              trackFilter === 'kaoyan'
                ? 'bg-gradient-to-br from-[#FFF9FA] via-[#FCF1F3] to-[#FCECEF]/70 border-[#80142A] shadow-md ring-2 ring-[#80142A]/20'
                : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-2xs ${
              trackFilter === 'kaoyan' ? 'bg-[#80142A] text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              🏛️
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className={`text-base sm:text-lg font-black ${trackFilter === 'kaoyan' ? 'text-[#80142A]' : 'text-slate-800'}`}>
                  全国高校考研二外体系
                </h3>
                <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full whitespace-nowrap ${
                  trackFilter === 'kaoyan' ? 'bg-[#80142A] text-white shadow-2xs' : 'bg-slate-100 text-slate-600'
                }`}>
                  {kaoyanCount} 核心文法考点
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                专攻北外/上外/复旦/武大等自命题题型：副代词 y/en 替代理论、直宾抢跑提前配合、自反代动词间宾不配合与虚拟式避坑。
              </p>
            </div>
            {trackFilter === 'kaoyan' && (
              <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#80142A] text-white flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          {/* 赛道卡片 2: DELF 欧标 */}
          <div
            onClick={() => {
              setTrackFilter('delf');
              setActiveCategory('all');
            }}
            className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 relative ${
              trackFilter === 'delf'
                ? 'bg-gradient-to-br from-[#FFFDF7] via-[#FAF4E2] to-[#F6EDD0]/70 border-[#B89047] shadow-md ring-2 ring-[#B89047]/20'
                : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-2xs ${
              trackFilter === 'delf' ? 'bg-[#B89047] text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              🌍
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className={`text-base sm:text-lg font-black ${trackFilter === 'delf' ? 'text-[#8A6A1E]' : 'text-slate-800'}`}>
                  DELF / DALF 欧标应用体系
                </h3>
                <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full whitespace-nowrap ${
                  trackFilter === 'delf' ? 'bg-[#8A6A1E] text-white shadow-2xs' : 'bg-slate-100 text-slate-600'
                }`}>
                  {delfCount} 核心应用考点
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                聚焦 A1~B2 欧标实战能力：论证逻辑连接词（Connecteurs logiques）、条件式委婉提议、间接引语时态配合与公函句式。
              </p>
            </div>
            {trackFilter === 'delf' && (
              <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#B89047] text-white flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        </div>

        {/* 底部全览切换器 */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">当前正在研习：</span>
            <span className="font-black px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800">
              {trackFilter === 'kaoyan' ? '🏛️ 考研二外文法专场' : trackFilter === 'delf' ? '🌍 DELF 欧标应用专场' : '📚 全量文法总库'}
            </span>
          </div>
          {trackFilter !== 'all' ? (
            <button
              onClick={() => setTrackFilter('all')}
              className="text-[#80142A] hover:underline font-bold cursor-pointer"
            >
              查看不限方向的全部语法列表 ➔
            </button>
          ) : (
            <span className="text-slate-400">已展示全部语法</span>
          )}
        </div>
      </div>

      {/* 🌳 全景思维导图大树 (Visual Tree Graph) */}
      {showMindMap && (
        <FrenchGrammarVisualMindMap
          onSelectGrammar={(id) => {
            const pt = FRENCH_GRAMMAR_LIST.find(p => p.id === id);
            if (pt) {
              setSelectedPoint(pt);
              setShowMindMap(false);
              setTimeout(() => {
                detailScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }
          }}
          onNavigateConjugation={() => {
            window.location.hash = '#conjugate';
          }}
          onClose={() => setShowMindMap(false)}
        />
      )}

      {/* 💡 破壁指南 · 动词变位与文法考点的 4 大灵魂纽带 */}
      <div className="bg-gradient-to-br from-white via-amber-50/20 to-rose-50/20 rounded-2xl sm:rounded-3xl border border-amber-200/80 shadow-xs p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80 flex items-center justify-center text-base shadow-2xs font-bold">
                💡
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>破壁认知指南 · 动词变位与文法考点的 4 大灵魂纽带</span>
              </h2>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              为什么学了动词变位还是不会做题？因为缺乏<strong>“时态词根加工”</strong>与<strong>“性数贴标签”</strong>的映射思维！以下 4 大纽带直接打通变位器与语法真题：
            </p>
          </div>

          <button
            onClick={() => setShowBridgesGuide(!showBridgesGuide)}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 transition cursor-pointer shadow-2xs shrink-0"
          >
            {showBridgesGuide ? '折叠纽带卡片' : '展开 4 大纽带'}
          </button>
        </div>

        {showBridgesGuide && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {/* Card 1 */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🏭</span>
                  <h3 className="text-xs font-black text-slate-900">桥梁 1 · 词根加工厂</h3>
                </div>
                <div className="text-[11px] font-bold text-amber-800 bg-amber-50/80 px-2 py-0.5 rounded-md border border-amber-100">
                  现在时变位 ➔ 衍生四大时态
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  未完成过去时取现在时 <strong className="text-slate-800">nous 词根</strong>；虚拟式取现在时 <strong className="text-slate-800">ils 词根</strong>！只要背熟直陈式现在时，未完成与虚拟式便无需死记！
                </p>
              </div>
              <div className="text-[10px] text-slate-400 font-bold pt-1 border-t border-slate-100 flex items-center justify-between">
                <span>直通文法</span>
                <span className="text-[#80142A] font-mono">虚拟式触发陷阱</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🏷️</span>
                  <h3 className="text-xs font-black text-slate-900">桥梁 2 · 贴标签配合</h3>
                </div>
                <div className="text-[11px] font-bold text-rose-800 bg-rose-50/80 px-2 py-0.5 rounded-md border border-rose-100">
                  分词变身形容词性数配合
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  在复合过去时、愈过去时中，一旦触碰配合规则，过去分词瞬间变成形容词，女生贴 <strong className="text-[#80142A]">-e</strong>，复数贴 <strong className="text-[#80142A]">-s</strong>！
                </p>
              </div>
              <div className="text-[10px] text-slate-400 font-bold pt-1 border-t border-slate-100 flex items-center justify-between">
                <span>直通文法</span>
                <span className="text-rose-700 font-mono">过去分词性数配合</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🏠</span>
                  <h3 className="text-xs font-black text-slate-900">桥梁 3 · 进出房子位移</h3>
                </div>
                <div className="text-[11px] font-bold text-blue-800 bg-blue-50/80 px-2 py-0.5 rounded-md border border-blue-100">
                  助动词 être vs avoir 天平
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  95% 动作动词用 avoir，只管干活不贴标签；唯独进出房子的 <strong className="text-slate-800">16 个位移词</strong>（aller, venir...）和<strong className="text-slate-800">代动词</strong>用 être，且用 être <strong className="text-[#80142A]">必须贴标签配合</strong>！
                </p>
              </div>
              <div className="text-[10px] text-slate-400 font-bold pt-1 border-t border-slate-100 flex items-center justify-between">
                <span>直通文法</span>
                <span className="text-amber-700 font-mono">复合过去时助动词</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🏃‍♂️</span>
                  <h3 className="text-xs font-black text-slate-900">桥梁 4 · 宾语抢跑提前</h3>
                </div>
                <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50/80 px-2 py-0.5 rounded-md border border-emerald-100">
                  直宾 COD 抢跑补贴标签
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  用 avoir 时分词平时躺平不配合，但只要<strong className="text-slate-800">直接宾语</strong>抢跑到动词前面（代词提前或 que 从句），分词回头看见直宾，<strong className="text-[#80142A]">立刻补贴性数标签</strong>！间宾绝不配合！
                </p>
              </div>
              <div className="text-[10px] text-slate-400 font-bold pt-1 border-t border-slate-100 flex items-center justify-between">
                <span>直通文法</span>
                <span className="text-emerald-700 font-mono">直宾提前配合考研大题</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* ② 主题研习双栏工作台 (左右 50%/50% 严格等高对称)             */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
        
        {/* Left Column (50%): 考点列表检索区 */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex flex-col h-[560px] sm:h-[600px]">
          
          {/* Top: 考点检索与清晰分类筛选 */}
          <div className="space-y-2.5 pb-3 border-b border-slate-100 shrink-0">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="检索考点 (如 直宾提前, y/en, 虚拟式, 逻辑连接词...)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200/80 text-xs sm:text-sm text-[#29354A] placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#80142A]/20 transition"
              />
            </div>

            {/* 当前赛道提示与考点数 */}
            <div className="flex items-center justify-between px-1 text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                {trackFilter === 'kaoyan' ? '🏛️ 考研二外重点体系' : trackFilter === 'delf' ? '🌍 DELF 欧标应用体系' : '📚 全量语法总库'}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                已收录 <strong className="text-[#80142A]">{filteredPoints.length}</strong> 项重点考点
              </span>
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
                        onOpenVipModal?.(`🔒【${cat.label}】为重点攻坚专区！输入卡密即可解锁副代词 y/en、虚拟式等全量文法考点！`);
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
          <div className="flex-1 overflow-y-auto py-2 space-y-2 pr-1 scrollbar-thin">
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
                  <div className="space-y-1.5 flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                        isSelected ? 'bg-[#80142A] text-white' : 'bg-slate-100 text-[#29354A]'
                      }`}>
                        {point.level}
                      </span>
                      
                      {/* 醒目标明：本考点适用的赛道 */}
                      {point.tracks?.includes('kaoyan') && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-rose-50 text-[#80142A] font-bold border border-[#80142A]/20">
                          🏛️ 考研
                        </span>
                      )}
                      {point.tracks?.includes('delf') && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-50 text-[#8A6A1E] font-bold border border-[#DDBF78]/50">
                          🌍 DELF
                        </span>
                      )}

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
                    <h3 className={`font-black text-xs sm:text-sm leading-snug truncate ${isSelected ? 'text-[#80142A]' : 'text-[#29354A]'}`}>
                      {point.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono truncate">
                      {point.frenchTitle}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 mt-3 ${isSelected ? 'text-[#80142A]' : 'text-stone-300'}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
            <span>点击考点实时同步右侧精析</span>
            <span className="font-mono text-[#80142A] font-bold">考点 {currentIndex + 1} / {filteredPoints.length}</span>
          </div>
        </div>

        {/* Right Column (50%): 考点全景研习滑块详情看板 */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col h-[560px] sm:h-[600px] overflow-hidden">
          
          {/* Top Point Title Header */}
          <div className="pb-3.5 border-b border-slate-100 space-y-2 shrink-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#FCECEF] text-[#80142A] font-black border border-[#80142A]/20">
                  {selectedPoint.level} · {selectedPoint.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedPoint.frenchTitle}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                <span>↕ 右侧内容可上下滑块滑动</span>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-[#29354A] leading-tight">
              {selectedPoint.title}
            </h2>

            {/* Quick In-page Section Anchor Navigation */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none text-xs">
              <button
                onClick={() => scrollToSection(formulaRef)}
                className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold transition cursor-pointer flex items-center gap-1 border border-amber-200/60 shrink-0"
              >
                <Sparkles className="w-3 h-3 text-[#DDBF78]" />
                <span>核心法则公式</span>
              </button>
              {selectedPoint.conjugationBridge && (
                <button
                  onClick={() => scrollToSection(bridgeRef)}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#80142A] font-bold transition cursor-pointer flex items-center gap-1 border border-rose-200/60 shrink-0"
                >
                  <span>🔗 与变位纽带</span>
                </button>
              )}
              <button
                onClick={() => scrollToSection(rulesRef)}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold transition cursor-pointer flex items-center gap-1 border border-emerald-200/60 shrink-0"
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>分项详解与例句</span>
              </button>
              <button
                onClick={() => scrollToSection(trapRef)}
                className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold transition cursor-pointer flex items-center gap-1 border border-purple-200/60 shrink-0"
              >
                <AlertTriangle className="w-3 h-3" />
                <span>避坑指南</span>
              </button>
            </div>
          </div>

          {/* Scrollable Content Body with Visual Slider */}
          <div 
            ref={detailScrollRef}
            className="flex-1 overflow-y-auto py-4 space-y-4 pr-1.5 scrollbar-thin scroll-smooth"
          >
            {/* 考研二外 vs DELF 欧标专属踩分侧重点 */}
            {(selectedPoint.trackNotes?.kaoyan || selectedPoint.trackNotes?.delf) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {selectedPoint.trackNotes?.kaoyan && (
                  <div className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                    trackFilter === 'kaoyan' 
                      ? 'bg-[#FCECEF]/60 border-[#80142A]/30 ring-1 ring-[#80142A]/20 shadow-2xs' 
                      : 'bg-rose-50/40 border-rose-100'
                  }`}>
                    <div className="font-black text-[#80142A] flex items-center gap-1.5">
                      <span>🏛️ 考研二外命题踩分陷阱</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {selectedPoint.trackNotes.kaoyan}
                    </p>
                  </div>
                )}
                {selectedPoint.trackNotes?.delf && (
                  <div className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                    trackFilter === 'delf' 
                      ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-200 shadow-2xs' 
                      : 'bg-amber-50/40 border-amber-100'
                  }`}>
                    <div className="font-black text-[#8A6A1E] flex items-center gap-1.5">
                      <span>🌍 DELF 欧标写作与口试运用</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {selectedPoint.trackNotes.delf}
                    </p>
                  </div>
                )}
              </div>
            )}

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

            {/* Conjugation Bridge Callout (Anchor Ref) */}
            {selectedPoint.conjugationBridge && (
              <div ref={bridgeRef} className="p-4 rounded-2xl bg-gradient-to-r from-rose-50/40 via-amber-50/30 to-white border border-rose-200/90 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#80142A] text-white text-[10px] font-black tracking-wide shadow-2xs">
                      {selectedPoint.conjugationBridge.bridgeName}
                    </span>
                    <span className="text-xs font-black text-slate-800">
                      {selectedPoint.conjugationBridge.targetTenseOrRule}
                    </span>
                  </div>
                  <span className="text-[10px] text-rose-800 font-bold bg-rose-100/70 px-2 py-0.5 rounded-full border border-rose-200/60">
                    🔗 动词变位与文法互通机制
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white/80 p-3 rounded-xl border border-rose-100/80 shadow-2xs">
                  {selectedPoint.conjugationBridge.concept}
                </p>
              </div>
            )}

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

            {/* Exam Trap Guide (Anchor Ref) */}
            <div ref={trapRef} className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-base">⚠️</span>
                <h4 className="text-xs font-black text-purple-900 uppercase tracking-wider">
                  官方考点深度避坑指南 (Guide Anti-Pièges)
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-purple-950/90 leading-relaxed font-medium bg-white/70 p-3.5 rounded-xl border border-purple-100">
                {selectedPoint.examTrap}
              </p>
            </div>
          </div>

          {/* Bottom Fixed Paging Controller */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
            <button
              onClick={handlePrevPoint}
              disabled={!prevPoint}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                prevPoint 
                  ? 'bg-slate-100 hover:bg-slate-200 text-[#29354A]' 
                  : 'bg-slate-50 text-stone-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>上一考点</span>
            </button>

            <div className="text-xs font-bold text-slate-500">
              考点 <strong className="text-[#80142A] font-mono">{currentIndex + 1}</strong> / {filteredPoints.length}
            </div>

            <button
              onClick={handleNextPoint}
              disabled={!nextPoint}
              className={`flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                nextPoint 
                  ? 'bg-[#80142A] hover:bg-[#680E20] text-white shadow-xs' 
                  : 'bg-slate-50 text-stone-300 cursor-not-allowed'
              }`}
            >
              <span>下一考点</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

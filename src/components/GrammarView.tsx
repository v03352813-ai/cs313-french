import React, { useState } from 'react';
import { 
  BookOpenCheck, 
  Search, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  Info
} from 'lucide-react';
import { FRENCH_GRAMMAR_LIST, GrammarPoint } from '../data/french/grammarData';

export const GrammarView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPoint, setSelectedPoint] = useState<GrammarPoint>(FRENCH_GRAMMAR_LIST[0]);

  const categories = [
    { id: 'all', label: '全部语法' },
    { id: '冠词与名词', label: '冠词与名词配合' },
    { id: '代词系统', label: '直宾COD/间宾COI/副代词y en' },
    { id: '时态与语态', label: '时态分词配合' },
    { id: '从句与虚拟式', label: '从句与虚拟式Subjonctif' },
  ];

  const filteredPoints = FRENCH_GRAMMAR_LIST.filter(item => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.title.includes(searchQuery) ||
                        item.frenchTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.summary.includes(searchQuery);
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-4 sm:space-y-5 pb-0">
      
      {/* Top Hero Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCECEF] text-[#80142A] text-xs font-bold border border-[#80142A]/25">
            <BookOpenCheck className="w-3.5 h-3.5 text-[#DDBF78]" />
            <span>法兰西学术院正统文法规范</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#29354A] tracking-tight">
            法语考研二外与 DELF 全能语法速查宝典
          </h1>
          <p className="text-xs sm:text-sm text-[#29354A]/80 leading-relaxed max-w-3xl">
            直击考研二外失分重灾区：副代词 y/en 深度解析、直接宾语提前过去分词配合、自反动词性数配合与虚拟式触发器，配独家【考研避坑指南】。
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout (左右对称 50%/50% 布局，右侧滑块滑动面板) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-start">
        
        {/* Left Column (50%): Grammar Points Navigator */}
        <div className="space-y-3">
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="检索考点 (如 直宾提前, y/en, 虚拟式...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 text-xs sm:text-sm text-[#29354A] placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#80142A]/20 shadow-2xs"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#80142A] text-white shadow-xs'
                    : 'bg-white text-[#29354A] hover:bg-slate-50 border border-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* List of Grammar Points */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-2.5 space-y-1.5 max-h-[640px] overflow-y-auto scrollbar-thin">
            {filteredPoints.map(point => {
              const isSelected = selectedPoint.id === point.id;
              return (
                <button
                  key={point.id}
                  onClick={() => setSelectedPoint(point)}
                  className={`w-full p-3.5 rounded-2xl flex items-start justify-between text-left transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#FCECEF] text-[#80142A] border-2 border-[#80142A] shadow-xs'
                      : 'hover:bg-slate-50 border border-transparent text-[#29354A]'
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
        </div>

        {/* Right Column (50%): Detailed Grammar Card with Smooth Scroll Slider */}
        <div className="space-y-3">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-5 max-h-[710px] overflow-y-auto scrollbar-thin pr-2">
            
            {/* Header of Grammar Point */}
            <div className="space-y-2 pb-3.5 border-b border-slate-200/80">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-full bg-[#FCECEF] text-[#80142A] text-xs font-bold border border-[#80142A]/20">
                  {selectedPoint.level} · {selectedPoint.category}
                </span>
                <span className="text-[11px] text-stone-400 font-medium">
                  ↕ 详情内容可向下滑动研读
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#29354A] tracking-tight">
                {selectedPoint.title}
              </h2>
              <p className="text-xs font-serif italic text-stone-500">
                {selectedPoint.frenchTitle}
              </p>
              <p className="text-xs sm:text-sm text-[#29354A]/80 leading-relaxed pt-1">
                {selectedPoint.summary}
              </p>
            </div>

            {/* Formula Block */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="text-xs font-bold text-[#29354A] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#DDBF78]" />
                <span>核心文法公式 (Règle d'or)</span>
              </div>
              <div className="text-sm font-mono font-bold text-[#80142A]">
                {selectedPoint.formula}
              </div>
            </div>

            {/* Rules and Examples List */}
            <div className="space-y-4">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                分项详解与实战例句
              </div>
              {selectedPoint.rules.map((rule, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2.5">
                  <h4 className="font-bold text-sm text-[#29354A] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#80142A] shrink-0" />
                    <span>{rule.name}</span>
                  </h4>
                  <p className="text-xs text-[#29354A]/80 leading-relaxed">
                    {rule.description}
                  </p>
                  <div className="space-y-1.5 pt-1">
                    {rule.examples.map((ex, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs space-y-0.5">
                        <div className="font-serif font-bold text-[#29354A]">
                          {ex.fr}
                        </div>
                        <div className="text-[#29354A]/70">
                          {ex.zh}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Critical Exam Trap Alert */}
            <div className="p-4 rounded-2xl bg-[#FCECEF] border border-[#80142A]/30 text-[#29354A] space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-xs text-[#80142A]">
                <AlertTriangle className="w-4 h-4 text-[#80142A]" />
                <span>考研二外 & 考级避坑指南 (Exam Trap)</span>
              </div>
              <p className="text-xs leading-relaxed text-[#29354A]">
                {selectedPoint.examTrap}
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

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
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#243B5A] via-[#334F75] to-[#8C3B4A] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-[#243B5A]/40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#FAF5EB] text-xs font-semibold mb-2 backdrop-blur-xs border border-white/20">
            <BookOpenCheck className="w-3.5 h-3.5 text-[#DFBA73]" />
            <span>法兰西学术院正统文法规范</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            法语考研二外与 DELF 全能语法速查宝典
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm mt-1">
            直击考研二外失分重灾区：副代词 y/en 深度解析、直接宾语提前过去分词配合、自反动词性数配合与虚拟式触发器，配独家【考研避坑指南】。
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 cols): Grammar Points Navigator */}
        <div className="lg:col-span-5 space-y-3">
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="检索考点 (如 直宾提前, y/en, 虚拟式...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FCFAF6] border border-[#E8DECE] text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#243B5A]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  activeCategory === cat.id
                    ? 'bg-[#243B5A] text-white shadow-xs'
                    : 'bg-[#FCFAF6] text-[#243B5A] hover:bg-[#F7F3EA] border border-[#E8DECE]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* List of Grammar Points */}
          <div className="bg-[#FCFAF6] rounded-3xl border border-[#E8DECE] shadow-xs p-2 space-y-1.5 max-h-[560px] overflow-y-auto">
            {filteredPoints.map(point => {
              const isSelected = selectedPoint.id === point.id;
              return (
                <button
                  key={point.id}
                  onClick={() => setSelectedPoint(point)}
                  className={`w-full p-3.5 rounded-2xl flex items-start justify-between text-left transition ${
                    isSelected
                      ? 'bg-[#243B5A] text-white shadow-sm shadow-[#243B5A]/20'
                      : 'hover:bg-[#F7F3EA] text-slate-800'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#243B5A]/10 text-[#243B5A]'
                      }`}>
                        {point.level}
                      </span>
                      <span className="text-xs opacity-75">{point.category}</span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm leading-snug">
                      {point.title}
                    </h3>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 mt-2 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column (7 cols): Detailed Grammar Card */}
        <div className="lg:col-span-7">
          <div className="bg-[#FCFAF6] rounded-3xl border border-[#E8DECE] shadow-sm p-6 sm:p-8 space-y-6">
            
            {/* Header of Grammar Point */}
            <div className="space-y-2 pb-4 border-b border-[#E8DECE]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#243B5A]/10 text-[#243B5A] text-xs font-bold">
                  {selectedPoint.level} · {selectedPoint.category}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#243B5A] tracking-tight">
                {selectedPoint.title}
              </h2>
              <p className="text-xs font-serif italic text-[#8C3B4A]">
                {selectedPoint.frenchTitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {selectedPoint.summary}
              </p>
            </div>

            {/* Formula Block */}
            <div className="p-4 rounded-2xl bg-[#FAF5EB] border border-[#C5A059]/40 space-y-1">
              <div className="text-xs font-bold text-[#8F6F2E] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>核心文法公式 (Règle d'or)</span>
              </div>
              <div className="text-sm font-mono font-bold text-[#243B5A]">
                {selectedPoint.formula}
              </div>
            </div>

            {/* Rules and Examples List */}
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                分项详解与实战例句
              </div>
              {selectedPoint.rules.map((rule, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F7F3EA] border border-[#E8DECE] space-y-2.5">
                  <h4 className="font-bold text-sm text-[#243B5A] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#243B5A] shrink-0" />
                    <span>{rule.name}</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {rule.description}
                  </p>
                  <div className="space-y-1.5 pt-1">
                    {rule.examples.map((ex, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-[#FCFAF6] border border-[#E8DECE] text-xs space-y-0.5">
                        <div className="font-serif font-bold text-slate-900">
                          {ex.fr}
                        </div>
                        <div className="text-slate-500">
                          {ex.zh}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Critical Exam Trap Alert */}
            <div className="p-4 rounded-2xl bg-[#FCEDEF] border border-[#8C3B4A]/30 text-[#8C3B4A] space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-xs text-[#8C3B4A]">
                <AlertTriangle className="w-4 h-4 text-[#8C3B4A]" />
                <span>考研二外 & 考级避坑指南 (Exam Trap)</span>
              </div>
              <p className="text-xs leading-relaxed text-[#732231]">
                {selectedPoint.examTrap}
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

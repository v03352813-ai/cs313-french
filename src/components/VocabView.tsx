import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Volume2, 
  RotateCw, 
  Check, 
  Sparkles, 
  Bookmark,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { FRENCH_VOCAB_LIST, FrenchVocab } from '../data/french/vocabData';

export const VocabView: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());

  const levels = [
    { id: 'all', label: '全部词库' },
    { id: 'A1', label: 'A1 入门' },
    { id: 'A2', label: 'A2 基础' },
    { id: 'B1', label: 'B1 进阶' },
    { id: 'B2', label: 'B2 提升' },
    { id: 'KAOYAN', label: '考研二外高频' }
  ];

  const filteredVocab = FRENCH_VOCAB_LIST.filter(item => {
    const matchLevel = activeLevel === 'all' || item.level === activeLevel;
    const matchSearch = item.french.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.chinese.includes(searchQuery);
    return matchLevel && matchSearch;
  });

  const currentItem: FrenchVocab | undefined = filteredVocab[currentIndex] || filteredVocab[0];

  const playSpeech = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore
    }
  };

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

  const toggleLearned = (id: string) => {
    setLearnedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Hero Banner */}
      <div className="bg-[#FCFAF6] rounded-3xl border border-[#E8DECE] shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3DDE2] text-[#A94A62] text-xs font-bold border border-[#A94A62]/25">
            <Layers className="w-3.5 h-3.5 text-[#D8B15F]" />
            <span>艾宾浩斯抗遗忘记忆曲线</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#29354A] tracking-tight">
            法语核心考纲词汇闪卡 (阴阳性双标)
          </h1>
          <p className="text-xs sm:text-sm text-[#29354A]/80 leading-relaxed max-w-3xl font-medium">
            背法语单词最忌讳不记阴阳性！卡片严格标定 <strong className="text-[#A94A62] font-bold">阳性 (Masculin 标)</strong> 与 <strong className="text-[#A94A62] font-bold">阴性 (Féminin 标)</strong>，点击正反翻转，原声朗读。
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {levels.map(lvl => (
            <button
              key={lvl.id}
              onClick={() => {
                setActiveLevel(lvl.id);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                activeLevel === lvl.id
                  ? 'bg-[#A94A62] text-white shadow-xs'
                  : 'bg-[#FCFAF6] text-[#29354A] hover:bg-[#F3EEE5] border border-[#E8DECE]'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="搜索词汇或中文..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FCFAF6] border border-[#E8DECE] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#A94A62]/20 focus:bg-white text-[#29354A] font-medium transition"
          />
        </div>
      </div>

      {currentItem ? (
        /* Flashcard Main View */
        <div className="max-w-xl mx-auto space-y-4">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-[#29354A]/70 font-bold px-2">
            <span>当前进度: {currentIndex + 1} / {filteredVocab.length}</span>
            <span>已掌握: {learnedIds.size} 词</span>
          </div>

          {/* 3D Flip Card Container */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative min-h-[320px] rounded-3xl bg-[#FCFAF6] border border-[#E8DECE] shadow-xs p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-md select-none group"
          >
            {/* Top Badges */}
            <div className="absolute top-5 inset-x-6 flex items-center justify-between">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                currentItem.gender === 'feminine'
                  ? 'bg-[#F3DDE2] text-[#A94A62] border border-[#A94A62]/25'
                  : currentItem.gender === 'masculine'
                  ? 'bg-[#F3EEE5] text-[#29354A] border border-[#E8DECE]'
                  : 'bg-[#F3EEE5] text-[#29354A] border border-[#E8DECE]'
              }`}>
                {currentItem.gender === 'feminine' ? '♀ 阴性 Féminin' : currentItem.gender === 'masculine' ? '♂ 阳性 Masculin' : currentItem.pos}
              </span>

              <span className="text-xs px-2 py-0.5 rounded-md bg-[#F3EEE5] text-[#29354A]/80 font-bold border border-[#E8DECE]">
                {currentItem.level} · {currentItem.category}
              </span>
            </div>

            {/* Front vs Back Content */}
            {!isFlipped ? (
              /* Front: French word + Phonetic */
              <div className="space-y-3 my-auto">
                <div className="text-3xl sm:text-4xl font-black text-[#29354A] font-serif tracking-tight">
                  {currentItem.article && (
                    <span className="text-[#A94A62] mr-2 font-normal opacity-85">{currentItem.article}</span>
                  )}
                  {currentItem.french}
                </div>
                <div className="text-sm font-mono text-stone-500 font-bold">
                  {currentItem.phonetic}
                </div>
                <p className="text-xs text-stone-400 flex items-center justify-center gap-1 font-medium">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>点击翻转查看释义与例句</span>
                </p>
              </div>
            ) : (
              /* Back: Chinese meaning + Example Sentence */
              <div className="space-y-4 my-auto">
                <div className="text-2xl font-black text-[#A94A62]">
                  {currentItem.chinese}
                </div>
                <div className="p-4 rounded-2xl bg-[#F3EEE5] border border-[#E8DECE] text-left space-y-1 max-w-md">
                  <div className="text-xs font-bold text-stone-500">实战例句：</div>
                  <div className="text-sm font-serif font-bold text-[#29354A]">
                    « {currentItem.example.fr} »
                  </div>
                  <div className="text-xs text-[#29354A]/80 font-medium">
                    {currentItem.example.zh}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions inside Card */}
            <div className="absolute bottom-5 inset-x-6 flex items-center justify-between" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => playSpeech(`${currentItem.article || ''} ${currentItem.french}`)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#F3EEE5] hover:bg-[#F3DDE2] text-[#A94A62] border border-[#E8DECE] text-xs font-bold transition cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-[#A94A62]" />
                <span>朗读</span>
              </button>

              <button
                onClick={() => toggleLearned(currentItem.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  learnedIds.has(currentItem.id)
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-[#F3EEE5] text-[#29354A]/80 hover:bg-white border border-[#E8DECE]'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{learnedIds.has(currentItem.id) ? '已掌握' : '标记已记牢'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrev}
              className="flex-1 py-3 rounded-2xl bg-[#FCFAF6] hover:bg-[#F3EEE5] border border-[#E8DECE] text-[#29354A] font-bold text-sm flex items-center justify-center gap-1 transition shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>上一个</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-2xl bg-[#A94A62] hover:bg-[#933C52] text-white font-bold text-sm flex items-center justify-center gap-1 transition shadow-xs cursor-pointer active:scale-98"
            >
              <span>下一个</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        <div className="p-12 text-center text-slate-400">
          未找到匹配的词汇条目
        </div>
      )}

    </div>
  );
};

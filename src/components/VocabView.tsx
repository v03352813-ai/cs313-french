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
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800/40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>艾宾浩斯抗遗忘记忆曲线</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            法语核心考纲词汇闪卡 (阴阳性双标)
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            背法语单词最忌讳不记阴阳性！卡片严格标定 <strong className="text-blue-300">阳性 (Masculin 蓝标)</strong> 与 <strong className="text-rose-300">阴性 (Féminin 粉标)</strong>，点击正反翻转，原声朗读。
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
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
                activeLevel === lvl.id
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="搜索词汇或中文..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200/80 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {currentItem ? (
        /* Flashcard Main View */
        <div className="max-w-xl mx-auto space-y-4">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-2">
            <span>当前进度: {currentIndex + 1} / {filteredVocab.length}</span>
            <span>已掌握: {learnedIds.size} 词</span>
          </div>

          {/* 3D Flip Card Container */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative min-h-[320px] rounded-3xl bg-white border border-slate-200/90 shadow-md p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-lg select-none group"
          >
            {/* Top Badges */}
            <div className="absolute top-5 inset-x-6 flex items-center justify-between">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                currentItem.gender === 'feminine'
                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                  : currentItem.gender === 'masculine'
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {currentItem.gender === 'feminine' ? '♀ 阴性 Féminin' : currentItem.gender === 'masculine' ? '♂ 阳性 Masculin' : currentItem.pos}
              </span>

              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                {currentItem.level} · {currentItem.category}
              </span>
            </div>

            {/* Front vs Back Content */}
            {!isFlipped ? (
              /* Front: French word + Phonetic */
              <div className="space-y-3 my-auto">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
                  {currentItem.article && (
                    <span className="text-blue-600 mr-2 font-normal opacity-80">{currentItem.article}</span>
                  )}
                  {currentItem.french}
                </div>
                <div className="text-sm font-mono text-slate-500">
                  {currentItem.phonetic}
                </div>
                <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>点击翻转查看释义与例句</span>
                </p>
              </div>
            ) : (
              /* Back: Chinese meaning + Example Sentence */
              <div className="space-y-4 my-auto">
                <div className="text-2xl font-bold text-blue-700">
                  {currentItem.chinese}
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-1 max-w-md">
                  <div className="text-xs font-bold text-slate-400">实战例句：</div>
                  <div className="text-sm font-serif font-bold text-slate-900">
                    « {currentItem.example.fr} »
                  </div>
                  <div className="text-xs text-slate-600">
                    {currentItem.example.zh}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions inside Card */}
            <div className="absolute bottom-5 inset-x-6 flex items-center justify-between" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => playSpeech(`${currentItem.article || ''} ${currentItem.french}`)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 text-xs font-semibold transition"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span>朗读</span>
              </button>

              <button
                onClick={() => toggleLearned(currentItem.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  learnedIds.has(currentItem.id)
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
              className="flex-1 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 font-bold text-sm flex items-center justify-center gap-1 transition shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>上一个</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm flex items-center justify-center gap-1 transition shadow-sm shadow-blue-700/20"
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

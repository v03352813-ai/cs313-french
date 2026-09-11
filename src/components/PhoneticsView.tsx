import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  HelpCircle, 
  Layers, 
  Check, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { FRENCH_PHONETICS, PRONUNCIATION_RULES, PhoneticItem } from '../data/french/phonetics';

export const PhoneticsView: React.FC = () => {
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
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>法兰西语音纯正发音规范</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            35 音标体系 & 联诵发音实验室
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
            点击任意音标与例词即可收听正统巴黎真人发音，掌握鼻化元音、小舌音 [ʁ] 与连音联诵规则。
          </p>
        </div>
      </div>

      {/* Main Grid: Interactive Soundboard + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Soundboard */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
                  activeCategory === cat.id
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
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
                  className={`relative p-3 rounded-2xl flex flex-col items-center justify-center transition-all duration-150 border ${
                    isSelected
                      ? 'bg-blue-700 text-white border-blue-700 shadow-md scale-[1.04] z-10'
                      : isNasal
                      ? 'bg-rose-50/80 text-rose-950 border-rose-200/80 hover:bg-rose-100 hover:scale-[1.02]'
                      : 'bg-white text-slate-800 border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.02]'
                  }`}
                >
                  <span className={`text-lg sm:text-xl font-black ${isSelected ? 'text-white' : 'text-blue-900'}`}>
                    {item.ipa}
                  </span>
                  <span className={`text-[10px] mt-0.5 font-medium truncate max-w-full ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {item.spellingRules.slice(0, 2).join(', ')}
                  </span>
                  {isNasal && !isSelected && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500" title="鼻化元音"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Audio Hint */}
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/70 flex items-center gap-2 text-xs text-blue-900">
            <Volume2 className="w-4 h-4 text-blue-700 shrink-0" />
            <span>点击上方任意卡片即可发音，右侧可查看嘴型口诀与高频例词。</span>
          </div>
        </div>

        {/* Right 5 Cols: Detail Inspector */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 space-y-5">
            
            {/* Header of Inspector */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-blue-700 font-mono">
                    {selectedItem.ipa}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                    {selectedItem.name}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  常见拼写规则：{selectedItem.spellingRules.join(' / ')}
                </p>
              </div>

              <button
                onClick={() => playSpeech(selectedItem.examples.map(e => e.word).join(', '))}
                className="w-11 h-11 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center shadow-md shadow-blue-700/20 hover:scale-105 transition"
                title="朗读全部例词"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Mouth Tips */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span>发音嘴型与技巧指南</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/60 leading-relaxed">
                {selectedItem.mouthTips}
              </p>
            </div>

            {/* Practical Examples List */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700">
                <span>权威考纲核心例词与发音对照</span>
              </div>
              <div className="space-y-2">
                {selectedItem.examples.map(ex => (
                  <div
                    key={ex.word}
                    onClick={() => playSpeech(ex.word)}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200/70 hover:border-blue-200 flex items-center justify-between cursor-pointer transition group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                          {ex.word}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {ex.phonetic}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {ex.meaning}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-white group-hover:bg-blue-700 text-slate-400 group-hover:text-white flex items-center justify-center shadow-2xs transition">
                      <Volume2 className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 4 Major Pronunciation & Liaison Rules Section */}
      <section className="space-y-4 pt-6 border-t border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold text-xs">
              重中之重
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              4 大核心发音与联诵规则精析
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            搞清联诵 (Liaison)、词尾不发音与省音规则，是告别中式发音的唯一法则
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRONUNCIATION_RULES.map(rule => (
            <div
              key={rule.id}
              className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {rule.title}
                  </h3>
                  <span className="text-xs font-serif italic text-blue-700">
                    {rule.frenchTitle}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200/60">
                  {rule.tag}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {rule.summary}
              </p>

              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 font-mono text-xs font-bold">
                {rule.formula}
              </div>

              <div className="space-y-1.5 pt-1">
                {rule.examples.map(ex => (
                  <div 
                    key={ex.phrase}
                    onClick={() => playSpeech(ex.phrase)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/60 flex items-center justify-between cursor-pointer transition text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{ex.phrase}</span>
                        <span className="text-slate-400 font-mono">{ex.ipa}</span>
                        <span className="text-slate-600">({ex.meaning})</span>
                      </div>
                      <p className="text-[11px] text-blue-700 mt-0.5">{ex.explanation}</p>
                    </div>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400 hover:text-blue-600 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

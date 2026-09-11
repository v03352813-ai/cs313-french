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
      
      {/* Top Hero Banner */}
      <div className="bg-[#FCFAF6] rounded-3xl border border-[#E8DECE] shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8C3B4A]/10 text-[#8C3B4A] text-xs font-bold border border-[#8C3B4A]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>法兰西语音纯正发音规范</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#8C3B4A] tracking-tight">
            35 音标体系 & 联诵发音实验室
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl font-medium">
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
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#8C3B4A] text-white shadow-xs'
                    : 'bg-[#FCFAF6] text-[#292929] hover:bg-[#F7F3EA] border border-[#E8DECE]'
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
                      ? 'bg-[#8C3B4A] text-white border-[#8C3B4A] shadow-md scale-[1.04] z-10'
                      : isNasal
                      ? 'bg-[#FAF5EB] text-[#8C3B4A] border-[#C8A96B]/40 hover:bg-[#F7F3EA] hover:scale-[1.02]'
                      : 'bg-[#FCFAF6] text-[#292929] border-[#E8DECE] hover:bg-[#F7F3EA] hover:border-[#8C3B4A]/30 hover:scale-[1.02]'
                  }`}
                >
                  <span className={`text-lg sm:text-xl font-black ${isSelected ? 'text-white' : (isNasal ? 'text-[#8C3B4A]' : 'text-[#8C3B4A]')}`}>
                    {item.ipa}
                  </span>
                  <span className={`text-[10px] mt-0.5 font-bold truncate max-w-full ${isSelected ? 'text-[#FAF5EB]' : 'text-stone-500'}`}>
                    {item.spellingRules.slice(0, 2).join(', ')}
                  </span>
                  {isNasal && !isSelected && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#8C3B4A]" title="鼻化元音"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Audio Hint */}
          <div className="p-3.5 rounded-2xl bg-[#FAF5EB] border border-[#C8A96B]/40 flex items-center gap-2 text-xs text-[#292929]">
            <Volume2 className="w-4 h-4 text-[#C8A96B] shrink-0" />
            <span>点击上方任意卡片即可发音，右侧可查看嘴型口诀与高频例词。</span>
          </div>
        </div>

        {/* Right 5 Cols: Detail Inspector */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 bg-[#FCFAF6] rounded-3xl border border-[#E8DECE] shadow-xs p-6 space-y-5">
            
            {/* Header of Inspector */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E8DECE]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#8C3B4A] font-mono">
                    {selectedItem.ipa}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#8C3B4A]/10 text-[#8C3B4A] border border-[#8C3B4A]/20 text-xs font-bold">
                    {selectedItem.name}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  常见拼写规则：{selectedItem.spellingRules.join(' / ')}
                </p>
              </div>

              <button
                onClick={() => playSpeech(selectedItem.examples.map(e => e.word).join(', '))}
                className="w-11 h-11 rounded-2xl bg-[#8C3B4A] hover:bg-[#752E3C] text-white flex items-center justify-center shadow-xs hover:scale-105 transition cursor-pointer"
                title="朗读全部例词"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Mouth Tips */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C3B4A]">
                <HelpCircle className="w-4 h-4 text-[#C8A96B]" />
                <span>发音嘴型与技巧指南</span>
              </div>
              <p className="text-xs sm:text-sm text-[#292929] bg-[#FAF5EB] p-3.5 rounded-2xl border border-[#C8A96B]/40 leading-relaxed font-medium">
                {selectedItem.mouthTips}
              </p>
            </div>

            {/* Practical Examples List */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#292929]">
                <span>权威考纲核心例词与发音对照</span>
              </div>
              <div className="space-y-2">
                {selectedItem.examples.map(ex => (
                  <div
                    key={ex.word}
                    onClick={() => playSpeech(ex.word)}
                    className="p-3 rounded-2xl bg-[#F7F3EA] hover:bg-white border border-[#E8DECE] hover:border-[#8C3B4A]/30 flex items-center justify-between cursor-pointer transition group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#292929] group-hover:text-[#8C3B4A]">
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
                    <div className="w-8 h-8 rounded-xl bg-white group-hover:bg-[#8C3B4A] text-stone-400 group-hover:text-white flex items-center justify-center shadow-2xs border border-[#E8DECE] transition">
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
      <section className="space-y-4 pt-6 border-t border-[#E8DECE]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-[#8C3B4A]/10 text-[#8C3B4A] border border-[#8C3B4A]/25 font-bold text-xs">
              重中之重
            </span>
            <h2 className="text-xl font-black text-[#8C3B4A] tracking-tight">
              4 大核心发音与联诵规则精析
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            搞清联诵 (Liaison)、词尾不发音与省音规则，是告别中式发音的唯一法则
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRONUNCIATION_RULES.map(rule => (
            <div
              key={rule.id}
              className="p-5 rounded-3xl bg-[#FCFAF6] border border-[#E8DECE] shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-black text-[#292929]">
                    {rule.title}
                  </h3>
                  <span className="text-xs font-serif italic text-[#8C3B4A] font-bold">
                    {rule.frenchTitle}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#8C3B4A]/10 text-[#8C3B4A] text-[11px] font-bold border border-[#8C3B4A]/20">
                  {rule.tag}
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {rule.summary}
              </p>

              <div className="p-2.5 rounded-xl bg-[#F7F3EA] text-[#292929] font-mono text-xs font-bold border border-[#E8DECE]">
                {rule.formula}
              </div>

              <div className="space-y-1.5 pt-1">
                {rule.examples.map(ex => (
                  <div 
                    key={ex.phrase}
                    onClick={() => playSpeech(ex.phrase)}
                    className="p-2.5 rounded-xl bg-[#F7F3EA] hover:bg-white border border-[#E8DECE] flex items-center justify-between cursor-pointer transition text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#292929]">{ex.phrase}</span>
                        <span className="text-stone-400 font-mono">{ex.ipa}</span>
                        <span className="text-stone-600">({ex.meaning})</span>
                      </div>
                      <p className="text-[11px] text-[#8C3B4A] mt-0.5 font-medium">{ex.explanation}</p>
                    </div>
                    <Volume2 className="w-3.5 h-3.5 text-stone-400 hover:text-[#8C3B4A] shrink-0 ml-2" />
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

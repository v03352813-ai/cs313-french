import React, { useState } from 'react';
import { 
  RotateCcw, 
  Search, 
  Volume2, 
  Sparkles, 
  Check, 
  BookOpen, 
  Lightbulb, 
  ArrowRight,
  Info
} from 'lucide-react';
import { FRENCH_VERBS, TENSES_METADATA, VerbItem, TenseKey } from '../data/french/conjugation';

export const ConjugationView: React.FC = () => {
  const [selectedVerb, setSelectedVerb] = useState<VerbItem>(FRENCH_VERBS[0]);
  const [selectedTense, setSelectedTense] = useState<TenseKey>('present');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingText, setPlayingText] = useState<string | null>(null);

  const filteredVerbs = FRENCH_VERBS.filter(v => 
    v.infinitive.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.meaning.includes(searchQuery)
  );

  const currentTenseMeta = TENSES_METADATA.find(t => t.key === selectedTense)!;
  const currentForms = selectedVerb.tenses[selectedTense] || selectedVerb.tenses['present']!;

  const playSpeech = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      setPlayingText(text);
      utterance.onend = () => setPlayingText(null);
      utterance.onerror = () => setPlayingText(null);
      window.speechSynthesis.speak(utterance);
    } catch {
      setPlayingText(null);
    }
  };

  const persons = [
    { key: 'je', pronoun: "je / j'", data: currentForms.je },
    { key: 'tu', pronoun: 'tu', data: currentForms.tu },
    { key: 'il_elle', pronoun: 'il / elle / on', data: currentForms.il_elle },
    { key: 'nous', pronoun: 'nous', data: currentForms.nous },
    { key: 'vous', pronoun: 'vous', data: currentForms.vous },
    { key: 'ils_elles', pronoun: 'ils / elles', data: currentForms.ils_elles },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#8C3B4A] via-[#A5495B] to-[#752E3C] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-[#8C3B4A]/30">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#FAF5EB] text-xs font-bold mb-2 border border-white/20">
            <RotateCcw className="w-3.5 h-3.5 text-[#DFBA73]" />
            <span>自研法语核心文法推导引擎</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            法语动词变位可视化演练器 (Conjugaison)
          </h1>
          <p className="text-[#FAF5EB]/80 text-xs sm:text-sm mt-1">
            动词变位不再是噩梦！选择任意动词与时态，系统一键分解「词根」与「人称后缀」，标红变位差异，带真人原声拼读。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (4 cols): Verb Selection List */}
        <div className="lg:col-span-4 space-y-3">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="搜索动词 (如 être, parler...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FCFAF6] border border-[#E8DECE] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#8C3B4A]/20 focus:bg-white transition text-[#8C3B4A] font-medium"
            />
          </div>

          {/* Verb List */}
          <div className="bg-[#FCFAF6] rounded-3xl border border-[#E8DECE] shadow-xs p-2 space-y-1 max-h-[520px] overflow-y-auto">
            {filteredVerbs.map(verb => {
              const isSelected = selectedVerb.id === verb.id;
              return (
                <button
                  key={verb.id}
                  onClick={() => setSelectedVerb(verb)}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#8C3B4A] text-white shadow-xs'
                      : 'hover:bg-[#F7F3EA] text-[#292929]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm sm:text-base tracking-tight font-serif">
                        {verb.infinitive}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : verb.group === '1st_er' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : verb.group === '2nd_ir'
                          ? 'bg-[#8C3B4A]/10 text-[#8C3B4A]' 
                          : 'bg-[#FAF5EB] text-[#8C3B4A] border border-[#C8A96B]/30'
                      }`}>
                        {verb.group === '1st_er' ? '第1组 -er' : verb.group === '2nd_ir' ? '第2组 -ir' : '第3组不规则'}
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 truncate max-w-[200px] ${isSelected ? 'text-[#FAF5EB]' : 'text-stone-500'}`}>
                      {verb.meaning}
                    </p>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-stone-300'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column (8 cols): Visual Conjugation Canvas */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Current Verb Hero Header */}
          <div className="bg-[#FCFAF6] rounded-3xl border border-[#E8DECE] shadow-xs p-6 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8DECE]">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-[#8C3B4A] font-serif">
                    {selectedVerb.infinitive}
                  </h2>
                  <span className="text-xs sm:text-sm text-stone-600 font-bold">
                    ({selectedVerb.meaning})
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F7F3EA] text-[#292929] font-bold border border-[#E8DECE]">
                    过去分词: <strong className="text-[#8C3B4A] font-serif">{selectedVerb.participle}</strong>
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold border bg-[#8C3B4A]/10 text-[#8C3B4A] border-[#8C3B4A]/25">
                    助动词: <strong>{selectedVerb.auxiliary}</strong>
                  </span>
                  {selectedVerb.tags.map(t => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-[#F7F3EA] text-stone-500 border border-[#E8DECE]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => playSpeech(selectedVerb.infinitive)}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7F3EA] hover:bg-[#FAF6EE] text-[#8C3B4A] border border-[#E8DECE] text-xs font-bold transition cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-[#8C3B4A]" />
                <span>原形发音</span>
              </button>
            </div>

            {/* Tense Switcher Tabs */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                选择推导时态 (Tense)
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {TENSES_METADATA.map(t => {
                  const hasThisTense = !!selectedVerb.tenses[t.key];
                  const isActive = selectedTense === t.key;
                  return (
                    <button
                      key={t.key}
                      disabled={!hasThisTense}
                      onClick={() => setSelectedTense(t.key)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-[#8C3B4A] text-white shadow-xs'
                          : hasThisTense
                          ? 'bg-[#F7F3EA] text-[#292929] hover:bg-[#EFE8DC] border border-[#E8DECE]'
                          : 'bg-[#F7F3EA]/50 text-stone-300 cursor-not-allowed border border-[#E8DECE]/40'
                      }`}
                    >
                      <span>{t.label}</span>
                      <span className="text-[10px] opacity-75">({t.frenchLabel})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tense Usage Guidance Card */}
            <div className="p-3.5 rounded-2xl bg-[#FAF5EB] border border-[#C8A96B]/40 text-xs text-[#292929] space-y-1">
              <div className="flex items-center gap-1.5 font-black text-[#8C3B4A]">
                <Info className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>{currentTenseMeta.label} 语法法则：</span>
              </div>
              <p className="leading-relaxed text-stone-700 font-medium">
                {currentTenseMeta.usage} <br />
                <span className="font-mono font-bold text-[#8C3B4A]">公式：{currentTenseMeta.formula}</span>
              </p>
            </div>

            {/* 6-Persons Conjugation Table (High visual impact!) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {persons.map(p => {
                const isPlaying = playingText === p.data.full;
                return (
                  <div
                    key={p.key}
                    onClick={() => playSpeech(p.data.full)}
                    className="p-4 rounded-2xl bg-[#F7F3EA] hover:bg-white border border-[#E8DECE] hover:border-[#8C3B4A]/40 transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                  >
                    <div className="space-y-0.5">
                      <span className="text-xs font-mono font-bold text-stone-400">
                        {p.pronoun}
                      </span>
                      <div className="text-base sm:text-lg font-extrabold tracking-tight font-serif">
                        <span className="text-[#292929]">{p.data.stem}</span>
                        <span className="text-[#8C3B4A] bg-[#8C3B4A]/10 px-1 py-0.5 rounded-md font-black">
                          {p.data.ending}
                        </span>
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition ${
                      isPlaying 
                        ? 'bg-[#8C3B4A] text-white' 
                        : 'bg-white text-stone-400 group-hover:bg-[#8C3B4A] group-hover:text-white shadow-2xs border border-[#E8DECE]'
                    }`}>
                      <Volume2 className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sample Real-Life Context Sentence */}
            <div className="p-4 rounded-2xl bg-[#F7F3EA] border border-[#E8DECE] space-y-1">
              <div className="text-xs font-bold text-stone-500">
                实战例句应用场景
              </div>
              <p className="text-sm font-serif font-bold text-[#8C3B4A]">
                « {selectedVerb.sampleSentence.french} »
              </p>
              <p className="text-xs text-stone-600 font-medium">
                {selectedVerb.sampleSentence.chinese}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

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
      <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-indigo-800/40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-semibold mb-2">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>自研法语核心文法推导引擎</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            法语动词变位可视化演练器 (Conjugaison)
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            动词变位不再是噩梦！选择任意动词与时态，系统一键分解「词根」与「人称后缀」，标红变位差异，带真人原声拼读。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (4 cols): Verb Selection List */}
        <div className="lg:col-span-4 space-y-3">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜索动词 (如 être, parler...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Verb List */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-2 space-y-1 max-h-[520px] overflow-y-auto">
            {filteredVerbs.map(verb => {
              const isSelected = selectedVerb.id === verb.id;
              return (
                <button
                  key={verb.id}
                  onClick={() => setSelectedVerb(verb)}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition ${
                    isSelected
                      ? 'bg-blue-700 text-white shadow-sm shadow-blue-700/20'
                      : 'hover:bg-slate-50 text-slate-800'
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
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {verb.group === '1st_er' ? '第1组 -er' : verb.group === '2nd_ir' ? '第2组 -ir' : '第3组不规则'}
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 truncate max-w-[200px] ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                      {verb.meaning}
                    </p>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column (8 cols): Visual Conjugation Canvas */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Current Verb Hero Header */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                    {selectedVerb.infinitive}
                  </h2>
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">
                    ({selectedVerb.meaning})
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                    过去分词: <strong className="text-slate-900 font-serif">{selectedVerb.participle}</strong>
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    selectedVerb.auxiliary === 'être'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    助动词: <strong>{selectedVerb.auxiliary}</strong>
                  </span>
                  {selectedVerb.tags.map(t => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => playSpeech(selectedVerb.infinitive)}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span>原形发音</span>
              </button>
            </div>

            {/* Tense Switcher Tabs */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
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
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-blue-700 text-white shadow-sm'
                          : hasThisTense
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                      }`}
                    >
                      <span>{t.label}</span>
                      <span className="text-[10px] opacity-70">({t.frenchLabel})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tense Usage Guidance Card */}
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Info className="w-3.5 h-3.5 text-blue-700" />
                <span>{currentTenseMeta.label} 语法法则：</span>
              </div>
              <p className="leading-relaxed text-blue-800">
                {currentTenseMeta.usage} <br />
                <span className="font-mono font-semibold text-blue-950">公式：{currentTenseMeta.formula}</span>
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
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                  >
                    <div className="space-y-0.5">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {p.pronoun}
                      </span>
                      <div className="text-base sm:text-lg font-extrabold tracking-tight font-serif">
                        <span className="text-slate-800">{p.data.stem}</span>
                        <span className="text-rose-600 bg-rose-50 px-1 py-0.5 rounded-md font-black">
                          {p.data.ending}
                        </span>
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition ${
                      isPlaying 
                        ? 'bg-blue-700 text-white' 
                        : 'bg-white text-slate-400 group-hover:bg-blue-700 group-hover:text-white shadow-2xs'
                    }`}>
                      <Volume2 className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sample Real-Life Context Sentence */}
            <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200/80 space-y-1">
              <div className="text-xs font-bold text-slate-500">
                实战例句应用场景
              </div>
              <p className="text-sm font-serif font-bold text-slate-900">
                « {selectedVerb.sampleSentence.french} »
              </p>
              <p className="text-xs text-slate-600">
                {selectedVerb.sampleSentence.chinese}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

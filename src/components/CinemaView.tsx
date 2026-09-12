import React, { useState, useEffect, useRef } from 'react';
import { 
  Headphones, 
  Play, 
  Pause, 
  RotateCcw,
  Volume2, 
  Sparkles, 
  Film, 
  SlidersHorizontal,
  Music2
} from 'lucide-react';
import { FRENCH_CINEMA_LIST, CinemaScene } from '../data/french/cinemaData';
import { speakFrench, stopFrenchSpeech } from '../utils/speech';

export const CinemaView: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<CinemaScene>(FRENCH_CINEMA_LIST[0]);
  const [activeDialogueIndex, setActiveDialogueIndex] = useState<number>(0);
  const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false);
  const [playingFr, setPlayingFr] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(0.9);

  // Ref to cancel sequential play loop when user pauses or changes movie
  const isCancelledRef = useRef<boolean>(false);

  // Stop playback when switching movies or unmounting
  useEffect(() => {
    isCancelledRef.current = true;
    stopFrenchSpeech();
    setIsPlayingAll(false);
    setPlayingFr(null);
    setActiveDialogueIndex(0);
  }, [selectedMovie]);

  useEffect(() => {
    return () => {
      isCancelledRef.current = true;
      stopFrenchSpeech();
    };
  }, []);

  // Play single sentence
  const handlePlaySentence = async (index: number) => {
    isCancelledRef.current = true;
    setIsPlayingAll(false);
    setActiveDialogueIndex(index);

    const dlg = selectedMovie.dialogues[index];
    if (!dlg) return;

    setPlayingFr(dlg.fr);
    await speakFrench(dlg.fr, playbackRate);
    setPlayingFr(null);
  };

  // Play word pronunciation
  const handlePlayWord = async (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    isCancelledRef.current = true;
    setIsPlayingAll(false);
    setPlayingFr(word);
    await speakFrench(word, playbackRate);
    setPlayingFr(null);
  };

  // Play all dialogues sequentially
  const handleTogglePlayAll = async () => {
    if (isPlayingAll) {
      isCancelledRef.current = true;
      stopFrenchSpeech();
      setIsPlayingAll(false);
      setPlayingFr(null);
      return;
    }

    isCancelledRef.current = false;
    setIsPlayingAll(true);

    const startIndex = activeDialogueIndex >= selectedMovie.dialogues.length - 1 ? 0 : activeDialogueIndex;

    for (let i = startIndex; i < selectedMovie.dialogues.length; i++) {
      if (isCancelledRef.current) break;

      setActiveDialogueIndex(i);
      const dlg = selectedMovie.dialogues[i];
      setPlayingFr(dlg.fr);

      await speakFrench(dlg.fr, playbackRate);

      if (isCancelledRef.current) break;

      // Natural pause between dialogues
      await new Promise(r => setTimeout(r, 650));
    }

    if (!isCancelledRef.current) {
      setIsPlayingAll(false);
      setPlayingFr(null);
    }
  };

  const currentDialogue = selectedMovie.dialogues[activeDialogueIndex] || selectedMovie.dialogues[0];

  return (
    <div className="space-y-4 sm:space-y-5 pb-0">
      
      {/* Top Hero Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCECEF] text-[#80142A] text-xs font-bold border border-[#80142A]/25">
            <Headphones className="w-3.5 h-3.5 text-[#DDBF78]" />
            <span>法式浪漫原声 · 沉浸式听力跟读</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#29354A] tracking-tight">
            法国高分经典电影原声精听 (Cinéma)
          </h1>
          <p className="text-xs sm:text-sm text-[#29354A]/80 leading-relaxed max-w-3xl">
            告别干瘪教材听力！甄选《放牛班的春天》《天使爱美丽》《触不可及》《小王子》经典切片，中法双语对照，逐句原声磨耳朵。
          </p>
        </div>
      </div>

      {/* Movie Switcher Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FRENCH_CINEMA_LIST.map(movie => {
          const isSelected = selectedMovie.id === movie.id;
          return (
            <button
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-[#FCECEF] text-[#80142A] border-2 border-[#80142A] shadow-xs scale-[1.01]'
                  : 'bg-white hover:bg-slate-50 border-slate-200/80 text-[#29354A]'
              }`}
            >
              <div>
                <div className={`text-xs font-bold font-serif ${isSelected ? 'text-[#80142A]' : 'text-stone-400'}`}>{movie.frenchTitle}</div>
                <div className="font-extrabold text-sm sm:text-base mt-0.5">{movie.movieTitle}</div>
              </div>
              <span className={`text-[10px] mt-2 px-2 py-0.5 rounded-md font-medium truncate ${
                isSelected ? 'bg-[#80142A] text-white' : 'bg-slate-100 text-[#29354A]'
              }`}>
                {movie.year} · {movie.director}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Movie Stage */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        
        {/* Cover + Summary Header with Big Play Action */}
        <div className="relative min-h-[220px] sm:h-72 bg-[#1C2E46] overflow-hidden flex flex-col justify-end">
          <img 
            src={selectedMovie.coverImage} 
            alt={selectedMovie.movieTitle}
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#162438] via-[#162438]/75 to-transparent"></div>
          
          <div className="relative z-10 p-6 sm:p-8 text-white space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/20 text-white text-xs font-semibold backdrop-blur-md">
                <Film className="w-3.5 h-3.5 text-[#DDBF78]" />
                <span>{selectedMovie.tag}</span>
              </div>

              {/* Live Audio Equalizer Pill when playing */}
              {playingFr && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#80142A]/90 border border-[#FCECEF]/40 text-white text-xs font-bold backdrop-blur-md animate-pulse">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <Music2 className="w-3.5 h-3.5" />
                  <span>正在播放原声...</span>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-serif">
                {selectedMovie.movieTitle} <span className="text-base sm:text-lg font-normal opacity-80 italic font-serif">({selectedMovie.frenchTitle})</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl line-clamp-2 leading-relaxed">
                {selectedMovie.sceneSummary}
              </p>
            </div>

            {/* Prominent Audio Action Bar Inside Cover */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleTogglePlayAll}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                  isPlayingAll
                    ? 'bg-amber-400 hover:bg-amber-500 text-slate-900 ring-4 ring-amber-400/30'
                    : 'bg-[#80142A] hover:bg-[#680E20] text-white hover:scale-105 active:scale-95 shadow-[#80142A]/40'
                }`}
              >
                {isPlayingAll ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>⏸ 暂停播放</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                    <span>▶ 播放全片名场面原声 (连播)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handlePlaySentence(activeDialogueIndex)}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 backdrop-blur-md border border-white/20 transition cursor-pointer"
                title="重新播放当前句"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重听当前句</span>
              </button>

              {/* Speed Selector */}
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/15 p-1 rounded-xl text-xs">
                <span className="text-[11px] text-slate-300 px-1.5 font-medium flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3 text-[#DDBF78]" />
                  <span>语速:</span>
                </span>
                {[0.8, 0.95, 1.15].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setPlaybackRate(rate)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      playbackRate === rate
                        ? 'bg-[#80142A] text-white shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {rate === 0.8 ? '0.8x 慢速' : rate === 0.95 ? '1.0x 标准' : '1.2x 快速'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dialogues & Audio Shadowing */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-[#29354A] flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-[#80142A]" />
                <span>名场面原声台词逐句精练</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                点击每句右侧【▶ 听原声】按钮或直接点击卡片，即可独立播放与复读
              </p>
            </div>

            {/* Current Playing Sentence Tracker */}
            <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 flex items-center gap-2 self-start sm:self-auto">
              <span>当前台词:</span>
              <span className="font-bold text-[#80142A]">
                {activeDialogueIndex + 1} / {selectedMovie.dialogues.length} 句
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {selectedMovie.dialogues.map((dlg, idx) => {
              const isSelected = activeDialogueIndex === idx;
              const isCurrentlySpeaking = playingFr === dlg.fr;

              return (
                <div
                  key={idx}
                  onClick={() => handlePlaySentence(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 relative ${
                    isCurrentlySpeaking
                      ? 'bg-[#FCECEF] border-[#80142A] shadow-md ring-2 ring-[#80142A]/25 scale-[1.005]'
                      : isSelected
                      ? 'bg-slate-50/90 border-[#80142A]/40 shadow-xs'
                      : 'bg-slate-50/60 hover:bg-slate-50 border-slate-200/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#80142A] bg-[#FCECEF] px-2.5 py-0.5 rounded-md border border-[#80142A]/20">
                        {dlg.character}
                      </span>
                      <span className="text-[11px] text-slate-400 font-serif">
                        第 {idx + 1} 句
                      </span>
                    </div>

                    {/* Explicit Audio Play Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlaySentence(idx);
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                        isCurrentlySpeaking
                          ? 'bg-[#80142A] text-white ring-2 ring-[#80142A]/30 animate-pulse'
                          : 'bg-white hover:bg-[#FCECEF] text-[#80142A] border border-[#80142A]/30 hover:border-[#80142A]'
                      }`}
                    >
                      {isCurrentlySpeaking ? (
                        <>
                          <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                          <span>正在播放...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          <span>听原声</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-base sm:text-lg font-serif font-bold text-[#29354A] leading-relaxed">
                    « {dlg.fr} »
                  </p>

                  <p className="text-xs sm:text-sm text-[#29354A]/80 font-medium">
                    {dlg.zh}
                  </p>

                  {dlg.keyPoints && (
                    <div className="pt-2 border-t border-slate-200/60 text-xs text-[#29354A] bg-white/80 p-2.5 rounded-xl">
                      <span className="font-bold text-[#80142A]">语法要点：</span>{dlg.keyPoints}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Vocabulary Highlight Section */}
          <div className="pt-4 border-t border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                本片高频考点生词 (点击即可朗读)
              </h4>
              <span className="text-[11px] text-slate-400">含标准巴黎音</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {selectedMovie.vocabulary.map((voc, i) => {
                const isWordPlaying = playingFr === voc.word;
                return (
                  <div 
                    key={i} 
                    onClick={(e) => handlePlayWord(voc.word, e)}
                    className={`p-3 rounded-xl border cursor-pointer transition text-xs space-y-1 ${
                      isWordPlaying
                        ? 'bg-[#FCECEF] border-[#80142A] shadow-xs'
                        : 'bg-slate-50 hover:bg-[#FCECEF]/60 border-slate-200/70'
                    }`}
                  >
                    <div className="font-serif font-bold text-[#29354A] flex items-center justify-between">
                      <span className="truncate">{voc.word}</span>
                      <button
                        type="button"
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition shrink-0 ${
                          isWordPlaying ? 'bg-[#80142A] text-white' : 'bg-white text-slate-400 hover:text-[#80142A] border border-slate-200'
                        }`}
                        title="点击播放发音"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[#29354A]/70 truncate">{voc.meaning}</div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};


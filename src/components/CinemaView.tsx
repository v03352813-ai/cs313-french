import React, { useState } from 'react';
import { 
  Headphones, 
  Play, 
  Pause, 
  Volume2, 
  Sparkles, 
  Film, 
  Check, 
  BookOpen
} from 'lucide-react';
import { FRENCH_CINEMA_LIST, CinemaScene } from '../data/french/cinemaData';

export const CinemaView: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<CinemaScene>(FRENCH_CINEMA_LIST[0]);
  const [playingFr, setPlayingFr] = useState<string | null>(null);

  const playSpeech = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.88;
      setPlayingFr(text);
      utterance.onend = () => setPlayingFr(null);
      utterance.onerror = () => setPlayingFr(null);
      window.speechSynthesis.speak(utterance);
    } catch {
      setPlayingFr(null);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Hero Banner */}
      <div className="bg-[#FCFAF6] rounded-3xl border border-[#E8DECE] shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3DDE2] text-[#A94A62] text-xs font-bold border border-[#A94A62]/25">
            <Headphones className="w-3.5 h-3.5 text-[#D8B15F]" />
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
                  ? 'bg-[#F3DDE2] text-[#A94A62] border-2 border-[#A94A62] shadow-xs scale-[1.01]'
                  : 'bg-[#FCFAF6] hover:bg-[#F3EEE5] border-[#E8DECE] text-[#29354A]'
              }`}
            >
              <div>
                <div className={`text-xs font-bold font-serif ${isSelected ? 'text-[#A94A62]' : 'text-stone-400'}`}>{movie.frenchTitle}</div>
                <div className="font-extrabold text-sm sm:text-base mt-0.5">{movie.movieTitle}</div>
              </div>
              <span className={`text-[10px] mt-2 px-2 py-0.5 rounded-md font-medium truncate ${
                isSelected ? 'bg-[#A94A62] text-white' : 'bg-[#F3EEE5] text-[#29354A]'
              }`}>
                {movie.year} · {movie.director}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Movie Stage */}
      <div className="bg-[#FCFAF6] rounded-3xl border border-[#E8DECE] shadow-sm overflow-hidden">
        
        {/* Cover + Summary Header */}
        <div className="relative h-48 sm:h-64 bg-[#1C2E46] overflow-hidden">
          <img 
            src={selectedMovie.coverImage} 
            alt={selectedMovie.movieTitle}
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#162438] via-[#162438]/70 to-transparent"></div>
          
          <div className="absolute bottom-6 inset-x-6 sm:inset-x-8 text-white space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/20 text-white text-xs font-semibold backdrop-blur-md">
              <Film className="w-3.5 h-3.5 text-[#D8B15F]" />
              <span>{selectedMovie.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif">
              {selectedMovie.movieTitle} <span className="text-base sm:text-lg font-normal opacity-80 italic font-serif">({selectedMovie.frenchTitle})</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl line-clamp-2">
              {selectedMovie.sceneSummary}
            </p>
          </div>
        </div>

        {/* Dialogues & Audio Shadowing */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#29354A] flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-[#A94A62]" />
              <span>名场面原声台词逐句精练</span>
            </h3>
            <span className="text-xs text-slate-400">点击任意台词即可原声跟读</span>
          </div>

          <div className="space-y-4">
            {selectedMovie.dialogues.map((dlg, idx) => {
              const isPlaying = playingFr === dlg.fr;
              return (
                <div
                  key={idx}
                  onClick={() => playSpeech(dlg.fr)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isPlaying
                      ? 'bg-[#F3DDE2] border-[#A94A62]/50 shadow-sm'
                      : 'bg-[#F3EEE5] hover:bg-[#FAF6EE] border-[#E8DECE]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#A94A62] bg-[#F3DDE2] px-2.5 py-0.5 rounded-md border border-[#A94A62]/20">
                      {dlg.character}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                      isPlaying ? 'bg-[#A94A62] text-white shadow-xs' : 'bg-[#FCFAF6] text-[#29354A]/60 shadow-2xs'
                    }`}>
                      <Volume2 className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-base sm:text-lg font-serif font-bold text-[#29354A] leading-relaxed">
                    « {dlg.fr} »
                  </p>

                  <p className="text-xs sm:text-sm text-[#29354A]/80 font-medium">
                    {dlg.zh}
                  </p>

                  {dlg.keyPoints && (
                    <div className="pt-2 border-t border-[#E8DECE] text-xs text-[#29354A] bg-[#FCFAF6] p-2.5 rounded-xl">
                      <span className="font-bold text-[#A94A62]">语法要点：</span>{dlg.keyPoints}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Vocabulary Highlight Section */}
          <div className="pt-4 border-t border-[#E8DECE] space-y-3">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              本片高频考点生词
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {selectedMovie.vocabulary.map((voc, i) => (
                <div 
                  key={i} 
                  onClick={() => playSpeech(voc.word)}
                  className="p-3 rounded-xl bg-[#F3EEE5] hover:bg-[#F3DDE2] border border-[#E8DECE] cursor-pointer transition text-xs space-y-0.5"
                >
                  <div className="font-serif font-bold text-[#29354A] flex items-center justify-between">
                    <span>{voc.word}</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400 hover:text-[#A94A62]" />
                  </div>
                  <div className="text-[#29354A]/70">{voc.meaning}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

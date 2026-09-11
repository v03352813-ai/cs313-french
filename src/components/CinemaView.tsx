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
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-purple-900/40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-semibold mb-2">
            <Headphones className="w-3.5 h-3.5" />
            <span>法式浪漫原声 · 沉浸式听力跟读</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            法国高分经典电影原声精听 (Cinéma)
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
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
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-purple-700 text-white border-purple-700 shadow-md scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-800'
              }`}
            >
              <div>
                <div className="text-xs font-bold font-serif opacity-75">{movie.frenchTitle}</div>
                <div className="font-extrabold text-sm sm:text-base mt-0.5">{movie.movieTitle}</div>
              </div>
              <span className={`text-[10px] mt-2 px-2 py-0.5 rounded-md font-medium truncate ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {movie.year} · {movie.director}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Movie Stage */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
        
        {/* Cover + Summary Header */}
        <div className="relative h-48 sm:h-64 bg-slate-900 overflow-hidden">
          <img 
            src={selectedMovie.coverImage} 
            alt={selectedMovie.movieTitle}
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
          
          <div className="absolute bottom-6 inset-x-6 sm:inset-x-8 text-white space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/20 text-white text-xs font-semibold backdrop-blur-md">
              <Film className="w-3.5 h-3.5" />
              <span>{selectedMovie.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif">
              {selectedMovie.movieTitle} <span className="text-base sm:text-lg font-normal opacity-80 italic font-serif">({selectedMovie.frenchTitle})</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl line-clamp-2">
              {selectedMovie.sceneSummary}
            </p>
          </div>
        </div>

        {/* Dialogues & Audio Shadowing */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-purple-600" />
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
                      ? 'bg-purple-50/90 border-purple-300 shadow-sm'
                      : 'bg-slate-50 hover:bg-purple-50/50 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-800 bg-purple-100/80 px-2 py-0.5 rounded-md">
                      {dlg.character}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                      isPlaying ? 'bg-purple-700 text-white' : 'bg-white text-slate-400 shadow-2xs'
                    }`}>
                      <Volume2 className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-relaxed">
                    « {dlg.fr} »
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    {dlg.zh}
                  </p>

                  {dlg.keyPoints && (
                    <div className="pt-2 border-t border-slate-200/60 text-xs text-purple-900 bg-white/60 p-2 rounded-xl">
                      <span className="font-bold">语法要点：</span>{dlg.keyPoints}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Vocabulary Highlight Section */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              本片高频考点生词
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {selectedMovie.vocabulary.map((voc, i) => (
                <div 
                  key={i} 
                  onClick={() => playSpeech(voc.word)}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200/70 cursor-pointer transition text-xs space-y-0.5"
                >
                  <div className="font-serif font-bold text-slate-900 flex items-center justify-between">
                    <span>{voc.word}</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400 hover:text-purple-600" />
                  </div>
                  <div className="text-slate-500">{voc.meaning}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

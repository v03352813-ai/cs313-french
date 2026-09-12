import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Sparkles, 
  Film, 
  SlidersHorizontal, 
  Search, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  ChevronLeft, 
  List, 
  LayoutGrid, 
  Mic, 
  HelpCircle, 
  CheckCircle2,
  Headphones,
  Music2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FRENCH_CINEMA_LIST, CinemaScene } from '../data/french/cinemaData';
import { speakFrench, stopFrenchSpeech } from '../utils/speech';

interface CinemaViewProps {
  isVip?: boolean;
  onOpenVipModal?: (reason?: string) => void;
  initialMovieId?: string;
}

type PracticeMode = 'breakdown' | 'shadowing' | 'quiz';
type ViewMode = 'list' | 'slider' | 'grid';

const GENRE_CATEGORIES = [
  '全部影片',
  '治愈温情',
  '传奇爱恋',
  '新浪潮先锋',
  '人生哲理',
  '当代金棕榈'
];

export const CinemaView: React.FC<CinemaViewProps> = ({
  isVip = false,
  onOpenVipModal,
  initialMovieId
}) => {
  const [selectedMovieId, setSelectedMovieId] = useState<string>(() => {
    if (initialMovieId) return initialMovieId;
    return FRENCH_CINEMA_LIST[0]?.id || 'film_choristes';
  });

  const [activeDialogueIndex, setActiveDialogueIndex] = useState<number>(0);
  const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false);
  const [playingFr, setPlayingFr] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(0.9);

  // 研习模式与剧库展示模式
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('breakdown');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedGenre, setSelectedGenre] = useState<string>('全部影片');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isListExpanded, setIsListExpanded] = useState<boolean>(false);

  // 问答挖空挑战答题状态
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState<boolean>(false);

  // 横向轮播滑块引用
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isCancelledRef = useRef<boolean>(false);

  // 当前选中的电影
  const selectedMovie = useMemo(() => {
    return FRENCH_CINEMA_LIST.find(m => m.id === selectedMovieId) || FRENCH_CINEMA_LIST[0];
  }, [selectedMovieId]);

  // 当切换电影时停止播放并重置状态
  useEffect(() => {
    isCancelledRef.current = true;
    stopFrenchSpeech();
    setIsPlayingAll(false);
    setPlayingFr(null);
    setActiveDialogueIndex(0);
    setQuizAnswers({});
    setShowQuizResult(false);
  }, [selectedMovieId]);

  useEffect(() => {
    return () => {
      isCancelledRef.current = true;
      stopFrenchSpeech();
    };
  }, []);

  // 筛选电影库
  const filteredMovies = useMemo(() => {
    return FRENCH_CINEMA_LIST.filter(movie => {
      const matchGenre = selectedGenre === '全部影片' || movie.genre === selectedGenre;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || 
        movie.movieTitle.toLowerCase().includes(q) ||
        movie.frenchTitle.toLowerCase().includes(q) ||
        movie.director.toLowerCase().includes(q) ||
        movie.tag.toLowerCase().includes(q);
      return matchGenre && matchSearch;
    });
  }, [selectedGenre, searchQuery]);

  // 当搜索或分类变更时收起列表展开
  useEffect(() => {
    setIsListExpanded(false);
  }, [selectedGenre, searchQuery]);

  // 播放单句
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

  // 播放单个重点词
  const handlePlayWord = async (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    isCancelledRef.current = true;
    setIsPlayingAll(false);
    setPlayingFr(word);
    await speakFrench(word, playbackRate);
    setPlayingFr(null);
  };

  // 连续播放整片原声对白
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
      await new Promise(r => setTimeout(r, 650));
    }

    if (!isCancelledRef.current) {
      setIsPlayingAll(false);
      setPlayingFr(null);
    }
  };

  const handleSelectMovie = (movie: CinemaScene) => {
    const isFree = movie.isFreePreview;
    const isLocked = !isVip && !isFree;

    if (isLocked) {
      onOpenVipModal?.(`🔒《${movie.movieTitle}》（${movie.frenchTitle}）为 VIP 专属高光原声电影！升级 VIP 终身卡（仅需 ¥49.9），即可解锁全部 30 部法国影史经典名场面逐句点读与每周五持续上新！`);
      return;
    }

    setSelectedMovieId(movie.id);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.75;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // 智能生成单句挖空选择挑战
  const getLineQuiz = (line: { character: string; fr: string; zh: string; keyPoints?: string }, index: number) => {
    let targetWord = '';
    // 优先匹配词汇表中的词
    for (const v of selectedMovie.vocabulary) {
      const cleanWord = v.word.replace(/\(.*?\)/g, '').trim();
      if (cleanWord.length >= 3 && line.fr.toLowerCase().includes(cleanWord.toLowerCase())) {
        targetWord = cleanWord;
        break;
      }
    }
    if (!targetWord) {
      // 提取长度>=4的实词
      const words = line.fr.replace(/[,.?!:;«»'"]/g, ' ').split(/\s+/).filter(w => w.length >= 4 && !['pour', 'dans', 'avec', 'cette', 'votre', 'notre'].includes(w.toLowerCase()));
      targetWord = words[0] || 'monde';
    }

    const regex = new RegExp(`\\b${targetWord}\\b`, 'i');
    const maskedFr = line.fr.replace(regex, '【 ______ 】');

    const commonPool = ['toujours', 'jamais', 'monde', 'cœur', 'amour', 'chose', 'chemin', 'espoir', 'vérité', 'regard', 'temps', 'vie', 'soleil'];
    const otherOptions = commonPool.filter(w => w.toLowerCase() !== targetWord.toLowerCase()).slice(0, 3);
    const options = [targetWord, ...otherOptions].sort((a, b) => a.localeCompare(b));

    return {
      maskedFr,
      targetWord,
      options,
      hint: line.keyPoints || `结合中文译文「${line.zh}」，选出最符合地道法国原声用词的选项。`
    };
  };

  const handleCompleteQuiz = () => {
    setShowQuizResult(true);
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6 pb-6">
      
      {/* ========================================================================= */}
      {/* ① 顶部当前电影原声播放器舞台 (Selected Movie Stage - 置顶核心第一焦点) */}
      {/* ========================================================================= */}
      {selectedMovie && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          
          {/* Cover + Poster Header with Atmospheric Cinematic Mood (40% 全彩大片质感 + 文字微阴影保护) */}
          <div className="relative min-h-[200px] sm:min-h-[240px] bg-slate-950 overflow-hidden flex flex-col justify-between p-5 sm:p-7 text-white">
            <img 
              src={selectedMovie.coverImage} 
              alt={selectedMovie.movieTitle}
              className="absolute inset-0 w-full h-full object-cover opacity-40 sm:opacity-45 scale-105 transition-transform duration-700 hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/25"></div>
            
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white font-black text-xs border border-white/20 shadow-xs">
                    {selectedMovie.levelTag}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#80142A]/90 backdrop-blur-md text-rose-100 text-xs font-bold border border-rose-300/30 shadow-xs">
                    {selectedMovie.genre}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-slate-200 border border-white/10 shadow-xs">
                    {selectedMovie.year}年 · 导演: {selectedMovie.director}
                  </span>
                </div>

                {/* 正在播放提示药丸 */}
                {playingFr && (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#80142A] border border-rose-300/40 text-white text-xs font-bold backdrop-blur-md animate-pulse shadow-md">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <Music2 className="w-3.5 h-3.5" />
                    <span>正在播放原声...</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white font-serif drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] flex items-center gap-3 flex-wrap">
                  <span>《{selectedMovie.movieTitle}》</span>
                  <span className="text-base sm:text-lg font-normal text-rose-200 font-serif italic drop-shadow-md">
                    ({selectedMovie.frenchTitle})
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-100 line-clamp-2 max-w-3xl leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  {selectedMovie.sceneSummary}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <button
                  onClick={handleTogglePlayAll}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                    isPlayingAll
                      ? 'bg-amber-400 hover:bg-amber-500 text-slate-900 ring-4 ring-amber-400/30 font-black'
                      : 'bg-[#80142A] hover:bg-[#680E20] text-white hover:scale-105 active:scale-95 shadow-[#80142A]/40 font-black'
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
                  onClick={() => handlePlaySentence(0)}
                  className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 backdrop-blur-md border border-white/20 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>从头听原声</span>
                </button>

                <button
                  onClick={() => handlePlaySentence(activeDialogueIndex)}
                  className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 backdrop-blur-md border border-white/20 transition cursor-pointer"
                  title="重新播放当前句"
                >
                  <Volume2 className="w-3.5 h-3.5" />
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

          {/* Practice Mode Switcher (三大模式：精析 / 影子跟读 / 挖空) */}
          <div className="border-b border-slate-100 px-4 sm:px-6 py-3 flex items-center justify-between gap-2 flex-wrap bg-slate-50/70">
            <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-2xl">
              <button
                onClick={() => setPracticeMode('breakdown')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  practiceMode === 'breakdown'
                    ? 'bg-white text-[#80142A] shadow-2xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>📖 词汇语法精析</span>
              </button>
              <button
                onClick={() => setPracticeMode('shadowing')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  practiceMode === 'shadowing'
                    ? 'bg-white text-[#80142A] shadow-2xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🎙️ 影子跟读打卡</span>
              </button>
              <button
                onClick={() => setPracticeMode('quiz')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  practiceMode === 'quiz'
                    ? 'bg-white text-[#80142A] shadow-2xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🎯 原声台词挖空</span>
              </button>
            </div>

            <span className="text-xs text-slate-400 font-medium">
              共 {selectedMovie.dialogues.length} 句经典高光对白
            </span>
          </div>

          {/* Dialogue Lines Container */}
          <div className="p-4 sm:p-6 space-y-4">
            
            {/* MODE 1: 词汇语法精析 */}
            {practiceMode === 'breakdown' && (
              <div className="space-y-4">
                {selectedMovie.dialogues.map((line, idx) => {
                  const isActive = activeDialogueIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handlePlaySentence(idx)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 space-y-3 cursor-pointer ${
                        isActive
                          ? 'bg-rose-50/40 border-[#80142A] ring-2 ring-rose-200 shadow-xs'
                          : 'bg-white border-slate-200/80 hover:border-rose-200 hover:bg-slate-50/40'
                      }`}
                    >
                      {/* Character & Audio trigger */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                          {line.character}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlaySentence(idx);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#80142A] hover:bg-[#680E20] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>听原声</span>
                        </button>
                      </div>

                      {/* French Line & Chinese translation */}
                      <div className="space-y-1">
                        <p className="text-base sm:text-lg font-black text-slate-900 leading-relaxed font-serif">
                          {line.fr}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium">
                          {line.zh}
                        </p>
                      </div>

                      {/* Highlighted Words from Vocabulary */}
                      {selectedMovie.vocabulary && selectedMovie.vocabulary.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-bold text-[#80142A]">重点词：</span>
                          {selectedMovie.vocabulary.map((vocab, vIdx) => (
                            <span 
                              key={vIdx}
                              onClick={(e) => handlePlayWord(vocab.word, e)}
                              className="px-2.5 py-0.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#80142A] border border-rose-200/80 text-xs font-semibold cursor-pointer transition flex items-center gap-1"
                              title="点击听生词发音"
                            >
                              <span>{vocab.word}</span>
                              <span className="text-slate-500 font-normal">· {vocab.meaning}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Grammar Points */}
                      {line.keyPoints && (
                        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-950 space-y-0.5">
                          <span className="font-black text-amber-900 block">💡 考点语法精析：</span>
                          <p className="leading-relaxed">{line.keyPoints}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* MODE 2: 影子跟读打卡 */}
            {practiceMode === 'shadowing' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-rose-950 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#80142A]">
                    <Mic className="w-4 h-4 text-[#80142A]" />
                    <span>影子跟读法 (Shadowing Practice)</span>
                  </div>
                  <p>
                    点击单句发音按钮，听完后立即模仿法国电影原声的语调、连音（liaison）与情绪起伏进行复述，快速建立地道法语大脑回路！
                  </p>
                </div>

                <div className="space-y-3">
                  {selectedMovie.dialogues.map((line, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">
                          {line.character}
                        </span>
                        <button
                          onClick={() => handlePlaySentence(idx)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#80142A] text-white text-xs font-bold flex items-center gap-1 hover:bg-[#680E20] transition cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> 听发音示范
                        </button>
                      </div>
                      <p className="text-lg font-black text-slate-900 font-serif">{line.fr}</p>
                      <p className="text-xs text-slate-600">{line.zh}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MODE 3: 原声台词挖空挑战 */}
            {practiceMode === 'quiz' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>法国电影原声名台词挖空挑战</span>
                  </div>
                  <p>
                    根据电影剧情语境与上下文，选出最符合法语语法与口语习惯的正确词汇，巩固动词变位与核心虚词！
                  </p>
                </div>

                <div className="space-y-4">
                  {selectedMovie.dialogues.map((line, idx) => {
                    const quiz = getLineQuiz(line, idx);
                    const userSelected = quizAnswers[idx];
                    const isCorrect = userSelected === quiz.targetWord;

                    return (
                      <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
                        <span className="text-xs font-bold text-slate-500">
                          第 {idx + 1} 题 · {line.character} 的名台词
                        </span>
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <p className="text-base font-black text-slate-900 font-serif">{quiz.maskedFr}</p>
                          <p className="text-xs text-slate-500 mt-1">中文：{line.zh}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {quiz.options.map((opt, optIdx) => {
                            const isThisOpt = userSelected === opt;
                            return (
                              <button
                                key={optIdx}
                                onClick={() => {
                                  setQuizAnswers(prev => ({ ...prev, [idx]: opt }));
                                }}
                                className={`p-2.5 rounded-xl text-xs font-bold transition border text-left cursor-pointer ${
                                  isThisOpt
                                    ? showQuizResult
                                      ? isCorrect
                                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                                        : 'bg-rose-50 border-rose-400 text-rose-900'
                                      : 'bg-[#80142A] border-[#80142A] text-white'
                                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {showQuizResult && (
                          <div className={`p-3 rounded-xl text-xs ${isCorrect ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'}`}>
                            <p className="font-bold">
                              {isCorrect ? '🎉 作答正确！' : `⚠️ 正确答案：${quiz.targetWord}`}
                            </p>
                            <p className="mt-0.5 text-slate-600">{quiz.hint}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={handleCompleteQuiz}
                      className="px-6 py-2.5 rounded-xl bg-[#80142A] text-white text-xs font-bold hover:bg-[#680E20] transition shadow-sm cursor-pointer"
                    >
                      提交并查看结果
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* ② 全部剧目剧场展台 (Movie Selection Deck - 模式切换：列表 / 滑块 / 网格) */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        
        {/* Header & Filter Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 flex-wrap">
              <span>法国影史经典电影研习室</span>
              <span className="text-xs font-bold text-[#80142A] bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                🔥 每周持续扩充更新 (每周五)
              </span>
              <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                已收录 {FRENCH_CINEMA_LIST.length} 部经典名片
              </span>
            </h2>
            <p className="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                🎧 原声名台词音频 · 逐句盲听与影子跟读 · 非视频流媒体
              </span>
              <span>法兰西传世名片高光原声对白，逐句盲听、影子跟读与名师考点精析！</span>
            </p>
          </div>

          {/* View Mode Toggle Switcher & Search */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-[#80142A] shadow-2xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="紧凑精选列表 (前6部展示+支持展开)"
              >
                <List className="w-3.5 h-3.5" />
                <span>列表</span>
              </button>
              <button
                onClick={() => setViewMode('slider')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-white text-[#80142A] shadow-2xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="横向滑块视图 (左右横滑，单行不占高度)"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>滑块</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#80142A] shadow-2xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="画廊卡片视图"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>卡片</span>
              </button>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索片名、导演、关键词..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-[#80142A]/20 focus:border-[#80142A]"
              />
            </div>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {GENRE_CATEGORIES.map(genre => {
            const count = genre === '全部影片' 
              ? FRENCH_CINEMA_LIST.length 
              : FRENCH_CINEMA_LIST.filter(m => m.genre === genre).length;
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`whitespace-nowrap px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  selectedGenre === genre
                    ? 'bg-[#80142A] text-white shadow-xs font-bold'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{genre}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${selectedGenre === genre ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500 font-bold'}`}>
                  {count}部
                </span>
              </button>
            );
          })}
        </div>

        {/* --- 模式 1: 原生上下滑动列表视图 (紧凑精选 6 部 + 可展开全部) --- */}
        {viewMode === 'list' && (
          <div className="space-y-2.5">
            {(isListExpanded ? filteredMovies : filteredMovies.slice(0, 6)).map((movie) => {
              const isSelected = movie.id === selectedMovieId;
              const isFree = movie.isFreePreview;
              const isLocked = !isVip && !isFree;
              const firstLine = movie.dialogues[0];

              return (
                <div
                  key={movie.id}
                  onClick={() => handleSelectMovie(movie)}
                  className={`group bg-white rounded-2xl border transition-all duration-200 p-2.5 sm:p-3 cursor-pointer relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-rose-300 hover:shadow-md ${
                    isSelected
                      ? 'border-[#80142A] ring-2 ring-rose-200 bg-rose-50/20 shadow-xs'
                      : 'border-slate-200/90 shadow-2xs hover:bg-slate-50/50'
                  }`}
                >
                  {/* Left: Thumbnail Poster */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-20 sm:w-24 md:w-28 h-14 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-2xs bg-slate-900">
                      <img 
                        src={movie.coverImage} 
                        alt={movie.movieTitle}
                        className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
                        <span className="text-[10px] text-white font-bold truncate">《{movie.movieTitle}》</span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1 left-1 px-1.5 py-0.2 rounded-md bg-[#80142A] text-white text-[9px] font-black shadow-md flex items-center gap-0.5">
                          <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                          <span>精学中</span>
                        </div>
                      )}
                      {isLocked && (
                        <div className="absolute top-1 right-1 px-1 py-0.2 rounded-md bg-black/75 backdrop-blur-xs text-amber-300 text-[9px] font-bold border border-amber-400/40 shadow-sm flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5 text-amber-400" />
                          <span>VIP</span>
                        </div>
                      )}
                    </div>

                    {/* Mobile-only Header Row */}
                    <div className="sm:hidden flex-1 min-w-0 space-y-0.5">
                      <span className="font-black text-sm text-slate-900 group-hover:text-[#80142A] truncate block">《{movie.movieTitle}》</span>
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">{movie.frenchTitle}</p>
                      <p className="text-[11px] text-slate-400 truncate">{movie.genre} · {movie.levelTag}</p>
                    </div>
                  </div>

                  {/* Middle: Content Info */}
                  <div className="flex-1 min-w-0 space-y-1 w-full sm:w-auto">
                    <div className="hidden sm:flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#80142A] transition truncate font-serif">
                        《{movie.movieTitle}》
                      </span>
                      <span className="text-xs text-slate-400 font-serif font-medium hidden md:inline truncate">
                        {movie.frenchTitle}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md border bg-rose-50 text-[#80142A] border-rose-200">
                        {movie.levelTag}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded-md">
                        {movie.genre}
                      </span>
                    </div>

                    {/* First Dialogue Preview */}
                    {firstLine && (
                      <div className="bg-slate-50/90 group-hover:bg-rose-50/30 px-2.5 py-1 rounded-lg border border-slate-100/90 transition text-xs flex items-center gap-2 overflow-hidden">
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-[#80142A] shrink-0">
                          {firstLine.character}
                        </span>
                        <span className="font-medium text-slate-700 truncate font-serif text-xs">
                          “{firstLine.fr}” <span className="text-slate-400 font-sans font-normal">({firstLine.zh})</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right: Action Button */}
                  <div className="shrink-0 flex items-center justify-between sm:flex-col sm:items-end sm:justify-center gap-2 w-full sm:w-auto pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {isSelected ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#80142A] text-white font-bold text-xs shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>正在精学</span>
                      </div>
                    ) : isLocked ? (
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold transition shadow-2xs">
                        <Lock className="w-3 h-3 text-amber-600" />
                        <span>VIP 专享</span>
                      </button>
                    ) : (
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-[#80142A] text-[#80142A] hover:text-white border border-[#80142A]/30 hover:border-[#80142A] text-xs font-bold transition shadow-2xs group-hover:bg-[#80142A] group-hover:text-white">
                        <span>进入精学</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Expand / Collapse Button */}
            {filteredMovies.length > 6 && (
              <div className="pt-2 text-center">
                <button
                  onClick={() => setIsListExpanded(!isListExpanded)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#80142A] text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  {isListExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                      <span>收起剧目列表 (当前显示全部 {filteredMovies.length} 部 · 点击收起)</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 text-[#80142A]" />
                      <span>展开更多电影 (还有 {filteredMovies.length - 6} 部 · 每周+6部持续更新)</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- 模式 2: 横向滑块视图 (Slider View) --- */}
        {viewMode === 'slider' && (
          <div className="space-y-3 relative">
            <div className="flex items-center justify-end gap-2 pb-1">
              <button
                onClick={() => scrollSlider('left')}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-2xs hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer"
                title="向左滚动"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollSlider('right')}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-2xs hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer"
                title="向右滚动"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div
              ref={sliderRef}
              className="flex gap-3.5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1 no-scrollbar select-none"
            >
              {filteredMovies.map((movie) => {
                const isSelected = movie.id === selectedMovieId;
                const isLocked = !isVip && !movie.isFreePreview;

                return (
                  <div
                    key={movie.id}
                    onClick={() => handleSelectMovie(movie)}
                    className={`w-[280px] sm:w-[320px] shrink-0 snap-start bg-white rounded-2xl border transition-all duration-200 p-3.5 cursor-pointer flex flex-col justify-between hover:border-rose-300 hover:shadow-lg ${
                      isSelected
                        ? 'border-[#80142A] ring-2 ring-rose-200 bg-rose-50/20'
                        : 'border-slate-200/90 shadow-2xs'
                    }`}
                  >
                    <div className="relative w-full h-28 rounded-xl overflow-hidden bg-slate-900 p-3 text-white flex flex-col justify-between">
                      <img 
                        src={movie.coverImage} 
                        alt={movie.movieTitle}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[10px] bg-black/50 px-2 py-0.5 rounded-md font-bold">{movie.levelTag}</span>
                        {isLocked && <span className="text-[10px] bg-amber-500 px-2 py-0.5 rounded-md font-bold text-slate-900">VIP</span>}
                      </div>
                      <div className="relative z-10 font-serif">
                        <h4 className="text-sm font-black text-white">《{movie.movieTitle}》</h4>
                        <p className="text-[10px] text-slate-300 truncate">{movie.frenchTitle}</p>
                      </div>
                    </div>

                    <div className="mt-2.5 space-y-1">
                      <p className="font-bold text-xs text-slate-800 line-clamp-1">{movie.sceneSummary}</p>
                      <p className="text-[11px] text-slate-400">{movie.genre} · {movie.year}年</p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">{movie.dialogues.length} 句原声名台词</span>
                      <span className="font-bold text-[#80142A] flex items-center gap-0.5">
                        <span>点击精学</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- 模式 3: 卡片网格画廊视图 (Grid View) --- */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredMovies.map((movie) => {
              const isSelected = movie.id === selectedMovieId;
              const isFree = movie.isFreePreview;
              const isLocked = !isVip && !isFree;

              return (
                <div
                  key={movie.id}
                  onClick={() => handleSelectMovie(movie)}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer flex flex-col justify-between hover:shadow-lg ${
                    isSelected ? 'border-[#80142A] ring-2 ring-rose-200' : 'border-slate-200 hover:border-rose-200'
                  }`}
                >
                  <div className="relative w-full h-32 bg-slate-900 overflow-hidden p-2.5 flex flex-col justify-between">
                    <img 
                      src={movie.coverImage} 
                      alt={movie.movieTitle}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[10px] bg-black/60 px-1.5 py-0.2 rounded font-bold text-white">{movie.levelTag}</span>
                      {isLocked ? (
                        <span className="text-[10px] bg-amber-500 text-slate-900 font-bold px-1.5 py-0.2 rounded">VIP</span>
                      ) : (
                        <span className="text-[10px] bg-emerald-500 text-white font-bold px-1.5 py-0.2 rounded">免费</span>
                      )}
                    </div>
                    <div className="relative z-10 text-white font-serif">
                      <h4 className="text-xs sm:text-sm font-black truncate">《{movie.movieTitle}》</h4>
                      <p className="text-[10px] text-slate-300 truncate">{movie.frenchTitle}</p>
                    </div>
                  </div>

                  <div className="p-2.5 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="truncate">{movie.genre}</span>
                      <span>{movie.year}年</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};

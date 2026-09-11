import React, { useState, useEffect } from 'react';
import { 
  FileCheck2, 
  GraduationCap, 
  Globe2, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  Pause, 
  Volume2, 
  RotateCcw, 
  BookMarked,
  ArrowRight,
  ArrowLeft,
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FRENCH_EXAM_PAPERS, ExamPaper, ExamQuestion, ExamTrack } from '../data/french/examData';

export interface WrongRecord {
  id: string;
  paperId: string;
  paperTitle: string;
  question: ExamQuestion;
  userAnswer: number;
  date: string;
}

interface FrenchExamViewProps {
  isVip: boolean;
  onOpenVipModal: () => void;
  onSaveMistake: (record: WrongRecord) => void;
}

export const FrenchExamView: React.FC<FrenchExamViewProps> = ({
  isVip,
  onOpenVipModal,
  onSaveMistake
}) => {
  const [activeTrack, setActiveTrack] = useState<ExamTrack>('kaoyan');
  const [activeDelfLevel, setActiveDelfLevel] = useState<string>('all');
  const [selectedPaper, setSelectedPaper] = useState<ExamPaper | null>(null);

  // Exam taking state
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3600);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<{ totalScore: number; earnedScore: number; percentage: number } | null>(null);

  // Audio simulation state for DELF
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const filteredPapers = FRENCH_EXAM_PAPERS.filter(p => {
    if (p.track !== activeTrack) return false;
    if (activeTrack === 'delf' && activeDelfLevel !== 'all') {
      return p.levelTag.includes(activeDelfLevel);
    }
    return true;
  });

  // Countdown timer effect
  useEffect(() => {
    if (!selectedPaper || isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedPaper, isSubmitted]);

  const startExam = (paper: ExamPaper) => {
    setSelectedPaper(paper);
    setCurrentQIndex(0);
    setUserAnswers({});
    setSecondsRemaining(paper.durationMinutes * 60);
    setIsSubmitted(false);
    setScoreResult(null);
  };

  const handleSelectAnswer = (qIndex: number, optIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  };

  const playSpeech = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.88;
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const handleSubmitExam = () => {
    if (!selectedPaper) return;
    let earned = 0;
    const questions = selectedPaper.questions;

    questions.forEach((q, idx) => {
      const uAns = userAnswers[idx];
      if (uAns === q.correctAnswer) {
        earned += q.score;
      } else {
        // Collect into mistake book
        onSaveMistake({
          id: `${selectedPaper.id}_${q.id}_${Date.now()}`,
          paperId: selectedPaper.id,
          paperTitle: selectedPaper.title,
          question: q,
          userAnswer: uAns !== undefined ? uAns : -1,
          date: new Date().toLocaleDateString('zh-CN')
        });
      }
    });

    const percentage = Math.round((earned / selectedPaper.totalScore) * 100);
    setScoreResult({
      totalScore: selectedPaper.totalScore,
      earnedScore: earned,
      percentage
    });
    setIsSubmitted(true);

    if (percentage >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignore
      }
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* If NOT taking exam: Paper Selection View */}
      {!selectedPaper ? (
        <div className="space-y-6">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-800/40">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>全真题机考规范 · 毫秒级判分</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                双轨真题全真机考大卷库
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm">
                真实考场倒计时模拟交卷，交卷秒出成绩单，错题自动收录进专属错题本，支持一键针对性重练。
              </p>
            </div>
          </div>

          {/* Track Switcher Tabs (考研二外 vs DELF欧标) */}
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/80 max-w-lg">
            <button
              onClick={() => setActiveTrack('kaoyan')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTrack === 'kaoyan'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-white/60'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>🎓 考研二外法语 (241/242)</span>
            </button>

            <button
              onClick={() => setActiveTrack('delf')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTrack === 'delf'
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-white/60'
              }`}
            >
              <Globe2 className="w-4 h-4" />
              <span>🌍 DELF 欧标考级 (A1-B2)</span>
            </button>
          </div>

          {/* DELF Level Sub-filter */}
          {activeTrack === 'delf' && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-slate-500 shrink-0">欧标级别:</span>
              {['all', 'A1', 'A2', 'B1', 'B2'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setActiveDelfLevel(lvl)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                    activeDelfLevel === lvl
                      ? 'bg-rose-700 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {lvl === 'all' ? '全部级别' : `${lvl} 级别`}
                </button>
              ))}
            </div>
          )}

          {/* Paper Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPapers.map(paper => (
              <div
                key={paper.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      paper.track === 'kaoyan'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {paper.levelTag}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {paper.yearOrSession}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition leading-snug">
                    {paper.title}
                  </h3>
                  <p className="text-xs font-serif italic text-slate-500">
                    {paper.frenchTitle}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 pt-1">
                    {paper.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {paper.durationMinutes} 分钟
                    </span>
                    <span>•</span>
                    <span>满分 {paper.totalScore} 分</span>
                    <span>•</span>
                    <span>{paper.questions.length} 题</span>
                  </div>

                  <button
                    onClick={() => startExam(paper)}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm shadow-blue-700/20 group-hover:scale-105 transition"
                  >
                    <span>进入机考</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        /* Active Exam Simulator View */
        <div className="space-y-6">
          
          {/* Top Exam Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-wrap items-center justify-between gap-3 sticky top-16 z-30">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                {selectedPaper.title}
              </h2>
              <span className="text-xs text-slate-500">
                共 {selectedPaper.questions.length} 题 · 当前第 {currentQIndex + 1} 题
              </span>
            </div>

            <div className="flex items-center gap-4">
              {!isSubmitted && (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono font-bold text-xs sm:text-sm ${
                  secondsRemaining < 300 
                    ? 'bg-rose-100 text-rose-700 animate-pulse' 
                    : 'bg-slate-100 text-slate-800'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>剩余倒计时：{formatTime(secondsRemaining)}</span>
                </div>
              )}

              {!isSubmitted ? (
                <button
                  onClick={handleSubmitExam}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition"
                >
                  交卷评分
                </button>
              ) : (
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition"
                >
                  返回试卷列表
                </button>
              )}
            </div>
          </div>

          {/* Exam Body Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 8 Cols: Question Display */}
            <div className="lg:col-span-8 space-y-4">
              {(() => {
                const q = selectedPaper.questions[currentQIndex];
                const selectedOpt = userAnswers[currentQIndex];
                const isListening = q.type === 'listening';
                return (
                  <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 space-y-6">
                    
                    {/* Question Header & Audio Player if listening */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold">
                          第 {currentQIndex + 1} 题 · {q.type === 'listening' ? '🎧 听力理解' : q.type === 'reading' ? '📖 阅读理解' : '📝 语法与词汇'} ({q.score}分)
                        </span>
                        {q.grammarTag && (
                          <span className="text-xs text-slate-400">
                            考点：{q.grammarTag}
                          </span>
                        )}
                      </div>

                      {/* Reading context if exists */}
                      {q.contextText && (
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed font-serif whitespace-pre-line">
                          {q.contextText}
                        </div>
                      )}

                      {/* Listening Audio Control */}
                      {isListening && (
                        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => q.audioScript && playSpeech(q.audioScript)}
                              className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 transition"
                            >
                              {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                            </button>
                            <div>
                              <div className="text-xs font-bold text-indigo-950">
                                考场真实录音播放器 (Compréhension orale)
                              </div>
                              <p className="text-[11px] text-indigo-700">
                                点击播放法国原声听力材料
                              </p>
                            </div>
                          </div>

                          {/* Sound wave animation */}
                          {isPlayingAudio && (
                            <div className="flex items-end gap-1 h-5">
                              <span className="w-1 bg-indigo-600 rounded-full animate-wave-1"></span>
                              <span className="w-1 bg-indigo-600 rounded-full animate-wave-2"></span>
                              <span className="w-1 bg-indigo-600 rounded-full animate-wave-3"></span>
                              <span className="w-1 bg-indigo-600 rounded-full animate-wave-4"></span>
                            </div>
                          )}
                        </div>
                      )}

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h3>
                    </div>

                    {/* Options List */}
                    <div className="space-y-2.5">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = selectedOpt === oIdx;
                        const isCorrect = q.correctAnswer === oIdx;
                        
                        let optStyle = 'bg-slate-50 hover:bg-blue-50/60 border-slate-200/80 text-slate-800';
                        if (isSubmitted) {
                          if (isCorrect) optStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                          else if (isChosen && !isCorrect) optStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                        } else if (isChosen) {
                          optStyle = 'bg-blue-700 text-white border-blue-700 shadow-sm';
                        }

                        return (
                          <div
                            key={oIdx}
                            onClick={() => handleSelectAnswer(currentQIndex, oIdx)}
                            className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                                isChosen && !isSubmitted
                                  ? 'bg-white/20 text-white'
                                  : 'bg-white text-slate-700 border border-slate-200/80 shadow-2xs'
                              }`}>
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span className="text-xs sm:text-sm font-medium">
                                {opt}
                              </span>
                            </div>

                            {isSubmitted && (
                              <div>
                                {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                                {isChosen && !isCorrect && <AlertCircle className="w-5 h-5 text-rose-600" />}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Post-Submit Detailed Teacher Explanation */}
                    {isSubmitted && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2 text-xs sm:text-sm leading-relaxed text-amber-950">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span>权威名师深度解析</span>
                        </div>
                        <div className="whitespace-pre-line text-slate-700">
                          {q.explanation}
                        </div>
                        {q.audioScript && (
                          <div className="mt-2 pt-2 border-t border-amber-200/60">
                            <span className="font-bold text-amber-900">【听力原文大纲】：</span>
                            <p className="italic font-serif text-slate-800 mt-1">{q.audioScript}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Question Next/Prev Bar */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        disabled={currentQIndex === 0}
                        onClick={() => setCurrentQIndex(prev => prev - 1)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs disabled:opacity-40 disabled:pointer-events-none transition flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>上一题</span>
                      </button>

                      <button
                        disabled={currentQIndex === selectedPaper.questions.length - 1}
                        onClick={() => setCurrentQIndex(prev => prev + 1)}
                        className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs disabled:opacity-40 disabled:pointer-events-none transition flex items-center gap-1 shadow-sm"
                      >
                        <span>下一题</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })()}
            </div>

            {/* Right 4 Cols: Answer Sheet & Score Report */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Score Report Card (If submitted) */}
              {isSubmitted && scoreResult && (
                <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-200">机考成绩单</span>
                    <Award className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-4xl font-black font-mono">
                      {scoreResult.earnedScore} <span className="text-lg font-normal text-blue-200">/ {scoreResult.totalScore}</span>
                    </div>
                    <p className="text-xs text-blue-200 mt-0.5">
                      得分率: {scoreResult.percentage}% ({scoreResult.percentage >= 60 ? '考试通过' : '未达标，需强化'})
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 text-xs text-blue-100">
                    错题已自动收录进专属错题本，可在导航栏「错题本」中针对回练。
                  </div>
                </div>
              )}

              {/* Question Navigation Sheet */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5 space-y-3">
                <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>考场答题卡 (Feuille de réponses)</span>
                  <span className="text-slate-400 font-normal">
                    已答 {Object.keys(userAnswers).length} / {selectedPaper.questions.length}
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-1">
                  {selectedPaper.questions.map((q, idx) => {
                    const isAnswered = userAnswers[idx] !== undefined;
                    const isCurrent = currentQIndex === idx;
                    const isCorrect = userAnswers[idx] === q.correctAnswer;

                    let btnColor = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                    if (isSubmitted) {
                      btnColor = isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white';
                    } else if (isAnswered) {
                      btnColor = 'bg-blue-700 text-white';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentQIndex(idx)}
                        className={`h-9 rounded-xl text-xs font-bold transition flex items-center justify-center ${btnColor} ${
                          isCurrent ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

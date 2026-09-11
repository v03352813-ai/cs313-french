import React, { useState, useMemo, useEffect } from 'react';
import { 
  FileCheck2, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Volume2, 
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Layers,
  GraduationCap,
  Globe2,
  Clock,
  Award,
  Target,
  BookOpen,
  Search,
  ChevronDown,
  Headphones,
  Play,
  Pause,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FRENCH_EXAM_PAPERS, ExamPaper, ExamQuestion, ExamTrack } from '../data/french/examData';
import { speakFrench } from '../utils/speech';

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
  onOpenVipModal: (reason?: string) => void;
  onSaveMistake: (record: WrongRecord) => void;
}

export const FrenchExamView: React.FC<FrenchExamViewProps> = ({
  isVip,
  onOpenVipModal,
  onSaveMistake
}) => {
  const [activeTrack, setActiveTrack] = useState<ExamTrack>('kaoyan');
  const [selectedPaperId, setSelectedPaperId] = useState<string>('ky-2025-comprehensive-01');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [kaoyanFilter, setKaoyanFilter] = useState<string>('all');
  const [delfFilter, setDelfFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showInstantExplanation, setShowInstantExplanation] = useState<boolean>(true);
  
  // Audio player state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [showListeningScript, setShowListeningScript] = useState<boolean>(false);

  // Countdown timer state
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3600);

  // Filter papers based on active track, sub-filters, and search
  const filteredPapers = useMemo(() => {
    return FRENCH_EXAM_PAPERS.filter(p => {
      if (p.track !== activeTrack) return false;

      if (activeTrack === 'kaoyan' && kaoyanFilter !== 'all') {
        if (kaoyanFilter === 'beiwai' && !p.schoolOrOrg.includes('北京外国语大学')) return false;
        if (kaoyanFilter === 'shisu' && !p.schoolOrOrg.includes('上海外国语大学')) return false;
        if (kaoyanFilter === 'zonghe' && !p.title.includes('综合') && !p.title.includes('统考')) return false;
        if (kaoyanFilter === 'zhuanxiang' && !p.title.includes('专项') && !p.title.includes('时态')) return false;
      }

      if (activeTrack === 'delf' && delfFilter !== 'all') {
        if (!p.level.includes(delfFilter)) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.frenchTitle.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q);
      }

      return true;
    });
  }, [activeTrack, kaoyanFilter, delfFilter, searchQuery]);

  // Keep selected paper synchronized when switching filters
  useEffect(() => {
    if (filteredPapers.length > 0 && !filteredPapers.some(p => p.id === selectedPaperId)) {
      setSelectedPaperId(filteredPapers[0].id);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setIsSubmitted(false);
      setIsPlayingAudio(false);
    }
  }, [filteredPapers, selectedPaperId]);

  const currentPaper: ExamPaper = useMemo(() => {
    return FRENCH_EXAM_PAPERS.find(p => p.id === selectedPaperId) || filteredPapers[0] || FRENCH_EXAM_PAPERS[0];
  }, [selectedPaperId, filteredPapers]);

  // Update timer whenever paper changes
  useEffect(() => {
    if (currentPaper) {
      setSecondsRemaining(currentPaper.durationMinutes * 60);
    }
  }, [currentPaper]);

  // Countdown timer interval
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitPaper();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const currentQuestion: ExamQuestion | undefined = currentPaper?.questions[currentQuestionIndex];

  // 计算当前试卷三大官方核心板块（语法词汇、读解分析、听解原声）的题量与起始位置
  const sectionTabs = useMemo(() => {
    if (!currentPaper || !currentPaper.questions || currentPaper.questions.length === 0) return [];

    let vocabStart = -1, vocabCount = 0;
    let readingStart = -1, readingCount = 0;
    let listeningStart = -1, listeningCount = 0;

    currentPaper.questions.forEach((q, idx) => {
      if (q.questionType === '读解分析' || q.categoryTag.includes('读解') || q.categoryTag.includes('阅读')) {
        if (readingStart === -1) readingStart = idx;
        readingCount++;
      } else if (q.questionType === '听解原声' || q.categoryTag.includes('听力') || q.categoryTag.includes('广播') || q.audioScript) {
        if (listeningStart === -1) listeningStart = idx;
        listeningCount++;
      } else {
        if (vocabStart === -1) vocabStart = idx;
        vocabCount++;
      }
    });

    const curQ = currentPaper.questions[currentQuestionIndex];
    const curIsReading = curQ && (curQ.questionType === '读解分析' || curQ.categoryTag.includes('读解') || curQ.categoryTag.includes('阅读'));
    const curIsListening = curQ && (curQ.questionType === '听解原声' || curQ.categoryTag.includes('听力') || curQ.categoryTag.includes('广播') || curQ.audioScript);
    const curIsVocab = curQ && !curIsReading && !curIsListening;

    const list: { key: string; name: string; icon: string; startIndex: number; count: number; isActive: boolean }[] = [];

    if (vocabCount > 0) {
      list.push({
        key: 'vocab',
        name: '语法词汇 (Vocabulaire & Grammaire)',
        icon: '📝',
        startIndex: vocabStart,
        count: vocabCount,
        isActive: Boolean(curIsVocab)
      });
    }
    if (readingCount > 0) {
      list.push({
        key: 'reading',
        name: '读解分析 (Compréhension écrite)',
        icon: '📖',
        startIndex: readingStart,
        count: readingCount,
        isActive: Boolean(curIsReading)
      });
    }
    if (listeningCount > 0) {
      list.push({
        key: 'listening',
        name: '听解原声 (Compréhension orale)',
        icon: '🎧',
        startIndex: listeningStart,
        count: listeningCount,
        isActive: Boolean(curIsListening)
      });
    }

    return list;
  }, [currentPaper, currentQuestionIndex]);

  // Handle select option
  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optIndex
    }));
  };

  // Play listening audio speech
  const handlePlayAudio = async (text: string) => {
    if (isPlayingAudio) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    await speakFrench(text, audioSpeed);
    setIsPlayingAudio(false);
  };

  // Calculate official scaled score report
  const scoreReport = useMemo(() => {
    if (!currentPaper || !isSubmitted) return null;
    let totalScore = 0;
    let earnedScore = 0;
    let correctCount = 0;

    let vocabTotal = 0, vocabEarned = 0, vocabCorrect = 0, vocabCount = 0;
    let readingTotal = 0, readingEarned = 0, readingCorrect = 0, readingCount = 0;
    let listeningTotal = 0, listeningEarned = 0, listeningCorrect = 0, listeningCount = 0;

    currentPaper.questions.forEach((q, idx) => {
      totalScore += q.score;
      const isCorrect = answers[idx] === q.correctAnswer;
      if (isCorrect) {
        earnedScore += q.score;
        correctCount += 1;
      }

      const isReading = q.questionType === '读解分析' || q.categoryTag.includes('读解') || q.categoryTag.includes('阅读');
      const isListening = q.questionType === '听解原声' || q.categoryTag.includes('听力') || q.categoryTag.includes('广播') || q.audioScript;

      if (isReading) {
        readingTotal += q.score;
        readingCount += 1;
        if (isCorrect) {
          readingEarned += q.score;
          readingCorrect += 1;
        }
      } else if (isListening) {
        listeningTotal += q.score;
        listeningCount += 1;
        if (isCorrect) {
          listeningEarned += q.score;
          listeningCorrect += 1;
        }
      } else {
        vocabTotal += q.score;
        vocabCount += 1;
        if (isCorrect) {
          vocabEarned += q.score;
          vocabCorrect += 1;
        }
      }
    });

    // Scale to 100-point French official benchmark
    const scaledScore = totalScore > 0 ? Math.round((earnedScore / totalScore) * 100) : 0;
    const scaledVocab = vocabTotal > 0 ? Math.round((vocabEarned / vocabTotal) * 100) : 0;
    const scaledReading = readingTotal > 0 ? Math.round((readingEarned / readingTotal) * 100) : 0;
    const scaledListening = listeningTotal > 0 ? Math.round((listeningEarned / listeningTotal) * 100) : 0;

    // Benchmarks
    const isKaoyan = currentPaper.track === 'kaoyan';
    const passThreshold = isKaoyan ? 60 : 50; // 考研二外合格线60，DELF及格线50/100
    
    // DELF 单科否决制：DELF 官方单科淘汰线为 5/25 分 (得分率 20%)
    const isDelfEliminated = !isKaoyan && (
      (listeningCount > 0 && scaledListening < 20) ||
      (readingCount > 0 && scaledReading < 20) ||
      (vocabCount > 0 && scaledVocab < 20)
    );

    const isTotalScorePass = scaledScore >= passThreshold;
    const isPassed = isKaoyan ? isTotalScorePass : (isTotalScorePass && !isDelfEliminated);

    let verdictType: 'pass' | 'section_fail' | 'total_fail' = 'total_fail';
    let failReason = '';

    if (isPassed) {
      verdictType = 'pass';
    } else if (!isKaoyan && isTotalScorePass && isDelfEliminated) {
      verdictType = 'section_fail';
      failReason = `总分达到 ${scaledScore} 分，但单项得分率低于 20%（未达到 DELF 官方 5/25 分单科淘汰线），触发法国欧标单科否决淘汰机制！`;
    } else {
      verdictType = 'total_fail';
      failReason = `总分 ${scaledScore} 分未达到本项测试合格线（${passThreshold} 分），仍需重点攻克错题！`;
    }

    return {
      earnedScore,
      totalScore,
      correctCount,
      totalQuestions: currentPaper.questions.length,
      scaledScore,
      isPassed,
      passThreshold,
      verdictType,
      failReason,
      vocab: { score: scaledVocab, earned: vocabEarned, total: vocabTotal, count: vocabCount, correct: vocabCorrect },
      reading: { score: scaledReading, earned: readingEarned, total: readingTotal, count: readingCount, correct: readingCorrect },
      listening: { score: scaledListening, earned: listeningEarned, total: listeningTotal, count: listeningCount, correct: listeningCorrect }
    };
  }, [currentPaper, isSubmitted, answers]);

  // Submit paper and collect mistakes
  const handleSubmitPaper = () => {
    setIsSubmitted(true);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);

    // Save wrong answers into mistake notebook
    if (currentPaper) {
      currentPaper.questions.forEach((q, idx) => {
        const uAns = answers[idx];
        if (uAns !== q.correctAnswer) {
          onSaveMistake({
            id: `${currentPaper.id}_${q.id}_${Date.now()}`,
            paperId: currentPaper.id,
            paperTitle: currentPaper.title,
            question: q,
            userAnswer: uAns !== undefined ? uAns : -1,
            date: new Date().toLocaleDateString('zh-CN')
          });
        }
      });
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore
    }
  };

  const handleResetExam = () => {
    setAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    if (currentPaper) {
      setSecondsRemaining(currentPaper.durationMinutes * 60);
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6 space-y-5 pb-20">
      
      {/* Top Hero Banner */}
      <div className="bg-[#FCFAF6] rounded-3xl border border-[#E8DECE] shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#8C3B4A]/10 text-[#8C3B4A] border border-[#8C3B4A]/20 text-xs font-bold">
              🏛️ 法国双轨全真机考考场
            </span>
            <span className="text-xs text-stone-500 font-medium">
              100分官方标准评分 · 词汇文法/读解/听解原声 · 考研二外与DELF同步
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#8C3B4A] tracking-tight">
            法语历届官方考期真题与全真机考系统
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            全真还原考研二外 241/242 名校大卷与 DELF 欧标 (A1~B2) 作答流程，支持即做即看与考场全真模考！
          </p>
        </div>
      </div>

      {/* 📌 双轨官方考纲权威说明横幅 */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#8C3B4A]/10 via-[#C8A96B]/10 to-[#F7F3EA] border border-[#E8DECE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 animate-pulse ${activeTrack === 'kaoyan' ? 'bg-[#8C3B4A]' : 'bg-[#C8A96B]'}`} />
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 font-black text-[#292929]">
              <span className={activeTrack === 'kaoyan' ? 'text-[#8C3B4A]' : 'text-[#8C3B4A]'}>
                {activeTrack === 'kaoyan' ? '🎓 考研二外法语 (241/242/243) 考纲指引' : '🌍 DELF 欧标国际认证 (A1-B2) 考纲指引'}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTrack === 'kaoyan'
                  ? 'bg-[#8C3B4A]/10 text-[#8C3B4A]'
                  : 'bg-[#FAF5EB] text-[#8C3B4A] border border-[#C8A96B]/40'
              }`}>
                {activeTrack === 'kaoyan' ? '全国名校自主命题 · 100分制' : '法国教育部官方标准 · 淘汰制'}
              </span>
            </div>
            <p className="text-stone-600 leading-relaxed font-medium">
              {activeTrack === 'kaoyan' ? (
                <span>考研二外重点考察 <strong>【时态配合·代词语序·虚拟式触发】</strong> 与 <strong>【学术阅读与逻辑辨析】</strong>，试卷满分 100 分，及格线通常为 60 分，名校复试线常在 75~85 分区间。</span>
              ) : (
                <span>DELF 欧标测试为法国教育部 FEI 统一命题，覆盖 <strong>【Compréhension orale 原声听解】</strong> 与 <strong>【Compréhension écrite 读解分析】</strong>，总分 100 分，及格线 50 分，且单项不得低于 <strong>5/25分（触发单科淘汰线）</strong>！</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Dual Track Switcher & Paper Filter Card */}
      <div className="bg-[#FCFAF6] rounded-2xl p-4 border border-[#E8DECE] shadow-xs space-y-4">
        
        {/* Track Switcher Tabs (考研二外 vs DELF欧标) */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#F2ECE1] rounded-2xl border border-[#E5DAC8] max-w-md">
          <button
            onClick={() => {
              setActiveTrack('kaoyan');
              setKaoyanFilter('all');
              handleResetExam();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTrack === 'kaoyan'
                ? 'bg-[#8C3B4A] text-white shadow-xs font-black'
                : 'text-[#292929] hover:bg-white/60'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>🎓 考研二外法语 (241/242)</span>
          </button>

          <button
            onClick={() => {
              setActiveTrack('delf');
              setDelfFilter('all');
              handleResetExam();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTrack === 'delf'
                ? 'bg-[#C8A96B] text-[#292929] shadow-xs font-black'
                : 'text-[#292929] hover:bg-white/60'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>🌍 DELF 欧标考级 (A1-B2)</span>
          </button>
        </div>

        {/* Sub-Filters: 高校或欧标级别 */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#292929] shrink-0">
            <span className={`w-1.5 h-3.5 rounded-full ${activeTrack === 'kaoyan' ? 'bg-[#8C3B4A]' : 'bg-[#C8A96B]'}`} />
            <span>{activeTrack === 'kaoyan' ? '高校分类筛选:' : '欧标级别筛选:'}</span>
          </div>

          {activeTrack === 'kaoyan' ? (
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: '全部考卷' },
                { id: 'beiwai', label: '北外 241' },
                { id: 'shisu', label: '上外 242' },
                { id: 'zonghe', label: '综合精编' },
                { id: 'zhuanxiang', label: '时态专项' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setKaoyanFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    kaoyanFilter === f.id
                      ? 'bg-[#8C3B4A] text-white shadow-2xs font-black'
                      : 'bg-[#F7F3EA] text-[#292929] hover:bg-[#EFE8DC] border border-[#E8DECE]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: '全部级别' },
                { id: 'A1', label: 'DELF A1 入门' },
                { id: 'A2', label: 'DELF A2 初级' },
                { id: 'B1', label: 'DELF B1 进阶' },
                { id: 'B2', label: 'DELF B2 高级' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setDelfFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    delfFilter === f.id
                      ? 'bg-[#C8A96B] text-[#292929] shadow-2xs font-black'
                      : 'bg-[#F7F3EA] text-[#292929] hover:bg-[#EFE8DC] border border-[#E8DECE]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Paper Selector Dropdown & Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#E8DECE]">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-700 shrink-0">
              <FileCheck2 className="w-4 h-4 text-[#8C3B4A]" />
              <span>选择作答试卷 ({filteredPapers.length} 套):</span>
            </div>

            <div className="relative flex-1 min-w-0 max-w-xl">
              <select
                value={currentPaper?.id || ''}
                onChange={(e) => {
                  const targetId = e.target.value;
                  const targetPaper = FRENCH_EXAM_PAPERS.find(p => p.id === targetId);
                  const pIdx = filteredPapers.findIndex(p => p.id === targetId);
                  const isLockedPaper = !isVip && !targetPaper?.isFreePreview && pIdx !== 0;
                  if (isLockedPaper) {
                    onOpenVipModal(`🔒《${targetPaper?.title}》为 VIP 专属高频考场！升级 VIP 终身卡（仅 ¥49.9），即可解锁考研二外与 DELF 全量大卷库！`);
                    return;
                  }
                  setSelectedPaperId(targetId);
                handleResetExam();
              }}
              className="w-full pl-3.5 pr-9 py-2 rounded-xl bg-[#F7F3EA] hover:bg-[#FAF6EE] border border-[#E8DECE] text-xs sm:text-sm font-black text-[#8C3B4A] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#8C3B4A]/20 transition cursor-pointer appearance-none truncate shadow-2xs"
            >
              {filteredPapers.map((p, idx) => {
                const isFreeTrial = idx === 0 || p.isFreePreview;
                const statusLabel = isVip || isFreeTrial ? '✓ [可作答] ' : '🔒 [VIP专属] ';
                return (
                  <option key={p.id} value={p.id}>
                    {statusLabel}[{idx + 1}/{filteredPapers.length}] {p.yearOrSession} · {p.title} ({p.questions.length}题 · {p.durationMinutes}分钟)
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-stone-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-stone-500 shrink-0">
          <span className={`px-2 py-0.5 rounded-md border ${
            activeTrack === 'kaoyan'
              ? 'bg-[#8C3B4A]/10 text-[#8C3B4A] border-[#8C3B4A]/20'
              : 'bg-[#FAF5EB] text-[#8C3B4A] border-[#C8A96B]/30'
          }`}>
            {currentPaper?.level}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[#F7F3EA] text-stone-600 border border-[#E8DECE]">
            {currentPaper?.questions.length} 道全真题目 · {currentPaper?.durationMinutes} 分钟
          </span>
        </div>
      </div>

    </div>

    {/* Main Exam Arena: Left Question Area + Right Answer Sheet */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      
      {/* Left 8 Cols: Question Display */}
      <div className="lg:col-span-8 bg-[#FCFAF6] rounded-3xl p-5 sm:p-7 border border-[#E8DECE] shadow-xs flex flex-col justify-between space-y-6">
        
        {currentQuestion ? (
          <div className="space-y-5">
            
            {/* 三大板块快速直达 (语法词汇 / 读解长文 / 听解原声) */}
            {sectionTabs.length > 1 && (
              <div className="flex items-center gap-1.5 p-1.5 bg-[#F2ECE1] rounded-2xl border border-[#E5DAC8] overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-bold text-stone-500 pl-2 shrink-0">题型直达:</span>
                {sectionTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setCurrentQuestionIndex(tab.startIndex)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      tab.isActive
                        ? 'bg-[#8C3B4A] text-white shadow-xs font-black'
                        : 'bg-[#FCFAF6] text-[#292929] hover:bg-white border border-[#E8DECE]'
                    }`}
                    title={`直接跳转到【${tab.name}】`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${tab.isActive ? 'bg-white/25 text-white font-black' : 'bg-[#F7F3EA] text-stone-600'}`}>
                      {tab.count}题
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Question Header */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E8DECE]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-xl text-white font-mono text-xs font-black bg-[#8C3B4A]">
                  第 {currentQuestionIndex + 1} 题
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F7F3EA] text-[#292929] border border-[#E8DECE] text-xs font-bold">
                  {currentQuestion.categoryTag}
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  分值: {currentQuestion.score} 分
                </span>
              </div>

              <button
                onClick={() => speakFrench(currentQuestion.contextText || currentQuestion.question)}
                className="p-1.5 rounded-lg bg-[#8C3B4A]/10 text-[#8C3B4A] hover:bg-[#8C3B4A]/20 transition cursor-pointer"
                title="朗读题目"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Reading Passage if any */}
            {currentQuestion.contextText && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF5EB] border-2 border-[#C8A96B]/40 space-y-2.5 select-text shadow-2xs relative">
                <div className="flex items-center justify-between pb-2 border-b border-[#C8A96B]/30">
                  <span className="text-xs font-black text-[#8C3B4A] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#C8A96B]" />
                    <span>【读解分析 · 官方全真法文阅读文本材料】</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#8C3B4A] border border-[#C8A96B]/40 shadow-2xs">
                    法文原汁原味阅读材料
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-[#292929] leading-relaxed font-medium whitespace-pre-line font-serif">
                  {currentQuestion.contextText}
                </div>
              </div>
            )}

            {/* Listening Audio Player if any */}
            {(currentQuestion.audioScript || currentQuestion.questionType === '听解原声') && (
              <div className="p-4 rounded-2xl bg-[#FCFAF6] border border-[#8C3B4A]/30 shadow-2xs space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => currentQuestion.audioScript && handlePlayAudio(currentQuestion.audioScript)}
                      className="w-10 h-10 rounded-full bg-[#8C3B4A] hover:bg-[#752E3C] text-white flex items-center justify-center shadow-md shadow-[#8C3B4A]/25 transition cursor-pointer shrink-0"
                      title={isPlayingAudio ? '暂停听力' : '播放原声听力'}
                    >
                      {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                    <div>
                      <div className="text-xs font-bold text-[#8C3B4A] flex items-center gap-1.5">
                        <Headphones className="w-3.5 h-3.5 text-[#8C3B4A]" />
                        <span>考场原声听力播放器 (Compréhension orale)</span>
                      </div>
                      <p className="text-[11px] text-stone-600">
                        {isPlayingAudio ? '正在播放法国官方录音...' : '点击播放法国原声场景材料'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-stone-600 bg-[#F7F3EA] px-2 py-1 rounded-xl border border-[#E8DECE]">
                      <span>语速:</span>
                      {[0.8, 1.0, 1.2].map(speed => (
                        <button
                          key={speed}
                          onClick={() => setAudioSpeed(speed)}
                          className={`px-1.5 py-0.5 rounded text-[10px] ${
                            audioSpeed === speed ? 'bg-[#8C3B4A] text-white font-bold' : 'hover:bg-white'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setShowListeningScript(prev => !prev)}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-[#F7F3EA] text-[#8C3B4A] border border-[#8C3B4A]/30 hover:bg-[#8C3B4A]/10 transition cursor-pointer"
                    >
                      {showListeningScript ? '隐藏原文' : '查看原文大纲'}
                    </button>
                  </div>
                </div>

                {/* Collapsible Listening Script */}
                {showListeningScript && currentQuestion.audioScript && (
                  <div className="pt-2 border-t border-[#8C3B4A]/20 text-xs font-serif italic text-stone-700 leading-relaxed bg-[#F7F3EA] p-3 rounded-xl">
                    <div className="font-bold text-[#292929] text-[11px] not-italic pb-1">
                      【听力原声材料大纲】：
                    </div>
                    {currentQuestion.audioScript}
                  </div>
                )}
              </div>
            )}

            {/* Question Title */}
            <h3 className="text-sm sm:text-base font-bold text-[#292929] whitespace-pre-line leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, optIdx) => {
                const isSelected = answers[currentQuestionIndex] === optIdx;
                const isCorrect = currentQuestion.correctAnswer === optIdx;
                const showResult = isSubmitted || (showInstantExplanation && answers[currentQuestionIndex] !== undefined);

                let optStyle = 'bg-[#F7F3EA] hover:bg-white text-[#292929] border-[#E8DECE]';
                if (isSelected) {
                  optStyle = 'bg-[#FAF5EB] border-[#8C3B4A] text-[#8C3B4A] shadow-2xs font-bold';
                }
                if (showResult) {
                  if (isCorrect) {
                    optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition duration-150 flex items-center justify-between gap-3 text-xs sm:text-sm cursor-pointer ${optStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                        isSelected && !showResult
                          ? 'bg-[#8C3B4A] text-white'
                          : 'bg-[#FCFAF6] border border-[#E8DECE] text-[#292929]'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </div>

                      {showResult && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Explanation Card */}
              {(isSubmitted || (showInstantExplanation && answers[currentQuestionIndex] !== undefined)) && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF5EB] border border-[#C8A96B]/40 space-y-3 text-xs">
                  <div className="flex items-center gap-1.5 text-[#8C3B4A] font-black">
                    <Sparkles className="w-4 h-4 text-[#C8A96B]" />
                    <span>考点权威名师解析</span>
                  </div>
                  <p className="text-[#292929] leading-relaxed font-medium whitespace-pre-line">
                    {currentQuestion.explanation}
                  </p>

                  {currentQuestion.translation && (
                    <div className="pt-2 border-t border-[#C8A96B]/30 space-y-1">
                      <span className="font-bold text-[#292929] block">全真法汉对照翻译：</span>
                      <p className="text-stone-600 font-medium italic">
                        {currentQuestion.translation}
                      </p>
                    </div>
                  )}

                  {currentQuestion.vocabList && currentQuestion.vocabList.length > 0 && (
                    <div className="pt-2 border-t border-[#C8A96B]/30 space-y-1.5">
                      <span className="font-bold text-[#292929] block">核心考点词汇闪卡：</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
                        {currentQuestion.vocabList.map((v, i) => (
                          <div key={i} className="p-2 rounded-xl bg-white border border-[#E8DECE] flex items-center justify-between text-[11px]">
                            <span className="font-bold text-[#292929]">{v.word}</span>
                            <span className="text-stone-500">{v.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-12 text-stone-400 text-sm">
              暂无试卷题目
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E8DECE]">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-xl bg-[#F7F3EA] hover:bg-[#EFE8DC] border border-[#E8DECE] disabled:opacity-40 text-[#292929] text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>上一题</span>
            </button>

            <span className="text-xs text-stone-500 font-mono">
              {currentQuestionIndex + 1} / {currentPaper?.questions.length || 0}
            </span>

            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.min((currentPaper?.questions.length || 1) - 1, prev + 1))}
              disabled={currentQuestionIndex === (currentPaper?.questions.length || 1) - 1}
              className="px-4 py-2 rounded-xl bg-[#F7F3EA] hover:bg-[#EFE8DC] border border-[#E8DECE] disabled:opacity-40 text-[#292929] text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <span>下一题</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Right 4 Cols: Answer Sheet & Score Result */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Answer Card */}
          <div className="bg-[#FCFAF6] rounded-3xl p-5 border border-[#E8DECE] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DECE]">
              <h4 className="text-sm font-black text-[#292929] flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#8C3B4A]" />
                <span>考场答题卡</span>
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 font-mono">
                  已答 {Object.keys(answers).length} / {currentPaper?.questions.length || 0}
                </span>
                {Object.keys(answers).length > 0 && !isSubmitted && (
                  <button
                    onClick={handleResetExam}
                    className="text-[11px] text-stone-500 hover:text-[#8C3B4A] transition flex items-center gap-0.5 cursor-pointer font-bold px-1.5 py-0.5 rounded bg-[#F7F3EA] hover:bg-rose-50 border border-[#E8DECE]"
                    title="清空当前试卷已选答案"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>清空作答</span>
                  </button>
                )}
              </div>
            </div>

            {/* Answer Bubbles Grid */}
            <div className="grid grid-cols-5 gap-2">
              {currentPaper?.questions.map((q, idx) => {
                const isAnswered = answers[idx] !== undefined;
                const isCurrent = currentQuestionIndex === idx;
                const isCorrect = answers[idx] === q.correctAnswer;

                let bubbleStyle = 'bg-[#F7F3EA] text-[#292929] hover:bg-[#EFE8DC] border border-[#E8DECE]';
                if (isCurrent) {
                  bubbleStyle = 'ring-2 ring-[#8C3B4A] font-bold bg-[#FCFAF6] border-[#E8DECE]';
                }
                if (isSubmitted) {
                  bubbleStyle = isCorrect ? 'bg-emerald-500 text-white font-bold' : 'bg-rose-500 text-white font-bold';
                } else if (isAnswered) {
                  bubbleStyle = 'bg-[#8C3B4A] text-white font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-9 rounded-xl text-xs flex items-center justify-center transition cursor-pointer ${bubbleStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Instant Mode Toggle */}
            <div className="pt-2 border-t border-[#E8DECE] flex items-center justify-between text-xs text-[#292929]">
              <span>做完即时显示解析</span>
              <button
                onClick={() => setShowInstantExplanation(prev => !prev)}
                className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                  showInstantExplanation
                    ? 'bg-[#8C3B4A]'
                    : 'bg-stone-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  showInstantExplanation ? 'left-5' : 'left-1'
                }`} />
              </button>
            </div>

            {/* Submit Button */}
            {!isSubmitted ? (
              <button
                onClick={handleSubmitPaper}
                className="w-full py-3 rounded-2xl bg-[#8C3B4A] hover:bg-[#752E3C] shadow-[#8C3B4A]/25 text-white font-black text-sm shadow-md active:scale-98 transition cursor-pointer"
              >
                提交答卷 · 生成成绩单
              </button>
            ) : (
              <button
                onClick={handleResetExam}
                className="w-full py-2.5 rounded-2xl bg-[#F7F3EA] hover:bg-[#EFE8DC] text-[#292929] font-bold text-xs border border-[#E8DECE] transition cursor-pointer"
              >
                再考一次
              </button>
            )}
          </div>

          {/* Score Card when submitted */}
          {scoreReport && (
            <div className={`rounded-3xl p-5 border shadow-sm space-y-4 ${
              scoreReport.verdictType === 'pass'
                ? 'bg-[#FAF5EB] border-[#C8A96B]'
                : scoreReport.verdictType === 'section_fail'
                ? 'bg-[#8C3B4A]/10 border-[#8C3B4A]/50'
                : 'bg-[#F7F3EA] border-[#8C3B4A]/30'
            }`}>
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#292929] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#C8A96B]" />
                  <span>{currentPaper.track === 'kaoyan' ? '考研二外成绩单' : 'DELF 欧标成绩单'}</span>
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  scoreReport.verdictType === 'pass'
                    ? 'bg-[#C8A96B] text-[#292929] font-black'
                    : scoreReport.verdictType === 'section_fail'
                    ? 'bg-[#8C3B4A] text-white font-black'
                    : 'bg-rose-700 text-white font-black'
                }`}>
                  {scoreReport.verdictType === 'pass'
                    ? '🎉 官方判定：合格 (Pass)'
                    : scoreReport.verdictType === 'section_fail'
                    ? '⚠️ 触发单科淘汰线'
                    : '❌ 官方判定：未合格'}
                </span>
              </div>

              {/* Total Score */}
              <div className="text-center py-2 space-y-1 bg-white/90 rounded-2xl p-3 border border-[#E8DECE]">
                <p className="text-4xl font-black text-[#8C3B4A]">
                  {scoreReport.scaledScore} <span className="text-sm font-normal text-stone-500">/ 100 分</span>
                </p>
                <p className="text-xs text-stone-600 font-medium">
                  答对 {scoreReport.correctCount} / {scoreReport.totalQuestions} 题 · 本试卷及格线为 <strong className="text-[#8C3B4A]">{scoreReport.passThreshold} 分</strong>
                </p>
              </div>

              {/* Section Breakdown */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-black text-slate-700 flex items-center justify-between">
                  <span>官方各大核心单项得分</span>
                  <span className="text-[10px] text-slate-500">
                    {currentPaper.track === 'kaoyan' ? '及格基准: ≥60%' : '单科淘汰基准: ≥20% (5/25分)'}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {scoreReport.vocab.count > 0 && (
                    <div className="p-2.5 rounded-xl bg-white/90 border border-[#E8DECE] flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">📝</span>
                        <div>
                          <div className="font-bold text-slate-800 text-[11px]">语法与词汇结构</div>
                          <div className="text-[10px] text-slate-400 font-mono">答对 {scoreReport.vocab.correct}/{scoreReport.vocab.count} 题</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-slate-900 text-sm">{scoreReport.vocab.score}%</span>
                        <div className={`text-[10px] font-bold ${scoreReport.vocab.score >= (currentPaper.track === 'kaoyan' ? 60 : 20) ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {scoreReport.vocab.score >= (currentPaper.track === 'kaoyan' ? 60 : 20) ? '✓ 达标' : '✗ 未达标'}
                        </div>
                      </div>
                    </div>
                  )}

                  {scoreReport.reading.count > 0 && (
                    <div className="p-2.5 rounded-xl bg-white/90 border border-[#E8DECE] flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">📖</span>
                        <div>
                          <div className="font-bold text-slate-800 text-[11px]">读解分析 (Compréhension écrite)</div>
                          <div className="text-[10px] text-slate-400 font-mono">答对 {scoreReport.reading.correct}/{scoreReport.reading.count} 题</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-slate-900 text-sm">{scoreReport.reading.score}%</span>
                        <div className={`text-[10px] font-bold ${scoreReport.reading.score >= (currentPaper.track === 'kaoyan' ? 60 : 20) ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {scoreReport.reading.score >= (currentPaper.track === 'kaoyan' ? 60 : 20) ? '✓ 达标' : '✗ 未达标'}
                        </div>
                      </div>
                    </div>
                  )}

                  {scoreReport.listening.count > 0 && (
                    <div className="p-2.5 rounded-xl bg-white/90 border border-[#E8DECE] flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">🎧</span>
                        <div>
                          <div className="font-bold text-slate-800 text-[11px]">听解原声 (Compréhension orale)</div>
                          <div className="text-[10px] text-slate-400 font-mono">答对 {scoreReport.listening.correct}/{scoreReport.listening.count} 题</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-slate-900 text-sm">{scoreReport.listening.score}%</span>
                        <div className={`text-[10px] font-bold ${scoreReport.listening.score >= (currentPaper.track === 'kaoyan' ? 60 : 20) ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {scoreReport.listening.score >= (currentPaper.track === 'kaoyan' ? 60 : 20) ? '✓ 达标' : '✗ 未达标'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Diagnostic Alert */}
              <div className="pt-2 border-t border-[#E8DECE] text-xs">
                {scoreReport.verdictType === 'pass' ? (
                  <p className="text-emerald-800 font-medium leading-relaxed">
                    🌟 <strong>恭喜合格！</strong>您的总分与各单项均已达到法国官方合格标准，具备冲击更高难度的扎实基础！
                  </p>
                ) : (
                  <p className={`${scoreReport.verdictType === 'section_fail' ? 'text-[#8C3B4A]' : 'text-rose-800'} font-medium leading-relaxed`}>
                    📌 <strong>官方诊断：</strong>{scoreReport.failReason}
                  </p>
                )}
                <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed bg-white/70 p-2 rounded-lg border border-[#E8DECE]">
                  💡 <strong>错题智能收录提示：</strong>本次模考答错的题目已自动收录进顶部导航栏「错题本」，可随时开启针对性专攻消灭！
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

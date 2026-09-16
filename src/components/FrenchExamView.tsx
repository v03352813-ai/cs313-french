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
  initialTrack?: ExamTrack;
  onTrackChange?: (track: ExamTrack) => void;
}

export const FrenchExamView: React.FC<FrenchExamViewProps> = ({
  isVip,
  onOpenVipModal,
  onSaveMistake,
  initialTrack = 'kaoyan',
  onTrackChange
}) => {
  const [activeTrack, setActiveTrack] = useState<ExamTrack>(initialTrack);

  // Sync with initialTrack when changed from navigation
  useEffect(() => {
    if (initialTrack && initialTrack !== activeTrack) {
      setActiveTrack(initialTrack);
      if (initialTrack === 'cft4') {
        setSelectedPaperId('paper_cft4_201');
      } else if (initialTrack === 'delf') {
        setSelectedPaperId('paper_delf_301');
      } else if (initialTrack === 'drill') {
        setSelectedPaperId('paper_drill_401');
      } else {
        setSelectedPaperId('paper_kaoyan_101');
      }
      setCurrentQuestionIndex(0);
      setAnswers({});
      setIsSubmitted(false);
    }
  }, [initialTrack]);

  const [selectedPaperId, setSelectedPaperId] = useState<string>(() => {
    if (initialTrack === 'cft4') return 'paper_cft4_201';
    if (initialTrack === 'delf') return 'paper_delf_301';
    if (initialTrack === 'drill') return 'paper_drill_401';
    return 'paper_kaoyan_101';
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [kaoyanFilter, setKaoyanFilter] = useState<string>('all');
  const [cft4Filter, setCft4Filter] = useState<string>('all');
  const [delfFilter, setDelfFilter] = useState<string>('all');
  const [drillFilter, setDrillFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showInstantExplanation, setShowInstantExplanation] = useState<boolean>(true);
  const [showOfficialGuide, setShowOfficialGuide] = useState<boolean>(false);
  
  // Audio player state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [showListeningScript, setShowListeningScript] = useState<boolean>(false);

  // Countdown timer state
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3600);

  // 动态计算各赛道与各高校历年真题套数 (避免写死数量，实时反应真实试卷库体量)
  const paperCounts = useMemo(() => {
    const kaoyan = FRENCH_EXAM_PAPERS.filter(p => p.track === 'kaoyan');
    const cft4 = FRENCH_EXAM_PAPERS.filter(p => p.track === 'cft4');
    const delf = FRENCH_EXAM_PAPERS.filter(p => p.track === 'delf');
    const drill = FRENCH_EXAM_PAPERS.filter(p => p.track === 'drill');

    return {
      kaoyan: {
        all: kaoyan.length,
        tongkao: kaoyan.filter(p => p.schoolOrOrg.includes('统考') || p.schoolOrOrg.includes('联考') || p.schoolOrOrg.includes('综合')).length,
        beiwai: kaoyan.filter(p => p.schoolOrOrg.includes('北京外国语大学')).length,
        shisu: kaoyan.filter(p => p.schoolOrOrg.includes('上海外国语大学')).length,
        gdufs: kaoyan.filter(p => p.schoolOrOrg.includes('广东外语外贸大学')).length,
        others: kaoyan.filter(p =>
          p.schoolOrOrg.includes('北京大学') ||
          p.schoolOrOrg.includes('清华大学') ||
          p.schoolOrOrg.includes('浙江大学') ||
          p.schoolOrOrg.includes('南京大学') ||
          p.schoolOrOrg.includes('武汉大学') ||
          p.schoolOrOrg.includes('复旦') ||
          p.schoolOrOrg.includes('中山大学') ||
          p.schoolOrOrg.includes('四川外国语大学')
        ).length,
      },
      cft4: {
        all: cft4.length,
        full_mock: cft4.filter(p => p.title.includes('全真') || p.title.includes('模拟') || p.title.includes('大卷')).length,
        grammar: cft4.filter(p => p.title.includes('语法') || p.title.includes('词汇')).length,
        cloze_reading: cft4.filter(p => p.title.includes('完形') || p.title.includes('读解')).length,
      },
      delf: {
        all: delf.length,
        A1: delf.filter(p => p.level.includes('A1')).length,
        A2: delf.filter(p => p.level.includes('A2')).length,
        B1: delf.filter(p => p.level.includes('B1')).length,
        B2: delf.filter(p => p.level.includes('B2')).length,
        C1: delf.filter(p => p.level.includes('C1')).length,
      },
      drill: {
        all: drill.length,
        pronoun: drill.filter(p => p.title.includes('代词')).length,
        tense: drill.filter(p => p.title.includes('时态') || p.title.includes('过去') || p.title.includes('将来') || p.title.includes('虚拟式')).length,
        cloze: drill.filter(p => p.title.includes('完形') || p.title.includes('介词')).length,
        reading: drill.filter(p => p.title.includes('阅读')).length,
      }
    };
  }, []);

  // Filter papers based on active track, sub-filters, and search
  const filteredPapers = useMemo(() => {
    return FRENCH_EXAM_PAPERS.filter(p => {
      if (p.track !== activeTrack) return false;

      if (activeTrack === 'kaoyan' && kaoyanFilter !== 'all') {
        if (kaoyanFilter === 'beiwai' && !p.schoolOrOrg.includes('北京外国语大学')) return false;
        if (kaoyanFilter === 'shisu' && !p.schoolOrOrg.includes('上海外国语大学')) return false;
        if (kaoyanFilter === 'gdufs' && !p.schoolOrOrg.includes('广东外语外贸大学')) return false;
        if (kaoyanFilter === 'others' && !(
          p.schoolOrOrg.includes('北京大学') ||
          p.schoolOrOrg.includes('清华大学') ||
          p.schoolOrOrg.includes('浙江大学') ||
          p.schoolOrOrg.includes('南京大学') ||
          p.schoolOrOrg.includes('武汉大学') ||
          p.schoolOrOrg.includes('复旦') ||
          p.schoolOrOrg.includes('中山大学') ||
          p.schoolOrOrg.includes('四川外国语大学')
        )) return false;
        if (kaoyanFilter === 'tongkao' && !(p.schoolOrOrg.includes('统考') || p.schoolOrOrg.includes('联考') || p.schoolOrOrg.includes('综合'))) return false;
      }

      if (activeTrack === 'cft4' && cft4Filter !== 'all') {
        if (cft4Filter === 'full_mock' && !p.title.includes('全真') && !p.title.includes('模拟') && !p.title.includes('大卷')) return false;
        if (cft4Filter === 'grammar' && !p.title.includes('语法') && !p.title.includes('词汇')) return false;
        if (cft4Filter === 'cloze_reading' && !p.title.includes('完形') && !p.title.includes('读解')) return false;
      }

      if (activeTrack === 'delf' && delfFilter !== 'all') {
        if (!p.level.includes(delfFilter)) return false;
      }

      if (activeTrack === 'drill' && drillFilter !== 'all') {
        if (drillFilter === 'pronoun' && !p.title.includes('代词')) return false;
        if (drillFilter === 'tense' && !p.title.includes('时态') && !p.title.includes('过去') && !p.title.includes('将来') && !p.title.includes('虚拟式')) return false;
        if (drillFilter === 'cloze' && !p.title.includes('完形') && !p.title.includes('介词')) return false;
        if (drillFilter === 'reading' && !p.title.includes('阅读')) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.frenchTitle.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q);
      }

      return true;
    });
  }, [activeTrack, kaoyanFilter, cft4Filter, delfFilter, drillFilter, searchQuery]);

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
      const isReading = q.questionType === '读解分析' || q.questionType === '图表告示' || q.categoryTag.includes('读解') || q.categoryTag.includes('阅读') || q.categoryTag.includes('告示');
      const isListening = q.questionType === '听解原声' || q.categoryTag.includes('听力') || q.categoryTag.includes('广播') || q.audioScript;

      if (isReading) {
        if (readingStart === -1) readingStart = idx;
        readingCount++;
      } else if (isListening) {
        if (listeningStart === -1) listeningStart = idx;
        listeningCount++;
      } else {
        if (vocabStart === -1) vocabStart = idx;
        vocabCount++;
      }
    });

    const curQ = currentPaper.questions[currentQuestionIndex];
    const curIsReading = curQ && (curQ.questionType === '读解分析' || curQ.questionType === '图表告示' || curQ.categoryTag.includes('读解') || curQ.categoryTag.includes('阅读') || curQ.categoryTag.includes('告示'));
    const curIsListening = curQ && (curQ.questionType === '听解原声' || curQ.categoryTag.includes('听力') || curQ.categoryTag.includes('广播') || curQ.audioScript);
    const curIsVocab = curQ && !curIsReading && !curIsListening;

    const list: { key: string; name: string; icon: string; startIndex: number; count: number; isActive: boolean }[] = [];

    if (vocabCount > 0) {
      list.push({
        key: 'vocab',
        name: '词汇与文法结构',
        icon: '📝',
        startIndex: vocabStart,
        count: vocabCount,
        isActive: Boolean(curIsVocab)
      });
    }
    if (readingCount > 0) {
      list.push({
        key: 'reading',
        name: '实用告示与长篇读解',
        icon: '📖',
        startIndex: readingStart,
        count: readingCount,
        isActive: Boolean(curIsReading)
      });
    }
    if (listeningCount > 0) {
      list.push({
        key: 'listening',
        name: '听解原声与交际辨析',
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

      const isReading = q.questionType === '读解分析' || q.questionType === '图表告示' || q.categoryTag.includes('读解') || q.categoryTag.includes('阅读') || q.categoryTag.includes('告示');
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
    const isDelf = currentPaper.track === 'delf';
    const passThreshold = isDelf ? 50 : 60; // 考研二外与四级合格线60分，DELF及格线50/100
    
    // DELF 单科否决制：DELF 官方单科淘汰线为 5/25 分 (得分率 20%)
    const isDelfEliminated = isDelf && (
      (listeningCount > 0 && scaledListening < 20) ||
      (readingCount > 0 && scaledReading < 20) ||
      (vocabCount > 0 && scaledVocab < 20)
    );

    const isTotalScorePass = scaledScore >= passThreshold;
    const isPassed = isDelf ? (isTotalScorePass && !isDelfEliminated) : isTotalScorePass;

    let verdictType: 'pass' | 'section_fail' | 'total_fail' = 'total_fail';
    let failReason = '';

    if (isPassed) {
      verdictType = 'pass';
    } else if (isDelf && isTotalScorePass && isDelfEliminated) {
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
            userAnswer: uAns ?? -1,
            date: new Date().toLocaleDateString('zh-CN')
          });
        }
      });
    }

    // Trigger celebration confetti on pass
    if (scoreReport && scoreReport.isPassed) {
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

  const handleResetExam = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
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

  const handleSelectPaper = (paper: ExamPaper) => {
    const isFree = paper.isFreePreview;
    const isLocked = !isVip && !isFree;

    if (isLocked) {
      onOpenVipModal(`🔒《${paper.title}》为 VIP 专属高频考卷！升级 VIP 终身卡（仅 ¥49.9），即可解锁全部 36 套考研二外名校大卷、大学法语四级与 DELF 官方机考大卷及名师题解！`);
      return;
    }

    setSelectedPaperId(paper.id);
    handleResetExam();
  };

  return (
    <div className="space-y-3 sm:space-y-3.5 pb-0">
      
      {/* Top Hero Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FCECEF] text-[#80142A] border border-[#80142A]/20 text-xs font-bold">
              🏛️ 法国国家级与国际官方全真机考大卷库
            </span>
            <span className="text-xs text-stone-500 font-medium">
              126套全国名校历年全卷 · 3,024道官方全真试题 · 100分标准实测评分 · 词汇语法 / 动词变位 / 完形填空 / 实用告示 / 原声听解 / 社科长篇读解
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#29354A] tracking-tight">
            法语国家统考与国际认证全真机考大卷库
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            涵盖全国名校考研二外 (北京外国语大学/上海外国语大学/广东外语外贸大学/北大/清华/南大/武大/复旦/中大/浙大/川外等历年真题)、大学法语四级 (CFT-4)、DELF/DALF 欧标 (A1~C1) 与四大考点专项突破卷！
          </p>
        </div>
      </div>

      {/* 📌 四大赛道官方考纲权威说明横幅 (可折叠，默认收起节省首屏高) */}
      <div className="rounded-2xl bg-gradient-to-r from-[#FCECEF]/40 via-slate-50 to-white border border-slate-200/80 overflow-hidden text-xs">
        <div
          onClick={() => setShowOfficialGuide(!showOfficialGuide)}
          className="p-3.5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50/60 transition"
        >
          <div className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 animate-pulse ${
              activeTrack === 'kaoyan' ? 'bg-[#80142A]' : activeTrack === 'cft4' ? 'bg-indigo-600' : activeTrack === 'delf' ? 'bg-[#DDBF78]' : 'bg-slate-700'
            }`} />
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-black ${
                activeTrack === 'kaoyan' ? 'text-[#80142A]' : activeTrack === 'cft4' ? 'text-indigo-800' : activeTrack === 'delf' ? 'text-amber-800' : 'text-slate-800'
              }`}>
                {activeTrack === 'kaoyan' ? `🎓 全国硕士考研二外法语·历年名校大卷 (${paperCounts.kaoyan.all}套)` 
                  : activeTrack === 'cft4' ? `🏛️ 大学法语四级 (CFT-4) 全国统考历年真题 (${paperCounts.cft4.all}套)`
                  : activeTrack === 'delf' ? `🌍 DELF-DALF 欧标国际认证 (A1-C1) 官方考卷 (${paperCounts.delf.all}套)`
                  : `⚡ 考研二外 & DELF 四大重点考点专项攻坚 (${paperCounts.drill.all}套)`}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white text-[#29354A] border border-slate-200">
                {activeTrack === 'kaoyan' ? '自主命题 · 100分' 
                  : activeTrack === 'cft4' ? '全国统考 · 100分' 
                  : activeTrack === 'delf' ? '官方标准 · 淘汰制' 
                  : '分类靶向攻坚'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold shrink-0">
            <span>{showOfficialGuide ? '收起考纲' : '查看考纲'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showOfficialGuide ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {showOfficialGuide && (
          <div className="px-4 pb-3.5 pt-1 text-stone-600 leading-relaxed font-medium border-t border-slate-200/60 bg-white/60">
            {activeTrack === 'kaoyan' && (
              <p>全面收录北京外国语大学、上海外国语大学、广东外语外贸大学、北京大学、清华大学、南京大学、武汉大学、复旦大学、中山大学、浙江大学、四川外国语大学等历年统考真题编年卷，重点考察 <strong>【时态配合·代词语序·虚拟式触发】</strong> 与 <strong>【社科长文逻辑推理】</strong>，满分 100 分。</p>
            )}
            {activeTrack === 'cft4' && (
              <p>大学法语四级为全国高校公外二外最权威统一测试，全面考核 <strong>【听力理解·语法结构·完形填空·长篇读解】</strong>，精准检验 A2-B1 语言综合运用能力。</p>
            )}
            {activeTrack === 'delf' && (
              <p>法国教育部 FEI 统一终身认证，覆盖 A1-B2 与 DALF C1 高阶学术认证，包含 <strong>【Compréhension orale 原声听解】</strong> 与 <strong>【Compréhension écrite 读解分析】</strong>，总分 100 分，及格线 50 分，且单项不得低于 <strong>5/25分（单科淘汰线）</strong>！</p>
            )}
            {activeTrack === 'drill' && (
              <p>汇集中国二外考生失分率最高的四大专题：<strong>【代词系统与语序】</strong>、<strong>【时态配合与虚拟式】</strong>、<strong>【完形填空与介词】</strong>、<strong>【社科长篇阅读】</strong>，逐个击破！</p>
            )}
          </div>
        )}
      </div>

      {/* Track Switcher & Filter Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-4">
        
        {/* Track Switcher Tabs (四大权威赛道) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/70">
          <button
            onClick={() => {
              setActiveTrack('kaoyan');
              setKaoyanFilter('all');
              setSelectedPaperId('paper_kaoyan_beiwai_2024');
              handleResetExam();
              onTrackChange?.('kaoyan');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTrack === 'kaoyan'
                ? 'bg-[#80142A] text-white shadow-xs font-black'
                : 'text-[#29354A] hover:bg-white/60'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>🎓 考研二外 ({paperCounts.kaoyan.all}套)</span>
          </button>

          <button
            onClick={() => {
              setActiveTrack('cft4');
              setCft4Filter('all');
              setSelectedPaperId('paper_cft4_201');
              handleResetExam();
              onTrackChange?.('cft4');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTrack === 'cft4'
                ? 'bg-[#80142A] text-white shadow-xs font-black'
                : 'text-[#29354A] hover:bg-white/60'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>🏛️ 大学法语四级 ({paperCounts.cft4.all}套)</span>
          </button>

          <button
            onClick={() => {
              setActiveTrack('delf');
              setDelfFilter('all');
              setSelectedPaperId('paper_delf_301');
              handleResetExam();
              onTrackChange?.('delf');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTrack === 'delf'
                ? 'bg-[#DDBF78] text-[#29354A] shadow-xs font-black'
                : 'text-[#29354A] hover:bg-white/60'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>🌍 DELF 欧标 ({paperCounts.delf.all}套)</span>
          </button>

          <button
            onClick={() => {
              setActiveTrack('drill');
              setDrillFilter('all');
              setSelectedPaperId('paper_drill_401');
              handleResetExam();
              onTrackChange?.('drill');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTrack === 'drill'
                ? 'bg-slate-800 text-white shadow-xs font-black'
                : 'text-[#29354A] hover:bg-white/60'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>⚡ 专项攻坚突破 ({paperCounts.drill.all}套)</span>
          </button>
        </div>

        {/* Sub-Filters: 高校 / 级别 / 专题分类 */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#29354A] shrink-0">
            <span className={`w-1.5 h-3.5 rounded-full ${
              activeTrack === 'kaoyan' ? 'bg-[#80142A]' : activeTrack === 'cft4' ? 'bg-indigo-600' : activeTrack === 'delf' ? 'bg-[#DDBF78]' : 'bg-slate-700'
            }`} />
            <span>分类筛选:</span>
          </div>

          {activeTrack === 'kaoyan' && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: `全部考研真题 (${paperCounts.kaoyan.all})` },
                { id: 'beiwai', label: `北京外国语大学 (${paperCounts.kaoyan.beiwai})` },
                { id: 'shisu', label: `上海外国语大学 (${paperCounts.kaoyan.shisu})` },
                { id: 'gdufs', label: `广东外语外贸大学 (${paperCounts.kaoyan.gdufs})` },
                { id: 'others', label: `985名校联盟 (${paperCounts.kaoyan.others})` },
                { id: 'tongkao', label: `全国统考综合 (${paperCounts.kaoyan.tongkao})` }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setKaoyanFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    kaoyanFilter === f.id
                      ? 'bg-[#80142A] text-white shadow-2xs font-black'
                      : 'bg-slate-50 text-[#29354A] hover:bg-slate-100 border border-slate-200/70'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}

          {activeTrack === 'cft4' && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: `全部四级大卷 (${paperCounts.cft4.all})` },
                { id: 'full_mock', label: `历年真题与模拟 (${paperCounts.cft4.full_mock})` },
                { id: 'grammar', label: `语法词汇专项 (${paperCounts.cft4.grammar})` },
                { id: 'cloze_reading', label: `完形读解强化 (${paperCounts.cft4.cloze_reading})` }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setCft4Filter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    cft4Filter === f.id
                      ? 'bg-[#80142A] text-white shadow-2xs font-black'
                      : 'bg-slate-50 text-[#29354A] hover:bg-slate-100 border border-slate-200/70'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}

          {activeTrack === 'delf' && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: `全部欧标考卷 (${paperCounts.delf.all})` },
                { id: 'A1', label: `DELF A1 入门级 (${paperCounts.delf.A1})` },
                { id: 'A2', label: `DELF A2 进阶级 (${paperCounts.delf.A2})` },
                { id: 'B1', label: `DELF B1 独立级 (${paperCounts.delf.B1})` },
                { id: 'B2', label: `DELF B2 高阶级 (${paperCounts.delf.B2})` },
                { id: 'C1', label: `DALF C1 精英级 (${paperCounts.delf.C1})` }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setDelfFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    delfFilter === f.id
                      ? 'bg-[#DDBF78] text-[#29354A] shadow-2xs font-black'
                      : 'bg-slate-50 text-[#29354A] hover:bg-slate-100 border border-slate-200/70'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}

          {activeTrack === 'drill' && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: `全部专项大卷 (${paperCounts.drill.all})` },
                { id: 'pronoun', label: `代词系统与语序 (${paperCounts.drill.pronoun})` },
                { id: 'tense', label: `时态配合与虚拟式 (${paperCounts.drill.tense})` },
                { id: 'cloze', label: `完形填空与介词 (${paperCounts.drill.cloze})` },
                { id: 'reading', label: `社科长篇深度阅读 (${paperCounts.drill.reading})` }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setDrillFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    drillFilter === f.id
                      ? 'bg-slate-800 text-white shadow-2xs font-black'
                      : 'bg-slate-50 text-[#29354A] hover:bg-slate-100 border border-slate-200/70'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Paper Selector: Visual Scrollable Cards */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
            <span className="flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-[#80142A]" />
              <span>当前可作答试卷 ({filteredPapers.length} 套):</span>
            </span>
            <span className="text-[11px] text-stone-400">点击卡片直接进入考场</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[220px] overflow-y-auto scrollbar-thin p-1">
            {filteredPapers.map((paper, idx) => {
              const isSelected = selectedPaperId === paper.id;
              const isFree = paper.isFreePreview;
              const isLocked = !isVip && !isFree;

              return (
                <button
                  key={paper.id}
                  onClick={() => handleSelectPaper(paper)}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#FCECEF] border-2 border-[#80142A] shadow-xs'
                      : isLocked
                      ? 'bg-slate-50/70 hover:bg-slate-100/90 border-slate-200/70'
                      : 'bg-white hover:bg-slate-50 border-slate-200/80'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        isFree 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : isVip 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {isFree ? '✓ 免费试考' : isVip ? '★ VIP专享' : '🔒 VIP专属'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium truncate">
                        {paper.schoolOrOrg}
                      </span>
                    </div>

                    <h4 className={`text-xs font-black line-clamp-1 ${isSelected ? 'text-[#80142A]' : 'text-[#29354A]'}`}>
                      {paper.title}
                    </h4>
                  </div>

                  <div className="pt-2 mt-1 border-t border-slate-200/50 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{paper.questions.length} 题 · 满分 {paper.totalScore}分</span>
                    <span>{paper.durationMinutes} 分钟</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Main Exam Arena: Left Question Area + Right Answer Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left 8 Cols: Question Display */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 sm:space-y-5">
          
          {currentQuestion ? (
            <div className="space-y-5">
              
              {/* 三大板块快速直达 (语法词汇 / 读解长文 / 听解原声) */}
              {sectionTabs.length > 1 && (
                <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/70 overflow-x-auto no-scrollbar">
                  <span className="text-[11px] font-bold text-stone-500 pl-2 shrink-0">题型直达:</span>
                  {sectionTabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setCurrentQuestionIndex(tab.startIndex)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                        tab.isActive
                          ? 'bg-[#80142A] text-white shadow-xs font-black'
                          : 'bg-white text-[#29354A] hover:bg-slate-50 border border-slate-200/80'
                      }`}
                      title={`直接跳转到【${tab.name}】`}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${tab.isActive ? 'bg-white/25 text-white font-black' : 'bg-slate-50 text-slate-600'}`}>
                        {tab.count}题
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Question Header */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-xl text-white font-mono text-xs font-black bg-[#80142A]">
                    第 {currentQuestionIndex + 1} 题
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-50 text-[#29354A] border border-slate-200/70 text-xs font-bold">
                    {currentQuestion.categoryTag}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    分值: {currentQuestion.score} 分
                  </span>
                </div>

                <button
                  onClick={() => speakFrench(currentQuestion.contextText || currentQuestion.question)}
                  className="p-1.5 rounded-lg bg-[#FCECEF] text-[#80142A] hover:bg-[#FCECEF]/70 transition cursor-pointer"
                  title="朗读题目"
                >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Reading Passage if any */}
            {currentQuestion.contextText && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/70 space-y-2.5 select-text shadow-2xs relative">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                  <span className="text-xs font-black text-[#29354A] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#DDBF78]" />
                    <span>【读解分析 · 官方全真法文阅读文本材料】</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#80142A] border border-[#DDBF78]/40 shadow-2xs">
                    法文原汁原味阅读材料
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-[#29354A] leading-relaxed font-medium whitespace-pre-line font-serif">
                  {currentQuestion.contextText}
                </div>
              </div>
            )}

            {/* Listening Audio Player if any */}
            {(currentQuestion.audioScript || currentQuestion.questionType === '听解原声') && (
              <div className="p-4 rounded-2xl bg-slate-50/60 border border-[#80142A]/30 shadow-2xs space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => currentQuestion.audioScript && handlePlayAudio(currentQuestion.audioScript)}
                      className="w-10 h-10 rounded-full bg-[#80142A] hover:bg-[#680E20] text-white flex items-center justify-center shadow-md shadow-[#80142A]/25 transition cursor-pointer shrink-0"
                      title={isPlayingAudio ? '暂停听力' : '播放原声听力'}
                    >
                      {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                    <div>
                      <div className="text-xs font-bold text-[#80142A] flex items-center gap-1.5">
                        <Headphones className="w-3.5 h-3.5 text-[#80142A]" />
                        <span>考场原声听力播放器 (Compréhension orale)</span>
                      </div>
                      <p className="text-[11px] text-stone-600">
                        {isPlayingAudio ? '正在播放法国官方录音...' : '点击播放法国原声场景材料'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-stone-600 bg-white px-2 py-1 rounded-xl border border-slate-200/70">
                      <span>语速:</span>
                      {[0.8, 1.0, 1.2].map(speed => (
                        <button
                          key={speed}
                          onClick={() => setAudioSpeed(speed)}
                          className={`px-1.5 py-0.5 rounded text-[10px] ${
                            audioSpeed === speed ? 'bg-[#80142A] text-white font-bold' : 'hover:bg-white'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setShowListeningScript(prev => !prev)}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-white text-[#80142A] border border-[#80142A]/30 hover:bg-[#FCECEF]/40 transition cursor-pointer"
                    >
                      {showListeningScript ? '隐藏原文' : '查看原文大纲'}
                    </button>
                  </div>
                </div>

                {/* Collapsible Listening Script */}
                {showListeningScript && currentQuestion.audioScript && (
                  <div className="pt-2 border-t border-[#80142A]/20 text-xs font-serif italic text-[#29354A] leading-relaxed bg-white p-3 rounded-xl border border-slate-200/70">
                    <div className="font-bold text-[#29354A] text-[11px] not-italic pb-1">
                      【听力原声材料大纲】：
                    </div>
                    {currentQuestion.audioScript}
                  </div>
                )}
              </div>
            )}

            {/* Question Title */}
            <h3 className="text-sm sm:text-base font-bold text-[#29354A] whitespace-pre-line leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, optIdx) => {
                const isSelected = answers[currentQuestionIndex] === optIdx;
                const isCorrect = currentQuestion.correctAnswer === optIdx;
                const userAnswered = answers[currentQuestionIndex] !== undefined;
                // 只对【用户实际作答过的题目】才展示对错反馈，未作答题目即使交卷也不显示正确答案
                const showResult = userAnswered && (isSubmitted || showInstantExplanation);

                let optStyle = 'bg-slate-50/70 hover:bg-white text-[#29354A] border-slate-200/80';
                if (isSelected) {
                  optStyle = 'bg-[#FCECEF] border-[#80142A] text-[#80142A] shadow-2xs font-bold';
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
                          ? 'bg-[#80142A] text-white'
                          : 'bg-white border border-slate-200/80 text-[#29354A]'
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

              {/* Instant Explanation Card — 只对已作答题目显示，不泄露未做题目的答案 */}
              {answers[currentQuestionIndex] !== undefined && (isSubmitted || showInstantExplanation) && (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3 text-xs">
                  <div className="flex items-center gap-1.5 text-[#80142A] font-black">
                    <Sparkles className="w-4 h-4 text-[#DDBF78]" />
                    <span>考点权威名师解析</span>
                  </div>
                  <p className="text-[#29354A] leading-relaxed font-medium whitespace-pre-line">
                    {currentQuestion.explanation}
                  </p>

                  {currentQuestion.translation && (
                    <div className="pt-2 border-t border-slate-200/70 space-y-1">
                      <span className="font-bold text-[#29354A] block">全真法汉对照翻译：</span>
                      <p className="text-[#29354A]/80 font-medium italic">
                        {currentQuestion.translation}
                      </p>
                    </div>
                  )}

                  {currentQuestion.vocabList && currentQuestion.vocabList.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/70 space-y-1.5">
                      <span className="font-bold text-[#29354A] block">核心考点词汇闪卡：</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
                        {currentQuestion.vocabList.map((v, i) => (
                          <div key={i} className="p-2 rounded-xl bg-white border border-slate-200/70 flex items-center justify-between text-[11px]">
                            <span className="font-bold text-[#29354A]">{v.word}</span>
                            <span className="text-stone-500">{v.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200/80">
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 disabled:opacity-40 text-[#29354A] text-xs font-bold transition flex items-center gap-1 cursor-pointer"
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
                className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 disabled:opacity-40 text-[#29354A] text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <span>下一题</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : (
          <div className="text-center py-12 text-stone-400 text-sm">
            暂无试卷题目
          </div>
        )}

      </div>

      {/* Right 4 Cols: Answer Sheet & Score Result */}
      <div className="lg:col-span-4 space-y-4">
        
        {/* Answer Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
            <h4 className="text-sm font-black text-[#29354A] flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#80142A]" />
              <span>考场答题卡</span>
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400 font-mono">
                已答 {Object.keys(answers).length} / {currentPaper?.questions.length || 0}
              </span>
              {Object.keys(answers).length > 0 && !isSubmitted && (
                <button
                  onClick={handleResetExam}
                  className="text-[11px] text-stone-500 hover:text-[#80142A] transition flex items-center gap-0.5 cursor-pointer font-bold px-1.5 py-0.5 rounded bg-slate-50 hover:bg-rose-50 border border-slate-200/70"
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

              let bubbleStyle = 'bg-slate-50 text-[#29354A] hover:bg-slate-100 border border-slate-200/80';
              if (isCurrent) {
                bubbleStyle = 'ring-2 ring-[#80142A] font-bold bg-white border-slate-200/80';
              }
              if (isSubmitted) {
                bubbleStyle = isCorrect ? 'bg-emerald-500 text-white font-bold' : 'bg-rose-500 text-white font-bold';
              } else if (isAnswered) {
                bubbleStyle = 'bg-[#80142A] text-white font-bold';
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
          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-[#29354A]">
            <span>做完即时显示解析</span>
            <button
              onClick={() => setShowInstantExplanation(prev => !prev)}
              className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                showInstantExplanation
                  ? 'bg-[#80142A]'
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
              className="w-full py-3 rounded-2xl bg-[#80142A] hover:bg-[#680E20] shadow-[#80142A]/25 text-white font-black text-sm shadow-md active:scale-98 transition cursor-pointer"
            >
              提交答卷 · 生成成绩单
            </button>
          ) : (
            <button
              onClick={handleResetExam}
              className="w-full py-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-[#29354A] font-bold text-xs border border-slate-200/80 transition cursor-pointer"
            >
              再考一次
            </button>
          )}
        </div>

        {/* Exam Tips & Scoring Guidelines (填补右侧下方空白，使左右两列高度自然平衡对齐) */}
        {!scoreReport && (
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-[#DDBF78]" />
              <h5 className="text-xs font-black text-[#29354A]">考场作答与评分基准</h5>
            </div>
            <div className="space-y-2 text-[11px] text-stone-600 leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="text-[#80142A] font-bold">1.</span>
                <span>
                  <strong>官方合格线：</strong>
                  {currentPaper?.track === 'delf' 
                    ? 'DELF 欧标总分满 50/100 分合格，且单科成绩必须 ≥ 5/25 分（严禁触发单科淘汰线）。'
                    : '考研二外与大学法语四级总分 100 分，及格基准为 60 分。'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#80142A] font-bold">2.</span>
                <span>
                  <strong>即做即看模式：</strong>上方开关开启后，作答当前题后立即显现名师考点剖析与避坑指引。
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#80142A] font-bold">3.</span>
                <span>
                  <strong>错题自动归集：</strong>答错题目将实时沉淀至顶部「错题本」，考后可开启针对性专攻消灭！
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Score Card when submitted */}
        {scoreReport && (
          <div className={`rounded-3xl p-5 border shadow-sm space-y-4 ${
            scoreReport.verdictType === 'pass'
              ? 'bg-white border-[#DDBF78]'
              : scoreReport.verdictType === 'section_fail'
              ? 'bg-[#FCECEF] border-[#80142A]/50'
              : 'bg-white border-[#80142A]/30'
          }`}>
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#29354A] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#DDBF78]" />
                <span>{currentPaper.track === 'kaoyan' ? '考研二外成绩单' : 'DELF 欧标成绩单'}</span>
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                scoreReport.verdictType === 'pass'
                  ? 'bg-[#DDBF78] text-[#29354A] font-black'
                  : scoreReport.verdictType === 'section_fail'
                  ? 'bg-[#80142A] text-white font-black'
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
            <div className="text-center py-2 space-y-1 bg-white rounded-2xl p-3 border border-slate-200/80">
              <p className="text-4xl font-black text-[#80142A]">
                {scoreReport.scaledScore} <span className="text-sm font-normal text-stone-500">/ 100 分</span>
              </p>
              <p className="text-xs text-stone-600 font-medium">
                答对 {scoreReport.correctCount} / {scoreReport.totalQuestions} 题 · 本试卷及格线为 <strong className="text-[#80142A]">{scoreReport.passThreshold} 分</strong>
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
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/70 flex items-center justify-between">
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
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/70 flex items-center justify-between">
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
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/70 flex items-center justify-between">
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
              <div className="pt-2 border-t border-slate-200/80 text-xs">
                {scoreReport.verdictType === 'pass' ? (
                  <p className="text-emerald-800 font-medium leading-relaxed">
                    🌟 <strong>恭喜合格！</strong>您的总分与各单项均已达到法国官方合格标准，具备冲击更高难度的扎实基础！
                  </p>
                ) : (
                  <p className={`${scoreReport.verdictType === 'section_fail' ? 'text-[#80142A]' : 'text-rose-800'} font-medium leading-relaxed`}>
                    📌 <strong>官方诊断：</strong>{scoreReport.failReason}
                  </p>
                )}
                <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed bg-white/70 p-2 rounded-lg border border-slate-200/70">
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

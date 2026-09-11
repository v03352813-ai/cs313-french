import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  FileCheck2, 
  Layers, 
  BookOpenCheck, 
  Sparkles, 
  Volume2, 
  Calendar, 
  Flame, 
  CheckCircle2, 
  Bell, 
  RefreshCw, 
  Compass, 
  RotateCcw,
  GraduationCap,
  Globe2,
  ArrowRight,
  BookOpen,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ActiveTab } from './Navbar';
import { WallpaperBanner } from './WallpaperBanner';
import { 
  DAILY_QUOTES_POOL, 
  CONTENT_UPDATE_LOGS, 
  getStudyStreak, 
  checkInToday, 
  DailyQuote 
} from '../data/cloudSync';
import { speakFrench } from '../utils/speech';

export type TrackId = 'beginner' | 'cinema' | 'exam';

interface TrackStep {
  stepNum: string;
  stepLabel: string;
  title: string;
  targetBadge: string;
  badgeBg: string;
  desc: string;
  actionText: string;
  targetTab: ActiveTab;
  icon: React.ComponentType<{ className?: string }>;
  buttonBg: string;
}

interface TrackConfig {
  id: TrackId;
  name: string;
  targetAudience: string;
  tag: string;
  icon: string;
  activeBorder: string;
  activeBg: string;
  activeRing: string;
  desc: string;
  steps: TrackStep[];
}

const TRACKS_CONFIG: Record<TrackId, TrackConfig> = {
  beginner: {
    id: 'beginner',
    name: '零基础入门 / 地基巩固',
    targetAudience: '从发音到中级 · 稳扎稳打',
    tag: '系统筑基',
    icon: '🌱',
    activeBorder: 'border-[#A94A62]',
    activeBg: 'bg-[#F3DDE2]/60 border-[#A94A62] text-[#A94A62]',
    activeRing: 'ring-2 ring-[#A94A62]/25 shadow-md',
    desc: '初学者零压力科学路线：攻克 35 国际音标与 4 大连音联诵规则 ➔ 玩转三组动词 7 大时态变位演练器 ➔ 掌握 5,000+ 阴阳性核心词！',
    steps: [
      {
        stepNum: '01',
        stepLabel: '第 1 步 · 夯实语音',
        title: '35 音标体系与 4 大发音/联诵规则',
        targetBadge: '攻克鼻化元音 · 小舌音[ʁ]',
        badgeBg: 'bg-[#F3DDE2] text-[#A94A62] border border-[#A94A62]/20',
        desc: '15 元音（含 4 鼻化音）、3 半元音与 17 辅音，动画透视联诵 (Liaison)、CaReFuL 词尾不发音与省音规则。',
        actionText: '进入音标联诵实验室',
        targetTab: 'phonetics',
        icon: Sparkles,
        buttonBg: 'bg-[#A94A62] hover:bg-[#933C52] text-white shadow-xs'
      },
      {
        stepNum: '02',
        stepLabel: '第 2 步 · 攻破变位',
        title: '动词变位可视化演练器 (Conjugaison)',
        targetBadge: '7大时态 · 词尾高亮推导',
        badgeBg: 'bg-white text-[#29354A] border border-[#DDBF78]/50',
        desc: '第一组(-er)、第二组(-ir)与第三组不规则动词，一键对比直陈式现在时、复合过去时、未完成过去时与虚拟式。',
        actionText: '开启变位演练器',
        targetTab: 'conjugation',
        icon: RotateCcw,
        buttonBg: 'bg-[#DDBF78] hover:bg-[#C9A95C] text-[#29354A] font-black shadow-xs'
      },
      {
        stepNum: '03',
        stepLabel: '第 3 步 · 积累词汇',
        title: '5,000+ 核心高频词闪卡 (性数双标)',
        targetBadge: '♂阳性标 · ♀阴性标',
        badgeBg: 'bg-[#F3DDE2] text-[#A94A62] border border-[#A94A62]/20',
        desc: '彻底解决背词不记阴阳性大忌！严格标定性别与定冠词配合，带艾宾浩斯抗遗忘记忆曲线与真人朗读。',
        actionText: '背诵核心分级词汇',
        targetTab: 'vocab',
        icon: Layers,
        buttonBg: 'bg-[#A94A62] hover:bg-[#933C52] text-white shadow-xs'
      },
      {
        stepNum: '04',
        stepLabel: '第 4 步 · 搭建框架',
        title: '70+ 核心语法全景宝典',
        targetBadge: '直宾COD/间宾COI · 避坑指南',
        badgeBg: 'bg-white text-[#29354A] border border-[#DDBF78]/50',
        desc: '冠词体系、代词语序、副代词 y/en 与复合过去时分词配合，每条语法均附带【考研/考级避坑指南】。',
        actionText: '查阅体系文法宝典',
        targetTab: 'grammar',
        icon: BookOpenCheck,
        buttonBg: 'bg-[#A94A62] hover:bg-[#933C52] text-white shadow-xs'
      }
    ]
  },
  cinema: {
    id: 'cinema',
    name: '兴趣日常 / 影视原声',
    targetAudience: '追剧看电影 · 突破哑巴法语',
    tag: '沉浸开口',
    icon: '🎙️',
    activeBorder: 'border-[#A94A62]',
    activeBg: 'bg-[#F3DDE2]/60 border-[#A94A62] text-[#A94A62]',
    activeRing: 'ring-2 ring-[#A94A62]/25 shadow-md',
    desc: '告别死板背诵！甄选《放牛班的春天》《天使爱美丽》《触不可及》《小王子》经典高光名场面 ➔ 逐句盲听跟读 ➔ 每日早读养成纯正法兰西语感。',
    steps: [
      {
        stepNum: '01',
        stepLabel: '第 1 步 · 影视精听',
        title: '4 大法国高分经典电影台词精听',
        targetBadge: '原声磨耳朵 · 逐句解析',
        badgeBg: 'bg-[#F3DDE2] text-[#A94A62] border border-[#A94A62]/20',
        desc: '原汁原味法国原声电影切片，支持逐句盲听、原声跟读与重点考点拆解，告别中式发音。',
        actionText: '进入法影精听',
        targetTab: 'cinema',
        icon: Headphones,
        buttonBg: 'bg-[#A94A62] hover:bg-[#933C52] text-white shadow-xs'
      },
      {
        stepNum: '02',
        stepLabel: '第 2 步 · 语感打卡',
        title: '每日早读原声金句打卡',
        targetBadge: '法式韵律 · 每日坚持',
        badgeBg: 'bg-white text-[#29354A] border border-[#DDBF78]/50',
        desc: '每日精读一句地道法语原声名言，收听真人标准巴黎发音，连续打卡激活语言直觉。',
        actionText: '朗读今日金句',
        targetTab: 'home',
        icon: Calendar,
        buttonBg: 'bg-[#DDBF78] hover:bg-[#C9A95C] text-[#29354A] font-black shadow-xs'
      }
    ]
  },
  exam: {
    id: 'exam',
    name: '考研二外 / DELF 冲刺',
    targetAudience: '冲刺高校 241/242 · DELF 高分通关',
    tag: '备考必选',
    icon: '🎯',
    activeBorder: 'border-[#A94A62]',
    activeBg: 'bg-[#F3DDE2]/60 border-[#A94A62] text-[#A94A62]',
    activeRing: 'ring-2 ring-[#A94A62]/25 shadow-md',
    desc: '专为考研二外与 DELF 考生打造的标准提分闭环：全真模考摸底 ➔ 错题遗忘曲线复盘 ➔ 核心时态与虚拟式专项攻坚！',
    steps: [
      {
        stepNum: '01',
        stepLabel: '第 1 步 · 模考查漏',
        title: '双轨历届全真大卷机考',
        targetBadge: '北外·上外·DELF真题',
        badgeBg: 'bg-[#F3DDE2] text-[#A94A62] border border-[#A94A62]/20',
        desc: '全真还原考场倒计时，听力原声精析、即做即看与模考双模式，精准测出真实水平与薄弱项。',
        actionText: '进入全真真题大考场',
        targetTab: 'exam',
        icon: FileCheck2,
        buttonBg: 'bg-[#A94A62] hover:bg-[#933C52] text-white shadow-xs'
      },
      {
        stepNum: '02',
        stepLabel: '第 2 步 · 靶向消错',
        title: '艾宾浩斯智能错题消灭',
        targetBadge: '遗忘曲线重练',
        badgeBg: 'bg-white text-[#29354A] border border-[#DDBF78]/50',
        desc: '真题考场做错的题目自动归集，按失分考点分类沉淀，靶向消除知识盲区。',
        actionText: '消灭待复习错题',
        targetTab: 'mistakes',
        icon: BookOpen,
        buttonBg: 'bg-[#A94A62] hover:bg-[#933C52] text-white shadow-xs'
      },
      {
        stepNum: '03',
        stepLabel: '第 3 步 · 考点攻坚',
        title: '动词时态与虚拟式专题特训',
        targetBadge: '攻克y/en · 愈过去时',
        badgeBg: 'bg-white text-[#29354A] border border-[#DDBF78]/50',
        desc: '专攻未完成与复合过去时辨析、条件假设、虚拟式命令从句与双代词语序命题陷阱。',
        actionText: '开启时态专项突破',
        targetTab: 'conjugation',
        icon: Zap,
        buttonBg: 'bg-[#DDBF78] hover:bg-[#C9A95C] text-[#29354A] font-black shadow-xs'
      }
    ]
  }
};

interface HomePortalProps {
  setActiveTab?: (tab: ActiveTab) => void;
  onSelectModule?: (tab: ActiveTab) => void;
  isVip: boolean;
  onOpenVipModal: (reason?: string) => void;
  onOpenWallpaperModal?: () => void;
}

export const HomePortal: React.FC<HomePortalProps> = ({
  setActiveTab,
  onSelectModule,
  isVip,
  onOpenVipModal,
  onOpenWallpaperModal
}) => {
  const navigateTab = (tab: ActiveTab) => {
    if (setActiveTab) setActiveTab(tab);
    else if (onSelectModule) onSelectModule(tab);
  };

  const [streak, setStreak] = useState(() => getStudyStreak());
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);
  const quote: DailyQuote = DAILY_QUOTES_POOL[currentQuoteIndex];

  // 学习主线选择器状态（默认首选第 3 主线：考研二外/DELF冲刺）
  const [selectedTrack, setSelectedTrack] = useState<TrackId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cs313_fr_active_track');
      if (saved === 'beginner' || saved === 'cinema' || saved === 'exam') {
        return saved as TrackId;
      }
    }
    return 'exam';
  });

  const handleTrackChange = (track: TrackId) => {
    setSelectedTrack(track);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cs313_fr_active_track', track);
    }
  };

  const handleTrackCardClick = (trackKey: TrackId) => {
    if (selectedTrack === trackKey) {
      const firstStep = TRACKS_CONFIG[trackKey].steps[0];
      handleStepClick(firstStep);
    } else {
      handleTrackChange(trackKey);
      setTimeout(() => {
        const roadmapElem = document.getElementById('track-steps-roadmap');
        if (roadmapElem) {
          roadmapElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    }
  };

  const currentTrackConfig = TRACKS_CONFIG[selectedTrack];

  // Auto-scrolling update logs ticker state
  const [activeLogIndex, setActiveLogIndex] = useState<number>(0);
  const [isLogHovered, setIsLogHovered] = useState<boolean>(false);

  useEffect(() => {
    if (isLogHovered) return;
    const timer = setInterval(() => {
      setActiveLogIndex(prev => (prev + 1) % CONTENT_UPDATE_LOGS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isLogHovered]);

  const handleCheckIn = () => {
    const newCount = checkInToday();
    setStreak({ count: newCount, lastDate: new Date().toISOString().slice(0, 10), isCheckedToday: true });
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % DAILY_QUOTES_POOL.length);
  };

  const handleStepClick = (step: TrackStep) => {
    if (step.targetTab === 'home') {
      speakFrench(quote.audioText);
      const elem = document.getElementById('daily-quote-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigateTab(step.targetTab);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-2.5 sm:pt-3.5 pb-8 space-y-4 sm:space-y-5">
      
      {/* --- 1. 每日晨读打卡 & 持续更新动态跑马灯轮播专区 --- */}
      <div id="daily-quote-section" className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        
        {/* Compact Daily Morning Reading (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3">
          
          {/* Header row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <span className="p-1.5 rounded-lg bg-[#F3DDE2] text-[#A94A62] font-bold text-xs flex items-center gap-1 border border-[#A94A62]/20 shrink-0">
                <Calendar className="w-3.5 h-3.5" /> 每日晨读
              </span>
              <span className="text-xs font-bold text-[#29354A] shrink-0">
                今日推荐 · 法语励志格言 · 每日自律
              </span>
              <span className="text-[10px] text-[#A94A62] bg-[#F3DDE2] px-1.5 py-0.2 rounded border border-[#A94A62]/25 font-bold hidden sm:inline">
                考点: {quote.keyGrammar}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 ml-auto">
              <button
                onClick={handleNextQuote}
                className="text-[11px] text-slate-500 hover:text-[#A94A62] flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-100 transition cursor-pointer font-bold shrink-0 whitespace-nowrap"
                title="切换金句"
              >
                <RefreshCw className="w-3 h-3 shrink-0" />
                <span className="whitespace-nowrap">换一句</span>
              </button>
            </div>
          </div>

          {/* Quote Body - Single sleek container */}
          <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between gap-3">
            <div className="space-y-0.5 min-w-0">
              <p className="text-sm sm:text-base font-extrabold text-[#29354A] truncate">
                {quote.fr}
              </p>
              <p className="text-xs text-slate-600 truncate font-medium">
                {quote.zh}
              </p>
            </div>

            <button
              onClick={() => speakFrench(quote.audioText)}
              className="p-2 rounded-full bg-white text-[#A94A62] hover:bg-slate-100 border border-slate-200/80 shadow-2xs shrink-0 transition cursor-pointer"
              title="朗读金句"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Footer CTA */}
          <div className="flex items-center justify-between pt-0.5 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
              <Flame className="w-3.5 h-3.5 text-[#A94A62] fill-current" />
              <span>已连续打卡 <strong className="text-[#A94A62] font-bold">{streak.count}</strong> 天</span>
            </div>

            <button
              onClick={handleCheckIn}
              disabled={streak.isCheckedToday}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer ${
                streak.isCheckedToday
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                  : 'bg-[#A94A62] hover:bg-[#933C52] text-white active:scale-95'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{streak.isCheckedToday ? '今日已打卡 ✓' : '立即打卡'}</span>
            </button>
          </div>

        </div>

        {/* --- Auto-scrolling Vertical Ticker (4 cols) --- */}
        <div 
          onMouseEnter={() => setIsLogHovered(true)}
          onMouseLeave={() => setIsLogHovered(false)}
          className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-2.5 relative overflow-hidden group"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#29354A]">
              <Bell className="w-3.5 h-3.5 text-[#A94A62]" />
              <span>持续交付动态</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#F3DDE2] text-[#A94A62] rounded-full border border-[#A94A62]/25">
                ● 自动滚播
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {activeLogIndex + 1}/{CONTENT_UPDATE_LOGS.length}
              </span>
            </div>
          </div>

          {/* Smooth Vertical Slide Ticker Area */}
          <div className="relative h-[66px] overflow-hidden">
            {CONTENT_UPDATE_LOGS.map((log, idx) => {
              const isCurrent = idx === activeLogIndex;
              return (
                <div
                  key={log.id}
                  className={`absolute inset-0 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-center space-y-1 transition-all duration-500 ease-in-out ${
                    isCurrent
                      ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
                      : 'opacity-0 -translate-y-4 pointer-events-none scale-95'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <strong className="text-xs font-bold text-[#29354A] truncate">
                      {log.title}
                    </strong>
                    <span className="text-[#A94A62] font-bold text-[10px] bg-[#F3DDE2] px-1.5 py-0.2 rounded border border-[#A94A62]/20 shrink-0">
                      {log.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 truncate">
                    {log.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-400">
            <span>买家享永久云端同步解锁特权</span>
            <div className="flex items-center gap-1">
              {CONTENT_UPDATE_LOGS.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === activeLogIndex ? 'bg-[#A94A62] w-3' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* --- 2. 核心学习目标指引与 3 大主线选择器 --- */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
        
        {/* Header with target badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F3DDE2] text-[#A94A62] text-xs font-bold border border-[#A94A62]/20">
              <Compass className="w-3.5 h-3.5 text-[#A94A62]" />
              <span>新学员指引 · 学习主线向导</span>
              <span className="text-slate-500 font-normal hidden sm:inline">不知道从哪学起？点击下方选定你的目标：</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#29354A] tracking-tight">
              你当前的核心学习目标是什么？
            </h2>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-[#29354A]">
            <span className="text-slate-400 font-normal">当前主线:</span>
            <span className="text-[#A94A62] font-black">{currentTrackConfig.name}</span>
          </div>
        </div>

        {/* Selected Track Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#F3DDE2]/60 via-[#F8F9FA] to-white border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A94A62] shrink-0" />
            <span className="font-black text-[#29354A]">
              【{currentTrackConfig.name}】闭环指引
            </span>
            <span className="text-slate-600 hidden md:inline">
              | {currentTrackConfig.desc}
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-white text-[#A94A62] border border-slate-200/80 text-[11px] font-bold self-start sm:self-auto shrink-0 shadow-2xs">
            按顺序执行 {currentTrackConfig.steps.length} 步 ➔ 达成闭环
          </span>
        </div>

        {/* 3 Large Pathway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {(['beginner', 'cinema', 'exam'] as TrackId[]).map((trackKey) => {
            const config = TRACKS_CONFIG[trackKey];
            const isSelected = selectedTrack === trackKey;
            return (
              <div
                key={trackKey}
                onClick={() => handleTrackCardClick(trackKey)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative flex flex-col justify-between space-y-3 group ${
                  isSelected
                    ? `${config.activeBorder} ${config.activeBg} ${config.activeRing}`
                    : 'bg-slate-50/80 border-slate-200/80 hover:border-[#A94A62]/40 hover:bg-white hover:shadow-xs'
                }`}
              >
                {/* Active checkmark */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#A94A62] text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between pr-6">
                    <span className="text-2xl">{config.icon}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                      isSelected
                        ? 'bg-white text-slate-800 border-slate-200/80'
                        : 'bg-white text-slate-600 border-slate-200/80'
                    }`}>
                      {config.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#29354A] group-hover:text-[#A94A62] transition">
                    {config.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {config.targetAudience}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? 'text-[#A94A62]' : 'text-slate-500 group-hover:text-slate-800'}>
                    {isSelected ? '立即进入学习 (进入真题大卷)' : '点击切换此路线'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                    isSelected ? 'text-[#A94A62]' : 'text-slate-400'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Roadmap Steps Container */}
        <div id="track-steps-roadmap" className="pt-2 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentTrackConfig.steps.map((step) => {
              return (
                <div
                  key={step.stepNum}
                  className="bg-slate-50/80 hover:bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-[#A94A62]/40 hover:shadow-xs transition flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black font-mono px-2 py-0.5 rounded-lg bg-white border border-slate-200/80 text-[#A94A62]">
                        {step.stepLabel}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${step.badgeBg}`}>
                        {step.targetBadge}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-[#29354A] group-hover:text-[#A94A62] transition">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => handleStepClick(step)}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer active:scale-98 ${step.buttonBg}`}
                  >
                    <span>{step.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* --- 6. 学员美学福利 · 一子一木 4K 伴学治愈壁纸屋横幅 --- */}
      <WallpaperBanner onOpenWallpaperModal={onOpenWallpaperModal} />

    </div>
  );
};

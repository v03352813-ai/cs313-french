import React, { useState } from 'react';
import { 
  Headphones, 
  FileCheck2, 
  Layers, 
  BookOpenCheck, 
  Sparkles, 
  Volume2, 
  Flame, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight,
  GraduationCap,
  Globe2,
  Bell,
  RefreshCw,
  Compass,
  Target,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ActiveTab } from './Navbar';
import { 
  DAILY_QUOTES_POOL, 
  CONTENT_UPDATE_LOGS, 
  getStudyStreak, 
  checkInToday, 
  DailyQuote 
} from '../data/cloudSync';

export type TrackId = 'beginner' | 'kaoyan' | 'delf';

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
    name: '零基础筑基 / 音标变位通关',
    targetAudience: '从35音标到动词变位 · 系统入门',
    tag: '系统筑基',
    icon: '🥐',
    activeBorder: 'border-blue-500',
    activeBg: 'bg-blue-50/70 border-blue-400 text-blue-950',
    activeRing: 'ring-2 ring-blue-500/20 shadow-md',
    desc: '初学者零压力科学路线：攻克 35 国际音标与 4 大连音联诵规则 ➔ 玩转三组动词 7 大时态变位演练器 ➔ 掌握 5000+ 阴阳性核心词！',
    steps: [
      {
        stepNum: '01',
        stepLabel: '第 1 步 · 夯实语音',
        title: '35 音标体系与 4 大发音/联诵规则',
        targetBadge: '攻克鼻化元音 · 小舌音[ʁ]',
        badgeBg: 'bg-blue-100 text-blue-800 border border-blue-200/70',
        desc: '15 元音（含 4 鼻化音）、3 半元音与 17 辅音，动画透视联诵 (Liaison)、CaReFuL 词尾不发音与省音规则。',
        actionText: '进入音标联诵实验室',
        targetTab: 'phonetics',
        icon: Sparkles,
        buttonBg: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
      },
      {
        stepNum: '02',
        stepLabel: '第 2 步 · 攻破变位',
        title: '动词变位可视化演练器 (Conjugaison)',
        targetBadge: '7大时态 · 词尾高亮推导',
        badgeBg: 'bg-indigo-100 text-indigo-800 border border-indigo-200/70',
        desc: '第一组(-er)、第二组(-ir)与第三组不规则动词，一键对比直陈式现在时、复合过去时、未完成过去时与虚拟式。',
        actionText: '开启变位演练器',
        targetTab: 'conjugation',
        icon: RotateCcw,
        buttonBg: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
      },
      {
        stepNum: '03',
        stepLabel: '第 3 步 · 科学积累',
        title: '5,000+ 核心词汇闪卡 (性数双标)',
        targetBadge: '♂阳性蓝标 · ♀阴性粉标',
        badgeBg: 'bg-sky-100 text-sky-800 border border-sky-200/70',
        desc: '彻底解决背词不记阴阳性大忌！严格标定性别与定冠词配合，带艾宾浩斯抗遗忘记忆曲线与真人朗读。',
        actionText: '背诵核心分级词汇',
        targetTab: 'vocab',
        icon: Layers,
        buttonBg: 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
      },
      {
        stepNum: '04',
        stepLabel: '第 4 步 · 语法框架',
        title: '初中高级法语全能语法宝典',
        targetBadge: '直宾COD/间宾COI · 避坑指南',
        badgeBg: 'bg-emerald-100 text-emerald-800 border border-emerald-200/70',
        desc: '冠词体系、代词语序、副代词 y/en 与复合过去时分词配合，每条语法均附带【考研/考级避坑指南】。',
        actionText: '查阅体系文法宝典',
        targetTab: 'grammar',
        icon: BookOpenCheck,
        buttonBg: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
      }
    ]
  },
  kaoyan: {
    id: 'kaoyan',
    name: '考研二外法语高分突击',
    targetAudience: '全国高校英语专业考研 (241/242/243)',
    tag: '考研必刷',
    icon: '🎓',
    activeBorder: 'border-indigo-500',
    activeBg: 'bg-indigo-50/70 border-indigo-400 text-indigo-950',
    activeRing: 'ring-2 ring-indigo-500/20 shadow-md',
    desc: '面向英专考研二外打造的高分通关闭环：全国高校统考大纲 ➔ 历年名校综合真题机考 ➔ 艾宾浩斯智能错题针对性消灭！',
    steps: [
      {
        stepNum: '01',
        stepLabel: '第 1 步 · 模考诊断',
        title: '考研二外全国高校综合真题机考',
        targetBadge: '北外·上外·武大真题',
        badgeBg: 'bg-indigo-100 text-indigo-800 border border-indigo-200/70',
        desc: '收录历年全国名校考研二外真题卷，涵盖词汇语法单选、时态变位、完形填空与长篇阅读分析，交卷智能判分。',
        actionText: '进入考研二外考场',
        targetTab: 'exam',
        icon: FileCheck2,
        buttonBg: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
      },
      {
        stepNum: '02',
        stepLabel: '第 2 步 · 靶向消错',
        title: '智能错题本 · 针对性强化重练',
        targetBadge: '薄弱点抓取 · 错因解析',
        badgeBg: 'bg-rose-100 text-rose-800 border border-rose-200/70',
        desc: '做错的客观题自动收录沉淀，按失分语法点精准归集，支持一键针对性重练，绝不在考场上二次踩坑。',
        actionText: '消灭待复习错题',
        targetTab: 'mistakes',
        icon: BookOpen,
        buttonBg: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
      },
      {
        stepNum: '03',
        stepLabel: '第 3 步 · 考点专攻',
        title: '时态变位与代词系统专题突破',
        targetBadge: '攻克y/en · 虚拟式Subjonctif',
        badgeBg: 'bg-blue-100 text-blue-800 border border-blue-200/70',
        desc: '重点突破考研二外最容易丢分的副代词 y/en 置换法则、直接宾语提前过去分词配合与虚拟式触发句型！',
        actionText: '进入专题考点突破',
        targetTab: 'exam',
        icon: Target,
        buttonBg: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
      }
    ]
  },
  delf: {
    id: 'delf',
    name: 'DELF 欧标国际考级通关',
    targetAudience: '法国留学 / 魁北克移民 / CEFR认证',
    tag: '欧标权威',
    icon: '🌍',
    activeBorder: 'border-rose-500',
    activeBg: 'bg-rose-50/70 border-rose-400 text-rose-950',
    activeRing: 'ring-2 ring-rose-500/20 shadow-md',
    desc: '专为 DELF A1/A2/B1/B2 考生打造的官方样卷实战库：原声听力磨耳朵 ➔ 官方样题在线模考 ➔ 听力原文逐句大纲精析！',
    steps: [
      {
        stepNum: '01',
        stepLabel: '第 1 步 · 听力磨耳朵',
        title: '听解原声理解 (Compréhension orale)',
        targetBadge: '内嵌法国原声 · 原文大纲',
        badgeBg: 'bg-rose-100 text-rose-800 border border-rose-200/70',
        desc: '真实火车站广播、电台访谈、日常生活对话原声切片播放，支持播放/暂停，附带听力原文文本与逐句解析。',
        actionText: '进入 DELF 官方机考',
        targetTab: 'exam',
        icon: Headphones,
        buttonBg: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
      },
      {
        stepNum: '02',
        stepLabel: '第 2 步 · 图表读解',
        title: '读解分析 (Compréhension écrite)',
        targetBadge: '实用文体 · 启事/通知/长文',
        badgeBg: 'bg-amber-100 text-amber-800 border border-amber-200/70',
        desc: '法国公共图书馆告示、招聘启事、租赁合同与报刊时事长文，快速提取关键信息，提升解题速度。',
        actionText: '开始 DELF 读解演练',
        targetTab: 'exam',
        icon: FileCheck2,
        buttonBg: 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
      },
      {
        stepNum: '03',
        stepLabel: '第 3 步 · 影视地道语感',
        title: '法国高分经典电影原声精听跟读',
        targetBadge: '放牛班的春天 · 天使爱美丽',
        badgeBg: 'bg-purple-100 text-purple-800 border border-purple-200/70',
        desc: '精选《放牛班的春天》《天使爱美丽》《触不可及》《小王子》高光名场面原声切片，双语对照逐句跟读。',
        actionText: '进入法影原声精听',
        targetTab: 'cinema',
        icon: Headphones,
        buttonBg: 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
      }
    ]
  }
};

interface HomePortalProps {
  setActiveTab: (tab: ActiveTab) => void;
  isVip: boolean;
  onOpenVipModal: () => void;
}

export const HomePortal: React.FC<HomePortalProps> = ({
  setActiveTab,
  isVip,
  onOpenVipModal
}) => {
  const [streak, setStreak] = useState(() => getStudyStreak());
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);
  const quote: DailyQuote = DAILY_QUOTES_POOL[currentQuoteIndex];

  const [selectedTrack, setSelectedTrack] = useState<TrackId>('beginner');
  const currentTrackConfig = TRACKS_CONFIG[selectedTrack];

  const handleNextQuote = () => {
    setCurrentQuoteIndex(prev => (prev + 1) % DAILY_QUOTES_POOL.length);
  };

  const handleCheckIn = () => {
    const res = checkInToday();
    setStreak({ days: res.days, checkedToday: true });
    if (res.isFirstToday) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const playSpeech = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    } catch {}
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* 1. Top Section: Daily French Quote + Study Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Daily Quote Card (8 cols) */}
        <div className="lg:col-span-8 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-md border border-blue-800/40 flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                法文每日晨读 · {quote.date}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/10 text-slate-300 font-serif">
                {quote.source}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => playSpeech(quote.audioText)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                title="朗读金句"
              >
                <Volume2 className="w-4 h-4 text-blue-300" />
              </button>
              <button
                onClick={handleNextQuote}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                title="换一句"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-300" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-lg sm:text-xl font-bold font-serif leading-relaxed text-slate-100">
              « {quote.fr} »
            </p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {quote.zh}
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-blue-200/90">
            <span><strong>文法要点：</strong>{quote.keyGrammar}</span>
          </div>
        </div>

        {/* Study Streak Card (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              自学打卡激励
            </span>
            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              连续 {streak.days} 天
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              今日法语自学打卡
            </h3>
            <p className="text-xs text-slate-500">
              保持高频小步交互，每天刷 15 分钟比周末突击更有效。
            </p>
          </div>

          <button
            onClick={handleCheckIn}
            className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition ${
              streak.checkedToday
                ? 'bg-emerald-100 text-emerald-800 cursor-default'
                : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-sm shadow-orange-500/20'
            }`}
          >
            {streak.checkedToday ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>今日已签到打卡</span>
              </>
            ) : (
              <>
                <Flame className="w-4 h-4" />
                <span>立即打卡 (+1天连续)</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* 2. Three Adaptive Learning Pathways (三大学习路径选择器) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold">
                智能学习主线
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                选择适合您的法语通关路线
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              无论您是考研英专生、出国考级党，还是零基础自学者，点击即可切换专属自学路径
            </p>
          </div>
        </div>

        {/* 3 Pathway Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(Object.keys(TRACKS_CONFIG) as TrackId[]).map((tId) => {
            const track = TRACKS_CONFIG[tId];
            const isSelected = selectedTrack === tId;
            return (
              <button
                key={tId}
                onClick={() => setSelectedTrack(tId)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? `${track.activeBg} ${track.activeBorder} ${track.activeRing}`
                    : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{track.icon}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-white/80 text-slate-900' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {track.tag}
                  </span>
                </div>
                <div className="font-extrabold text-sm sm:text-base leading-tight">
                  {track.name}
                </div>
                <p className="text-xs opacity-75 mt-1 truncate">
                  {track.targetAudience}
                </p>
              </button>
            );
          })}
        </div>

        {/* Pathway Description & Step-by-Step Roadmap Cards */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-700">
                当前主线规划 · {currentTrackConfig.name}
              </span>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                {currentTrackConfig.desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentTrackConfig.steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.stepNum}
                  className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex flex-col justify-between space-y-4 hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {step.stepLabel}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${step.badgeBg}`}>
                        {step.targetBadge}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab(step.targetTab)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${step.buttonBg}`}
                  >
                    <span>{step.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Core Learning Tools Grid (6 大核心功能) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            全套自学与备考武器库
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            7 大核心模块打通发音、变位、词汇、语法与真题全流程
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div 
            onClick={() => setActiveTab('phonetics')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition">
              35音标与联诵实验室
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              攻克 15 元音、鼻化元音、小舌音与 CaReFuL 词尾不发音规则，动画透视联诵 (Liaison) 发生机制。
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('conjugation')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-indigo-700 transition">
              动词变位可视化演练器
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              输入或选择动词，一键推导直陈式现在时、复合过去时、简单将来时与虚拟式，人称变位词尾高亮对比。
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('vocab')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-sky-700 transition">
              5000+ 词汇闪卡 (性数双标)
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              严格标注阳性（Masculin 蓝标）与阴性（Féminin 粉标），结合艾宾浩斯曲线与真人发音抗遗忘打卡。
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('grammar')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition">
              初中高全套语法速查宝典
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              冠词体系、直宾COD/间宾COI代词排布、副代词 y/en 用法及复合过去时配合规则，带考研避坑指南。
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('mistakes')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-rose-700 transition">
              个性化专属错题本
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              客观题做错自动收录沉淀，按失分语法考点分类剖析，支持一键针对性重练，绝不重复踩坑。
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('cinema')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-purple-700 transition">
              法国高分经典电影原声精听
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              甄选《放牛班的春天》《天使爱美丽》《触不可及》《小王子》原声名场面双语切片，边看剧边磨耳朵。
            </p>
          </div>

        </div>
      </section>

      {/* 4. Weekly Cloud Content Updates Log (云端更新动态) */}
      <section className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              每周云端题库与内容持续更新日志
            </h3>
          </div>
          <span className="text-xs text-slate-400">持续随新考期拓展</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CONTENT_UPDATE_LOGS.map(log => (
            <div key={log.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold">
                  {log.tag}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{log.date} · {log.version}</span>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                {log.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {log.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

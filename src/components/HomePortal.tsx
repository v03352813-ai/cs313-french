import React from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  FileCheck2, 
  Layers, 
  BookOpenCheck, 
  Headphones, 
  BookMarked,
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Globe2, 
  ShieldCheck, 
  Flame, 
  Clock
} from 'lucide-react';
import { ActiveTab } from './Navbar';

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
  return (
    <div className="space-y-8 sm:space-y-12 pb-16">
      
      {/* 1. Hero Showcase Banner with French Atmosphere */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-10 shadow-xl border border-blue-800/40">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/4 -bottom-16 w-60 h-60 bg-rose-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-md">
            <span>🇫🇷</span>
            <span>自研交互式在线学习平台 · 拒绝冷冰冰的死资料</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            学法语，告别死记硬背！<br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-rose-300 bg-clip-text text-transparent">
              考研二外 & DELF 欧标全真机考系统
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            专为法语备考与自学者打造的沉浸式实战平台。打通「35音标与连音联诵」、「动词变位可视化演练器」、「5000+阴阳性核心词汇」与「考研二外/DELF双轨全真机考」，手机 / 平板 / 电脑 浏览器即开即练。
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('exam')}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition-all"
            >
              <FileCheck2 className="w-5 h-5" />
              <span>进入双轨机考刷题</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('conjugation')}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all"
            >
              <RotateCcw className="w-4 h-4 text-blue-400" />
              <span>动词变位演练器</span>
            </button>

            {!isVip && (
              <button
                onClick={onOpenVipModal}
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-md hover:opacity-95 transition"
              >
                <span>开通全功能VIP (¥49.9)</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>双轨真实试卷 20 套</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>35音标与联诵透视</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>三组动词7大时态变位</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>错题本自动归集回练</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dual-Track Exam Showcase (考研二外 vs DELF欧标) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-xs">
                真实考试标准
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                双轨权威机考大卷库
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              严格划分考研与出国两大赛道，彻底避免考题混淆，还原真实考场做题压力
            </p>
          </div>
          <button
            onClick={() => setActiveTab('exam')}
            className="self-start sm:self-auto text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
          >
            <span>查看全部真题</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Track 1 Card: 考研二外法语 */}
          <div 
            onClick={() => setActiveTab('exam')}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50/80 to-blue-50/80 border border-indigo-100 p-6 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold border border-indigo-200">
                全国统考大纲
              </span>
            </div>
            <div className="mt-4 space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition">
                🎓 考研二外法语专区 (241/242/243)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                针对英语专业硕士考研二外必考科目。聚焦高频词汇辨析、时态变位配合单选、完形填空与短文阅读。
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-indigo-100/80 flex items-center justify-between text-xs text-indigo-900 font-semibold">
              <span>已收录 12 套高校综合真题卷</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                开始模考 <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Track 2 Card: DELF 欧标考级 */}
          <div 
            onClick={() => setActiveTab('exam')}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50/80 to-amber-50/80 border border-rose-100 p-6 shadow-xs hover:shadow-md hover:border-rose-300 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/20">
                <Globe2 className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
                法国官方终身证书
              </span>
            </div>
            <div className="mt-4 space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-700 transition">
                🌍 DELF 欧标国际考级专区 (A1-B2)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                法国教育部权威认证。内嵌高保真听力原声理解（Compréhension orale）与日常生活公共告示图表阅读。
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-rose-100/80 flex items-center justify-between text-xs text-rose-900 font-semibold">
              <span>已收录 8 套官方标准模考卷 (含听力原文)</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                开始模考 <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Core Learning Tools Grid (7 大核心武器) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              7 大杀手锏功能模块
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              环环相扣的进阶路径，从发音到真题全流程覆盖
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: 35音标与联诵 */}
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

          {/* Card 2: 动词变位演练器 */}
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

          {/* Card 3: 单词闪卡 */}
          <div 
            onClick={() => setActiveTab('vocab')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-amber-700 transition">
              5000+ 词汇闪卡 (性数双标)
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              严格标注阳性（Masculin 蓝标）与阴性（Féminin 粉标），结合艾宾浩斯曲线与真人发音抗遗忘打卡。
            </p>
          </div>

          {/* Card 4: 语法宝典 */}
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

          {/* Card 5: 智能错题本 */}
          <div 
            onClick={() => setActiveTab('mistakes')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BookMarked className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-rose-700 transition">
              个性化专属错题本
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              客观题做错自动收录沉淀，按失分语法考点分类剖析，支持一键针对性重练，绝不重复踩坑。
            </p>
          </div>

          {/* Card 6: 法影原声精听 */}
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

      {/* 4. Quality & Commitment Notice */}
      <section className="p-6 rounded-3xl bg-slate-100/80 border border-slate-200/70 text-slate-600 text-xs sm:text-sm space-y-2">
        <div className="flex items-center gap-2 text-slate-900 font-bold">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>CS313 官方学术与品质声明</span>
        </div>
        <p className="leading-relaxed">
          本平台所有考研二外综合卷及 DELF 欧标模考题均严格依据教育部考研大纲与法国教育署公开样题标准编纂；词汇与语法遵循法兰西学术院（Académie française）正统文法规范。支持手机 / iPad / 电脑 各端浏览器即开即练。
        </p>
      </section>

    </div>
  );
};

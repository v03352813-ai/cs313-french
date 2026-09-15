import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Calendar, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Target, 
  Award, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Flame, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Calculator,
  GraduationCap,
  Globe2,
  Lightbulb
} from 'lucide-react';
import { FRENCH_EXAM_REGISTRATION_DATA } from '../data/french/examRegistration';
import { getFrenchExamCountdown } from '../utils/examCountdown';

interface ExamRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToExam?: () => void;
}

export const ExamRegistrationModal: React.FC<ExamRegistrationModalProps> = ({
  isOpen,
  onClose,
  onNavigateToExam
}) => {
  const [activeTab, setActiveTab] = useState<'gateways' | 'timeline' | 'tips' | 'scoring' | 'centers'>('gateways');
  const [timelineTrack, setTimelineTrack] = useState<'kaoyan' | 'delf'>('kaoyan');
  const [expandedStep, setExpandedStep] = useState<string | null>('01');

  // 算分器状态 (DELF 4单项 25分制)
  const [delfListening, setDelfListening] = useState<number>(18);
  const [delfReading, setDelfReading] = useState<number>(20);
  const [delfWriting, setDelfWriting] = useState<number>(16);
  const [delfSpeaking, setDelfSpeaking] = useState<number>(15);

  const countdown = getFrenchExamCountdown();
  const { kaoyanSession, delfSession, kaoyanTimeline, delfTimeline, snatchTips, scoringRules, keyCenters } = FRENCH_EXAM_REGISTRATION_DATA;

  const tabsRef = useRef<HTMLDivElement>(null);
  const scrollTabs = (offset: number) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // ESC 键关闭模态窗
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // DELF 评分计算
  const delfTotal = Number(delfListening) + Number(delfReading) + Number(delfWriting) + Number(delfSpeaking);
  const isDelfSectionFail = delfListening < 5 || delfReading < 5 || delfWriting < 5 || delfSpeaking < 5;
  const isDelfPassed = delfTotal >= 50 && !isDelfSectionFail;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        
        {/* 顶部标题栏与动态考期倒计时 */}
        <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-[#80142A] via-[#9B1B36] to-[#680E20] text-white flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 text-white flex items-center justify-center shrink-0 backdrop-blur-md border border-white/20 font-black shadow-xs">
              <Calendar className="w-5 h-5 text-[#DDBF78]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10.5px] font-black tracking-wide">
                  官方报考直通
                </span>
                <h3 className="text-base sm:text-lg font-black tracking-tight">
                  2026 法语考研二外 & DELF 欧标官方报考对接与全景指南
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1 shadow-2xs">
                  <Flame className="w-3.5 h-3.5 text-rose-700" />
                  {countdown.displayText}
                </span>
              </div>
              <p className="text-xs text-slate-200 font-medium mt-0.5">
                中国研招网 (yz.chsi.com.cn) · 教育部考试院 (delf-dalf.neea.edu.cn) · 高校教务直通
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer shrink-0 ml-2"
            title="关闭窗口 (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 5 维导航标签页 (全显平铺 + 真实滑块 + 左右滑动控制器) */}
        <div className="relative border-b border-slate-200/80 bg-slate-50/95 shrink-0 flex items-center">
          {/* 左翻按钮 */}
          <button
            type="button"
            onClick={() => scrollTabs(-200)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition shrink-0 z-10 hidden sm:flex items-center justify-center cursor-pointer h-full border-r border-slate-200/60"
            title="向左滚动导航"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 导航标签槽：电脑端平铺全显，窄屏带明显可见滑块与拖拽 */}
          <div 
            ref={tabsRef}
            className="flex-1 flex items-center overflow-x-auto px-2 sm:px-3 py-1.5 gap-1.5 w-full [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 cursor-pointer"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}
          >
            <button
              onClick={() => setActiveTab('gateways')}
              className={`flex-1 min-w-[140px] md:min-w-0 py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap text-center ${
                activeTab === 'gateways'
                  ? 'bg-white text-[#80142A] shadow-xs border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-[#80142A] shrink-0" />
              <span>🌐 官方报名入口</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex-1 min-w-[140px] md:min-w-0 py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap text-center ${
                activeTab === 'timeline'
                  ? 'bg-white text-[#80142A] shadow-xs border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>📅 考期全流程日历</span>
            </button>

            <button
              onClick={() => setActiveTab('tips')}
              className={`flex-1 min-w-[140px] md:min-w-0 py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap text-center ${
                activeTab === 'tips'
                  ? 'bg-white text-[#80142A] shadow-xs border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>💡 抢考位避坑SOP</span>
            </button>

            <button
              onClick={() => setActiveTab('scoring')}
              className={`flex-1 min-w-[140px] md:min-w-0 py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap text-center ${
                activeTab === 'scoring'
                  ? 'bg-white text-[#80142A] shadow-xs border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>📊 100分算分测算</span>
            </button>

            <button
              onClick={() => setActiveTab('centers')}
              className={`flex-1 min-w-[140px] md:min-w-0 py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap text-center ${
                activeTab === 'centers'
                  ? 'bg-white text-[#80142A] shadow-xs border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>🏛️ 全国考区评级</span>
            </button>
          </div>

          {/* 右翻按钮 */}
          <button
            type="button"
            onClick={() => scrollTabs(200)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition shrink-0 z-10 hidden sm:flex items-center justify-center cursor-pointer h-full border-l border-slate-200/60"
            title="向右滚动导航"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 内容主体 (可滚动区域) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* TAB 0: 官方报名唯一入口对接 (权威说明与一键直通) */}
          {activeTab === 'gateways' && (
            <div className="space-y-4">
              
              {/* 官方权威合规声明 */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFF9FA] via-[#FCECEF]/60 to-white border border-[#80142A]/25 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#80142A]" />
                  <strong className="text-sm font-black text-[#80142A]">
                    关于国家正规法语考试官方报考渠道的重要说明
                  </strong>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  我国所有硕士研究生入学考试（二外法语）及法国官方 DELF/DALF 欧标考级，均必须由考生本人在国家级官方指定系统以实名认证方式完成网上报名与缴费。任何第三方机构均无权私自办理。本研习社已为您整合全国三大官方唯一报名系统入口与报考指南，请点击对应卡片前往官网安全报考：
                </p>
              </div>

              {/* 三大官方报名网关大卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 网关 1: 考研二外 -> 中国研招网 */}
                <div className="p-5 rounded-3xl bg-white border-2 border-[#80142A]/30 hover:border-[#80142A] shadow-xs hover:shadow-md transition space-y-3.5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FCECEF] text-[#80142A] text-xs font-black border border-[#80142A]/20">
                        🏛️ 全国高校统考
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">yz.chsi.com.cn</span>
                    </div>
                    <h4 className="text-base font-black text-[#29354A]">
                      全国硕士研究生统一招生考试（二外法语）
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>唯一官方报名网：</strong>中国研究生招生信息网（学信网·研招网）<br/>
                      <strong>适用对象：</strong>全国高校英语专业、翻译硕士 (MTI) 等报考高校自命题二外法语的考生。<br/>
                      <strong>报名时间：</strong>每年 9 月下旬预报名，10 月 8 日 - 25 日正式网报，11 月初网上确认，12 月下旬初试。
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
                    <a
                      href="https://yz.chsi.com.cn"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#80142A] hover:bg-[#680E20] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
                    >
                      <span>前往中国研招网官网报名</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setActiveTab('timeline')}
                      className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold whitespace-nowrap cursor-pointer transition"
                    >
                      查看考期时间表
                    </button>
                  </div>
                </div>

                {/* 网关 2: DELF/DALF -> 教育部考试院 NEEA */}
                <div className="p-5 rounded-3xl bg-white border-2 border-amber-300 hover:border-amber-400 shadow-xs hover:shadow-md transition space-y-3.5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-[#8A6A1E] text-xs font-black border border-amber-200">
                        🌍 法国教育部终身认证
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">delf-dalf.neea.edu.cn</span>
                    </div>
                    <h4 className="text-base font-black text-amber-950">
                      DELF-DALF 法国官方国际欧标考级
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>唯一官方报名网：</strong>教育部教育考试院 DELF-DALF 官方报名网<br/>
                      <strong>适用对象：</strong>法国留学申请、魁北克移民、外企应聘、欧洲终身有效法语能力水平认证。<br/>
                      <strong>考期安排：</strong>每年春季（3月）、夏季（6月）、冬季（11月）三大考季，提前约 2 个月在 NEEA 抢考位。
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
                    <a
                      href="https://delf-dalf.neea.edu.cn"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#B89047] hover:bg-[#8A6A1E] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
                    >
                      <span>前往教育部 NEEA 抢考位</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setActiveTab('centers')}
                      className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold whitespace-nowrap cursor-pointer transition"
                    >
                      查看考点紧俏榜
                    </button>
                  </div>
                </div>

                {/* 网关 3: 大学法语四级 (CFT-4) -> 高校教务系统 */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 md:col-span-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-xs font-black border border-slate-200">
                        🏫 全国在校公外统考
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-slate-900">
                        大学法语四级考试 (CFT-4) 报考通道
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      每年 3月-4月 由各高校教务处组织集体报名
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    大学法语四级考试由教育部高等学校大学外语教学指导委员会统一命题。凡修完大学二外法语课程的在校本科生或研究生，均可在每年 3~4 月登录本校教务管理系统（选课报考中心）完成网上报考，考试时间通常在 6 月中下旬（与大学英语 CET-4/6 同期举行）。
                  </p>
                </div>

              </div>

            </div>
          )}
          
          {/* TAB 1: 官方考期全流程日历 */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              
              {/* 双轨考期选择器 */}
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
                <button
                  onClick={() => setTimelineTrack('kaoyan')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    timelineTrack === 'kaoyan'
                      ? 'bg-[#80142A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>全国硕士考研二外法语</span>
                </button>
                <button
                  onClick={() => setTimelineTrack('delf')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    timelineTrack === 'delf'
                      ? 'bg-[#80142A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>DELF-DALF 国际欧标考级</span>
                </button>
              </div>

              {/* 考期当前概览卡片 */}
              {timelineTrack === 'kaoyan' ? (
                <div className="p-4 rounded-2xl bg-[#FCECEF] border border-[#80142A]/30 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold text-[#80142A] uppercase tracking-wider">
                        高校统考大卷
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-[#29354A]">
                        {kaoyanSession.title}
                      </h4>
                    </div>
                    <a
                      href={kaoyanSession.neeaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-[#80142A] hover:bg-[#680E20] text-white text-xs font-bold flex items-center gap-1 shrink-0 shadow-xs"
                    >
                      <span>前往中国研招网</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 border-t border-[#80142A]/20">
                    <div>
                      <span className="text-stone-500 font-medium">大考时间：</span>
                      <strong className="text-[#80142A]">{kaoyanSession.examDate}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 font-medium">正式网报：</span>
                      <strong className="text-slate-800">{kaoyanSession.registerDate}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                        法国教育部终身文凭
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-slate-900">
                        {delfSession.title}
                      </h4>
                    </div>
                    <a
                      href={delfSession.neeaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1 shrink-0 shadow-xs"
                    >
                      <span>前往教育考试院 NEEA</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 border-t border-amber-200/80">
                    <div>
                      <span className="text-stone-500 font-medium">2026年考期：</span>
                      <strong className="text-amber-900">{delfSession.examDate}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 font-medium">报名窗口：</span>
                      <strong className="text-slate-800">{delfSession.registerDate}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* 展开式时间线步骤 */}
              <div className="space-y-2.5">
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  全流程关键节点与避坑点
                </h5>
                
                {(timelineTrack === 'kaoyan' ? kaoyanTimeline : delfTimeline).map((item) => {
                  const isExpanded = expandedStep === item.step;
                  return (
                    <div 
                      key={item.step}
                      className={`rounded-2xl border transition-all ${
                        isExpanded 
                          ? 'bg-white border-[#80142A]/40 shadow-xs' 
                          : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedStep(isExpanded ? null : item.step)}
                        className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-xl font-mono text-xs font-black flex items-center justify-center shrink-0 ${
                            isExpanded ? 'bg-[#80142A] text-white shadow-xs' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {item.step}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-bold text-slate-900">{item.title}</h5>
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                {item.dateRange}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.desc}</p>
                          </div>
                        </div>

                        <div className="text-slate-400 shrink-0">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs space-y-2">
                          <p className="text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                          <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                            <span className="font-bold text-[#80142A] block mb-1">关键避坑指南：</span>
                            {item.tips.map((tip, idx) => (
                              <div key={idx} className="flex items-start gap-1.5 text-slate-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 2: 抢考位与考场避坑 SOP */}
          {activeTab === 'tips' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {snatchTips.map((tip, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#80142A]" />
                        <span>{tip.title}</span>
                      </h4>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FCECEF] text-[#80142A] border border-[#80142A]/20">
                        {tip.tag}
                      </span>
                    </div>
                    <div className="space-y-2 text-xs leading-relaxed text-slate-600">
                      {tip.points.map((p, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 官方防坑核心提醒 */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-amber-950 font-bold block">
                    教育部教育考试院特别提醒：
                  </strong>
                  <p className="text-amber-900/90 leading-relaxed">
                    任何声称“代抢考位保过”、“加价内定考场”的第三方中介均为违规诈骗行为！请所有考生认准研招网 (yz.chsi.com.cn) 与教育部 DELF-DALF 官方报名网 (delf-dalf.neea.edu.cn) 独立报名并按时缴费。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 100分制算分与单项淘汰测算器 */}
          {activeTab === 'scoring' && (
            <div className="space-y-5">
              
              {/* DELF 实时算分测算器 */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#80142A]" />
                      <span>DELF 100分制模拟测评与单项淘汰测算</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      滑动手柄或输入分数，测算是否满足“总分≥50 且 单项≥5分”双重合格线
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-xl text-xs font-black shadow-xs shrink-0 flex items-center gap-1.5 ${
                    isDelfPassed 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' 
                      : 'bg-rose-50 text-rose-700 border border-rose-300'
                  }`}>
                    <span>预测结果:</span>
                    <span>{isDelfPassed ? '🎉 合格 (Admis)' : '⚠️ 不及格 (Ajourné)'}</span>
                  </div>
                </div>

                {/* 4 项滑块 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: '听力理解 (Oral)', val: delfListening, setter: setDelfListening },
                    { label: '阅读理解 (Écrit)', val: delfReading, setter: setDelfReading },
                    { label: '书面写作 (Production)', val: delfWriting, setter: setDelfWriting },
                    { label: '口语表达 (Oral)', val: delfSpeaking, setter: setDelfSpeaking }
                  ].map((sec, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700">{sec.label}</span>
                        <div className="flex items-center gap-1">
                          <span className={`font-mono font-black text-sm ${sec.val < 5 ? 'text-rose-600' : 'text-[#80142A]'}`}>
                            {sec.val}
                          </span>
                          <span className="text-stone-400">/ 25分</span>
                          {sec.val < 5 && (
                            <span className="text-[10px] text-rose-600 bg-rose-50 px-1 py-0.2 rounded font-bold border border-rose-200">
                              单项淘汰!
                            </span>
                          )}
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="25"
                        value={sec.val}
                        onChange={e => sec.setter(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#80142A]"
                      />
                    </div>
                  ))}
                </div>

                {/* 实时总分与通关诊断 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">模拟总分：</span>
                    <strong className="text-2xl font-black font-mono text-[#80142A] ml-1">{delfTotal}</strong>
                    <span className="text-stone-400"> / 100 分 (及格线: 50 分)</span>
                  </div>
                  <div className="text-right text-[11px]">
                    {isDelfSectionFail ? (
                      <span className="text-rose-600 font-bold">
                        ⚠️ 存在单项得分低于 5 分，直接触发单项淘汰 (Note éliminatoire)！
                      </span>
                    ) : delfTotal >= 50 ? (
                      <span className="text-emerald-600 font-bold">
                        ✓ 满足总分≥50 且无单项淘汰，顺利获取终身有效文凭！
                      </span>
                    ) : (
                      <span className="text-amber-600 font-bold">
                        还需再提升 {50 - delfTotal} 分即可达到合格线！
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 考研二外与 DELF 评分大纲标准 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {scoringRules.map((rule, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5 text-xs">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                      <strong className="text-sm font-black text-slate-900">{rule.level}</strong>
                      <span className="font-bold text-[#80142A] bg-[#FCECEF] px-2 py-0.5 rounded-md">
                        满分 {rule.totalScore} 分 (及格线: {rule.passScore}分)
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{rule.desc}</p>
                    <div className="space-y-1">
                      {rule.sections.map((sec, i) => (
                        <div key={i} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="text-slate-700">{sec.name}</span>
                          <span className="font-mono text-stone-500">满分 {sec.max} 分</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: 全国核心考点分布与紧俏指数 */}
          {activeTab === 'centers' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm sm:text-base font-black text-slate-900">
                    全国各主要考区及高校考场紧张度评级
                  </h4>
                  <span className="text-xs text-slate-400">基于历届报名考位消耗数据</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {keyCenters.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">{item.city}考区</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.tension.includes('秒光')
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : item.tension.includes('较紧张')
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {item.tension}
                        </span>
                      </div>
                      <div className="text-slate-500 flex flex-wrap gap-1">
                        {item.centers.map((c, i) => (
                          <span key={i} className="bg-white px-2 py-0.5 rounded border border-slate-200">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 底部行动引导栏 */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
            🎯 建议立即前往【考研二外 / DELF 考场】刷历届官方统考真题大卷
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                onClose();
                if (onNavigateToExam) onNavigateToExam();
              }}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#80142A] hover:bg-[#680E20] text-white text-xs font-bold shadow-xs active:scale-98 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>进入全真模考大卷考场</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition cursor-pointer"
            >
              关闭
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutGrid, 
  Sparkles, 
  Layers, 
  BookMarked, 
  BookOpenCheck, 
  Headphones, 
  FileCheck2, 
  Crown, 
  KeyRound, 
  RotateCcw,
  Settings2
} from 'lucide-react';
import { checkAdminSession, LicenseInfo } from '../data/auth/cardKeys';
import { getFrenchExamCountdown } from '../utils/examCountdown';

export type ActiveTab = 
  | 'home' 
  | 'phonetics' 
  | 'conjugation' 
  | 'vocab' 
  | 'grammar' 
  | 'exam' 
  | 'mistakes' 
  | 'cinema';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isVip: boolean;
  license: LicenseInfo | null;
  onOpenVipModal: () => void;
  onOpenAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isVip,
  license,
  onOpenVipModal,
  onOpenAdminModal
}) => {
  const examCountdown = getFrenchExamCountdown();

  // 首页 + 7 大核心模块根据学员学习进阶排列
  const navItems = [
    { id: 'home' as ActiveTab, label: '首页', shortLabel: '首页', icon: LayoutGrid },
    { id: 'phonetics' as ActiveTab, label: '35音·联诵', shortLabel: '音标', icon: Sparkles },
    { id: 'conjugation' as ActiveTab, label: '动词变位器', shortLabel: '变位', icon: RotateCcw },
    { id: 'vocab' as ActiveTab, label: '单词闪卡', shortLabel: '闪卡', icon: Layers },
    { id: 'mistakes' as ActiveTab, label: '错题本', shortLabel: '错题', icon: BookMarked },
    { id: 'grammar' as ActiveTab, label: '语法宝典', shortLabel: '语法', icon: BookOpenCheck },
    { id: 'cinema' as ActiveTab, label: '法影精听', shortLabel: '精听', icon: Headphones },
    { id: 'exam' as ActiveTab, label: '二外/DELF真题', shortLabel: '真题', icon: FileCheck2, isHero: true },
  ];

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    return checkAdminSession() || urlParams.get('admin') === 'true' || window.location.hash.includes('admin');
  });

  const [logoClickCount, setLogoClickCount] = useState<number>(0);
  const logoClickTimerRef = useRef<any>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) || 
        (e.altKey && (e.key === 'A' || e.key === 'a'))
      ) {
        e.preventDefault();
        setIsAdmin(true);
        onOpenAdminModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenAdminModal]);

  const handleLogoClick = () => {
    setActiveTab('home');
    setLogoClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setIsAdmin(true);
        onOpenAdminModal();
        return 0;
      }
      return next;
    });

    if (logoClickTimerRef.current) clearTimeout(logoClickTimerRef.current);
    logoClickTimerRef.current = setTimeout(() => {
      setLogoClickCount(0);
    }, 2000);
  };

  // 首页专属旗舰展台：保留韩语版的顶级架构与布局，完全采用正统法兰西皇家蓝与白金高雅色系
  if (activeTab === 'home') {
    return (
      <header className="w-full pt-2.5 sm:pt-3 transition-all">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-3 sm:p-5 space-y-3 sm:space-y-3.5 overflow-hidden">
            
            {/* 1. 顶部品牌与核心主标语 */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 min-w-0">
              <div className="space-y-1 min-w-0">
                {/* 顶部品牌与徽章区域 */}
                <div className="flex flex-row items-center gap-1.5 sm:gap-2 flex-wrap">
                  {/* Brand Logo & Name */}
                  <div 
                    onClick={handleLogoClick}
                    className="flex items-center gap-1.5 cursor-pointer select-none group mr-1 shrink-0"
                    title="法语研习社 (点击刷新首页 / 连击5次开启管理员)"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-blue-700 via-indigo-600 to-blue-800 flex items-center justify-center text-white shadow-xs font-black text-xs tracking-tight group-hover:scale-105 transition shrink-0">
                      FR
                    </div>
                    <span className="font-black text-sm tracking-tight text-slate-900">
                      法语研习社
                    </span>
                  </div>

                  {/* 平台定位与考期徽章 */}
                  <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                    <span className="hidden xs:inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-[10.5px] sm:text-[11px] font-bold whitespace-nowrap">
                      French Pro · 自研平台
                    </span>
                    <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 text-[10.5px] sm:text-[11px] font-bold items-center gap-1 whitespace-nowrap">
                      <Sparkles className="w-2.5 h-2.5 text-blue-600" /> 考研二外/DELF双轨全真卷
                    </span>

                    {/* 动态考期倒计时模块 */}
                    <div
                      className={`px-2 py-0.5 rounded-full border text-[10px] sm:text-[11px] font-black flex items-center gap-1.5 whitespace-nowrap shadow-2xs ${examCountdown.badgeClass}`}
                    >
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                      </span>
                      <span>{examCountdown.badgeText}</span>
                      <span className="text-[9px] sm:text-[9.5px] opacity-75 font-bold">指南&gt;</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-900">
                  法语备考，从未如此简单
                </h1>

                <p className="text-xs text-slate-500 font-medium leading-snug">
                  考研二外 (241/242) 名校大卷 + DELF 欧标 (A1~B2) 全真机考 + 35 音标与联诵透视 + 动词变位演练器 + 5,000+ 性数词库 + 经典电影原声精听
                </p>
              </div>

              {/* 快速直达统计徽章与管理员栏 (纯正法兰西蓝灰金规范) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full max-w-full lg:w-auto min-w-0">
                <div className="grid grid-cols-5 sm:flex sm:items-center gap-1 sm:gap-2 w-full sm:w-auto min-w-0">
                  <button 
                    onClick={() => setActiveTab('conjugation')}
                    className="min-w-0 w-full sm:w-auto overflow-hidden flex flex-col items-center justify-center px-1 sm:px-3 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-center cursor-pointer transition shadow-xs active:scale-98"
                  >
                    <span className="hidden sm:block text-sm font-black text-white whitespace-nowrap">变位神器</span>
                    <span className="block sm:hidden text-[10px] font-black text-white truncate w-full">变位</span>
                    <span className="hidden sm:block text-[9px] text-blue-100 font-medium whitespace-nowrap">7大时态</span>
                    <span className="block sm:hidden text-[8px] text-blue-100 font-medium truncate w-full">7时态</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('exam')}
                    className="min-w-0 w-full sm:w-auto overflow-hidden flex flex-col items-center justify-center px-1 sm:px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center cursor-pointer hover:bg-slate-100 transition active:scale-98"
                  >
                    <span className="hidden sm:block text-sm font-black text-slate-900 whitespace-nowrap">全真卷</span>
                    <span className="block sm:hidden text-[10px] font-black text-slate-900 truncate w-full">真题</span>
                    <span className="hidden sm:block text-[9px] text-slate-500 font-medium whitespace-nowrap">历届名校</span>
                    <span className="block sm:hidden text-[8px] text-slate-500 font-medium truncate w-full">真题</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('vocab')}
                    className="min-w-0 w-full sm:w-auto overflow-hidden flex flex-col items-center justify-center px-1 sm:px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center cursor-pointer hover:bg-slate-100 transition active:scale-98"
                  >
                    <span className="hidden sm:block text-sm font-black text-slate-900 whitespace-nowrap">5000+</span>
                    <span className="block sm:hidden text-[10px] font-black text-slate-900 truncate w-full">5000+</span>
                    <span className="hidden sm:block text-[9px] text-slate-500 font-medium whitespace-nowrap">性数词库</span>
                    <span className="block sm:hidden text-[8px] text-slate-500 font-medium truncate w-full">词库</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('exam')}
                    className="min-w-0 w-full sm:w-auto overflow-hidden flex flex-col items-center justify-center px-1 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white text-center cursor-pointer transition shadow-xs active:scale-98 group"
                    title="2026 考研二外与 DELF 官方考期全景"
                  >
                    <span className="hidden sm:block text-sm font-black text-white whitespace-nowrap">📅 官方考期</span>
                    <span className="block sm:hidden text-[10px] font-black text-white truncate w-full">📅 考期</span>
                    <span className="hidden sm:block text-[9px] text-blue-100 font-medium whitespace-nowrap">{examCountdown.buttonSubText}</span>
                    <span className="block sm:hidden text-[8px] text-blue-100 font-medium truncate w-full">{examCountdown.days}天</span>
                  </button>
                  <button 
                    onClick={onOpenVipModal}
                    className="min-w-0 w-full sm:w-auto overflow-hidden flex flex-col items-center justify-center px-1 sm:px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-center cursor-pointer transition active:scale-98 shadow-2xs"
                    title="终身 VIP 特权"
                  >
                    <span className="hidden sm:block text-sm font-black text-amber-900 whitespace-nowrap">🎁 终身VIP</span>
                    <span className="block sm:hidden text-[10px] font-black text-amber-900 truncate w-full">🎁 VIP</span>
                    <span className="hidden sm:block text-[9px] text-amber-700 font-bold whitespace-nowrap">畅刷全卷</span>
                    <span className="block sm:hidden text-[8px] text-amber-700 font-bold truncate w-full">特权</span>
                  </button>
                </div>

                {/* Admin Status / Trigger */}
                {isAdmin && (
                  <div className="flex items-center justify-end gap-1.5 pt-1 sm:pt-0 sm:pl-2 border-t sm:border-t-0 sm:border-l border-slate-200">
                    <button
                      onClick={onOpenAdminModal}
                      className="p-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200/80 shrink-0 cursor-pointer flex items-center gap-1 text-xs font-bold"
                      title="店主管理后台"
                    >
                      <Settings2 className="w-3.5 h-3.5 text-blue-700" />
                      <span className="hidden xl:inline text-slate-700 font-bold">后台</span>
                    </button>

                    {isVip ? (
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-xs font-bold shadow-xs shrink-0 whitespace-nowrap">
                        <Crown className="w-3.5 h-3.5 shrink-0" />
                        <span className="whitespace-nowrap">{license?.planName || 'VIP 终身卡'}</span>
                      </div>
                    ) : (
                      <button
                        onClick={onOpenVipModal}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white text-xs font-bold shadow-xs active:scale-98 transition shrink-0 whitespace-nowrap cursor-pointer"
                      >
                        <KeyRound className="w-3.5 h-3.5 shrink-0" />
                        <span className="whitespace-nowrap">激活</span>
                      </button>
                    )}

                    <button
                      onClick={() => setIsAdmin(false)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                      title="关闭管理员控制栏"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 2. 紧随其后的 8 大核心功能平铺导航条 */}
            <div className="pt-0.5">
              <nav className="hidden md:grid grid-cols-8 gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/70 shadow-2xs">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-xs font-extrabold transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-white text-blue-700 shadow-xs border border-slate-200/90 font-black'
                          : item.isHero
                          ? 'text-slate-800 hover:bg-white/80 hover:text-blue-700'
                          : 'text-slate-700 hover:bg-white/70 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-700' : 'text-slate-500'}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Mobile horizontal scrollable nav */}
              <div className="md:hidden flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer ${
                        isActive
                          ? 'bg-blue-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </header>
    );
  }

  // 非首页模式：吸顶精致导航条
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
            title="点击5次开启管理后台"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-700 via-indigo-600 to-blue-800 flex items-center justify-center text-white shadow-xs font-black text-xs group-hover:scale-105 transition shrink-0">
              FR
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-slate-900 tracking-tight text-sm sm:text-base">
                法语研习社
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hidden sm:inline">
                French Pro
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right VIP / Actions */}
          <div className="flex items-center gap-2">
            {isVip ? (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-xs font-bold shadow-xs">
                <Crown className="w-3.5 h-3.5" />
                <span>{license?.planName || 'VIP 终身卡'}</span>
              </div>
            ) : (
              <button
                onClick={onOpenVipModal}
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white text-xs font-bold shadow-xs shadow-blue-700/20 active:scale-95 transition cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>开通 VIP</span>
              </button>
            )}

            {isAdmin && (
              <button
                onClick={onOpenAdminModal}
                className="p-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200/80"
                title="店主管理后台"
              >
                <Settings2 className="w-4 h-4 text-blue-700" />
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

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
  Settings2,
  GraduationCap,
  Globe2
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
  | 'delf'
  | 'mistakes' 
  | 'cinema';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isVip: boolean;
  license: LicenseInfo | null;
  onOpenVipModal: () => void;
  onOpenAdminModal: () => void;
  onOpenWallpaperModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isVip,
  license,
  onOpenVipModal,
  onOpenAdminModal,
  onOpenWallpaperModal
}) => {
  const examCountdown = getFrenchExamCountdown();

  // 首页 + 8 大核心模块根据学员学习进阶排列
  const navItems = [
    { id: 'home' as ActiveTab, label: '首页', shortLabel: '首页', icon: LayoutGrid },
    { id: 'phonetics' as ActiveTab, label: '35音·联诵', shortLabel: '音标', icon: Sparkles },
    { id: 'conjugation' as ActiveTab, label: '动词变位器', shortLabel: '变位', icon: RotateCcw },
    { id: 'vocab' as ActiveTab, label: '单词闪卡', shortLabel: '闪卡', icon: Layers },
    { id: 'mistakes' as ActiveTab, label: '错题本', shortLabel: '错题', icon: BookMarked },
    { id: 'grammar' as ActiveTab, label: '语法宝典', shortLabel: '语法', icon: BookOpenCheck },
    { id: 'cinema' as ActiveTab, label: '法影精听', shortLabel: '精听', icon: Headphones },
    { id: 'exam' as ActiveTab, label: '考研二外', shortLabel: '二外', icon: GraduationCap },
    { id: 'delf' as ActiveTab, label: 'DELF欧标', shortLabel: 'DELF', icon: Globe2, isHero: true },
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
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-[#80142A] via-[#9B1B36] to-[#680E20] flex items-center justify-center text-white shadow-xs font-black text-xs tracking-tight group-hover:scale-105 transition shrink-0">
                      FR
                    </div>
                    <span className="font-black text-sm tracking-tight text-[#80142A]">
                      法语研习社
                    </span>
                  </div>

                  {/* 平台定位与考期徽章 */}
                  <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                    <span className="hidden xs:inline-block px-2 py-0.5 rounded-full bg-[#FCECEF] text-[#80142A] border border-[#80142A]/20 text-[10.5px] sm:text-[11px] font-bold whitespace-nowrap">
                       French Pro · 自研平台
                    </span>
                    <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-slate-50 text-[#29354A] border border-[#DDBF78]/40 text-[10.5px] sm:text-[11px] font-bold items-center gap-1 whitespace-nowrap">
                      <Sparkles className="w-2.5 h-2.5 text-[#DDBF78]" /> 考研二外/DELF双轨全真卷
                    </span>

                    {/* 动态考期倒计时模块 */}
                    <div
                      className="px-2 py-0.5 rounded-full border border-[#80142A]/25 bg-[#FCECEF] text-[#80142A] text-[10px] sm:text-[11px] font-black flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
                    >
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#80142A] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#80142A]"></span>
                      </span>
                      <span>{examCountdown.badgeText}</span>
                      <span className="text-[9px] sm:text-[9.5px] opacity-75 font-bold">指南&gt;</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-[#29354A]">
                  法语备考，从未如此简单
                </h1>

                <p className="text-xs text-[#29354A]/75 font-medium leading-snug">
                  考研二外 (241/242) 名校大卷 + DELF 欧标 (A1~B2) 全真机考 + 35 音标与联诵透视 + 动词变位演练器 + 5,000+ 性数词库 + 经典电影原声精听
                </p>
              </div>

              {/* 快速直达统计徽章与管理员栏 */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full max-w-full lg:w-auto min-w-0">
                <div className="mobile-grid-5 sm:flex sm:items-center gap-1 sm:gap-2 w-full sm:w-auto min-w-0">
                  <button 
                    onClick={() => setActiveTab('conjugation')}
                    className="min-w-0 w-full sm:w-auto overflow-hidden flex flex-col items-center justify-center px-1 sm:px-3 py-1.5 rounded-xl bg-[#80142A] hover:bg-[#680E20] text-white text-center cursor-pointer transition shadow-xs active:scale-98"
                  >
                    <span className="hidden sm:block text-sm font-black text-white whitespace-nowrap">变位神器</span>
                    <span className="block sm:hidden text-[10px] font-black text-white truncate w-full">变位</span>
                    <span className="hidden sm:block text-[9px] text-[#FCECEF] font-medium whitespace-nowrap">7大时态</span>
                    <span className="block sm:hidden text-[8px] text-[#FCECEF] font-medium truncate w-full">7时态</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('exam')}
                    className="min-w-0 w-full sm:w-auto overflow-hidden flex flex-col items-center justify-center px-1 sm:px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center cursor-pointer hover:bg-slate-100 transition active:scale-98"
                  >
                    <span className="hidden sm:block text-sm font-black text-[#29354A] hover:text-[#80142A] whitespace-nowrap">全真卷</span>
                    <span className="block sm:hidden text-[10px] font-black text-[#29354A] truncate w-full">真题</span>
                    <span className="hidden sm:block text-[9px] text-slate-500 font-medium whitespace-nowrap">历届名校</span>
                    <span className="block sm:hidden text-[8px] text-slate-500 font-medium truncate w-full">真题</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('vocab')}
                    className="min-w-0 w-full sm:w-auto overflow-hidden flex flex-col items-center justify-center px-1 sm:px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center cursor-pointer hover:bg-slate-100 transition active:scale-98"
                  >
                    <span className="hidden sm:block text-sm font-black text-[#29354A] hover:text-[#80142A] whitespace-nowrap">5000+</span>
                    <span className="block sm:hidden text-[10px] font-black text-[#29354A] truncate w-full">5000+</span>
                    <span className="hidden sm:block text-[9px] text-slate-500 font-medium whitespace-nowrap">性数词库</span>
                    <span className="block sm:hidden text-[8px] text-slate-500 font-medium truncate w-full">词库</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('exam')}
                    className="min-w-0 w-full sm:w-auto overflow-hidden flex flex-col items-center justify-center px-1 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#80142A] to-[#9B1B36] hover:from-[#680E20] hover:to-[#80142A] text-white text-center cursor-pointer transition shadow-xs active:scale-98 group"
                    title="2026 考研二外与 DELF 官方考期全景"
                  >
                    <span className="hidden sm:block text-sm font-black text-white whitespace-nowrap">📅 官方考期</span>
                    <span className="block sm:hidden text-[10px] font-black text-white truncate w-full">📅 考期</span>
                    <span className="hidden sm:block text-[9px] text-[#FCECEF] font-medium whitespace-nowrap">{examCountdown.buttonSubText}</span>
                    <span className="block sm:hidden text-[8px] text-[#FCECEF] font-medium truncate w-full">{examCountdown.days}天</span>
                  </button>
                  <button 
                    onClick={onOpenWallpaperModal}
                    className="min-w-0 w-full sm:w-auto overflow-hidden flex flex-col items-center justify-center px-1 sm:px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-center cursor-pointer transition active:scale-98 shadow-2xs"
                    title="免费领取 iPad/手机 4K 法式伴学壁纸"
                  >
                    <span className="hidden sm:block text-sm font-black text-amber-900 whitespace-nowrap">🎁 免费壁纸</span>
                    <span className="block sm:hidden text-[10px] font-black text-amber-900 truncate w-full">🎁 壁纸</span>
                    <span className="hidden sm:block text-[9px] text-amber-700 font-bold whitespace-nowrap">4K 伴学锁屏</span>
                    <span className="block sm:hidden text-[8px] text-amber-700 font-bold truncate w-full">伴学</span>
                  </button>
                </div>

                {/* Admin Status / Trigger */}
                {isAdmin && (
                  <div className="flex items-center justify-end gap-1.5 pt-1 sm:pt-0 sm:pl-2 border-t sm:border-t-0 sm:border-l border-slate-200">
                    <button
                      onClick={onOpenAdminModal}
                      className="p-1.5 rounded-xl text-slate-600 hover:text-[#80142A] hover:bg-slate-100 transition border border-slate-200/80 shrink-0 cursor-pointer flex items-center gap-1 text-xs font-bold"
                      title="店主管理后台"
                    >
                      <Settings2 className="w-3.5 h-3.5 text-[#80142A]" />
                      <span className="hidden xl:inline text-[#29354A] font-bold">后台</span>
                    </button>

                    {isVip ? (
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#DDBF78] to-[#E8CEA0] text-[#29354A] text-xs font-black shadow-xs shrink-0 whitespace-nowrap">
                        <Crown className="w-3.5 h-3.5 shrink-0" />
                        <span className="whitespace-nowrap">{license?.planName || 'VIP 终身卡'}</span>
                      </div>
                    ) : (
                      <button
                        onClick={onOpenVipModal}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#80142A] to-[#9B1B36] hover:from-[#680E20] hover:to-[#80142A] text-white text-xs font-bold shadow-xs active:scale-98 transition shrink-0 whitespace-nowrap cursor-pointer"
                      >
                        <KeyRound className="w-3.5 h-3.5 shrink-0" />
                        <span className="whitespace-nowrap">激活</span>
                      </button>
                    )}

                    <button
                      onClick={() => setIsAdmin(false)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 text-xs font-bold cursor-pointer"
                      title="关闭管理员控制栏"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 2. 紧随其后的 9 大核心功能平铺导航条 */}
            <div className="pt-0.5">
              <nav className="hidden md:grid grid-cols-9 gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/70 shadow-2xs">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-center gap-1 py-1.5 px-0.5 rounded-lg text-xs lg:text-[13px] font-bold transition-all whitespace-nowrap select-none cursor-pointer ${
                        isActive
                          ? 'bg-white text-[#80142A] shadow-2xs shadow-slate-200/90 font-black'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 hidden lg:inline ${isActive ? 'text-[#80142A]' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Mobile All-in-One 2-Row Visible Navigation Bar */}
              <div className="md:hidden space-y-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/70 shadow-2xs min-w-0">
                {/* Top Row: 5 Core Items */}
                <div className="grid grid-cols-5 gap-1 min-w-0">
                  {navItems.slice(0, 5).map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`min-w-0 w-full flex items-center justify-center gap-0.5 py-1.5 px-0.5 rounded-xl text-[10.5px] font-bold transition whitespace-nowrap cursor-pointer select-none ${
                          isActive
                            ? 'bg-white text-[#80142A] shadow-xs font-black'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Icon className={`w-3 h-3 shrink-0 ${isActive ? 'text-[#80142A]' : 'text-slate-400'}`} />
                        <span className="truncate">{item.shortLabel || item.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Row: 4 Advanced Items */}
                <div className="grid grid-cols-4 gap-1 min-w-0">
                  {navItems.slice(5).map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`min-w-0 w-full flex items-center justify-center gap-0.5 py-1.5 px-0.5 rounded-xl text-[10.5px] font-bold transition whitespace-nowrap cursor-pointer select-none ${
                          isActive
                            ? 'bg-white text-[#80142A] shadow-xs font-black'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Icon className={`w-3 h-3 shrink-0 ${isActive ? 'text-[#80142A]' : 'text-slate-400'}`} />
                        <span className="truncate">{item.shortLabel || item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>
    );
  }

  // 获取当前正在浏览的模块信息
  const currentActiveItem = navItems.find(i => i.id === activeTab);

  // 二级功能页面：对齐日韩版采用浮岛卡片上下分层舒展设计（上层：品牌+模块定位+考期/壁纸/终身VIP，下层：9大模块导航轨）
  return (
    <header className="sticky top-0 z-40 w-full pt-2.5 sm:pt-3 transition-all">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs px-3 sm:px-5 py-2.5 sm:py-3 w-full space-y-2.5 sm:space-y-3">
          
          {/* 上层：品牌标识、当前位置定位与右侧 VIP / 壁纸区 */}
          <div className="flex items-center justify-between gap-3">
            
            {/* Left Brand Area */}
            <div 
              onClick={handleLogoClick}
              className="flex items-center gap-2 cursor-pointer select-none shrink-0 group"
              title="法语研习社 (点击返回首页 / 连击5次开启管理员)"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#80142A] via-[#9B1B36] to-[#680E20] flex items-center justify-center text-white shadow-sm shadow-[#80142A]/20 font-black text-base sm:text-lg tracking-tight group-hover:scale-105 transition shrink-0">
                FR
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
                <span className="font-black text-sm sm:text-base tracking-tight text-[#29354A]">
                  法语研习社
                </span>
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-[#FCECEF] text-[#80142A] border border-[#80142A]/25 hidden sm:inline">
                  French Pro
                </span>
                {currentActiveItem && currentActiveItem.id !== 'home' && (
                  <div className="hidden lg:flex items-center gap-1.5 pl-2.5 ml-2 border-l border-slate-200">
                    <span className="text-xs text-slate-400 font-medium">当前模块:</span>
                    <span className="px-2 py-0.5 rounded-lg bg-[#FCECEF] text-[#80142A] font-bold text-xs border border-[#80142A]/25">
                      {currentActiveItem.label}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Area: 福利与VIP/管理区 */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap">
              <button
                onClick={() => setActiveTab('exam')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-rose-500 to-[#80142A] hover:from-rose-600 hover:to-[#680E20] text-white text-xs font-bold transition shrink-0 cursor-pointer shadow-2xs"
                title="查看官方考期全景与避坑指南"
              >
                <span>📅</span>
                <span className="hidden sm:inline">官方考期</span>
                <span className="text-[10px] bg-white/20 px-1 rounded-full">{examCountdown.badgeText}</span>
              </button>

              <button
                onClick={onOpenWallpaperModal}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 text-xs font-bold transition shrink-0 cursor-pointer shadow-2xs"
                title="免费领取 4K 伴学壁纸"
              >
                <span>🎁</span>
                <span className="hidden sm:inline">免费壁纸</span>
              </button>

              {isAdmin && (
                <>
                  <button
                    onClick={onOpenAdminModal}
                    className="p-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200/80 shrink-0 cursor-pointer flex items-center gap-1 text-xs font-bold"
                    title="店主管理后台"
                  >
                    <Settings2 className="w-3.5 h-3.5 text-[#80142A]" />
                    <span className="hidden sm:inline text-slate-700 font-bold">管理后台</span>
                  </button>

                  <button
                    onClick={() => setIsAdmin(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                    title="关闭管理员控制栏"
                  >
                    ✕
                  </button>
                </>
              )}

              {/* VIP Status or Activation Button */}
              {isVip ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-[#DDBF78] to-[#C9A95C] text-[#29354A] text-xs font-black shadow-xs shrink-0 whitespace-nowrap">
                  <Crown className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{license?.planName || 'VIP 终身卡'}</span>
                </div>
              ) : (
                <button
                  onClick={onOpenVipModal}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold shadow-xs active:scale-98 transition shrink-0 whitespace-nowrap cursor-pointer"
                  title="开通 CS313 法语单语种终身VIP"
                >
                  <Crown className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">CS313 法语单语种终身VIP</span>
                </button>
              )}
            </div>

          </div>

          {/* 下层：电脑端独立全宽 9 大核心功能导航轨 (彻底舒展展开，无挤压碰撞) */}
          <nav className="hidden md:grid grid-cols-9 gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/70 shadow-2xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl text-xs lg:text-[13px] font-bold transition-all whitespace-nowrap select-none cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#80142A] shadow-2xs shadow-slate-200/90 font-black ring-1 ring-[#80142A]/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#80142A]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* 手机端：2 行平铺紧凑导航栏 */}
          <div className="md:hidden space-y-1 border-t border-slate-100 pt-2 min-w-0">
            {/* Top Row: 5 Core Items */}
            <div className="grid grid-cols-5 gap-1 min-w-0">
              {navItems.slice(0, 5).map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`min-w-0 w-full flex items-center justify-center gap-0.5 py-1.5 px-0.5 rounded-lg transition whitespace-nowrap text-[10.5px] font-bold cursor-pointer select-none ${
                      isActive
                        ? 'text-[#80142A] font-black bg-[#FCECEF] border border-[#80142A]/30 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-3 h-3 shrink-0 ${isActive ? 'text-[#80142A]' : 'text-slate-400'}`} />
                    <span className="truncate">{item.shortLabel || item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Row: 4 Advanced Items */}
            <div className="grid grid-cols-4 gap-1 min-w-0">
              {navItems.slice(5).map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`min-w-0 w-full flex items-center justify-center gap-0.5 py-1.5 px-0.5 rounded-lg transition whitespace-nowrap text-[10.5px] font-bold cursor-pointer select-none ${
                      isActive
                        ? 'text-[#80142A] font-black bg-[#FCECEF] border border-[#80142A]/30 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-3 h-3 shrink-0 ${isActive ? 'text-[#80142A]' : 'text-slate-400'}`} />
                    <span className="truncate">{item.shortLabel || item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

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
  Languages
} from 'lucide-react';
import { checkAdminSession, LicenseInfo } from '../data/auth/cardKeys';

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
  const navItems = [
    { id: 'home' as ActiveTab, label: '首页', shortLabel: '首页', icon: LayoutGrid },
    { id: 'phonetics' as ActiveTab, label: '35音标·联诵', shortLabel: '音标', icon: Sparkles },
    { id: 'conjugation' as ActiveTab, label: '动词变位器', shortLabel: '变位', icon: RotateCcw, isHero: true },
    { id: 'vocab' as ActiveTab, label: '单词闪卡', shortLabel: '闪卡', icon: Layers },
    { id: 'grammar' as ActiveTab, label: '语法宝典', shortLabel: '语法', icon: BookOpenCheck },
    { id: 'exam' as ActiveTab, label: '二外/DELF机考', shortLabel: '真题', icon: FileCheck2, isHero: true },
    { id: 'mistakes' as ActiveTab, label: '错题本', shortLabel: '错题', icon: BookMarked },
    { id: 'cinema' as ActiveTab, label: '法影精听', shortLabel: '精听', icon: Headphones },
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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Logo with French Tricolor Accent */}
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer select-none group"
            title="点击5次开启管理后台"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform relative overflow-hidden">
              <span className="text-xl">🇫🇷</span>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-600 via-white to-red-600"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                  CS313 <span className="text-blue-700">法语研习社</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  FR v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                考研二外法语(241/242) & DELF 欧标全真机考系统
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-sm shadow-blue-700/20 scale-[1.02]'
                      : item.isHero
                      ? 'text-blue-900 hover:bg-white/80 hover:text-blue-700'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.isHero ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs: VIP Status & Admin */}
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={onOpenAdminModal}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition"
                title="店主发卡后台"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>卡密后台</span>
              </button>
            )}

            <button
              onClick={onOpenVipModal}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all duration-200 ${
                isVip
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/20 hover:opacity-95'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-500/20 hover:scale-[1.02]'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>{isVip ? '尊享VIP' : '开通VIP'}</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar (Always visible on small screens) */}
        <div className="lg:hidden py-2 border-t border-slate-100 grid grid-cols-4 sm:grid-cols-8 gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-medium transition ${
                  isActive
                    ? 'bg-blue-700 text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span>{item.shortLabel}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};

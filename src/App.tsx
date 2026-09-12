import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { HomePortal } from './components/HomePortal';
import { PhoneticsView } from './components/PhoneticsView';
import { ConjugationView } from './components/ConjugationView';
import { VocabView } from './components/VocabView';
import { GrammarView } from './components/GrammarView';
import { FrenchExamView, WrongRecord } from './components/FrenchExamView';
import { MistakesView } from './components/MistakesView';
import { CinemaView } from './components/CinemaView';
import { VipModal } from './components/VipModal';
import { AdminKeyGeneratorModal } from './components/AdminKeyGeneratorModal';
import { WallpaperRewardModal } from './components/WallpaperRewardModal';
import { WallpaperBanner } from './components/WallpaperBanner';
import { ExamRegistrationModal } from './components/ExamRegistrationModal';
import { getLocalLicense, LicenseInfo } from './data/auth/cardKeys';
import { ArrowUp, Home, ShieldCheck, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [license, setLicense] = useState<LicenseInfo | null>(() => getLocalLicense());
  const [isVipModalOpen, setIsVipModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isWallpaperModalOpen, setIsWallpaperModalOpen] = useState<boolean>(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Mistakes state stored in localStorage
  const [mistakes, setMistakes] = useState<WrongRecord[]>(() => {
    try {
      const raw = localStorage.getItem('cs313_fr_mistakes_v1');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Sync mistakes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cs313_fr_mistakes_v1', JSON.stringify(mistakes));
    } catch {
      // Ignore
    }
  }, [mistakes]);

  // Scroll listener for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hash route listener
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as ActiveTab;
      if (['home', 'phonetics', 'conjugation', 'vocab', 'grammar', 'exam', 'delf', 'mistakes', 'cinema'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveMistake = (record: WrongRecord) => {
    setMistakes(prev => {
      const exists = prev.some(m => m.paperId === record.paperId && m.question.id === record.question.id);
      if (exists) return prev;
      return [record, ...prev];
    });
  };

  const handleRemoveMistake = (id: string) => {
    setMistakes(prev => prev.filter(m => m.id !== id));
  };

  const handleClearAllMistakes = () => {
    if (window.confirm('确定要清空错题本吗？')) {
      setMistakes([]);
    }
  };

  const isVip = !!license?.isVip;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#29354A] flex flex-col selection:bg-[#FCECEF] selection:text-[#80142A]">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isVip={isVip}
        license={license}
        onOpenVipModal={() => setIsVipModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenWallpaperModal={() => setIsWallpaperModalOpen(true)}
        onOpenExamModal={() => setIsExamModalOpen(true)}
      />

      {/* 🌟 免费试学模式提示横幅 (未激活状态全局常驻，与日韩版完全统一) */}
      {!isVip && (
        <div className="max-w-6xl mx-auto px-4 pt-2.5 sm:pt-3 w-full min-w-0">
          <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 text-white py-2.5 px-4 sm:px-6 rounded-2xl text-xs font-semibold shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border border-sky-400/30 min-w-0">
            <div className="flex items-start sm:items-center gap-2 min-w-0">
              <Sparkles className="w-4 h-4 shrink-0 text-sky-200 mt-0.5 sm:mt-0" />
              <span className="leading-snug break-words min-w-0">
                当前为【免费试学模式】· 拍下激活码即享 考研二外 241/242 名校全真机考大卷（每年考后持续同步更新）、DELF 欧标模考库、5,000+ 核心词库与影视高光名台词原声精听
              </span>
            </div>
            <button
              onClick={() => setIsVipModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2 sm:py-1 rounded-xl bg-white text-sky-700 font-extrabold hover:bg-sky-50 transition shadow-xs text-xs cursor-pointer shrink-0 text-center whitespace-nowrap"
            >
              输入卡密解锁 →
            </button>
          </div>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1 w-full pb-8">
        {activeTab === 'home' && (
          <HomePortal
            setActiveTab={handleTabChange}
            isVip={isVip}
            onOpenVipModal={() => setIsVipModalOpen(true)}
            onOpenWallpaperModal={() => setIsWallpaperModalOpen(true)}
          />
        )}
        {activeTab !== 'home' && (
          <div className="max-w-6xl mx-auto px-4 pt-2 sm:pt-3 space-y-3 sm:space-y-3.5">
            {activeTab === 'phonetics' && <PhoneticsView />}
            {activeTab === 'conjugation' && <ConjugationView />}
            {activeTab === 'vocab' && <VocabView />}
            {activeTab === 'grammar' && <GrammarView />}
            {(activeTab === 'exam' || activeTab === 'delf') && (
              <FrenchExamView
                isVip={isVip}
                onOpenVipModal={() => setIsVipModalOpen(true)}
                onSaveMistake={handleSaveMistake}
                initialTrack={activeTab === 'delf' ? 'delf' : 'kaoyan'}
                onTrackChange={(track) => {
                  const newTab = track === 'delf' ? 'delf' : 'exam';
                  setActiveTab(newTab);
                  window.location.hash = newTab;
                }}
              />
            )}
            {activeTab === 'mistakes' && (
              <MistakesView
                mistakes={mistakes}
                onRemoveMistake={handleRemoveMistake}
                onClearAll={handleClearAllMistakes}
                onNavigateToExam={() => handleTabChange('exam')}
              />
            )}
            {activeTab === 'cinema' && (
              <CinemaView
                isVip={isVip}
                onOpenVipModal={() => setIsVipModalOpen(true)}
              />
            )}

            {/* 🎁 学员美学福利 · 一子一木 4K 伴学治愈壁纸屋横幅 (二级页面底部统一展示) */}
            <div className="pt-0.5 pb-1">
              <WallpaperBanner onOpenWallpaperModal={() => setIsWallpaperModalOpen(true)} />
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Right Controls */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-center gap-2">
        {activeTab !== 'home' && (
          <button
            onClick={() => handleTabChange('home')}
            className="w-10 h-10 rounded-full bg-white text-[#80142A] shadow-md border border-slate-200/80 hover:bg-[#FCECEF]/50 flex items-center justify-center transition cursor-pointer"
            title="返回首页"
          >
            <Home className="w-4 h-4" />
          </button>
        )}

        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-[#80142A] text-white shadow-md hover:bg-[#680E20] flex items-center justify-center transition cursor-pointer"
            title="回到顶部"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Modals */}
      <VipModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        isVip={isVip}
        license={license}
        onActivated={lic => setLicense(lic)}
      />

      <AdminKeyGeneratorModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      <WallpaperRewardModal
        isOpen={isWallpaperModalOpen}
        onClose={() => setIsWallpaperModalOpen(false)}
      />

      <ExamRegistrationModal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
        onNavigateToExam={() => handleTabChange('exam')}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/90 py-8 px-4 text-center text-xs text-stone-600 space-y-2 mt-8">
        <div className="flex items-center justify-center gap-2 text-[#29354A] font-bold">
          <span className="text-[#80142A]">🇫🇷 CS313 法语研习社</span>
          <span>•</span>
          <span>考研二外与 DELF 全真机考系统</span>
        </div>
        <p className="text-stone-500">
          © 2026 CS313 Study. All rights reserved. 依《消费者权益保护法》第二十五条规范自研提供。
        </p>
      </footer>

    </div>
  );
};

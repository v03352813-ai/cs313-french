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
import { getLocalLicense, LicenseInfo } from './data/auth/cardKeys';
import { ArrowUp, Home, ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [license, setLicense] = useState<LicenseInfo | null>(() => getLocalLicense());
  const [isVipModalOpen, setIsVipModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
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
      if (['home', 'phonetics', 'conjugation', 'vocab', 'grammar', 'exam', 'mistakes', 'cinema'].includes(hash)) {
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
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isVip={isVip}
        license={license}
        onOpenVipModal={() => setIsVipModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-6">
        {activeTab === 'home' && (
          <HomePortal
            setActiveTab={handleTabChange}
            isVip={isVip}
            onOpenVipModal={() => setIsVipModalOpen(true)}
          />
        )}
        {activeTab === 'phonetics' && <PhoneticsView />}
        {activeTab === 'conjugation' && <ConjugationView />}
        {activeTab === 'vocab' && <VocabView />}
        {activeTab === 'grammar' && <GrammarView />}
        {activeTab === 'exam' && (
          <FrenchExamView
            isVip={isVip}
            onOpenVipModal={() => setIsVipModalOpen(true)}
            onSaveMistake={handleSaveMistake}
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
        {activeTab === 'cinema' && <CinemaView />}
      </main>

      {/* Floating Bottom Right Controls */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-center gap-2">
        {activeTab !== 'home' && (
          <button
            onClick={() => handleTabChange('home')}
            className="w-10 h-10 rounded-full bg-white/95 text-slate-700 shadow-md border border-slate-200/80 hover:bg-slate-50 flex items-center justify-center transition"
            title="返回首页"
          >
            <Home className="w-4 h-4" />
          </button>
        )}

        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-blue-700 text-white shadow-md hover:bg-blue-800 flex items-center justify-center transition"
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

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/80 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-2 text-slate-700 font-bold">
          <span>🇫🇷 CS313 法语研习社</span>
          <span>•</span>
          <span>考研二外与 DELF 全真机考系统</span>
        </div>
        <p className="text-slate-400">
          © 2026 CS313 Study. All rights reserved. 依《消费者权益保护法》第二十五条规范自研提供。
        </p>
      </footer>

    </div>
  );
};

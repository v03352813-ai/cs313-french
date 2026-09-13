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
import { AISpeakingView } from './components/AISpeakingView';
import { FrenchWritingView } from './components/FrenchWritingView';
import { VipModal } from './components/VipModal';
import { AdminKeyGeneratorModal } from './components/AdminKeyGeneratorModal';
import { WallpaperRewardModal } from './components/WallpaperRewardModal';
import { WallpaperBanner } from './components/WallpaperBanner';
import { ExamRegistrationModal } from './components/ExamRegistrationModal';
import { getLocalLicense, LicenseInfo } from './data/auth/cardKeys';
import { ArrowUp, Home, ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  name: string;
  children: React.ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[ErrorBoundary - ${this.props.name}] Caught error:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-xl mx-auto my-12 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="font-bold text-slate-800 text-base">学习模块加载异常</p>
          <p className="text-xs text-slate-500 font-mono">{this.state.error?.message}</p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              if (this.props.onReset) this.props.onReset();
            }}
            className="px-5 py-2 rounded-xl bg-[#80142A] text-white text-xs font-bold cursor-pointer hover:bg-[#680E20] transition shadow-xs"
          >
            返回首页重试
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [license, setLicense] = useState<LicenseInfo | null>(() => getLocalLicense());
  const [isVipModalOpen, setIsVipModalOpen] = useState<boolean>(false);
  const [vipModalReason, setVipModalReason] = useState<string>('');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isWallpaperModalOpen, setIsWallpaperModalOpen] = useState<boolean>(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const handleOpenVipModal = (reason?: string) => {
    setVipModalReason(reason || '');
    setIsVipModalOpen(true);
  };

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
      if (['home', 'phonetics', 'conjugation', 'vocab', 'grammar', 'exam', 'delf', 'mistakes', 'cinema', 'speaking', 'writing'].includes(hash)) {
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
        onOpenVipModal={handleOpenVipModal}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenWallpaperModal={() => setIsWallpaperModalOpen(true)}
        onOpenExamModal={() => setIsExamModalOpen(true)}
      />

      {/* VIP Upsell Ribbon for Free Preview Users (未激活前全站每个页面统一呈现，解锁后自动隐藏) */}
      {!isVip && (
        <div className="max-w-6xl mx-auto px-4 pt-2.5 sm:pt-3 w-full min-w-0 animate-fade-in">
          <div className="bg-gradient-to-r from-[#6b0f24] via-[#80142a] to-[#4a0815] text-white py-2.5 px-4 sm:px-6 rounded-2xl text-xs font-semibold shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border border-rose-900/40 min-w-0">
            <div className="flex items-start sm:items-center gap-2.5 min-w-0">
              <Sparkles className="w-4 h-4 shrink-0 text-amber-300 mt-0.5 sm:mt-0 animate-pulse" />
              <span className="leading-snug break-words min-w-0">
                当前为<strong>【免费试学模式】</strong> · 拍下激活码即享 DELF 欧标与全国考研二外全真机考、6,500+ 核心词库与影视高光名台词原声精听
              </span>
            </div>
            <button
              onClick={() => handleOpenVipModal('拍下激活码即享 DELF 欧标与全国考研二外全真机考、6,500+ 核心词库与影视高光名台词原声精听！')}
              className="w-full sm:w-auto px-4 py-1.5 rounded-xl bg-white text-[#80142a] font-extrabold hover:bg-rose-50 transition shadow-xs text-xs cursor-pointer shrink-0 text-center flex items-center justify-center gap-1 hover:scale-105 active:scale-95"
            >
              <span>输入卡密解锁 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1 w-full pb-4 sm:pb-6">
        {activeTab === 'home' && (
          <HomePortal
            setActiveTab={handleTabChange}
            isVip={isVip}
            onOpenVipModal={handleOpenVipModal}
            onOpenWallpaperModal={() => setIsWallpaperModalOpen(true)}
          />
        )}
        {activeTab !== 'home' && (
          <div className="max-w-6xl mx-auto px-4 pt-1.5 sm:pt-2 space-y-2.5 sm:space-y-3">
            <ErrorBoundary key={activeTab} name={activeTab} onReset={() => handleTabChange('home')}>
              {activeTab === 'phonetics' && (
                <PhoneticsView
                  isVip={isVip}
                  onOpenVipModal={handleOpenVipModal}
                />
              )}
              {activeTab === 'conjugation' && (
                <ConjugationView
                  isVip={isVip}
                  onOpenVipModal={handleOpenVipModal}
                />
              )}
              {activeTab === 'vocab' && (
                <VocabView
                  isVip={isVip}
                  onOpenVipModal={handleOpenVipModal}
                />
              )}
              {activeTab === 'grammar' && (
                <GrammarView
                  isVip={isVip}
                  onOpenVipModal={handleOpenVipModal}
                />
              )}
              {(activeTab === 'exam' || activeTab === 'delf') && (
                <FrenchExamView
                  isVip={isVip}
                  onOpenVipModal={handleOpenVipModal}
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
                  isVip={isVip}
                  onOpenVipModal={handleOpenVipModal}
                />
              )}
              {activeTab === 'cinema' && (
                <CinemaView
                  isVip={isVip}
                  onOpenVipModal={handleOpenVipModal}
                />
              )}
              {activeTab === 'speaking' && (
                <AISpeakingView
                  isVip={isVip}
                  onOpenVipModal={handleOpenVipModal}
                />
              )}
              {activeTab === 'writing' && (
                <FrenchWritingView
                  isVip={isVip}
                  onOpenVipModal={handleOpenVipModal}
                />
              )}
            </ErrorBoundary>

            {/* 🎁 学员美学福利 · 一子一木 4K 伴学治愈壁纸屋横幅 (二级页面底部统一展示) */}
            <div className="pt-0 pb-0">
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

      <VipModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        isVip={isVip}
        license={license}
        onActivated={lic => setLicense(lic)}
        reason={vipModalReason}
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
      <footer className="border-t border-slate-200/80 bg-white/90 py-6 px-4 text-center text-xs text-stone-600 space-y-1.5 mt-4 sm:mt-6">
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

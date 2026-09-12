import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Layers, 
  ChevronRight, 
  Award, 
  Eye, 
  EyeOff,
  Flame,
  MessageSquare,
  Bot,
  RefreshCw,
  BarChart3,
  Lock,
  Globe2,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AI_SCENARIOS_DATA, AIScenario, DialogueTurn } from '../data/french/aiScenarios';
import { speakFrench, stopFrenchSpeech } from '../utils/speech';

export interface AISpeakingViewProps {
  isVip?: boolean;
  onOpenVipModal?: (reason?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  name: string;
  avatar: string;
  fr: string;
  zh?: string;
  phonetic?: string;
  grammarTip?: string;
  suggestedResponses?: string[];
  score?: {
    fluency: number;
    grammar: number;
    pronunciation: number;
  };
  feedback?: string;
}

export const AISpeakingView: React.FC<AISpeakingViewProps> = ({ 
  isVip = false, 
  onOpenVipModal 
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('fr_cafe_01');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isAiReplying, setIsAiReplying] = useState<boolean>(false);
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const [showPhonetics, setShowPhonetics] = useState<boolean>(false);
  const [playingAudioFr, setPlayingAudioFr] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const currentScenario = AI_SCENARIOS_DATA.find(s => s.id === selectedScenarioId) || AI_SCENARIOS_DATA[0];

  const categories = [
    { id: 'all', label: '全部场景' },
    { id: 'daily_life', label: '生活实用' },
    { id: 'delf_speaking', label: '欧标冲刺 (B1/B2)' },
    { id: 'travel_transport', label: '出行问路' },
    { id: 'business_work', label: '职场面试' },
    { id: 'social_etiquette', label: '社交礼仪' },
  ];

  const filteredScenarios = AI_SCENARIOS_DATA.filter(s => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  const userTurnsCount = messages.filter(m => m.sender === 'user').length;

  // 免费用户安全防线：非VIP仅可体验首个免费场景 (fr_cafe_01)
  useEffect(() => {
    if (!isVip && selectedScenarioId !== 'fr_cafe_01') {
      setSelectedScenarioId('fr_cafe_01');
    }
  }, [isVip]);

  // 初始化场景对话
  useEffect(() => {
    initScenario(currentScenario);
  }, [selectedScenarioId]);

  const initScenario = (scenario: AIScenario) => {
    const firstTurn = scenario.turns[0];
    const initialMsg: ChatMessage = {
      id: 'msg_init_' + Date.now(),
      sender: 'ai',
      name: firstTurn.speakerName,
      avatar: firstTurn.avatar,
      fr: firstTurn.fr,
      zh: firstTurn.zh,
      phonetic: firstTurn.phonetic,
      grammarTip: firstTurn.grammarTip,
      suggestedResponses: firstTurn.suggestedResponses
    };
    setMessages([initialMsg]);
    setInputText('');
    stopFrenchSpeech();
    // 自动播放欢迎语
    setTimeout(() => {
      handlePlaySpeech(firstTurn.fr);
    }, 400);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiReplying]);

  // 语音播放
  const handlePlaySpeech = async (text: string) => {
    setPlayingAudioFr(text);
    await speakFrench(text, 0.9);
    setPlayingAudioFr(null);
  };

  // 语音识别初始化 (Web Speech API)
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('您的浏览器暂不支持实时语音识别，请直接在输入框打字练习或换用 Chrome 浏览器。');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.onerror = (e: any) => {
        console.warn('[SpeechRec] Error:', e);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('[SpeechRec] Start failed:', err);
      setIsListening(false);
    }
  };

  // 用户发送回复
  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    // 免费体验轮次上限检查（仅支持前 3 轮）
    if (!isVip && userTurnsCount >= 3) {
      onOpenVipModal?.('🎯 您的免费 AI 口语体验轮次已达上限（已体验 3 轮）！升级 VIP 终身卡（仅 ¥49.9），即可享受全站 8 大场景无限次 AI 自由畅聊与巴黎母语对练！');
      return;
    }

    // 随机计算发音与流利度打分
    const fluency = Math.min(98, Math.round(82 + Math.random() * 16));
    const grammar = Math.min(98, Math.round(84 + Math.random() * 14));
    const pronunciation = Math.min(98, Math.round(80 + Math.random() * 18));

    const userMsg: ChatMessage = {
      id: 'msg_user_' + Date.now(),
      sender: 'user',
      name: 'Vous (你)',
      avatar: '🎓',
      fr: text,
      score: { fluency, grammar, pronunciation },
      feedback: fluency > 90 
        ? '发音标准流畅，主谓连读连音自然，用词精准！' 
        : '表达地道清晰！建议注意元音鼻化音（on / an / in）的纯正度。'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsAiReplying(true);

    if (fluency >= 92) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }

    // 模拟 AI 拟人思考回复
    setTimeout(() => {
      setIsAiReplying(false);

      let replyFr = '';
      let replyZh = '';
      let nextSuggestions: string[] = [];
      let grammarTip = '';

      if (currentScenario.id === 'fr_cafe_01') {
        replyFr = 'C\'est bien noté ! Je vous apporte cela tout de suite. Voulez-vous également un verre d\'eau fraîche ou une petite douceur avec votre café ?';
        replyZh = '记好啦！我马上为您送来。您还需要一杯冰水或者配咖啡的法式小甜点吗？';
        grammarTip = '习惯表达：Je vous apporte cela tout de suite. (我马上给您端上来)';
        nextSuggestions = [
          'Non merci, ce sera tout pour le moment.',
          'Oui, une carafe d\'eau s\'il vous plaît, et l\'addition quand vous pourrez.',
          'Qu\'avez-vous comme petites douceurs ?'
        ];
      } else if (currentScenario.id === 'fr_delf_b1_b2_01') {
        replyFr = 'Votre argument est tout à fait pertinent. Cependant, ne pensez-vous pas que la transition écologique risque d\'accentuer les inégalités sociales si les transports alternatifs restent trop onéreux pour les ménages modestes ?';
        replyZh = '您的论点非常有见地。然而，您难道不认为，如果替代性公共交通对低收入家庭而言仍然过于昂贵的话，生态转型可能会加剧社会不平等吗？';
        grammarTip = 'DELF 考官高频追问：Ne pensez-vous pas que + subjonctif / indicatif ?';
        nextSuggestions = [
          'C\'est précisément pour cela que je préconise la gratuité des transports ciblée.',
          'En effet, l\'État doit impérativement subventionner l\'achat de véhicules propres.',
          'Il est vrai qu\'il faut veiller à la justice sociale tout en accélérant les réformes.'
        ];
      } else {
        replyFr = 'Parfait ! J\'ai bien compris votre demande. Avez-vous besoin d\'un autre renseignement ou puis-je faire autre chose pour vous aider ?';
        replyZh = '太好了！我完全理解了您的诉求。您还需要其他信息吗，或者我还能帮您做点什么？';
        grammarTip = '礼貌接待用语：Puis-je faire autre chose pour vous aider ?';
        nextSuggestions = [
          'Non merci, c\'est très clair ! Merci pour votre aide précieuse.',
          'Oui, pouvez-vous me préciser les horaires d\'ouverture ?',
          'Merci beaucoup, bonne journée à vous !'
        ];
      }

      const aiReplyMsg: ChatMessage = {
        id: 'msg_ai_' + Date.now(),
        sender: 'ai',
        name: currentScenario.turns[0].speakerName,
        avatar: currentScenario.turns[0].avatar,
        fr: replyFr,
        zh: replyZh,
        grammarTip,
        suggestedResponses: nextSuggestions
      };

      setMessages(prev => [...prev, aiReplyMsg]);
      handlePlaySpeech(replyFr);
    }, 1200);
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-8">
      {/* 顶部标语 */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCECEF] text-[#80142A] text-xs font-black border border-[#80142A]/20">
            <Bot className="w-3.5 h-3.5 text-[#DDBF78]" />
            <span>巴黎母语级真实语伴 · 1v1 智能对练</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#29354A] tracking-tight flex items-center gap-3">
            <span>AI 口语对练室 (Parler Français)</span>
            <span className="text-xs sm:text-sm px-2.5 py-0.5 rounded-lg bg-rose-50 text-[#80142A] font-bold border border-[#80142A]/30">
              巴黎原声引擎
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            涵盖<strong>巴黎咖啡馆、地铁交通、法式面包房、DELF 考官辩驳与法企面试</strong>，支持跟读打分、双语对照与标准发音示范。
          </p>
        </div>

        {/* 顶部辅助开关 */}
        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <button
            onClick={() => setShowTranslations(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
              showTranslations 
                ? 'bg-[#FCECEF] text-[#80142A] border-[#80142A]/30' 
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            {showTranslations ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>中文译文</span>
          </button>
          <button
            onClick={() => setShowPhonetics(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
              showPhonetics 
                ? 'bg-[#FCECEF] text-[#80142A] border-[#80142A]/30' 
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DDBF78]" />
            <span>国际音标引导</span>
          </button>
          <button
            onClick={() => initScenario(currentScenario)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer border border-slate-200"
            title="重新开启本场景对话"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置对话</span>
          </button>
        </div>
      </div>

      {/* 场景分类胶囊条 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#80142A] text-white shadow-xs'
                : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 场景卡片横向轮播或选择 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredScenarios.map(sc => {
          const isSelected = sc.id === currentScenario.id;
          const isFree = sc.id === 'fr_cafe_01';
          const isLocked = !isVip && !isFree;

          return (
            <div
              key={sc.id}
              onClick={() => {
                if (isLocked) {
                  onOpenVipModal?.(`🔒【${sc.title}】为 VIP 专属口语实训场景！升级 VIP 终身卡（仅 ¥49.9），即可畅享 DELF 欧标实战会话、巴黎生活实操、外企面试与经典影视名场面对戏！`);
                  return;
                }
                setSelectedScenarioId(sc.id);
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-white border-[#80142A] shadow-md ring-2 ring-[#80142A]/20'
                  : isLocked
                  ? 'bg-slate-50/70 border-slate-200/80 hover:border-amber-300 hover:bg-white text-slate-700'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xl">{sc.icon}</span>
                  <div className="flex items-center gap-1.5">
                    {isLocked ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-extrabold bg-amber-100 text-amber-900 border border-amber-300/80 flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5 text-amber-700" />
                        <span>VIP专属</span>
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300/80">
                        免费体验
                      </span>
                    )}
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                      sc.levelTag.includes('B2') 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {sc.levelTag}
                    </span>
                  </div>
                </div>
                <h4 className={`text-xs sm:text-sm font-black leading-snug line-clamp-1 ${
                  isSelected ? 'text-[#80142A]' : 'text-slate-800'
                }`}>
                  {sc.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {sc.description}
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 font-medium border-t border-slate-100 mt-2">
                <span>{sc.categoryLabel}</span>
                {isLocked ? (
                  <span className="text-amber-700 font-bold flex items-center gap-0.5">
                    <Lock className="w-3 h-3" />
                    <span>去解锁</span>
                  </span>
                ) : (
                  <span className="text-[#80142A] font-bold">进入对练 ➜</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 主对话交互舞台 */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col min-h-[560px]">
        {/* 对话舞台顶栏 */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentScenario.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  {currentScenario.title}
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-rose-50 text-[#80142A] font-bold border border-[#80142A]/20">
                  {currentScenario.categoryLabel}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {currentScenario.frenchTitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#DDBF78]" />
            <span>智能多轮交互</span>
          </div>
        </div>

        {/* 消息滚动区 */}
        <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto bg-slate-50/40 max-h-[460px]">
          {messages.map(msg => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${isAi ? 'self-start' : 'self-end ml-auto flex-row-reverse'}`}
              >
                {/* 头像 */}
                <div className="w-9 h-9 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-lg shrink-0">
                  {msg.avatar}
                </div>

                {/* 气泡内容 */}
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 ${isAi ? '' : 'justify-end'}`}>
                    <span className="text-xs font-bold text-slate-700">{msg.name}</span>
                    {isAi && (
                      <button
                        onClick={() => handlePlaySpeech(msg.fr)}
                        className={`p-1 rounded-lg hover:bg-slate-200 transition cursor-pointer ${
                          playingAudioFr === msg.fr ? 'text-[#80142A] animate-pulse' : 'text-slate-500'
                        }`}
                        title="标准法语朗读"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    isAi 
                      ? 'bg-white border border-slate-200 text-slate-800 shadow-xs rounded-tl-xs' 
                      : 'bg-gradient-to-r from-[#80142A] to-[#9E1B32] text-white shadow-sm rounded-tr-xs'
                  }`}>
                    <p className="font-sans font-medium">{msg.fr}</p>

                    {/* 音标 */}
                    {isAi && showPhonetics && msg.phonetic && (
                      <p className="text-xs text-slate-400 font-mono pt-1.5 border-t border-slate-100 mt-1.5">
                        [{msg.phonetic}]
                      </p>
                    )}

                    {/* 中文翻译 */}
                    {isAi && showTranslations && msg.zh && (
                      <p className="text-xs text-slate-500 pt-1.5 border-t border-slate-100 mt-1.5">
                        {msg.zh}
                      </p>
                    )}

                    {/* 语法点拨卡片 */}
                    {isAi && msg.grammarTip && (
                      <div className="mt-2 p-2 rounded-xl bg-[#FCECEF]/60 border border-[#80142A]/20 text-[11px] text-[#80142A] flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 shrink-0 text-[#DDBF78]" />
                        <span>{msg.grammarTip}</span>
                      </div>
                    )}

                    {/* 用户答复即时打分 */}
                    {!isAi && msg.score && (
                      <div className="mt-2.5 pt-2 border-t border-white/20 text-xs space-y-1">
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="font-bold">流利度 {msg.score.fluency}%</span>
                          <span>•</span>
                          <span className="font-bold">语法 {msg.score.grammar}%</span>
                          <span>•</span>
                          <span className="font-bold">发音 {msg.score.pronunciation}%</span>
                        </div>
                        {msg.feedback && (
                          <div className="text-[10px] text-rose-100">
                            💡 {msg.feedback}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 针对上一条 AI 消息推荐的快捷回复胶囊 */}
                  {isAi && msg.suggestedResponses && msg.suggestedResponses.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <div className="text-[10px] font-bold text-slate-400">💡 推荐高频表达（点击直接发送）：</div>
                      <div className="flex flex-col gap-1.5">
                        {msg.suggestedResponses.map((sug, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(sug)}
                            className="text-left text-xs px-3 py-2 rounded-xl bg-white hover:bg-[#FCECEF]/80 text-slate-700 hover:text-[#80142A] border border-slate-200/80 hover:border-[#80142A]/30 transition cursor-pointer shadow-xs flex items-center justify-between group"
                          >
                            <span>{sug}</span>
                            <Send className="w-3 h-3 text-slate-300 group-hover:text-[#80142A] transition shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isAiReplying && (
            <div className="flex items-center gap-2 text-xs text-slate-500 animate-pulse p-2">
              <Bot className="w-4 h-4 text-[#80142A]" />
              <span>巴黎母语 AI 思考中...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* 底部输入控制条 */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 space-y-2">
          {/* Free User Turn Counter Bar */}
          {!isVip && (
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold px-1 pb-1 border-b border-slate-100">
              <span>
                免费体验剩余轮次：
                <span className="text-[#80142A] font-black">{Math.max(0, 3 - userTurnsCount)} / 3 轮</span>
              </span>
              {userTurnsCount >= 3 ? (
                <span 
                  className="text-amber-700 flex items-center gap-1 cursor-pointer hover:underline font-extrabold" 
                  onClick={() => onOpenVipModal?.('🎯 您的免费 AI 口语体验轮次已用完！升级 VIP 终身卡（仅 ¥49.9），即可享受全站无限轮次对练！')}
                >
                  <Lock className="w-3 h-3" /> 点击解锁无限轮次
                </span>
              ) : (
                <span className="text-slate-400">已体验 {userTurnsCount} 轮</span>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* 麦克风录音按钮 */}
            <button
              onClick={toggleListening}
              className={`p-3 rounded-2xl transition cursor-pointer flex items-center justify-center shrink-0 ${
                isListening 
                  ? 'bg-rose-600 text-white animate-pulse shadow-md ring-4 ring-rose-200' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title={isListening ? '点击停止识别' : '按住说话（法语实时识别）'}
            >
              {isListening ? <Mic className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* 文本输入框 */}
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={isListening ? '正在收听法语发音...' : '输入法语回答，或点击上方推荐快捷回复...'}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#80142A] focus:ring-2 focus:ring-[#80142A]/20 transition outline-hidden text-sm text-slate-800 font-sans"
            />

            {/* 发送按钮 */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isAiReplying}
              className={`px-5 py-3 rounded-2xl font-black text-sm flex items-center gap-1.5 transition cursor-pointer shadow-xs shrink-0 ${
                inputText.trim() && !isAiReplying
                  ? 'bg-gradient-to-r from-[#80142A] to-[#9E1B32] text-white hover:shadow-md'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>发送</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Free User Speaking VIP Upsell Banner */}
      {!isVip && (
        <div className="bg-gradient-to-r from-[#80142A] via-[#9E1B32] to-[#80142A] rounded-3xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-rose-900/20">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-1.5 justify-center sm:justify-start font-black text-sm">
              <Sparkles className="w-4 h-4 text-[#DDBF78]" />
              <span>当前正在体验【巴黎咖啡馆点餐 · 免费体验（限3轮）】</span>
            </div>
            <p className="text-xs text-white/90 leading-relaxed">
              开通 VIP 终身卡（仅 ¥49.9），即可解锁 <strong>DELF 欧标全等级口语实战会话</strong>、法企职场面试及 24 小时随身巴黎语伴无限轮次沉浸对练！
            </p>
          </div>
          <button
            onClick={() => onOpenVipModal?.('🎙️ 开通 VIP 终身卡（仅 ¥49.9），即可解锁 DELF 欧标全等级口语会话实战、法企职场面试及 24 小时随身巴黎语伴无限轮次沉浸对练！')}
            className="px-5 py-2.5 rounded-2xl bg-white text-[#80142A] hover:bg-rose-50 font-black text-xs shadow-md transition active:scale-98 shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-[#80142A]" />
            <span>解锁全部口语剧本与无限畅聊 (¥49.9)</span>
          </button>
        </div>
      )}
    </div>
  );
};

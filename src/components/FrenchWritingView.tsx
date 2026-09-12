import React, { useState, useMemo, useEffect } from 'react';
import { 
  PenTool, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Layers, 
  Award, 
  Copy, 
  Check, 
  ArrowRight,
  Lightbulb,
  FileText,
  BarChart3,
  BookMarked,
  ShieldCheck,
  Zap,
  TrendingUp,
  BrainCircuit,
  Lock,
  Globe2,
  GraduationCap,
  AlignLeft,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  FRENCH_WRITING_DATA, 
  FRENCH_WRITING_FORMULAS, 
  FrenchWritingQuestion, 
  FrenchWritingTrack, 
  FrenchWritingType 
} from '../data/french/writingData';

interface FrenchWritingViewProps {
  isVip?: boolean;
  onOpenVipModal?: (reason?: string) => void;
}

interface AICorrectionResult {
  score: number;
  totalScore: number;
  wordCount: number;
  wordCountStatus: 'perfect' | 'too_short' | 'too_long';
  styleIssues: { original: string; corrected: string; explanation: string }[];
  grammarIssues: { original: string; corrected: string; explanation: string }[];
  vocabUpgrades: { original: string; upgrade: string; reason: string }[];
  radarScores: {
    content: number;
    organization: number;
    grammar: number;
    vocabulary: number;
  };
  overallFeedback: string;
}

export const FrenchWritingView: React.FC<FrenchWritingViewProps> = ({ 
  isVip = false, 
  onOpenVipModal 
}) => {
  const [activeTrack, setActiveTrack] = useState<FrenchWritingTrack>('delf');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(isVip ? 'delf-w-b2-01' : 'delf-w-b1-01');
  const [userInputText, setUserInputText] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evalResult, setEvalResult] = useState<AICorrectionResult | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'sample' | 'formulas'>('editor');
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  // Free user safety check: non-VIP cannot access locked writing questions
  useEffect(() => {
    if (!isVip && selectedQuestionId !== 'delf-w-b1-01') {
      if (activeTrack !== 'delf') {
        setActiveTrack('delf');
      }
      setSelectedQuestionId('delf-w-b1-01');
    }
  }, [isVip]);

  // Filter questions by track
  const filteredQuestions = useMemo(() => {
    return FRENCH_WRITING_DATA.filter(q => q.track === activeTrack);
  }, [activeTrack]);

  // Current question
  const currentQ: FrenchWritingQuestion = useMemo(() => {
    return filteredQuestions.find(q => q.id === selectedQuestionId) || filteredQuestions[0] || FRENCH_WRITING_DATA[0];
  }, [filteredQuestions, selectedQuestionId]);

  // Keep selected ID in sync when changing track
  useEffect(() => {
    if (filteredQuestions.length > 0 && !filteredQuestions.some(q => q.id === selectedQuestionId)) {
      setSelectedQuestionId(filteredQuestions[0].id);
      setUserInputText('');
      setEvalResult(null);
    }
  }, [activeTrack, filteredQuestions, selectedQuestionId]);

  // Calculate word count for French
  const wordCount = useMemo(() => {
    const text = userInputText.trim();
    if (!text) return 0;
    // Count french words separated by spaces or apostrophes
    return text.split(/[\s'’]+/).filter(w => w.length > 0).length;
  }, [userInputText]);

  // Word count status
  const wordCountStatus = useMemo(() => {
    if (wordCount === 0) return 'too_short';
    if (wordCount < currentQ.minWords) return 'too_short';
    if (wordCount > currentQ.maxWords) return 'too_long';
    return 'perfect';
  }, [wordCount, currentQ]);

  // AI Evaluation Simulation
  const handleAIEvaluation = () => {
    if (!userInputText.trim()) return;

    const isFree = currentQ.id === 'delf-w-b1-01';
    const isLocked = !isVip && !isFree;
    if (isLocked) {
      onOpenVipModal?.(`🔒【${currentQ.title}】为 VIP 专属高阶写作！升级 VIP 终身卡（仅 ¥49.9），即可享受 AI 考官多维诊断精批与满分范文拆解！`);
      return;
    }

    setIsEvaluating(true);
    setEvalResult(null);

    setTimeout(() => {
      setIsEvaluating(false);

      const ratio = Math.min(1, Math.max(0.6, wordCount / currentQ.minWords));
      const hasSubjunctive = /soit|prenions|ayons|soyons|fassions|puissions|puisse|veuille/i.test(userInputText);
      const hasFormality = /Monsieur le Maire|Madame|considération|permet|indéniable/i.test(userInputText);
      
      let baseScore = Math.round(currentQ.score * ratio * 0.85);
      if (hasSubjunctive) baseScore += 2;
      if (hasFormality) baseScore += 2;
      const finalScore = Math.min(currentQ.score, Math.max(14, baseScore));

      const isHigh = finalScore >= (currentQ.score * 0.8);

      if (isHigh) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 }
        });
      }

      setEvalResult({
        score: finalScore,
        totalScore: currentQ.score,
        wordCount,
        wordCountStatus,
        styleIssues: [
          {
            original: 'Je veux vous dire...',
            corrected: 'Je me permets de vous adresser cette lettre afin de vous exposer...',
            explanation: '在正式行政信函（Lettre formelle）中，避免使用直白的 je veux，换用 je me permets de 尽显高阶修养。'
          }
        ],
        grammarIssues: [
          {
            original: 'il est nécessaire que nous faisons',
            corrected: 'il est nécessaire que nous fassions',
            explanation: 'il est nécessaire que 从句后必须使用虚拟式（Subjonctif），faire 变位为 fassions。'
          }
        ],
        vocabUpgrades: currentQ.advancedVocab.slice(0, 3).map(v => ({
          original: v.word,
          upgrade: v.replacement,
          reason: `用「${v.replacement}」替换通俗词「${v.word}」，语言丰富度立即跃升一个档次。`
        })),
        radarScores: {
          content: Math.min(95, Math.round(75 + Math.random() * 20)),
          organization: Math.min(95, Math.round(78 + Math.random() * 18)),
          grammar: hasSubjunctive ? 92 : 82,
          vocabulary: 86
        },
        overallFeedback: isHigh 
          ? `极佳的法语论述！篇章逻辑链条清晰，连接词衔接自然。建议在倒数第二段多使用 1 处条件式委婉提议（如 Il conviendrait de...），使论证更具说服力。`
          : `习作已初具雏形，基本观点均有阐述。需特别注意：1. 字数需满足要求（当前 ${wordCount} 词）；2. 正式信函请严格保留信头与致敬客套语；3. 注意虚拟式与分词性数配合。`
      });
    }, 1400);
  };

  const handleCopyFormula = (fr: string) => {
    navigator.clipboard.writeText(fr);
    setCopiedFormula(fr);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  const handleInsertSample = () => {
    setUserInputText(currentQ.sampleAnswer);
  };

  const handleInsertStructureTemplate = () => {
    if (currentQ.formalStructure) {
      const template = `${currentQ.formalStructure.sender || ''}\n\n${currentQ.formalStructure.recipient || ''}\n\n${currentQ.formalStructure.datePlace || ''}\n\n${currentQ.formalStructure.objet || ''}\n\nMonsieur le Maire,\n\n[在此阐明写信事由与背景...]\n\n[在此提出核心论点一与论据...]\n\n[在此提出替代对策与建议...]\n\n${currentQ.formalStructure.formulaPolitesse || ''}\n\n[Votre Nom]`;
      setUserInputText(template);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-8">
      {/* 顶部标语与赛道双轨切换 */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCECEF] text-[#80142A] text-xs font-black border border-[#80142A]/20">
            <PenTool className="w-3.5 h-3.5 text-[#DDBF78]" />
            <span>智能逐句批改 · 考点雷达 · 范文升格</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#29354A] tracking-tight flex items-center gap-3">
            <span>法语 AI 写作工坊</span>
            <span className="text-xs sm:text-sm px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              双轨专属引擎
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            提供 <strong>DELF 欧标公函/论述</strong> 与 <strong>考研二外命题/汉译法</strong> 两大赛道，智能评测词数、语法变位与格式规范。
          </p>
        </div>

        {/* 双轨大药丸切换 */}
        <div className="inline-flex p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 self-start md:self-auto shadow-inner">
          <button
            onClick={() => setActiveTrack('delf')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTrack === 'delf'
                ? 'bg-gradient-to-r from-[#80142A] to-[#9E1B32] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>DELF 欧标写作 (B1/B2)</span>
          </button>
          <button
            onClick={() => setActiveTrack('kaoyan')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeTrack === 'kaoyan'
                ? 'bg-gradient-to-r from-[#80142A] to-[#9E1B32] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>考研二外写作 (真题/汉译法)</span>
          </button>
        </div>
      </div>

      {/* 题目选择横条 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredQuestions.map(q => {
          const isSelected = q.id === currentQ.id;
          const isFree = q.id === 'delf-w-b1-01';
          const isLocked = !isVip && !isFree;

          return (
            <div
              key={q.id}
              onClick={() => {
                if (isLocked) {
                  onOpenVipModal?.(`🔒【${q.title}】为 VIP 专属高阶写作！升级 VIP 终身卡（仅 ¥49.9），即可解锁 DELF B2 正式公函、考研命题小论文与汉译法名师精批！`);
                  return;
                }
                setSelectedQuestionId(q.id);
                setEvalResult(null);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                isSelected
                  ? 'bg-[#FCECEF]/40 border-[#80142A] shadow-sm ring-1 ring-[#80142A]/30'
                  : isLocked
                  ? 'bg-slate-50/70 border-slate-200/80 hover:border-amber-300 hover:bg-white text-slate-700'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {isLocked ? (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300/80 flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5 text-amber-700" /> VIP专属
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300/80">
                        免费体验
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                      {q.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60">
                      {q.level}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      字数要求: {q.wordCountLimit}
                    </span>
                  </div>
                  <h3 className={`text-sm font-bold leading-snug ${isSelected ? 'text-[#80142A]' : 'text-slate-800'}`}>
                    {q.title}
                  </h3>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-xs font-black text-[#80142A]">满分 {q.score}分</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 题目详情与任务引导 */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-[#80142A] uppercase tracking-wider">Sujet d'écriture</span>
            <h2 className="text-lg sm:text-xl font-black text-[#29354A]">
              {currentQ.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-[#80142A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ✍️ 写作工坊
            </button>
            <button
              onClick={() => setActiveTab('sample')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'sample'
                  ? 'bg-[#80142A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              📖 高分范文
            </button>
            <button
              onClick={() => setActiveTab('formulas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'formulas'
                  ? 'bg-[#80142A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ✨ 万能句式 ({FRENCH_WRITING_FORMULAS.length}类)
            </button>
          </div>
        </div>

        {/* 题目说明 */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed font-sans">
          {currentQ.prompt}
        </div>

        {/* TAB 1: 写作编辑器与评测 */}
        {activeTab === 'editor' && (
          <div className="space-y-4 pt-2">
            {/* 辅助工具快捷栏 */}
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">实时字数：</span>
                <span className={`px-2 py-0.5 rounded-md font-mono font-bold ${
                  wordCountStatus === 'perfect' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : wordCountStatus === 'too_short' 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-rose-100 text-rose-800'
                }`}>
                  {wordCount} mots ({currentQ.wordCountLimit})
                </span>
                {wordCountStatus === 'too_short' && wordCount > 0 && (
                  <span className="text-amber-600 font-medium hidden sm:inline">字数偏少，建议再补充论据</span>
                )}
                {wordCountStatus === 'perfect' && (
                  <span className="text-emerald-600 font-medium hidden sm:inline">字数达标，处于黄金区间</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {currentQ.formalStructure && (
                  <button
                    onClick={handleInsertStructureTemplate}
                    className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 font-medium transition cursor-pointer flex items-center gap-1 border border-purple-200"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>插入公函信头骨架</span>
                  </button>
                )}
                <button
                  onClick={handleInsertSample}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium transition cursor-pointer flex items-center gap-1 border border-blue-200"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>填入范文体验批改</span>
                </button>
                {userInputText && (
                  <button
                    onClick={() => {
                      setUserInputText('');
                      setEvalResult(null);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium transition cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>清空</span>
                  </button>
                )}
              </div>
            </div>

            {/* 输入文本框 */}
            <div className="relative">
              <textarea
                value={userInputText}
                onChange={e => setUserInputText(e.target.value)}
                placeholder="Rédigez votre texte en français ici (在此输入您的法文草稿，或点击上方「插入公函信头骨架」快速构架)..."
                rows={12}
                className="w-full p-4 sm:p-5 rounded-2xl bg-white border border-slate-300 focus:border-[#80142A] focus:ring-2 focus:ring-[#80142A]/20 transition outline-hidden text-sm sm:text-base text-slate-800 leading-relaxed font-sans shadow-inner resize-y"
              />
            </div>

            {/* 提交评测按钮 */}
            <div className="flex items-center justify-between pt-1">
              <div className="text-xs text-slate-500">
                支持检测：动词变位、主谓配合、虚拟式/条件式踩分、正式公函格式
              </div>
              <button
                onClick={handleAIEvaluation}
                disabled={isEvaluating || !userInputText.trim()}
                className={`px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                  isEvaluating || !userInputText.trim()
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#80142A] to-[#9E1B32] text-white hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                {isEvaluating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-[#DDBF78]" />
                    <span>AI 考官逐句深度批改中...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#DDBF78]" />
                    <span>启动 AI 考官多维批改 ({currentQ.score}分制)</span>
                  </>
                )}
              </button>
            </div>

            {/* 评测结果展示区 */}
            {evalResult && (
              <div className="mt-6 p-5 sm:p-6 rounded-3xl bg-slate-50/80 border border-slate-200 space-y-6 animate-fadeIn">
                {/* 顶部得分看板 */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#FCECEF] flex flex-col items-center justify-center border border-[#80142A]/20">
                      <span className="text-2xl font-black text-[#80142A] leading-none">
                        {evalResult.score}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold">
                        /{evalResult.totalScore} 分
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-slate-900">
                          {evalResult.score >= evalResult.totalScore * 0.8 ? '🎉 优秀习作 (Niveau Atteint)' : '📈 良好 (En Progrès)'}
                        </h4>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                          实测词数: {evalResult.wordCount} 词
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 max-w-xl">
                        {evalResult.overallFeedback}
                      </p>
                    </div>
                  </div>

                  {/* 四维能力雷达得分柱 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:w-auto">
                    <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-[10px] text-slate-500 font-bold">任务完成</div>
                      <div className="text-sm font-black text-slate-800">{evalResult.radarScores.content}%</div>
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-[10px] text-slate-500 font-bold">逻辑结构</div>
                      <div className="text-sm font-black text-slate-800">{evalResult.radarScores.organization}%</div>
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-[10px] text-slate-500 font-bold">语法配合</div>
                      <div className="text-sm font-black text-slate-800">{evalResult.radarScores.grammar}%</div>
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-[10px] text-slate-500 font-bold">高阶词汇</div>
                      <div className="text-sm font-black text-slate-800">{evalResult.radarScores.vocabulary}%</div>
                    </div>
                  </div>
                </div>

                {/* 逐句修改与避坑 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* 语法与句式诊断 */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black text-amber-700">
                      <AlertTriangle className="w-4 h-4" />
                      <span>语法变位与格式诊断 (Points d'amélioration)</span>
                    </div>
                    {evalResult.grammarIssues.map((issue, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs space-y-1">
                        <div className="text-rose-700 line-through font-mono">{issue.original}</div>
                        <div className="text-emerald-700 font-bold font-mono">➜ {issue.corrected}</div>
                        <div className="text-slate-600 text-[11px] pt-1">{issue.explanation}</div>
                      </div>
                    ))}
                    {evalResult.styleIssues.map((issue, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-purple-50/50 border border-purple-200/60 text-xs space-y-1">
                        <div className="text-slate-600">{issue.original}</div>
                        <div className="text-purple-700 font-bold font-mono">➜ {issue.corrected}</div>
                        <div className="text-slate-600 text-[11px] pt-1">{issue.explanation}</div>
                      </div>
                    ))}
                  </div>

                  {/* 高分升级建议 */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black text-[#80142A]">
                      <Sparkles className="w-4 h-4 text-[#DDBF78]" />
                      <span>表达升格建议 (Vocabulaire Enrichi)</span>
                    </div>
                    {evalResult.vocabUpgrades.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#FCECEF]/40 border border-[#80142A]/20 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">通俗词：{item.original}</span>
                          <span className="text-[#80142A] font-black">地道升级 ➜ {item.upgrade}</span>
                        </div>
                        <div className="text-slate-600 text-[11px] pt-1">{item.reason}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: 高分范文精析 */}
        {activeTab === 'sample' && (
          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#80142A] uppercase tracking-wider">Modèle de Référence (满分样作)</span>
                <button
                  onClick={() => handleCopyFormula(currentQ.sampleAnswer)}
                  className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 transition cursor-pointer font-bold"
                >
                  {copiedFormula === currentQ.sampleAnswer ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">已复制全文</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>一键复制全文</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-line shadow-inner">
                {currentQ.sampleAnswer}
              </div>
            </div>

            {/* 范文精析与踩分考点 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-3">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#DDBF78]" />
                <span>名师考官阅卷点评与核心考点解析</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-sans">
                {currentQ.sampleAnalysis}
              </p>
            </div>

            {/* 北外教研：文体规范对比指南 (DELF公函 vs 考研二外议论文) */}
            {currentQ.genreComparisonNotice && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border border-indigo-200/80 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-black text-indigo-900">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>【北外名师导学】文体规范与踩分导向对比 (Guide stylistique)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-indigo-100 space-y-1">
                    <span className="font-extrabold text-[#80142A] block">🌍 DELF 欧标公函规范导向：</span>
                    <p className="text-slate-600 leading-relaxed">{currentQ.genreComparisonNotice.delfFocus}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-indigo-100 space-y-1">
                    <span className="font-extrabold text-indigo-900 block">🏛️ 名校考研二外议论文导向：</span>
                    <p className="text-slate-600 leading-relaxed">{currentQ.genreComparisonNotice.kaoyanFocus}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 北外考研阅卷评分细则与采分点拆解 (Grille d'évaluation) */}
            {currentQ.gradingCriteria && currentQ.gradingCriteria.length > 0 && (
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#80142A]" />
                    <h4 className="text-sm font-black text-slate-900">
                      北外二外考研阅卷评分细则 (Grille de notation officielle)
                    </h4>
                  </div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-50 text-[#80142A] font-bold border border-[#80142A]/20">
                    踩点给分 · 扣分雷区透明化
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 font-black border-b border-slate-200">
                        <th className="p-2.5 w-1/4">采分考核项</th>
                        <th className="p-2.5 w-16 text-center">分值</th>
                        <th className="p-2.5 w-1/2">阅卷给分标准 (Règle)</th>
                        <th className="p-2.5 w-1/3 text-rose-700">典型扣分陷阱 (Piège)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentQ.gradingCriteria.map((gc, gcIdx) => (
                        <tr key={gcIdx} className="hover:bg-slate-50/60 transition">
                          <td className="p-2.5 font-bold text-slate-900">{gc.point}</td>
                          <td className="p-2.5 text-center font-black text-[#80142A]">{gc.score}</td>
                          <td className="p-2.5 text-slate-700 leading-relaxed">{gc.rule}</td>
                          <td className="p-2.5 text-rose-600 font-medium leading-relaxed bg-rose-50/30">{gc.penaltyTrap}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: 万能句型库 */}
        {activeTab === 'formulas' && (
          <div className="space-y-4 pt-2">
            <div className="text-xs text-slate-500">
              点击右侧复制按钮即可快速将高分短语填入草稿箱中：
            </div>
            {FRENCH_WRITING_FORMULAS.map((group, gIdx) => (
              <div key={gIdx} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div>
                  <h4 className="text-sm font-black text-[#80142A]">{group.category}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{group.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {group.formulas.map((f, fIdx) => (
                    <div key={fIdx} className="p-3 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-3 hover:border-[#80142A]/30 transition">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-slate-900 font-sans">{f.fr}</div>
                        <div className="text-xs text-slate-600">{f.zh}</div>
                        <div className="text-[11px] text-[#80142A] font-medium">💡 用法指引: {f.usage}</div>
                      </div>
                      <button
                        onClick={() => handleCopyFormula(f.fr)}
                        className="shrink-0 p-2 rounded-lg bg-slate-100 hover:bg-[#FCECEF] text-slate-600 hover:text-[#80142A] transition cursor-pointer"
                        title="复制法语句型"
                      >
                        {copiedFormula === f.fr ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Free User Writing VIP Upsell Banner */}
      {!isVip && (
        <div className="bg-gradient-to-r from-[#80142A] via-[#9E1B32] to-[#80142A] rounded-3xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-rose-900/20">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-1.5 justify-center sm:justify-start font-black text-sm">
              <Sparkles className="w-4 h-4 text-[#DDBF78]" />
              <span>当前正在体验【DELF B1 观点阐述 · 免费试写精批】</span>
            </div>
            <p className="text-xs text-white/90 leading-relaxed">
              开通 VIP 终身卡（仅 ¥49.9），即可解锁 <strong>DELF B2 正式行政公函</strong>、考研二外高分命题作文与名校汉译法逐句深度精批！
            </p>
          </div>
          <button
            onClick={() => onOpenVipModal?.('✍️ 开通 VIP 终身卡（仅 ¥49.9），即可解锁 DELF B2 正式行政公函、考研二外高分命题作文与名校汉译法逐句深度精批！')}
            className="px-5 py-2.5 rounded-2xl bg-white text-[#80142A] hover:bg-rose-50 font-black text-xs shadow-md transition active:scale-98 shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-[#80142A]" />
            <span>解锁全部高分写作题库与 AI 精批 (¥49.9)</span>
          </button>
        </div>
      )}
    </div>
  );
};

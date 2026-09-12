import React, { useState } from 'react';
import { 
  RotateCcw, 
  Search, 
  Volume2, 
  Sparkles, 
  Check, 
  BookOpen, 
  Lightbulb, 
  ArrowRight, 
  Info, 
  Lock, 
  KeyRound,
  ChevronDown,
  ChevronUp,
  Headphones,
  Ear,
  AlertCircle
} from 'lucide-react';
import { FRENCH_VERBS, TENSES_METADATA, VerbItem, TenseKey } from '../data/french/conjugation';

interface ConjugationViewProps {
  isVip?: boolean;
  onOpenVipModal?: (reason?: string) => void;
}

export const ConjugationView: React.FC<ConjugationViewProps> = ({
  isVip = false,
  onOpenVipModal
}) => {
  const [selectedVerb, setSelectedVerb] = useState<VerbItem>(FRENCH_VERBS[0]);
  const [selectedTense, setSelectedTense] = useState<TenseKey>('present');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingText, setPlayingText] = useState<string | null>(null);
  const [showHatGuide, setShowHatGuide] = useState<boolean>(true);

  // 基础免费动词（前 4 大基石动词）
  const freeVerbIds = ['etre', 'avoir', 'aller', 'faire'];
  // 基础免费时态（现在时、复合过去时）
  const freeTenseKeys: TenseKey[] = ['present', 'passe_compose'];

  const filteredVerbs = FRENCH_VERBS.filter(v => 
    v.infinitive.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.meaning.includes(searchQuery)
  );

  const currentTenseMeta = TENSES_METADATA.find(t => t.key === selectedTense)!;
  const currentForms = selectedVerb.tenses[selectedTense] || selectedVerb.tenses['present']!;

  const playSpeech = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      setPlayingText(text);
      utterance.onend = () => setPlayingText(null);
      utterance.onerror = () => setPlayingText(null);
      window.speechSynthesis.speak(utterance);
    } catch {
      setPlayingText(null);
    }
  };

  const persons = [
    { key: 'je', pronoun: "je / j'", data: currentForms.je },
    { key: 'tu', pronoun: 'tu', data: currentForms.tu },
    { key: 'il_elle', pronoun: 'il / elle / on', data: currentForms.il_elle },
    { key: 'nous', pronoun: 'nous', data: currentForms.nous },
    { key: 'vous', pronoun: 'vous', data: currentForms.vous },
    { key: 'ils_elles', pronoun: 'ils / elles', data: currentForms.ils_elles },
  ];

  // 动态分析当前动词与所选时态的变位推导机制 (告别公式与动词矛盾问题)
  const getDynamicDerivation = () => {
    const is3rd = selectedVerb.group === '3rd_irregular';
    const is1st = selectedVerb.group === '1st_er';
    const is2nd = selectedVerb.group === '2nd_ir';

    if (selectedTense === 'present') {
      if (is3rd) {
        let irregularNote = "本词为古拉丁语核心基石动词，词根发生根本性变异，不套用常规 -e/-es 规则，请作为独立骨架熟记！";
        if (selectedVerb.id === 'etre') {
          irregularNote = "法语第 1 基石动词 (英语 be 动词)：je suis, tu es, il est, nous sommes, vous êtes, ils sont。全法语最高频核心，直接当独立形态记忆！";
        } else if (selectedVerb.id === 'avoir') {
          irregularNote = "法语第 2 基石动词 (英语 have)：j'ai, tu as, il a, nous avons, vous avez, ils ont。同时也是复合过去时最重要的助动词！";
        } else if (selectedVerb.id === 'aller') {
          irregularNote = "位移核心动词 (英语 go)：je vais, tu vas, il va, nous allons, vous allez, ils vont。常用于最近将来时 (aller + 原形)！";
        } else if (selectedVerb.id === 'faire') {
          irregularNote = "万能行动动词 (英语 do/make)：je fais, tu fais, il fait, nous faisons, vous faites, ils font。特别注意 vous 为 faites，ils 为 font！";
        }
        return {
          badge: '⚠️ 第 3 组基石特异动词 · 完全异化',
          badgeClass: 'bg-purple-50 text-purple-900 border-purple-200/80',
          step1Title: '四大天王 · 古拉丁语基石',
          step1Desc: `词根完全变异（如「${selectedVerb.infinitive}」➔ 独立形态），不穿常规外衣`,
          formula: '古拉丁语特异形态变位（不套用规则 -e/-es 后缀，作为独立核心词牢记）',
          explanation: irregularNote,
          warning: selectedVerb.id === 'etre' 
            ? '🚨 连音连诵预警：vous êtes 中间的 s 要与后面的 ê 连音连诵，发 [z] 音（读作 [vu-zεt]）！'
            : selectedVerb.id === 'avoir'
            ? '🚨 连音省音预警：第一人称遇元音省音为 j\'ai；vous avez [vu-zave]、ils ont [il-zõ] 均发生连诵！'
            : '🚨 避坑提示：第 3 组动词日常使用频率达 70% 以上，作为独立基础词刻进记忆！'
        };
      }

      if (is1st) {
        const stem = selectedVerb.infinitive.slice(0, -2);
        return {
          badge: '✨ 第 1 组规则动词 · 脱帽换衣派',
          badgeClass: 'bg-emerald-50 text-emerald-900 border-emerald-200/80',
          step1Title: '摘掉原形帽子 -er',
          step1Desc: `原形「${selectedVerb.infinitive}」脱掉 -er ➔ 锁定词根「${stem}-」`,
          formula: `词根 (${stem}-) + 6 件人称外衣 (-e, -es, -e, -ons, -ez, -ent)`,
          explanation: `摘掉原形帽子 -er，保留词根「${stem}」，根据主语人称穿上新外衣：je ${stem}e, tu ${stem}es, il ${stem}e, nous ${stem}ons, vous ${stem}ez, ils ${stem}ent。`,
          warning: '👂 听力破壁神技：je / tu / il / ils 四个人称词尾全部静音，发音 100% 一模一样！-ent 绝对不发音！'
        };
      }

      if (is2nd) {
        const stem = selectedVerb.infinitive.slice(0, -2);
        return {
          badge: '✨ 第 2 组规则动词 · 双 s 家族',
          badgeClass: 'bg-sky-50 text-sky-900 border-sky-200/80',
          step1Title: '摘掉原形帽子 -ir',
          step1Desc: `原形「${selectedVerb.infinitive}」脱掉 -ir ➔ 锁定词根「${stem}-」`,
          formula: `词根 (${stem}-) + 人称外衣 (-is, -is, -it, -issons, -issez, -issent)`,
          explanation: `摘掉原形帽子 -ir，保留词根「${stem}」，单数穿 -is/-it，复数 nous/vous/ils 必须带上标志性的双胞胎 -iss- 家族外衣！`,
          warning: '👂 发音秘诀：复数人称带 -iss-，nous finissons [-sõ], vous finissez [-se], ils finissent [-s]！'
        };
      }
    }

    if (selectedTense === 'passe_compose') {
      const isEtreAux = selectedVerb.auxiliary === 'être';
      return {
        badge: '✨ 复合过去时推导法则',
        badgeClass: 'bg-rose-50 text-[#80142A] border-rose-200/80',
        step1Title: `锁定助动词与分词`,
        step1Desc: `助动词 ${selectedVerb.auxiliary} (现在时) + 过去分词「${selectedVerb.participle}」`,
        formula: `助动词 ${selectedVerb.auxiliary} (直陈式现在时) + 过去分词 (${selectedVerb.participle})`,
        explanation: isEtreAux
          ? `⚠️ 本词为位移/状态核心动词，助动词必须使用 être！特别注意：过去分词必须随主语性数进行配合（如 allé / allée / allés / allées）！`
          : `绝大多数动作及物动词统一采用 avoir 作为助动词，过去分词为「${selectedVerb.participle}」，通常不发生性数配合。`,
        warning: isEtreAux 
          ? '🚨 考点大雷区：用 être 作助动词时，阴性加 -e，复数加 -s！'
          : '💡 提示：助动词与主语代词常发生省音（如 j\'ai）或连音（如 vous avez）！'
      };
    }

    return {
      badge: `✨ ${currentTenseMeta.label} 语法法则`,
      badgeClass: 'bg-slate-50 text-slate-800 border-slate-200/80',
      step1Title: '提取时态词根',
      step1Desc: `根据时态规则提取词根并装配人称词尾`,
      formula: currentTenseMeta.formula,
      explanation: currentTenseMeta.usage,
      warning: '💡 提示：点击卡片右侧扬声器即可聆听标准真人拼读，重点感受词根与后缀发音！'
    };
  };

  const derivation = getDynamicDerivation();

  // 获取每张人称卡片的发音与避坑小注脚
  const getPersonPhoneticNote = (personKey: string) => {
    if (selectedTense === 'present') {
      if (selectedVerb.group === '1st_er') {
        if (['je', 'tu', 'il_elle'].includes(personKey)) {
          return '词尾静音';
        }
        if (personKey === 'ils_elles') {
          return '🚨 -ent 静音 · 读音全同单数';
        }
        if (personKey === 'nous') return '发音 [-on]';
        if (personKey === 'vous') return '发音 [-e]';
      }
      if (selectedVerb.id === 'etre' && personKey === 'vous') {
        return '连音读 [z] (vous-z-êtes)';
      }
      if (selectedVerb.id === 'avoir') {
        if (personKey === 'je') return '元音省音 j\'';
        if (['nous', 'vous', 'ils_elles'].includes(personKey)) return '连音读 [z]';
      }
      if (selectedVerb.group === '2nd_ir') {
        if (['nous', 'vous', 'ils_elles'].includes(personKey)) return '双s发音 [-iss-]';
      }
    }
    return null;
  };

  return (
    <div className="space-y-4 pb-0">
      
      {/* ========================================================================= */}
      {/* 🎩 独家自研教学法 · 法语动词变位【脱帽换衣法则】1分钟秒懂看板 (浅色优雅高质感) */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-white via-rose-50/35 to-amber-50/20 rounded-3xl p-5 sm:p-6 border border-rose-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#80142A] border border-rose-200/70 flex items-center justify-center text-base shadow-2xs">
                🎩
              </span>
              <h2 className="text-lg sm:text-xl font-black text-[#29354A] tracking-tight flex items-center gap-2">
                <span>独家自研教学法 · 法语动词变位【脱帽换衣法则】</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 font-bold text-xs shadow-2xs">
                彻底告别死记硬背 · 1分钟秒懂
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              <strong className="text-[#80142A]">核心心法：</strong>85% 以上的法语动词都是极守规矩的<strong>【脱帽换衣派】</strong>！摘掉原形词尾帽子（-er / -ir），按人称换上新衣服！更有听力绝密：<strong>四个人称发音竟然完全一样！</strong>
            </p>
          </div>

          <button
            onClick={() => setShowHatGuide(!showHatGuide)}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer border border-slate-200/80 shadow-2xs"
          >
            {showHatGuide ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
            <span>{showHatGuide ? '收起法则说明' : '展开法则说明'}</span>
          </button>
        </div>

        {showHatGuide && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-rose-100/90 animate-in fade-in duration-300">
            {/* Card 1 */}
            <div className="bg-white/95 p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 hover:border-emerald-300 hover:shadow-xs transition">
              <div className="flex items-center gap-2 font-black text-sm text-emerald-900">
                <span>🏢 1. 认清三大门派格局 (85% 极守规矩)</span>
              </div>
              <ul className="text-xs text-slate-600 leading-relaxed font-medium space-y-1.5">
                <li>• <strong className="text-emerald-800 font-bold">第 1 组 (-er 结尾，占 85%+)</strong>：规则大户，脱掉 -er 帽子换 6 套人称外衣 (如 parler, aimer)。</li>
                <li>• <strong className="text-sky-800 font-bold">第 2 组 (-ir 结尾，占 10%)</strong>：双胞胎家族，复数人称全部带有标志性 <strong className="text-sky-700 font-bold">-iss-</strong> (如 finir, choisir)。</li>
                <li>• <strong className="text-purple-800 font-bold">第 3 组 (不规则，占 5% 但最常用)</strong>：四大天王 (être/avoir/aller/faire)，古拉丁语遗存，完全异化，作为独立单词直接记忆！</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white/95 p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 hover:border-amber-300 hover:shadow-xs transition">
              <div className="flex items-center gap-2 font-black text-sm text-amber-900">
                <span>🎩 2. 核心心法【脱帽换衣】怎么变？</span>
              </div>
              <ul className="text-xs text-slate-600 leading-relaxed font-medium space-y-1.5">
                <li>• <strong className="text-slate-900 font-bold">第①步 摘掉帽子</strong>：原形动词砍掉词尾（如 parler 去掉 -er 得到词干 <code className="text-[#80142A] font-bold">parl-</code>）。</li>
                <li>• <strong className="text-slate-900 font-bold">第②步 穿上人称新衣 (现在时)</strong>：
                  <div className="mt-1 text-[#80142A] font-mono text-[11px] bg-rose-50/80 p-1.5 rounded-lg border border-rose-200/60 leading-normal">
                    第1组: -e, -es, -e, -ons, -ez, -ent<br/>
                    第2组: -is, -is, -it, -issons, -issez, -issent
                  </div>
                </li>
                <li>• <strong className="text-purple-800 font-bold">四大天王不换衣</strong>：属于语言祖先，直接记忆特异形态（如 être 的 suis, es, est...）！</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white/95 p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 hover:border-rose-300 hover:shadow-xs transition">
              <div className="flex items-center gap-2 font-black text-sm text-[#80142A]">
                <span>👂 3. 听力破壁神技：写有6种，听只有3种！</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                初学者千万别被 6 种拼写吓倒！在第 1 组动词中：<br />
                • <strong className="text-rose-800 font-bold">je / tu / il / ils 四个人称词尾全部不发音！</strong><br />
                • <span className="bg-amber-100 text-amber-950 font-bold px-1 rounded">⚠️ 尤其 -ent 绝对不发音！完全静音！</span><br />
                • parle、parles、parle、parlent <strong>读音 100% 一模一样 (全读 [parl])</strong>！全动词只听到 3 种发音（[parl], [parl-on], [parl-e]），口语变位秒杀一切恐惧！
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (4 cols): Verb Selection List */}
        <div className="lg:col-span-4 space-y-3">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="搜索动词 (如 être, parler...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#80142A]/20 focus:bg-white transition text-[#29354A] font-medium"
            />
          </div>

          {/* Verb List */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-2 space-y-1 max-h-[520px] overflow-y-auto">
            {filteredVerbs.map(verb => {
              const isSelected = selectedVerb.id === verb.id;
              const isLockedVerb = !isVip && !freeVerbIds.includes(verb.id);
              return (
                <button
                  key={verb.id}
                  onClick={() => {
                    if (isLockedVerb) {
                      onOpenVipModal?.(`🔒【${verb.infinitive} (${verb.meaning})】为 VIP 终身卡专属核心动词！输入卡密即可解锁全量动词库！`);
                      return;
                    }
                    setSelectedVerb(verb);
                  }}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#FCECEF] text-[#80142A] border-2 border-[#80142A] shadow-xs'
                      : 'hover:bg-slate-50 border border-transparent text-[#29354A]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm sm:text-base tracking-tight font-serif">
                        {verb.infinitive}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                        isSelected 
                          ? 'bg-[#80142A] text-white' 
                          : verb.group === '1st_er' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : verb.group === '2nd_ir' 
                          ? 'bg-sky-100 text-sky-800' 
                          : 'bg-purple-100 text-purple-900 border border-purple-200/70'
                      }`}>
                        {verb.group === '1st_er' ? '第1组 -er' : verb.group === '2nd_ir' ? '第2组 -ir' : '第3组不规则'}
                      </span>
                      {isLockedVerb ? (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-black">
                          🔒 VIP
                        </span>
                      ) : (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                          ✓ 免费
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 truncate max-w-[200px] ${isSelected ? 'text-[#80142A]' : 'text-stone-500'}`}>
                      {verb.meaning}
                    </p>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-[#80142A]' : 'text-stone-300'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column (8 cols): Visual Conjugation Canvas */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Current Verb Hero Header */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-[#29354A] font-serif">
                    {selectedVerb.infinitive}
                  </h2>
                  <span className="text-xs sm:text-sm text-[#29354A]/80 font-bold">
                    ({selectedVerb.meaning})
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-50 text-[#29354A] font-bold border border-slate-200/70">
                    过去分词: <strong className="text-[#80142A] font-serif">{selectedVerb.participle}</strong>
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold border bg-[#FCECEF] text-[#80142A] border-[#80142A]/25">
                    助动词: <strong>{selectedVerb.auxiliary}</strong>
                  </span>
                  {selectedVerb.tags.map(t => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-200/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => playSpeech(selectedVerb.infinitive)}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-[#FCECEF] text-[#80142A] border border-slate-200/70 text-xs font-bold transition cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-[#80142A]" />
                <span>原形发音</span>
              </button>
            </div>

            {/* Tense Switcher Tabs */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                选择推导时态 (Tense)
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {TENSES_METADATA.map(t => {
                  const hasThisTense = !!selectedVerb.tenses[t.key];
                  const isActive = selectedTense === t.key;
                  const isLockedTense = !isVip && !freeTenseKeys.includes(t.key);
                  return (
                    <button
                      key={t.key}
                      disabled={!hasThisTense}
                      onClick={() => {
                        if (isLockedTense) {
                          onOpenVipModal?.(`🔒【${t.label} (${t.frenchLabel})】为 VIP 专属高阶时态！输入卡密即可解锁虚拟式、条件式等全时态变位！`);
                          return;
                        }
                        setSelectedTense(t.key);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-[#80142A] text-white shadow-xs'
                          : isLockedTense
                          ? 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200/80'
                          : hasThisTense
                          ? 'bg-slate-50 text-[#29354A] hover:bg-slate-100 border border-slate-200/80'
                          : 'bg-slate-100/50 text-stone-300 cursor-not-allowed border border-slate-200/40'
                      }`}
                    >
                      {isLockedTense && <Lock className="w-3 h-3 text-amber-600 shrink-0" />}
                      <span>{t.label}</span>
                      <span className="text-[10px] opacity-75">({t.frenchLabel})</span>
                      {isLockedTense && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-black">
                          VIP
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 🎯 核心动词推导法则动态卡片 (动态匹配动词与时态，解决公式矛盾) */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 via-rose-50/20 to-white border border-slate-200/80 text-xs text-[#29354A] space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 font-black text-[#29354A]">
                  <Info className="w-3.5 h-3.5 text-[#DDBF78]" />
                  <span>【{selectedVerb.infinitive}】{currentTenseMeta.label} 变位推导心法：</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] border ${derivation.badgeClass}`}>
                  {derivation.badge}
                </span>
              </div>
              <p className="leading-relaxed text-slate-600 font-medium">
                {derivation.explanation}
              </p>
              <div className="p-2.5 rounded-xl bg-white/90 border border-slate-200/80 flex flex-col gap-1">
                <div className="text-[11px] font-bold text-slate-500">
                  变位公式：<span className="font-mono text-[#80142A] text-xs font-black">{derivation.formula}</span>
                </div>
                <div className="text-[11px] font-semibold text-amber-800 bg-amber-50/70 px-2 py-1 rounded-lg border border-amber-200/60">
                  {derivation.warning}
                </div>
              </div>
            </div>

            {/* 🔍 独家 4 步动态推导拆解流 (Derivation Pipeline) */}
            <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#29354A]">
                <Sparkles className="w-3.5 h-3.5 text-[#DDBF78]" />
                <span>变位 3 步可视化推导演练：</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/70 shadow-2xs space-y-1">
                  <span className="text-[10px] font-black text-[#80142A] px-1.5 py-0.2 rounded bg-rose-50 border border-rose-200/60">
                    Step 1 · 锁定词干
                  </span>
                  <div className="text-xs font-bold text-slate-800 font-serif">
                    {derivation.step1Title}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {derivation.step1Desc}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200/70 shadow-2xs space-y-1">
                  <span className="text-[10px] font-black text-sky-800 px-1.5 py-0.2 rounded bg-sky-50 border border-sky-200/60">
                    Step 2 · 缀饰人称
                  </span>
                  <div className="text-xs font-bold text-slate-800 font-serif">
                    按 6 个人称装配
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    单数 je/tu/il 与复数 nous/vous/ils 对应换装
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200/70 shadow-2xs space-y-1">
                  <span className="text-[10px] font-black text-emerald-800 px-1.5 py-0.2 rounded bg-emerald-50 border border-emerald-200/60">
                    Step 3 · 原声发音
                  </span>
                  <div className="text-xs font-bold text-slate-800 font-serif">
                    词尾静音与连诵
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    点击卡片即听发音，-ent 绝不发音
                  </p>
                </div>
              </div>
            </div>

            {/* 6-Persons Conjugation Table (High visual impact with phonetic badges!) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {persons.map(p => {
                const isPlaying = playingText === p.data.full;
                const note = getPersonPhoneticNote(p.key);
                return (
                  <div
                    key={p.key}
                    onClick={() => playSpeech(p.data.full)}
                    className="p-4 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-[#80142A]/40 transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-stone-400">
                          {p.pronoun}
                        </span>
                        {note && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200/70">
                            {note}
                          </span>
                        )}
                      </div>
                      <div className="text-base sm:text-lg font-extrabold tracking-tight font-serif">
                        <span className="text-[#29354A]">{p.data.stem}</span>
                        <span className="text-[#80142A] bg-[#FCECEF] px-1 py-0.5 rounded-md font-black">
                          {p.data.ending}
                        </span>
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition ${
                      isPlaying 
                        ? 'bg-[#80142A] text-white' 
                        : 'bg-white text-stone-400 group-hover:bg-[#80142A] group-hover:text-white shadow-2xs border border-slate-200/70'
                    }`}>
                      <Volume2 className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sample Real-Life Context Sentence */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="text-xs font-bold text-stone-500">
                实战例句应用场景
              </div>
              <p className="text-sm font-serif font-bold text-[#80142A]">
                « {selectedVerb.sampleSentence.french} »
              </p>
              <p className="text-xs text-[#29354A]/80 font-medium">
                {selectedVerb.sampleSentence.chinese}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

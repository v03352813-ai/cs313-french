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
  AlertCircle,
  Layers,
  X
} from 'lucide-react';
import { FRENCH_VERBS, TENSES_METADATA, VerbItem, TenseKey, VerbGroup } from '../data/french/conjugation';

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
  const [groupFilter, setGroupFilter] = useState<'all' | VerbGroup>('all');
  const [playingText, setPlayingText] = useState<string | null>(null);
  const [showHatGuide, setShowHatGuide] = useState<boolean>(true);

  // 基础免费动词（前 4 大基石动词）
  const freeVerbIds = ['etre', 'avoir', 'aller', 'faire'];
  // 基础免费时态（现在时、复合过去时）
  const freeTenseKeys: TenseKey[] = ['present', 'passe_compose'];

  const filteredVerbs = FRENCH_VERBS.filter(v => {
    const matchesGroup = groupFilter === 'all' || v.group === groupFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || 
      v.infinitive.toLowerCase().includes(q) ||
      v.meaning.toLowerCase().includes(q);
    return matchesGroup && matchesSearch;
  });

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

  // 深度解析当前动词与上方【脱帽换衣法则看板】的具体因果关系链 (彻底讲透为什么这么变)
  const getDynamicDerivation = () => {
    const is3rd = selectedVerb.group === '3rd_irregular';
    const is1st = selectedVerb.group === '1st_er';
    const is2nd = selectedVerb.group === '2nd_ir';

    if (selectedTense === 'present') {
      if (is3rd) {
        if (selectedVerb.id === 'avoir') {
          return {
            badge: '⚠️ 第 3 组四大天王 · 完全异化',
            badgeClass: 'bg-purple-50 text-purple-900 border-purple-200/80',
            ruleMapping: '对应上方说明【卡片 1 & 卡片 2：四大天王基石派 · 不脱帽换衣】',
            relationWhy: 'avoir (英语 have) 是全法语使用率前两名的超级基石！在数千年中保留了古拉丁语特异变色形态。它不脱帽、不套用常规 -e/-es，词根整体异化为 6 个专属形态！',
            step1Title: 'Step 1 · 判定门派',
            step1Desc: '原形 avoir ➔ 判定为四大天王核心祖先词，不穿 -er 衣服',
            step2Title: 'Step 2 · 专属形态装配',
            step2Desc: "单数：j'ai (遇元音省音) / tu as / il a；复数：nous avons / vous avez / ils ont",
            step3Title: 'Step 3 · 专属发音秘籍',
            step3Desc: 'vous avez 必须连诵读 [vu-zave]；ils ont 读 [il-zõ] (严格区别于 ils sont 的 [s] 音)！',
            formula: '四大天王古形态（独立记忆：j\'ai, as, a, avons, avez, ont）',
            warning: '🚨 避坑重点：第一人称必须省音为 j\'ai；复数人称均带有高频 [z] 连音！'
          };
        }

        if (selectedVerb.id === 'etre') {
          return {
            badge: '⚠️ 第 3 组四大天王之首 · 完全异化',
            badgeClass: 'bg-purple-50 text-purple-900 border-purple-200/80',
            ruleMapping: '对应上方说明【卡片 1 & 卡片 2：四大天王之首 · 语言骨架】',
            relationWhy: 'être (英语 be 动词) 是法语第 1 基石动词！词根发生根本性变异，完全不套用常规规则后缀，直接独立记忆 6 个人称形态。',
            step1Title: 'Step 1 · 判定门派',
            step1Desc: '原形 être ➔ 判定为四大天王第一基石，词根彻底变异',
            step2Title: 'Step 2 · 专属形态装配',
            step2Desc: '单数：je suis / tu es / il est；复数：nous sommes / vous êtes / ils sont',
            step3Title: 'Step 3 · 专属发音秘籍',
            step3Desc: 'vous êtes 中间字母 s 遇到元音 ê 必须连诵发 [z]，读作 [vu-zεt]！',
            formula: '第一基石特异形态（独立记忆：suis, es, est, sommes, êtes, sont）',
            warning: '🚨 避坑重点：vous êtes 必须连诵读成 [vu-zεt]；ils sont 发 [s] 音区别于 ils ont 的 [z]！'
          };
        }

        if (selectedVerb.id === 'aller') {
          return {
            badge: '⚠️ 第 3 组四大天王 · 位移基石',
            badgeClass: 'bg-purple-50 text-purple-900 border-purple-200/80',
            ruleMapping: '对应上方说明【卡片 1 & 卡片 2：四大天王之位移词】',
            relationWhy: 'aller (去/前往，英语 go) 虽以 -er 结尾，但它是四大天王特异动词！现在时呈现特异形态，用于构建“最近将来时 (aller + 原形)”。',
            step1Title: 'Step 1 · 判定门派',
            step1Desc: '原形 aller ➔ 貌似第1组实为四大天王特异词',
            step2Title: 'Step 2 · 专属形态装配',
            step2Desc: '单数：je vais / tu vas / il va；复数：nous allons / vous allez / ils vont',
            step3Title: 'Step 3 · 专属发音秘籍',
            step3Desc: 'nous allons [nuz-alõ]、vous allez [vuz-ale] 均发生强连诵！',
            formula: '位移基石特异形态（vais, vas, va, allons, allez, vont）',
            warning: '🚨 避坑重点：复合过去时助动词必须使用 être (je suis allé)！'
          };
        }

        if (selectedVerb.id === 'faire') {
          return {
            badge: '⚠️ 第 3 组四大天王 · 行动万能词',
            badgeClass: 'bg-purple-50 text-purple-900 border-purple-200/80',
            ruleMapping: '对应上方说明【卡片 1 & 卡片 2：四大天王之行动词】',
            relationWhy: 'faire (做/天气，英语 do/make) 为全法语句型出现率极高的四大天王之一！特别注意 vous 与 ils 的特异形态。',
            step1Title: 'Step 1 · 判定门派',
            step1Desc: '原形 faire ➔ 属于四大天王特异动词',
            step2Title: 'Step 2 · 专属形态装配',
            step2Desc: '单数：je fais / tu fais / il fait；复数：nous faisons / vous faites / ils font',
            step3Title: 'Step 3 · 专属发音秘籍',
            step3Desc: 'nous faisons 中 ai 弱化读作 [ə] (读作 [fə-zõ])；vous faites [fεt]！',
            formula: '万能行动特异形态（fais, fais, fait, faisons, faites, font）',
            warning: '🚨 考点大雷区：vous 的形式是 vous faites (不是 faisez)；ils 是 font！'
          };
        }

        // 其他第3组动词 (pouvoir, vouloir, venir)
        return {
          badge: '⚠️ 第 3 组不规则特异动词',
          badgeClass: 'bg-purple-50 text-purple-900 border-purple-200/80',
          ruleMapping: '对应上方说明【卡片 1：第 3 组特异动词派 (占 5%)】',
          relationWhy: `动词 ${selectedVerb.infinitive} 属于第 3 组特异动词，词干在单复数间发生活用变异，请锁定当前卡片中的专属形态记忆！`,
          step1Title: 'Step 1 · 判定门派',
          step1Desc: `原形 ${selectedVerb.infinitive} ➔ 判定为第 3 组特异派，词干发生活用异化`,
          step2Title: 'Step 2 · 词根异化装配',
          step2Desc: '单数弱词干 与 复数强词干 发生对应异化（如 peux/pouvons, veux/voulons）',
          step3Title: 'Step 3 · 发音与连诵',
          step3Desc: '点击每张卡片右侧扬声器，即刻聆听法国标准音发音！',
          formula: '第3组专属特异变位（锁定当前卡片形态）',
          warning: '💡 重点：第 3 组动词在各类考题中占 80% 以上，作为独立重点单词掌握！'
        };
      }

      if (is1st) {
        const stem = selectedVerb.infinitive.slice(0, -2);
        return {
          badge: '✨ 第 1 组规则动词 · 脱帽换衣派',
          badgeClass: 'bg-emerald-50 text-emerald-900 border-emerald-200/80',
          ruleMapping: '对应上方说明【卡片 1 & 卡片 2：脱帽换衣法核心示范】',
          relationWhy: `原形 ${selectedVerb.infinitive} 严格遵循【脱帽换衣法则】：原形帽子就是词尾 -er。变位分两步：① 砍掉帽子 -er 露出词干；② 按人称穿上 6 套新衣！`,
          step1Title: 'Step 1 · 脱掉原形帽子',
          step1Desc: `原形「${selectedVerb.infinitive}」砍掉 -er 帽子 ➔ 锁定词根「${stem}-」`,
          step2Title: 'Step 2 · 穿上人称新衣',
          step2Desc: `词根「${stem}」+ 6套外衣：-e, -es, -e, -ons, -ez, -ent`,
          step3Title: 'Step 3 · 听力破壁绝密',
          step3Desc: `je, tu, il, ils 词尾全部不发音！-ent 绝对静音！四个人称读音 100% 一模一样（全读 [${stem}]）！`,
          formula: `词根 (${stem}-) + 人称新衣 (-e, -es, -e, -ons, -ez, -ent)`,
          warning: '👂 听力秒杀：只有 nous [-on] 和 vous [-e] 发音不同，听觉上只有 3 种声音！'
        };
      }

      if (is2nd) {
        const stem = selectedVerb.infinitive.slice(0, -2);
        return {
          badge: '✨ 第 2 组规则动词 · 双 s 家族',
          badgeClass: 'bg-sky-50 text-sky-900 border-sky-200/80',
          ruleMapping: '对应上方说明【卡片 1 & 卡片 2：双 s 家族法则】',
          relationWhy: `原形 ${selectedVerb.infinitive} 严格遵循【双 s 家族法则】：原形帽子为 -ir。变位时摘掉 -ir，单数穿 -is/-it，复数必须带上双胞胎 -iss- 家族外衣！`,
          step1Title: 'Step 1 · 脱掉原形帽子',
          step1Desc: `原形「${selectedVerb.infinitive}」砍掉 -ir 帽子 ➔ 锁定词根「${stem}-」`,
          step2Title: 'Step 2 · 穿上双s新衣',
          step2Desc: `词根「${stem}」+ 单数 (-is, -is, -it) 与 复数 (-issons, -issez, -issent)`,
          step3Title: 'Step 3 · 专属发音特征',
          step3Desc: '复数 nous/vous/ils 带有清晰的双 s [s] 咬音（finissons, finissez, finissent）！',
          formula: `词根 (${stem}-) + 专属外衣 (-is, -is, -it, -issons, -issez, -issent)`,
          warning: '👂 发音要点：复数标志性双胞胎 -iss- 发 [s] 音，极为响亮！'
        };
      }
    }

    if (selectedTense === 'passe_compose') {
      const isEtreAux = selectedVerb.auxiliary === 'être';
      return {
        badge: '✨ 复合过去时推导法则',
        badgeClass: 'bg-rose-50 text-[#80142A] border-rose-200/80',
        ruleMapping: '对应时态法则：复合过去时【助动词合成法】',
        relationWhy: `复合过去时 = 助动词现在时 (avoir/être) + 过去分词 (${selectedVerb.participle})。相当于英语的 have + done。`,
        step1Title: 'Step 1 · 选定助动词',
        step1Desc: isEtreAux 
          ? `本词为位移/状态变化核心词 ➔ 助动词必须使用 être！`
          : `绝大多数动作及物动词 ➔ 统一采用 avoir 作为助动词。`,
        step2Title: 'Step 2 · 合成过去分词',
        step2Desc: `助动词 6 人称形态 + 过去分词「${selectedVerb.participle}」`,
        step3Title: 'Step 3 · 配合避坑预警',
        step3Desc: isEtreAux 
          ? '⚠️ 考点大雷区：用 être 作助动词时，过去分词必须随主语性数配合 (阴性+e, 复数+s)！'
          : '用 avoir 作助动词时，过去分词通常不发生性数配合。',
        formula: `助动词 ${selectedVerb.auxiliary} (现在时) + 过去分词 (${selectedVerb.participle})`,
        warning: isEtreAux 
          ? '🚨 考点大雷区：用 être 作助动词时，分词必须随主语性数配合（如 allé / allée / allés / allées）！'
          : '💡 提示：助动词与人称代词常发生省音（如 j\'ai）或连音（如 vous avez）！'
      };
    }

    return {
      badge: `✨ ${currentTenseMeta.label} 语法法则`,
      badgeClass: 'bg-slate-50 text-slate-800 border-slate-200/80',
      ruleMapping: `对应时态法则：${currentTenseMeta.label}`,
      relationWhy: currentTenseMeta.usage,
      step1Title: 'Step 1 · 提取时态词根',
      step1Desc: '根据该时态特定规则提取词根',
      step2Title: 'Step 2 · 装配时态词尾',
      step2Desc: `附加当前时态人称后缀：${currentTenseMeta.formula}`,
      step3Title: 'Step 3 · 原声发音朗读',
      step3Desc: '点击卡片右侧扬声器即可聆听真人发音',
      formula: currentTenseMeta.formula,
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ========================================================================= */}
        {/* Left Column (5 cols): 门派筛选器 + 搜索 + 丰富动词工作台 (告别左轻右重) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 space-y-3">
          
          {/* 门派筛选 Tabs (直接呼应上方三大门派说明) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 text-[11px]">
            {[
              { key: 'all', label: `全部 (${FRENCH_VERBS.length})` },
              { key: '1st_er', label: '第1组 -er' },
              { key: '2nd_ir', label: '第2组 -ir' },
              { key: '3rd_irregular', label: '四大天王' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setGroupFilter(tab.key as any)}
                className={`flex-1 py-1.5 px-1.5 rounded-xl font-bold transition cursor-pointer text-center truncate ${
                  groupFilter === tab.key
                    ? 'bg-white text-[#80142A] shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="搜索动词 (如 avoir, être, parler...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-2xl bg-white border border-slate-200/80 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#80142A]/20 focus:bg-white transition text-[#29354A] font-medium shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Verb List (丰富饱满，包含原形、释义、门派、分词、助动词预览) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-2 space-y-1.5 max-h-[580px] overflow-y-auto">
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
                  <div className="space-y-1 min-w-0 flex-1 pr-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-base tracking-tight font-serif">
                        {verb.infinitive}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        isSelected 
                          ? 'bg-[#80142A] text-white' 
                          : verb.group === '1st_er' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : verb.group === '2nd_ir' 
                          ? 'bg-sky-100 text-sky-800' 
                          : 'bg-purple-100 text-purple-900 border border-purple-200/70'
                      }`}>
                        {verb.group === '1st_er' ? '第1组 · 脱帽' : verb.group === '2nd_ir' ? '第2组 · 双s' : '四大天王 · 特异'}
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

                    <p className={`text-xs truncate ${isSelected ? 'text-[#80142A] font-semibold' : 'text-stone-500'}`}>
                      {verb.meaning}
                    </p>

                    <div className="flex items-center gap-2 pt-0.5 text-[10px] text-stone-400 font-mono">
                      <span>分词: <strong className={isSelected ? 'text-[#80142A]' : 'text-slate-600'}>{verb.participle}</strong></span>
                      <span>•</span>
                      <span>助动词: <strong className={isSelected ? 'text-[#80142A]' : 'text-slate-600'}>{verb.auxiliary}</strong></span>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 shrink-0 transition ${isSelected ? 'text-[#80142A] translate-x-0.5' : 'text-stone-300'}`} />
                </button>
              );
            })}
          </div>

          {/* 左侧常驻：三大门派对应速查锦囊卡片 (充实左侧下半部，完美消除左轻右重) */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#29354A]">
              <Lightbulb className="w-3.5 h-3.5 text-[#DDBF78]" />
              <span>动词门派变位对应速查</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-0.5 text-center">
                <span className="font-bold text-emerald-900 block text-xs">第 1 组 -er</span>
                <p className="text-emerald-700/90 text-[10px]">占85% · 摘帽换衣</p>
              </div>
              <div className="p-2 rounded-xl bg-sky-50/70 border border-sky-100 space-y-0.5 text-center">
                <span className="font-bold text-sky-900 block text-xs">第 2 组 -ir</span>
                <p className="text-sky-700/90 text-[10px]">占10% · 双s家族</p>
              </div>
              <div className="p-2 rounded-xl bg-purple-50/70 border border-purple-100 space-y-0.5 text-center">
                <span className="font-bold text-purple-900 block text-xs">四大天王</span>
                <p className="text-purple-700/90 text-[10px]">特异派 · 独立记</p>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* Right Column (7 cols): 动词核心展台 + 关系推导链 + 6人称实战 */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Current Verb Hero Header */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-200/80">
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
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
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

            {/* ===================================================================== */}
            {/* 🔗 核心关系推导桥梁：【本词与上方脱帽换衣法则的关系链】 (直击用户痛点！) */}
            {/* ===================================================================== */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 via-rose-50/20 to-white border border-slate-200/80 text-xs text-[#29354A] space-y-3 shadow-2xs">
              
              {/* 1. 对应上方说明法则的明确锚点 */}
              <div className="space-y-1.5 pb-2.5 border-b border-slate-200/70">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 font-black text-xs text-[#80142A]">
                    <Sparkles className="w-3.5 h-3.5 text-[#DDBF78]" />
                    <span>【{selectedVerb.infinitive}】与上方说明法则的关系：</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] border ${derivation.badgeClass}`}>
                    {derivation.badge}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-900 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200/60 inline-block">
                  📌 {derivation.ruleMapping}
                </p>
                <p className="text-[11px] leading-relaxed text-slate-600 font-medium">
                  {derivation.relationWhy}
                </p>
              </div>

              {/* 2. 具体 3 步推导装配流 (精准针对当前动词，拒绝空洞！) */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  具体 3 步推导变位过程：
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                    <span className="text-[10px] font-black text-[#80142A] px-1.5 py-0.2 rounded bg-rose-50 border border-rose-200/60">
                      {derivation.step1Title}
                    </span>
                    <p className="text-[11px] text-slate-700 leading-snug font-medium">
                      {derivation.step1Desc}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                    <span className="text-[10px] font-black text-sky-800 px-1.5 py-0.2 rounded bg-sky-50 border border-sky-200/60">
                      {derivation.step2Title}
                    </span>
                    <p className="text-[11px] text-slate-700 leading-snug font-medium">
                      {derivation.step2Desc}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                    <span className="text-[10px] font-black text-emerald-800 px-1.5 py-0.2 rounded bg-emerald-50 border border-emerald-200/60">
                      {derivation.step3Title}
                    </span>
                    <p className="text-[11px] text-slate-700 leading-snug font-medium">
                      {derivation.step3Desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. 公式与预警小贴士 */}
              <div className="p-2.5 rounded-xl bg-white/95 border border-slate-200/80 space-y-1">
                <div className="text-[11px] text-slate-700">
                  <span className="font-bold text-slate-500">变位公式：</span>
                  <span className="font-mono text-[#80142A] font-black">{derivation.formula}</span>
                </div>
                <div className="text-[11px] font-semibold text-amber-900 bg-amber-50/80 px-2 py-1 rounded-lg border border-amber-200/70">
                  {derivation.warning}
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
                    className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-[#80142A]/40 transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
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

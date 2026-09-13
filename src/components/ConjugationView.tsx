import React, { useState } from 'react';
import { 
  Search, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  X, 
  Table,
  GraduationCap
} from 'lucide-react';
import { 
  FRENCH_VERBS, 
  TENSES_METADATA, 
  VerbItem, 
  TenseKey, 
  VerbGroup,
  KAOYAN_PASSE_SIMPLE_50,
  PasseSimpleItem
} from '../data/french/conjugation';

// 法语标准音真人朗读引擎
const speakFrench = (text: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.88;
    const voices = window.speechSynthesis.getVoices();
    const frVoice = voices.find(v => v.lang.startsWith('fr') || v.name.includes('French') || v.name.includes('France'));
    if (frVoice) {
      utterance.voice = frVoice;
    }
    window.speechSynthesis.speak(utterance);
  } catch {
    // 忽略语音引擎初始化异常
  }
};

// 7 大时态宏观法则全景宝典数据库
interface FrenchTenseRuleItem {
  key: TenseKey;
  tenseName: string;
  frenchName: string;
  usageDesc: string;
  formula: string;
  rules: {
    group1: string; // 第 1 组 -er
    group2: string; // 第 2 组 -ir
    group3: string; // 四大天王与特异
  };
  sample: {
    infinitive: string;
    meaning: string;
    conjugated: string;
  }[];
}

const FRENCH_TENSE_RULES: FrenchTenseRuleItem[] = [
  {
    key: 'present',
    tenseName: '直陈式现在时',
    frenchName: "Présent de l'indicatif",
    usageDesc: '描述当前发生的事实、客观真理或经常性习惯行为。',
    formula: '词根 + 人称后缀 (-e, -es, -e, -ons, -ez, -ent)',
    rules: {
      group1: '摘掉 -er 换 -e, -es, -e, -ons, -ez, -ent (四个人称发音全同全静音)',
      group2: '摘掉 -ir 换 -is, -is, -it, -issons, -issez, -issent (复数带双胞胎 -iss- [s]音)',
      group3: '四大天王 (être, avoir, aller, faire) 完全异化，作为独立单词直接记忆'
    },
    sample: [
      { infinitive: 'parler', meaning: '说', conjugated: 'je parle / nous parlons' },
      { infinitive: 'finir', meaning: '结束', conjugated: 'je finis / nous finissons' },
      { infinitive: 'être', meaning: '是', conjugated: 'je suis / vous êtes' },
      { infinitive: 'avoir', meaning: '有', conjugated: "j'ai / nous avons" }
    ]
  },
  {
    key: 'passe_compose',
    tenseName: '复合过去时',
    frenchName: 'Passé composé',
    usageDesc: '描述过去已经完成并对现在产生影响的动作，考级出现率第一。',
    formula: '助动词 avoir / être (现在时) + 过去分词 (Participe passé)',
    rules: {
      group1: '过去分词去 -er 换 -é (如 parler ➔ parlé，aimer ➔ aimé)',
      group2: '过去分词去 -ir 换 -i (如 finir ➔ fini，choisir ➔ choisi)',
      group3: '四大天王特异分词 (été, eu, fait, allé)；位移动词助动词必须用 être 且性数配合'
    },
    sample: [
      { infinitive: 'parler', meaning: '说', conjugated: "j'ai parlé" },
      { infinitive: 'aller', meaning: '去', conjugated: 'je suis allé(e)' },
      { infinitive: 'faire', meaning: '做', conjugated: "j'ai fait" },
      { infinitive: 'avoir', meaning: '有', conjugated: "j'ai eu" }
    ]
  },
  {
    key: 'imparfait',
    tenseName: '未完成过去时',
    frenchName: 'Imparfait',
    usageDesc: '描述过去持续的动作、背景状态、习惯或外貌环境描写。',
    formula: '直陈式 nous 词根 + (-ais, -ais, -ait, -ions, -iez, -aient)',
    rules: {
      group1: 'parl- + -ais, -ais, -ait, -ions, -iez, -aient (注意单数及第三人称复数发音全同 [ε])',
      group2: 'finiss- + -ais, -ais, -ait, -ions, -iez, -aient (全人称均带 -iss-)',
      group3: '全法语唯一特例为 être 词根异化为 ét- (j\'étais, tu étais...)，其余动词全取 nous 词根'
    },
    sample: [
      { infinitive: 'aimer', meaning: '喜欢', conjugated: "j'aimais" },
      { infinitive: 'finir', meaning: '完成', conjugated: 'nous finissions' },
      { infinitive: 'être', meaning: '在/是', conjugated: "j'étais" },
      { infinitive: 'avoir', meaning: '有', conjugated: "j'avais" }
    ]
  },
  {
    key: 'futur_simple',
    tenseName: '简单将来时',
    frenchName: 'Futur simple',
    usageDesc: '描述未来确定会发生的事情，语气肯定客观。',
    formula: '动词原形/将来时词根 + (-ai, -as, -a, -ons, -ez, -ont)',
    rules: {
      group1: '以完整动词原形为词根 + ai, as, a, ons, ez, ont (如 je parlerai)',
      group2: '以完整动词原形为词根 + ai, as, a, ons, ez, ont (如 je finirai)',
      group3: '四大天王词根异化：ser- (être), aur- (avoir), ir- (aller), fer- (faire)'
    },
    sample: [
      { infinitive: 'parler', meaning: '说', conjugated: 'je parlerai' },
      { infinitive: 'aller', meaning: '去', conjugated: "j'irai" },
      { infinitive: 'être', meaning: '是', conjugated: 'je serai' },
      { infinitive: 'faire', meaning: '做', conjugated: 'je ferai' }
    ]
  },
  {
    key: 'conditionnel',
    tenseName: '条件式现在时',
    frenchName: 'Conditionnel présent',
    usageDesc: '表达委婉礼貌请求、愿望、假想推测（如“我想请教您”）。',
    formula: '简单将来时词根 + 未完成过去时词尾 (-ais, -ais, -ait, -ions, -iez, -aient)',
    rules: {
      group1: 'parler- + -ais, -ais, -ait, -ions, -iez, -aient (如 je parlerais)',
      group2: 'finir- + -ais, -ais, -ait, -ions, -iez, -aient (如 je finirais)',
      group3: '将来时特异词根 + 未完成过去时词尾 (serais, aurais, irais, ferais, voudrais)'
    },
    sample: [
      { infinitive: 'aimer', meaning: '喜欢/想要', conjugated: "j'aimerais" },
      { infinitive: 'vouloir', meaning: '想', conjugated: 'je voudrais' },
      { infinitive: 'pouvoir', meaning: '能', conjugated: 'je pourrais' },
      { infinitive: 'être', meaning: '是', conjugated: 'ce serait' }
    ]
  },
  {
    key: 'subjonctif',
    tenseName: '虚拟式现在时',
    frenchName: 'Subjonctif présent',
    usageDesc: '表达主观情感、愿望、怀疑、必须（常用于 il faut que 等从句中）。',
    formula: '现在时 ils 词根 + (-e, -es, -e, -ions, -iez, -ent)',
    rules: {
      group1: 'que je parle, que tu parles, qu\'il parle, que nous parlions, que vous parliez',
      group2: 'que je finisse, que tu finisses, qu\'il finisse, que nous finissions...',
      group3: '特异词根：sois/soit/soyons (être), aie/ait/ayons (avoir), fasse (faire), aille (aller)'
    },
    sample: [
      { infinitive: 'faire', meaning: '做', conjugated: 'qu\'il fasse' },
      { infinitive: 'aller', meaning: '去', conjugated: "que j'aille" },
      { infinitive: 'être', meaning: '是', conjugated: 'que je sois' },
      { infinitive: 'avoir', meaning: '有', conjugated: "que j'aie" }
    ]
  },
  {
    key: 'imperatif',
    tenseName: '命令式',
    frenchName: 'Impératif',
    usageDesc: '向对方发出指令、建议或请求（仅 tu, nous, vous 三个人称）。',
    formula: '省略主语代词，第 1 组动词 tu 形式通常去 -s',
    rules: {
      group1: 'Parle ! Parlons ! Parlez ! (注意第二人称单数 Parle 摘掉了字母 s)',
      group2: 'Finis ! Finissons ! Finissez ! (保留 -s，复数带 -iss-)',
      group3: '特异命令式：Sois/Soyons/Soyez (être), Aie/Ayons/Ayez (avoir), Fais/Faisons/Faites (faire)'
    },
    sample: [
      { infinitive: 'parler', meaning: '说', conjugated: 'Parle ! Parlons ! Parlez !' },
      { infinitive: 'aller', meaning: '去', conjugated: 'Va ! Allons ! Allez !' },
      { infinitive: 'faire', meaning: '做', conjugated: 'Fais ! Faisons ! Faites !' }
    ]
  },
  {
    key: 'plus_que_parfait',
    tenseName: '愈过去时',
    frenchName: 'Plus-que-parfait',
    usageDesc: '表示“过去的过去”（比过去某一动作更早完成的动作），考研真题长难句与时态配合核心。',
    formula: '助动词 avoir / être (未完成过去时 imparfait) + 过去分词 (Participe passé)',
    rules: {
      group1: 'j\'avais parlé, nous avions aimé (助动词 avoir 的 imparfait 变位 + 分词)',
      group2: 'j\'avais fini, nous avions choisi (第二组规则分词 -i)',
      group3: '四大天王与位移动词：j\'avais été, j\'avais eu, j\'étais allé(e), il était parti (遵循 être 配合规则)'
    },
    sample: [
      { infinitive: 'partir', meaning: '离开', conjugated: 'il était déjà parti' },
      { infinitive: 'finir', meaning: '完成', conjugated: 'nous avions fini' },
      { infinitive: 'arriver', meaning: '到达', conjugated: 'le train était arrivé' },
      { infinitive: 'voir', meaning: '看见', conjugated: "j'avais déjà vu" }
    ]
  },
  {
    key: 'passe_simple',
    tenseName: '简单过去时',
    frenchName: 'Passé simple',
    usageDesc: '书面文学与考研阅读专属时态。考研二外重点：秒认第三人称（il / ils）与词根突变。',
    formula: '按主音分为 -a 组 (第1组) / -i 组 / -u 组 / -in 组',
    rules: {
      group1: '第 1 组动词 (-er)：-ai, -as, -a, -âmes, -âtes, -èrent (重点识别：il parla, ils parlèrent)',
      group2: '第 2 组动词 (-ir)：-is, -is, -it, -îmes, -îtes, -irent (重点识别：il finit, ils finirent)',
      group3: '特异突变型：être ➔ il fut / ils furent；avoir ➔ il eut / ils eurent；faire ➔ il fit；venir ➔ il vint'
    },
    sample: [
      { infinitive: 'être', meaning: '是', conjugated: 'il fut / ils furent' },
      { infinitive: 'avoir', meaning: '有', conjugated: 'il eut / ils eurent' },
      { infinitive: 'faire', meaning: '做', conjugated: 'il fit / ils firent' },
      { infinitive: 'prendre', meaning: '拿/采取', conjugated: 'il prit / ils prirent' }
    ]
  }
];

interface ConjugationViewProps {
  isVip?: boolean;
  onOpenVipModal?: (reason?: string) => void;
}

export const ConjugationView: React.FC<ConjugationViewProps> = ({
  isVip = false,
  onOpenVipModal
}) => {
  // 核心视图模式：'workbench' (交互推导工作台) vs 'pronouns_train' (代词小火车&COD配合) vs 'rules' (全景法则宝典) vs 'passe_simple' (考研简单过去时50词速认)
  const [viewMode, setViewMode] = useState<'workbench' | 'pronouns_train' | 'rules' | 'passe_simple'>('workbench');
  const [showHatGuide, setShowHatGuide] = useState<boolean>(true);
  const [showFullMatrix, setShowFullMatrix] = useState<boolean>(true);
  const [showMaisonEtre, setShowMaisonEtre] = useState<boolean>(true);
  const [matrixTenseFilter, setMatrixTenseFilter] = useState<'core' | 'all'>('core'); // 默认核心 4 大时态，避免新手被吓退

  // 代词小火车轨道与提前直宾COD配合状态
  const [trainTrackMode, setTrainTrackMode] = useState<'declarative' | 'imperative'>('declarative');
  const [activeCodTab, setActiveCodTab] = useState<number>(0);

  // 考研二外阅读：简单过去时 (Passé Simple) 50 核心词速认专区状态
  const [psSearch, setPsSearch] = useState<string>('');
  const [psGroupFilter, setPsGroupFilter] = useState<'all' | '第一组' | '第二组' | '第三组'>('all');

  // 动词库筛选与搜索
  const [selectedVerb, setSelectedVerb] = useState<VerbItem>(FRENCH_VERBS[0]);
  const [selectedTense, setSelectedTense] = useState<TenseKey>('present');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [groupFilter, setGroupFilter] = useState<'all' | VerbGroup>('all');
  const [playingText, setPlayingText] = useState<string | null>(null);

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

  const filteredPsList = KAOYAN_PASSE_SIMPLE_50.filter(item => {
    const matchesGroup = psGroupFilter === 'all' || item.group === psGroupFilter;
    const q = psSearch.trim().toLowerCase();
    const matchesSearch = !q ||
      item.verb.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.thirdSingular.toLowerCase().includes(q) ||
      item.thirdPlural.toLowerCase().includes(q);
    return matchesGroup && matchesSearch;
  });

  const currentTenseMeta = TENSES_METADATA.find(t => t.key === selectedTense)!;
  const currentForms = selectedVerb.tenses[selectedTense] || selectedVerb.tenses['present']!;

  const playSpeech = (text: string) => {
    setPlayingText(text);
    speakFrench(text);
    setTimeout(() => setPlayingText(null), 1200);
  };

  const handleSelectVerb = (verb: VerbItem) => {
    const isLockedVerb = !isVip && !freeVerbIds.includes(verb.id);
    if (isLockedVerb) {
      onOpenVipModal?.(`🔒【${verb.infinitive} (${verb.meaning})】为 VIP 终身卡专属核心动词！输入卡密即可解锁全量动词库！`);
      return;
    }
    setSelectedVerb(verb);
  };

  const persons = [
    { key: 'je', pronoun: "je / j'", data: currentForms.je },
    { key: 'tu', pronoun: 'tu', data: currentForms.tu },
    { key: 'il_elle', pronoun: 'il / elle / on', data: currentForms.il_elle },
    { key: 'nous', pronoun: 'nous', data: currentForms.nous },
    { key: 'vous', pronoun: 'vous', data: currentForms.vous },
    { key: 'ils_elles', pronoun: 'ils / elles', data: currentForms.ils_elles },
  ];

  // 深度解析当前动词与上方【脱帽换衣法则】的具体因果关系链
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
            step1Desc: '原形 avoir ➔ 判定为四大天王核心祖先词，不套常规外衣',
            step2Title: 'Step 2 · 专属形态装配',
            step2Desc: "单数：j'ai (遇元音省音) / tu as / il a；复数：nous avons / vous avez / ils ont",
            step3Title: 'Step 3 · 专属发音秘籍',
            step3Desc: 'vous avez 必须连诵读 [vu-zave]；ils ont 读 [il-zõ] (严格区别于 ils sont 的 [s] 音)！',
            formula: '四大天王古形态（独立记忆：j\'ai, as, a, avons, avez, ont）',
            warning: '🚨 避坑重点：第一人称必须省音为 j\'ai；复数人称均带有高频 [z] 连音！',
            examBridge: {
              bridgeTitle: '🎯 直通文法考点 · 助动词发动机与配合枢纽',
              targetGrammar: '《复合过去时助动词选择》 & 《直宾代词 COD 提前配合》',
              bridgeDetail: '全法语 90% 以上动词的复合过去时，都直接调用这个 avoir 现在时作为助动词（j\'ai parlé, tu as fini）！平时分词不配合，唯独当直宾 COD 抢跑提前时（Les fleurs qu\'il a achetées），分词才回头做性数配合！'
            }
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
            warning: '🚨 避坑重点：vous êtes 必须连诵读成 [vu-zεt]；ils sont 发 [s] 音区别于 ils ont 的 [z]！',
            examBridge: {
              bridgeTitle: '🎯 直通文法考点 · 桥梁 2 & 3【位移动词 + 贴标签游戏】',
              targetGrammar: '《复合过去时 14 个位移动词配合》 & 《自反代动词性数配合》',
              bridgeDetail: 'être 是 16 个进出房子的位移动词与全部自反代动词的专属助动词！只要助动词是 être，分词立即充当形容词，必须贴标签（女生加 -e，大家加 -s：Elle est allée / Elles se sont levées）！'
            }
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
            warning: '🚨 避坑重点：复合过去时助动词必须使用 être (je suis allé)！',
            examBridge: {
              bridgeTitle: '🎯 直通文法考点 · 桥梁 3【位移用 être】& 副代词 y',
              targetGrammar: '《复合过去时配合绝招》 & 《考研双璧：副代词 y 与 en》',
              bridgeDetail: 'aller 复合过去时必须用 être（Je suis allé/allée），分词强制贴标签性数配合；同时 aller 后面接地点时，考研极高频考查副代词 y 的替代（Tu vas à Paris ? — Oui, j\'y vais）！'
            }
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
            warning: '🚨 考点大雷区：vous 的形式是 vous faites (不是 faisez)；ils 是 font！',
            examBridge: {
              bridgeTitle: '🎯 直通文法考点 · 桥梁 1【零件加工厂】& 使动结构',
              targetGrammar: '《未完成过去时词根》 & 《虚拟式变位》',
              bridgeDetail: '现在时复数 nous faisons 砍掉 -ons 得到的词根 fais-，直接用于生产未完成过去时（je faisais）；虚拟式发生特异大变身（que je fasse）；考研常考“faire + 动词原形”使动结构。'
            }
          };
        }

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
          warning: '💡 重点：第 3 组动词在各类考题中占 80% 以上，作为独立重点单词掌握！',
          examBridge: {
            bridgeTitle: '🎯 直通文法考点 · 桥梁 1【零件加工厂之不规则原料】',
            targetGrammar: '《虚拟式现在时命题触发器》 & 《从句时态配合》',
            bridgeDetail: `动词 ${selectedVerb.infinitive} 的现在时变位是虚拟式和未完成过去时的直接输入源！考研从句试题考查虚拟式时，核心就是考查 ${selectedVerb.infinitive} 的特殊变位词根。`
          }
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
          warning: '👂 听力秒杀：只有 nous [-on] 和 vous [-e] 发音不同，听觉上只有 3 种声音！',
          examBridge: {
            bridgeTitle: '🎯 直通文法考点 · 桥梁 1【零件加工厂 (The Stem Factory)】',
            targetGrammar: '《未完成过去时 vs 复合过去时》 & 《虚拟式现在时》',
            bridgeDetail: `现在时看似基础，实则是后续高级文法的零件车间！第 1 人称复数 nous ${stem}ons 砍掉 -ons 得到「${stem}-」，直接用于生产【未完成过去时 (je ${stem}ais)】；第 3 人称复数 ils ${stem}ent 砍掉 -ent 得到「${stem}-」，直接用于生产【虚拟式 (que je ${stem}e)】！`
          }
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
          warning: '👂 发音要点：复数标志性双胞胎 -iss- 发 [s] 音，极为响亮！',
          examBridge: {
            bridgeTitle: '🎯 直通文法考点 · 桥梁 1【双胞胎 -iss- 零件车间】',
            targetGrammar: '《未完成过去时》 & 《虚拟式现在时》',
            bridgeDetail: `第 2 组动词复数特有的双胞胎「-iss-」（nous ${stem}issons / ils ${stem}issent），正是考研考查【未完成过去时 (je ${stem}issais)】与【虚拟式 (que je ${stem}isse)】的送分与丢分分水岭！文法从句中必须保留 -iss- 词根！`
          }
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
          : '💡 提示：助动词与人称代词常发生省音（如 j\'ai）或连音（如 vous avez）！',
        examBridge: isEtreAux ? {
          bridgeTitle: '🎯 直通文法考点 · 桥梁 2 & 3【位移用 être 必须贴标签】',
          targetGrammar: '《复合过去时助动词选择与过去分词配合绝招》',
          bridgeDetail: '【考研语法改错最常考点】：因为本词是进出房子的位移动词，助动词强制选 être！分词立刻变成形容词：主语是女生必须加 -e（Elle est allée），主语是大家必须加 -s（Ils sont allés）！凡漏写 -e/-s 直接扣光分数！'
        } : {
          bridgeTitle: '🎯 直通文法考点 · 桥梁 4【直宾代词 COD 抢跑提前配合】',
          targetGrammar: '《直宾代词 COD 与间宾代词 COI 深度辨析》',
          bridgeDetail: '【考研失分重灾区】：用 avoir 时普通语序分词绝不配合（J\'ai acheté les fleurs）；但只要直宾代词（le/la/les）抢跑提前（Je les ai achetées）或先行词提前（Les fleurs que j\'ai achetées），分词回头看见直宾，必须立刻补贴 -e/-s 标签！间宾（lui/leur）抢跑绝不配合！'
        }
      };
    }

    if (selectedTense === 'imparfait') {
      return {
        badge: '✨ 未完成过去时推导法则',
        badgeClass: 'bg-indigo-50 text-indigo-900 border-indigo-200/80',
        ruleMapping: '对应时态法则：未完成过去时【直陈式现在时 nous 词根法】',
        relationWhy: '未完成过去时表示过去持续的背景描写、未完成状态或过去习惯动作。',
        step1Title: 'Step 1 · 提取现在时 nous 词根',
        step1Desc: `直陈式现在时 nous 形式砍掉 -ons ➔ 提取稳定词根`,
        step2Title: 'Step 2 · 穿上专属旧毛衣',
        step2Desc: '词根 + 专属后缀：-ais, -ais, -ait, -ions, -iez, -aient',
        step3Title: 'Step 3 · 听力音调特征',
        step3Desc: 'je, tu, il, ils 后缀全部读 [ε]（发音完全一致），仅 nous [-jõ] 和 vous [-je] 带半元音！',
        formula: '现在时 nous 词根 + (-ais, -ais, -ait, -ions, -iez, -aient)',
        warning: '💡 全法语仅 être 动词词根特异 (ét-)，其余 100% 动词严格执行此法则！',
        examBridge: {
          bridgeTitle: '🎯 直通文法考点 · 桥梁 1【零件加工厂】& 过去时间轴对决',
          targetGrammar: '《未完成过去时 vs 复合过去时：时间画卷与考研辨析》',
          bridgeDetail: '变位词根 100% 产自现在时 nous！文法大题必考两时态对决：描绘环境、心理、天气、过去习惯用未完成过去时（Il faisait beau）；突发插入的动作、推动情节发展用复合过去时（le téléphone a sonné）！'
        }
      };
    }

    if (selectedTense === 'subjonctif') {
      return {
        badge: '✨ 虚拟式现在时推导法则',
        badgeClass: 'bg-emerald-50 text-emerald-900 border-emerald-200/80',
        ruleMapping: '对应时态法则：虚拟式【直陈式现在时 ils 词根法】',
        relationWhy: '虚拟式用于表达主观愿望、情感态度、怀疑、必要性（常跟在 il faut que 从句后）。',
        step1Title: 'Step 1 · 提取现在时 ils 词根',
        step1Desc: `直陈式现在时 ils 形式砍掉 -ent ➔ 提取虚拟式加工原料`,
        step2Title: 'Step 2 · 穿上虚拟式外衣',
        step2Desc: '单数加 -e, -es, -e；复数 nous/vous 加 -ions, -iez；ils 加 -ent',
        step3Title: 'Step 3 · 特异动词锁定',
        step3Desc: '四大天王等特异词根：fasse (faire), aille (aller), sois (être), aie (avoir)',
        formula: '现在时 ils 词根 + (-e, -es, -e, -ions, -iez, -ent)',
        warning: '⚠️ 注意：nous 与 vous 的后缀带有 i (-ions, -iez)，听觉上带有清晰的 [j] 半元音！',
        examBridge: {
          bridgeTitle: '🎯 直通文法考点 · 桥梁 1【零件加工厂】& 命题触发器',
          targetGrammar: '《虚拟式现在时 (Subjonctif) 命题触发器》',
          bridgeDetail: '变位词根直接从现在时 ils 砍掉 -ent 批发而来！文法高频考点：Il faut que (必须)、vouloir que (想要)、bien que (尽管) 后面必须接虚拟式变位；考研送命陷阱：espérer que (希望) 后面只接直陈式将来时，绝不接虚拟式！'
        }
      };
    }

    if (selectedTense === 'futur_simple') {
      return {
        badge: '✨ 简单将来时推导法则',
        badgeClass: 'bg-amber-50 text-amber-900 border-amber-200/80',
        ruleMapping: '对应时态法则：简单将来时【原形整鱼保留法】',
        relationWhy: '简单将来时表示将来发生的事情或对将来的预测与计划。',
        step1Title: 'Step 1 · 保留整条鱼 (原形)',
        step1Desc: '以 -r 结尾的原形动词作为词根（第3组个别异化如 ser-, aur-, ir-, fer-）',
        step2Title: 'Step 2 · 拼装 avoir 现在时词尾',
        step2Desc: '词根 + (-ai, -as, -a, -ons, -ez, -ont)（正是 avoir 的现在时变位！）',
        step3Title: 'Step 3 · 尾音上扬特征',
        step3Desc: '重音全部落在词尾后缀上，发音坚决有力！',
        formula: '动词原形(保留-r) + avoir现在时尾缀 (-ai, -as, -a, -ons, -ez, -ont)',
        warning: '💡 记忆神技：词尾 -ai, -as, -a, -ons, -ez, -ont 恰好就是动词 avoir 的现在时！',
        examBridge: {
          bridgeTitle: '🎯 直通文法考点 · Si 条件从句主句时态呼应',
          targetGrammar: '《从句时态呼应》 & 《Si 条件从句系统》',
          bridgeDetail: '在文法从句中，最核心的考点就是【Si + 直陈式现在时 ➔ 主句必须用简单将来时】（Si tu viens demain, je serai content）！'
        }
      };
    }

    if (selectedTense === 'conditionnel') {
      return {
        badge: '✨ 条件式现在时推导法则',
        badgeClass: 'bg-violet-50 text-violet-900 border-violet-200/80',
        ruleMapping: '对应时态法则：条件式现在时【将来时鱼身 + 未完成旧毛衣】',
        relationWhy: '条件式用于表达礼貌请求、愿望建议，或在假设从句中表示与事实相反的假想。',
        step1Title: 'Step 1 · 借用将来时鱼身',
        step1Desc: '采用简单将来时的词根（全部以字母 -r 结尾）',
        step2Title: 'Step 2 · 穿上未完成旧毛衣',
        step2Desc: '词根 + 未完成过去时后缀 (-ais, -ais, -ait, -ions, -iez, -aient)',
        step3Title: 'Step 3 · 辨析发音差别',
        step3Desc: "第一人称 je 读 [ε]（发音区别于将来时的 [e]：j'aimerais vs j'aimerai）",
        formula: '简单将来时词根(带-r) + 未完成过去时后缀(-ais, -ais, -ait, -ions, -iez, -aient)',
        warning: '💡 绝妙构词：身体是将来时的词根，衣服是未完成过去时的词尾！',
        examBridge: {
          bridgeTitle: '🎯 直通文法考点 · Si 条件假设系统',
          targetGrammar: '《条件式现在时假想系统》',
          bridgeDetail: '文法必考大题：【Si + 未完成过去时 ➔ 主句必须搭配条件式现在时】（Si j\'avais le temps, je voyagerais）表示与现在事实相反的浪漫假想！'
        }
      };
    }

    if (selectedTense === 'imperatif') {
      return {
        badge: '✨ 命令式推导法则',
        badgeClass: 'bg-orange-50 text-orange-900 border-orange-200/80',
        ruleMapping: '对应时态法则：命令式【三大专有人称法】',
        relationWhy: '向对方发出指令、建议或请求，仅使用 tu, nous, vous 三个人称，省略主语代词。',
        step1Title: 'Step 1 · 锁定 3 个人称',
        step1Desc: '仅 tu, nous, vous 变位，丢掉主语代词',
        step2Title: 'Step 2 · 斩掉 tu 的末尾 -s',
        step2Desc: '第 1 组 -er 动词（包括 aller）的 tu 形式必须摘掉末尾的 -s！',
        step3Title: 'Step 3 · 特异命令式形态',
        step3Desc: 'Sois/Soyons/Soyez (être), Aie/Ayons/Ayez (avoir), Fais/Faisons/Faites (faire)',
        formula: '直陈式现在时对应形态 (第1组 tu 形式去 -s，省略主语)',
        warning: '🚨 避坑重点：第 1 组动词 Parle ! 绝不能写 Parles !',
        examBridge: {
          bridgeTitle: '🎯 直通文法考点 · 桥梁与副代词 y/en 联诵恢复 -s',
          targetGrammar: '《命令式代词后置与连字符规则》',
          bridgeDetail: '【考研改错必考陷阱】：第 1 组动词 tu 形式通常砍掉 -s（Parle ! / Va !）；但是，一旦后面跟了副代词 y 或 en，为了发音顺口，必须把砍掉的 -s 补回来加连字符（Vas-y ! / Parles-en !）！'
        }
      };
    }

    if (selectedTense === 'plus_que_parfait') {
      const isEtreAux = selectedVerb.auxiliary === 'être';
      return {
        badge: '✨ 愈过去时推导法则',
        badgeClass: 'bg-purple-50 text-purple-900 border-purple-200/80',
        ruleMapping: '对应时态法则：愈过去时【助动词未完成过去时 + 过去分词】',
        relationWhy: '愈过去时表示“过去的过去”，即在过去某一动作或时间之前就已经完成的动作。',
        step1Title: 'Step 1 · 助动词 imparfait 变位',
        step1Desc: isEtreAux 
          ? "位移动词强制使用 être 的未完成过去时 (j'étais, tu étais...)" 
          : "绝大多数动词使用 avoir 的未完成过去时 (j'avais, tu avais...)",
        step2Title: 'Step 2 · 挂载过去分词',
        step2Desc: `助动词 + 过去分词「${selectedVerb.participle}」`,
        step3Title: 'Step 3 · 性数配合铁律',
        step3Desc: isEtreAux 
          ? '助动词为 être 时，分词随主语性数配合 (阴性+e, 复数+s)！' 
          : '助动词为 avoir 时，直宾 COD 抢跑前置才配合，普通语序不配合。',
        formula: `助动词 ${selectedVerb.auxiliary} (imparfait) + 过去分词 (${selectedVerb.participle})`,
        warning: '💡 考研真题核心：常与复合过去时或未完成过去时形成时间先后对照（比过去更早）！',
        examBridge: {
          bridgeTitle: '🎯 直通文法考点 · 过去的过去时间先后链',
          targetGrammar: '《愈过去时与从句复合时态呼应》',
          bridgeDetail: '在复合叙事中，比过去动作更早发生的动作必须使用愈过去时（Quand il est arrivé, le train était déjà parti 当他到达时，火车已经开走了）！'
        }
      };
    }

    if (selectedTense === 'passe_simple') {
      return {
        badge: '🏛️ 简单过去时推导法则',
        badgeClass: 'bg-amber-50 text-amber-900 border-amber-200/80',
        ruleMapping: '对应时态法则：简单过去时【文学与考研阅读专用】',
        relationWhy: '简单过去时是法语纯书面语与文学叙事核心时态。考研二外重点：秒认第三人称（单数 il / 复数 ils）！',
        step1Title: 'Step 1 · 锁定词尾主音门派',
        step1Desc: '第1组动词为 -a 组 (-ai, -as, -a, -èrent)；第2组/部分第3组为 -i 组 (-is, -it, -irent)；部分第3组为 -u 组 (-us, -ut, -urent)',
        step2Title: 'Step 2 · 重点锁定第三人称',
        step2Desc: '阅读中 90% 考查第三人称单数 (il parla/il fut/il vit) 与复数 (ils parlèrent/ils furent)',
        step3Title: 'Step 3 · 特殊突变词根记忆',
        step3Desc: 'être ➔ il fut；avoir ➔ il eut；faire ➔ il fit；venir ➔ il vint',
        formula: '词根 + 简单过去时专属后缀 (重点记忆第 3 人称形态)',
        warning: '🚨 考研要诀：现代口语已不再使用，但在各大高校考研阅读中占 80% 叙事篇幅！',
        examBridge: {
          bridgeTitle: '🎯 直通文法考点 · 考研长难句阅读秒杀',
          targetGrammar: '《考研阅读 50 核心动词突变速认》',
          bridgeDetail: '阅卷不需要全人称拼写，只要在长难句中一眼看出 il fut = il a été (它是/它曾是)、il fit = il a fait (它做了)，就能瞬间读懂上下文！'
        }
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
    <div className="space-y-4 sm:space-y-6">
      
      {/* ========================================================================= */}
      {/* 🎩 独家自研 · 动词变位推导中心 & 脱帽换衣法则速查 (浅色高质感统一顶栏) */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-white via-rose-50/30 to-amber-50/20 rounded-3xl p-4 sm:p-6 border border-rose-200/80 shadow-xs space-y-3.5 overflow-hidden">
        {/* 顶部标题行与收起/展开按钮 */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#80142A] border border-rose-200/70 flex items-center justify-center text-base shadow-2xs shrink-0">
                🎩
              </span>
              <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
                动词活用推导 ·【脱帽换衣法则】速查指南
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 font-bold text-xs shadow-2xs">
                独家自研教学法 · 1分钟秒懂
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              <strong className="text-[#80142A]">核心心法：</strong>85% 以上的法语动词都是极守规矩的<strong>【脱帽换衣派】</strong>！摘掉原形词尾帽子（-er / -ir），按人称换上新衣服！四个人称发音完全一样！
            </p>
          </div>

          {/* 收起 / 展开 说明 */}
          <button
            onClick={() => setShowHatGuide(!showHatGuide)}
            className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1 shrink-0 cursor-pointer border border-slate-200/80 shadow-2xs self-start"
            title="点击展开或折叠法则说明"
          >
            {showHatGuide ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
            <span className="whitespace-nowrap">{showHatGuide ? '收起法则' : '展开法则'}</span>
          </button>
        </div>

        {/* 视图切换 (工作台 vs 代词小火车&COD配合 vs 法则宝典 vs 考研简单过去时50词) */}
        <div className="w-full min-w-0 pt-0.5">
          <div className="w-full overflow-x-auto no-scrollbar flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 gap-1 scroll-smooth">
            <button
              onClick={() => setViewMode('workbench')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                viewMode === 'workbench'
                  ? 'bg-white text-[#80142A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#80142A]" />
              <span>交互推导工作台</span>
            </button>
            <button
              onClick={() => setViewMode('pronouns_train')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                viewMode === 'pronouns_train'
                  ? 'bg-[#80142A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🚂</span>
              <span>代词小火车 & COD配合</span>
            </button>
            <button
              onClick={() => setViewMode('rules')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                viewMode === 'rules'
                  ? 'bg-white text-[#80142A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#80142A]" />
              <span>全景法则宝典</span>
            </button>
            <button
              onClick={() => setViewMode('passe_simple')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                viewMode === 'passe_simple'
                  ? 'bg-[#80142A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>🏛️ 考研简单过去时50词</span>
            </button>
          </div>
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

      {/* ========================================================================= */}
      {/* 模式 1：交互推导工作台 (全新通栏对称架构 · 告别左轻右重) */}
      {/* ========================================================================= */}
      {viewMode === 'workbench' && (
        <div className="space-y-4 sm:space-y-5">

          {/* ========================================================================= */}
          {/* ① 顶部动词选控中心 (Symmetrical Verb Selection Deck) */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-4 sm:p-5 space-y-3.5">
            {/* 上排：搜索框与门派分类胶囊 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜索动词 (如 avoir, être, parler, finir)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#80142A]/20 focus:bg-white transition text-slate-800"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* 分类药丸组 */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline">门派分类：</span>
                {[
                  { key: 'all', label: `全部 (${FRENCH_VERBS.length})` },
                  { key: '1st_er', label: '第1组 -er' },
                  { key: '2nd_ir', label: '第2组 -ir' },
                  { key: '3rd_irregular', label: '四大天王/特异' },
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setGroupFilter(tab.key as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      groupFilter === tab.key
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 下排：动词选择卡片胶囊网格 (整齐对称排列，支持 2/4/6 列自适应) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 pt-1">
              {filteredVerbs.map(verb => {
                const isSelected = selectedVerb.id === verb.id;
                const isLockedVerb = !isVip && !freeVerbIds.includes(verb.id);

                return (
                  <button
                    key={verb.id}
                    onClick={() => handleSelectVerb(verb)}
                    className={`p-2.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-1 group relative overflow-hidden ${
                      isSelected
                        ? 'bg-[#80142A] text-white border-[#80142A] shadow-md ring-2 ring-rose-200'
                        : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200/80 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-base font-black tracking-tight font-serif ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {verb.infinitive}
                      </span>
                      {isLockedVerb ? (
                        <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-black flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" /> VIP
                        </span>
                      ) : (
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          isSelected 
                            ? 'bg-white/20 text-white' 
                            : verb.group === '1st_er' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : verb.group === '2nd_ir' 
                            ? 'bg-sky-100 text-sky-800' 
                            : 'bg-purple-100 text-purple-900'
                        }`}>
                          {verb.group === '1st_er' ? '-er' : verb.group === '2nd_ir' ? '-ir' : '四大天王'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={`font-medium truncate ${isSelected ? 'text-rose-100' : 'text-slate-600'}`}>
                        {verb.meaning}
                      </span>
                    </div>
                    <div className={`text-[10px] font-mono truncate pt-0.5 border-t ${
                      isSelected ? 'border-white/20 text-white/80' : 'border-slate-200/60 text-slate-400'
                    }`}>
                      分词: {verb.participle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 🏠 La Maison d'Être（16 个房屋动词成对速记与配合图谱） */}
          {showMaisonEtre && (
            <div className="bg-gradient-to-r from-rose-50/90 via-amber-50/40 to-white p-5 rounded-3xl border border-rose-200/90 shadow-xs space-y-3.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl">🏠</span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    法兰西名师图谱：La Maison d'Être（16 个房屋动词与性数配合铁律）
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-[#80142A] text-[10px] font-black">
                    复合过去时核心考点
                  </span>
                </div>
                <button
                  onClick={() => setShowMaisonEtre(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                >
                  收起图谱
                </button>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                全法语 90% 动词助动词用 <strong>avoir</strong>，唯独<strong>「16 个房屋位移动词（8 对反义词）」</strong>与<strong>全部自反代动词</strong>助动词必须用 <strong>être</strong>，且过去分词必须与主语<strong>【性数配合（贴标签）】</strong>！
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { pair: '1. 进出对', v1: 'entrer (进入)', v2: 'sortir (出去)' },
                  { pair: '2. 到离对', v1: 'arriver (到达)', v2: 'partir (离开)' },
                  { pair: '3. 升降对', v1: 'monter (上升)', v2: 'descendre (下降)' },
                  { pair: '4. 去来对', v1: 'aller (去)', v2: 'venir (来)' },
                  { pair: '5. 生死对', v1: 'naître (出生)', v2: 'mourir (死亡)' },
                  { pair: '6. 留经对', v1: 'rester (停留)', v2: 'passer (经过)' },
                  { pair: '7. 回落对', v1: 'retourner (返回)', v2: 'tomber (跌倒)' },
                  { pair: '8. 重复对', v1: 'rentrer (回家)', v2: 'revenir (再来)' },
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-2xl bg-white border border-rose-200/80 shadow-2xs space-y-0.5">
                    <span className="text-[10px] font-bold text-rose-800 block">{item.pair}</span>
                    <div className="font-serif font-black text-slate-800 text-xs">{item.v1}</div>
                    <div className="font-serif font-black text-[#80142A] text-xs">{item.v2}</div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-2xl bg-white/95 border border-amber-200/90 text-xs text-slate-800 space-y-1 font-medium shadow-2xs">
                <div className="font-black text-amber-900 flex items-center gap-1">
                  <span>⚠️ 过去分词性数配合规则（主语贴标签）：</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono pt-0.5">
                  <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-200">阳单：Il est allé (不加)</span>
                  <span className="p-1.5 rounded-lg bg-rose-50 text-rose-900 border border-rose-200 font-bold">阴单：Elle est allée (+e)</span>
                  <span className="p-1.5 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 font-bold">阳复：Ils sont allés (+s)</span>
                  <span className="p-1.5 rounded-lg bg-purple-50 text-purple-900 border border-purple-200 font-bold">阴复：Elles sont allées (+es)</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ② 选中的动词大标头 + 7 大核心时态对称矩阵 */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
            
            {/* 动词大标头 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
                  {selectedVerb.infinitive}
                </span>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[#80142A]">
                      ({selectedVerb.meaning})
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#80142A] border border-rose-200 text-xs font-extrabold">
                      {selectedVerb.group === '1st_er' ? '第 1 组 · 脱帽换衣派' : selectedVerb.group === '2nd_ir' ? '第 2 组 · 双 s 家族' : '第 3 组 · 四大天王/特异派'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/60">
                      过去分词: <strong className="text-[#80142A] font-serif">{selectedVerb.participle}</strong>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/60">
                      助动词: <strong>{selectedVerb.auxiliary}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                <button
                  onClick={() => setShowMaisonEtre(!showMaisonEtre)}
                  className={`px-3 py-2 rounded-xl border text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                    showMaisonEtre ? 'bg-rose-50 text-[#80142A] border-rose-300' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                  title="查看 16 个房屋位移动词图谱"
                >
                  <span>🏠</span>
                  <span>{showMaisonEtre ? '收起房屋动词' : '房屋动词速记图'}</span>
                </button>

                <button
                  onClick={() => playSpeech(selectedVerb.infinitive)}
                  className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#80142A] border border-rose-200 text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="朗读原形发音"
                >
                  <Volume2 className="w-4 h-4 text-[#80142A]" />
                  <span>朗读原形</span>
                </button>
              </div>
            </div>

            {/* 7 大时态切换条 (对称网格) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#80142A]" />
                  切换目标活用时态（点击即刻执行推导）
                </span>
                <span className="text-xs text-[#80142A] font-black">
                  当前时态：{currentTenseMeta.label}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
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
                      className={`p-2.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-1 ${
                        isActive
                          ? 'bg-[#80142A] text-white border-[#80142A] shadow-md ring-2 ring-rose-200'
                          : isLockedTense
                          ? 'bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-200/80'
                          : hasThisTense
                          ? 'bg-slate-50/80 hover:bg-slate-100 text-slate-800 border-slate-200/80'
                          : 'bg-slate-100/40 text-slate-300 border-slate-100 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-black ${isActive ? 'text-white' : 'text-slate-900'}`}>
                          {t.label}
                        </span>
                        {isLockedTense && <Lock className="w-3 h-3 text-amber-500 shrink-0" />}
                      </div>
                      <span className={`text-[10px] font-medium truncate ${isActive ? 'text-rose-100' : 'text-slate-400'}`}>
                        {t.frenchLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ===================================================================== */}
            {/* ③ 动态推导核心舞台：【本词与上方脱帽换衣法则的关系链】 */}
            {/* ===================================================================== */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-slate-50 via-rose-50/20 to-white border border-slate-200/80 text-xs text-[#29354A] space-y-3.5 shadow-2xs">
              
              {/* 1. 对应上方说明法则的明确锚点 */}
              <div className="space-y-1.5 pb-2.5 border-b border-slate-200/70">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 font-black text-xs text-[#80142A]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>【{selectedVerb.infinitive}】与上方说明法则的关系：</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] border ${derivation.badgeClass}`}>
                    {derivation.badge}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-900 bg-white/90 px-2.5 py-1 rounded-lg border border-slate-200/60 inline-block shadow-2xs">
                  📌 {derivation.ruleMapping}
                </p>
                <p className="text-[11px] leading-relaxed text-slate-600 font-medium">
                  {derivation.relationWhy}
                </p>
              </div>

              {/* 2. 具体 3 步推导装配流 (精准针对当前动词) */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  具体 3 步推导变位过程：
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                    <span className="text-[10px] font-black text-[#80142A] px-1.5 py-0.2 rounded bg-rose-50 border border-rose-200/60">
                      {derivation.step1Title}
                    </span>
                    <p className="text-xs text-slate-700 leading-snug font-medium">
                      {derivation.step1Desc}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                    <span className="text-[10px] font-black text-sky-800 px-1.5 py-0.2 rounded bg-sky-50 border border-sky-200/60">
                      {derivation.step2Title}
                    </span>
                    <p className="text-xs text-slate-700 leading-snug font-medium">
                      {derivation.step2Desc}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                    <span className="text-[10px] font-black text-emerald-800 px-1.5 py-0.2 rounded bg-emerald-50 border border-emerald-200/60">
                      {derivation.step3Title}
                    </span>
                    <p className="text-xs text-slate-700 leading-snug font-medium">
                      {derivation.step3Desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. 公式与预警小贴士 */}
              <div className="p-3 rounded-2xl bg-white/95 border border-slate-200/80 space-y-1">
                <div className="text-xs text-slate-700">
                  <span className="font-bold text-slate-500">变位公式：</span>
                  <span className="font-mono text-[#80142A] font-black">{derivation.formula}</span>
                </div>
                <div className="text-[11px] font-semibold text-amber-900 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200/70">
                  {derivation.warning}
                </div>
              </div>

              {/* 4. 直通文法考点 · 变位与真题为什么紧密相连 */}
              {derivation.examBridge && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50/60 via-rose-50/30 to-white border border-rose-200/90 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-[#80142A] text-white text-[11px] font-black tracking-wide shadow-2xs">
                        {derivation.examBridge.bridgeTitle}
                      </span>
                      <span className="text-xs font-black text-slate-800">
                        {derivation.examBridge.targetGrammar}
                      </span>
                    </div>
                    <span className="text-[10px] text-rose-800 font-bold bg-rose-100/70 px-2 py-0.5 rounded-full border border-rose-200/60">
                      考研二外 & DELF 必考纽带
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white/80 p-2.5 rounded-xl border border-rose-100/80">
                    {derivation.examBridge.bridgeDetail}
                  </p>
                </div>
              )}

            </div>

            {/* ===================================================================== */}
            {/* ④ 6 个人称变位实战卡片 (整齐划一的 2x3 / 3x2 对称网格) */}
            {/* ========================================================================= */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                6 个人称变位实战拼读（点击整卡即刻原声朗读）
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                          <span className="text-xs font-mono font-bold text-slate-400">
                            {p.pronoun}
                          </span>
                          {note && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200/70">
                              {note}
                            </span>
                          )}
                        </div>
                        <div className="text-lg font-extrabold tracking-tight font-serif">
                          <span className="text-slate-800">{p.data.stem}</span>
                          <span className="text-[#80142A] bg-rose-50 px-1.5 py-0.5 rounded-md font-black">
                            {p.data.ending}
                          </span>
                        </div>
                      </div>

                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition ${
                        isPlaying 
                          ? 'bg-[#80142A] text-white' 
                          : 'bg-white text-slate-400 group-hover:bg-[#80142A] group-hover:text-white shadow-2xs border border-slate-200/70'
                      }`}>
                        <Volume2 className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ===================================================================== */}
            {/* ⑤ 实战例句应用场景卡片 */}
            {/* ===================================================================== */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                实战例句应用场景
              </div>
              <p className="text-sm font-serif font-bold text-[#80142A]">
                « {selectedVerb.sampleSentence.french} »
              </p>
              <p className="text-xs text-slate-600 font-medium">
                {selectedVerb.sampleSentence.chinese}
              </p>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* ⑥ 当前动词全部时态速查表 (Full Matrix Table 一键展开/收起 + 初学核心分级) */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Table className="w-4 h-4 text-[#80142A]" />
                <h3 className="text-sm font-black text-slate-900">
                  【{selectedVerb.infinitive}】变位活用横向速查表
                </h3>

                {/* 初学核心 4 大时态 vs 全量 8 大时态快速切换 */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs">
                  <button
                    onClick={() => setMatrixTenseFilter('core')}
                    className={`px-2.5 py-1 rounded-lg font-black transition cursor-pointer ${
                      matrixTenseFilter === 'core'
                        ? 'bg-white text-[#80142A] shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    🌟 初学核心 4 大时态
                  </button>
                  <button
                    onClick={() => setMatrixTenseFilter('all')}
                    className={`px-2.5 py-1 rounded-lg font-black transition cursor-pointer ${
                      matrixTenseFilter === 'all'
                        ? 'bg-white text-[#80142A] shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    📚 展开全部 8 大时态
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowFullMatrix(!showFullMatrix)}
                className="text-xs font-bold text-[#80142A] hover:underline flex items-center gap-1 cursor-pointer self-end sm:self-auto"
              >
                {showFullMatrix ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>{showFullMatrix ? '收起速查表' : '展开速查表'}</span>
              </button>
            </div>

            {showFullMatrix && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
                {TENSES_METADATA
                  .filter(t => matrixTenseFilter === 'all' || ['present', 'passe_compose', 'imparfait', 'futur_simple'].includes(t.key))
                  .map(t => {
                  const forms = selectedVerb.tenses[t.key];
                  if (!forms) return null;
                  const isCurrent = t.key === selectedTense;

                  return (
                    <div
                      key={t.key}
                      onClick={() => setSelectedTense(t.key)}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition space-y-1.5 ${
                        isCurrent
                          ? 'bg-rose-50/70 border-[#80142A] ring-1 ring-[#80142A]'
                          : 'bg-slate-50/70 hover:bg-white border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">
                          {t.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {t.frenchLabel}
                        </span>
                      </div>
                      <div className="space-y-0.5 text-[11px] font-mono">
                        <div className="text-slate-600 truncate">je {forms.je.full}</div>
                        <div className="text-slate-600 truncate">nous {forms.nous.full}</div>
                        <div className="text-[#80142A] font-bold truncate">ils {forms.ils_elles.full}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 模式 2：人称代词前置「多节小火车轨道图」与提前直宾 COD 性数配合铁律 */}
      {/* ========================================================================= */}
      {viewMode === 'pronouns_train' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* ① 顶栏：教授级心法与双向轨道切换 */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-white via-rose-50/40 to-amber-50/20 border border-rose-200/90 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#80142A] text-white font-black text-xs">
                    🚂 教授级核心图谱
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    人称代词前置「多节小火车轨道图（Train des pronoms）」
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-black">
                    口诀：一二在三前，直在间前，y在en前，全在动词前
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  法语代词前置是各大语法考试最易丢分的死穴。牢记<strong>“车厢固定编组”</strong>，无论出现几个代词，绝不上错车厢！
                </p>
              </div>

              {/* 顺向 vs 倒向 轨道模式切换 */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0 self-start md:self-auto">
                <button
                  onClick={() => setTrainTrackMode('declarative')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 ${
                    trainTrackMode === 'declarative'
                      ? 'bg-white text-[#80142A] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>直陈式 / 否定命令式 (顺向)</span>
                </button>
                <button
                  onClick={() => setTrainTrackMode('imperative')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 ${
                    trainTrackMode === 'imperative'
                      ? 'bg-[#80142A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>肯定命令式 (轨道反转)</span>
                </button>
              </div>
            </div>

            {/* ② 小火车轨道视觉模型 */}
            {trainTrackMode === 'declarative' ? (
              /* 顺向轨道（动词前置） */
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-slate-500 flex items-center justify-between">
                  <span>🚆 标准顺向轨道：所有代词排在动词【之前】</span>
                  <span className="text-[#80142A] font-bold">自反/一二人称 ➔ 直宾 ➔ 间宾 ➔ y ➔ en ➔ 动词</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
                  {/* 车头/主语 */}
                  <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 text-center space-y-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase block">起点 · 主语</span>
                    <span className="text-sm font-black text-slate-800">Sujet</span>
                    <span className="text-[10px] text-slate-400 block font-mono">je, tu, il...</span>
                  </div>

                  {/* 车厢 1 */}
                  <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-center space-y-1 ring-1 ring-sky-300/40">
                    <span className="text-[10px] font-black text-sky-800 block">车厢 1 · 一二及自反</span>
                    <span className="text-xs sm:text-sm font-black text-sky-900 font-mono">me, te, se, nous, vous</span>
                    <span className="text-[10px] text-sky-600 block">第一、二人称与自反</span>
                  </div>

                  {/* 车厢 2 */}
                  <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-1 ring-1 ring-rose-300/40">
                    <span className="text-[10px] font-black text-[#80142A] block">车厢 2 · 第三人直宾</span>
                    <span className="text-xs sm:text-sm font-black text-[#80142A] font-mono">le, la, l', les</span>
                    <span className="text-[10px] text-rose-600 block">COD 直接宾语</span>
                  </div>

                  {/* 车厢 3 */}
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1 ring-1 ring-amber-300/40">
                    <span className="text-[10px] font-black text-amber-900 block">车厢 3 · 第三人间宾</span>
                    <span className="text-xs sm:text-sm font-black text-amber-900 font-mono">lui, leur</span>
                    <span className="text-[10px] text-amber-700 block">COI 间接宾语 (à + 人)</span>
                  </div>

                  {/* 车厢 4 */}
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1 ring-1 ring-emerald-300/40">
                    <span className="text-[10px] font-black text-emerald-900 block">车厢 4 · 副代词 y</span>
                    <span className="text-sm font-black text-emerald-900 font-mono">y</span>
                    <span className="text-[10px] text-emerald-700 block">地点 / à + 事物</span>
                  </div>

                  {/* 车厢 5 */}
                  <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-center space-y-1 ring-1 ring-purple-300/40">
                    <span className="text-[10px] font-black text-purple-900 block">车厢 5 · 副代词 en</span>
                    <span className="text-sm font-black text-purple-900 font-mono">en</span>
                    <span className="text-[10px] text-purple-700 block">数量 / de + 事物</span>
                  </div>

                  {/* 终点站：机车动词 */}
                  <div className="p-3 rounded-2xl bg-[#80142A] text-white text-center space-y-1 shadow-xs">
                    <span className="text-[10px] font-black text-rose-200 uppercase block">终点 · 动词机车</span>
                    <span className="text-sm font-black font-serif">VERBE</span>
                    <span className="text-[10px] text-rose-200 block font-mono">变位动词</span>
                  </div>
                </div>

                {/* 经典顺向真题例句拆解 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                    🎯 经典双代词轨道实战拆解：
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div 
                      onClick={() => speakFrench("Il me le donne.")}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50/50 border border-slate-100 flex items-center justify-between cursor-pointer group transition"
                    >
                      <div>
                        <p className="font-bold text-slate-900 font-mono">Il <span className="text-sky-700 font-black">me</span> <span className="text-[#80142A] font-black">le</span> donne.</p>
                        <p className="text-[11px] text-slate-500">他把它给我（me 车厢1 + le 车厢2 + donne）</p>
                      </div>
                      <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-[#80142A]" />
                    </div>

                    <div 
                      onClick={() => speakFrench("Je le lui explique.")}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50/50 border border-slate-100 flex items-center justify-between cursor-pointer group transition"
                    >
                      <div>
                        <p className="font-bold text-slate-900 font-mono">Je <span className="text-[#80142A] font-black">le</span> <span className="text-amber-700 font-black">lui</span> explique.</p>
                        <p className="text-[11px] text-slate-500">我向他解释这件事（le 车厢2 + lui 车厢3 + explique）</p>
                      </div>
                      <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-[#80142A]" />
                    </div>

                    <div 
                      onClick={() => speakFrench("Il y en a trois.")}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50/50 border border-slate-100 flex items-center justify-between cursor-pointer group transition"
                    >
                      <div>
                        <p className="font-bold text-slate-900 font-mono">Il <span className="text-emerald-700 font-black">y</span> <span className="text-purple-700 font-black">en</span> a trois.</p>
                        <p className="text-[11px] text-slate-500">那里有三个（y 车厢4 + en 车厢5 + a）</p>
                      </div>
                      <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-[#80142A]" />
                    </div>

                    <div 
                      onClick={() => speakFrench("Elle ne nous les a pas montrés.")}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50/50 border border-slate-100 flex items-center justify-between cursor-pointer group transition"
                    >
                      <div>
                        <p className="font-bold text-slate-900 font-mono">Elle ne <span className="text-sky-700 font-black">nous</span> <span className="text-[#80142A] font-black">les</span> a pas montrés.</p>
                        <p className="text-[11px] text-slate-500">否定句：ne 放在小火车最前，pas 夹在助动词后</p>
                      </div>
                      <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-[#80142A]" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* 倒向轨道（肯定命令式） */
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-slate-500 flex items-center justify-between">
                  <span>🚨 肯定命令式倒向轨道：动词打头，代词全部拖在【后面】并加连字符！</span>
                  <span className="text-[#80142A] font-bold">动词 ➔ 直宾 (le/la/les) ➔ 间宾 (moi/toi/lui/leur) ➔ y ➔ en</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {/* 车头：命令式动词 */}
                  <div className="p-3 rounded-2xl bg-[#80142A] text-white text-center space-y-1 shadow-xs">
                    <span className="text-[10px] font-black text-rose-200 uppercase block">打头机车 · 动词 !</span>
                    <span className="text-sm font-black font-serif">VERBE !</span>
                    <span className="text-[10px] text-rose-200 block font-mono">Donne / Parlez</span>
                  </div>

                  {/* 倒向车厢 1：直宾抢到前面 */}
                  <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-1 ring-1 ring-rose-300/40">
                    <span className="text-[10px] font-black text-[#80142A] block">车厢 1 · 直宾抢先</span>
                    <span className="text-sm font-black text-[#80142A] font-mono">-le, -la, -les</span>
                    <span className="text-[10px] text-rose-600 block">直接宾语排在动词正后方</span>
                  </div>

                  {/* 倒向车厢 2：间宾与人称 */}
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1 ring-1 ring-amber-300/40">
                    <span className="text-[10px] font-black text-amber-900 block">车厢 2 · 间宾与重读</span>
                    <span className="text-sm font-black text-amber-900 font-mono">-moi, -toi, -lui, -nous, -vous, -leur</span>
                    <span className="text-[10px] text-amber-700 block">⚠️ me/te 变成 moi/toi！</span>
                  </div>

                  {/* 倒向车厢 3：副代词 y */}
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1 ring-1 ring-emerald-300/40">
                    <span className="text-[10px] font-black text-emerald-900 block">车厢 3 · 副代词 y</span>
                    <span className="text-sm font-black text-emerald-900 font-mono">-y</span>
                    <span className="text-[10px] text-emerald-700 block">地点代词 (Vas-y !)</span>
                  </div>

                  {/* 倒向车厢 4：副代词 en */}
                  <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-center space-y-1 ring-1 ring-purple-300/40">
                    <span className="text-[10px] font-black text-purple-900 block">车厢 4 · 副代词 en</span>
                    <span className="text-sm font-black text-purple-900 font-mono">-en</span>
                    <span className="text-[10px] text-purple-700 block">遇到 moi/toi 省音为 -m'en / -t'en</span>
                  </div>
                </div>

                {/* 肯定命令式真题例句 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                    ⚡ 肯定命令式考点避坑实例：
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div 
                      onClick={() => speakFrench("Donne-le-moi !")}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50/50 border border-slate-100 flex items-center justify-between cursor-pointer group transition"
                    >
                      <div>
                        <p className="font-bold text-slate-900 font-mono">Donne-<span className="text-[#80142A]">le</span>-<span className="text-amber-700">moi</span> !</p>
                        <p className="text-[11px] text-slate-500">把它给我！(不能写 Donne-moi-le)</p>
                      </div>
                      <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-[#80142A]" />
                    </div>

                    <div 
                      onClick={() => speakFrench("Donne-m'en !")}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50/50 border border-slate-100 flex items-center justify-between cursor-pointer group transition"
                    >
                      <div>
                        <p className="font-bold text-slate-900 font-mono">Donne-<span className="text-purple-700">m'en</span> !</p>
                        <p className="text-[11px] text-slate-500">给我一点！(moi 遇到 en 省音缩合为 m'en)</p>
                      </div>
                      <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-[#80142A]" />
                    </div>

                    <div 
                      onClick={() => speakFrench("Vas-y !")}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50/50 border border-slate-100 flex items-center justify-between cursor-pointer group transition"
                    >
                      <div>
                        <p className="font-bold text-slate-900 font-mono">Va<span className="text-[#80142A] font-black">s</span>-y !</p>
                        <p className="text-[11px] text-slate-500">去吧！(tu原本砍掉的-s为了发音连读补回)</p>
                      </div>
                      <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-[#80142A]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ③ 复合过去时：提前直宾 COD 性数配合铁律 (L'accord du participe passé) */}
          <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-white via-indigo-50/30 to-rose-50/20 border border-indigo-200/90 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-200 text-xs font-black">
                    ⚖️ 语法配合最高法庭
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    提前直接宾语 COD 过去分词性数配合铁律
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#80142A] border border-rose-200 text-[11px] font-black">
                    考研/专四必考雷区
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  助动词用 <code>avoir</code> 时，分词原本绝不配合；<strong>只要直接宾语（COD）抢跑提前到动词前面，过去分词回头看见直宾，必须立刻追加性数配合（阴性+e，复数+s）！间宾（COI）提前 100% 绝不配合！</strong>
                </p>
              </div>
            </div>

            {/* 4组经典对比测试仪 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 对比 1：COD在后 vs COD提前 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-slate-900">场景 1 · 直宾代词 (le/la/les) 抢跑提前</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">必须配合</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                    <div className="flex items-center justify-between font-bold text-slate-700">
                      <span>J'ai acheté les fleurs.</span>
                      <span className="text-slate-400 font-mono text-[10px]">COD在后 ➔ 0配合</span>
                    </div>
                    <p className="text-[11px] text-slate-500">les fleurs（阴性复数）排在动词后面，分词维持原形 acheté。</p>
                  </div>

                  <div 
                    onClick={() => speakFrench("Je les ai achetées.")}
                    className="p-2.5 rounded-xl bg-rose-50 border border-rose-200/80 space-y-0.5 cursor-pointer group transition hover:shadow-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 font-mono">
                      <span>Je <span className="text-[#80142A] underline font-black">les</span> ai acheté<span className="text-[#80142A] font-black underline">es</span>.</span>
                      <div className="flex items-center gap-1 text-[#80142A] text-[10px]">
                        <span>+es (阴复)</span>
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-[11px] text-[#80142A]">直宾代词 les 抢到前面，分词回头对齐 les fleurs，强制补上 -es！</p>
                  </div>
                </div>
              </div>

              {/* 对比 2：关系代词 que 先行词提前 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-slate-900">场景 2 · 关系代词 que 引导先行词提前</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 font-bold">考研阅读常客</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div 
                    onClick={() => speakFrench("Les fleurs que j'ai achetées sont fraîches.")}
                    className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-0.5 cursor-pointer group transition hover:shadow-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 font-mono">
                      <span>Les fleurs que j'ai acheté<span className="text-indigo-700 font-black underline">es</span>...</span>
                      <div className="flex items-center gap-1 text-indigo-700 text-[10px]">
                        <span>+es 配合</span>
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600">先行词 Les fleurs 作为直宾被 que 抽到动词前，分词必须与先行词配合！</p>
                  </div>

                  <div 
                    onClick={() => speakFrench("Combien de lettres as-tu écrites ?")}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5 cursor-pointer group transition"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 font-mono">
                      <span>Combien de lettres as-tu écrit<span className="text-indigo-700 font-black underline">es</span> ?</span>
                      <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-700" />
                    </div>
                    <p className="text-[11px] text-slate-500">疑问词 Combien de + 阴复名词提前，分词同样必须配合！</p>
                  </div>
                </div>
              </div>

              {/* 对比 3：间宾 COI 提前 100% 绝不配合 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-slate-900">场景 3 · 间接宾语 COI (lui/leur) 提前</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-100 text-[#80142A] border border-rose-300 font-black">🚨 100% 绝不配合</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div 
                    onClick={() => speakFrench("Je leur ai téléphoné.")}
                    className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-0.5 cursor-pointer group transition"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 font-mono">
                      <span>Je leur ai téléphoné.</span>
                      <span className="text-amber-800 text-[10px] font-bold">0 配合！绝对不加 s！</span>
                    </div>
                    <p className="text-[11px] text-slate-600">téléphoner à qn 是间接及物！leur 代表 à eux/elles（间宾），分词绝不配合！</p>
                  </div>

                  <div 
                    onClick={() => speakFrench("Ils se sont parlé.")}
                    className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-0.5 cursor-pointer group transition"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 font-mono">
                      <span>Ils se sont parlé.</span>
                      <span className="text-amber-800 text-[10px] font-bold">0 配合！绝对不加 s！</span>
                    </div>
                    <p className="text-[11px] text-slate-600">parler à qn 互相对话：se 是间接宾语，分词严禁加 s！写 parlés 直接 0 分！</p>
                  </div>
                </div>
              </div>

              {/* 对比 4：自反代动词的真假直宾陷阱 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-slate-900">场景 4 · 自反代动词的真假直宾陷阱</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200 font-bold">北外考研必考</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div 
                    onClick={() => speakFrench("Elle s'est lavée.")}
                    className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-200 space-y-0.5 cursor-pointer group transition"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 font-mono">
                      <span>Elle s'est lavé<span className="text-purple-700 underline font-black">e</span>.</span>
                      <span className="text-purple-700 text-[10px] font-bold">+e 配合 (se是直宾)</span>
                    </div>
                    <p className="text-[11px] text-slate-600">她洗了自己：se 是洗的直接承受者（COD），且在动词前 ➔ 必须加 e！</p>
                  </div>

                  <div 
                    onClick={() => speakFrench("Elle s'est lavé les mains.")}
                    className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-200 space-y-0.5 cursor-pointer group transition"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 font-mono">
                      <span>Elle s'est lavé les mains.</span>
                      <span className="text-[#80142A] text-[10px] font-bold">0 配合！严禁加 e！</span>
                    </div>
                    <p className="text-[11px] text-[#80142A]">直宾是后面的 les mains（双手在后不配合），se 被挤压成间宾（给自己洗）➔ 分词不配合！</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 一秒判断三字诀 */}
            <div className="p-4 rounded-2xl bg-white border border-indigo-100 text-xs text-slate-700 space-y-1.5">
              <span className="font-black text-indigo-950 uppercase tracking-wider block">
                💡 考场一秒配合判定心法（问自己两句话）：
              </span>
              <p className="leading-relaxed">
                1. 动词前面有没有<strong>直接宾语</strong>？（没有 ➔ 一律不配合；有 ➔ 看下一步）<br/>
                2. 那个前面的代词是<strong>直宾（COD）</strong>还是<strong>间宾（COI）</strong>？（是 lui/leur/间宾自反 ➔ 绝不配合；是 le/la/les/que/直宾自反 ➔ 必须精准对齐性数！）
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 模式 3：全景法则宝典 (Global Rules Encyclopedia) */}
      {/* ========================================================================= */}
      {viewMode === 'rules' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 text-rose-950 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#80142A] shrink-0" />
              <span className="font-bold">
                7 大时态宏观法则表：横向对比第 1 组 -er、第 2 组 -ir、四大天王与特异动词的变化规律与变位公式。
              </span>
            </div>
            <button
              onClick={() => setViewMode('workbench')}
              className="px-3 py-1 rounded-xl bg-white text-[#80142A] font-bold border border-rose-200 hover:bg-rose-50 transition shrink-0 cursor-pointer shadow-2xs"
            >
              返回交互推导工作台 ➔
            </button>
          </div>

          <div className="space-y-3">
            {FRENCH_TENSE_RULES.map(rule => (
              <div key={rule.key} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-[#80142A]">
                      {rule.tenseName}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      ({rule.frenchName})
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {rule.usageDesc}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-emerald-900 block">第 1 组动词 (-er)</span>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{rule.rules.group1}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-sky-900 block">第 2 组动词 (-ir)</span>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{rule.rules.group2}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-purple-900 block">第 3 组 (四大天王/特异)</span>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{rule.rules.group3}</p>
                  </div>
                </div>

                {/* Samples */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
                  <span className="text-slate-400 font-bold text-[11px]">经典演练范例：</span>
                  {rule.sample.map((s, idx) => (
                    <span
                      key={idx}
                      onClick={() => playSpeech(s.conjugated)}
                      className="px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#80142A] border border-rose-200 font-semibold cursor-pointer transition flex items-center gap-1"
                      title="点击朗读变形发音"
                    >
                      <span className="text-slate-400 line-through mr-0.5">{s.infinitive}</span>
                      <ArrowRight className="w-2.5 h-2.5 text-[#80142A]" />
                      <span className="font-bold">{s.conjugated}</span>
                      <span className="text-[10px] text-slate-400">({s.meaning})</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ③ 考研阅读专供：简单过去时 (Passé Simple) 50 核心动词速认宝典 */}
      {/* ========================================================================= */}
      {viewMode === 'passe_simple' && (
        <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-300">
          {/* 顶栏卡片：北外考研名师导学 & 痛点剖析 */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 border border-amber-200/90 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#80142A] text-white font-black text-xs">
                    🏛️ 北外考研二外攻坚课
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    简单过去时（Passé simple）50 核心动词速认宝典
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-[#80142A] text-xs font-bold">
                    阅读理解提分核心武器
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  <strong>【痛点破解】</strong>简单过去时在现代口语中已基本绝迹，但在各大名校（北外、北大、上外、复旦、人大等）二外法语真题阅读长难句中<strong>占 85% 以上的叙事篇幅</strong>！考研阅卷<strong>不需要你全人称默写，核心痛点是识别第三人称（单数 il / 复数 ils）与异化突变词根</strong>！
                </p>
              </div>
              <button
                onClick={() => setViewMode('workbench')}
                className="px-3.5 py-1.5 rounded-xl bg-white text-[#80142A] font-bold border border-rose-200 hover:bg-rose-50 transition shrink-0 cursor-pointer text-xs shadow-2xs self-start md:self-auto"
              >
                返回交互推导工作台 ➔
              </button>
            </div>

            {/* 4 大核心音变识别心法卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 border-t border-amber-200/70 text-xs">
              <div className="p-3 bg-white/90 rounded-2xl border border-amber-100">
                <span className="font-black text-amber-900 block mb-1">① -a 型（第1组 & aller）</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  词尾：<code className="text-[#80142A] font-bold">-a / -èrent</code><br/>
                  如 <span className="font-semibold">il parla, ils parlèrent</span>；<span className="font-semibold">il alla, ils allèrent</span>。
                </p>
              </div>
              <div className="p-3 bg-white/90 rounded-2xl border border-sky-100">
                <span className="font-black text-sky-900 block mb-1">② -i 型（第2组 & 部分第3组）</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  词尾：<code className="text-sky-800 font-bold">-it / -irent</code><br/>
                  如 <span className="font-semibold">il finit, il prit, il vit, il fit, il naquit</span>。
                </p>
              </div>
              <div className="p-3 bg-white/90 rounded-2xl border border-purple-100">
                <span className="font-black text-purple-900 block mb-1">③ -u 型（三大核心神仙变位）</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  词尾：<code className="text-purple-800 font-bold">-ut / -urent</code><br/>
                  如 <span className="font-semibold">il fut (être), il eut (avoir), il vécut, il mourut</span>。
                </p>
              </div>
              <div className="p-3 bg-white/90 rounded-2xl border border-emerald-100">
                <span className="font-black text-emerald-900 block mb-1">④ -in 型（鼻音特殊词根）</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  词尾：<code className="text-emerald-800 font-bold">-int / -inrent</code><br/>
                  如 <span className="font-semibold">il vint (venir), il tint (tenir), il devint</span>。
                </p>
              </div>
            </div>
          </div>

          {/* 筛选与搜索控制栏 */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="搜索动词原形、中文或变形 (如 fut, eut, prit, naquit)..."
                value={psSearch}
                onChange={e => setPsSearch(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#80142A]/20 focus:bg-white transition text-slate-800"
              />
              {psSearch && (
                <button
                  onClick={() => setPsSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline">动词门类：</span>
              {[
                { key: 'all', label: `全部 (${KAOYAN_PASSE_SIMPLE_50.length})` },
                { key: '第一组', label: '第1组 (-a型)' },
                { key: '第二组', label: '第2组 (-i型)' },
                { key: '第三组', label: '第3组 (突变神仙词)' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setPsGroupFilter(tab.key as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    psGroupFilter === tab.key
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <span className="text-xs text-slate-400 ml-2 font-medium">
                已筛选: {filteredPsList.length} 词
              </span>
            </div>
          </div>

          {/* 50 核心词响应式卡片网格 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {filteredPsList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-rose-300 transition flex flex-col justify-between space-y-3"
              >
                {/* 顶部：原形、词义与门类徽章 */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-slate-900 tracking-tight">
                        {item.verb}
                      </span>
                      <button
                        onClick={() => playSpeech(item.verb)}
                        className="p-1 text-slate-400 hover:text-[#80142A] hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="朗读动词原形"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      item.group === '第一组' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      item.group === '第二组' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                      'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}>
                      {item.group}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {item.meaning}
                  </p>
                </div>

                {/* 核心考研识别区：单三与复三 (il & ils) */}
                <div className="bg-rose-50/50 rounded-2xl p-3 border border-rose-100/90 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold border-b border-rose-100/70 pb-1">
                    <span>考研阅读真题高频人称</span>
                    <span className="text-[#80142A]">秒认核心 🎯</span>
                  </div>

                  {/* 单三 il */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-mono">il / elle :</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-black text-[#80142A] tracking-tight">
                        {item.thirdSingular}
                      </span>
                      <button
                        onClick={() => playSpeech(item.thirdSingular)}
                        className="p-0.5 text-slate-400 hover:text-[#80142A] cursor-pointer"
                        title="朗读"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* 复三 ils */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-mono">ils / elles :</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-700">
                        {item.thirdPlural}
                      </span>
                      {item.thirdPlural !== '—' && (
                        <button
                          onClick={() => playSpeech(item.thirdPlural)}
                          className="p-0.5 text-slate-400 hover:text-[#80142A] cursor-pointer"
                          title="朗读"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* 助记技巧与第一人称备查 */}
                <div className="space-y-1.5 pt-1">
                  <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-100/80 text-[11px] text-amber-900 leading-snug">
                    <span className="font-bold text-amber-950">💡 助记规律：</span>
                    <span>{item.radicalTip}</span>
                  </div>
                  {item.firstSingular !== '—' && (
                    <div className="text-[10px] text-slate-400 flex items-center justify-between px-1">
                      <span>第一人称备查 (je)：</span>
                      <span className="font-mono text-slate-600">{item.firstSingular}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredPsList.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
              <p className="text-slate-500 text-sm font-bold">没有找到匹配的动词</p>
              <button
                onClick={() => { setPsSearch(''); setPsGroupFilter('all'); }}
                className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
              >
                重置搜索条件
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

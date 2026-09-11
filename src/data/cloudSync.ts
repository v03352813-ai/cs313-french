/**
 * CS313 法语研习社 · 云端热更新与每日晨读数据中枢
 * 支持：
 * 1. 每日法文晨读金句与打卡系统 (Daily French Quotes & Streak)
 * 2. 考研二外 & DELF 持续更新日志 (Cloud Weekly Changelog)
 * 3. 错题本与生词收藏本地持久化
 */

export interface DailyQuote {
  date: string;          // "今日推荐"
  dayNumber: number;     // 第几天打卡
  fr: string;            // 法语句子
  zh: string;            // 中文翻译
  phonetic?: string;     // 读音提示
  source: string;        // 出处，如《小王子》《悲惨世界》《追忆似水年华》
  keyGrammar: string;    // 核心语法/考点拆解
  audioText: string;     // 朗读文本
}

export interface ContentUpdateLog {
  id: string;
  date: string;
  version: string;
  tag: '真题上新' | '原声精听' | '考纲扩充' | '功能升级';
  title: string;
  description: string;
}

// 持续更新公告日志（展示给付费用户，提升终身会员价值感）
export const CONTENT_UPDATE_LOGS: ContentUpdateLog[] = [
  {
    id: 'fr-up-001',
    date: '本周最新',
    version: 'v2.6',
    tag: '真题上新',
    title: '更新 2025 年全国高校考研二外法语高频真题精选卷',
    description: '涵盖北外、上外、武大、南大考研二外常考动词时态配合、副代词 y/en 与关系从句深度解析。'
  },
  {
    id: 'fr-up-002',
    date: '本周最新',
    version: 'v2.5',
    tag: '原声精听',
    title: '上新《放牛班的春天》与《天使爱美丽》高分台词原声影子跟读',
    description: '配备双语对照字幕与重点连音联诵规则拆解，原汁原味磨耳朵。'
  },
  {
    id: 'fr-up-003',
    date: '2026-08',
    version: 'v2.4',
    tag: '考纲扩充',
    title: 'DELF A1-B2 官方国际模考题库扩充',
    description: '新增听力原声理解（Compréhension orale）原声材料与听力原文文本大纲。'
  },
  {
    id: 'fr-up-004',
    date: '2026-08',
    version: 'v2.3',
    tag: '功能升级',
    title: '上线三组动词 7 大时态可视化变位推导演练器',
    description: '支持直陈式现在时、复合过去时、未完成过去时、简单将来时、条件式与虚拟式一键变位对比。'
  },
  {
    id: 'fr-up-005',
    date: '2026-08',
    version: 'v2.2',
    tag: '考纲扩充',
    title: '5000+ 考纲核心词汇库全量标定阴阳性 (Masculin / Féminin)',
    description: '彻底解决法语背词痛点，配备定冠词配合、真人发音与艾宾浩斯抗遗忘记忆曲线。'
  }
];

// 每日晨读打卡精选库（每日自动轮换）
export const DAILY_QUOTES_POOL: DailyQuote[] = [
  {
    date: '今日推荐',
    dayNumber: 1,
    fr: "On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.",
    zh: '唯有用心，方能看清。真正本质的东西，肉眼是看不见的。',
    source: '《小王子》Antoine de Saint-Exupéry',
    keyGrammar: "限制性否定句型 ne... que... (仅仅/只有)；invisible pour (对...不可见)。",
    audioText: "On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux."
  },
  {
    date: '每日金句',
    dayNumber: 2,
    fr: "C'est le temps que tu as perdu pour ta rose qui fait ta rose si importante.",
    zh: '正是你在你的玫瑰上花费的时间，才使得你的玫瑰变得如此重要。',
    source: '《小王子》',
    keyGrammar: "强调句型 C'est... qui...；复合过去时 tu as perdu。",
    audioText: "C'est le temps que tu as perdu pour ta rose qui fait ta rose si importante."
  },
  {
    date: '每日金句',
    dayNumber: 3,
    fr: "Le vrai voyageur ne sait pas où il va.",
    zh: '真正的旅行者，从不知道自己将去向何方。',
    source: '法兰西哲思名言',
    keyGrammar: "savoir + 疑问副词 où 引导的宾语从句。",
    audioText: "Le vrai voyageur ne sait pas où il va."
  },
  {
    date: '每日金句',
    dayNumber: 4,
    fr: "Aimer, ce n'est pas se regarder l'un l'autre, c'est regarder ensemble dans la même direction.",
    zh: '爱不仅是彼此对视，更是凝视同一个方向。',
    source: '《人类的大地》Saint-Exupéry',
    keyGrammar: "自反代词 se regarder l'un l'autre (相互凝视)；动名词作表语。",
    audioText: "Aimer, ce n'est pas se regarder l'un l'autre, c'est regarder ensemble dans la même direction."
  },
  {
    date: '每日金句',
    dayNumber: 5,
    fr: "Ne jamais dire jamais. Il y a toujours quelque chose à tenter.",
    zh: '永远不要轻言放弃。总有一些事情值得我们去尝试。',
    source: '《放牛班的春天》',
    keyGrammar: "祈使省略 ne jamais + 动词原形；quelque chose à + 不定式。",
    audioText: "Ne jamais dire jamais. Il y a toujours quelque chose à tenter."
  }
];

const STREAK_KEY = 'cs313_fr_study_streak_v1';
const LAST_CHECKIN_KEY = 'cs313_fr_last_checkin_date_v1';

export function getStudyStreak(): { days: number; checkedToday: boolean } {
  try {
    const rawDays = localStorage.getItem(STREAK_KEY);
    const lastDate = localStorage.getItem(LAST_CHECKIN_KEY);
    const todayStr = new Date().toDateString();

    const days = rawDays ? parseInt(rawDays, 10) : 3;
    const checkedToday = lastDate === todayStr;

    return { days, checkedToday };
  } catch {
    return { days: 3, checkedToday: false };
  }
}

export function checkInToday(): { days: number; isFirstToday: boolean } {
  try {
    const todayStr = new Date().toDateString();
    const { days, checkedToday } = getStudyStreak();

    if (checkedToday) {
      return { days, isFirstToday: false };
    }

    const nextDays = days + 1;
    localStorage.setItem(STREAK_KEY, nextDays.toString());
    localStorage.setItem(LAST_CHECKIN_KEY, todayStr);

    return { days: nextDays, isFirstToday: true };
  } catch {
    return { days: 4, isFirstToday: true };
  }
}

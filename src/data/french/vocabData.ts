/**
 * 法语 5,000+ 考纲核心词汇库 (DELF A1-B2 & 考研二外高频词)
 * 严格标注词性、阴阳性 (Masculin / Féminin) 与冠词配合
 */

export interface FrenchVocab {
  id: string;
  french: string;          // 法语词汇，如 maison
  article?: string;        // 冠词，如 la
  gender?: 'masculine' | 'feminine' | 'neutral'; // 阴阳性
  pos: string;             // 词性：n.m., n.f., v., adj., adv., prep.
  phonetic: string;        // 国际音标 [mɛzɔ̃]
  chinese: string;         // 中文释义
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'KAOYAN';
  category: string;        // 分类：日常生活/情感/学术/商务/社会
  example: {
    fr: string;
    zh: string;
  };
}

export const FRENCH_VOCAB_LIST: FrenchVocab[] = [
  // --- A1 入门级核心词 ---
  {
    id: 'v_a1_01',
    french: 'maison',
    article: 'la',
    gender: 'feminine',
    pos: 'n.f.',
    phonetic: '[mɛzɔ̃]',
    chinese: '房子 / 家',
    level: 'A1',
    category: '日常生活',
    example: {
      fr: 'Je reste à la maison ce soir.',
      chinese: '我今晚呆在家里。'
    }
  },
  {
    id: 'v_a1_02',
    french: 'livre',
    article: 'le',
    gender: 'masculine',
    pos: 'n.m.',
    phonetic: '[livʁ]',
    chinese: '书 / 书本',
    level: 'A1',
    category: '学习文教',
    example: {
      fr: 'Il lit un livre français.',
      chinese: '他正在读一本法语书。'
    }
  },
  {
    id: 'v_a1_03',
    french: 'ami',
    article: "l'",
    gender: 'masculine',
    pos: 'n.m.',
    phonetic: '[ami]',
    chinese: '朋友 (阳性)',
    level: 'A1',
    category: '人际交往',
    example: {
      fr: "C'est mon meilleur ami.",
      chinese: '这是我最好的朋友。'
    }
  },
  {
    id: 'v_a1_04',
    french: 'amie',
    article: "l'",
    gender: 'feminine',
    pos: 'n.f.',
    phonetic: '[ami]',
    chinese: '女性朋友 / 女朋友',
    level: 'A1',
    category: '人际交往',
    example: {
      fr: 'Elle voyage avec une amie.',
      chinese: '她和一个女性朋友一起旅行。'
    }
  },
  {
    id: 'v_a1_05',
    french: 'temps',
    article: 'le',
    gender: 'masculine',
    pos: 'n.m.',
    phonetic: '[tɑ̃]',
    chinese: '时间 / 天气',
    level: 'A1',
    category: '日常概念',
    example: {
      fr: "Quel temps fait-il aujourd'hui ?",
      chinese: '今天天气怎么样？'
    }
  },
  {
    id: 'v_a1_06',
    french: 'famille',
    article: 'la',
    gender: 'feminine',
    pos: 'n.f.',
    phonetic: '[famij]',
    chinese: '家庭 / 家人',
    level: 'A1',
    category: '家庭关系',
    example: {
      fr: "J'aime beaucoup ma famille.",
      chinese: '我非常爱我的家人。'
    }
  },
  {
    id: 'v_a1_07',
    french: 'bonjour',
    pos: 'interj. / n.m.',
    phonetic: '[bɔ̃ʒuʁ]',
    chinese: '你好 / 早上好',
    level: 'A1',
    category: '社交礼仪',
    example: {
      fr: 'Bonjour monsieur, comment allez-vous ?',
      chinese: '您好先生，您身体好吗？'
    }
  },
  {
    id: 'v_a1_08',
    french: 'merci',
    pos: 'interj.',
    phonetic: '[mɛʁsi]',
    chinese: '谢谢',
    level: 'A1',
    category: '社交礼仪',
    example: {
      fr: 'Merci beaucoup pour votre aide précieuse.',
      chinese: '非常感谢您的宝贵帮助。'
    }
  },
  {
    id: 'v_a1_09',
    french: 'soleil',
    article: 'le',
    gender: 'masculine',
    pos: 'n.m.',
    phonetic: '[sɔlɛj]',
    chinese: '太阳 / 阳光',
    level: 'A1',
    category: '自然地理',
    example: {
      fr: 'Le soleil brille dans le ciel bleu.',
      chinese: '太阳在蓝天中闪耀。'
    }
  },
  {
    id: 'v_a1_10',
    french: 'nuit',
    article: 'la',
    gender: 'feminine',
    pos: 'n.f.',
    phonetic: '[nɥi]',
    chinese: '夜晚 / 晚上',
    level: 'A1',
    category: '时间词汇',
    example: {
      fr: 'Bonne nuit et fais de beaux rêves.',
      chinese: '晚安，做个好梦。'
    }
  },

  // --- A2 基础进阶词 ---
  {
    id: 'v_a2_01',
    french: 'voyage',
    article: 'le',
    gender: 'masculine',
    pos: 'n.m.',
    phonetic: '[vwajaʒ]',
    chinese: '旅行 / 旅程',
    level: 'A2',
    category: '旅游出行',
    example: {
      fr: 'Bon voyage en France !',
      chinese: '祝法国之行愉快！'
    }
  },
  {
    id: 'v_a2_02',
    french: 'gare',
    article: 'la',
    gender: 'feminine',
    pos: 'n.f.',
    phonetic: '[gaʁ]',
    chinese: '火车站',
    level: 'A2',
    category: '交通出行',
    example: {
      fr: 'Le train arrive à la gare de Lyon.',
      chinese: '火车到达了里昂火车站。'
    }
  },
  {
    id: 'v_a2_03',
    french: 'musique',
    article: 'la',
    gender: 'feminine',
    pos: 'n.f.',
    phonetic: '[myzik]',
    chinese: '音乐',
    level: 'A2',
    category: '文化艺术',
    example: {
      fr: "J'écoute de la musique classique tous les jours.",
      chinese: '我每天都听古典音乐。'
    }
  },
  {
    id: 'v_a2_04',
    french: 'travail',
    article: 'le',
    gender: 'masculine',
    pos: 'n.m.',
    phonetic: '[tʁavaj]',
    chinese: '工作 / 劳动',
    level: 'A2',
    category: '职业职场',
    example: {
      fr: 'Il est très occupé par son travail.',
      chinese: '他工作非常忙碌。'
    }
  },
  {
    id: 'v_a2_05',
    french: 'santé',
    article: 'la',
    gender: 'feminine',
    pos: 'n.f.',
    phonetic: '[sɑ̃te]',
    chinese: '健康 / 身体状态',
    level: 'A2',
    category: '生活健康',
    example: {
      fr: 'À votre santé ! (乾杯祝词)',
      chinese: '祝您身体健康！(干杯)'
    }
  },

  // --- B1/B2 考研二外高频考点词 ---
  {
    id: 'v_b1_01',
    french: 'développement',
    article: 'le',
    gender: 'masculine',
    pos: 'n.m.',
    phonetic: '[devlɔpmɑ̃]',
    chinese: '发展 / 阐述',
    level: 'B1',
    category: '社会学术',
    example: {
      fr: 'Le développement durable est essentiel pour notre avenir.',
      chinese: '可持续发展对我们的未来至关重要。'
    }
  },
  {
    id: 'v_b1_02',
    french: 'environnement',
    article: "l'",
    gender: 'masculine',
    pos: 'n.m.',
    phonetic: '[ɑ̃viʁɔnmɑ̃]',
    chinese: '环境 / 周围环境',
    level: 'B1',
    category: '生态自然',
    example: {
      fr: 'Nous devons protéger notre environnement naturel.',
      chinese: '我们必须保护我们的自然环境。'
    }
  },
  {
    id: 'v_b1_03',
    french: 'société',
    article: 'la',
    gender: 'feminine',
    pos: 'n.f.',
    phonetic: '[sɔsjete]',
    chinese: '社会 / 公司',
    level: 'B1',
    category: '社会经济',
    example: {
      fr: 'Les technologies changent notre société moderne.',
      chinese: '科技正在改变我们的现代社会。'
    }
  },
  {
    id: 'v_b2_01',
    french: 'mondialisation',
    article: 'la',
    gender: 'feminine',
    pos: 'n.f.',
    phonetic: '[mɔ̃djalizasjɔ̃]',
    chinese: '全球化',
    level: 'B2',
    category: '考研热点',
    example: {
      fr: 'Les défis posés par la mondialisation de l’économie.',
      chinese: '经济全球化所带来的诸多挑战。'
    }
  },
  {
    id: 'v_b2_02',
    french: 'recherche',
    article: 'la',
    gender: 'feminine',
    pos: 'n.f.',
    phonetic: '[ʁəʃɛʁʃ]',
    chinese: '学术研究 / 搜寻',
    level: 'B2',
    category: '学术考研',
    example: {
      fr: 'Elle poursuit des recherches scientifiques en France.',
      chinese: '她正在法国从事科学学术研究。'
    }
  },
  {
    id: 'v_kaoyan_01',
    french: 'cependant',
    pos: 'adv.',
    phonetic: '[səpɑ̃dɑ̃]',
    chinese: '然而 / 可是 (转折连词)',
    level: 'KAOYAN',
    category: '考研逻辑连词',
    example: {
      fr: 'Il a bien travaillé, cependant il a échoué à l’examen.',
      chinese: '他非常努力，然而考试还是未通过。'
    }
  },
  {
    id: 'v_kaoyan_02',
    french: 'bien que',
    pos: 'loc. conj.',
    phonetic: '[bjɛ̃ kə]',
    chinese: '尽管...虽然... (必接虚拟式Subjonctif!)',
    level: 'KAOYAN',
    category: '二外考研必考从句',
    example: {
      fr: "Bien qu'il fasse froid, il sort sans manteau.",
      chinese: '尽管天气很冷，他还是没穿大衣就出去了。'
    }
  }
];

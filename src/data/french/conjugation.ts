/**
 * 法语动词变位可视化推导器核心数据模型与高频动词库 (Conjugaison)
 * 覆盖三大组动词与 7 大核心时态
 */

export type VerbGroup = '1st_er' | '2nd_ir' | '3rd_irregular';
export type TenseKey = 
  | 'present'         // 直陈式现在时
  | 'passe_compose'   // 复合过去时
  | 'imparfait'       // 未完成过去时
  | 'futur_simple'    // 简单将来时
  | 'conditionnel'    // 条件式现在时
  | 'subjonctif'      // 虚拟式现在时
  | 'imperatif';      // 命令式

export interface TenseInfo {
  key: TenseKey;
  label: string;
  frenchLabel: string;
  usage: string;
  formula: string;
}

export const TENSES_METADATA: TenseInfo[] = [
  {
    key: 'present',
    label: '直陈式现在时',
    frenchLabel: "Présent de l'indicatif",
    usage: '描述当前发生的事实、客观真理或经常性习惯行为。',
    formula: '词根 + 人称后缀 (-e, -es, -e, -ons, -ez, -ent)'
  },
  {
    key: 'passe_compose',
    label: '复合过去时',
    frenchLabel: 'Passé composé',
    usage: '描述过去已经完成并对现在产生影响的动作，考级出现率第一。',
    formula: '助动词 avoir/être (现在时) + 过去分词 (Participe passé)'
  },
  {
    key: 'imparfait',
    label: '未完成过去时',
    frenchLabel: 'Imparfait',
    usage: '描述过去持续的动作、背景状态、习惯或外貌环境描写。',
    formula: '直陈式 nous 词根 + (-ais, -ais, -ait, -ions, -iez, -aient)'
  },
  {
    key: 'futur_simple',
    label: '简单将来时',
    frenchLabel: 'Futur simple',
    usage: '描述未来确定会发生的事情，语气肯定客观。',
    formula: '动词原形/词根 + (-ai, -as, -a, -ons, -ez, -ont)'
  },
  {
    key: 'conditionnel',
    label: '条件式现在时',
    frenchLabel: 'Conditionnel présent',
    usage: '表达委婉礼貌请求、愿望、假想推测（如“我想请教您”）。',
    formula: '简单将来时词根 + 未完成过去时词尾 (-ais, -ais, -ait...)'
  },
  {
    key: 'subjonctif',
    label: '虚拟式现在时',
    frenchLabel: 'Subjonctif présent',
    usage: '表达主观情感、愿望、怀疑、必须（如 il faut que...）。',
    formula: 'ils 词根 + (-e, -es, -e, -ions, -iez, -ent)'
  },
  {
    key: 'imperatif',
    label: '命令式',
    frenchLabel: 'Impératif',
    usage: '向对方发出指令、建议或请求（仅 tu, nous, vous 三个人称）。',
    formula: '省略主语代词，第一组动词 tu 形式通常去 -s'
  }
];

export interface ConjugatedForms {
  je: { stem: string; ending: string; full: string };
  tu: { stem: string; ending: string; full: string };
  il_elle: { stem: string; ending: string; full: string };
  nous: { stem: string; ending: string; full: string };
  vous: { stem: string; ending: string; full: string };
  ils_elles: { stem: string; ending: string; full: string };
}

export interface VerbItem {
  id: string;
  infinitive: string;       // 动词不定式，如 parler
  meaning: string;          // 中文释义
  group: VerbGroup;         // 组别
  auxiliary: 'avoir' | 'être'; // 复合过去时助动词
  participle: string;       // 过去分词，如 parlé
  tags: string[];           // 标签，如 ["A1核心", "第一组规则", "高频交际"]
  tenses: Partial<Record<TenseKey, ConjugatedForms>>;
  sampleSentence: {
    french: string;
    chinese: string;
  };
}

export const FRENCH_VERBS: VerbItem[] = [
  // --- 第三组王牌不规则动词 (初学最重要，考试必考) ---
  {
    id: 'etre',
    infinitive: 'être',
    meaning: '是 / 存在 / 处于 (英语 be 动词)',
    group: '3rd_irregular',
    auxiliary: 'avoir',
    participle: 'été',
    tags: ['A1基石', '第三组核心', '高频王'],
    sampleSentence: {
      french: 'Je suis très heureux de faire votre connaissance.',
      chinese: '非常高兴能够认识您。'
    },
    tenses: {
      present: {
        je: { stem: '', ending: 'suis', full: 'suis' },
        tu: { stem: '', ending: 'es', full: 'es' },
        il_elle: { stem: '', ending: 'est', full: 'est' },
        nous: { stem: '', ending: 'sommes', full: 'sommes' },
        vous: { stem: '', ending: 'êtes', full: 'êtes' },
        ils_elles: { stem: '', ending: 'sont', full: 'sont' }
      },
      passe_compose: {
        je: { stem: "j'ai ", ending: 'été', full: "j'ai été" },
        tu: { stem: 'tu as ', ending: 'été', full: 'tu as été' },
        il_elle: { stem: 'il a ', ending: 'été', full: 'il a été' },
        nous: { stem: 'nous avons ', ending: 'été', full: 'nous avons été' },
        vous: { stem: 'vous avez ', ending: 'été', full: 'vous avez été' },
        ils_elles: { stem: 'ils ont ', ending: 'été', full: 'ils ont été' }
      },
      imparfait: {
        je: { stem: 'ét', ending: 'ais', full: 'étais' },
        tu: { stem: 'ét', ending: 'ais', full: 'étais' },
        il_elle: { stem: 'ét', ending: 'ait', full: 'était' },
        nous: { stem: 'ét', ending: 'ions', full: 'étions' },
        vous: { stem: 'ét', ending: 'iez', full: 'étiez' },
        ils_elles: { stem: 'ét', ending: 'aient', full: 'étaient' }
      },
      futur_simple: {
        je: { stem: 'ser', ending: 'ai', full: 'serai' },
        tu: { stem: 'ser', ending: 'as', full: 'seras' },
        il_elle: { stem: 'ser', ending: 'a', full: 'sera' },
        nous: { stem: 'ser', ending: 'ons', full: 'serons' },
        vous: { stem: 'ser', ending: 'ez', full: 'serez' },
        ils_elles: { stem: 'ser', ending: 'ont', full: 'seront' }
      },
      subjonctif: {
        je: { stem: '', ending: 'sois', full: 'sois' },
        tu: { stem: '', ending: 'sois', full: 'sois' },
        il_elle: { stem: '', ending: 'soit', full: 'soit' },
        nous: { stem: '', ending: 'soyons', full: 'soyons' },
        vous: { stem: '', ending: 'soyez', full: 'soyez' },
        ils_elles: { stem: '', ending: 'soient', full: 'soient' }
      }
    }
  },
  {
    id: 'avoir',
    infinitive: 'avoir',
    meaning: '有 / 拥有 / 具备 (英语 have)',
    group: '3rd_irregular',
    auxiliary: 'avoir',
    participle: 'eu',
    tags: ['A1基石', '第三组核心', '高频王'],
    sampleSentence: {
      french: "Nous avons beaucoup d'amis à Paris.",
      chinese: '我们在巴黎有很多朋友。'
    },
    tenses: {
      present: {
        je: { stem: '', ending: "j'ai", full: "j'ai" },
        tu: { stem: '', ending: 'as', full: 'as' },
        il_elle: { stem: '', ending: 'a', full: 'a' },
        nous: { stem: '', ending: 'avons', full: 'avons' },
        vous: { stem: '', ending: 'avez', full: 'avez' },
        ils_elles: { stem: '', ending: 'ont', full: 'ont' }
      },
      passe_compose: {
        je: { stem: "j'ai ", ending: 'eu', full: "j'ai eu" },
        tu: { stem: 'tu as ', ending: 'eu', full: 'tu as eu' },
        il_elle: { stem: 'il a ', ending: 'eu', full: 'il a eu' },
        nous: { stem: 'nous avons ', ending: 'eu', full: 'nous avons eu' },
        vous: { stem: 'vous avez ', ending: 'eu', full: 'vous avez eu' },
        ils_elles: { stem: 'ils ont ', ending: 'eu', full: 'ils ont eu' }
      },
      imparfait: {
        je: { stem: 'av', ending: 'ais', full: 'avais' },
        tu: { stem: 'av', ending: 'ais', full: 'avais' },
        il_elle: { stem: 'av', ending: 'ait', full: 'avait' },
        nous: { stem: 'av', ending: 'ions', full: 'avions' },
        vous: { stem: 'av', ending: 'iez', full: 'aviez' },
        ils_elles: { stem: 'av', ending: 'aient', full: 'avaient' }
      },
      futur_simple: {
        je: { stem: 'aur', ending: 'ai', full: 'aurai' },
        tu: { stem: 'aur', ending: 'as', full: 'auras' },
        il_elle: { stem: 'aur', ending: 'a', full: 'aura' },
        nous: { stem: 'aur', ending: 'ons', full: 'aurons' },
        vous: { stem: 'aur', ending: 'ez', full: 'aurez' },
        ils_elles: { stem: 'aur', ending: 'ont', full: 'auront' }
      }
    }
  },
  {
    id: 'aller',
    infinitive: 'aller',
    meaning: '去 / 前往 / 进行 (英语 go)',
    group: '3rd_irregular',
    auxiliary: 'être',
    participle: 'allé',
    tags: ['A1核心', '位移用être', '最近将来时'],
    sampleSentence: {
      french: 'Comment allez-vous aujourd’hui ?',
      chinese: '您今天好吗？(过得怎样？)'
    },
    tenses: {
      present: {
        je: { stem: '', ending: 'vais', full: 'vais' },
        tu: { stem: '', ending: 'vas', full: 'vas' },
        il_elle: { stem: '', ending: 'va', full: 'va' },
        nous: { stem: 'all', ending: 'ons', full: 'allons' },
        vous: { stem: 'all', ending: 'ez', full: 'allez' },
        ils_elles: { stem: '', ending: 'vont', full: 'vont' }
      },
      passe_compose: {
        je: { stem: 'je suis ', ending: 'allé(e)', full: 'je suis allé(e)' },
        tu: { stem: 'tu es ', ending: 'allé(e)', full: 'tu es allé(e)' },
        il_elle: { stem: 'il/elle est ', ending: 'allé(e)', full: 'il est allé' },
        nous: { stem: 'nous sommes ', ending: 'allé(e)s', full: 'nous sommes allés' },
        vous: { stem: 'vous êtes ', ending: 'allé(e)s', full: 'vous êtes allés' },
        ils_elles: { stem: 'ils/elles sont ', ending: 'allé(e)s', full: 'ils sont allés' }
      },
      futur_simple: {
        je: { stem: 'ir', ending: 'ai', full: 'irai' },
        tu: { stem: 'ir', ending: 'as', full: 'iras' },
        il_elle: { stem: 'ir', ending: 'a', full: 'ira' },
        nous: { stem: 'ir', ending: 'ons', full: 'irons' },
        vous: { stem: 'ir', ending: 'ez', full: 'irez' },
        ils_elles: { stem: 'ir', ending: 'ont', full: 'iront' }
      }
    }
  },
  {
    id: 'faire',
    infinitive: 'faire',
    meaning: '做 / 制造 / 天气 (英语 do / make)',
    group: '3rd_irregular',
    auxiliary: 'avoir',
    participle: 'fait',
    tags: ['A1核心', '高频句型', '天气描述'],
    sampleSentence: {
      french: 'Il fait beau à Paris aujourd’hui.',
      chinese: '今天巴黎天气晴朗。'
    },
    tenses: {
      present: {
        je: { stem: 'f', ending: 'ais', full: 'fais' },
        tu: { stem: 'f', ending: 'ais', full: 'fais' },
        il_elle: { stem: 'f', ending: 'ait', full: 'fait' },
        nous: { stem: 'fais', ending: 'ons', full: 'faisons' },
        vous: { stem: '', ending: 'faites', full: 'faites' },
        ils_elles: { stem: '', ending: 'font', full: 'font' }
      },
      passe_compose: {
        je: { stem: "j'ai ", ending: 'fait', full: "j'ai fait" },
        tu: { stem: 'tu as ', ending: 'fait', full: 'tu as fait' },
        il_elle: { stem: 'il a ', ending: 'fait', full: 'il a fait' },
        nous: { stem: 'nous avons ', ending: 'fait', full: 'nous avons fait' },
        vous: { stem: 'vous avez ', ending: 'fait', full: 'vous avez fait' },
        ils_elles: { stem: 'ils ont ', ending: 'fait', full: 'ils ont fait' }
      },
      futur_simple: {
        je: { stem: 'fer', ending: 'ai', full: 'ferai' },
        tu: { stem: 'fer', ending: 'as', full: 'feras' },
        il_elle: { stem: 'fer', ending: 'a', full: 'fera' },
        nous: { stem: 'fer', ending: 'ons', full: 'ferons' },
        vous: { stem: 'fer', ending: 'ez', full: 'ferez' },
        ils_elles: { stem: 'fer', ending: 'ont', full: 'feront' }
      }
    }
  },

  // --- 第一组规则动词 (-er 结尾，占法语动词 80% 以上) ---
  {
    id: 'parler',
    infinitive: 'parler',
    meaning: '说 / 谈话 / 讲语言 (英语 speak)',
    group: '1st_er',
    auxiliary: 'avoir',
    participle: 'parlé',
    tags: ['第一组规则模板', 'A1必背', '零基础口语'],
    sampleSentence: {
      french: 'Je parle français et anglais avec mes collègues.',
      chinese: '我和我的同事们讲法语和英语。'
    },
    tenses: {
      present: {
        je: { stem: 'parl', ending: 'e', full: 'parle' },
        tu: { stem: 'parl', ending: 'es', full: 'parles' },
        il_elle: { stem: 'parl', ending: 'e', full: 'parle' },
        nous: { stem: 'parl', ending: 'ons', full: 'parlons' },
        vous: { stem: 'parl', ending: 'ez', full: 'parlez' },
        ils_elles: { stem: 'parl', ending: 'ent', full: 'parlent' }
      },
      passe_compose: {
        je: { stem: "j'ai ", ending: 'parlé', full: "j'ai parlé" },
        tu: { stem: 'tu as ', ending: 'parlé', full: 'tu as parlé' },
        il_elle: { stem: 'il a ', ending: 'parlé', full: 'il a parlé' },
        nous: { stem: 'nous avons ', ending: 'parlé', full: 'nous avons parlé' },
        vous: { stem: 'vous avez ', ending: 'parlé', full: 'vous avez parlé' },
        ils_elles: { stem: 'ils ont ', ending: 'parlé', full: 'ils ont parlé' }
      },
      imparfait: {
        je: { stem: 'parl', ending: 'ais', full: 'parlais' },
        tu: { stem: 'parl', ending: 'ais', full: 'parlais' },
        il_elle: { stem: 'parl', ending: 'ait', full: 'parlait' },
        nous: { stem: 'parl', ending: 'ions', full: 'parlions' },
        vous: { stem: 'parl', ending: 'iez', full: 'parliez' },
        ils_elles: { stem: 'parl', ending: 'aient', full: 'parlaient' }
      },
      futur_simple: {
        je: { stem: 'parler', ending: 'ai', full: 'parlerai' },
        tu: { stem: 'parler', ending: 'as', full: 'parleras' },
        il_elle: { stem: 'parler', ending: 'a', full: 'parlera' },
        nous: { stem: 'parler', ending: 'ons', full: 'parlerons' },
        vous: { stem: 'parler', ending: 'ez', full: 'parlerez' },
        ils_elles: { stem: 'parler', ending: 'ont', full: 'parleront' }
      },
      conditionnel: {
        je: { stem: 'parler', ending: 'ais', full: 'parlerais' },
        tu: { stem: 'parler', ending: 'ais', full: 'parlerais' },
        il_elle: { stem: 'parler', ending: 'ait', full: 'parlerait' },
        nous: { stem: 'parler', ending: 'ions', full: 'parlerions' },
        vous: { stem: 'parler', ending: 'iez', full: 'parleriez' },
        ils_elles: { stem: 'parler', ending: 'aient', full: 'parleraient' }
      }
    }
  },
  {
    id: 'aimer',
    infinitive: 'aimer',
    meaning: '喜欢 / 爱 (英语 like / love)',
    group: '1st_er',
    auxiliary: 'avoir',
    participle: 'aimé',
    tags: ['第一组规则', '省音示范 j\'aime', '情感表达'],
    sampleSentence: {
      french: "J'aime beaucoup la culture et la cuisine françaises.",
      chinese: '我非常喜欢法国的文化和美食。'
    },
    tenses: {
      present: {
        je: { stem: '', ending: "j'aime", full: "j'aime" },
        tu: { stem: 'aim', ending: 'es', full: 'aimes' },
        il_elle: { stem: 'aim', ending: 'e', full: 'aime' },
        nous: { stem: 'aim', ending: 'ons', full: 'aimons' },
        vous: { stem: 'aim', ending: 'ez', full: 'aimez' },
        ils_elles: { stem: 'aim', ending: 'ent', full: 'aiment' }
      },
      passe_compose: {
        je: { stem: "j'ai ", ending: 'aimé', full: "j'ai aimé" },
        tu: { stem: 'tu as ', ending: 'aimé', full: 'tu as aimé' },
        il_elle: { stem: 'il a ', ending: 'aimé', full: 'il a aimé' },
        nous: { stem: 'nous avons ', ending: 'aimé', full: 'nous avons aimé' },
        vous: { stem: 'vous avez ', ending: 'aimé', full: 'vous avez aimé' },
        ils_elles: { stem: 'ils ont ', ending: 'aimé', full: 'ils ont aimé' }
      },
      conditionnel: {
        je: { stem: '', ending: "j'aimerais", full: "j'aimerais" },
        tu: { stem: 'aimer', ending: 'ais', full: 'aimerais' },
        il_elle: { stem: 'aimer', ending: 'ait', full: 'aimerait' },
        nous: { stem: 'aimer', ending: 'ions', full: 'aimerions' },
        vous: { stem: 'aimer', ending: 'iez', full: 'aimeriez' },
        ils_elles: { stem: 'aimer', ending: 'aient', full: 'aimeraient' }
      }
    }
  },

  // --- 第二组规则动词 (-ir 结尾且复数带 -iss-，如 finir, choisir) ---
  {
    id: 'finir',
    infinitive: 'finir',
    meaning: '结束 / 完成 (英语 finish)',
    group: '2nd_ir',
    auxiliary: 'avoir',
    participle: 'fini',
    tags: ['第二组规则模板', '-iss-标记', '日常高频'],
    sampleSentence: {
      french: 'Je finis mon travail à dix-huit heures.',
      chinese: '我下午六点完成我的工作。'
    },
    tenses: {
      present: {
        je: { stem: 'fin', ending: 'is', full: 'finis' },
        tu: { stem: 'fin', ending: 'is', full: 'finis' },
        il_elle: { stem: 'fin', ending: 'it', full: 'finit' },
        nous: { stem: 'fin', ending: 'issons', full: 'finissons' },
        vous: { stem: 'fin', ending: 'issez', full: 'finissez' },
        ils_elles: { stem: 'fin', ending: 'issent', full: 'finissent' }
      },
      passe_compose: {
        je: { stem: "j'ai ", ending: 'fini', full: "j'ai fini" },
        tu: { stem: 'tu as ', ending: 'fini', full: 'tu as fini' },
        il_elle: { stem: 'il a ', ending: 'fini', full: 'il a fini' },
        nous: { stem: 'nous avons ', ending: 'fini', full: 'nous avons fini' },
        vous: { stem: 'vous avez ', ending: 'fini', full: 'vous avez fini' },
        ils_elles: { stem: 'ils ont ', ending: 'fini', full: 'ils ont fini' }
      },
      imparfait: {
        je: { stem: 'finiss', ending: 'ais', full: 'finissais' },
        tu: { stem: 'finiss', ending: 'ais', full: 'finissais' },
        il_elle: { stem: 'finiss', ending: 'ait', full: 'finissait' },
        nous: { stem: 'finiss', ending: 'ions', full: 'finissions' },
        vous: { stem: 'finiss', ending: 'iez', full: 'finissiez' },
        ils_elles: { stem: 'finiss', ending: 'aient', full: 'finissaient' }
      },
      futur_simple: {
        je: { stem: 'finir', ending: 'ai', full: 'finirai' },
        tu: { stem: 'finir', ending: 'as', full: 'finiras' },
        il_elle: { stem: 'finir', ending: 'a', full: 'finira' },
        nous: { stem: 'finir', ending: 'ons', full: 'finirons' },
        vous: { stem: 'finir', ending: 'ez', full: 'finirez' },
        ils_elles: { stem: 'finir', ending: 'ont', full: 'finiront' }
      }
    }
  },

  // --- 更多高频情态与位移动词 ---
  {
    id: 'pouvoir',
    infinitive: 'pouvoir',
    meaning: '能够 / 可以 (英语 can / be able to)',
    group: '3rd_irregular',
    auxiliary: 'avoir',
    participle: 'pu',
    tags: ['情态动词', '委婉表达', '考研必考'],
    sampleSentence: {
      french: 'Pourriez-vous répéter, s’il vous plaît ?',
      chinese: '请问您能重复一遍吗？(条件式委婉)'
    },
    tenses: {
      present: {
        je: { stem: 'p', ending: 'eux', full: 'peux' },
        tu: { stem: 'p', ending: 'eux', full: 'peux' },
        il_elle: { stem: 'p', ending: 'eut', full: 'peut' },
        nous: { stem: 'pouv', ending: 'ons', full: 'pouvons' },
        vous: { stem: 'pouv', ending: 'ez', full: 'pouvez' },
        ils_elles: { stem: 'peuv', ending: 'ent', full: 'peuvent' }
      },
      futur_simple: {
        je: { stem: 'pourr', ending: 'ai', full: 'pourrai' },
        tu: { stem: 'pourr', ending: 'as', full: 'pourras' },
        il_elle: { stem: 'pourr', ending: 'a', full: 'pourra' },
        nous: { stem: 'pourr', ending: 'ons', full: 'pourrons' },
        vous: { stem: 'pourr', ending: 'ez', full: 'pourrez' },
        ils_elles: { stem: 'pourr', ending: 'ont', full: 'pourront' }
      },
      conditionnel: {
        je: { stem: 'pourr', ending: 'ais', full: 'pourrais' },
        tu: { stem: 'pourr', ending: 'ais', full: 'pourrais' },
        il_elle: { stem: 'pourr', ending: 'ait', full: 'pourrait' },
        nous: { stem: 'pourr', ending: 'ions', full: 'pourrions' },
        vous: { stem: 'pourr', ending: 'iez', full: 'pourriez' },
        ils_elles: { stem: 'pourr', ending: 'aient', full: 'pourraient' }
      }
    }
  },
  {
    id: 'vouloir',
    infinitive: 'vouloir',
    meaning: '想要 / 愿意 (英语 want)',
    group: '3rd_irregular',
    auxiliary: 'avoir',
    participle: 'voulu',
    tags: ['情态动词', '日常点餐必备', '高频'],
    sampleSentence: {
      french: 'Je voudrais un café au lait, s’il vous plaît.',
      chinese: '我想点一杯拿铁咖啡，谢谢。'
    },
    tenses: {
      present: {
        je: { stem: 'v', ending: 'eux', full: 'veux' },
        tu: { stem: 'v', ending: 'eux', full: 'veux' },
        il_elle: { stem: 'v', ending: 'eut', full: 'veut' },
        nous: { stem: 'voul', ending: 'ons', full: 'voulons' },
        vous: { stem: 'voul', ending: 'ez', full: 'voulez' },
        ils_elles: { stem: 'veul', ending: 'ent', full: 'veulent' }
      },
      conditionnel: {
        je: { stem: 'voudr', ending: 'ais', full: 'voudrais' },
        tu: { stem: 'voudr', ending: 'ais', full: 'voudrais' },
        il_elle: { stem: 'voudr', ending: 'ait', full: 'voudrait' },
        nous: { stem: 'voudr', ending: 'ions', full: 'voudrions' },
        vous: { stem: 'voudr', ending: 'iez', full: 'voudriez' },
        ils_elles: { stem: 'voudr', ending: 'aient', full: 'voudraient' }
      }
    }
  },
  {
    id: 'venir',
    infinitive: 'venir',
    meaning: '来 / 来自 (英语 come)',
    group: '3rd_irregular',
    auxiliary: 'être',
    participle: 'venu',
    tags: ['位移动词用être', '最近过去时 venir de', '高频'],
    sampleSentence: {
      french: 'Je viens de Chine.',
      chinese: '我来自中国。'
    },
    tenses: {
      present: {
        je: { stem: 'v', ending: 'iens', full: 'viens' },
        tu: { stem: 'v', ending: 'iens', full: 'viens' },
        il_elle: { stem: 'v', ending: 'ient', full: 'vient' },
        nous: { stem: 'ven', ending: 'ons', full: 'venons' },
        vous: { stem: 'ven', ending: 'ez', full: 'venez' },
        ils_elles: { stem: 'vienn', ending: 'ent', full: 'viennent' }
      },
      passe_compose: {
        je: { stem: 'je suis ', ending: 'venu(e)', full: 'je suis venu(e)' },
        tu: { stem: 'tu es ', ending: 'venu(e)', full: 'tu es venu(e)' },
        il_elle: { stem: 'il est ', ending: 'venu', full: 'il est venu' },
        nous: { stem: 'nous sommes ', ending: 'venu(e)s', full: 'nous sommes venus' },
        vous: { stem: 'vous êtes ', ending: 'venu(e)s', full: 'vous êtes venus' },
        ils_elles: { stem: 'ils sont ', ending: 'venus', full: 'ils sont venus' }
      },
      futur_simple: {
        je: { stem: 'viendr', ending: 'ai', full: 'viendrai' },
        tu: { stem: 'viendr', ending: 'as', full: 'viendras' },
        il_elle: { stem: 'viendr', ending: 'a', full: 'viendra' },
        nous: { stem: 'viendr', ending: 'ons', full: 'viendrons' },
        vous: { stem: 'viendr', ending: 'ez', full: 'viendrez' },
        ils_elles: { stem: 'viendr', ending: 'ont', full: 'viendront' }
      }
    }
  }
];

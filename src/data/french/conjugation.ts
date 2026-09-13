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
  | 'imperatif'       // 命令式
  | 'passe_simple'    // 简单过去时 (考研阅读专供)
  | 'plus_que_parfait'; // 愈过去时 (过去的过去)

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
    key: 'plus_que_parfait',
    label: '愈过去时',
    frenchLabel: 'Plus-que-parfait',
    usage: '考研语法选择与汉译法必考！表示在过去某个动作之前就已经完成的动作（过去的过去）。',
    formula: '助动词 avoir/être (未完成过去时) + 过去分词'
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
  },
  {
    key: 'passe_simple',
    label: '简单过去时',
    frenchLabel: 'Passé simple',
    usage: '名校考研二外阅读必考！法国文学与纯书面叙事核心时态，通常只需识别第三人称。',
    formula: '第一组 -a/-èrent；第二/三组 -it/-irent 或 -ut/-urent'
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
      },
      conditionnel: {
        je: { stem: 'ser', ending: 'ais', full: 'serais' },
        tu: { stem: 'ser', ending: 'ais', full: 'serais' },
        il_elle: { stem: 'ser', ending: 'ait', full: 'serait' },
        nous: { stem: 'ser', ending: 'ions', full: 'serions' },
        vous: { stem: 'ser', ending: 'iez', full: 'seriez' },
        ils_elles: { stem: 'ser', ending: 'aient', full: 'seraient' }
      },
      plus_que_parfait: {
        je: { stem: "j'avais ", ending: 'été', full: "j'avais été" },
        tu: { stem: 'tu avais ', ending: 'été', full: 'tu avais été' },
        il_elle: { stem: 'il avait ', ending: 'été', full: 'il avait été' },
        nous: { stem: 'nous avions ', ending: 'été', full: 'nous avions été' },
        vous: { stem: 'vous aviez ', ending: 'été', full: 'vous aviez été' },
        ils_elles: { stem: 'ils avaient ', ending: 'été', full: 'ils avaient été' }
      },
      imperatif: {
        je: { stem: '-', ending: '-', full: '-' },
        tu: { stem: '', ending: 'Sois !', full: 'Sois !' },
        il_elle: { stem: '-', ending: '-', full: '-' },
        nous: { stem: '', ending: 'Soyons !', full: 'Soyons !' },
        vous: { stem: '', ending: 'Soyez !', full: 'Soyez !' },
        ils_elles: { stem: '-', ending: '-', full: '-' }
      },
      passe_simple: {
        je: { stem: 'f', ending: 'us', full: 'fus' },
        tu: { stem: 'f', ending: 'us', full: 'fus' },
        il_elle: { stem: 'f', ending: 'ut', full: 'fut' },
        nous: { stem: 'f', ending: 'ûmes', full: 'fûmes' },
        vous: { stem: 'f', ending: 'ûtes', full: 'fûtes' },
        ils_elles: { stem: 'f', ending: 'urent', full: 'furent' }
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
      },
      conditionnel: {
        je: { stem: '', ending: "j'aurais", full: "j'aurais" },
        tu: { stem: 'aur', ending: 'ais', full: 'aurais' },
        il_elle: { stem: 'aur', ending: 'ait', full: 'aurait' },
        nous: { stem: 'aur', ending: 'ions', full: 'aurions' },
        vous: { stem: 'aur', ending: 'iez', full: 'auriez' },
        ils_elles: { stem: 'aur', ending: 'aient', full: 'auraient' }
      },
      plus_que_parfait: {
        je: { stem: "j'avais ", ending: 'eu', full: "j'avais eu" },
        tu: { stem: 'tu avais ', ending: 'eu', full: 'tu avais eu' },
        il_elle: { stem: 'il avait ', ending: 'eu', full: 'il avait eu' },
        nous: { stem: 'nous avions ', ending: 'eu', full: 'nous avions eu' },
        vous: { stem: 'vous aviez ', ending: 'eu', full: 'vous aviez eu' },
        ils_elles: { stem: 'ils avaient ', ending: 'eu', full: 'ils avaient eu' }
      },
      subjonctif: {
        je: { stem: '', ending: 'aie', full: 'aie' },
        tu: { stem: '', ending: 'aies', full: 'aies' },
        il_elle: { stem: '', ending: 'ait', full: 'ait' },
        nous: { stem: '', ending: 'ayons', full: 'ayons' },
        vous: { stem: '', ending: 'ayez', full: 'ayez' },
        ils_elles: { stem: '', ending: 'aient', full: 'aient' }
      },
      imperatif: {
        je: { stem: '-', ending: '-', full: '-' },
        tu: { stem: '', ending: 'Aie !', full: 'Aie !' },
        il_elle: { stem: '-', ending: '-', full: '-' },
        nous: { stem: '', ending: 'Ayons !', full: 'Ayons !' },
        vous: { stem: '', ending: 'Ayez !', full: 'Ayez !' },
        ils_elles: { stem: '-', ending: '-', full: '-' }
      },
      passe_simple: {
        je: { stem: '', ending: 'eus', full: 'eus' },
        tu: { stem: '', ending: 'eus', full: 'eus' },
        il_elle: { stem: '', ending: 'eut', full: 'eut' },
        nous: { stem: '', ending: 'eûmes', full: 'eûmes' },
        vous: { stem: '', ending: 'eûtes', full: 'eûtes' },
        ils_elles: { stem: '', ending: 'eurent', full: 'eurent' }
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
      },
      imparfait: {
        je: { stem: 'all', ending: 'ais', full: 'allais' },
        tu: { stem: 'all', ending: 'ais', full: 'allais' },
        il_elle: { stem: 'all', ending: 'ait', full: 'allait' },
        nous: { stem: 'all', ending: 'ions', full: 'allions' },
        vous: { stem: 'all', ending: 'iez', full: 'alliez' },
        ils_elles: { stem: 'all', ending: 'aient', full: 'allaient' }
      },
      conditionnel: {
        je: { stem: 'ir', ending: 'ais', full: 'irais' },
        tu: { stem: 'ir', ending: 'ais', full: 'irais' },
        il_elle: { stem: 'ir', ending: 'ait', full: 'irait' },
        nous: { stem: 'ir', ending: 'ions', full: 'irions' },
        vous: { stem: 'ir', ending: 'iez', full: 'iriez' },
        ils_elles: { stem: 'ir', ending: 'aient', full: 'iraient' }
      },
      plus_que_parfait: {
        je: { stem: "j'étais ", ending: 'allé(e)', full: "j'étais allé(e)" },
        tu: { stem: 'tu étais ', ending: 'allé(e)', full: 'tu étais allé(e)' },
        il_elle: { stem: 'il était ', ending: 'allé', full: 'il était allé' },
        nous: { stem: 'nous étions ', ending: 'allé(e)s', full: 'nous étions allés' },
        vous: { stem: 'vous étiez ', ending: 'allé(e)s', full: 'vous étiez allés' },
        ils_elles: { stem: 'ils étaient ', ending: 'allés', full: 'ils étaient allés' }
      },
      subjonctif: {
        je: { stem: '', ending: 'aille', full: 'aille' },
        tu: { stem: '', ending: 'ailles', full: 'ailles' },
        il_elle: { stem: '', ending: 'aille', full: 'aille' },
        nous: { stem: 'all', ending: 'ions', full: 'allions' },
        vous: { stem: 'all', ending: 'iez', full: 'alliez' },
        ils_elles: { stem: '', ending: 'aillent', full: 'aillent' }
      },
      imperatif: {
        je: { stem: '-', ending: '-', full: '-' },
        tu: { stem: '', ending: 'Va !', full: 'Va !' },
        il_elle: { stem: '-', ending: '-', full: '-' },
        nous: { stem: '', ending: 'Allons !', full: 'Allons !' },
        vous: { stem: '', ending: 'Allez !', full: 'Allez !' },
        ils_elles: { stem: '-', ending: '-', full: '-' }
      },
      passe_simple: {
        je: { stem: 'all', ending: 'ai', full: 'allai' },
        tu: { stem: 'all', ending: 'as', full: 'allas' },
        il_elle: { stem: 'all', ending: 'a', full: 'alla' },
        nous: { stem: 'all', ending: 'âmes', full: 'allâmes' },
        vous: { stem: 'all', ending: 'âtes', full: 'allâtes' },
        ils_elles: { stem: 'all', ending: 'èrent', full: 'allèrent' }
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
      },
      imparfait: {
        je: { stem: 'fais', ending: 'ais', full: 'faisais' },
        tu: { stem: 'fais', ending: 'ais', full: 'faisais' },
        il_elle: { stem: 'fais', ending: 'ait', full: 'faisait' },
        nous: { stem: 'fais', ending: 'ions', full: 'faisions' },
        vous: { stem: 'fais', ending: 'iez', full: 'faisiez' },
        ils_elles: { stem: 'fais', ending: 'aient', full: 'faisaient' }
      },
      conditionnel: {
        je: { stem: 'fer', ending: 'ais', full: 'ferais' },
        tu: { stem: 'fer', ending: 'ais', full: 'ferais' },
        il_elle: { stem: 'fer', ending: 'ait', full: 'ferait' },
        nous: { stem: 'fer', ending: 'ions', full: 'ferions' },
        vous: { stem: 'fer', ending: 'iez', full: 'feriez' },
        ils_elles: { stem: 'fer', ending: 'aient', full: 'feraient' }
      },
      plus_que_parfait: {
        je: { stem: "j'avais ", ending: 'fait', full: "j'avais fait" },
        tu: { stem: 'tu avais ', ending: 'fait', full: 'tu avais fait' },
        il_elle: { stem: 'il avait ', ending: 'fait', full: 'il avait fait' },
        nous: { stem: 'nous avions ', ending: 'fait', full: 'nous avions fait' },
        vous: { stem: 'vous aviez ', ending: 'fait', full: 'vous aviez fait' },
        ils_elles: { stem: 'ils avaient ', ending: 'fait', full: 'ils avaient fait' }
      },
      subjonctif: {
        je: { stem: 'fass', ending: 'e', full: 'fasse' },
        tu: { stem: 'fass', ending: 'es', full: 'fasses' },
        il_elle: { stem: 'fass', ending: 'e', full: 'fasse' },
        nous: { stem: 'fass', ending: 'ions', full: 'fassions' },
        vous: { stem: 'fass', ending: 'iez', full: 'fassiez' },
        ils_elles: { stem: 'fass', ending: 'ent', full: 'fassent' }
      },
      imperatif: {
        je: { stem: '-', ending: '-', full: '-' },
        tu: { stem: '', ending: 'Fais !', full: 'Fais !' },
        il_elle: { stem: '-', ending: '-', full: '-' },
        nous: { stem: '', ending: 'Faisons !', full: 'Faisons !' },
        vous: { stem: '', ending: 'Faites !', full: 'Faites !' },
        ils_elles: { stem: '-', ending: '-', full: '-' }
      },
      passe_simple: {
        je: { stem: 'f', ending: 'is', full: 'fis' },
        tu: { stem: 'f', ending: 'is', full: 'fis' },
        il_elle: { stem: 'f', ending: 'it', full: 'fit' },
        nous: { stem: 'f', ending: 'îmes', full: 'fîmes' },
        vous: { stem: 'f', ending: 'îtes', full: 'fîtes' },
        ils_elles: { stem: 'f', ending: 'irent', full: 'firent' }
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

/**
 * 🏛️ 北外/名校考研二外阅读专供：高频简单过去时 (Passé Simple) 50 核心动词速认宝典
 * 重点攻克考研学生“单词认得，但简单过去时第三人称变位认不出”的痛点
 */
export interface PasseSimpleItem {
  id: string;
  verb: string;
  meaning: string;
  group: string;
  thirdSingular: string;  // il / elle (考研阅读最最常见)
  thirdPlural: string;    // ils / elles
  firstSingular: string;  // je
  radicalTip: string;     // 词根突变规律
}

export const KAOYAN_PASSE_SIMPLE_50: PasseSimpleItem[] = [
  { id: 'ps_1', verb: 'être', meaning: '是 / 存在', group: '第三组', thirdSingular: 'il fut', thirdPlural: 'ils furent', firstSingular: 'je fus', radicalTip: '源于古拉丁语 fui，全变异为 f- 词根' },
  { id: 'ps_2', verb: 'avoir', meaning: '有 / 得到', group: '第三组', thirdSingular: 'il eut', thirdPlural: 'ils eurent', firstSingular: "j'eus", radicalTip: '词根异化为 eu-，注意发音同单个元音 [y]' },
  { id: 'ps_3', verb: 'faire', meaning: '做 / 使得', group: '第三组', thirdSingular: 'il fit', thirdPlural: 'ils firent', firstSingular: 'je fis', radicalTip: '词根异化为 f- + -it，极高频' },
  { id: 'ps_4', verb: 'dire', meaning: '说 / 讲', group: '第三组', thirdSingular: 'il dit', thirdPlural: 'ils dirent', firstSingular: 'je dis', radicalTip: '与现在时同形 (il dit)，注意复数 dirent' },
  { id: 'ps_5', verb: 'aller', meaning: '去 / 前往', group: '第三组', thirdSingular: 'il alla', thirdPlural: 'ils allèrent', firstSingular: "j'allai", radicalTip: '规则套用第一组 -a / -èrent' },
  { id: 'ps_6', verb: 'voir', meaning: '看见 / 见证', group: '第三组', thirdSingular: 'il vit', thirdPlural: 'ils virent', firstSingular: 'je vis', radicalTip: 'v- + -it，易与 vivre 混淆，需辨别' },
  { id: 'ps_7', verb: 'savoir', meaning: '知道 / 得悉', group: '第三组', thirdSingular: 'il sut', thirdPlural: 'ils surent', firstSingular: 'je sus', radicalTip: '词根异化为 s- + -ut' },
  { id: 'ps_8', verb: 'pouvoir', meaning: '能够 / 可以', group: '第三组', thirdSingular: 'il put', thirdPlural: 'ils purent', firstSingular: 'je pus', radicalTip: '词根异化为 p- + -ut' },
  { id: 'ps_9', verb: 'falloir', meaning: '必须 / 需要', group: '无人称', thirdSingular: 'il fallut', thirdPlural: '—', firstSingular: '—', radicalTip: '无人称动词，考研高频句型 il fallut que...' },
  { id: 'ps_10', verb: 'vouloir', meaning: '想要 / 意图', group: '第三组', thirdSingular: 'il voulut', thirdPlural: 'ils voulurent', firstSingular: 'je voulus', radicalTip: 'voul- + -ut' },
  { id: 'ps_11', verb: 'venir', meaning: '来 / 达到', group: '第三组', thirdSingular: 'il vint', thirdPlural: 'ils vinrent', firstSingular: 'je vins', radicalTip: '鼻音词根 v- + -int [vɛ̃]' },
  { id: 'ps_12', verb: 'prendre', meaning: '拿 / 乘坐 / 采取', group: '第三组', thirdSingular: 'il prit', thirdPlural: 'ils prirent', firstSingular: 'je pris', radicalTip: 'pr- + -it，同理用于 comprendre, apprendre' },
  { id: 'ps_13', verb: 'arriver', meaning: '到达 / 发生', group: '第一组', thirdSingular: 'il arriva', thirdPlural: 'ils arrivèrent', firstSingular: "j'arrivai", radicalTip: '第一组规则动词，词尾 -a / -èrent' },
  { id: 'ps_14', verb: 'croire', meaning: '相信 / 认为', group: '第三组', thirdSingular: 'il crut', thirdPlural: 'ils crurent', firstSingular: 'je crus', radicalTip: 'cr- + -ut' },
  { id: 'ps_15', verb: 'mettre', meaning: '放置 / 穿上', group: '第三组', thirdSingular: 'il mit', thirdPlural: 'ils mirent', firstSingular: 'je mis', radicalTip: 'm- + -it，同理用于 promettre, admettre' },
  { id: 'ps_16', verb: 'passer', meaning: '度过 / 经过', group: '第一组', thirdSingular: 'il passa', thirdPlural: 'ils passèrent', firstSingular: 'je passai', radicalTip: '第一组规则叙事核心动词' },
  { id: 'ps_17', verb: 'devoir', meaning: '应该 / 必须', group: '第三组', thirdSingular: 'il dut', thirdPlural: 'ils durent', firstSingular: 'je dus', radicalTip: 'd- + -ut (注意单数无长音符)' },
  { id: 'ps_18', verb: 'demander', meaning: '询问 / 要求', group: '第一组', thirdSingular: 'il demanda', thirdPlural: 'ils demandèrent', firstSingular: 'je demandai', radicalTip: '小说对话引入句高频' },
  { id: 'ps_19', verb: 'trouver', meaning: '找到 / 觉得', group: '第一组', thirdSingular: 'il trouva', thirdPlural: 'ils trouvèrent', firstSingular: 'je trouvai', radicalTip: '第一组规则动词' },
  { id: 'ps_20', verb: 'donner', meaning: '给予 / 赋予', group: '第一组', thirdSingular: 'il donna', thirdPlural: 'ils donnèrent', firstSingular: 'je donnai', radicalTip: '第一组规则动词' },
  { id: 'ps_21', verb: 'comprendre', meaning: '理解 / 包含', group: '第三组', thirdSingular: 'il comprit', thirdPlural: 'ils comprirent', firstSingular: 'je compris', radicalTip: '与 prendre 变位同型' },
  { id: 'ps_22', verb: 'connaître', meaning: '认识 / 了解', group: '第三组', thirdSingular: 'il connut', thirdPlural: 'ils connurent', firstSingular: 'je connus', radicalTip: 'conn- + -ut' },
  { id: 'ps_23', verb: 'partir', meaning: '出发 / 离开', group: '第三组', thirdSingular: 'il partit', thirdPlural: 'ils partirent', firstSingular: 'je partis', radicalTip: 'part- + -it' },
  { id: 'ps_24', verb: 'mourir', meaning: '死亡 / 逝世', group: '第三组', thirdSingular: 'il mourut', thirdPlural: 'ils moururent', firstSingular: 'je mourus', radicalTip: '人物传记阅读极高频，mour- + -ut' },
  { id: 'ps_25', verb: 'naître', meaning: '出生 / 诞生', group: '第三组', thirdSingular: 'il naquit', thirdPlural: 'ils naquirent', firstSingular: 'je naquis', radicalTip: '词根特殊异化为 naqu- + -it' },
  { id: 'ps_26', verb: 'écrire', meaning: '书写 / 著述', group: '第三组', thirdSingular: 'il écrivit', thirdPlural: 'ils écrivirent', firstSingular: "j'écrivis", radicalTip: 'écriv- + -it' },
  { id: 'ps_27', verb: 'lire', meaning: '阅读 / 读到', group: '第三组', thirdSingular: 'il lut', thirdPlural: 'ils lurent', firstSingular: 'je lus', radicalTip: 'l- + -ut' },
  { id: 'ps_28', verb: 'vivre', meaning: '生活 / 经历', group: '第三组', thirdSingular: 'il vécut', thirdPlural: 'ils vécurent', firstSingular: 'je vécus', radicalTip: '词根特殊异化为 véc- + -ut' },
  { id: 'ps_29', verb: 'sentir', meaning: '感觉 / 闻到', group: '第三组', thirdSingular: 'il sentit', thirdPlural: 'ils sentirent', firstSingular: 'je sentis', radicalTip: 'sent- + -it' },
  { id: 'ps_30', verb: 'attendre', meaning: '等待 / 期望', group: '第三组', thirdSingular: 'il attendit', thirdPlural: 'ils attendirent', firstSingular: "j'attendis", radicalTip: 'attend- + -it' },
  { id: 'ps_31', verb: 'sortir', meaning: '出去 / 产出', group: '第三组', thirdSingular: 'il sortit', thirdPlural: 'ils sortirent', firstSingular: 'je sortis', radicalTip: 'sort- + -it' },
  { id: 'ps_32', verb: 'tenir', meaning: '拿着 / 保持', group: '第三组', thirdSingular: 'il tint', thirdPlural: 'ils tinrent', firstSingular: 'je tins', radicalTip: '鼻音词根 t- + -int [tɛ̃]，同 venir' },
  { id: 'ps_33', verb: 'ouvrir', meaning: '打开 / 开辟', group: '第三组', thirdSingular: 'il ouvrit', thirdPlural: 'ils ouvrirent', firstSingular: "j'ouvris", radicalTip: 'ouvr- + -it，同理用于 découvrir' },
  { id: 'ps_34', verb: 'perdre', meaning: '失去 / 输掉', group: '第三组', thirdSingular: 'il perdit', thirdPlural: 'ils perdirent', firstSingular: 'je perdis', radicalTip: 'perd- + -it' },
  { id: 'ps_35', verb: 'rendre', meaning: '归还 / 使得', group: '第三组', thirdSingular: 'il rendit', thirdPlural: 'ils rendirent', firstSingular: 'je rendis', radicalTip: 'rend- + -it (如 il rendit compte)' },
  { id: 'ps_36', verb: 'répondre', meaning: '回答 / 响应', group: '第三组', thirdSingular: 'il répondit', thirdPlural: 'ils répondirent', firstSingular: 'je répondis', radicalTip: 'répond- + -it' },
  { id: 'ps_37', verb: 'paraître', meaning: '显得 / 出版', group: '第三组', thirdSingular: 'il parut', thirdPlural: 'ils parurent', firstSingular: 'je parus', radicalTip: 'par- + -ut' },
  { id: 'ps_38', verb: 'disparaître', meaning: '消失 / 逝世', group: '第三组', thirdSingular: 'il disparut', thirdPlural: 'ils disparurent', firstSingular: 'je disparus', radicalTip: 'dispar- + -ut' },
  { id: 'ps_39', verb: 'recevoir', meaning: '收到 / 接待', group: '第三组', thirdSingular: 'il reçut', thirdPlural: 'ils reçurent', firstSingular: 'je reçus', radicalTip: '注意下加符 c -> ç (reçut)' },
  { id: 'ps_40', verb: 'boire', meaning: '喝 / 饮用', group: '第三组', thirdSingular: 'il but', thirdPlural: 'ils burent', firstSingular: 'je bus', radicalTip: 'b- + -ut' },
  { id: 'ps_41', verb: 'courir', meaning: '跑 / 蔓延', group: '第三组', thirdSingular: 'il courut', thirdPlural: 'ils coururent', firstSingular: 'je courus', radicalTip: 'cour- + -ut' },
  { id: 'ps_42', verb: 'conduire', meaning: '引导 / 驾驶', group: '第三组', thirdSingular: 'il conduisit', thirdPlural: 'ils conduisirent', firstSingular: 'je conduisis', radicalTip: 'conduis- + -it' },
  { id: 'ps_43', verb: 'craindre', meaning: '害怕 / 担忧', group: '第三组', thirdSingular: 'il craignit', thirdPlural: 'ils craignirent', firstSingular: 'je craignis', radicalTip: 'craign- + -it' },
  { id: 'ps_44', verb: 'dormir', meaning: '睡觉', group: '第三组', thirdSingular: 'il dormit', thirdPlural: 'ils dormirent', firstSingular: 'je dormis', radicalTip: 'dorm- + -it' },
  { id: 'ps_45', verb: 'entendre', meaning: '听见 / 意指', group: '第三组', thirdSingular: 'il entendit', thirdPlural: 'ils entendirent', firstSingular: "j'entendis", radicalTip: 'entend- + -it' },
  { id: 'ps_46', verb: 'plaire', meaning: '使喜欢 / 取悦', group: '第三组', thirdSingular: 'il plut', thirdPlural: 'ils plurent', firstSingular: 'je plus', radicalTip: '易与 pleuvoir (下雨) il plut 混淆，需靠上下文分辨' },
  { id: 'ps_47', verb: 'résoudre', meaning: '解决 / 决议', group: '第三组', thirdSingular: 'il résolut', thirdPlural: 'ils résolurent', firstSingular: 'je résolus', radicalTip: 'résol- + -ut' },
  { id: 'ps_48', verb: 'rire', meaning: '笑', group: '第三组', thirdSingular: 'il rit', thirdPlural: 'ils rirent', firstSingular: 'je ris', radicalTip: 'r- + -it' },
  { id: 'ps_49', verb: 'suivre', meaning: '跟随 / 听从', group: '第三组', thirdSingular: 'il suivit', thirdPlural: 'ils suivirent', firstSingular: 'je suivis', radicalTip: 'suiv- + -it' },
  { id: 'ps_50', verb: 'valoir', meaning: '价值 / 等于', group: '第三组', thirdSingular: 'il valut', thirdPlural: 'ils valurent', firstSingular: 'je valus', radicalTip: 'val- + -ut (如 il valut mieux...)' }
];

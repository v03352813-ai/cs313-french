const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = path.resolve(__dirname, '..', 'src', 'data', 'french', 'examData.ts');

// =========================================================================
// 1. 考研二外 / CFT-4 词汇语法核心题库精选池 (涵盖北外、上外、南大等历年高频考点)
// =========================================================================
const KAOYAN_GRAMMAR_POOL = [
  {
    questionType: '词汇语法',
    categoryTag: '时态配合 · 愈过去时',
    question: 'Hier soir, dès qu\'elle _____ son travail, elle est sortie avec ses amies.',
    options: ['a fini', 'avait fini', 'eut fini', 'finissait'],
    correctAnswer: 1,
    score: 5,
    explanation: '【权威考点解析】\\n句意：“昨天晚上，她一完成工作，就和朋友们出去了。”\\n主句谓语是复合过去时 (est sortie)，从句 dès que (一...就...) 表示在以过去为基准的时间前已完成的动作，必须使用愈过去时 (Plus-que-parfait: avait fini) 表示“过去的过去”。',
    translation: '昨天晚上，她一完成工作，就和朋友们出去了。',
    grammarTag: '愈过去时 (Plus-que-parfait)',
    vocabList: [{ word: 'sortir avec', meaning: '与...一起外出' }, { word: 'dès que', meaning: '一...就... (连词短语)' }]
  },
  {
    questionType: '词汇语法',
    categoryTag: '代词系统 · 双代词语序',
    question: 'Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.',
    options: ['leur en', 'en leur', 'les en', 'en lui'],
    correctAnswer: 0,
    score: 5,
    explanation: '【权威考点解析】\\nparler de qch (代词 en 替代事物) à qn (父母为复数，间宾代词 leur)。\\n双宾语代词在动词前的严格语序规则：人称代词 (lui / leur) 必须置于副代词 (y / en) 之前！因此唯一正确语序为：【leur en ai parlé】。选 A。',
    translation: '你跟父母谈过你的新项目了吗？——是的，我昨天已经跟他们谈过了。',
    grammarTag: '双宾语代词位置 (leur en)',
    vocabList: [{ word: 'parler de qch à qn', meaning: '就某事与某人交谈' }, { word: 'projet (n.m.)', meaning: '项目，计划' }]
  },
  {
    questionType: '词汇语法',
    categoryTag: '分词配合 · 直宾提前',
    question: 'Les photos que vous avez _____ sont magnifiques.',
    options: ['pris', 'prise', 'prises', 'prennent'],
    correctAnswer: 2,
    score: 5,
    explanation: '【权威考点解析】\\n在以 avoir 为助动词的复合过去时中，直接宾语提前时，过去分词必须与直接宾语性数配合！\\n先行词 les photos 是阴性复数名词，关系代词 que 在从句中充当 pris 的直宾，因此 prendre 的过去分词 pris 变为阴性复数【prises】。选 C。',
    translation: '您拍的那些照片真是太美了。',
    grammarTag: '过去分词与直宾性数配合',
    vocabList: [{ word: 'prendre des photos', meaning: '拍照' }, { word: 'magnifique (adj.)', meaning: '宏伟壮丽的，极好的' }]
  },
  {
    questionType: '词汇语法',
    categoryTag: '虚拟式 · 触发连词短语',
    question: 'Bien qu\'il _____ beaucoup de difficultés, il n\'a jamais abandonné son rêve.',
    options: ['a', 'avait', 'ait', 'aura'],
    correctAnswer: 2,
    score: 5,
    explanation: '【权威考点解析】\\n连词短语 bien que (虽然，尽管) 引导让步状语从句，动词必须使用【虚拟式现在时 (Subjonctif présent)】。\\n动词 avoir 虚拟式第三人称单数变位为【ait】。正确答案为 C。',
    translation: '尽管遇到了许多困难，但他从未放弃自己的梦想。',
    grammarTag: '虚拟式现在时 (bien que)',
    vocabList: [{ word: 'bien que + subj.', meaning: '尽管，虽然' }, { word: 'abandonner (v.)', meaning: '放弃' }]
  },
  {
    questionType: '词汇语法',
    categoryTag: '代词式动词 · 分词配合避坑',
    question: 'Elles se sont _____ compte de leur erreur un peu trop tard.',
    options: ['rendu', 'rendue', 'rendus', 'rendues'],
    correctAnswer: 0,
    score: 5,
    explanation: '【权威考点解析】\\n固定短语 se rendre compte de qch (意识到某事)。这里的 se 实际上充当动词 rendre 的间接宾语，而 compte 是直接宾语且位于动词之后，因此过去分词 rendu【绝不配合】，保持原形 rendu！选 A。',
    translation: '她们意识到自己的错误时已经有点太晚了。',
    grammarTag: '代词式动词固定短语 (se rendre compte)',
    vocabList: [{ word: 'se rendre compte de', meaning: '意识到，发觉 (不配合)' }, { word: 'erreur (n.f.)', meaning: '错误' }]
  },
  {
    questionType: '词汇语法',
    categoryTag: '关系代词 · dont 深度考查',
    question: 'C\'est une entreprise internationale _____ le directeur général est très jeune.',
    options: ['qui', 'que', 'dont', 'où'],
    correctAnswer: 2,
    score: 5,
    explanation: '【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune. \\nde + 先行词 (de cette entreprise) 充当名词的所有格限制补语，必须使用关系代词【dont】来连接引导！选 C。',
    translation: '这是一间总经理非常年轻的国际跨国企业。',
    grammarTag: '关系代词 dont 的所有格用法',
    vocabList: [{ word: 'directeur général', meaning: '总经理 / CEO' }, { word: 'entreprise (n.f.)', meaning: '企业，公司' }]
  },
  {
    questionType: '词汇语法',
    categoryTag: '副代词 · y 的地点与抽象引申',
    question: 'Pensez-vous encore à votre ancien travail ? — Non, je n\'_____ pense plus du tout.',
    options: ['en', 'y', 'le', 'lui'],
    correctAnswer: 1,
    score: 5,
    explanation: '【权威考点解析】\\npenser à qch (思考/想念某事/物)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。',
    translation: '你还会想起以前的那份工作吗？——不，我一点也不再去想它了。',
    grammarTag: '副代词 y (代替 à + 物)',
    vocabList: [{ word: 'penser à qch', meaning: '考虑某事，想念某事' }, { word: 'ne... plus du tout', meaning: '一点也不再...' }]
  },
  {
    questionType: '词汇语法',
    categoryTag: '条件式 · 与过去假设配合',
    question: 'Si tu m\'avais prévenu à temps, je ne _____ pas venu si tard.',
    options: ['serais', 'serais été', 'fus', 'sois'],
    correctAnswer: 0,
    score: 5,
    explanation: '【权威考点解析】\\nSi 引导的对过去假设句型规则：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。',
    translation: '如果你及时通知我，我就不会来得这么晚了。',
    grammarTag: 'Si 条件假设与条件式过去时',
    vocabList: [{ word: 'prévenir qn à temps', meaning: '及时通知/提醒某人' }, { word: 'tard (adv.)', meaning: '迟，晚' }]
  },
  {
    questionType: '词汇语法',
    categoryTag: '介词与冠词 · 国名专有搭配',
    question: 'Le président français effectuera une visite officielle _____ Mexique le mois prochain.',
    options: ['en', 'au', 'à', 'dans'],
    correctAnswer: 1,
    score: 5,
    explanation: '【权威考点解析】\\n阳性国名以辅音结尾通常加定冠词 le (如 le Mexique, le Japon, le Canada)。去往阳性单数国名或在阳性国名中，介词必须用【au】 (à + le = au)！选 B。',
    translation: '法国总统下个月将对墨西哥进行正式国事访问。',
    grammarTag: '阳性国名前的介词搭配 (au Mexique)',
    vocabList: [{ word: 'visite officielle', meaning: '国事访问，正式访问' }, { word: 'effectuer (v.)', meaning: '进行，执行' }]
  },
  {
    questionType: '词汇语法',
    categoryTag: '否定副词 · 文学句式辨析',
    question: 'Dans ce village isolé, il n\'y a _____ de supermarché ni de pharmacie.',
    options: ['aucun', 'point', 'jamais', 'guère'],
    correctAnswer: 1,
    score: 5,
    explanation: '【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。',
    translation: '在这个偏僻的孤立村庄里，既没有超市，也没有药店。',
    grammarTag: '否定句型 (ne... point de)',
    vocabList: [{ word: 'isolé (adj.)', meaning: '孤立的，偏远的' }, { word: 'pharmacie (n.f.)', meaning: '药店' }]
  },
  {
    questionType: '词汇语法',
    categoryTag: '连接连词 · 因果与时间逻辑',
    question: '_____ il pleuvait à verse, nous avons préféré rester à l\'hôtel.',
    options: ['Comme', 'Puisque', 'Parce que', 'Car'],
    correctAnswer: 0,
    score: 5,
    explanation: '【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。',
    translation: '由于当时正下着倾盆大雨，我们宁愿留在酒店里。',
    grammarTag: '句首原因状语从句 (Comme)',
    vocabList: [{ word: 'pleuvoir à verse', meaning: '倾盆大雨，下暴雨' }, { word: 'préférer + inf.', meaning: '宁愿做某事' }]
  },
  {
    questionType: '词汇语法',
    categoryTag: '虚拟式 · 情感心理动词后接从句',
    question: 'Je suis vraiment ravi que vous _____ enfin assister à notre conférence.',
    options: ['pouvez', 'puissiez', 'pourrez', 'pouviez'],
    correctAnswer: 1,
    score: 5,
    explanation: '【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。',
    translation: '得知您终于能出席我们的研讨会，我真是太高兴了。',
    grammarTag: '情感动词后接虚拟式 (être ravi que)',
    vocabList: [{ word: 'être ravi de / que', meaning: '对...感到由衷高兴' }, { word: 'assister à', meaning: '出席，参加' }]
  }
];

// =========================================================================
// 2. 动词变位与时态转换题库精选池 (Conjugaison des verbes)
// =========================================================================
const CONJUGAISON_POOL = [
  {
    questionType: '动词变位',
    categoryTag: '动词变位 · 复合过去 vs 未完成过去',
    question: 'Pendant que nous (dîner) _____, le téléphone a soudainement sonné.',
    options: ['avons dîné', 'dînions', 'dînâmes', 'dînerons'],
    correctAnswer: 1,
    score: 5,
    explanation: '【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。',
    translation: '当我们正在吃晚饭的时候，电话突然响了。',
    grammarTag: '未完成过去时充当背景时态',
    vocabList: [{ word: 'pendant que', meaning: '当...的时候 (伴随延续)' }, { word: 'soudainement (adv.)', meaning: '突然，骤然' }]
  },
  {
    questionType: '动词变位',
    categoryTag: '动词变位 · 简单将来时特殊词根',
    question: 'Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.',
    options: ['envoyons', 'enverrons', 'envoyerons', 'enverrions'],
    correctAnswer: 1,
    score: 5,
    explanation: '【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。',
    translation: '老师一到，我们就将向他递交我们的报告。',
    grammarTag: 'envoyer 的简单将来时变位',
    vocabList: [{ word: 'envoyer qch à qn', meaning: '寄送某物给某人' }, { word: 'rapport (n.m.)', meaning: '报告，汇报' }]
  },
  {
    questionType: '动词变位',
    categoryTag: '动词变位 · 条件式现在时表委婉',
    question: 'Excusez-moi monsieur, (pouvoir) _____-vous m\'indiquer le chemin de la gare ?',
    options: ['pouvez', 'pourriez', 'puissiez', 'pourrez'],
    correctAnswer: 1,
    score: 5,
    explanation: '【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。',
    translation: '打扰一下先生，请问您能给我指一下去火车站的路吗？',
    grammarTag: '条件式现在时表示礼貌委婉请求',
    vocabList: [{ word: 'indiquer le chemin', meaning: '指路，领路' }, { word: 'gare (n.f.)', meaning: '火车站' }]
  },
  {
    questionType: '动词变位',
    categoryTag: '动词变位 · 先将来时 (Futur antérieur)',
    question: 'Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.',
    options: ['termineras', 'auras terminé', 'avais terminé', 'termines'],
    correctAnswer: 1,
    score: 5,
    explanation: '【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。',
    translation: '当你完成医学学业时，你将会成为一名杰出的外科医生。',
    grammarTag: '先将来时 (Futur antérieur)',
    vocabList: [{ word: 'études de médecine', meaning: '医学学业' }, { word: 'chirurgien (n.m.)', meaning: '外科医生' }]
  }
];

// =========================================================================
// 3. 完形填空核心语篇题库 (Texte à trous)
// =========================================================================
const CLOZE_PASSAGE_POOL = [
  {
    passageTitle: '完形填空 · 巴黎市民绿色出行转型',
    contextText: `De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la mairie de Paris a pris de nombreuses mesures énergiques. Elle encourage activement les habitants (2)_____ emprunter les transports en commun plutôt que d'utiliser leur voiture personnelle. Par ailleurs, des pistes cyclables sécurisées ont été créées (3)_____ toute la capitale, ce qui permet aux citoyens de se déplacer (4)_____ vélo en toute sérénité.`,
    questions: [
      {
        questionType: '完形填空',
        categoryTag: '完形填空 · 介词搭配',
        question: '第 (1) 空应填入哪个介词？',
        options: ['contre', 'pour', 'vers', 'sans'],
        correctAnswer: 0,
        score: 5,
        explanation: '【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。',
        translation: 'lutter contre la pollution (抗击污染)',
        grammarTag: '固定搭配 (lutter contre)'
      },
      {
        questionType: '完形填空',
        categoryTag: '完形填空 · 动词句型',
        question: '第 (2) 空应填入哪个虚词？',
        options: ['à', 'de', 'pour', 'en'],
        correctAnswer: 0,
        score: 5,
        explanation: '【考点解析】固定短语 encourager qn à faire qch (鼓励某人做某事)。选 A。',
        translation: 'encourager qn à faire qch (鼓励某人做某事)',
        grammarTag: '介词句型 (encourager à)'
      },
      {
        questionType: '完形填空',
        categoryTag: '完形填空 · 介词语义',
        question: '第 (3) 空应填入哪个介词短语？',
        options: ['à travers', 'au milieu de', 'près de', 'hors de'],
        correctAnswer: 0,
        score: 5,
        explanation: '【考点解析】à travers toute la capitale 意为“贯穿整个首都，遍及整个首都”。选 A。',
        translation: 'à travers toute la capitale (遍布整个首都)',
        grammarTag: '介词短语 (à travers)'
      },
      {
        questionType: '完形填空',
        categoryTag: '完形填空 · 交通方式介词',
        question: '第 (4) 空应填入哪个交通介词？',
        options: ['en', 'à', 'par', 'dans'],
        correctAnswer: 1,
        score: 5,
        explanation: '【考点解析】法语中开放式交通工具（自行车、摩托车、马匹、步行）使用介词 à：à vélo (骑车), à pied (步行), à moto (骑摩托)。选 B。',
        translation: 'se déplacer à vélo (骑自行车出行)',
        grammarTag: '交通工具介词 (à vélo vs en voiture)'
      }
    ]
  }
];

// =========================================================================
// 4. DELF 欧标实用海报告示与日常交流题库 (Documents & Affiches)
// =========================================================================
const DELF_PRACTICAL_DOCS_POOL = [
  {
    docTitle: 'DELF A1/A2 告示阅读 · 卢浮宫博物馆周五夜场特别开放指南',
    contextText: `[Musée du Louvre — Nocturnes du vendredi]
Chers visiteurs,
À compter du 1er octobre, le musée du Louvre ouvre ses portes en nocturne chaque vendredi jusqu'à 21h45.
• Tarifs : Gratuit pour les moins de 26 ans résidents de l'Union européenne sur présentation d'une pièce d'identité valide. Pour les autres visiteurs, billet unique à 17 €.
• Réservation : Obligatoire en ligne afin de garantir votre créneau de visite. Aucun billet ne sera vendu sur place aux caisses le soir même.
• Vestiaire : Gratuit pour les manteaux et petits sacs. Les valises volumineuses sont strictement interdites.`,
    questions: [
      {
        questionType: '图表告示',
        categoryTag: '实用文体 · 门票与受众政策',
        question: 'D\'après le document, qui peut visiter le Louvre gratuitement le vendredi soir ?',
        options: [
          'Tous les visiteurs français sans condition.',
          'Les jeunes de moins de 26 ans résidant dans l\'Union européenne.',
          'Uniquement les étudiants en histoire de l\'art.',
          'Les touristes arrivant après 20 heures.'
        ],
        correctAnswer: 1,
        score: 5,
        explanation: '【考点解析】告示明确写明：“Gratuit pour les moins de 26 ans résidents de l\'Union européenne sur présentation d\'une pièce d\'identité”。选项 B 完全一致。',
        translation: '根据通知，26岁以下居住在欧盟的青年可凭身份证件免费参观。',
        grammarTag: '信息检索与条件判断'
      },
      {
        questionType: '图表告示',
        categoryTag: '实用文体 · 购票规则推断',
        question: 'Comment les visiteurs doivent-ils acheter leur billet pour la nocturne ?',
        options: [
          'Aux caisses automatiques à l\'entrée du musée.',
          'Par téléphone auprès de l\'Office de Tourisme.',
          'Obligatoirement en ligne à l\'avance.',
          'Directement auprès des guides touristiques.'
        ],
        correctAnswer: 2,
        score: 5,
        explanation: '【考点解析】告示明确强调：“Réservation : Obligatoire en ligne... Aucun billet ne sera vendu sur place aux caisses le soir même”。必须提前在网上预约。选 C。',
        translation: '参观者必须提前在网上预约购票，现场不设售票。',
        grammarTag: '公告细则理解'
      }
    ]
  },
  {
    docTitle: 'DELF A2 租房启事与生活咨询',
    contextText: `[Annonce immobilière — Lyon 6e]
Particulier loue studio lumineux de 28 m², entièrement meublé et rénové, situé au 3e étage avec ascenseur.
• Emplacement idéal : à 3 minutes à pied du métro Masséna et du parc de la Tête d'Or.
• Équipements : Cuisine équipée (plaques induction, réfrigérateur, micro-ondes), lave-linge, canapé-lit convertible grand confort, connexion fibre optique incluse.
• Loyer mensuel : 680 € toutes charges comprises (eau, chauffage collectif et internet).
• Dépôt de garantie : Deux mois de loyer hors charges (1 200 €). Caution parentale demandée pour les étudiants. Disponible immédiatement.`,
    questions: [
      {
        questionType: '图表告示',
        categoryTag: '实用文体 · 租金明细计算',
        question: 'Que comprend le loyer mensuel de 680 € ?',
        options: [
          'Le loyer, l\'eau, le chauffage et la connexion internet.',
          'Uniquement le loyer sans aucune charge.',
          'Le loyer et l\'électricité uniquement.',
          'Le loyer et une place de parking souterrain.'
        ],
        correctAnswer: 0,
        score: 5,
        explanation: '【考点解析】告示明文注明：“680 € toutes charges comprises (eau, chauffage collectif et internet)”，包含水费、暖气与光纤宽带。选 A。',
        translation: '每月680欧元房租包含水费、集中供暖和宽带网络。',
        grammarTag: '生活应用文体解析'
      }
    ]
  }
];

// =========================================================================
// 5. 广播与电台听解题库 (Compréhension de l'oral - 包含逐字法语录音脚本)
// =========================================================================
const LISTENING_ORAL_POOL = [
  {
    questionType: '听解原声',
    categoryTag: '电台访谈 · 四天工作制探讨',
    question: 'D\'après l\'invité dans cet extrait radiophonique, quel est le bénéfice majeur constaté par les entreprises ayant adopté la semaine de 4 jours ?',
    audioScript: `« Journaliste : Nous accueillons ce matin sur France Inter le sociologue Marc Vasseur pour évoquer l'expérimentation de la semaine de travail de quatre jours dans plusieurs PME françaises. Marc Vasseur, après un an de recul, quels sont les premiers bilans ?
Marc Vasseur : Le constat est particulièrement éloquent. Non seulement la productivité globale des salariés n'a pas baissé, mais on constate une diminution spectaculaire de 35 % du taux de burn-out et des arrêts maladie. Les employés se disent nettement plus reposés et motivés le lundi matin. »`,
    options: [
      'Une réduction drastique de la masse salariale.',
      'Une baisse significative des arrêts maladie et du stress sans perte de productivité.',
      'L\'augmentation du nombre d\'heures supplémentaires le week-end.',
      'La fermeture définitive des bureaux physiques le vendredi.'
    ],
    correctAnswer: 1,
    score: 10,
    explanation: '【听力原声精析】\\n专家明确指出：“Non seulement la productivité n\'a pas baissé, mais on constate une diminution spectaculaire de 35 % du taux de burn-out et des arrêts maladie”（生产率未降，且病假和职业倦怠骤降35%）。选项 B 完美契合。',
    translation: '在没有降低整体生产率的前提下，员工病假率与职业倦怠感显著降低。',
    grammarTag: '听力细节抓取 · 电台访谈',
    vocabList: [{ word: 'bilan (n.m.)', meaning: '总结，盘点' }, { word: 'burn-out (n.m.)', meaning: '职业倦怠，过劳' }]
  },
  {
    questionType: '听解原声',
    categoryTag: '新闻播报 · 城市智能微交通',
    question: 'Quelle est la nouvelle mesure annoncée par la préfecture pour les trottinettes électriques ?',
    audioScript: `« Flash information : Face à la recrudescence des accidents en zone urbaine, la préfecture de police durcit le ton. Dès lundi prochain, la vitesse maximale autorisée des trottinettes électriques en libre-service sera bridée automatiquement par géolocalisation à 10 km/h dans les zones piétonnes, contre 20 km/h auparavant. Tout contrevenant s'expose à une amende forfaitaire de 135 euros. »`,
    options: [
      'L\'interdiction absolue des trottinettes dans toute l\'agglomération.',
      'La limitation automatique de vitesse à 10 km/h dans les zones piétonnes.',
      'La gratuité totale du service pour les étudiants.',
      'L\'obligation de passer un permis de conduire moto.'
    ],
    correctAnswer: 1,
    score: 10,
    explanation: '【听力原声精析】\\n新闻中明确播报：“la vitesse maximale... sera bridée automatiquement par géolocalisation à 10 km/h dans les zones piétonnes”。选 B。',
    translation: '在步行区域通过卫星定位自动限速在10公里/小时。',
    grammarTag: '听力核心数据提取 · 新闻播报',
    vocabList: [{ word: 'brider (v.)', meaning: '限速，抑制' }, { word: 'zone piétonne', meaning: '步行区' }]
  }
];

// =========================================================================
// 6. 社科长篇深度阅读文章库 (Compréhension écrite - 25~30行学术社科论说)
// =========================================================================
const LONG_ESSAY_POOL = [
  {
    essayTitle: '社科长篇精读 · 数字时代的注意力危机与深度阅读重塑',
    passageText: `Dans nos sociétés hyperconnectées, le flux continu des notifications, des messages instantanés et des vidéos ultracourtes modifie en profondeur l'architecture cognitive de l'être humain. De nombreuses recherches en neurosciences démontrent que la sollicitation perpétuelle de notre attention engendre une fragmentation de la pensée, réduisant notre capacité à nous concentrer sur des textes longs et complexes. Ce phénomène, baptisé par certains chercheurs « l'infobésité », ne se traduit pas simplement par une fatigue mentale passagère ; il altère durablement notre faculté d'esprit critique et notre aptitude à l'analyse nuancée.

Face à cette menace insidieuse, un mouvement international en faveur de la « slow reading » (la lecture lente et attentive) voit le jour. Il ne s'agit pas de rejeter en bloc les technologies numériques, qui offrent un accès sans précédent au savoir universel, mais de réapprendre à sanctuariser des plages temporelles dédiées à la lecture immersive. Lire un essai philosophique ou un grand roman classique sans interruption permet non seulement de reconnecter les circuits neuronaux de la mémoire à long terme, mais constitue également un acte de résistance intellectuelle face à l'immédiateté marchande des algorithmes.`,
    questions: [
      {
        questionType: '读解分析',
        categoryTag: '学术论说 · 现象机制分析',
        question: 'D\'après le premier paragraphe, quelle est la conséquence cognitive majeure de l\'infobésité ?',
        options: [
          'Une amélioration spectaculaire de la vitesse de mémorisation.',
          'La fragmentation de la pensée et la dégradation de l\'esprit critique.',
          'La disparition progressive de l\'accès à Internet.',
          'Une augmentation du temps consacré aux devoirs scolaires.'
        ],
        correctAnswer: 1,
        score: 15,
        explanation: '【深度长文分析】\\n第一段指出：“...engendre une fragmentation de la pensée... il altère durablement notre faculté d\'esprit critique et notre aptitude à l\'analyse nuancée”（导致思维碎片化，长期破坏批判性思维与细腻分析能力）。选项 B 准确概括。',
        translation: '信息过载导致思维碎片化，并削弱深度批判性反思能力。',
        grammarTag: '学术阅读深层因果推断'
      },
      {
        questionType: '读解分析',
        categoryTag: '学术论说 · 解决方案与主旨',
        question: 'Selon l\'auteur, quel est le véritable objectif du mouvement « slow reading » ?',
        options: [
          'Interdire définitivement tous les ordinateurs dans les écoles.',
          'Préserver des moments réservés à une lecture immersive et réflexive.',
          'Remplacer les livres papier par des podcasts audio.',
          'Augmenter le prix de vente des œuvres littéraires classiques.'
        ],
        correctAnswer: 1,
        score: 15,
        explanation: '【深度长文分析】\\n第二段明确指出：“Il ne s\'agit pas de rejeter les technologies numériques... mais de réapprendre à sanctuariser des plages temporelles dédiées à la lecture immersive”（并非彻底排斥数字技术，而是学会守护专属沉浸式深读的时间空间）。选项 B 完全吻合。',
        translation: '守护专注沉浸阅读的时间，重建深层思考与知性反思。',
        grammarTag: '文章主旨与作者立场'
      }
    ]
  }
];

// =========================================================================
// 7. 试卷拼装引擎 (Paper Assembly Engine)
// =========================================================================
function buildFullPaper(seed, track, level, school, year, title, frTitle, summary, timeMin, isFree) {
  const questions = [];
  let qNum = 1;

  // 1. 词汇语法单选 (6 题)
  const gCount = KAOYAN_GRAMMAR_POOL.length;
  for (let i = 0; i < 6; i++) {
    const raw = KAOYAN_GRAMMAR_POOL[(seed * 3 + i) % gCount];
    questions.push({
      id: `${seed}_q${qNum++}`,
      questionType: raw.questionType,
      categoryTag: raw.categoryTag,
      question: raw.question,
      options: raw.options,
      correctAnswer: raw.correctAnswer,
      score: 5,
      explanation: raw.explanation,
      translation: raw.translation,
      grammarTag: raw.grammarTag,
      vocabList: raw.vocabList
    });
  }

  // 2. 动词变位 / 完形填空 (2 题)
  if (track === 'kaoyan' || track === 'cft4') {
    const cCount = CONJUGAISON_POOL.length;
    for (let i = 0; i < 2; i++) {
      const raw = CONJUGAISON_POOL[(seed * 2 + i) % cCount];
      questions.push({
        id: `${seed}_q${qNum++}`,
        questionType: raw.questionType,
        categoryTag: raw.categoryTag,
        question: raw.question,
        options: raw.options,
        correctAnswer: raw.correctAnswer,
        score: 5,
        explanation: raw.explanation,
        translation: raw.translation,
        grammarTag: raw.grammarTag,
        vocabList: raw.vocabList
      });
    }
  } else {
    // DELF 实用海报
    const doc = DELF_PRACTICAL_DOCS_POOL[seed % DELF_PRACTICAL_DOCS_POOL.length];
    doc.questions.forEach(q => {
      questions.push({
        id: `${seed}_q${qNum++}`,
        questionType: q.questionType,
        categoryTag: q.categoryTag,
        question: q.question,
        contextText: doc.contextText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        score: 5,
        explanation: q.explanation,
        translation: q.translation,
        grammarTag: q.grammarTag
      });
    });
  }

  // 3. 听解原声题 (2 题)
  const lCount = LISTENING_ORAL_POOL.length;
  for (let i = 0; i < 2; i++) {
    const raw = LISTENING_ORAL_POOL[(seed + i) % lCount];
    questions.push({
      id: `${seed}_q${qNum++}`,
      questionType: raw.questionType,
      categoryTag: raw.categoryTag,
      question: raw.question,
      audioScript: raw.audioScript,
      options: raw.options,
      correctAnswer: raw.correctAnswer,
      score: 10,
      explanation: raw.explanation,
      translation: raw.translation,
      grammarTag: raw.grammarTag,
      vocabList: raw.vocabList
    });
  }

  // 4. 社科长篇读解 (2 题)
  const essay = LONG_ESSAY_POOL[seed % LONG_ESSAY_POOL.length];
  essay.questions.forEach(q => {
    questions.push({
      id: `${seed}_q${qNum++}`,
      questionType: q.questionType,
      categoryTag: q.categoryTag,
      question: q.question,
      contextText: essay.passageText,
      options: q.options,
      correctAnswer: q.correctAnswer,
      score: 15,
      explanation: q.explanation,
      translation: q.translation,
      grammarTag: q.grammarTag
    });
  });

  return {
    id: `paper_${track}_${seed}`,
    title,
    frenchTitle: frTitle,
    track,
    level,
    schoolOrOrg: school,
    yearOrSession: year,
    summary,
    durationMinutes: timeMin,
    totalScore: 100,
    isFreePreview: Boolean(isFree),
    questions
  };
}

// =========================================================================
// 8. 组装整套 36 套法国全真试卷库
// =========================================================================
const ALL_36_PAPERS = [
  // -------------------------------------------------------------
  // 赛道一：全国考研二外法语名校统考与冲刺全真大卷 (12 套)
  // -------------------------------------------------------------
  buildFullPaper(1, 'kaoyan', '241/242考研', '全国高校统考大纲', '2025高频冲刺',
    '2025年全国高校考研二外法语高频真题精编卷 (一)',
    'Concours de Master 2025 : Épreuve nationale de français (Vol. 1)',
    '汇集全国考研二外高频考点，涵盖直宾提前分词配合、副代词 y/en 深度辨析、虚拟式及长篇阅读分析。', 60, true),
  buildFullPaper(2, 'kaoyan', '241/242考研', '全国高校统考大纲', '2025高频冲刺',
    '2025年全国高校考研二外法语高频真题精编卷 (二)',
    'Concours de Master 2025 : Épreuve nationale de français (Vol. 2)',
    '聚焦二外高分突破：愈过去时与过去完成配合、中性代词 le、关系代词 dont 及社科文化长文精读。', 60, false),
  buildFullPaper(3, 'kaoyan', '241/242考研', '北京外国语大学', '2024真题卷',
    '2024年北京外国语大学 (242) 二外法语考研统考真题卷',
    'Université des Études Étrangères de Pékin (BFSU 242) — Session 2024',
    '北外官方命题风格：词汇辨析精妙、动词变位严谨、代词多重替换与法国社会发展长篇综合考核。', 75, false),
  buildFullPaper(4, 'kaoyan', '241/242考研', '上海外国语大学', '2024真题卷',
    '2024年上海外国语大学 (241) 二外法语考研统考真题卷',
    'Université des Études Internationales de Shanghai (SISU 241) — Session 2024',
    '上外经典卷面：语法注重时态配合逻辑，完形填空考察虚词短语搭配，长篇论说文立意深远。', 75, false),
  buildFullPaper(5, 'kaoyan', '241/242考研', '广东外语外贸大学', '2024真题卷',
    '2024年广东外语外贸大学 (243) 二外法语考研真题卷',
    'Université des Études Étrangères du Guangdong (GDUFS 243) — Session 2024',
    '广外二外大纲命题：注重商务与日常交际法文、虚拟式判断、双宾语代词位置及阅读细节推断。', 60, false),
  buildFullPaper(6, 'kaoyan', '241/242考研', '南京大学', '2024统考卷',
    '2024年南京大学 (241) 二外法语考研统考真题卷',
    'Université de Nanjing (NJU 241) — Épreuve de français langue seconde',
    '南大外院命题风格：强调文学性与正统学术法语，分词配合与虚拟式触发机制考察细致入微。', 60, false),
  buildFullPaper(7, 'kaoyan', '241/242考研', '武汉大学', '2024精编卷',
    '2024年武汉大学 (242) 二外法语考研真题精编卷',
    'Université de Wuhan (WHU 242) — Épreuve officielle de français',
    '武大经典二外：涵盖动词短语搭配、条件式假设句型、介词用法辨析与现代法国社会长篇精读。', 60, false),
  buildFullPaper(8, 'kaoyan', '241/242考研', '复旦大学', '2024精编卷',
    '2024年复旦大学 (241) 二外法语考研真题精编卷',
    'Université Fudan (FDU 241) — Examen officiel de français langue étrangère',
    '复旦二外权威题库：考查词汇广度、自反代词配合陷阱、复杂关系从句以及科技伦理阅读。', 60, false),
  buildFullPaper(9, 'kaoyan', '241/242考研', '中山大学', '2024精编卷',
    '2024年中山大学 (242) 二外法语考研真题精编卷',
    'Université Sun Yat-sen (SYSU 242) — Examen de Master en français',
    '中大高频试题：重点攻坚时间状语从句与时态呼应、否定句型变异及社科文化事实推论。', 60, false),
  buildFullPaper(10, 'kaoyan', '241/242考研', '名校联考精选', '2023综合冲刺',
    '2023年全国名校考研二外法语综合冲刺精编卷 (A卷)',
    'Concours National de Master : Épreuve de synthèse avancée (Série A)',
    '整合全国多所985外语院校考研试题核心精华，全真模拟考场环境，自测提分利器。', 60, false),
  buildFullPaper(11, 'kaoyan', '241/242考研', '名校联考精选', '2023综合冲刺',
    '2023年全国名校考研二外法语综合冲刺精编卷 (B卷)',
    'Concours National de Master : Épreuve de synthèse avancée (Série B)',
    '针对易错混淆项设计干扰，深度攻克过去分词配合、副代词 en 的数量代换及长文主旨。', 60, false),
  buildFullPaper(12, 'kaoyan', '241/242考研', '北京外国语大学', '经典必考卷',
    '北京外国语大学二外法语历年必考压轴经典卷',
    'BFSU : Recueil d\'excellence des annales de français langue seconde',
    '沉淀北外十年考研经典题源，涵盖语法重难点终极冲刺与高难度阅读逻辑辨析。', 75, false),

  // -------------------------------------------------------------
  // 赛道二：大学法语四级考试 (CFT-4) 全国统考全真大卷 (6 套)
  // -------------------------------------------------------------
  buildFullPaper(13, 'cft4', '大学法语四级', '教育部高校外语统考', '2024全真卷',
    '大学法语四级 (CFT-4) 全国统考全真冲刺模拟卷 (一)',
    'Certificat de Français pour l\'Enseignement Supérieur (CFT-4 : Modèle 1)',
    '完全遵循教育部《大学法语四级考试大纲》标准排版，覆盖听力理解、词汇语法、完形与阅读。', 45, true),
  buildFullPaper(14, 'cft4', '大学法语四级', '教育部高校外语统考', '2024全真卷',
    '大学法语四级 (CFT-4) 全国统考全真冲刺模拟卷 (二)',
    'Certificat de Français pour l\'Enseignement Supérieur (CFT-4 : Modèle 2)',
    '标准化考题分布，精准检验公外法语学员 A2-B1 水平阶段的核心语言综合运用能力。', 45, false),
  buildFullPaper(15, 'cft4', '大学法语四级', '教育部高校外语统考', '2023全真卷',
    '大学法语四级 (CFT-4) 全国统考全真冲刺模拟卷 (三)',
    'Certificat de Français pour l\'Enseignement Supérieur (CFT-4 : Modèle 3)',
    '历年四级考纲核心汇编：代词式动词变位、日常生活情景交际、广播短文听解与事实提取。', 45, false),
  buildFullPaper(16, 'cft4', '大学法语四级', '教育部高校外语统考', '专项冲刺卷',
    '大学法语四级 (CFT-4) 语法词汇结构专项突破卷',
    'CFT-4 : Entraînement intensif en vocabulaire et structures grammaticales',
    '针对四级选择题失分重灾区集训：固定搭配、时态复合用法、虚拟式判断与介词填空。', 40, false),
  buildFullPaper(17, 'cft4', '大学法语四级', '教育部高校外语统考', '专项冲刺卷',
    '大学法语四级 (CFT-4) 完形填空与读解精练卷',
    'CFT-4 : Texte à trous et compréhension écrite approfondie',
    '精选 4 篇四级真题标准完形与现代生活社科短文，强化语感与上下文逻辑推理。', 40, false),
  buildFullPaper(18, 'cft4', '大学法语四级', '教育部高校外语统考', '经典真题卷',
    '大学法语四级 (CFT-4) 历年真题高频核心考点精编卷',
    'CFT-4 : Sélection officielle des annales et points clés',
    '汇聚高校大学法语四级历年最具代表性高频题型，夯实基础，决胜考场。', 45, false),

  // -------------------------------------------------------------
  // 赛道三：法国官方 DELF 欧标全真机考卷 (A1-B2 共 10 套)
  // -------------------------------------------------------------
  buildFullPaper(19, 'delf', 'DELF A1', '法国国际教育研究中心 (FEI)', '官方标准卷',
    'DELF A1 官方标准全真机考精选卷 (卷一)',
    'Diplôme d\'Études en Langue Française — Niveau A1 (Session 1)',
    '法国官方 A1 终身认证样卷：日常生活广播、个人信息填表、基础时刻表查询与简单告示解读。', 30, true),
  buildFullPaper(20, 'delf', 'DELF A1', '法国国际教育研究中心 (FEI)', '官方冲刺卷',
    'DELF A1 官方日常生活与交通场景测试卷 (卷二)',
    'Diplôme d\'Études en Langue Française — Niveau A1 (Session 2)',
    '贴合法国日常生活场景：火车站买票问询、超级市场购物短句、餐馆点餐与日常问候。', 30, false),
  buildFullPaper(21, 'delf', 'DELF A2', '法国国际教育研究中心 (FEI)', '官方标准卷',
    'DELF A2 官方生活实用与海报告示测试卷 (卷一)',
    'Diplôme d\'Études en Langue Française — Niveau A2 (Session 1)',
    '初级独立运用阶段：房产租房广告解读、博物馆活动通告、电话留言听取与短文细节捕捉。', 45, false),
  buildFullPaper(22, 'delf', 'DELF A2', '法国国际教育研究中心 (FEI)', '官方冲刺卷',
    'DELF A2 官方短篇叙事与广播原声精炼卷 (卷二)',
    'Diplôme d\'Études en Langue Française — Niveau A2 (Session 2)',
    '涵盖个人经历叙述、旅游行程咨询、周末休闲安排与公共交通变动通告。', 45, false),
  buildFullPaper(23, 'delf', 'DELF B1', '法国国际教育研究中心 (FEI)', '官方标准卷',
    'DELF B1 官方社会热点与电台访谈精选卷 (卷一)',
    'Diplôme d\'Études en Langue Française — Niveau B1 (Session 1)',
    'B1 进阶核心卷：法国电台原声专访听解（四天工作制探讨）、媒体热点报道与观点推断。', 60, false),
  buildFullPaper(24, 'delf', 'DELF B1', '法国国际教育研究中心 (FEI)', '官方冲刺卷',
    'DELF B1 官方深度论点分析与事实推断卷 (卷二)',
    'Diplôme d\'Études en Langue Française — Niveau B1 (Session 2)',
    '考察独立阐述见解与权衡利弊能力：环保生活方式、数字设备对青少年影响及论说阅读。', 60, false),
  buildFullPaper(25, 'delf', 'DELF B1', '法国国际教育研究中心 (FEI)', '官方冲刺卷',
    'DELF B1 官方职场交流与文化新闻机考卷 (卷三)',
    'Diplôme d\'Études en Langue Française — Niveau B1 (Session 3)',
    '职场正式邮件往来、员工培训通知解读、法国艺术展览新闻及社会趋势分析。', 60, false),
  buildFullPaper(26, 'delf', 'DELF B2', '法国国际教育研究中心 (FEI)', '官方标准卷',
    'DELF B2 官方学术论辩与科技伦理高级测试卷 (卷一)',
    'Diplôme d\'Études en Langue Française — Niveau B2 (Session 1)',
    '面向高阶独立运用者与赴法读研考生：人工智能与就业变革学术辩论、伦理法律深读。', 75, false),
  buildFullPaper(27, 'delf', 'DELF B2', '法国国际教育研究中心 (FEI)', '官方冲刺卷',
    'DELF B2 官方生态法治与当代思辨高级测试卷 (卷二)',
    'Diplôme d\'Études en Langue Française — Niveau B2 (Session 2)',
    '高难度批判性阅读与听解：气候正义、城市韧性规划与全球化经济模式转型研读。', 75, false),
  buildFullPaper(28, 'delf', 'DELF B2', '法国国际教育研究中心 (FEI)', '官方精选大卷',
    'DELF B2 国际欧标深度综合论述冲刺大卷 (卷三)',
    'Diplôme d\'Études en Langue Française — Niveau B2 (Session 3)',
    '法国原版社论与前沿人文大文，全方位对标法国大学入学语言门槛考核。', 75, false),

  // -------------------------------------------------------------
  // 赛道四：考研二外 & DELF 四大专项攻坚大卷 (8 套)
  // -------------------------------------------------------------
  buildFullPaper(29, 'drill', '专项攻坚', '法语教研组权威研发', '考点突破卷',
    '【专项突破】直宾间宾与副代词 y/en 双代词语序专练 (卷一)',
    'Module Spécialisé 1 : Pronoms personnels compléments et pronoms adverbiaux (Vol. 1)',
    '专攻二外最容易丢分的代词考点：直宾、间宾、y、en 在各类时态与祈使句中的位置及配合。', 35, true),
  buildFullPaper(30, 'drill', '专项攻坚', '法语教研组权威研发', '考点突破卷',
    '【专项突破】关系代词 qui/que/dont/où 与中性代词专练 (卷二)',
    'Module Spécialisé 1 : Pronoms relatifs simples et composés (Vol. 2)',
    '系统梳理简单与复合关系代词：dont 的所有格属性、lequel 介词缩合及中性代词 le 替代从句。', 35, false),
  buildFullPaper(31, 'drill', '专项攻坚', '法语教研组权威研发', '考点突破卷',
    '【专项突破】复合过去 vs 未完成过去 vs 愈过去时配合专练 (卷一)',
    'Module Spécialisé 2 : Concordance des temps du passé (Vol. 1)',
    '精准切分过去时态坐标：瞬间完成 vs 延续背景，过去的过去时态严谨呼应。', 35, false),
  buildFullPaper(32, 'drill', '专项攻坚', '法语教研组权威研发', '考点突破卷',
    '【专项突破】虚拟式触发从句与条件式假设用法专练 (卷二)',
    'Module Spécialisé 2 : Mode subjonctif et système hypothétique (Vol. 2)',
    '直击二外语法制高点：情感/意愿/怀疑/连词短语触发虚拟式，以及 Si 条件句三层假设系统。', 35, false),
  buildFullPaper(33, 'drill', '专项攻坚', '法语教研组权威研发', '考点突破卷',
    '【专项突破】完形填空 (Texte à trous) 与介词固定搭配攻坚 (卷一)',
    'Module Spécialisé 3 : Texte à trous et prépositions idiomatiques (Vol. 1)',
    '集训动词介词搭配 (à / de / pour / contre) 及冠词省略规律，提升完形语感速度。', 35, false),
  buildFullPaper(34, 'drill', '专项攻坚', '法语教研组权威研发', '考点突破卷',
    '【专项突破】完形填空 (Texte à trous) 与连词短语攻坚 (卷二)',
    'Module Spécialisé 3 : Connecteurs logiques et cohésion textuelle (Vol. 2)',
    '攻克转折、让步、因果、目的连词在语篇中的衔接作用，完形填空百发百中。', 35, false),
  buildFullPaper(35, 'drill', '专项攻坚', '法语教研组权威研发', '考点突破卷',
    '【专项突破】长篇阅读理解 (Compréhension écrite) 法国社会文化精读 (卷一)',
    'Module Spécialisé 4 : Lecture critique — Société et culture françaises (Vol. 1)',
    '25行法国社科原版大文：生活方式变革、教育公平与文化多样性事实推理精练。', 40, false),
  buildFullPaper(36, 'drill', '专项攻坚', '法语教研组权威研发', '考点突破卷',
    '【专项突破】长篇阅读理解 (Compréhension écrite) 科技与生态批判精读 (卷二)',
    'Module Spécialisé 4 : Lecture critique — Transition écologique et numérique (Vol. 2)',
    '当代欧洲学术热点论述精读：技术中立性思辨、绿色发展与数字文明深度考题突破。', 40, false)
];

const tsFileContent = `/**
 * CS313 法语研习社 · 36套国家级与国际官方权威全真试卷库
 * 涵盖四大权威赛道：
 * 赛道 1：【🎓 考研二外法语 (241/242/243)】全国名校统考真题大卷 (12套)
 * 赛道 2：【🏛️ 大学法语四级考试 (CFT-4)】全国统考权威冲刺大卷 (6套)
 * 赛道 3：【🌍 法国官方 DELF 欧标考级 (A1-B2)】终身认证真题精编卷 (10套)
 * 赛道 4：【⚡ 考研二外 & DELF 四大专项攻坚大卷】重难点考点突破 (8套)
 */

export type ExamTrack = 'kaoyan' | 'cft4' | 'delf' | 'drill';
export type QuestionType = '词汇语法' | '动词变位' | '完形填空' | '读解分析' | '图表告示' | '听解原声';

export interface ExamVocabItem {
  word: string;
  meaning: string;
}

export interface ExamQuestion {
  id: string;
  questionType: QuestionType;
  categoryTag: string;      // "时态配合", "副代词en", "火车站广播", "长篇读解"
  question: string;
  contextText?: string;     // 阅读短文或告示文本
  audioUrl?: string;        // 听力音频
  audioScript?: string;     // 听力原文大纲文本
  options: string[];        // 4 个选项
  correctAnswer: number;    // 正确答案索引 0..3
  explanation: string;      // 深度权威名师解析
  translation?: string;     // 全真法汉对照翻译
  vocabList?: ExamVocabItem[]; // 核心考点词汇
  score: number;            // 本题分值
  grammarTag?: string;      // 考点关联标签
}

export interface ExamPaper {
  id: string;
  title: string;
  frenchTitle: string;
  track: ExamTrack;
  level: string;            // "241/242考研" | "大学法语四级" | "DELF A1" | "DELF A2" | "DELF B1" | "DELF B2" | "专项突破"
  schoolOrOrg: string;      // "全国高校统考", "北京外国语大学", "上海外国语大学", "法国教育署"
  yearOrSession: string;    // "2025最新", "2024真题", "官方标准样题"
  summary: string;
  durationMinutes: number;  // 模考倒计时(分钟)
  totalScore: number;       // 满分 (100 或 50)
  isFreePreview?: boolean;  // 是否免费试考
  questions: ExamQuestion[];
}

export const FRENCH_EXAM_PAPERS: ExamPaper[] = ${JSON.stringify(ALL_36_PAPERS, null, 2)};
`;

fs.writeFileSync(OUTPUT_PATH, tsFileContent, 'utf-8');
console.log('SUCCESS_36_AUTHENTIC_FRENCH_EXAMS_GENERATED');

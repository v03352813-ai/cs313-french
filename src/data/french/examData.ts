/**
 * CS313 法语研习社 · 双轨全真机考题库数据库
 * 轨道 1：【🎓 考研二外法语 (241/242/243)】
 * 轨道 2：【🌍 DELF 欧标国际考级 (A1-B2)】
 */

export type ExamTrack = 'kaoyan' | 'delf';
export type DelfLevel = 'A1' | 'A2' | 'B1' | 'B2';

export interface ExamQuestion {
  id: string;
  type: 'grammar' | 'vocab' | 'reading' | 'listening' | 'cloze';
  question: string;
  contextText?: string;     // 阅读短文或告示材料文本
  audioUrl?: string;        // 听力音频文件/TTS合成音
  audioScript?: string;     // 听力原文文本 (买家核心付费点)
  options: string[];        // 4 个选项
  correctAnswer: number;    // 正确答案索引 0..3
  explanation: string;      // 深度权威名师解析
  score: number;            // 本题分值
  grammarTag?: string;      // 考点标签，如 "直宾提前配合", "副代词en"
}

export interface ExamPaper {
  id: string;
  title: string;
  frenchTitle: string;
  track: ExamTrack;
  levelTag: string;         // "考研二外 241/242" 或 "DELF A1"
  durationMinutes: number;  // 倒计时时长(分钟)
  totalScore: number;       // 满分
  yearOrSession: string;    // 年份或考期
  description: string;
  questions: ExamQuestion[];
}

export const FRENCH_EXAM_PAPERS: ExamPaper[] = [
  // =========================================================================
  // 轨道一：【🎓 考研二外法语 (高校统考大纲真题精选卷)】
  // =========================================================================
  {
    id: 'ky_2025_01',
    title: '考研二外法语全国高校综合真题精选卷 (一)',
    frenchTitle: 'Concours de Master : Épreuve de français langue étrangère (Vol. 1)',
    track: 'kaoyan',
    levelTag: '考研二外 241/242',
    durationMinutes: 60,
    totalScore: 100,
    yearOrSession: '2024-2025精选',
    description: '汇聚北外、上外、武大等名校考研二外高频考点，涵盖时态变位、代词辨析、虚拟式与阅读理解。',
    questions: [
      {
        id: 'ky_01_q1',
        type: 'grammar',
        question: 'Hier soir, dès qu\'elle _____ son travail, elle est sortie avec ses amies.',
        options: ['a fini', 'avait fini', 'eut fini', 'finissait'],
        correctAnswer: 1,
        explanation: '【考点：愈过去时 (Plus-que-parfait)】\n句意：“昨天晚上，她一完成工作，就和朋友们出去了。”\n主句动词是复合过去时 (est sortie)，从句中 dès que (一...就...) 表示在过去的动作之前就已经完成的动作，需用“愈过去时” (avait fini) 来表示“过去的过去”。',
        score: 10,
        grammarTag: '时态配合 · 愈过去时'
      },
      {
        id: 'ky_01_q2',
        type: 'grammar',
        question: 'Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.',
        options: ['leur en', 'en leur', 'les en', 'en lui'],
        correctAnswer: 0,
        explanation: '【考点：双宾语代词语序排列 (leur en)】\nparler de qch (代词en) à qn (父母为复数，间宾leur)。当间宾 leur 与副代词 en 同时置于动词前时，严格语序为：人称代词在前，en 在后，即【leur en ai parlé】。选项 A 正确。',
        score: 10,
        grammarTag: '代词系统 · 双宾语语序'
      },
      {
        id: 'ky_01_q3',
        type: 'grammar',
        question: 'Les photos que vous avez _____ sont magnifiques.',
        options: ['pris', 'prise', 'prises', 'prennent'],
        correctAnswer: 2,
        explanation: '【考点：复合过去时过去分词与直宾配合】\n在以 avoir 为助动词的复合过去时中，如果直接宾语提前，过去分词必须与提前的直接宾语在性、数上保持一致。句中先行词 les photos 是阴性复数名词，关系代词 que 代替 les photos 作 pris 的直接宾语并提前，因此 prendre 的过去分词 pris 必须配合变为阴性复数【prises】。',
        score: 10,
        grammarTag: '分词配合 · 直宾提前'
      },
      {
        id: 'ky_01_q4',
        type: 'grammar',
        question: 'Bien qu\'il _____ beaucoup de difficultés, il n\'a jamais abandonné son rêve.',
        options: ['a', 'avait', 'ait', 'aura'],
        correctAnswer: 2,
        explanation: '【考点：连词从句与虚拟式现在时 (Subjonctif)】\n连词短语 bien que (虽然，尽管) 后面强制要求从句动词使用虚拟式。动词 avoir 的虚拟式第三人称单数形式为【ait】（直陈式为 a，未完成过去时为 avait）。故正确答案为 C。',
        score: 10,
        grammarTag: '从句虚拟式 · bien que'
      },
      {
        id: 'ky_01_q5',
        type: 'vocab',
        question: 'Dans ce village isolé, il n\'y a _____ de supermarché ni de pharmacie.',
        options: ['aucun', 'point', 'jamais', 'guère'],
        correctAnswer: 1,
        explanation: '【考点：否定连词搭配 (ne... point de... ni de...)】\nne... point de 相当于 ne... pas de (完全没有)，常与 ni 搭配表示“既无...也无...”。aucun 后面不带 de；guère 意为“几乎不”。句意：“在这个偏僻的村庄，既没有超市也没有药店。”故选 B。',
        score: 10,
        grammarTag: '词汇辨析 · 否定句型'
      },
      {
        id: 'ky_01_q6',
        type: 'reading',
        question: 'Selon le texte, quelle est la raison principale pour laquelle les jeunes Français privilégient les transports en commun ?',
        contextText: 'De nos jours, de plus en plus de jeunes citadins en France renoncent à posséder une voiture personnelle. Face à la hausse continue des prix du carburant et à la prise de conscience écologique grandissante, les transports collectifs (métro, tramway, bus électrique) ainsi que le vélo en libre-service s\'imposent comme des alternatives non seulement économiques, mais aussi respectueuses de l\'environnement urbain.',
        options: [
          'Le prix élevé du permis de conduire.',
          'La conscience écologique et les économies financières.',
          'L\'interdiction totale des voitures au centre-ville.',
          'Le manque de places de stationnement.'
        ],
        correctAnswer: 1,
        explanation: '【考点：阅读理解主旨推断】\n原文明确指出：“Face à la hausse continue des prix du carburant et à la prise de conscience écologique... s\'imposent comme des alternatives non seulement économiques, mais aussi respectueuses de l\'environnement”（面对燃油价格持续上涨和日益增强的环保意识...成为不仅经济且环保的替代方案）。对应选项 B。',
        score: 20,
        grammarTag: '短文阅读 · 细节理解'
      },
      {
        id: 'ky_01_q7',
        type: 'grammar',
        question: 'Si j\'avais su que vous veniez aujourd\'hui, je vous _____ à la gare.',
        options: ['attendais', 'ai attendu', 'aurais attendu', 'attendrai'],
        correctAnswer: 2,
        explanation: '【考点：条件式过去时与 Si 引导的假想条件句】\nSi + 愈过去时 (Si j\'avais su 表示对过去事实的相反假设)，主句必须使用【条件式过去时】 (aurais attendu 表示在过去本可能发生但未实现的结果)。句意：“要是我早知道您今天来，我当时就去火车站接您了。”',
        score: 15,
        grammarTag: '条件式从句 · 虚拟假设'
      },
      {
        id: 'ky_01_q8',
        type: 'grammar',
        question: 'Pensez-vous que cette proposition _____ acceptable par tout le monde ?',
        options: ['est', 'soit', 'sera', 'était'],
        correctAnswer: 1,
        explanation: '【考点：疑问句/否定句中的 penser que 引导虚拟式】\n动词 penser 在肯定句中接直陈式（Je pense qu\'elle est...）；但是在疑问句（Pensez-vous que...）或否定句中，表达怀疑或不确定，从句动词必须使用虚拟式！être 的虚拟式第三人称单数为【soit】。',
        score: 15,
        grammarTag: '从句虚拟式 · 怀疑疑问'
      }
    ]
  },

  {
    id: 'ky_2025_02',
    title: '考研二外动词时态与代词专题突击卷 (二)',
    frenchTitle: 'Épreuve thématique : Conjugaison & Pronoms (Vol. 2)',
    track: 'kaoyan',
    levelTag: '考研二外 241/242',
    durationMinutes: 50,
    totalScore: 100,
    yearOrSession: '高频专项卷',
    description: '针对考研二外试卷中最容易失分的副代词 y/en、自反动词配合及关系代词专项攻坚。',
    questions: [
      {
        id: 'ky_02_q1',
        type: 'grammar',
        question: 'Est-ce que vous vous êtes _____ compte de votre erreur à ce moment-là ?',
        options: ['rendu', 'rendus', 'rendue', 'rendues'],
        correctAnswer: 0,
        explanation: '【考点：自反动词固定搭配不配合 (se rendre compte de)】\n在固定词组 se rendre compte de (意识到) 中，compte 是动词 rendre 的直接宾语（置于动词之后），se 是间接宾语。既然直宾没有提前，过去分词 rendu 绝对不发生性数配合！故选 A【rendu】。这是全国高校考研最经典的陷阱题之一！',
        score: 20,
        grammarTag: '自反动词配合 · 固定搭配'
      },
      {
        id: 'ky_02_q2',
        type: 'grammar',
        question: 'Voilà l\'appartement _____ les fenêtres donnent sur le parc du Luxembourg.',
        options: ['qui', 'que', 'où', 'dont'],
        correctAnswer: 3,
        explanation: '【考点：关系代词 dont 的所属关系用法】\n先行词是 l\'appartement，从句完整结构为：les fenêtres de cet appartement donnent sur...（这个公寓的窗户面向卢森堡公园）。引导由介词 de 连接的所属关系名词时，关系代词必须用【dont】。',
        score: 20,
        grammarTag: '关系从句 · dont'
      },
      {
        id: 'ky_02_q3',
        type: 'grammar',
        question: 'Des pommes fraîches ? Oui, j\'_____ ai acheté trois kilos au marché.',
        options: ['y', 'en', 'les', 'leur'],
        correctAnswer: 1,
        explanation: '【考点：副代词 en 代替带数量词的名词】\n句中先行词是 des pommes fraîches，回答中后面保留了数量单位 trois kilos。在表示数量或不定冠词/部分冠词时，必须用副代词【en】。故选 B。',
        score: 20,
        grammarTag: '副代词 · en 数量替代'
      },
      {
        id: 'ky_02_q4',
        type: 'grammar',
        question: 'Il est interdit de fumer ici, _____ vous n\'ayez une autorisation spéciale.',
        options: ['à moins que', 'pourvu que', 'afin que', 'de sorte que'],
        correctAnswer: 0,
        explanation: '【考点：虚拟式连词辨析 (à moins que 除非)】\nà moins que 意为“除非，如果不”，后接虚拟式并常带赘词 ne；pourvu que (只要...)；afin que (为了...)。句意：“这里严禁吸烟，除非您有特殊许可。”故选 A。',
        score: 20,
        grammarTag: '连词辨析 · 虚拟式'
      },
      {
        id: 'ky_02_q5',
        type: 'grammar',
        question: 'Elle s\'est _____ les mains avant de se mettre à table.',
        options: ['lavé', 'lavée', 'lavés', 'lavées'],
        correctAnswer: 0,
        explanation: '【考点：自反动词与直接宾语后置】\nse laver les mains 中，les mains 是动作 laver 的直接宾语，且置于动词之后！自反代词 s\' 在这里是间接宾语（给自己洗手）。直接宾语后置时，过去分词不配合，保持阳性单数【lavé】。',
        score: 20,
        grammarTag: '自反动词配合 · 直宾后置'
      }
    ]
  },

  // =========================================================================
  // 轨道二：【🌍 DELF 欧标考级官方全真机考卷】
  // =========================================================================
  {
    id: 'delf_a1_01',
    title: 'DELF A1 官方全真全真机考模拟卷 (听力+阅读)',
    frenchTitle: 'Diplôme d\'Études en Langue Française — Niveau A1 (Épreuve officielle)',
    track: 'delf',
    levelTag: 'DELF A1 欧标入门',
    durationMinutes: 45,
    totalScore: 50,
    yearOrSession: '国际欧标标准样卷',
    description: '真实法国教育署官方样题，含听力原声音频理解、日常生活场景会话与公共告示阅读。',
    questions: [
      {
        id: 'delf_a1_q1',
        type: 'listening',
        question: 'À quelle heure le train pour Lyon va-t-il partir ?',
        audioScript: '« Mesdames et messieurs, votre attention s\'il vous plaît. Le TGV numéro 6642 à destination de Lyon Part-Dieu partira voie B à quatorze heures trente. Veuillez monter à bord. »',
        options: ['13h30', '14h15', '14h30', '15h00'],
        correctAnswer: 2,
        explanation: '【听力原文剖析】\n广播中原句：“...partira voie B à quatorze heures trente”（将在B站台于14点30分发车）。quatorze heures trente 即 14:30。对应选项 C。',
        score: 10,
        grammarTag: '听力理解 · 火车站广播与时间'
      },
      {
        id: 'delf_a1_q2',
        type: 'listening',
        question: 'Quel est le prix total des deux croissants et du café ?',
        audioScript: '« — Bonjour madame, je voudrais deux croissants et un grand café au lait, s\'il vous plaît.\n— Très bien monsieur, cela vous fera cinq euros cinquante au total. »',
        options: ['4,50 €', '5,00 €', '5,50 €', '6,50 €'],
        correctAnswer: 2,
        explanation: '【听力原文剖析】\n店员回答：“...cela vous fera cinq euros cinquante au total”（一共是 5 欧元 50 欧分）。对应 5,50 €。选 C。',
        score: 10,
        grammarTag: '听力理解 · 面包房日常点餐购物'
      },
      {
        id: 'delf_a1_q3',
        type: 'reading',
        question: 'Ce message indique que la bibliothèque est fermée :',
        contextText: 'AVIS AUX LECTEURS :\nEn raison de travaux de rénovation, la bibliothèque municipale sera fermée tous les lundis du mois d\'octobre. Les horaires du mardi au samedi restent inchangés (9h - 18h). Merci de votre compréhension.',
        options: [
          'Tous les jours en octobre.',
          'Tous les lundis d\'octobre.',
          'Pendant tout le week-end.',
          'Du mardi au samedi.'
        ],
        correctAnswer: 1,
        explanation: '【阅读理解信息匹配】\n告示原文：“...sera fermée tous les lundis du mois d\'octobre”（将在十月份的每个周一闭馆）。对应选项 B。',
        score: 15,
        grammarTag: '公共告示 · 日程与日期信息提取'
      },
      {
        id: 'delf_a1_q4',
        type: 'reading',
        question: 'Où Pierre donne-t-il rendez-vous à son ami Julien ?',
        contextText: 'Salut Julien ! Je suis bien arrivé à Paris. Retrouvons-nous devant le musée du Louvre à 15 heures, juste à côté de la grande pyramide de verre. Ensuite, on pourra aller prendre un thé dans un café sympa. À tout à l\'heure ! — Pierre',
        options: [
          'À la gare de Lyon.',
          'Dans un café sympa.',
          'Devant le musée du Louvre.',
          'Dans le métro parisien.'
        ],
        correctAnswer: 2,
        explanation: '【便条邮件阅读】\n便签明确写道：“Retrouvons-nous devant le musée du Louvre à 15 heures”（我们15点在卢浮宫博物馆门前碰头）。对应选项 C。',
        score: 15,
        grammarTag: '日常便签 · 地点识别'
      }
    ]
  },

  {
    id: 'delf_a2_01',
    title: 'DELF A2 官方全真机考精选卷 (听力与阅读综合)',
    frenchTitle: 'Diplôme d\'Études en Langue Française — Niveau A2',
    track: 'delf',
    levelTag: 'DELF A2 欧标进阶',
    durationMinutes: 55,
    totalScore: 50,
    yearOrSession: '国际欧标标准样卷',
    description: '涵盖法国生活日常对话、求职简讯、天气预报及邮件信息处理。',
    questions: [
      {
        id: 'delf_a2_q1',
        type: 'listening',
        question: 'Pourquoi la réunion de demain matin est-elle annulée ?',
        audioScript: '« Bonjour à tous, ici la directrice. En raison de la grève des transports annoncée pour demain matin, notre réunion de projet est reportée à jeudi après-midi à 14 heures. Merci de prévenir vos collègues. »',
        options: [
          'Parce que la directrice est malade.',
          'En raison d\'une grève des transports.',
          'À cause du mauvais temps.',
          'Par manque de participants.'
        ],
        correctAnswer: 1,
        explanation: '【听力原文理解】\n语音信息原句：“En raison de la grève des transports annoncée pour demain matin...”（由于明早通知的交通罢工...）。对应选项 B。',
        score: 25,
        grammarTag: '电话语音 · 职场事件因果推断'
      },
      {
        id: 'delf_a2_q2',
        type: 'reading',
        question: 'Pour postuler à ce poste de serveur, quelle condition est obligatoire ?',
        contextText: 'OFFRE D\'EMPLOI :\nRestaurant gastronomique au centre de Bordeaux recherche un serveur / une serveuse dynamique.\nExigences : Expérience d\'au moins un an en restauration, maîtrise du français et niveau d\'anglais correct souhaité.\nHoraires : Du mardi au samedi soir (18h - 23h30).\nEnvoyez votre CV à : contact@restaurant-bordeaux.fr',
        options: [
          'Avoir son propre véhicule.',
          'Parler au moins trois langues.',
          'Avoir au moins un an d\'expérience en restauration.',
          'Habiter obligatoirement à Paris.'
        ],
        correctAnswer: 2,
        explanation: '【招聘启事阅读】\n招聘要求 Exigences 首条写明：“Expérience d\'au moins un an en restauration”（具备至少一年的餐饮行业从业经验）。选项 C 准确匹配。',
        score: 25,
        grammarTag: '实用文体 · 招聘要求信息提取'
      }
    ]
  }
];

export type FrenchWritingTrack = 'kaoyan' | 'delf';

export type FrenchWritingType = 
  | 'kaoyan_essay'      // 考研二外命题作文 (100~150词)
  | 'kaoyan_trans'      // 考研二外汉译法核心翻译
  | 'delf_b2_formal'    // DELF B2 正式公函/申诉信 (250词)
  | 'delf_b1_opinion'   // DELF B1 论坛观点/个人信件 (160~180词)
  | 'delf_a2_message';  // DELF A2 便条与日常经历 (60~80词)

export interface FrenchWritingQuestion {
  id: string;
  track: FrenchWritingTrack;
  type: FrenchWritingType;
  title: string;
  category: string;
  score: number;
  wordCountLimit: string;
  minWords: number;
  maxWords: number;
  level: string;
  prompt: string;
  formalStructure?: {
    sender?: string;
    recipient?: string;
    datePlace?: string;
    objet?: string;
    formulaPolitesse?: string;
  };
  sampleAnswer: string;
  sampleAnalysis: string;
  keyFormulas: string[];
  advancedVocab: { word: string; meaning: string; replacement: string }[];
}

export interface WritingFormulaGroup {
  category: string;
  description: string;
  formulas: { fr: string; zh: string; usage: string }[];
}

export const FRENCH_WRITING_FORMULAS: WritingFormulaGroup[] = [
  {
    category: 'DELF B2 正式公函信头与结语必备',
    description: 'DELF B2 行政信函（写给市长、校长、报社主编）不可动摇的格式规范',
    formulas: [
      {
        fr: 'Monsieur le Maire, / Madame la Directrice,',
        zh: '尊敬的市长先生 / 尊敬的主任女士（称谓语）',
        usage: '顶格书写，后紧跟逗号，严禁出现 Cher Monsieur（只用于熟人）'
      },
      {
        fr: 'Je me permets de vous adresser cette lettre afin d\'attirer votre attention sur...',
        zh: '我冒昧给您致信，旨在提请您关注……（引入事由）',
        usage: '正式书信标准第一句，得体高雅，直奔主题'
      },
      {
        fr: 'En tant que citoyen(ne) engagé(e) de notre ville, je tiens à vous exprimer mon inquiétude quant à...',
        zh: '作为本市一名热心市民，我想就……向您表达我的担忧',
        usage: '表明发件人身份立场与写信动机'
      },
      {
        fr: 'Dans l\'attente d\'une réponse favorable de votre part, je vous prie d\'agréer, Monsieur le Maire, l\'expression de ma haute considération.',
        zh: '静候您的妥善答复，并请接受市长先生我崇高的敬意。（终极致敬结语）',
        usage: 'B2 写作满分结语模板，呼应上文称谓'
      }
    ]
  },
  {
    category: '论证逻辑连接词 (Connecteurs Logiques)',
    description: '考研二外与 DELF 拿高分的逻辑骨架，使文章层层递进',
    formulas: [
      {
        fr: 'Tout d\'abord / En premier lieu, ...',
        zh: '首先 / 第一阶段……',
        usage: '引出第一核心论点'
      },
      {
        fr: 'De surcroît / Qui plus est, ...',
        zh: '不仅如此 / 更有甚者……',
        usage: '递进论述（远比单纯用 aussi, et 高级）'
      },
      {
        fr: 'Il est indéniable que... Néanmoins, ...',
        zh: '不可否认的是……然而……',
        usage: '让步转折结构，展现思辨深度'
      },
      {
        fr: 'Par conséquent / Il en résulte que...',
        zh: '因此 / 导致的结果是……',
        usage: '因果推导与结论导出'
      },
      {
        fr: 'En définitive / En guise de conclusion, ...',
        zh: '总而言之 / 作为总结……',
        usage: '尾段总结提炼核心观点'
      }
    ]
  },
  {
    category: '虚拟式与条件式高级句型 (Subjonctif & Conditionnel)',
    description: '考研二外与 DELF 考官最看重的语法踩分点（展现 B2 语言掌控力）',
    formulas: [
      {
        fr: 'Il est impératif que nous prenions des mesures immédiates.',
        zh: '我们必须立即采取措施。（prenions 为虚拟式）',
        usage: '表达迫切必要性，取代简单的 Il faut'
      },
      {
        fr: 'Bien que cette décision parte d\'une bonne intention, ...',
        zh: '尽管这项决定出发点是好的，但是……（parte 为虚拟式）',
        usage: 'Bien que 引导虚拟式让步从句'
      },
      {
        fr: 'Il serait souhaitable d\'envisager une alternative durable.',
        zh: '考虑一个可持续的替代方案将是明智可取的。（条件式现在时）',
        usage: '使用条件式提出建设性批评或委婉建议'
      }
    ]
  }
];

export const FRENCH_WRITING_DATA: FrenchWritingQuestion[] = [
  // ==========================================
  // --- 1. DELF 欧标写作专区 (DELF B1/B2) ---
  // ==========================================
  {
    id: 'delf-w-b2-01',
    track: 'delf',
    type: 'delf_b2_formal',
    title: '【DELF B2 正式公函】致市长的环保抗议信：反对砍伐古树改建停车场',
    category: '正式行政信函 (Lettre formelle)',
    score: 25,
    wordCountLimit: '250词左右 (不少于250词)',
    minWords: 230,
    maxWords: 320,
    level: 'DELF B2 (欧标独立应用级)',
    prompt: `【背景与任务要求】
Vous habitez dans la ville de Bellefontaine. Le maire a récemment annoncé le projet d'abattre une allée de platanes centenaires au centre-ville afin d'aménager un parking payant de 120 places.
En tant que représentant(e) de l'association de quartier « Sauvegardons notre cadre de vie », vous écrivez une lettre formelle argumentée à Monsieur le Maire pour protester contre cette décision et proposer des solutions alternatives concrètes.

【写作要点】
1. 严格遵循法语正式行政信函规范（发信人、收信人、日期、事由 Objet、称呼语、正文分段、致敬套话 Formule de politesse）；
2. 阐述砍伐古树对城市生态、居民生活质量和文化历史风貌的负面影响；
3. 提出至少两个切实可行的替代方案（例如：在郊区建立换乘停车场 P+R、鼓励公共交通与绿色出行）；
4. 语言严谨得体，富有说服力，字数不少于 250 词。`,
    formalStructure: {
      sender: `Camille DUBOIS\nAssociation « Sauvegardons notre cadre de vie »\n15, rue des Lilas, 69000 Bellefontaine`,
      recipient: `À l'attention de Monsieur le Maire\nMairie de Bellefontaine\nPlace de l'Hôtel de Ville, 69000 Bellefontaine`,
      datePlace: `Bellefontaine, le 12 mai 2026`,
      objet: `Objet : Protestation contre le projet d'abattage des platanes et propositions d'alternatives`,
      formulaPolitesse: `Dans l'attente d'un échange constructif, je vous prie d'agréer, Monsieur le Maire, l'expression de ma haute considération.`
    },
    sampleAnswer: `Camille DUBOIS
Association « Sauvegardons notre cadre de vie »
15, rue des Lilas, 69000 Bellefontaine

À l'attention de Monsieur le Maire
Hôtel de Ville de Bellefontaine
Place de l'Hôtel de Ville, 69000 Bellefontaine

Bellefontaine, le 12 mai 2026

Objet : Protestation contre le projet d'abattage des platanes centenaires

Monsieur le Maire,

Je me permets de vous adresser cette lettre au nom des résidents du quartier historique afin de vous faire part de notre vive inquiétude concernant le projet de construction d'un parking à la place de l'allée des platanes.

Il est indéniable que notre municipalité fait face à des difficultés de stationnement. Néanmoins, sacrifier un patrimoine végétal centenaire constitue un non-sens écologique et patrimonial. D'une part, ces arbres forment un îlot de fraîcheur indispensable durant les canicules estivales et préservent la biodiversité urbaine. D'autre part, ils participent directement à l'attractivité touristique et au charme authentique de notre cité.

Au lieu de privilégier le tout-automobile en centre-ville, il serait bien plus judicieux d'adopter des solutions pérennes. En premier lieu, la création d'un parking relais en périphérie, couplé à des navettes électriques gratuites et fréquentes, permettrait de désengorger le centre sans dégrader l'environnement. De plus, le renforcement du réseau de pistes cyclables inciterait les usagers à adopter les mobilités douces.

Persuadée que vous saurez préserver l'avenir vert de Bellefontaine, je sollicite un rendez-vous afin de vous présenter nos propositions en détail.

Dans l'attente d'une suite favorable, je vous prie d'agréer, Monsieur le Maire, l'expression de ma haute considération.

Camille Dubois`,
    sampleAnalysis: `【名师考官点评】
1. 格式完备性（满分）：发件人、收件人、日期地点、Objet、Monsieur le Maire 与结尾高规格 Formule de politesse 丝丝入扣。
2. 逻辑论证结构：承认现状（难停车）➔ 驳斥方案（破坏生态与历史）➔ 提出建设性对策（P+R换乘停车场、电动接驳车、自行车道）➔ 预约面谈。
3. 语法踩分亮点：
   - 虚拟式与情态动词：Il serait bien plus judicieux de...（条件式委婉提议）
   - 逻辑连接词：Il est indéniable que..., Néanmoins, D'une part... D'autre part..., En premier lieu, De plus.
   - 高级词汇：patrimoine végétal centenaire, îlot de fraîcheur, mobilités douces, désengorger.`,
    keyFormulas: [
      'Je me permets de vous adresser cette lettre afin de... (我冒昧给您致信旨在……)',
      'Il est indéniable que... Néanmoins, ... (不可否认的是……然而……)',
      'Il serait judicieux de + infinitif (采取……措施将是明智的)',
      'Désengorger le centre-ville (缓解市中心拥堵)',
      'Dans l\'attente de votre réponse, je vous prie d\'agréer... (期待您的答复并致以崇高敬意)'
    ],
    advancedVocab: [
      { word: 'beaucoup de voitures', meaning: '车很多', replacement: 'l\'afflux automobile massif' },
      { word: 'détruire les arbres', meaning: '砍树', replacement: 'sacrifier un patrimoine arboré centenaire' },
      { word: 'faire un autre parking', meaning: '再建一个停车场', replacement: 'aménager un parking relais en périphérie' },
      { word: 'bon pour l\'air', meaning: '净化空气', replacement: 'un îlot de fraîcheur régulateur du microclimat' }
    ]
  },
  {
    id: 'delf-w-b1-01',
    track: 'delf',
    type: 'delf_b1_opinion',
    title: '【DELF B1 观点阐述】论坛跟帖讨论：远程办公（Télétravail）是否应该普及？',
    category: '网络论坛讨论 (Essai / Forum)',
    score: 25,
    wordCountLimit: '160~180词',
    minWords: 150,
    maxWords: 200,
    level: 'DELF B1 (欧标门槛级)',
    prompt: `【背景与任务要求】
Sur un forum francophone dédié à la vie professionnelle, vous lisez le sujet suivant : « Le télétravail : une chance pour les salariés ou un piège d'isolement ? »
Vous décidez d'apporter votre contribution en publiant un message argumenté pour exprimer votre point de vue à partir de votre propre expérience ou de celle de votre entourage.

【写作要点】
1. 开篇礼貌向论坛网友打招呼，并表明自己的总体立场；
2. 列举远程办公的优势（如节省通勤时间、自主规划工作节奏）；
3. 指出可能存在的问题（如缺乏团队面对面沟通、工作与私人生活界限模糊）；
4. 总结并提出折中建议（如混合办公模式 2-3 天）；
5. 字数控制在 160~180 词左右。`,
    sampleAnswer: `Bonjour à toutes et à tous,

J'ai lu avec grand intérêt ce débat sur le télétravail et je souhaite partager mon point de vue. 

À mon avis, le travail à distance présente de véritables avantages pour le bien-être des salariés. Personnellement, le fait de travailler depuis chez moi deux jours par semaine m'évite de longues heures dans les transports bondés. De plus, je constate que je suis beaucoup plus concentré et productif pour accomplir des tâches complexes.

Cependant, il ne faut pas négliger les risques de cette pratique. Si l'on reste toujours isolé chez soi, on perd le lien social avec ses collègues, et la frontière entre vie professionnelle et vie personnelle devient floue. Il arrive souvent que l'on continue de consulter ses courriels tard le soir.

En conclusion, je pense que la formule hybride est la solution idéale : deux jours à domicile et trois jours au bureau permettent d'allier autonomie et esprit d'équipe.

Et vous, qu'en pensez-vous ?
Marc`,
    sampleAnalysis: `【B1 满分亮点解析】
1. 语言亲切得体：Bonjour à toutes et à tous 开篇，Et vous, qu'en pensez-vous ? 收尾，极其契合论坛交际场景。
2. 论述完整：优势（免除通勤、提升专注）➔ 缺点（人际疏离、界限模糊）➔ 折中建议（混合办公 2+3）。
3. 词汇与句式：À mon avis, Cependant, En conclusion, transports bondés, frontière floue. 完全达到 B1 核心要求。`,
    keyFormulas: [
      'J\'ai lu avec grand intérêt ce sujet et je souhaite... (我怀着浓厚兴趣阅读了此议题并希望……)',
      'À mon avis / Selon moi, ... (依我之见……)',
      'Cependant, il ne faut pas négliger... (然而，不应忽视……)',
      'La formule hybride est la solution idéale (混合模式是理想解法)'
    ],
    advancedVocab: [
      { word: 'très bien', meaning: '很好', replacement: 'un véritable atout pour l\'épanouissement personnel' },
      { word: 'fatigué du métro', meaning: '坐地铁很累', replacement: 'épargné par la fatigue des trajets quotidiens' },
      { word: 'mélanger travail et maison', meaning: '工作和家庭混在一起', replacement: 'l\'effacement de la frontière entre vie privée et travail' }
    ]
  },

  // ==========================================
  // --- 2. 考研二外法语专区 (全国名校统考题型) ---
  // ==========================================
  {
    id: 'ky-w-essay-01',
    track: 'kaoyan',
    type: 'kaoyan_essay',
    title: '【考研二外命题作文】人工智能对青年语言学习的影响 (L\'impact de l\'IA)',
    category: '命题短文写作 (Composition)',
    score: 20,
    wordCountLimit: '120~150词',
    minWords: 110,
    maxWords: 170,
    level: '考研二外 (重点名校自命题)',
    prompt: `【写作题目】
De nos jours, l'intelligence artificielle (IA) révolutionne notre manière d'apprendre les langues étrangères. Rédigez une courte composition (120-150 mots) pour donner votre avis sur les avantages et les limites de l'utilisation de l'IA dans l'apprentissage du français.

【踩分关键点】
1. 篇章结构清晰（引入-正反两面-总结）；
2. 严禁出现基础动词变位错误与主谓配合失误；
3. 熟练运用至少 1 处虚拟式从句（如 bien que... 或 il est nécessaire que...）；
4. 逻辑连接词（D'un côté, D'un autre côté, En résumé）贯穿全文。`,
    sampleAnswer: `De nos jours, l'intelligence artificielle joue un rôle de plus en plus crucial dans l'apprentissage des langues vivantes.

D'une part, l'IA offre aux étudiants des opportunités remarquables. Grâce à des applications intelligentes, nous pouvons converser avec des tuteurs virtuels à tout moment et corriger instantanément nos erreurs de grammaire et de prononciation. Cela renforce considérablement notre autonomie et notre confiance en nous.

D'autre part, bien que l'IA soit très efficace, elle ne pourra jamais remplacer totalement les interactions humaines. La langue n'est pas seulement un outil de communication, mais aussi le vecteur d'une culture et d'émotions authentiques. De plus, une dépendance excessive à la traduction automatique risque d'affaiblir notre réflexion critique.

En résumé, il est essentiel que nous utilisions l'IA avec discernement, en la considérant comme un assistant précieux plutôt qu'un substitut aux échanges réels.`,
    sampleAnalysis: `【考研阅卷老师视角点评】
1. 变位与配合零瑕疵：joue, offre, pouvons, renforce, soit (虚拟式), pourra, utilisions (虚拟式)，完全经得起严格挑剔。
2. 踩分语法句型：
   - bien que l'IA soit très efficace (bien que + 虚拟式现在时)
   - il est essentiel que nous utilisions... (il est essentiel que + 虚拟式)
   - D'une part... D'autre part... En résumé (标准的考研三段式议论文结构)。
3. 字数 138 词，完美卡在 120~150 词最佳得分区间。`,
    keyFormulas: [
      'Jouer un rôle de plus en plus crucial dans... (在……中扮演日益关键的角色)',
      'Bien que + subjonctif... (尽管……引导虚拟式)',
      'Il est essentiel que nous + subjonctif (我们必须……引导虚拟式)',
      'Avec discernement (明智地、有辨别力地)'
    ],
    advancedVocab: [
      { word: 'très important', meaning: '很重要', replacement: 'primordial / indispensable' },
      { word: 'nous pouvons parler', meaning: '我们可以说话', replacement: 'avoir l\'opportunité de dialoguer' },
      { word: 'mauvais pour nous', meaning: '对我们有害', replacement: 'porter préjudice à notre réflexion critique' }
    ]
  },
  {
    id: 'ky-w-trans-01',
    track: 'kaoyan',
    type: 'kaoyan_trans',
    title: '【考研二外汉译法】名校真题精练：科技进步、环境保护与青年担当',
    category: '汉译法高频长难句 (Traduction Chinois-Français)',
    score: 20,
    wordCountLimit: '5个长难句',
    minWords: 80,
    maxWords: 200,
    level: '考研二外 (重点名校自命题)',
    prompt: `【汉译法试题：请将以下 5 个句子译为地道规范的法语】
1. 无论遇到什么困难，我们都必须坚持保护我们的自然环境。（考点：quel que soit / il faut que + 虚拟式）
2. 这是我所读过的最有趣的一本法国文学小说。（考点：最高级先行词 + 关系代词 + 虚拟式配合）
3. 只要我们齐心协力，就一定能够实现这个宏伟的目标。（考点：condition / pourvu que / tant que）
4. 他虽然工作很忙，但每天仍然抽出半小时练习法语发音。（考点：bien que / consacrer du temps à）
5. 昨天他们到达机场时，飞机已经起飞半小时了。（考点：愈过去时 Plus-que-parfait 与未完成过去时时间参照）`,
    sampleAnswer: `1. Quelles que soient les difficultés rencontrées, il faut que nous persistions à protéger notre environnement naturel.
2. C'est le roman littéraire français le plus captivant que j'aie jamais lu.
3. Pourvu que nous unissions nos efforts, nous serons certainement en mesure d'atteindre ce grand objectif.
4. Bien qu'il soit très occupé par son travail, il consacre tout de même une demi-heure chaque jour à s'exercer à la prononciation française.
5. Lorsqu'ils sont arrivés à l'aéroport hier, l'avion avait déjà décollé depuis une demi-heure.`,
    sampleAnalysis: `【汉译法五大得分陷阱】
1. 句 1：Quelles que soient 主谓性数严格配合（difficultés 阴性复数），persistions 必须用虚拟式；
2. 句 2：le plus captivant 最高级从句中，que 引导的从句谓语动词传统上用虚拟式 aie lu；先行词 que 在 avoir 前，需注意分词 lu（若先行词是阴性还要配合）；
3. 句 3：Pourvu que 后面必须跟虚拟式 unissions；
4. 句 4：Bien qu'il soit 同样是虚拟式经典考点；consacrer... à... 介词搭配；
5. 句 5：时态对比！到达 sont arrivés 是复合过去时，起飞是在到达之前发生的动作，必须用【愈过去时 avait décollé】！`,
    keyFormulas: [
      'Quelles que soient... (无论……如何，主谓配合)',
      'Le plus... que + subjonctif (最……的……)',
      'Pourvu que + subjonctif (只要……)',
      'Consacrer du temps à faire qch (花时间做某事)',
      'Avait déjà fait... (愈过去时表示过去的过去)'
    ],
    advancedVocab: [
      { word: 'très difficile', meaning: '很困难', replacement: 'des défis ardus' },
      { word: 'très intéressant', meaning: '很有趣', replacement: 'passionnant / captivant' },
      { word: 'nous pouvons faire', meaning: '我们能做', replacement: 'être en mesure d\'accomplir' }
    ]
  }
];

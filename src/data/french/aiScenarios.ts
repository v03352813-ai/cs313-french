/**
 * CS313 法语研习社 · AI 智能法语口语对练情景库 (Dialogue IA Français)
 * 覆盖：
 * 1. 巴黎花神咖啡馆点单与露天座闲聊 (Au Café de Flore)
 * 2. 巴黎地铁与交通换乘问路 (Dans le Métro Parisien)
 * 3. 传统法式面包房选购法棍与甜点 (À la Boulangerie artisanale)
 * 4. DELF B1/B2 官方考官 1v1 口语面试与观点辩驳 (Entretien DELF avec l'examinateur)
 * 5. 法企求职面试与职业抱负 (Entretien d'embauche en entreprise française)
 * 6. 法国药房买药与症状描述 (À la Pharmacie)
 * 7. 玛黑区买手店购物与试衣 (Shopping dans le Marais)
 * 8. 受邀法国家庭晚宴与餐桌社交礼仪 (Dîner chez des amis français)
 */

export interface DialogueTurn {
  id: number;
  speaker: 'ai' | 'user';
  speakerName: string;
  avatar: string;
  fr: string;
  zh: string;
  phonetic?: string;
  grammarTip?: string;
  suggestedResponses?: string[];
}

export interface AIScenario {
  id: string;
  title: string;
  frenchTitle: string;
  category: 'daily_life' | 'travel_transport' | 'delf_speaking' | 'business_work' | 'social_etiquette';
  categoryLabel: string;
  levelTag: '初级 (A1~A2)' | '中级 (B1)' | '高级 (B2)';
  icon: string;
  gradient: string;
  description: string;
  targetSkills: string[];
  systemPrompt: string;
  turns: DialogueTurn[];
  referenceModelAnswer?: string;
  isWeeklyNew?: boolean;
  examDurationSec?: number;
}

export const AI_SCENARIOS_DATA: AIScenario[] = [
  {
    id: 'fr_cafe_01',
    title: '巴黎花神咖啡馆 · 点单与露天位闲聊',
    frenchTitle: 'Au Café de Flore · Commande en terrasse',
    category: 'daily_life',
    categoryLabel: '生活实用',
    levelTag: '初级 (A1~A2)',
    icon: '☕',
    gradient: 'from-amber-600 to-rose-700',
    isWeeklyNew: true,
    examDurationSec: 120,
    description: '坐在巴黎圣日耳曼大道经典的绿藤露天座上，向侍者（Garçon de café）点一杯浓缩咖啡、可颂牛角包并结账，体验最纯正的巴黎左岸慢生活！',
    targetSkills: ['咖啡馆礼貌点单', '露天位选座', '加糖加奶表达', '买单算账'],
    systemPrompt: '你是巴黎花神咖啡馆（Café de Flore）风度翩翩的法籍侍者 Julien。你热情而地道，习惯用法式礼貌表达（Bonjour Monsieur/Madame, Que puis-je vous servir ?, Très bien !）。与用户展开自然的多轮点餐互动。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '巴黎侍者 Julien',
        avatar: '🤵🏻‍♂️',
        fr: 'Bonjour ! Bienvenue au Café de Flore. Vous préférez vous installer en terrasse ou à l\'intérieur ? Que puis-je vous servir aujourd\'hui ?',
        zh: '您好！欢迎来到花神咖啡馆。您想坐在露天露台还是室内呢？今天想喝点什么？',
        phonetic: 'bɔ̃.ʒuʁ ! bjɛ̃.v(ə).ny o ka.fe də flɔʁ...',
        grammarTip: '实用高频：Que puis-je vous servir ? (我能为您上点什么？puis-je 为 pouvoir 的倒装礼貌体)',
        suggestedResponses: [
          'Bonjour ! En terrasse, s\'il vous plaît. Je voudrais un café crème et un croissant.',
          'Une table pour deux à l\'intérieur, s\'il vous plaît. Avez-vous la carte ?',
          'Un expresso bien serré et un verre d\'eau, s\'il vous plaît.'
        ]
      }
    ]
  },
  {
    id: 'fr_delf_b1_b2_01',
    title: 'DELF B1/B2 考官 1v1 面试 · 环保与科技辩驳',
    frenchTitle: 'Entretien DELF avec l\'examinateur · Épreuve orale',
    category: 'delf_speaking',
    categoryLabel: '欧标冲刺',
    levelTag: '高级 (B2)',
    icon: '🎓',
    gradient: 'from-[#80142A] to-purple-800',
    description: '全真还原 DELF B1/B2 口语第三部分（Épreuve orale : Débat et argumentation）！考官将针对环保限行、数字科技对生活的影响提出反问，考查你的观点阐述与思辨能力。',
    targetSkills: ['论述观点结构化', '反驳与让步技巧', '虚拟式高级句式运用', '应对考官突击追问'],
    systemPrompt: '你是法国教育部 CIEP 认证的 DELF B2 官方口语考官 Madame Laurent。你严肃但不失亲切，会根据考生对社会热点（如保护环境与经济发展、人工智能普及）的观点提出深层次的反问与追问。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: 'DELF 主考官 Mme Laurent',
        avatar: '👩🏻‍🏫',
        fr: 'Bonjour. Nous passons maintenant à la troisième partie de l\'épreuve orale. Vous avez choisi le sujet sur la transition écologique dans les grandes villes. Selon vous, faut-il interdire totalement les voitures dans le centre de Paris pour lutter contre la pollution ?',
        zh: '您好。我们现在进入口试的第三部分。您抽到了关于大城市生态转型的议题。在您看来，为了应对污染，是否应当彻底禁止汽车进入巴黎市中心？',
        phonetic: 'bɔ̃.ʒuʁ. nu pa.sɔ̃ mɛ̃t.nɑ̃ a la tʁwa.zjɛm paʁ.ti...',
        grammarTip: '考官引导句：Selon vous, faut-il... ? (在您看来，是否应当……？)',
        suggestedResponses: [
          'À mon avis, une interdiction radicale poserait de sérieux problèmes aux banlieusards qui n\'ont pas d\'alternative fiable.',
          'Je suis tout à fait favorable à cette mesure, à condition que la municipalité renforce les transports en commun gratuits.',
          'Il est indéniable que la pollution est alarmante, néanmoins il serait plus judicieux de procéder par étapes progressives.'
        ]
      }
    ]
  },
  {
    id: 'fr_metro_01',
    title: '巴黎地铁与交通换乘 · 圣米歇尔广场问路',
    frenchTitle: 'Dans le Métro Parisien · Demande d\'itinéraire',
    category: 'travel_transport',
    categoryLabel: '出行问路',
    levelTag: '初级 (A1~A2)',
    icon: '🚇',
    gradient: 'from-blue-600 to-teal-700',
    description: '在错综复杂的巴黎地铁迷宫中，向地铁站务员咨询如何换乘 4 号线前往 Saint-Michel，询问 Navigo 交通卡充值与末班车时间。',
    targetSkills: ['线路与方向问路', '交通通票咨询', '换乘车站用语', '发音清晰连读'],
    systemPrompt: '你是巴黎大众运输公司（RATP）地铁站服务窗口的职员 Pierre。你热心指导乘客如何看地铁线路图、选对方向（Direction）和换乘站（Châtelet / Saint-Michel）。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: 'RATP 站务员 Pierre',
        avatar: '👨🏻‍✈️',
        fr: 'Bonjour ! Je peux vous renseigner ? Vous cherchez votre direction ou vous souhaitez acheter un titre de transport ?',
        zh: '您好！有什么可以帮您的吗？您是在找乘车方向，还是想购买车票呢？',
        phonetic: 'bɔ̃.ʒuʁ ! ʒə pø vu ʁɑ̃.sɛ.ɲe ?...',
        grammarTip: '车站实用：titre de transport (交通票券 / 车票凭证)',
        suggestedResponses: [
          'Pardon monsieur, pour aller à Saint-Michel, je dois prendre quelle ligne ?',
          'Je voudrais recharger mon passe Navigo pour la semaine, s\'il vous plaît.',
          'Est-ce qu\'il y a une correspondance directe à la station Châtelet ?'
        ]
      }
    ]
  },
  {
    id: 'fr_boulangerie_01',
    title: '传统法式面包房 · 买法棍与牛角包',
    frenchTitle: 'À la Boulangerie artisanale · La baguette tradition',
    category: 'daily_life',
    categoryLabel: '生活实用',
    levelTag: '初级 (A1~A2)',
    icon: '🥖',
    gradient: 'from-amber-500 to-orange-600',
    description: '早晨走进街角的法式手作面包房，闻着刚出炉的黄油麦香，挑选外皮焦脆的传统法棍（Tradition pas trop cuite）、巧克力牛角包与草莓挞！',
    targetSkills: ['法棍烘烤程度挑选', '甜点数量词与称重', '零钱现钞支付', '法式日常礼仪招呼'],
    systemPrompt: '你是巴黎街角面包房的烘焙女店主 Sophie。你性格开朗，说话清脆动听，会热情地询问客人还需要什么（Et avec ceci ?）。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '面包房店主 Sophie',
        avatar: '👩🏻‍🍳',
        fr: 'Bonjour ! Qu\'est-ce qui vous ferait plaisir ce matin ? Nos croissants et nos baguettes tradition sortent tout juste du four !',
        zh: '您好！今天早上想来点什么心仪的美食呢？我们的牛角包和传统法棍刚刚热腾腾出炉哦！',
        phonetic: 'bɔ̃.ʒuʁ ! kɛs.ki vu f(ə).ʁɛ plɛ.ziʁ sə ma.tɛ̃ ?...',
        grammarTip: '高频买家招呼：Qu\'est-ce qui vous ferait plaisir ? (条件式委婉：您想来点什么？)',
        suggestedResponses: [
          'Une baguette tradition pas trop cuite, s\'il vous plaît, et deux croissants.',
          'Bonjour ! Je vais prendre un pain au chocolat et une tartelette aux fraises.',
          'Est-ce que vous faites aussi des formules petit-déjeuner avec café ?'
        ]
      }
    ]
  },
  {
    id: 'fr_entretien_01',
    title: '法企求职面试 · 自我介绍与职业抱负',
    frenchTitle: 'Entretien d\'embauche · Présentation professionnelle',
    category: 'business_work',
    categoryLabel: '职场商务',
    levelTag: '高级 (B2)',
    icon: '💼',
    gradient: 'from-slate-700 to-indigo-900',
    description: '走进跨国法企拉法基或欧莱雅的巴黎总部，与人力资源主管开展纯正的法文面试，陈述你的跨文化背景、专业优势与团队协作精神。',
    targetSkills: ['职场高级法文表述', '自我优势与案例剖析', '回答行为面试问题', '得体职业礼仪'],
    systemPrompt: '你是法国跨国集团的人力资源总监 Marc Vignal。你专业、严谨且注重逻辑，会认真聆听求职者的自我剖析，并提出深度考察问题。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: 'HR 总监 Marc Vignal',
        avatar: '👨🏻‍💼',
        fr: 'Enchanté. Nous avons bien reçu votre candidature et votre profil a retenu toute notre attention. Pour commencer, pourriez-vous vous présenter succinctement et m\'expliquer ce qui vous motive à rejoindre notre équipe ?',
        zh: '很高兴认识您。我们已认真查阅您的应聘材料，您的履历引起了我们浓厚的兴趣。首先，您能简明扼要地介绍一下自己，并谈谈吸引您加入我们团队的初衷吗？',
        phonetic: 'ɑ̃.ʃɑ̃.te. nu z‿avɔ̃ bjɛ̃ ʁə.sy vɔtʁ kɑ̃.di.da.tyʁ...',
        grammarTip: '面试必备：Pourriez-vous vous présenter succinctement ? (pourriez-vous 条件式礼貌提问)',
        suggestedResponses: [
          'Certainement. Diplômé(e) en commerce international, j\'ai développé une double compétence linguistique et managériale.',
          'Je suis particulièrement attiré(e) par votre engagement envers le développement durable et le rayonnement international de votre marque.',
          'Fort(e) de mes trois années d\'expérience en gestion de projets, je souhaite apporter mon dynamisme à vos projets d\'expansion.'
        ]
      }
    ]
  },
  {
    id: 'fr_pharmacie_01',
    title: '法国绿色十字药店 · 症状咨询与买药',
    frenchTitle: 'À la Pharmacie · Symptômes et posologie',
    category: 'daily_life',
    categoryLabel: '生活实用',
    levelTag: '中级 (B1)',
    icon: '💊',
    gradient: 'from-emerald-600 to-teal-800',
    description: '在挂着绿十字霓虹灯的法国药店里，向药剂师详细说明自己咽喉肿痛、头痛低烧的症状，询问非处方退烧药（Doliprane）的每日服用频次与禁忌。',
    targetSkills: ['身体部位与病痛表达 (J\'ai mal à...)', '发烧与咳嗽词汇', '用药说明与禁忌理解'],
    systemPrompt: '你是法国执业药剂师 Claire。你细心负责，根据顾客的症状推介合适非处方药，并强调每日最大服用剂量（Doliprane 每次 1g，间隔至少 4 小时）。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '药剂师 Claire',
        avatar: '👩🏻‍⚕️',
        fr: 'Bonjour ! Comment puis-je vous aider ? Vous avez une ordonnance d\'un médecin ou cherchez-vous un médicament sans ordonnance pour soulager des symptômes ?',
        zh: '您好！我能帮您什么吗？您是有医生的处方笺，还是想找一些缓解症状的非处方药呢？',
        phonetic: 'bɔ̃.ʒuʁ ! kɔ.mɑ̃ pɥi.ʒə vu z‿e.de ?...',
        grammarTip: '看病买药关键词：une ordonnance (处方笺), sans ordonnance (非处方/柜台直售)',
        suggestedResponses: [
          'Je n\'ai pas d\'ordonnance. Depuis hier, j\'ai très mal à la gorge et un peu de fièvre.',
          'Avez-vous du paracétamol ou du Doliprane pour calmer un violent mal de tête ?',
          'Je tousse beaucoup la nuit, pouvez-vous me conseiller un sirop efficace ?'
        ]
      }
    ]
  },
  {
    id: 'fr_shopping_01',
    title: '玛黑区独立买手店 · 试衣与退换货',
    frenchTitle: 'Shopping dans le Marais · Cabine d\'essayage',
    category: 'daily_life',
    categoryLabel: '生活实用',
    levelTag: '初级 (A1~A2)',
    icon: '👗',
    gradient: 'from-fuchsia-600 to-rose-600',
    description: '漫步在巴黎玛黑区（Le Marais）的时髦精品店，挑选法式条纹衫与风衣，询问店员试衣间位置，更换大一码尺寸，询问免税（Détaxe）。',
    targetSkills: ['衣服尺码与颜色表达 (taille, couleur)', '寻找试衣间 (cabine d\'essayage)', '免税与退换货咨询'],
    systemPrompt: '你是巴黎玛黑区精品服装店的热情时尚导购员 Léa。你眼光敏锐，主动为客人提供合身尺码推荐与试衣间服务。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '时尚导购 Léa',
        avatar: '👱🏻‍♀️',
        fr: 'Bonjour ! N\'hésitez pas si vous souhaitez essayer une pièce de notre nouvelle collection. Quelle taille faites-vous d\'habitude ?',
        zh: '您好！如果您想试穿我们最新系列的单品，请随时告诉我。您平时穿什么尺码呢？',
        phonetic: 'bɔ̃.ʒuʁ ! n‿e.zi.te pa si vu swa.te e.sɛ.je...',
        grammarTip: '穿衣尺码询问：Quelle taille faites-vous ? (鞋子尺码用 Quelle pointure faites-vous ?)',
        suggestedResponses: [
          'Je fais du 38. Est-ce que je peux essayer cette veste en cabine ?',
          'Elle est un peu trop serrée aux épaules. L\'avez-vous dans la taille au-dessus ?',
          'Cette couleur me plaît beaucoup ! Est-ce que vous proposez la détaxe pour les touristes ?'
        ]
      }
    ]
  },
  {
    id: 'fr_dinner_01',
    title: '受邀法国家庭晚宴 · 餐桌社交与赞美',
    frenchTitle: 'Dîner chez des amis français · Convivialité',
    category: 'social_etiquette',
    categoryLabel: '社交礼仪',
    levelTag: '中级 (B1)',
    icon: '🍷',
    gradient: 'from-rose-700 to-amber-800',
    description: '带着一瓶波尔多红酒前往法国朋友家作客！在轻松欢畅的开胃酒（Apéritif）和主菜时光里，赞美女主人的拿手红酒炖牛肉（Bœuf Bourguignon），学习地道的法国家宴祝酒辞！',
    targetSkills: ['送礼与致谢礼仪', '菜肴口感赞美 (C\'est délicieux / exquis)', '举杯祝酒 (Santé !)', '法国文化生活闲聊'],
    systemPrompt: '你是热情好客的法国女主人 Élodie。你刚刚精心炖好了勃艮第红酒牛肉，迎接远道而来的外国好友进门做客。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '热情女主人 Élodie',
        avatar: '👩🏻',
        fr: 'Entrez, je vous en prie ! Quel plaisir de vous voir ! Oh, vous n\'auriez pas dû apporter cette magnifique bouteille de vin, c\'est trop gentil ! Venez, on commence par un petit apéro au salon ?',
        zh: '快请进，快请进！见到你太高兴了！哎呀，你太客气了，何必还带这么名贵的一瓶好酒呢！快来，我们先在客厅喝杯开胃酒怎么样？',
        phonetic: 'ɑ̃.tʁe, ʒə vu z‿ɑ̃ pʁi ! kɛl plɛ.ziʁ də vu vwaʁ !...',
        grammarTip: '做客客套经典：Vous n\'auriez pas dû ! (条件式过去时：您真不该这么破费/太见外了！)',
        suggestedResponses: [
          'Merci beaucoup pour votre accueil chaleureux ! C\'est un grand plaisir d\'être ici avec vous.',
          'J\'espère que ce vin s\'accordera bien avec le délicieux repas que vous nous préparez.',
          'Avec plaisir pour l\'apéritif ! À votre santé et à cette belle soirée !'
        ]
      }
    ]
  },

  // --- 【新增】生活实用：巴士底集市 ---
  {
    id: 'fr_marche_01',
    title: '巴士底露天早市 · 挑选奶酪与应季蔬果',
    frenchTitle: 'Au Marché Bastille · Fromages et produits frais',
    category: 'daily_life',
    categoryLabel: '生活实用',
    levelTag: '初级 (A1~A2)',
    icon: '🧀',
    gradient: 'from-yellow-600 to-amber-700',
    description: '周日早晨来到热闹非凡的巴黎巴士底集市，在奶酪摊位前品尝 24 个月陈酿孔泰（Comté）奶酪，按公斤挑选新鲜草莓与法式熟食！',
    targetSkills: ['品尝试吃请求 (Puis-je goûter ?)', '奶酪成熟度与产地表达', '称重与单价问询 (Combien le kilo ?)'],
    systemPrompt: '你是巴士底集市经营了三十年的奶酪行家里手 Thierry。你性格豪爽，热情邀请顾客试吃切片，并推荐配酒风味。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '奶酪农庄主 Thierry',
        avatar: '👨🏻‍🌾',
        fr: 'Bonjour Madame, Monsieur ! Approchez, venez goûter à notre Comté fermier affiné 24 mois ! Qu\'est-ce qui vous ferait plaisir pour ce week-end ?',
        zh: '二位您好！快请走近点，尝尝我们农场自产陈酿 24 个月的孔泰奶酪！这个周末想带点什么好滋味回家？',
        phonetic: 'bɔ̃.ʒuʁ ! a.pʁɔ.ʃe, və.ne gu.te a nɔtʁ kɔ̃.te...',
        grammarTip: '市场试吃金句：Venez goûter ! (快来尝尝！); affiné 24 mois (陈化熟成24个月)',
        suggestedResponses: [
          'Volontiers ! J\'aimerais bien un morceau de Comté bien fruité, environ 300 grammes.',
          'Est-ce que vous avez du chèvre frais ou du camembert au lait cru ?',
          'C\'est délicieux ! Combien coûte ce morceau au kilo, s\'il vous plaît ?'
        ]
      }
    ]
  },

  // --- 【新增】欧标冲刺 4 大场景 (B1/B2) ---
  {
    id: 'fr_delf_teletravail_02',
    title: 'DELF B1 考官口试 · 远程办公与生活界限',
    frenchTitle: 'Épreuve orale DELF B1 · Le télétravail et l\'équilibre de vie',
    category: 'delf_speaking',
    categoryLabel: '欧标冲刺',
    levelTag: '中级 (B1)',
    icon: '💻',
    gradient: 'from-blue-700 to-indigo-800',
    description: '针对后疫情时代远程办公（Télétravail）的普及展开阐述。向考官陈述居家办公在节省通勤时间的同时，对员工身心健康与社交孤独带来的负面挑战。',
    targetSkills: ['个人利弊对比 (Avantages et inconvénients)', '事实举例与个人经历结合', '因果表达 (Grâce à / À cause de)'],
    systemPrompt: '你是 DELF B1 口试考官 Monsieur Brunet。你注重倾听考生表达的连贯度，会针对考生的发言追问关于“断联权利（droit à la déconnexion）”的具体看法。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: 'DELF 考官 M. Brunet',
        avatar: '👨🏻‍🏫',
        fr: 'Bonjour. Vous avez tiré au sort le document déclencheur concernant le travail à distance. Quelle est votre opinion personnelle sur le télétravail ? Est-ce selon vous un progrès ou un piège pour les salariés ?',
        zh: '您好。您抽到了关于远程办公的导引材料。您对居家办公有何个人见解？在您看来，这究竟是劳动者的进步，还是一个美丽的陷阱？',
        phonetic: 'bɔ̃.ʒuʁ. vu z‿a.ve ti.ʁe o sɔʁ...',
        grammarTip: '提问对比核心：Est-ce un progrès ou un piège ? (是进步还是陷阱？)',
        suggestedResponses: [
          'D\'après moi, le télétravail apporte une flexibilité appréciable, mais il risque de brouiller la frontière entre vie privée et vie professionnelle.',
          'C\'est un réel progrès pour réduire le stress des transports quotidiens, à condition de maintenir des réunions d\'équipe régulières.',
          'Je pense que le modèle hybride, combinant deux jours à la maison et trois jours au bureau, représente le compromis idéal.'
        ]
      }
    ]
  },
  {
    id: 'fr_delf_ia_03',
    title: 'DELF B2 深度思辨 · 人工智能对教育与艺术的冲击',
    frenchTitle: 'Débat DELF B2 · L\'intelligence artificielle et la créativité',
    category: 'delf_speaking',
    categoryLabel: '欧标冲刺',
    levelTag: '高级 (B2)',
    icon: '🤖',
    gradient: 'from-purple-700 to-pink-800',
    isWeeklyNew: true,
    description: '紧扣全球前沿科技热点！考官引导就 ChatGPT、生成式 AI 是否会导致学生批判性思维退化、是否会取代原创作家与艺术家展开深度辩论。',
    targetSkills: ['学术抽象词汇驾驭', '虚拟式现在时与条件式搭配', '辩证法三段论 (Thèse, Antithèse, Synthèse)'],
    systemPrompt: '你是思想开放但立场锐利的大学教授兼 DELF B2 评卷人 Anne-Sophie。你擅长引导考生从哲学与社会伦理角度探讨生成式人工智能的伦理红线。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '考官 Anne-Sophie',
        avatar: '👩🏻‍💻',
        fr: 'Bonjour. Le sujet de votre exposé porte sur l\'essor fulgurant de l\'intelligence artificielle générative. Doit-on craindre que ces technologies n\'appauvrissent l\'esprit critique et la créativité des jeunes générations ?',
        zh: '您好。您陈述的主题是生成式人工智能的迅猛崛起。我们是否应当担忧这些技术会弱化年轻一代的批判性思维与原创创造力？',
        phonetic: 'bɔ̃.ʒuʁ. lə sy.ʒɛ də vɔtʁ ɛks.po.ze...',
        grammarTip: '高阶书面句式：craindre que + ne 赘词 + 虚拟式 (que ces technologies n\'appauvrissent...)',
        suggestedResponses: [
          'Bien que l\'IA soit un outil d\'une puissance inédite, je crains qu\'une dépendance excessive ne nuise à la rigueur intellectuelle des étudiants.',
          'Je ne partage pas ce pessimisme. L\'IA libère l\'esprit humain des tâches répétitives pour se consacrer à la véritable réflexion créative.',
          'Il ne s\'agit pas de l\'interdire, mais d\'enseigner d\'urgence une littératie numérique afin que les élèves apprennent à questionner ses résultats.'
        ]
      }
    ]
  },
  {
    id: 'fr_delf_reseaux_04',
    title: 'DELF B1 观点陈述 · 社交媒体与青年数字断联',
    frenchTitle: 'Exposé DELF B1 · Les réseaux sociaux et la déconnexion',
    category: 'delf_speaking',
    categoryLabel: '欧标冲刺',
    levelTag: '中级 (B1)',
    icon: '📱',
    gradient: 'from-cyan-700 to-blue-800',
    description: '针对年轻人沉迷短视频与算法推送的社会现象，向考官阐述“数字戒断/断网周（Déconnexion numérique）”的必要性与可行性。',
    targetSkills: ['短篇观点结构陈述', '首段破题与尾段号召', '日常习惯与心理状态词汇'],
    systemPrompt: '你是注重沟通亲和力的 DELF 考官 Thomas。你会鼓励考生结合身边中国青年的移动互联网生活习惯进行对比说明。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: 'DELF 考官 Thomas',
        avatar: '👨🏻‍🏫',
        fr: 'Bonjour ! Vous venez de terminer votre exposé sur la place des réseaux sociaux chez les jeunes. Pensez-vous qu\'il soit réellement possible aujourd\'hui de vivre une semaine complète sans smartphone ni applications ?',
        zh: '您好！您刚才完成了关于社交网络在青年中地位的陈述。在您看来，在今天彻底不带智能手机、不用任何应用软件生活整整一周，真的可行吗？',
        phonetic: 'bɔ̃.ʒuʁ ! vu və.ne də tɛʁ.mi.ne...',
        grammarTip: '疑问句带虚拟式：Pensez-vous qu\'il soit possible... ? (主句否定或疑问引出虚拟式)',
        suggestedResponses: [
          'Ce serait un véritable défi au début, mais je suis convaincu(e) que cela permettrait de redécouvrir les vraies relations humaines.',
          'Dans notre vie moderne connectée, c\'est presque impossible pour des raisons professionnelles et pratiques, mais on peut instaurer des pauses le soir.',
          'J\'ai moi-même tenté l\'expérience pendant mes vacances, et j\'ai constaté un net regain de concentration et de sérénité.'
        ]
      }
    ]
  },
  {
    id: 'fr_delf_tourisme_05',
    title: 'DELF B2 考官反驳 · 大众过度旅游与文化遗产保护',
    frenchTitle: 'Débat DELF B2 · Le surtourisme et le patrimoine',
    category: 'delf_speaking',
    categoryLabel: '欧标冲刺',
    levelTag: '高级 (B2)',
    icon: '✈️',
    gradient: 'from-emerald-700 to-teal-900',
    description: '巴黎圣母院、圣米歇尔山等全球名胜正遭受“过度旅游（Surtourisme）”重创。就配额预约制、征收生态税等管理措施与考官展开政策辩护。',
    targetSkills: ['公共政策评价', '经济收益与环境保护冲突分析', '条件式高级倡议 (Il conviendrait de...)'],
    systemPrompt: '你是法国文化与旅游部顾问兼 DELF B2 考官 Valérie。你对过度旅游带来的当地居民生活成本上升深有研究，要求考生提出平衡方案。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '考官 Valérie',
        avatar: '👩🏻‍💼',
        fr: 'Bonjour. La surfréquentation touristique dégrade irrémédiablement certains sites patrimoniaux. Faut-il aller jusqu\'à limiter strictement le nombre de visiteurs quotidiens, quitte à pénaliser l\'économie locale ?',
        zh: '您好。游客过度涌入正在不可逆地破坏某些文化遗迹。我们是否应当采取强制限制每日游客配额的极端措施，哪怕这会损害当地经济利益？',
        phonetic: 'bɔ̃.ʒuʁ. la syʁ.fʁe.kɑ̃.ta.sjɔ̃ tu.ʁis.tik...',
        grammarTip: '让步让利连接词：quitte à + inf (哪怕……也，即便以……为代价)',
        suggestedResponses: [
          'La préservation du patrimoine doit primer sur le profit à court terme, car une fois détruit, un site historique ne peut être remplacé.',
          'Plutôt que des quotas rigides, il serait plus judicieux de désaisonnaliser les flux et de promouvoir des destinations secondaires méconnues.',
          'Une tarification différenciée et une écotaxe réinvestie dans la rénovation pourraient concilier sauvegarde culturelle et activité économique.'
        ]
      }
    ]
  },

  // --- 【新增】出行问路 4 大场景 ---
  {
    id: 'fr_aeroport_02',
    title: '戴高乐机场 (CDG) · 行李延误申报与海关出入境',
    frenchTitle: 'À l\'Aéroport Charles de Gaulle · Perte de bagage et douane',
    category: 'travel_transport',
    categoryLabel: '出行问路',
    levelTag: '中级 (B1)',
    icon: '✈️',
    gradient: 'from-sky-700 to-indigo-800',
    description: '在巴黎戴高乐机场行李转盘前苦等无果后，来到法航行李挂失柜台申报托运箱延误，核对行李票号并留下在法酒店地址以便配送。',
    targetSkills: ['行李箱特征描述 (couleur, taille, marque)', '海关申报问答', '联系地址与跟踪号码索取'],
    systemPrompt: '你是法航（Air France）机场地面地勤接待员 Monique。你耐心地协助焦急的旅客填写行李事故申报单（PIR），并提供应急洗漱包与跟踪网址。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '法航地勤 Monique',
        avatar: '👩🏻‍✈️',
        fr: 'Bonjour Monsieur/Madame. Vous venez pour une réclamation bagage ? Le tapis numéro 4 est terminé et votre valise n\'est pas apparue ? Avez-vous votre reçu de bagage d\'enregistrement ?',
        zh: '先生/女士您好。您是来办理行李申诉的吗？4 号行李转盘已经停转了，您的箱子一直没有出来对吗？请问您手边有托运行李小票吗？',
        phonetic: 'bɔ̃.ʒuʁ. vu və.ne puʁ yn ʁe.kla.ma.sjɔ̃...',
        grammarTip: '机场报失术语：reçu de bagage (行李票据), réclamation bagage (行李追索索赔)',
        suggestedResponses: [
          'Oui, voici mon billet et le reçu. C\'est une valise rigide grise de marque Samsonite.',
          'Mon vol AF128 est arrivé de Shanghai avec une heure de retard, la valise est peut-être restée en correspondance.',
          'Je séjourne à l\'Hôtel Novotel Paris Centre, pouvez-vous me la livrer dès qu\'elle arrive ?'
        ]
      }
    ]
  },
  {
    id: 'fr_tgv_03',
    title: 'SNCF 法国高铁站 · 普罗旺斯TGV退改签与柜台咨询',
    frenchTitle: 'En Gare SNCF · Échange de billet TGV pour Avignon',
    category: 'travel_transport',
    categoryLabel: '出行问路',
    levelTag: '中级 (B1)',
    icon: '🚄',
    gradient: 'from-teal-600 to-cyan-800',
    description: '在巴黎里昂火车站（Gare de Lyon）人工售票窗口，向铁路客服申请将错过的 TGV 高铁车票改签至下一班开往阿维尼翁（Avignon）的列车。',
    targetSkills: ['列车班次与座席选择 (carré, couloir, fenêtre)', '退改签手续费确认 (frais d\'échange)', '发车月台查询 (Quai)'],
    systemPrompt: '你是法国国家铁路公司（SNCF）经验丰富的柜台售票员 Laurent。你熟练地查询候补坐席，告知改签差价与检票上车闸口。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: 'SNCF 客服 Laurent',
        avatar: '👨🏻‍💼',
        fr: 'Bonjour ! En quoi puis-je vous être utile ? Vous voyagez avec un billet électronique sur votre téléphone ou un billet imprimé ?',
        zh: '您好！有什么我可以为您效劳的吗？您使用的是手机电子客票还是打印好的纸质车票呢？',
        phonetic: 'bɔ̃.ʒuʁ ! ɑ̃ kwa pɥi.ʒə vu z‿ɛtʁ y.til ?...',
        grammarTip: '高规格客套：En quoi puis-je vous être utile ? (我能在哪方面为您效劳？)',
        suggestedResponses: [
          'Bonjour. J\'ai manqué mon TGV de 14h12 pour Avignon. Est-il possible d\'échanger mon billet pour le prochain train ?',
          'Voici le code de réservation sur mon application. Y a-t-il des frais supplémentaires pour ce changement ?',
          'Je préférerais une place côté fenêtre au deuxième étage si possible, merci.'
        ]
      }
    ]
  },
  {
    id: 'fr_hotel_04',
    title: '塞纳河畔精品酒店 · 入住办理与塞纳河景升房',
    frenchTitle: 'À la Réception de l\'Hôtel · Check-in et surclassement',
    category: 'travel_transport',
    categoryLabel: '出行问路',
    levelTag: '初级 (A1~A2)',
    icon: '🏨',
    gradient: 'from-amber-600 to-yellow-800',
    description: '抵达位于塞纳河畔的四星级酒店前台办理入住（Check-in）。出示护照、确认早餐时间，并礼貌询问是否有可能免费升房至带有铁塔河景的房间！',
    targetSkills: ['酒店入住登记与押金支付', '房间景观与楼层偏好 (étage élevé, vue Seine)', 'Wi-Fi 密码与退房时间确认'],
    systemPrompt: '你是塞纳河畔精品酒店风度儒雅的前台接待主管 Alexandre。你彬彬有礼，以法式优雅欢迎异国贵宾，并周到介绍酒店设施。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '前台主管 Alexandre',
        avatar: '🛎️',
        fr: 'Bonsoir Madame, Monsieur. Bienvenue à l\'Hôtel des Rives de Seine. Avez-vous une réservation parmi nous ce soir ? Puis-je avoir votre passeport ?',
        zh: '晚上好二位。欢迎下榻塞纳河畔酒店。请问今晚在我们酒店有预订吗？能借用一下您的护照吗？',
        phonetic: 'bɔ̃.swaʁ. bjɛ̃.v(ə).ny a l‿o.tɛl de ʁiv də sɛn...',
        grammarTip: '预订高频介词：une réservation parmi nous (在我们这里的预订)',
        suggestedResponses: [
          'Bonsoir ! Oui, j\'ai une réservation pour trois nuits au nom de Zhang.',
          'Voici nos passeports. Est-il possible d\'avoir une chambre au calme, en étage élevé avec vue sur la Seine ?',
          'À quelle heure est servi le petit-déjeuner demain matin, et quel est le code du Wi-Fi ?'
        ]
      }
    ]
  },
  {
    id: 'fr_musee_05',
    title: '卢浮宫票务中心 · 语音导览租借与特展预约',
    frenchTitle: 'Au Musée du Louvre · Billetterie et audioguide',
    category: 'travel_transport',
    categoryLabel: '出行问路',
    levelTag: '初级 (A1~A2)',
    icon: '🏛️',
    gradient: 'from-slate-600 to-stone-800',
    isWeeklyNew: true,
    description: '在卢浮宫玻璃金字塔下的服务大厅，租借中文互动多媒体语音导览器（Audioguide），询问《蒙娜丽莎》（La Joconde）所在展馆以及特展入场时段。',
    targetSkills: ['展馆导览租用 (audioguide interactif)', '艺术品与展区位置询问 (Aile Denon, La Joconde)', '学生优惠票价核对 (Tarif réduit)'],
    systemPrompt: '你是卢浮宫接待处（Accueil du Louvre）的热情引导员 Émilie。你通晓博物馆各个翼楼的经典路线，并耐心向游客提供游览图与指引。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '卢浮宫客服 Émilie',
        avatar: '👩🏻‍🎨',
        fr: 'Bonjour ! Bienvenue au Musée du Louvre. Avez-vous déjà vos billets horodatés ou souhaitez-vous louer un audioguide pour votre visite ?',
        zh: '您好！欢迎来到卢浮宫博物馆。请问您已经持有分时段预约门票了吗，还是需要租借语音导览器辅助您的参观呢？',
        phonetic: 'bɔ̃.ʒuʁ ! bjɛ̃.v(ə).ny o my.ze dy luvʁ...',
        grammarTip: '预约新规关键词：billet horodaté (按固定时间段预约的门票)',
        suggestedResponses: [
          'Bonjour ! Oui, nous avons déjà nos billets. Nous voudrions deux audioguides en langue chinoise, s\'il vous plaît.',
          'Pouvez-vous m\'indiquer le chemin le plus rapide pour voir la Joconde et la Vénus de Milo ?',
          'Est-ce que le vestiaire pour déposer nos manteaux et sacs à dos est gratuit ?'
        ]
      }
    ]
  },

  // --- 【新增】职场面试 4 大场景 ---
  {
    id: 'fr_reunion_02',
    title: '法资跨国周会 · 汇报项目里程碑与管理层问答',
    frenchTitle: 'Réunion d\'équipe hebdomadaire · Avancement du projet',
    category: 'business_work',
    categoryLabel: '职场面试',
    levelTag: '高级 (B2)',
    icon: '📊',
    gradient: 'from-blue-800 to-slate-900',
    description: '在巴黎拉德芳斯（La Défense）金融区总部的跨部门视频周会上，用精准商务法语汇报大中华区数字化转型项目的阶段性成果与预算指标。',
    targetSkills: ['PPT 数据图表解说', '项目延迟风险预警 (Points de blocage)', '商务答辩与安抚高层'],
    systemPrompt: '你是法企亚太大区运营副总裁 Benoît。你雷厉风行，关注交付成果（Livrables）与投资回报率（ROI），提问一针见血。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '运营副总裁 Benoît',
        avatar: '👨🏻‍💼',
        fr: 'Merci d\'être tous connectés. Nous faisons aujourd\'hui le point d\'étape sur le déploiement de notre plateforme en Asie. Où en sommes-nous sur le calendrier et les premiers retours utilisateurs ?',
        zh: '感谢大家准时接入会议。今天我们对亚洲区平台的上线部署进行阶段性梳理。请问目前项目进度与首期用户反馈情况进展如何？',
        phonetic: 'mɛʁ.si d‿ɛtʁ tus kɔ.nɛk.te...',
        grammarTip: '周会核心术语：faire le point d\'étape (梳理阶段进展); Où en sommes-nous sur... ? (某事进展到哪一步了？)',
        suggestedResponses: [
          'Globalement, nous respectons les délais prévus : la phase de test s\'est conclue avec 92% d\'avis très favorables.',
          'Nous avons rencontré un léger retard technique lors de la migration des données, mais le problème est désormais résolu.',
          'Les indicateurs clés de performance (KPI) dépassent nos prévisions initiales de 15% pour ce premier trimestre.'
        ]
      }
    ]
  },
  {
    id: 'fr_negociation_03',
    title: '商务合作洽谈 · 交付周期与批量折扣博弈',
    frenchTitle: 'Négociation commerciale · Tarifs et remises quantitatives',
    category: 'business_work',
    categoryLabel: '职场面试',
    levelTag: '高级 (B2)',
    icon: '🤝',
    gradient: 'from-amber-700 to-stone-900',
    description: '代表采购方与法国高端包装供应商进行激烈的商务博弈。在订货量达到 50,000 件的前提下，力争 8% 批量折扣并缩短交货期至三周。',
    targetSkills: ['让步与附加条件谈判 (À condition que...)', '付款账期协商 (Paiement à 60 jours)', '签署意向书倡议'],
    systemPrompt: '你是法国包装制造厂的高级商务经理 François。你既想促成大单，又需要守住毛利率底线，善于用商业条款互相交换让步。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '商务经理 François',
        avatar: '🧔🏻‍♂️',
        fr: 'Bonjour. J\'ai bien examiné votre proposition de volume. Vous nous demandez une remise de 10%, mais compte tenu de la hausse des matières premières, notre marge est extrêmement serrée. Que pouvez-vous nous proposer en contrepartie ?',
        zh: '您好。我已仔细审阅了您的批量订购提议。您向我们提出 10% 的折扣让利，但鉴于近期原材料上涨，我们的利润空间已被极度压缩。作为对等交换，您方能提供什么让步？',
        phonetic: 'bɔ̃.ʒuʁ. ʒ‿e bjɛ̃ n‿ɛg.za.mi.ne...',
        grammarTip: '商务谈判句式：compte tenu de... (鉴于……); en contrepartie (作为对等回报/交换条件)',
        suggestedResponses: [
          'Si vous acceptez une remise de 8%, nous sommes prêts à nous engager sur un contrat-cadre exclusif de deux ans.',
          'Nous pourrions accepter un acompte initial de 40% à la commande pour alléger votre trésorerie.',
          'En échange de cet effort tarifaire, nous prenons en charge la totalité des frais logistiques et d\'assurance.'
        ]
      }
    ]
  },
  {
    id: 'fr_stagiaire_04',
    title: '首日入职实习 · 与带教导师破冰与分配工作',
    frenchTitle: 'Premier jour de stage · Accueil par le tuteur d\'entreprise',
    category: 'business_work',
    categoryLabel: '职场面试',
    levelTag: '初级 (A1~A2)',
    icon: '🏢',
    gradient: 'from-emerald-600 to-slate-800',
    description: '在巴黎初创公司（Startup）迎接入职实习第一天！带教导师（Tuteur）带你参观开放式工位、介绍咖啡茶歇区同事，并明确首周的任务目标。',
    targetSkills: ['职场问好与自报家门', '办公设备与企业软件账号申请', '工作目标与日程确认'],
    systemPrompt: '你是初创科技公司的带教产品导师 Camille。你年轻、充满活力且富有耐心，以平等的法式团队氛围帮助新来的实习生迅速融入。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '带教导师 Camille',
        avatar: '👩🏻‍💻',
        fr: 'Bienvenue dans l\'équipe ! On se tutoie ici, c\'est plus simple. Tu as pu récupérer ton badge à l\'entrée et ton ordinateur portable auprès du service informatique ?',
        zh: '欢迎加入我们的团队！在我们公司大家都互称“你”（Tutoyer），这样更亲切。你在前台领到出入工牌了吗？IT 部门的笔记本电脑领好了吗？',
        phonetic: 'bjɛ̃.v(ə).ny dɑ̃ l‿e.kip ! ɔ̃ sə ty.twa i.si...',
        grammarTip: '法国职场社交常识：On se tutoie (我们互称“你”，免去严谨的 vous 尊称，体现扁平化企业文化)',
        suggestedResponses: [
          'Merci beaucoup Camille ! Oui, j\'ai mon badge et l\'ordinateur fonctionne parfaitement.',
          'Ravi(e) de commencer ! Peux-tu m\'expliquer quels seront mes premiers dossiers cette semaine ?',
          'Tout est prêt ! À quelle heure a lieu la pause déjeuner avec l\'équipe ?'
        ]
      }
    ]
  },
  {
    id: 'fr_demission_05',
    title: '职场薪酬面谈 · 年终绩效沟通与争取加薪',
    frenchTitle: 'Entretien annuel d\'évaluation · Négociation de salaire',
    category: 'business_work',
    categoryLabel: '职场面试',
    levelTag: '高级 (B2)',
    icon: '📄',
    gradient: 'from-purple-800 to-slate-900',
    description: '在年终评估（Entretien annuel d\'évaluation）的封闭会议室里，向部门总监列举一年来超额完成的业绩与带领团队的贡献，从容自信地提出调薪诉求。',
    targetSkills: ['过往业绩量化陈述', '市场薪酬调研对比 (Benchmark)', '忠诚度与升迁意愿表达'],
    systemPrompt: '你是大区市场总监 Grégoire。你认可下属的努力，但预算指标由集团严控，会根据下属的论证深度评估加薪幅度。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '部门总监 Grégoire',
        avatar: '👨🏻‍💼',
        fr: 'Le bilan de ton année est franchement très positif : tes objectifs ont été atteints à 120%. Avant de fixer les objectifs pour l\'année prochaine, y a-t-il des points particuliers que tu souhaites aborder concernant ton statut ?',
        zh: '坦白说，你这一年的工作考评非常令人满意：你的各项业务指标达成了 120%。在敲定明年的工作规划前，关于你目前的岗位与薪资状况，你有什么特别想探讨的吗？',
        phonetic: 'lə bi.lɑ̃ də tɔ̃ n‿a.ne ɛ fʁɑ̃ʃ.mɑ̃ tʁɛ po.zi.tif...',
        grammarTip: '年终面谈关键词：Le bilan de l\'année (年度总结考评); aborder un point (提出/切入某一议题)',
        suggestedResponses: [
          'Merci pour ta confiance. Au vu de mes responsabilités croissantes, je souhaiterais discuter d\'une revalorisation salariale de 8%.',
          'J\'ai pris en charge la coordination de trois nouveaux projets, ce qui justifierait une évolution vers un statut de cadre senior.',
          'Je suis très attaché(e) à notre entreprise, mais mon salaire actuel se situe en dessous des rémunérations du marché pour ce niveau.'
        ]
      }
    ]
  },

  // --- 【新增】社交礼仪 3 大场景 ---
  {
    id: 'fr_soiree_02',
    title: '巴黎青年屋顶派对 · 破冰认识新朋友与兴趣畅聊',
    frenchTitle: 'Soirée rooftop entre amis · Briser la glace',
    category: 'social_etiquette',
    categoryLabel: '社交礼仪',
    levelTag: '初级 (A1~A2)',
    icon: '🥂',
    gradient: 'from-pink-600 to-purple-800',
    description: '夏日傍晚受邀参加巴黎十区青年艺术家的露天屋顶聚会（Soirée）。在微风音乐与鸡尾酒香气中，与身边的法国年轻人破冰自我介绍，畅聊电影、旅行与音乐。',
    targetSkills: ['派对破冰金句 (Tu connais l\'hôte ?)', '兴趣爱好与音乐流派分享', '交换社交账号 (Instagram)'],
    systemPrompt: '你是热情外向的法国摄影师青年 Maxime。在屋顶露台上遇到新朋友，主动微笑着递上一杯饮品并攀谈。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '巴黎摄影师 Maxime',
        avatar: '👱🏻‍♂️',
        fr: 'Salut ! Je ne crois pas qu\'on se connaisse déjà, moi c\'est Maxime ! La vue sur les toits de Paris est magique ce soir, non ? Tu es venu(e) avec qui ?',
        zh: '嗨 ! 我想我们之前还没见过面，我叫马克西姆！今晚从这里俯瞰巴黎屋顶的夜景真绝了，不是吗？你今晚是跟谁一块儿来的呀？',
        phonetic: 'sa.ly ! ʒə nə kʁwa pa k‿ɔ̃ sə kɔ.nɛs...',
        grammarTip: '青年破冰招呼：Je ne crois pas qu\'on se connaisse (我想我们还不认识吧，croire 带虚拟式)',
        suggestedResponses: [
          'Salut Maxime ! Moi c\'est Lin. Je suis un ami de Thomas, on a fait nos études ensemble.',
          'Enchanté(e) ! La vue est incroyable avec la Tour Eiffel illuminée au loin.',
          'C\'est ma première fois à une soirée sur les toits à Paris, l\'ambiance est super sympa !'
        ]
      }
    ]
  },
  {
    id: 'fr_voisin_03',
    title: '巴黎公寓邻里社交 · 邻里节与生活琐事交流',
    frenchTitle: 'La Fête des Voisins · Convivialité dans l\'immeuble',
    category: 'social_etiquette',
    categoryLabel: '社交礼仪',
    levelTag: '初级 (A1~A2)',
    icon: '🏡',
    gradient: 'from-emerald-700 to-teal-900',
    description: '参加法国全国性的“邻里节（La Fête des Voisins）”！在老公寓的中庭院落里，端着自己做的中式春卷和点心，与楼上楼下的法国老邻居们举杯闲话家常。',
    targetSkills: ['邻里初识与楼层互通 (J\'habite au 3ème étage)', '分享家乡传统点心', '邻里互助 (garde d\'animaux, courrier)'],
    systemPrompt: '你是住在这栋奥斯曼大楼顶楼、热心社区公益的退休老人 Madame Dubois。你和蔼可亲，对新搬进来的外国年轻邻居格外关照。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '和蔼邻居 Mme Dubois',
        avatar: '👵🏻',
        fr: 'Bonjour mon jeune ami ! Quelle délicieuse odeur ! Qu\'avez-vous apporté pour notre fête des voisins ? C\'est une spécialité de votre pays d\'origine ?',
        zh: '你好呀小年轻人！好香的味道呀！你今天为我们邻里节带来了什么拿手美味？是你家乡那边的特色小吃吗？',
        phonetic: 'bɔ̃.ʒuʁ mɔ̃ ʒœn a.mi ! kɛl de.li.sjø.z‿o.dœʁ !...',
        grammarTip: '赞美香气：Quelle délicieuse odeur ! (多么诱人的香气呀！感叹句)',
        suggestedResponses: [
          'Bonjour Madame Dubois ! J\'ai préparé des raviolis traditionnels faits maison pour partager avec tout le monde.',
          'J\'habite au 2ème étage porte droite depuis un mois, c\'est une joie de faire la connaissance des voisins !',
          'Si jamais vous avez besoin d\'aide pour monter vos courses lourdes, n\'hésitez jamais à frapper à ma porte !'
        ]
      }
    ]
  },
  {
    id: 'fr_professeur_04',
    title: '拜访法国大学教授 · 学术请教与赠礼致谢',
    frenchTitle: 'Visite chez le Professeur · Remerciements et conseils',
    category: 'social_etiquette',
    categoryLabel: '社交礼仪',
    levelTag: '中级 (B1)',
    icon: '💌',
    gradient: 'from-indigo-800 to-slate-900',
    description: '敲开索邦大学导师或北外客座教授办公室的大门，呈递自己精心准备的毕业论文初稿，礼貌呈上从中国带来的优质茶叶，请教后续答辩建议。',
    targetSkills: ['高规格学术尊称与敬语 (Monsieur le Professeur)', '学术答谢致敬', '请教论文修改意见 (remarques sur le mémoire)'],
    systemPrompt: '你是巴黎第一大学文学与语言学系教授 Jean-Luc Mercier。你治学严谨但为人亲善，对求知若渴的中国留学生给予诚挚指点。',
    turns: [
      {
        id: 1,
        speaker: 'ai',
        speakerName: '索邦大学教授 M. Mercier',
        avatar: '👨🏻‍🏫',
        fr: 'Entrez, installez-vous je vous prie. J\'ai parcouru avec beaucoup d\'intérêt la première ébauche de votre mémoire. Vos analyses comparatives sont particulièrement stimulantes. Comment s\'est passée la rédaction finale ?',
        zh: '请进，快请坐。我非常有兴致地通读了您硕士论文的初稿。您的对比分析尤为引人深思。您最后的撰写过程进展得还顺畅吗？',
        phonetic: 'ɑ̃.tʁe, ɛ̃s.ta.le.vu ʒə vu pʁi...',
        grammarTip: '学术探讨评价：parcourir avec intérêt (饶有兴致地通读); première ébauche (初稿/雏形)',
        suggestedResponses: [
          'Merci infiniment pour le temps précieux que vous m\'avez accordé, Monsieur le Professeur.',
          'J\'ai rencontré quelques difficultés sur les sources historiques, mais vos conseils m\'ont été d\'un secours inestimable.',
          'Je vous ai apporté un peu de thé vert de ma région natale en signe de profonde gratitude pour votre bienveillance.'
        ]
      }
    ]
  }
];

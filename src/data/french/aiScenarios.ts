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
}

export const AI_SCENARIOS_DATA: AIScenario[] = [
  {
    id: 'fr_cafe_01',
    title: '☕ 巴黎花神咖啡馆 · 点单与露天位闲聊',
    frenchTitle: 'Au Café de Flore · Commande en terrasse',
    category: 'daily_life',
    categoryLabel: '生活实用',
    levelTag: '初级 (A1~A2)',
    icon: '☕',
    gradient: 'from-amber-600 to-rose-700',
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
    title: '🎓 DELF B1/B2 考官 1v1 面试 · 环保与科技辩驳',
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
    title: '🚇 巴黎地铁与交通换乘 · 圣米歇尔广场问路',
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
    title: '🥖 传统法式面包房 · 买法棍与牛角包',
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
    title: '💼 法企求职面试 · 自我介绍与职业抱负',
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
    title: '💊 法国绿色十字药店 · 症状咨询与买药',
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
    title: '👗 玛黑区独立买手店 · 试衣与退换货',
    frenchTitle: 'Shopping dans le Marais · Cabine d\'essayage',
    category: 'daily_life',
    categoryLabel: '购物日常',
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
    title: '🍷 受邀法国家庭晚宴 · 餐桌社交与赞美',
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
  }
];

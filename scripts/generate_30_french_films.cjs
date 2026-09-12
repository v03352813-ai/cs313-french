const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = path.resolve(__dirname, '..', 'src', 'data', 'french', 'cinemaData.ts');

const FILMS_DATA = [
  {
    id: 'film_choristes',
    movieTitle: '放牛班的春天',
    frenchTitle: 'Les Choristes',
    year: 2004,
    director: 'Christophe Barratier',
    genre: '治愈温情',
    levelTag: 'A1-A2入门',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    tag: '治愈音乐 · 法国影史殿堂级经典',
    audioDuration: '01:45',
    isFreePreview: true,
    sceneSummary: '马修老师用音乐点亮顽劣孩子们心中的希望之光，孩子们在纸飞机上写满告别与感激。',
    dialogues: [
      {
        character: 'Clément Mathieu',
        fr: 'Ne jamais dire jamais. Il y a toujours quelque chose à tenter.',
        zh: '永远不要轻言放弃。总有一些事情值得我们去尝试。',
        keyPoints: 'ne jamais dire jamais: 经典谚语“永不说绝不”；quelque chose à + 不定式（有某事可做）。'
      },
      {
        character: 'Pépinot',
        fr: 'Monsieur Mathieu, attendez-moi ! Emmenez-moi avec vous !',
        zh: '马修先生，等等我！带我一起走吧！',
        keyPoints: 'attendez-moi / emmenez-moi: 祈使句带重读人称代词 moi。'
      },
      {
        character: 'Pierre Morhange',
        fr: 'Caresse sur l\'océan, porte au vent l\'aile si légère.',
        zh: '抚过海面的微风，乘着如此轻盈的羽翼。',
        keyPoints: 'caresse (n.f. 抚摸/抚慰)；porte au vent (迎风轻拂)。'
      }
    ],
    vocabulary: [
      { word: 'chorale (n.f.)', meaning: '合唱团' },
      { word: 'espoir (n.m.)', meaning: '希望' },
      { word: 'musique (n.f.)', meaning: '音乐' },
      { word: 'tenter (v.)', meaning: '尝试 / 试图' }
    ]
  },
  {
    id: 'film_amelie',
    movieTitle: '天使爱美丽',
    frenchTitle: 'Le Fabuleux Destin d\'Amélie Poulain',
    year: 2001,
    director: 'Jean-Pierre Jeunet',
    genre: '传奇爱恋',
    levelTag: 'B1进阶',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
    tag: '奇幻浪漫 · 蒙马特高地的法式奇想',
    audioDuration: '02:10',
    isFreePreview: true,
    sceneSummary: '爱美丽在巴黎的双风车咖啡馆静静观察着周围每个人的小癖好，暗中策划着为他人带去幸福的秘密计划。',
    dialogues: [
      {
        character: 'Narrateur',
        fr: 'Amélie a six ans. Comme toutes les petites filles, elle aimerait que son père la prenne dans ses bras.',
        zh: '爱美丽六岁了。像所有小女孩一样，她渴望得到父亲温暖的拥抱。',
        keyPoints: 'aimerait que + 虚拟式 (la prenne 为 prendre 的虚拟式现在时)。'
      },
      {
        character: 'Amélie',
        fr: 'La chance, c\'est comme le Tour de France : on l\'attend longtemps, et puis ça passe vite !',
        zh: '机缘就像环法自行车赛：我们等待良久，而它却飞驰而过！',
        keyPoints: 'c\'est comme... (就像...)；on l\'attend (代词直接宾语 la 省音)。'
      }
    ],
    vocabulary: [
      { word: 'destin (n.m.)', meaning: '命运 / 宿命' },
      { word: 'chance (n.f.)', meaning: '运气 / 机遇' },
      { word: 'bras (n.m.)', meaning: '手臂 / 怀抱' },
      { word: 'attendre (v.)', meaning: '等待 / 期盼' }
    ]
  },
  {
    id: 'film_intouchables',
    movieTitle: '触不可及',
    frenchTitle: 'Intouchables',
    year: 2011,
    director: 'Olivier Nakache & Éric Toledano',
    genre: '治愈温情',
    levelTag: 'B1进阶',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    tag: '真挚友情 · 跨越阶级的灵魂共鸣',
    audioDuration: '01:50',
    isFreePreview: true,
    sceneSummary: '全身瘫痪的白人富豪菲利普与刚出狱的黑人青年德希斯在轮椅上狂奔，在古典乐与现代街头乐中找到了久违的生命尊严。',
    dialogues: [
      {
        character: 'Philippe',
        fr: 'Mon vrai handicap, ce n\'est pas d\'être en fauteuil roulant. C\'est d\'être sans elle.',
        zh: '我真正的残疾，并不是坐在这副轮椅上，而是生活里没有了她。',
        keyPoints: 'ce n\'est pas de + 不定式（表定义的否定句）；sans (介词：没有/缺乏)。'
      },
      {
        character: 'Driss',
        fr: 'Pas de bras, pas de chocolat ! Allez, on respire un bon coup !',
        zh: '没有胳膊就没有巧克力！来吧，深呼吸一口气！',
        keyPoints: '法国民间幽默俗语；on respire 表口语呼吁“让我们呼吸”。'
      }
    ],
    vocabulary: [
      { word: 'handicap (n.m.)', meaning: '残障 / 缺陷' },
      { word: 'fauteuil (n.m.)', meaning: '扶手椅 / 轮椅' },
      { word: 'respirer (v.)', meaning: '呼吸' },
      { word: 'humour (n.m.)', meaning: '幽默' }
    ]
  },
  {
    id: 'film_leon',
    movieTitle: '这个杀手不太冷',
    frenchTitle: 'Léon',
    year: 1994,
    director: 'Luc Besson',
    genre: '人生哲理',
    levelTag: 'B1进阶',
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80',
    tag: '吕克·贝松影史传世神作 · 铁血与纯真温情',
    audioDuration: '02:05',
    isFreePreview: false,
    sceneSummary: '楼道里的少女玛蒂尔达与独行杀手莱昂的宿命相遇，那句关于生活本质的经典叩问。',
    dialogues: [
      {
        character: 'Mathilda',
        fr: 'La vie est-elle toujours aussi dure, ou seulement quand on est petit ?',
        zh: '生活总是这么痛苦，还是只有小时候如此？',
        keyPoints: 'toujours aussi...: 总是同样...；quand on est petit: 当人年幼的时候。'
      },
      {
        character: 'Léon',
        fr: 'Toujours aussi dure.',
        zh: '总是如此痛苦。',
        keyPoints: '经典的冷硬极简回应，体现法语口语中省略句的深沉语感。'
      },
      {
        character: 'Mathilda',
        fr: 'Je veux de l\'amour, ou la mort.',
        zh: '我要么得到爱，要么死。',
        keyPoints: 'de l\'amour: 部分冠词修饰抽象情感；ou: 连词“或者/要么”。'
      }
    ],
    vocabulary: [
      { word: 'dur / dure (adj.)', meaning: '艰难的 / 痛苦的' },
      { word: 'amour (n.m.)', meaning: '爱情 / 关爱' },
      { word: 'mort (n.f.)', meaning: '死亡' },
      { word: 'protéger (v.)', meaning: '保护 / 庇护' }
    ]
  },
  {
    id: 'film_jeux_enfants',
    movieTitle: '两小无猜',
    frenchTitle: 'Jeux d\'enfants',
    year: 2003,
    director: 'Yann Samuell',
    genre: '传奇爱恋',
    levelTag: 'B2高阶',
    coverImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80',
    tag: '极致法式浪漫狂想 · Cap ou pas cap',
    audioDuration: '02:15',
    isFreePreview: false,
    sceneSummary: '朱利安与索菲从童年延续至成年的铁盒旋转木马游戏，用一生实践“敢不敢”的炽热爱情。',
    dialogues: [
      {
        character: 'Sophie',
        fr: 'Cap ou pas cap ? — Cap !',
        zh: '敢，还是不敢？——敢！',
        keyPoints: 'cap (être capable de): 法国年轻人极其经典的俚语挑战口头禅。'
      },
      {
        character: 'Julien',
        fr: 'Il y a trois choses que je n\'aurais jamais dû faire : rouler sur la ligne de chemin de fer, avaler un ver de terre, et aimer Sophie.',
        zh: '有三件事我本不该做：在铁轨上疾驰、吞下一只蚯蚓，以及爱上索菲。',
        keyPoints: 'je n\'aurais jamais dû + 不定式: 条件式过去时表“本不该做某事”之懊悔。'
      }
    ],
    vocabulary: [
      { word: 'capable (adj.)', meaning: '有能力的 / 敢于的' },
      { word: 'oser (v.)', meaning: '敢于 / 斗胆' },
      { word: 'pari (n.m.)', meaning: '打赌 / 赌注' },
      { word: 'passion (n.f.)', meaning: '炽热激情' }
    ]
  },
  {
    id: 'film_grand_bleu',
    movieTitle: '碧海蓝天',
    frenchTitle: 'Le Grand Bleu',
    year: 1988,
    director: 'Luc Besson',
    genre: '人生哲理',
    levelTag: 'B1进阶',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
    tag: '蔚蓝深海的自由诗篇 · 影史诗意丰碑',
    audioDuration: '02:40',
    isFreePreview: false,
    sceneSummary: '潜水员雅克凝视地中海幽暗深处，那是比陆地更纯粹、属于海豚与灵魂的归宿。',
    dialogues: [
      {
        character: 'Jacques Mayol',
        fr: 'Tu sais ce qu\'il faut faire pour rencontrer une sirène ? Tu descends au fond de la mer, là où l\'eau n\'est plus bleue...',
        zh: '你知道怎样才能遇见美人鱼吗？你潜入海底深处，直到那里的海水不再是蓝色的...',
        keyPoints: 'ce qu\'il faut faire: “所需要做的事”；au fond de: 在...底部。'
      },
      {
        character: 'Jacques Mayol',
        fr: 'Et là, tu décides que tu es prêt à mourir pour elles. Alors seulement, elles viennent.',
        zh: '到了那里，你下定决心愿意为她们而死。只有那时，她们才会来到你身边。',
        keyPoints: 'être prêt à + 不定式: 准备好做某事；alors seulement: 唯有此时。'
      }
    ],
    vocabulary: [
      { word: 'mer (n.f.)', meaning: '大海' },
      { word: 'profond (adj.)', meaning: '深邃的 / 深刻的' },
      { word: 'sirène (n.f.)', meaning: '美人鱼' },
      { word: 'plonger (v.)', meaning: '潜水 / 沉浸' }
    ]
  },
  {
    id: 'film_la_mome',
    movieTitle: '玫瑰人生',
    frenchTitle: 'La Môme',
    year: 2007,
    director: 'Olivier Dahan',
    genre: '传奇爱恋',
    levelTag: 'B2高阶',
    coverImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&auto=format&fit=crop&q=80',
    tag: '法兰西传奇香颂歌后 · 奥斯卡双料桂冠',
    audioDuration: '02:20',
    isFreePreview: false,
    sceneSummary: '病痛缠身的法国歌后埃迪特·皮雅芙站在聚光灯下，用颤抖而坚定的歌喉唱出对生命与爱的无悔绝唱。',
    dialogues: [
      {
        character: 'Édith Piaf',
        fr: 'Non, rien de rien. Non, je ne regrette rien. Ni le bien qu\'on m\'a fait, ni le mal, tout ça m\'est bien égal !',
        zh: '不，绝不。不，我绝不后悔。无论是给我的好，还是给我的坏，对我来说都全无所谓！',
        keyPoints: 'ni... ni...: 既不...也不...；m\'est égal: 对我无所谓。'
      },
      {
        character: 'Édith Piaf',
        fr: 'Si je devais donner un conseil à une femme ? Aimez. À une jeune fille ? Aimez. À un enfant ? Aimez.',
        zh: '如果要我给女人一个忠告？去爱吧。给年轻女孩？去爱吧。给孩子？去爱吧。',
        keyPoints: 'si + 未完成过去时: 表示假设与建议；Aimez: 命令式“去爱”。'
      }
    ],
    vocabulary: [
      { word: 'regretter (v.)', meaning: '后悔 / 遗憾' },
      { word: 'conseil (n.m.)', meaning: '建议 / 忠告' },
      { word: 'chanson (n.f.)', meaning: '歌曲 / 香颂' },
      { word: 'passionné (adj.)', meaning: '充满热情的' }
    ]
  },
  {
    id: 'film_petit_prince',
    movieTitle: '小王子',
    frenchTitle: 'Le Petit Prince',
    year: 2015,
    director: 'Mark Osborne',
    genre: '治愈温情',
    levelTag: 'A1-A2入门',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    tag: '法兰西哲思童话瑰宝 · 驯服与爱',
    audioDuration: '02:00',
    isFreePreview: false,
    sceneSummary: '小王子与狐狸在麦田告别，狐狸吐露了属于全人类最深情的秘密。',
    dialogues: [
      {
        character: 'Le Renard',
        fr: 'On ne voit bien qu\'avec le cœur. L\'essentiel est invisible pour les yeux.',
        zh: '唯有用心灵才能看得清。实质性的东西，用眼睛是看不见的。',
        keyPoints: 'ne... que...: 仅/唯有；invisible pour: 对...而言无形。'
      },
      {
        character: 'Le Petit Prince',
        fr: 'C\'est le temps que tu as perdu pour ta rose qui fait ta rose si importante.',
        zh: '正是你为你那朵玫瑰所花费的心血，才使得你的玫瑰变得如此重要。',
        keyPoints: 'c\'est... qui... 强调句型；perdu pour: 为...耗费/付出。'
      }
    ],
    vocabulary: [
      { word: 'cœur (n.m.)', meaning: '心 / 心灵' },
      { word: 'essentiel (adj.)', meaning: '实质的 / 核心的' },
      { word: 'rose (n.f.)', meaning: '玫瑰' },
      { word: 'invisible (adj.)', meaning: '看不见的 / 无形的' }
    ]
  },
  {
    id: 'film_midnight_paris',
    movieTitle: '午夜巴黎',
    frenchTitle: 'Minuit à Paris',
    year: 2011,
    director: 'Woody Allen',
    genre: '传奇爱恋',
    levelTag: 'B1进阶',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
    tag: '塞纳河畔黄金年代 · 海明威与菲茨杰拉德',
    audioDuration: '02:15',
    isFreePreview: false,
    sceneSummary: '午夜钟声敲响，老式标致汽车停在石板街边，吉尔穿越回1920年代流动的巴黎盛宴。',
    dialogues: [
      {
        character: 'Gil Pender',
        fr: 'Paris sous la pluie est la plus belle chose au monde.',
        zh: '雨中的巴黎是世界上最美好的事物。',
        keyPoints: 'sous la pluie: 在雨中；la plus belle: 形容词最高级。'
      },
      {
        character: 'Ernest Hemingway',
        fr: 'Si vous avez la chance d\'avoir vécu à Paris quand vous étiez jeune, Paris est une fête mobile qui vous accompagne toute votre vie.',
        zh: '如果你年轻时有幸在巴黎生活过，那么巴黎是一席流动的盛宴，它将一生与你相伴。',
        keyPoints: 'avoir la chance de + 不定式；une fête mobile: 流动的盛宴。'
      }
    ],
    vocabulary: [
      { word: 'pluie (n.f.)', meaning: '雨' },
      { word: 'fête (n.f.)', meaning: '节日 / 盛宴' },
      { word: 'mobile (adj.)', meaning: '流动的 / 可移动的' },
      { word: 'époque (n.f.)', meaning: '时代 / 纪元' }
    ]
  },
  {
    id: 'film_bleu',
    movieTitle: '红白蓝三部曲之蓝',
    frenchTitle: 'Trois Couleurs : Bleu',
    year: 1993,
    director: 'Krzysztof Kieślowski',
    genre: '人生哲理',
    levelTag: 'B2高阶',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    tag: '威尼斯金狮奖 · 自由与生命的重奏',
    audioDuration: '02:30',
    isFreePreview: false,
    sceneSummary: '朱莉在失去至亲后试图切断一切羁绊追寻绝对自由，但音乐与人性的温度重新唤醒她对生命的宽恕。',
    dialogues: [
      {
        character: 'Julie',
        fr: 'Désormais, je n\'ai plus de souvenirs, plus de maison, plus de famille. Je suis libre.',
        zh: '从今往后，我不再有回忆，不再有家，不再有亲人。我自由了。',
        keyPoints: 'désormais: 从今往后；ne... plus de: 不再有（接名词去冠词）。'
      },
      {
        character: 'Olivier',
        fr: 'Tu ne peux pas t\'échapper du monde, Julie. Le monde continue de t\'aimer.',
        zh: '你无法逃离这个世界，朱莉。世界依然爱着你。',
        keyPoints: 's\'échapper de: 从...逃离；continuer de + 不定式: 继续做某事。'
      }
    ],
    vocabulary: [
      { word: 'liberté (n.f.)', meaning: '自由' },
      { word: 'souvenir (n.m.)', meaning: '回忆 / 记忆' },
      { word: 'échapper (v.)', meaning: '逃离 / 摆脱' },
      { word: 'musique (n.f.)', meaning: '音乐' }
    ]
  },
  {
    id: 'film_blanc',
    movieTitle: '红白蓝三部曲之白',
    frenchTitle: 'Trois Couleurs : Blanc',
    year: 1994,
    director: 'Krzysztof Kieślowski',
    genre: '人生哲理',
    levelTag: 'B1进阶',
    coverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
    tag: '柏林最佳导演银熊奖 · 平等与荒诞执念',
    audioDuration: '02:00',
    isFreePreview: false,
    sceneSummary: '落魄波兰理发师卡罗尔在巴黎法庭上面临被抛弃的绝境，用一场荒诞的财富复仇去追索尊严。',
    dialogues: [
      {
        character: 'Karol',
        fr: 'Est-ce que la justice n\'est pas la même pour tout le monde ?',
        zh: '难道正义在所有人面前不是平等的吗？',
        keyPoints: 'la même pour: 对...而言是一样的；tout le monde: 所有人。'
      },
      {
        character: 'Dominique',
        fr: 'Je t\'aimais, mais l\'égalité ne se gagne pas par la haine.',
        zh: '我曾爱过你，但平等绝不是靠仇恨换来的。',
        keyPoints: 'se gagner: 自反动词表被动“被赢得”；la haine: 仇恨。'
      }
    ],
    vocabulary: [
      { word: 'égalité (n.f.)', meaning: '平等' },
      { word: 'justice (n.f.)', meaning: '正义 / 司法' },
      { word: 'haine (n.f.)', meaning: '仇恨' },
      { word: 'tribunal (n.m.)', meaning: '法庭' }
    ]
  },
  {
    id: 'film_rouge',
    movieTitle: '红白蓝三部曲之红',
    frenchTitle: 'Trois Couleurs : Rouge',
    year: 1994,
    director: 'Krzysztof Kieślowski',
    genre: '人生哲理',
    levelTag: 'B2高阶',
    coverImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80',
    tag: '奥斯卡最佳外语片提名 · 博爱与宿命红线',
    audioDuration: '02:25',
    isFreePreview: false,
    sceneSummary: '年轻模特瓦伦蒂娜偶遇偷听邻居电话的退休法官，两人在灵魂的对话中探究人性的宽恕与博爱。',
    dialogues: [
      {
        character: 'Le Juge Kern',
        fr: 'La vérité n\'est pas toujours bonne à dire, mais elle est indispensable pour comprendre.',
        zh: '真相并不总是容易说出口，但对于理解彼此却是不可或缺的。',
        keyPoints: 'être bon à + 不定式（易于/适于做某事）；indispensable: 不可或缺的。'
      },
      {
        character: 'Valentine',
        fr: 'Je ressens de la pitié pour vous, et en même temps un profond respect.',
        zh: '我为您感到怜悯，但与此同时也抱着深深的敬意。',
        keyPoints: 'ressentir de la pitié: 感到同情；en même temps: 同时。'
      }
    ],
    vocabulary: [
      { word: 'fraternité (n.f.)', meaning: '博爱 / 友爱' },
      { word: 'vérité (n.f.)', meaning: '真理 / 真相' },
      { word: 'pitié (n.f.)', meaning: '怜悯 / 同情' },
      { word: 'comprendre (v.)', meaning: '理解 / 明白' }
    ]
  },
  {
    id: 'film_400_coups',
    movieTitle: '四百击',
    frenchTitle: 'Les Quatre Cents Coups',
    year: 1959,
    director: 'François Truffaut',
    genre: '新浪潮先锋',
    levelTag: '考研高频',
    coverImage: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&auto=format&fit=crop&q=80',
    tag: '戛纳最佳导演 · 法国新浪潮开山神作',
    audioDuration: '02:10',
    isFreePreview: false,
    sceneSummary: '叛逆少年安托万逃离冷漠的家庭与刻板的学校，一路奔向大海，最后定格在茫然与渴望的大海回眸。',
    dialogues: [
      {
        character: 'Antoine Doinel',
        fr: 'Si je disais la vérité, personne ne me croirait jamais.',
        zh: '如果我说实话，根本不会有人相信我。',
        keyPoints: 'si + 未完成过去时表假设 (disais)；ne... personne... jamais: 复合否定。'
      },
      {
        character: 'Psychologue',
        fr: 'Qu\'est-ce qui te ferait le plus plaisir dans la vie ? — Voir la mer.',
        zh: '生活中什么事情会让你感到最快乐？——看海。',
        keyPoints: 'faire plaisir à qn: 令某人高兴；le plus: 最高级。'
      }
    ],
    vocabulary: [
      { word: 'liberté (n.f.)', meaning: '自由' },
      { word: 'mensonge (n.m.)', meaning: '谎言' },
      { word: 'mer (n.f.)', meaning: '大海' },
      { word: 'rebelle (adj.)', meaning: '叛逆的' }
    ]
  },
  {
    id: 'film_bout_de_souffle',
    movieTitle: '精疲力尽',
    frenchTitle: 'À bout de souffle',
    year: 1960,
    director: 'Jean-Luc Godard',
    genre: '新浪潮先锋',
    levelTag: '考研高频',
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80',
    tag: '让-吕克·戈达尔传世反叛 · 跳接剪辑革命',
    audioDuration: '02:05',
    isFreePreview: false,
    sceneSummary: '米歇尔与美国女孩帕特丽夏在香榭丽舍大街游荡，那句著名的临终遗言成为影史符号。',
    dialogues: [
      {
        character: 'Patricia',
        fr: 'Entre le chagrin et le néant, je choisis le chagrin. Et toi, que choisis-tu ?',
        zh: '在悲伤与虚无之间，我选择悲伤。而你呢，你选什么？',
        keyPoints: 'entre... et...: 在两者之间；choisir (第二组规则动词变位)。'
      },
      {
        character: 'Michel Poiccard',
        fr: 'Le chagrin, c\'est idiot. Je choisis le néant. Ce n\'est pas mieux, mais le chagrin est un compromis.',
        zh: '悲伤太蠢了。我选择虚无。虽然虚无也没好到哪去，但悲伤是一种妥协。',
        keyPoints: 'c\'est idiot: 太蠢了；un compromis: 妥协。'
      }
    ],
    vocabulary: [
      { word: 'chagrin (n.m.)', meaning: '悲伤 / 忧伤' },
      { word: 'néant (n.m.)', meaning: '虚无 / 虚妄' },
      { word: 'compromis (n.m.)', meaning: '妥协 / 折中' },
      { word: 'souffle (n.m.)', meaning: '气息 / 呼吸' }
    ]
  },
  {
    id: 'film_hiroshima',
    movieTitle: '广岛之恋',
    frenchTitle: 'Hiroshima mon amour',
    year: 1959,
    director: 'Alain Resnais',
    genre: '新浪潮先锋',
    levelTag: '考研高频',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    tag: '玛格丽特·杜拉斯编剧 · 记忆与遗忘的诗学',
    audioDuration: '02:15',
    isFreePreview: false,
    sceneSummary: '法国女演员与日本建筑师在异国城市的废墟与清晨中对话，关于记忆的不可磨灭与遗忘之痛。',
    dialogues: [
      {
        character: 'Elle',
        fr: 'Tu n\'as rien vu à Hiroshima. Rien. — J\'ai tout vu. Tout.',
        zh: '你在广岛什么也没看见。什么也没有。——我全看见了。全看见了。',
        keyPoints: 'ne... rien vu: 复合过去时否定句；rien 与 tout 的哲学对立。'
      },
      {
        character: 'Elle',
        fr: 'Comme toi, je connais l\'oubli. Comme toi, j\'ai essayé de lutter de toutes mes forces contre l\'oubli.',
        zh: '就像你一样，我深知何谓遗忘。就像你一样，我也曾拼尽全力与遗忘对抗。',
        keyPoints: 'comme toi: 像你一样；lutter contre: 与...抗争。'
      }
    ],
    vocabulary: [
      { word: 'oubli (n.m.)', meaning: '遗忘' },
      { word: 'mémoire (n.f.)', meaning: '记忆' },
      { word: 'lutter (v.)', meaning: '奋斗 / 搏斗' },
      { word: 'ruine (n.f.)', meaning: '废墟' }
    ]
  },
  {
    id: 'film_pierrot',
    movieTitle: '狂人皮埃罗',
    frenchTitle: 'Pierrot le Fou',
    year: 1965,
    director: 'Jean-Luc Godard',
    genre: '新浪潮先锋',
    levelTag: '考研高频',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
    tag: '戈达尔彩色狂欢 · 逃离中产庸俗的公路诗',
    audioDuration: '02:10',
    isFreePreview: false,
    sceneSummary: '费迪南抛弃沉闷的布尔乔亚家庭，与玛丽安娜一路向南奔向地中海的碧海蓝天。',
    dialogues: [
      {
        character: 'Ferdinand',
        fr: 'Elle est retrouvée ! Quoi ? L\'éternité. C\'est la mer allée avec le soleil.',
        zh: '她被重新找到了！什么？永恒。那是大海与太阳的交融。',
        keyPoints: '引用兰波 (Arthur Rimbaud) 著名诗句；l\'éternité: 永恒。'
      },
      {
        character: 'Marianne',
        fr: 'Tu me parles avec des mots, et moi je te regarde avec des sentiments.',
        zh: '你用字词跟我交谈，而我却用情感注视着你。',
        keyPoints: 'parler avec: 用...交谈；regarder avec des sentiments: 带深情注视。'
      }
    ],
    vocabulary: [
      { word: 'éternité (n.f.)', meaning: '永恒' },
      { word: 'sentiment (n.m.)', meaning: '情感 / 感受' },
      { word: 'soleil (n.m.)', meaning: '太阳' },
      { word: 'fou / folle (adj.)', meaning: '疯狂的' }
    ]
  },
  {
    id: 'film_jules_jim',
    movieTitle: '祖与占',
    frenchTitle: 'Jules et Jim',
    year: 1962,
    director: 'François Truffaut',
    genre: '传奇爱恋',
    levelTag: 'B2高阶',
    coverImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&auto=format&fit=crop&q=80',
    tag: '特吕弗抒情诗篇 · 旋风般的爱情旋涡',
    audioDuration: '02:20',
    isFreePreview: false,
    sceneSummary: '凯瑟琳唱起那首著名的《旋涡香颂》(Le Tourbillon)，三个人的青春在岁月中飞旋。',
    dialogues: [
      {
        character: 'Catherine',
        fr: 'On s\'est connus, on s\'est reconnus, on s\'est perdus de vue, on s\'est r\'perdus d\'vue, on s\'est retrouvés.',
        zh: '我们相识，我们相知，我们彼此失散，我们再度重逢。',
        keyPoints: '自反代词互相意义 (se connaître, se perdre, se retrouver)；口语代词 on 替代 nous。'
      },
      {
        character: 'Jim',
        fr: 'Tu m\'as dit « Je t\'aime », je t\'ai dit « Attends ». J\'allais dire « Prends-moi », tu m\'as dit « Va-t\'en ». ',
        zh: '你对我说“我爱你”，我对你说“等等吧”。我正想说“带走我”，你却对我说“走开吧”。',
        keyPoints: '命令式 Prends-moi / Va-t\'en；过去最近将来时 (J\'allais dire)。'
      }
    ],
    vocabulary: [
      { word: 'tourbillon (n.m.)', meaning: '旋涡 / 旋风' },
      { word: 'retrouver (v.)', meaning: '重新找到 / 重逢' },
      { word: 'reconnaître (v.)', meaning: '认出 / 承认' },
      { word: 'aimer (v.)', meaning: '爱 / 喜爱' }
    ]
  },
  {
    id: 'film_amour',
    movieTitle: '爱',
    frenchTitle: 'Amour',
    year: 2012,
    director: 'Michael Haneke',
    genre: '人生哲理',
    levelTag: '考研高频',
    coverImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80',
    tag: '戛纳金棕榈最佳影片 · 奥斯卡最佳外语片',
    audioDuration: '02:00',
    isFreePreview: false,
    sceneSummary: '两位退休音乐教师在生命暮年彼此扶持，面对衰老、疾病与尊严的终极考验。',
    dialogues: [
      {
        character: 'Georges',
        fr: 'Tout ce temps passé ensemble... C\'est beau. La vie est belle, et tellement longue.',
        zh: '我们一起度过的所有岁月...真美。生命如此美好，又如此漫长。',
        keyPoints: 'tout ce temps passé ensemble: 过去分词做形容词；tellement: 如此/非常。'
      },
      {
        character: 'Anne',
        fr: 'Promets-moi une chose : ne me renvoie jamais à l\'hôpital. Je veux mourir ici, avec toi.',
        zh: '答应我一件事：永远不要把我送回医院。我想死在这里，和你在一起。',
        keyPoints: 'promets-moi: 祈使句；vouloir + 不定式 (je veux mourir)。'
      }
    ],
    vocabulary: [
      { word: 'promesse (n.f.)', meaning: '承诺 / 誓言' },
      { word: 'hôpital (n.m.)', meaning: '医院' },
      { word: 'vieillesse (n.f.)', meaning: '暮年 / 衰老' },
      { word: 'dignité (n.f.)', meaning: '尊严' }
    ]
  },
  {
    id: 'film_parapluies',
    movieTitle: '瑟堡的雨伞',
    frenchTitle: 'Les Parapluies de Cherbourg',
    year: 1964,
    director: 'Jacques Demy',
    genre: '传奇爱恋',
    levelTag: 'B1进阶',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    tag: '戛纳金棕榈大奖 · 全片通唱法式爵士歌舞绝响',
    audioDuration: '02:30',
    isFreePreview: false,
    sceneSummary: '车站月台上，热恋的日内瓦与即将奔赴阿尔及利亚战场的居伊依依惜别。',
    dialogues: [
      {
        character: 'Geneviève',
        fr: 'Je ne pourrai jamais vivre sans toi ! Je mourrai si tu me quittes !',
        zh: '没有你我根本活不下去！如果你离开我，我就会死掉！',
        keyPoints: '简单将来时 pourrai / mourrai；si + 现在时引导条件从句。'
      },
      {
        character: 'Guy',
        fr: 'Ne pleure pas mon amour. Deux ans, ça passe très vite, et je t\'attendrai toute ma vie.',
        zh: '别哭，我的爱人。两年很快就会过去的，而且我会用一生来等你。',
        keyPoints: 'ne pleure pas: 否定命令式；je t\'attendrai: 简单将来时。'
      }
    ],
    vocabulary: [
      { word: 'parapluie (n.m.)', meaning: '雨伞' },
      { word: 'quitter (v.)', meaning: '离开 / 告别' },
      { word: 'pleurer (v.)', meaning: '哭泣' },
      { word: 'guerre (n.f.)', meaning: '战争' }
    ]
  },
  {
    id: 'film_demoiselles',
    movieTitle: '柳媚花娇',
    frenchTitle: 'Les Demoiselles de Rochefort',
    year: 1967,
    director: 'Jacques Demy',
    genre: '治愈温情',
    levelTag: 'A1-A2入门',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
    tag: '凯瑟琳·德纳芙姐妹双姝 · 绚烂法式复古歌舞',
    audioDuration: '02:00',
    isFreePreview: false,
    sceneSummary: '双胞胎姐妹在滨海小城洛什福尔弹着琴唱起欢快的双子座之歌，憧憬着巴黎的艺术梦。',
    dialogues: [
      {
        character: 'Delphine & Solange',
        fr: 'Nous sommes deux sœurs jumelles, nées sous le signe des Gémeaux, mi-fa-sol-la, mi-ré, ré-mi-fa-sol, sol-fa !',
        zh: '我们是一对双胞胎姐妹，生在双子座星宿之下，咪发唆拉咪来，来咪发唆唆发！',
        keyPoints: 'sœurs jumelles: 双胞胎姐妹；signe des Gémeaux: 双子座。'
      },
      {
        character: 'Delphine',
        fr: 'Nous aimons les beaux vers, la musique et l\'amour, et nous partons bientôt pour Paris !',
        zh: '我们热爱优美的诗句、动人的音乐与爱情，我们很快就要启程前往巴黎！',
        keyPoints: 'partir pour: 动身前往某地；bientôt: 很快/不久。'
      }
    ],
    vocabulary: [
      { word: 'jumelle (n.f./adj.)', meaning: '双胞胎姐妹' },
      { word: 'vers (n.m.)', meaning: '诗行 / 诗句' },
      { word: 'signe (n.m.)', meaning: '星座 / 标志' },
      { word: 'danse (n.f.)', meaning: '舞蹈' }
    ]
  },
  {
    id: 'film_chansons_amour',
    movieTitle: '巴黎小情歌',
    frenchTitle: 'Les Chansons d\'amour',
    year: 2007,
    director: 'Christophe Honoré',
    genre: '传奇爱恋',
    levelTag: 'B1进阶',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    tag: '路易·加瑞尔主演 · 现代巴黎都市的哀伤旋律',
    audioDuration: '02:10',
    isFreePreview: false,
    sceneSummary: '塞纳河两岸的夜色中，伊斯梅尔在痛失爱人后，在歌声中慢慢找寻重新被爱的勇气。',
    dialogues: [
      {
        character: 'Erwann',
        fr: 'Aime-moi moins, mais aime-moi longtemps.',
        zh: '爱我少一点，但爱我久一点。',
        keyPoints: '经典法文格言命令式；moins (较少) 与 longtemps (长久) 的对称哲学。'
      },
      {
        character: 'Ismaël',
        fr: 'Toutes les chansons racontent la même histoire : un amour qui commence ou un amour qui finit.',
        zh: '所有的情歌都在讲述同一个故事：要么是一段爱情的开始，要么是一段爱情的终结。',
        keyPoints: 'raconter: 讲述；qui commence / qui finit: 关系从句。'
      }
    ],
    vocabulary: [
      { word: 'chanson (n.f.)', meaning: '歌曲' },
      { word: 'histoire (n.f.)', meaning: '故事 / 历史' },
      { word: 'commencer (v.)', meaning: '开始' },
      { word: 'finir (v.)', meaning: '结束 / 终结' }
    ]
  },
  {
    id: 'film_grande_illusion',
    movieTitle: '大幻影',
    frenchTitle: 'La Grande Illusion',
    year: 1937,
    director: 'Jean Renoir',
    genre: '人生哲理',
    levelTag: '考研高频',
    coverImage: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&auto=format&fit=crop&q=80',
    tag: '让·雷诺阿影史巅峰 · 反战人道主义永恒纪念碑',
    audioDuration: '02:15',
    isFreePreview: false,
    sceneSummary: '一战战俘营中，法国贵族军官与德军城堡司令在夕阳下互致敬意，感叹旧欧洲文明的幻灭。',
    dialogues: [
      {
        character: 'Capitaine de Boeldieu',
        fr: 'D\'un côté ou de l\'autre de la frontière, les hommes restent des hommes. La guerre est une illusion.',
        zh: '不管在边界的这一边还是另一边，人终究是人。战争不过是一场幻觉。',
        keyPoints: 'd\'un côté ou de l\'autre: 在这一边或另一边；rester: 依然是。'
      },
      {
        character: 'Maréchal',
        fr: 'Il faut bien que la guerre finisse un jour, pour que les gens puissent enfin rentrer chez eux.',
        zh: '战争终究必须有结束的一天，这样人们才能终于回到自己的家中。',
        keyPoints: 'il faut que + 虚拟式 (finisse)；pour que + 虚拟式 (puissent)。'
      }
    ],
    vocabulary: [
      { word: 'illusion (n.f.)', meaning: '幻觉 / 幻影' },
      { word: 'frontière (n.f.)', meaning: '边界 / 边境' },
      { word: 'paix (n.f.)', meaning: '和平' },
      { word: 'homme (n.m.)', meaning: '人类 / 男人' }
    ]
  },
  {
    id: 'film_belle_de_jour',
    movieTitle: '白日美人',
    frenchTitle: 'Belle de Jour',
    year: 1967,
    director: 'Luis Buñuel',
    genre: '新浪潮先锋',
    levelTag: '考研高频',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    tag: '威尼斯金狮奖大奖 · 超现实主义优雅欲望剖析',
    audioDuration: '02:00',
    isFreePreview: false,
    sceneSummary: '凯瑟琳·德纳芙饰演的年轻中产妇人塞芙丽娜，在现实与隐秘幻想的双重身份中游走。',
    dialogues: [
      {
        character: 'Séverine',
        fr: 'Mon corps est ici, mais mon esprit est ailleurs, dans un endroit où personne ne peut me juger.',
        zh: '我的身体留在此处，但我的心灵却在别方，在一个无人能审判我的地方。',
        keyPoints: 'ailleurs: 在别处；où personne ne peut...: 关系从句带复合否定。'
      },
      {
        character: 'Pierre',
        fr: 'Pourquoi as-tu toujours ce regard si mystérieux et si distant ?',
        zh: '为什么你的眼神总是如此神秘而又如此疏离？',
        keyPoints: 'avoir un regard: 拥有某种眼神；si + 形容词: 如此...。'
      }
    ],
    vocabulary: [
      { word: 'esprit (n.m.)', meaning: '精神 / 心灵' },
      { word: 'mystérieux (adj.)', meaning: '神秘的' },
      { word: 'juger (v.)', meaning: '审判 / 评判' },
      { word: 'désir (n.m.)', meaning: '欲望 / 渴求' }
    ]
  },
  {
    id: 'film_portrait_femme_feu',
    movieTitle: '燃烧女子的肖像',
    frenchTitle: 'Portrait de la jeune fille en feu',
    year: 2019,
    director: 'Céline Sciamma',
    genre: '当代金棕榈',
    levelTag: 'B2高阶',
    coverImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80',
    tag: '戛纳最佳编剧奖 · 悬崖与篝火的凝视美学',
    audioDuration: '02:20',
    isFreePreview: false,
    sceneSummary: '18世纪布列塔尼孤岛上，女画家玛丽安娜受托为即将出嫁的富家小姐埃洛伊兹画肖像，两人在无声凝视中情愫渐深。',
    dialogues: [
      {
        character: 'Héloïse',
        fr: 'Quand vous me peignez, à qui pensez-vous ? Quand vous me regardez, qui regardez-vous ?',
        zh: '当你为我作画时，你在想谁？当你看向我时，你看到的又是谁？',
        keyPoints: 'penser à qn: 想念某人；quand + 直陈式现在时引导时间状语。'
      },
      {
        character: 'Marianne',
        fr: 'Ne regrettez pas. Souvenez-vous.',
        zh: '不要后悔。请记住我们。',
        keyPoints: '否定命令式 ne regrettez pas；代词式动词肯定命令式 Souvenez-vous。'
      }
    ],
    vocabulary: [
      { word: 'portrait (n.m.)', meaning: '肖像 / 画像' },
      { word: 'peindre (v.)', meaning: '绘画 / 作画' },
      { word: 'regard (n.m.)', meaning: '目光 / 凝视' },
      { word: 'feu (n.m.)', meaning: '火 / 热情' }
    ]
  },
  {
    id: 'film_anatomie_chute',
    movieTitle: '坠落的审判',
    frenchTitle: 'Anatomie d\'une chute',
    year: 2023,
    director: 'Justine Triet',
    genre: '当代金棕榈',
    levelTag: '考研高频',
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80',
    tag: '2023戛纳金棕榈最佳影片 · 奥斯卡最佳原创剧本',
    audioDuration: '02:30',
    isFreePreview: false,
    sceneSummary: '阿尔卑斯雪山木屋坠亡案法庭上，女作家桑德拉面对检察官对其婚姻裂痕的严苛解剖。',
    dialogues: [
      {
        character: 'Sandra',
        fr: 'Parfois, un couple est un chaos, et tout le monde essaie de trouver un coupable alors qu\'il n\'y a qu\'une tragédie.',
        zh: '有时候夫妻关系就是一片混沌，而所有人都在试图抓出一个罪魁祸首，但其实那里只有一场悲剧。',
        keyPoints: 'alors que: 然而/而...；il n\'y a que: 只有/仅仅有。'
      },
      {
        character: 'Daniel',
        fr: 'Quand on manque d\'éléments pour savoir ce qui est vrai, il faut décider ce qu\'on choisit de croire.',
        zh: '当我们缺乏证据去查明真相时，就必须做出决定，选择去相信什么。',
        keyPoints: 'manquer de: 缺乏某物；ce qu\'on choisit de croire: 所选择相信之物。'
      }
    ],
    vocabulary: [
      { word: 'chute (n.f.)', meaning: '坠落 / 跌落' },
      { word: 'tribunal (n.m.)', meaning: '法庭' },
      { word: 'vérité (n.f.)', meaning: '真实 / 真相' },
      { word: 'croire (v.)', meaning: '相信 / 认为' }
    ]
  },
  {
    id: 'film_artist',
    movieTitle: '艺术家',
    frenchTitle: 'The Artist',
    year: 2011,
    director: 'Michel Hazanavicius',
    genre: '当代金棕榈',
    levelTag: 'B1进阶',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    tag: '斩获5项奥斯卡大奖包括最佳影片 · 法国致敬默片情书',
    audioDuration: '01:40',
    isFreePreview: false,
    sceneSummary: '默片巨星乔治在有声电影时代失意落魄，年轻舞者佩皮用真挚的爱帮他重回舞台中央。',
    dialogues: [
      {
        character: 'Peppy Miller',
        fr: 'Il a fait de moi une star quand je n\'étais rien. Maintenant, c\'est à mon tour de l\'aider.',
        zh: '在我微不足道时是他让我成为了明星。现在，轮到我来拯救他了。',
        keyPoints: 'faire de qn qch: 使某人成为...；c\'est à mon tour de: 轮到我做...。'
      },
      {
        character: 'George Valentin',
        fr: 'Avec plaisir !',
        zh: '十分乐意！',
        keyPoints: '全片唯一一句标志性的有声对白，充满时代转折的温情与释放。'
      }
    ],
    vocabulary: [
      { word: 'plaisir (n.m.)', meaning: '乐意 / 愉快' },
      { word: 'star (n.f.)', meaning: '明星' },
      { word: 'silence (n.m.)', meaning: '沉默 / 无声' },
      { word: 'aider (v.)', meaning: '帮助' }
    ]
  },
  {
    id: 'film_papillon',
    movieTitle: '蝴蝶',
    frenchTitle: 'Le Papillon',
    year: 2002,
    director: 'Philippe Muyl',
    genre: '治愈温情',
    levelTag: 'A1-A2入门',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    tag: '全球传唱治愈金曲 · 爷爷与女孩的阿尔卑斯寻蝶记',
    audioDuration: '02:00',
    isFreePreview: false,
    sceneSummary: '古怪老爷爷朱利安与邻居调皮小女孩丽莎漫步在阿尔卑斯山间，一问一答唱起温暖全世界的童谣。',
    dialogues: [
      {
        character: 'Elsa & Julien',
        fr: 'Pourquoi les poules pondent des œufs ? — Pour que les œufs fassent des poules ! Pourquoi les amoureux s\'embrassent ? — C\'est pour que les pigeons roucoulent !',
        zh: '为什么母鸡要下蛋？——为了让蛋能孵出母鸡呀！为什么相爱的人要接吻？——为了让鸽子欢快咕咕叫呀！',
        keyPoints: 'pour que + 虚拟式 (fassent / roucoulent)；一问一答儿童韵律句型。'
      },
      {
        character: 'Julien',
        fr: 'L\'Isabelle est le plus rare des papillons, mais le plus beau trésor, c\'est le voyage.',
        zh: '伊莎贝拉是世界上最稀有的蝴蝶，但最美好的宝藏，其实是沿途的旅途。',
        keyPoints: 'le plus rare: 形容词最高级；trésor (n.m. 宝藏)。'
      }
    ],
    vocabulary: [
      { word: 'papillon (n.m.)', meaning: '蝴蝶' },
      { word: 'œuf (n.m.)', meaning: '鸡蛋' },
      { word: 'amoureux (n.m.)', meaning: '恋人 / 爱人' },
      { word: 'voyage (n.m.)', meaning: '旅行 / 旅程' }
    ]
  },
  {
    id: 'film_spivet',
    movieTitle: '少年斯派维的奇异旅行',
    frenchTitle: 'L\'Extravagant Voyage du jeune et prodigieux T.S. Spivet',
    year: 2013,
    director: 'Jean-Pierre Jeunet',
    genre: '治愈温情',
    levelTag: 'B1进阶',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
    tag: '《天使爱美丽》导演让-皮埃尔·热内奇幻力作 · 天才少年的家庭救赎',
    audioDuration: '02:15',
    isFreePreview: false,
    sceneSummary: '十岁天才发明家斯派维带着皮箱横跨大半个大陆领奖，在演讲台上讲出对离世弟弟最深的怀念。',
    dialogues: [
      {
        character: 'T.S. Spivet',
        fr: 'Les gouttes d\'eau sont toujours les mêmes, mais la rivière ne cesse jamais d\'avancer.',
        zh: '水滴总是一成不变，但河流却从不停止向前奔流。',
        keyPoints: 'les mêmes: 相同的一样；ne cesser jamais de + 不定式: 从不停止做某事。'
      },
      {
        character: 'Dr. Clair',
        fr: 'La science n\'a de valeur que si elle est partagée avec ceux qu\'on aime.',
        zh: '科学唯有在与我们所爱之人分享时，才拥有真正的价值。',
        keyPoints: 'ne... que si...: 唯有在...情况下；partager avec: 与...分享。'
      }
    ],
    vocabulary: [
      { word: 'prodigieux (adj.)', meaning: '神童的 / 奇迹般的' },
      { word: 'rivière (n.f.)', meaning: '河流' },
      { word: 'science (n.f.)', meaning: '科学' },
      { word: 'famille (n.f.)', meaning: '家庭' }
    ]
  },
  {
    id: 'film_famille_belier',
    movieTitle: '贝利叶一家',
    frenchTitle: 'La Famille Bélier',
    year: 2014,
    director: 'Éric Lartigau',
    genre: '治愈温情',
    levelTag: 'B1进阶',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    tag: '法国现象级温情励志神作 · 奥斯卡最佳影片《健听女孩》法国原版',
    audioDuration: '02:25',
    isFreePreview: false,
    sceneSummary: '农场女孩波拉在合唱选拔赛舞台上，一边为聋哑父母打手语一边唱出名曲《Je vole》(我展翅飞翔)。',
    dialogues: [
      {
        character: 'Paula',
        fr: 'Mes chers parents, je pars. Je vous aime mais je pars. Vous n\'aurez plus d\'enfant ce soir.',
        zh: '亲爱的爸爸妈妈，我走了。我爱你们，但我必须启程。今晚过后你们不再拥有孩子。',
        keyPoints: '经典法文香颂《Je vole》高光歌词；ne... plus de... 不再有。'
      },
      {
        character: 'Paula',
        fr: 'Je ne m\'enfuis pas, je vole ! Comprenez bien, je vole ! Sans fumée, sans alcool, je vole !',
        zh: '我不是在逃避，我是在展翅高飞！请你们明白，我是在翱翔！',
        keyPoints: 's\'enfuir: 逃跑/逃脱；voler: 飞翔/翱翔。'
      }
    ],
    vocabulary: [
      { word: 'voler (v.)', meaning: '飞翔 / 翱翔' },
      { word: 'partir (v.)', meaning: '启程 / 出发' },
      { word: 'voix (n.f.)', meaning: '嗓音 / 歌喉' },
      { word: 'parent (n.m.)', meaning: '父母 / 亲人' }
    ]
  },
  {
    id: 'film_notre_dame',
    movieTitle: '巴黎圣母院',
    frenchTitle: 'Notre-Dame de Paris',
    year: 1956,
    director: 'Jean Delannoy',
    genre: '人生哲理',
    levelTag: '考研高频',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
    tag: '维克多·雨果传世名著丰碑 · 钟楼怪人与吉普赛姑娘悲悯绝唱',
    audioDuration: '02:30',
    isFreePreview: false,
    sceneSummary: '钟楼怪人卡西莫多在圣母院顶端拼死保护艾斯美拉达，高呼“避难所！避难所！”震彻中世纪巴黎的天空。',
    dialogues: [
      {
        character: 'Quasimodo',
        fr: 'Asile ! Asile ! Personne n\'a le droit de la toucher tant qu\'elle est sous la protection de la cathédrale !',
        zh: '避难所！避难所！只要她在大教堂的庇护之下，谁也没有权利动她一根手指！',
        keyPoints: 'asile (n.m. 避难所)；tant que (只要.../在...期间)；sous la protection de (在...保护下)。'
      },
      {
        character: 'Esmeralda',
        fr: 'La beauté du visage n\'est rien sans la pureté de l\'âme.',
        zh: '若没有灵魂的纯洁，容颜的美丽便一文不值。',
        keyPoints: 'la beauté du visage: 容颜之美；la pureté de l\'âme: 灵魂的纯粹。'
      }
    ],
    vocabulary: [
      { word: 'asile (n.m.)', meaning: '避难所' },
      { word: 'cathédrale (n.f.)', meaning: '大教堂 / 圣母院' },
      { word: 'beauté (n.f.)', meaning: '美丽 / 美好' },
      { word: 'âme (n.f.)', meaning: '灵魂 / 心灵' }
    ]
  }
];

const tsContent = `/**
 * 法国高分经典电影原声名场面精听切片库 (Cinéma français)
 * 涵盖 30 部法国影史殿堂级传世名片高光原声对白与名师考点精析
 * 每周考后持续同步更新
 */

export interface CinemaScene {
  id: string;
  movieTitle: string;
  frenchTitle: string;
  year: number;
  director: string;
  genre: string; // 治愈温情 | 传奇爱恋 | 新浪潮先锋 | 人生哲理 | 当代金棕榈
  levelTag: string; // A1-A2入门 | B1进阶 | B2高阶 | 考研高频
  coverImage: string;
  tag: string;
  audioDuration: string;
  sceneSummary: string;
  isFreePreview?: boolean; // 是否免费试学
  dialogues: {
    character: string;
    fr: string;
    zh: string;
    keyPoints?: string;
  }[];
  vocabulary: {
    word: string;
    meaning: string;
  }[];
}

export const FRENCH_CINEMA_LIST: CinemaScene[] = ${JSON.stringify(FILMS_DATA, null, 2)};
`;

fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf-8');
console.log('SUCCESS_30_FILMS_GENERATED');

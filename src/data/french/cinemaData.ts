/**
 * 法国高分经典电影原声名场面精听切片库 (Cinéma français)
 */

export interface CinemaScene {
  id: string;
  movieTitle: string;
  frenchTitle: string;
  year: number;
  director: string;
  coverImage: string;
  tag: string;
  audioDuration: string;
  sceneSummary: string;
  dialogues: {
    character: string;
    fr: string;
    zh: string;
    keyPoints?: string;
  }[];
  isFreePreview?: boolean; // 是否免费试学
  vocabulary: {
    word: string;
    meaning: string;
  }[];
}

export const FRENCH_CINEMA_LIST: CinemaScene[] = [
  {
    id: 'film_choristes',
    movieTitle: '放牛班的春天',
    frenchTitle: 'Les Choristes',
    year: 2004,
    director: 'Christophe Barratier',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    tag: '治愈音乐 · 法国影史殿堂级经典',
    audioDuration: '01:45',
    sceneSummary: '马修老师用音乐点亮顽劣孩子们心中的希望之光，孩子们在纸飞机上写满告别与感激。',
    dialogues: [
      {
        character: 'Clément Mathieu',
        fr: 'Ne jamais dire jamais. Il y a toujours quelque chose à tenter.',
        zh: '永远不要轻言放弃。总有一些事情值得我们去尝试。',
        keyPoints: 'ne jamais dire jamais: 法国经典谚语“永不说绝不”；quelque chose à + 不定式（有某事可做）。'
      },
      {
        character: 'Pépinot',
        fr: 'Monsieur Mathieu, attendez-moi ! Emmenez-moi avec vous !',
        zh: '马修先生，等等我！带我一起走吧！',
        keyPoints: 'attendez-moi / emmenez-moi: 祈使句带重读人称代词 moi。'
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
    frenchTitle: "Le Fabuleux Destin d'Amélie Poulain",
    year: 2001,
    director: 'Jean-Pierre Jeunet',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
    tag: '法式浪漫 · 蒙马特高地的诗意奇迹',
    audioDuration: '02:10',
    sceneSummary: '古灵精怪的爱美丽穿梭在巴黎蒙马特的小巷中，默默用温暖的小把戏改变身边每一个普通人的命运。',
    dialogues: [
      {
        character: 'Amélie',
        fr: 'La chance, c\'est comme le Tour de France : on l\'attend longtemps et ça passe vite !',
        zh: '运气就像环法自行车赛：我们等待它良久，而它一瞬即逝！',
        keyPoints: 'c\'est comme: 就像...；on l\'attend: 直宾提前省音 l\'。'
      },
      {
        character: 'L\'homme au verre d\'eau',
        fr: 'Vous au moins, vous ne risquez pas d\'être un légume, parce que même un artichaut a du cœur.',
        zh: '您至少不必担心变成行尸走肉，因为哪怕是一颗朝鲜蓟，也是有一颗心的。',
        keyPoints: 'avoir du cœur: 有爱心/善良 (du 为部分冠词)。'
      }
    ],
    vocabulary: [
      { word: 'chance (n.f.)', meaning: '运气 / 机遇' },
      { word: 'destin (n.m.)', meaning: '命运' },
      { word: 'sourire (n.m. / v.)', meaning: '微笑' },
      { word: 'secret (n.m.)', meaning: '秘密' }
    ]
  },
  {
    id: 'film_intouchables',
    movieTitle: '触不可及',
    frenchTitle: 'Intouchables',
    year: 2011,
    director: 'Olivier Nakache & Éric Toledano',
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
    tag: '跨越阶层的真挚友谊 · 豆瓣9.3神作',
    audioDuration: '01:58',
    sceneSummary: '瘫痪的白人富豪菲利普与刚出狱的黑人青年德希斯，在一场看似不可能的雇佣中建立了最真挚的无价情谊。',
    dialogues: [
      {
        character: 'Philippe',
        fr: 'C\'est exactement ça. C\'est ce que je veux : aucune pitié.',
        zh: '正是这样。这正是我想要的：毫无任何同情与怜悯。',
        keyPoints: 'ce que je veux: 关系从句“我所想要的”；aucune pitié: 零同情。'
      },
      {
        character: 'Driss',
        fr: 'Pas de bras, pas de chocolat ! C\'est une vanne classique !',
        zh: '没手就没巧克力！这可是法兰西经典笑话！',
        keyPoints: 'pas de + 名词: 否定省略表达“没有...就没有...”。'
      }
    ],
    vocabulary: [
      { word: 'amitié (n.f.)', meaning: '友谊' },
      { word: 'courage (n.m.)', meaning: '勇气' },
      { word: 'liberté (n.f.)', meaning: '自由' },
      { word: 'partager (v.)', meaning: '分享' }
    ]
  },
  {
    id: 'film_petit_prince',
    movieTitle: '小王子',
    frenchTitle: 'Le Petit Prince',
    year: 2015,
    director: 'Mark Osborne',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    tag: '法兰西文学国宝 · 献给曾经是大人的孩子们',
    audioDuration: '02:30',
    sceneSummary: '狐狸对小王子的告别密语，揭示了关于爱、驯服与看透世界本质的法式哲学。',
    dialogues: [
      {
        character: 'Le Renard (狐狸)',
        fr: 'On ne voit bien qu\'avec le cœur. L\'essentiel est invisible pour les yeux.',
        zh: '唯有用心，方能看清。真正本质的东西，肉眼是看不见的。',
        keyPoints: 'ne... que...: 限制否定句型“仅仅/只有”；invisible pour: 对...不可见。'
      },
      {
        character: 'Le Petit Prince (小王子)',
        fr: 'C\'est le temps que tu as perdu pour ta rose qui fait ta rose si importante.',
        zh: '正是你在你的玫瑰上花费的时间，才使得你的玫瑰变得如此重要。',
        keyPoints: 'c\'est... qui...: 强调句型；tu as perdu: 复合过去时。'
      }
    ],
    vocabulary: [
      { word: 'apprivoiser (v.)', meaning: '驯服 / 建立羁绊' },
      { word: 'essentiel (adj. / n.m.)', meaning: '本质的 / 核心要务' },
      { word: 'rose (n.f.)', meaning: '玫瑰' },
      { word: 'invisible (adj.)', meaning: '看不见的 / 无形的' }
    ]
  },
  {
    id: 'film_leon',
    movieTitle: '这个杀手不太冷',
    frenchTitle: 'Léon',
    year: 1994,
    director: 'Luc Besson',
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
    frenchTitle: 'La Môme (La Vie en Rose)',
    year: 2007,
    director: 'Olivier Dahan',
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
  }
];

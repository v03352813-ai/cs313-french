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
  }
];

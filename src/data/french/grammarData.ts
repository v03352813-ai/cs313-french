/**
 * 法语考研二外与 DELF 核心语法宝典数据库 (Grammaire)
 */

export interface GrammarPoint {
  id: string;
  title: string;
  frenchTitle: string;
  level: 'A1-A2' | 'B1-B2' | 'KAOYAN';
  category: '冠词与名词' | '代词系统' | '时态与语态' | '从句与虚拟式';
  summary: string;
  formula: string;
  conjugationBridge?: {
    bridgeName: string;
    concept: string;
    targetTenseOrRule: string;
  };
  rules: {
    name: string;
    description: string;
    examples: { fr: string; zh: string }[];
  }[];
  examTrap: string; // 考研/考级避坑指南
}

export const FRENCH_GRAMMAR_LIST: GrammarPoint[] = [
  {
    id: 'g_articles',
    title: '冠词全景体系 (定冠词、不定冠词与部分冠词)',
    frenchTitle: 'Les Articles en français',
    level: 'A1-A2',
    category: '冠词与名词',
    summary: '法语名词前几乎必带冠词，用来标明名词的“性”（阴/阳）、“数”（单/复）与“确指程度”。',
    formula: '冠词 + 名词 (严格性数配合)',
    conjugationBridge: {
      bridgeName: '基础源头 · 性数配合的判定之母',
      concept: '为什么在动词变位器中，复合过去时分词要加 -e、加 -s？贴标签的前提就是通过冠词（le/la/un/une）判明主语或先行词到底是阴性还是复数！它是整个动词性数配合的源头。',
      targetTenseOrRule: '直通变位器【复合过去时性数配合】'
    },
    rules: [
      {
        name: '1. 定冠词 (Articles définis): le, la, l\', les',
        description: '用于特指特定的人或物，或表示整体概念。遇元音开头用省音 l\'。',
        examples: [
          { fr: 'Le livre est sur la table.', zh: '这本书在桌子上。' },
          { fr: "J'aime le café.", zh: '我喜欢咖啡(表示咖啡这一类事物)。' }
        ]
      },
      {
        name: '2. 不定冠词 (Articles indéfinis): un, une, des',
        description: '用于泛指初次提及的可数名词。',
        examples: [
          { fr: 'C\'est un étudiant chinois.', zh: '这是一位中国男学生。' },
          { fr: 'Il achète des pommes.', zh: '他买了一些苹果。' }
        ]
      },
      {
        name: '3. 部分冠词 (Articles partitifs): du, de la, de l\', des',
        description: '【法语特色】用于不可数名词，表示不可数整体中的一部分（吃喝物质、抽象品质）。',
        examples: [
          { fr: 'Je bois du café et de l\'eau.', zh: '我喝(一些)咖啡和水。' },
          { fr: 'Il a du courage.', zh: '他很有勇气(具备一些勇气)。' }
        ]
      }
    ],
    examTrap: '【考研必考避坑】：在否定句中，直接宾语前面的“不定冠词 (un, une, des)”和“部分冠词 (du, de la)”必须一律变成【de】！例如：Je mange du pain. ➔ Je ne mange pas de pain (绝不能写 pas du pain)！但如果是 être 动词则保持原样：Ce ne sont pas des étudiants.'
  },
  {
    id: 'g_pronouns_cod_coi',
    title: '直宾代词 COD 与间宾代词 COI 深度辨析',
    frenchTitle: 'Pronoms COD et COI',
    level: 'A1-A2',
    category: '代词系统',
    summary: '为了避免重复名词，法语使用代词代替名词，且代词通常必须提前置于相关动词之前！',
    formula: '主语 + COD/COI 代词 + 动词',
    conjugationBridge: {
      bridgeName: '桥梁 4 · 宾语抢跑提前贴标签',
      concept: '为什么第三人称间宾 COI (lui/leur) 不分男女，而直宾 COD (le/la/les) 抢跑后后面的分词必须配合？因为直宾是动作直接承受者，抢跑之后分词回头能看见它，必须贴上阴性 -e、复数 -s 的标签！',
      targetTenseOrRule: '直通变位器【复合过去时 + COD 抢跑配合】'
    },
    rules: [
      {
        name: '直接宾语人称代词 COD (me, te, le, la, nous, vous, les)',
        description: '动词与宾语之间无介词直接相连（Regarder qn, Aimer qn）。第三人称用 le / la / les。',
        examples: [
          { fr: 'Tu connais ce professeur ? — Oui, je le connais.', zh: '你认识这位老师吗？——是的，我认识他。' },
          { fr: 'Il nous invite à la fête.', zh: '他邀请我们去参加聚会。' }
        ]
      },
      {
        name: '间接宾语人称代词 COI (me, te, lui, nous, vous, leur)',
        description: '动词带介词 à 后接人（Téléphoner à qn, Parler à qn）。第三人称单数统一用 lui，复数用 leur！',
        examples: [
          { fr: 'Tu écris à Marie ? — Oui, je lui écris.', zh: '你给玛丽写信吗？——是的，我给她写信。' },
          { fr: 'Je parle à mes parents. — Je leur parle.', zh: '我和父母讲话。——我和他们讲话。' }
        ]
      }
    ],
    examTrap: '【考研送分点】：第三人称间宾 COI 没有阴阳性之分，单数不管是男是女一律用 lui！复数不论男女一律用 leur！绝不能写成 *je la écris 或 *je les parle！'
  },
  {
    id: 'g_pronouns_y_en',
    title: '考研双璧：副代词 y 与 en 的全能用法',
    frenchTitle: 'Les pronoms adverbiaux Y et EN',
    level: 'B1-B2',
    category: '代词系统',
    summary: '【全国高校考研二外单选题常年必考大题】副代词 y 与 en 的置换规则极其严格，掌握即可轻松拿分。',
    formula: 'y 替代 à/地点；en 替代 de/数量词',
    conjugationBridge: {
      bridgeName: '结构纽带 · 代词夹心饼干与变位动词',
      concept: '副代词 y 与 en 在句型装配中永远紧贴变位动词！在简单现在时中夹在主语与动词间（j\'y vais, j\'en ai）；在复合过去时中夹在助动词前（j\'y suis allé, j\'en ai acheté）！',
      targetTenseOrRule: '直通变位器【现在时 & 复合过去时句型装配】'
    },
    rules: [
      {
        name: '副代词 Y 的两大替代理论',
        description: '1. 替代【介词 (à, dans, en, sur, chez) + 地点名词】；2. 替代【介词 à + 事物名词（不能代人）】。',
        examples: [
          { fr: 'Tu vas à Paris ? — Oui, j\'y vais.', zh: '你去巴黎吗？——是的，我去那里。' },
          { fr: 'Tu penses à ton avenir ? — Oui, j\'y pense.', zh: '你在考虑你的未来吗？——是的，我在考虑这件事。' }
        ]
      },
      {
        name: '副代词 EN 的三大替代理论',
        description: '1. 替代【部分冠词/不定冠词 + 名词】；2. 替代【数量词后的名词】；3. 替代【介词 de + 事物/地点】。',
        examples: [
          { fr: 'Tu as des frères ? — Oui, j\'en ai deux.', zh: '你有兄弟吗？——是的，我有两个(en代指兄弟，后保留数字deux)。' },
          { fr: 'Tu viens de la gare ? — Oui, j\'en viens.', zh: '你从火车站来吗？——是的，我从那儿来。' }
        ]
      }
    ],
    examTrap: '【考研命题陷阱】：Penser à qn (想念某人) 只能用重读人称代词（Je pense à elle，不可用 y！）；而 Penser à qch (考虑某事) 才用 y（J\'y pense）！同理，Parler de qn (谈论某人) 只能用 de lui/d\'elle，不可用 en！'
  },
  {
    id: 'g_passe_compose_accord',
    title: '复合过去时助动词选择与过去分词配合绝招',
    frenchTitle: 'L\'accord du participe passé au passé composé',
    level: 'A1-A2',
    category: '时态与语态',
    summary: '复合过去时中，90% 动词用 avoir，少数位移动词与自反动词用 être。过去分词与谁配合是语法改错必考。',
    formula: '用 être ➔ 分词与主语配合；用 avoir ➔ 直宾提前才配合',
    conjugationBridge: {
      bridgeName: '桥梁 2 & 3 · 贴标签游戏 + 生老病死位移用 être',
      concept: '动词变位器中，像 aller, venir, partir 等 16 个“进出房子”的位移动词与自反动词，助动词必须使用 être！分词瞬间变身形容词，主语是女生贴 -e，大家贴 -s（Elle est allée / Ils sont partis）！用 avoir 平时躺平不贴，直宾抢跑才回头贴！',
      targetTenseOrRule: '直通变位器【复合过去时 (Passé Composé)】'
    },
    rules: [
      {
        name: '1. 用 être 的 14 个位移与状态变化动词 (DR MRS VANDERTRAMP)',
        description: 'Devenir, Revenir, Monter, Rester, Sortir, Venir, Aller, Naître, Descendre, Entrer, Rentrer, Tomber, Retourner, Partir, Mourir。分词与主语性数完全配合！',
        examples: [
          { fr: 'Elle est allée à l\'école.', zh: '她去学校了 (主语elle为阴性单数，allé加e)。' },
          { fr: 'Ils sont nés en France.', zh: '他们出生在法国 (主语ils为阳性复数，né加s)。' }
        ]
      },
      {
        name: '2. 用 avoir 时，仅在【直接宾语置于动词前】时过去分词才与直宾配合！',
        description: '普通语序不配合。只有直宾代词(le/la/les)或 que 引导的先行词提前时，分词必须与前面的直宾配合性数！',
        examples: [
          { fr: 'J\'ai acheté des fleurs. (普通语序不配合)', zh: '我买了花。' },
          { fr: 'Les fleurs que j\'ai achetées sont belles.', zh: '我买的那些花很漂亮 (直宾fleurs阴复提前，acheté加es！)' }
        ]
      }
    ],
    examTrap: '【考级核心改错】：直宾提前才配合，间宾提前绝不配合！例如：Les mains qu\'il s\'est lavées (lavé配合mains)；但 Ils se sont téléphoné (téléphoner à qn 为间宾，分词绝不加 s)！'
  },
  {
    id: 'g_subjonctif',
    title: '虚拟式现在时 (Subjonctif) 命题触发器',
    frenchTitle: 'Le Subjonctif présent',
    level: 'B1-B2',
    category: '从句与虚拟式',
    summary: '虚拟式用来表达主观愿望、命令、情感态度、怀疑或必要性。在从属连词 que 引导的从句中强制使用。',
    formula: '主句表达主观意愿/情感/必须 + que + 虚拟式从句',
    conjugationBridge: {
      bridgeName: '桥梁 1 · 零件加工厂 (现在时 ils 词根)',
      concept: '虚拟式不是凭空捏造的！动词变位器里现在时第三人称复数（ils）砍掉 -ent 露出的词根，就是虚拟式的标准加工原料（如 ils finiss-ent ➔ que je finiss-e）！掌握了现在时变位，虚拟式变位直接手到擒来！',
      targetTenseOrRule: '直通变位器【虚拟式现在时 (Subjonctif)】'
    },
    rules: [
      {
        name: '1. 表达必要性与命令 (Il faut que...)',
        description: '必须、有必要、命令对方做某事。',
        examples: [
          { fr: 'Il faut que tu fasses tes devoirs.', zh: '你必须完成你的作业 (faire的虚拟式fasses)。' },
          { fr: 'Il est nécessaire que nous soyons à l\'heure.', zh: '我们有必要按时到达 (être的虚拟式soyons)。' }
        ]
      },
      {
        name: '2. 表达愿望、情感与怀疑',
        description: 'vouloir que (想让...), avoir peur que (害怕...), douter que (怀疑...)。',
        examples: [
          { fr: 'Je veux qu\'elle vienne avec nous.', zh: '我想让她和我们一起来 (venir的虚拟式vienne)。' },
          { fr: 'Je suis heureux que vous puissiez venir.', zh: '非常高兴您能够前来 (pouvoir的虚拟式puissiez)。' }
        ]
      },
      {
        name: '3. 必须接虚拟式的固定连词短语',
        description: 'bien que (虽然), pour que (为了让), avant que (在...之前), sans que (没有...)。',
        examples: [
          { fr: 'Bien qu\'il soit fatigué, il continue.', zh: '尽管他很累，他仍然继续工作。' }
        ]
      }
    ],
    examTrap: '【考研必坑】：Espérer que (希望...) 后面接【直陈式将来时】，绝不接虚拟式！例如：J\'espère qu\'il viendra (用将来时 viendra，绝对不能用 vienne)！而 Je veux qu\'il vienne 则必须用虚拟式。这道题几乎每年考研二外必有一所高校出单选！'
  },
  {
    id: 'g_imparfait_vs_pc',
    title: '未完成过去时 vs 复合过去时：时间画卷与考研辨析',
    frenchTitle: 'Imparfait vs Passé Composé',
    level: 'B1-B2',
    category: '时态与语态',
    summary: '复合过去时是“时间轴上的刀刻闪电”（动作完成、有明确起止）；未完成过去时是“持续的背景画卷、习惯描写或状态”。',
    formula: '持续状态/背景描写 ➔ 未完成过去时；突发动作/明确断点 ➔ 复合过去时',
    conjugationBridge: {
      bridgeName: '桥梁 1 · 零件加工厂 (现在时 nous 词根)',
      concept: '未完成过去时的变位词根不是凭空编造的！它 100% 摘自变位器中“直陈式现在时的 nous 人称”（砍掉 -ons 得到词根，如 nous parlons ➔ parl-），再穿上专属旧毛衣（-ais, -ais, -ait, -ions, -iez, -aient）！全法语仅 être (ét-) 一个特异词根！',
      targetTenseOrRule: '直通变位器【未完成过去时 (Imparfait)】'
    },
    rules: [
      {
        name: '1. 未完成过去时核心三大功能',
        description: '① 背景环境描写 (天气、心情、外貌)；② 过去的习惯性/重复动作 (如 Quand j\'étais petit, je lisais...)；③ 进行中的未完状态。',
        examples: [
          { fr: 'Il faisait beau et les oiseaux chantaient.', zh: '天气晴朗，鸟儿在歌唱 (典型背景描写)。' },
          { fr: 'Quand j\'habitais à Paris, j\'allais souvent au musée.', zh: '我住在巴黎时，常去博物馆 (过去习惯动作)。' }
        ]
      },
      {
        name: '2. 复合过去时核心功能：突发动作与推进情节',
        description: '在未完成过去时的背景画卷中，突然发生了一件具体动作，或者有明确时间界限。',
        examples: [
          { fr: 'Je dormais quand le téléphone a sonné.', zh: '我正在睡觉(未完成过去时背景)，电话突然响了(复合过去时动作)。' },
          { fr: 'Hier, il a plu pendant une heure.', zh: '昨天下了整整一个小时的雨 (明确时间段与截止)。' }
        ]
      }
    ],
    examTrap: '【考研避坑高频题】：表示“持续了多长时间但已经彻底结束”的动作（带有 pendant 3 ans, de 2010 à 2015 等明确闭环时间段），必须用【复合过去时】！绝不能因为时间长就误选未完成过去时！'
  },
  {
    id: 'g_reflexive_verbs',
    title: '代动词 (Verbes pronominaux) 复合过去时配合秘籍',
    frenchTitle: 'Les Verbes Pronominaux au passé composé',
    level: 'B1-B2',
    category: '时态与语态',
    summary: '自反动词变位一律以 être 为助动词，但过去分词是否性数配合，严格取决于自反代词 se 到底充当直接宾语 (COD) 还是间接宾语 (COI)！',
    formula: '主语 + se/me/te + être变位 + 过去分词 (se 是直宾才配合！)',
    conjugationBridge: {
      bridgeName: '桥梁 3 & 4 · 自我对话 + 宾语抢跑判定',
      concept: '代动词属于桥梁 3（自我动作一律选 être 作助动词，如 se lever ➔ Elle s\'est levée）。但它同时受桥梁 4 制约：如果 se 后面跟了直宾（Elle s\'est lavé les mains，洗的对象是手不是自己），se 降格为间宾，分词 lavé 绝不配合！',
      targetTenseOrRule: '直通变位器【复合过去时 + 自反代动词】'
    },
    rules: [
      {
        name: '1. 自反代词 se 充当直接宾语 (COD) ➔ 过去分词必须与主语配合！',
        description: '动作直接作用于自身，se 是直接承受者（如 se lever, se laver, se réveiller）。',
        examples: [
          { fr: 'Elle s\'est levée tôt ce matin.', zh: '她今天早上起得很早 (se 是直宾，levé 加 e)。' },
          { fr: 'Ils se sont regardés.', zh: '他们相互注视着 (se 是直宾，regardé 加 s)。' }
        ]
      },
      {
        name: '2. 自反代词 se 充当间接宾语 (COI) ➔ 过去分词绝对不配合！',
        description: '动词本身是固定接 à 的间接不及物动词（se téléphoner, se parler, se sourire），动作施加给对方，分词一律不加 -e/-s！',
        examples: [
          { fr: 'Elles se sont parlé pendant une heure.', zh: '她们聊了一个小时 (parler à qn，se 是间宾，parlé 不加 e 也不加 s！)' },
          { fr: 'Ils se sont téléphoné hier soir.', zh: '他们昨晚通了电话 (téléphoner à qn，téléphoné 绝不配合！)' }
        ]
      }
    ],
    examTrap: '【全国考研二外超级高频错题】：Elle s\'est lavé les mains（她洗了手）。因为双手 les mains 是直接宾语且在动词后，se 是间接宾语（给自己洗手），因此分词 lavé 绝不能加 e！但如果是 Les mains qu\'elle s\'est lavées，直宾 les mains 抢跑到前面了，lavé 必须加 es！'
  }
];

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
  }
];

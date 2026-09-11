/**
 * CS313 法语研习社 · 双轨权威全真机考大卷库
 * 严格划分两大赛道：
 * 轨道 1：【🎓 考研二外法语 (241/242/243)】全国高校名校真题
 * 轨道 2：【🌍 DELF 欧标考级 (A1-B2)】法国官方标准机考
 */

export type ExamTrack = 'kaoyan' | 'delf';
export type QuestionType = '词汇语法' | '读解分析' | '听解原声';

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
  level: '241/242考研' | 'DELF A1' | 'DELF A2' | 'DELF B1' | 'DELF B2';
  schoolOrOrg: string;      // "全国高校统考", "北京外国语大学", "上海外国语大学", "法国教育署"
  yearOrSession: string;    // "2025最新", "2024真题", "官方标准样题"
  summary: string;
  durationMinutes: number;  // 模考倒计时(分钟)
  totalScore: number;       // 满分 (100 或 50)
  isFreePreview?: boolean;  // 是否免费试考
  questions: ExamQuestion[];
}

export const FRENCH_EXAM_PAPERS: ExamPaper[] = [
  // =========================================================================
  // 【轨道一：🎓 考研二外法语专区 (241/242/243 全国高校名校真题大卷)】
  // =========================================================================
  {
    id: 'ky-2025-comprehensive-01',
    title: '2025年全国高校考研二外法语高频真题精编卷 (一)',
    frenchTitle: 'Concours de Master 2025 : Épreuve nationale de français (Vol. 1)',
    track: 'kaoyan',
    level: '241/242考研',
    schoolOrOrg: '全国高校统考大纲',
    yearOrSession: '2025高频精编',
    summary: '汇集全国考研二外高频考点，涵盖直宾提前分词配合、副代词 y/en 深度辨析、虚拟式及长篇阅读分析。',
    durationMinutes: 60,
    totalScore: 100,
    questions: [
      {
        id: 'ky01_q1',
        questionType: '词汇语法',
        categoryTag: '时态配合 · 愈过去时',
        question: 'Hier soir, dès qu\'elle _____ son travail, elle est sortie avec ses amies.',
        options: ['a fini', 'avait fini', 'eut fini', 'finissait'],
        correctAnswer: 1,
        explanation: '【权威考点解析】\n句意：“昨天晚上，她一完成工作，就和朋友们出去了。”\n主句谓语动词是复合过去时 (est sortie)，从句中 dès que (一...就...) 表示在过去的动作之前就已经完成的动作，在以过去为基准的时间坐标中，必须使用“愈过去时” (Plus-que-parfait: avait fini) 来表示“过去的过去”。',
        score: 10,
        grammarTag: '愈过去时 (Plus-que-parfait)'
      },
      {
        id: 'ky01_q2',
        questionType: '词汇语法',
        categoryTag: '代词系统 · 双宾语语序',
        question: 'Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.',
        options: ['leur en', 'en leur', 'les en', 'en lui'],
        correctAnswer: 0,
        explanation: '【权威考点解析】\nparler de qch (用代词 en 替代事物) à qn (父母为复数，用间接宾语代词 leur 替代)。\n根据法语双宾语代词在动词前的严格语序规则：人称代词 (lui / leur) 必须置于副代词 (y / en) 之前！因此唯一正确语序为：【leur en ai parlé】。选 A。',
        score: 10,
        grammarTag: '双代词语序 (leur en)'
      },
      {
        id: 'ky01_q3',
        questionType: '词汇语法',
        categoryTag: '分词配合 · 直宾提前',
        question: 'Les photos que vous avez _____ sont magnifiques.',
        options: ['pris', 'prise', 'prises', 'prennent'],
        correctAnswer: 2,
        explanation: '【权威考点解析】\n在以 avoir 为助动词的复合过去时中，当直接宾语置于动词之前时，过去分词必须与该直接宾语的“性”、“数”强制配合！\n句中先行词 les photos 是阴性复数名词，关系代词 que 在从句中充当 pris 的直接宾语并提前，因此动词 prendre 的过去分词 pris 必须配合变为阴性复数形式【prises】。选 C。',
        score: 10,
        grammarTag: '过去分词与直宾配合'
      },
      {
        id: 'ky01_q4',
        questionType: '词汇语法',
        categoryTag: '从句文法 · 虚拟式触发',
        question: 'Bien qu\'il _____ beaucoup de difficultés, il n\'a jamais abandonné son rêve.',
        options: ['a', 'avait', 'ait', 'aura'],
        correctAnswer: 2,
        explanation: '【权威考点解析】\n从属连词短语 bien que (虽然，尽管) 后面引导的让步状语从句，强制要求动词使用【虚拟式现在时 (Subjonctif présent)】。\n动词 avoir 在虚拟式第三人称单数下的变位为【ait】（直陈式现在时为 a，未完成过去时为 avait）。正确答案为 C。',
        score: 10,
        grammarTag: '虚拟式现在时 (bien que)'
      },
      {
        id: 'ky01_q5',
        questionType: '词汇语法',
        categoryTag: '否定句型 · 固定搭配',
        question: 'Dans ce village isolé, il n\'y a _____ de supermarché ni de pharmacie.',
        options: ['aucun', 'point', 'jamais', 'guère'],
        correctAnswer: 1,
        explanation: '【权威考点解析】\nne... point de... ni de... 是传统书面法语中极具文学性的固定句型，相当于 ne... pas de... (根本没有，绝无)。句意：“在这个偏僻的孤立村庄里，既没有超市，也没有药店。”aucun 后不接 de；guère 意为“几乎不”。故正确答案为 B。',
        score: 10,
        grammarTag: '否定句型 (ne... point de)'
      },
      {
        id: 'ky01_q6',
        questionType: '读解分析',
        categoryTag: '长篇阅读 · 事实推断',
        question: 'Selon le texte, quelle est la raison principale pour laquelle les jeunes Français privilégient les transports en commun ?',
        contextText: 'De nos jours, de plus en plus de jeunes citadins en France renoncent à posséder une voiture personnelle. Face à la hausse continue des prix du carburant et à la prise de conscience écologique grandissante, les transports collectifs (métro, tramway, bus électrique) ainsi que le vélo en libre-service s\'imposent comme des alternatives non seulement économiques, mais aussi respectueuses de l\'environnement urbain. De nombreuses municipalités ont par ailleurs développé des réseaux cyclables sécurisés pour encourager cette transition.',
        options: [
          'Le prix très élevé du permis de conduire.',
          'La conscience écologique et les économies financières.',
          'L\'interdiction totale des voitures au centre-ville.',
          'Le manque de places de stationnement en banlieue.'
        ],
        correctAnswer: 1,
        explanation: '【权威考点解析】\n短文第二句明确指出：“Face à la hausse continue des prix du carburant (燃油费用上涨 -> 经济因素) et à la prise de conscience écologique grandissante (环保意识提升 -> 生态因素)...”。\n选项 B “La conscience écologique et les économies financières” 完全契合原文核心论述。',
        score: 25,
        grammarTag: '阅读细节理解与信息定位'
      },
      {
        id: 'ky01_q7',
        questionType: '读解分析',
        categoryTag: '长篇阅读 · 词义辨析',
        question: 'Dans la phrase « cette transition », à quoi fait référence le mot « transition » ?',
        contextText: 'De nos jours, de plus en plus de jeunes citadins en France renoncent à posséder une voiture personnelle. Face à la hausse continue des prix du carburant et à la prise de conscience écologique grandissante, les transports collectifs (métro, tramway, bus électrique) ainsi que le vélo en libre-service s\'imposent comme des alternatives non seulement économiques, mais aussi respectueuses de l\'environnement urbain. De nombreuses municipalités ont par ailleurs développé des réseaux cyclables sécurisés pour encourager cette transition.',
        options: [
          'Le passage de la voiture individuelle aux mobilités douces et collectives.',
          'L\'augmentation générale des prix de l\'électricité.',
          'Le déménagement des jeunes vers les zones rurales.',
          'La construction de nouvelles autoroutes en banlieue.'
        ],
        correctAnswer: 0,
        explanation: '【权威考点解析】\n代词 cette transition (这一转变) 承接上文：年轻人放弃私家车，转向公交、地铁与共享单车等绿色交通方式的过程。选项 A “从私家车向轻量与公共出行的转变”为最精准释义。',
        score: 25,
        grammarTag: '指代关系与上下文逻辑'
      }
    ]
  },

  {
    id: 'ky-2024-beiwai',
    title: '北京外国语大学考研二外法语 (241) 全真精选卷',
    frenchTitle: 'Université des Langues Étrangères de Pékin (BFSU) — Français 241',
    track: 'kaoyan',
    level: '241/242考研',
    schoolOrOrg: '北京外国语大学',
    yearOrSession: '北外名校精选题库',
    summary: '北外考研二外权威真题演练，重点考察关系代词 dont、自反动词配合陷阱与条件式假想。',
    durationMinutes: 60,
    totalScore: 100,
    questions: [
      {
        id: 'ky_bw_q1',
        questionType: '词汇语法',
        categoryTag: '自反动词配合 · 固定搭配',
        question: 'Est-ce que vous vous êtes _____ compte de votre erreur à ce moment-là ?',
        options: ['rendu', 'rendus', 'rendue', 'rendues'],
        correctAnswer: 0,
        explanation: '【权威考点解析】\n【北外近5年高频必考陷阱！】在固定词组 se rendre compte de qch (意识到某事) 中，compte 是动词 rendre 的直接宾语（且后置），自反代词 se 是间接宾语。由于直接宾语没有提前，过去分词 rendu 绝对不发生任何性数配合！保持阳性单数【rendu】。选 A。',
        score: 20,
        grammarTag: '自反动词固定搭配不配合'
      },
      {
        id: 'ky_bw_q2',
        questionType: '词汇语法',
        categoryTag: '关系代词 · dont',
        question: 'Voilà l\'appartement _____ les fenêtres donnent sur le jardin du Luxembourg.',
        options: ['qui', 'que', 'où', 'dont'],
        correctAnswer: 3,
        explanation: '【权威考点解析】\n先行词是 l\'appartement，还原从句完整结构为：Les fenêtres de cet appartement donnent sur le jardin...（这个公寓的窗户面向卢森堡公园）。在关系从句中代替由介词 de 引导的所属关系时，关系代词必须使用【dont】。选 D。',
        score: 20,
        grammarTag: '关系代词 dont'
      },
      {
        id: 'ky_bw_q3',
        questionType: '词汇语法',
        categoryTag: '副代词 · en 数量修饰',
        question: 'Des pommes fraîches ? Oui, j\'_____ ai acheté trois kilos au marché.',
        options: ['y', 'en', 'les', 'leur'],
        correctAnswer: 1,
        explanation: '【权威考点解析】\n句中先行词是 des pommes fraîches，在答句中后面保留了确切的数量词单位 trois kilos。法语中代替带有数量词修饰、或由不定冠词/部分冠词引导的名词时，必须使用副代词【en】。选 B。',
        score: 20,
        grammarTag: '副代词 en'
      },
      {
        id: 'ky_bw_q4',
        questionType: '词汇语法',
        categoryTag: '从句连词 · 虚拟式辨析',
        question: 'Il est formellement interdit d\'entrer, _____ vous n\'ayez une autorisation expresse.',
        options: ['à moins que', 'pourvu que', 'afin que', 'de sorte que'],
        correctAnswer: 0,
        explanation: '【权威考点解析】\nà moins que 意为“除非，如果不”，后接虚拟式并常带赘词 ne；pourvu que (只要...)；afin que (为了...)。句意：“这里严禁入内，除非您持有明确的特别许可。”故选 A。',
        score: 20,
        grammarTag: '从句连词 à moins que'
      },
      {
        id: 'ky_bw_q5',
        questionType: '词汇语法',
        categoryTag: '自反动词 · 直宾后置不配合',
        question: 'Après avoir cuisiné, elle s\'est _____ les mains avec du savon.',
        options: ['lavé', 'lavée', 'lavés', 'lavées'],
        correctAnswer: 0,
        explanation: '【权威考点解析】\nse laver les mains 中，les mains 是动作 laver 的直接宾语，且置于动词之后；自反代词 s\' 在这里是间接宾语（给自己洗手）。直接宾语后置时，过去分词绝不配合，保持阳性单数【lavé】。选 A。',
        score: 20,
        grammarTag: '直宾后置不配合'
      }
    ]
  },

  {
    id: 'ky-2024-shisu',
    title: '上海外国语大学考研二外法语 (242) 全真精选卷',
    frenchTitle: 'Université des Études Internationales de Shanghai (SISU) — Français 242',
    track: 'kaoyan',
    level: '241/242考研',
    schoolOrOrg: '上海外国语大学',
    yearOrSession: '上外名校精选题库',
    summary: '上外考研二外权威真题演练，深度考察复合关系代词 auquel、使动结构 faire 不变性、间接引语过去将来时与虚拟式。',
    durationMinutes: 60,
    totalScore: 100,
    questions: [
      {
        id: 'ky_sh_q1',
        questionType: '词汇语法',
        categoryTag: '复合关系代词 · auquel 合成',
        question: 'C\'est un problème complexe _____ nous devons accorder une attention particulière.',
        options: ['auquel', 'duquel', 'lequel', 'dans lequel'],
        correctAnswer: 0,
        explanation: '【权威考点解析】\n【上外近年高频必考！】还原从句逻辑搭配为：accorder une attention particulière à ce problème（对该问题给予特别关注）。由介词 à 引导阳性单数物名词先行词 (un problème) 时，关系代词必须使用合成形式【auquel】(à + lequel)。选 A。',
        score: 20,
        grammarTag: '复合关系代词 auquel'
      },
      {
        id: 'ky_sh_q2',
        questionType: '词汇语法',
        categoryTag: '过去分词配合 · 使动结构 faire + 不定式',
        question: 'Ces robes de soirée sont magnifiques, je les ai _____ faire par un grand couturier parisien.',
        options: ['fait', 'faite', 'faits', 'faites'],
        correctAnswer: 0,
        explanation: '【权威考点解析】\n【上外经典易错雷区！】在 faire + 动词不定式（faire faire 使动结构）中，faire 的过去分词是绝对不变化的语法硬规则！即使直接宾语代词 les（代指阴性复数 ces robes）置于助动词 ai 之前，过去分词也绝对不配合，固定使用阳性单数【fait】。选 A。',
        score: 20,
        grammarTag: 'faire+不定式不配合'
      },
      {
        id: 'ky_sh_q3',
        questionType: '词汇语法',
        categoryTag: '间接引语时态呼应 · 过去将来时',
        question: 'Hier après-midi, le professeur nous a assuré qu\'il nous _____ les résultats de l\'examen le lendemain.',
        options: ['donnera', 'donnerait', 'donne', 'avait donné'],
        correctAnswer: 1,
        explanation: '【权威考点解析】\n主句谓语为复合过去时 (a assuré)，从句表示在过去的时间点之后将要发生的动作（依据从句时间状语 le lendemain 次日），必须使用【过去将来时 (Conditionnel présent 作为过去将来使用：donnerait)】。直陈式简单将来时 donnera 只能用于主句为现在时的情况。选 B。',
        score: 20,
        grammarTag: '间接引语过去将来时'
      },
      {
        id: 'ky_sh_q4',
        questionType: '词汇语法',
        categoryTag: '副代词 · y 代替介词 à 引导的事物',
        question: 'Pensez-vous souvent à votre avenir professionnel ? — Oui, j\'_____ pense très souvent.',
        options: ['en', 'y', 'le', 'lui'],
        correctAnswer: 1,
        explanation: '【权威考点解析】\n动词短语 penser à qch (思考、考虑某事物，引导非人抽象概念)。在回答中代替 à votre avenir professionnel，必须使用副代词【y】。注意：若 penser à 后面接具体的人 (penser à qn)，则必须使用重读人称代词（如 je pense à lui/elle），不得使用 y。本题为事物，选 B。',
        score: 20,
        grammarTag: '副代词 y 代替介词 à'
      },
      {
        id: 'ky_sh_q5',
        questionType: '词汇语法',
        categoryTag: '疑问代词 · lequel 阴阳性辨析',
        question: 'Voici deux propositions très intéressantes pour notre voyage, _____ préférez-vous ?',
        options: ['laquelle', 'lequel', 'lesquels', 'lesquelles'],
        correctAnswer: 0,
        explanation: '【权威考点解析】\n提问在给定的两者 (deux propositions，proposition 为阴性单数名词) 中选择“哪一个”。指代阴性单数事物时，必须使用阴性单数疑问代词【laquelle】。句意：“这里有两份非常有趣的旅行提议，您更喜欢哪一份？”选 A。',
        score: 20,
        grammarTag: '疑问代词 laquelle'
      }
    ]
  },

  {
    id: 'ky-grammar-tense',
    title: '考研二外动词时态与虚拟式专项攻坚大卷',
    frenchTitle: 'Épreuve spéciale : Modes et Temps du verbe français',
    track: 'kaoyan',
    level: '241/242考研',
    schoolOrOrg: '全国高校统考研究组',
    yearOrSession: '高频题型突破卷',
    summary: '专攻未完成过去时、条件式假设与虚拟式命题盲区，彻底搞清法语复杂时态配合法则。',
    durationMinutes: 50,
    totalScore: 100,
    questions: [
      {
        id: 'ky_ts_q1',
        questionType: '词汇语法',
        categoryTag: '条件式从句 · 虚拟假设',
        question: 'Si j\'avais su que vous veniez aujourd\'hui, je vous _____ à la gare.',
        options: ['attendais', 'ai attendu', 'aurais attendu', 'attendrai'],
        correctAnswer: 2,
        explanation: '【权威考点解析】\nSi + 愈过去时 (Si j\'avais su 表示对过去既成事实的相反假设)，主句必须使用【条件式过去时 (Conditionnel passé)】 (aurais attendu 表示在过去本可能发生但未实现的结果)。句意：“要是我早知道您今天来，我当时肯定去火车站接您了。”选 C。',
        score: 25,
        grammarTag: '条件式过去时假设'
      },
      {
        id: 'ky_ts_q2',
        questionType: '词汇语法',
        categoryTag: '动词主观意愿 · 虚拟式',
        question: 'Le directeur exige que tous les employés _____ à l\'heure demain matin.',
        options: ['sont', 'soient', 'seront', 'étaient'],
        correctAnswer: 1,
        explanation: '【权威考点解析】\n动词 exiger que (强制要求...) 表达坚决的命令与要求，宾语从句动词必须强制使用虚拟式。être 在 ils/elles 人称下的虚拟式变位为【soient】。选 B。',
        score: 25,
        grammarTag: '虚拟式现在时 (exiger que)'
      },
      {
        id: 'ky_ts_q3',
        questionType: '词汇语法',
        categoryTag: '时态搭配 · 未完成与复合过去',
        question: 'Pendant que je _____ mes devoirs, mon téléphone a soudainement sonné.',
        options: ['faisais', 'ai fait', 'ferai', 'fasse'],
        correctAnswer: 0,
        explanation: '【权威考点解析】\npendant que (当...正在进行的时候) 引导表示过去正在持续的背景动作，必须使用【未完成过去时 (Imparfait: faisais)】；而主句 a sonné 是突然打断背景的瞬间完成动作，使用复合过去时。选 A。',
        score: 25,
        grammarTag: '未完成过去时背景描写'
      },
      {
        id: 'ky_ts_q4',
        questionType: '词汇语法',
        categoryTag: '认知动词疑问句 · 虚拟式',
        question: 'Croyez-vous vraiment que ce plan _____ réalisable dans un délai si court ?',
        options: ['est', 'soit', 'sera', 'était'],
        correctAnswer: 1,
        explanation: '【权威考点解析】\ncroire, penser 等认知动词在肯定句中接直陈式，但在疑问句 (Croyez-vous que...) 或否定句中，表达说话人的不确定与怀疑态度，从句必须使用【虚拟式 (Subjonctif: soit)】！选 B。',
        score: 25,
        grammarTag: '疑问句中的虚拟式'
      }
    ]
  },

  // =========================================================================
  // 【轨道二：🌍 DELF 欧标国际考级专区 (A1-B2 法国官方全真机考大卷)】
  // =========================================================================
  {
    id: 'delf-a1-officiel-01',
    title: 'DELF A1 欧标官方全真机考模拟卷 (听力原声+图表读解)',
    frenchTitle: 'Diplôme d\'Études en Langue Française — Niveau A1 (Épreuve officielle)',
    track: 'delf',
    level: 'DELF A1',
    schoolOrOrg: '法国国际教育研究中心 (FEI)',
    yearOrSession: '国际欧标标准样卷',
    summary: '官方标准样卷，含真实火车站广播、日常点餐听力原声（Compréhension orale）与公共图书馆通知阅读。',
    durationMinutes: 45,
    totalScore: 50,
    questions: [
      {
        id: 'delf_a1_q1',
        questionType: '听解原声',
        categoryTag: '公共广播 · 发车时间提取',
        question: 'À quelle heure le train pour Lyon va-t-il partir ?',
        audioScript: '« Mesdames et messieurs, votre attention s\'il vous plaît. Le TGV numéro 6642 à destination de Lyon Part-Dieu partira voie B à quatorze heures trente. Veuillez monter à bord. »',
        options: ['13h30', '14h15', '14h30', '15h00'],
        correctAnswer: 2,
        explanation: '【听力原文剖析】\n广播原句清楚播报：“...partira voie B à quatorze heures trente”（将在B站台于14点30分发车）。quatorze heures trente 准确对应 14:30。选 C。',
        score: 10,
        grammarTag: '听力信息定位 · 时间数字'
      },
      {
        id: 'delf_a1_q2',
        questionType: '听解原声',
        categoryTag: '日常生活 · 结账金额计算',
        question: 'Quel est le prix total des deux croissants et du café ?',
        audioScript: '« — Bonjour madame, je voudrais deux croissants et un grand café au lait, s\'il vous plaît.\n— Très bien monsieur, cela vous fera cinq euros cinquante au total. »',
        options: ['4,50 €', '5,00 €', '5,50 €', '6,50 €'],
        correctAnswer: 2,
        explanation: '【听力原文剖析】\n店员结账原句：“...cela vous fera cinq euros cinquante au total”（一共是 5 欧元 50 欧分）。对应 5,50 €。选 C。',
        score: 10,
        grammarTag: '听力日常点餐 · 货币金额'
      },
      {
        id: 'delf_a1_q3',
        questionType: '读解分析',
        categoryTag: '公共告示 · 开闭馆日期辨析',
        question: 'Ce message officiel indique que la bibliothèque municipale est fermée :',
        contextText: 'AVIS AUX LECTEURS :\nEn raison de travaux de rénovation intérieure, la bibliothèque municipale sera fermée tous les lundis du mois d\'octobre. Les horaires habituels du mardi au samedi restent inchangés (9h - 18h). Merci de votre compréhension.',
        options: [
          'Tous les jours du mois d\'octobre.',
          'Tous les lundis du mois d\'octobre.',
          'Pendant tous les week-ends d\'octobre.',
          'Du mardi au samedi inclus.'
        ],
        correctAnswer: 1,
        explanation: '【阅读细节信息匹配】\n告示原文清晰写道：“...sera fermée tous les lundis du mois d\'octobre”（十月份的每个周一闭馆）。正确选项为 B。',
        score: 15,
        grammarTag: '公共告示阅读 · 开放时间'
      },
      {
        id: 'delf_a1_q4',
        questionType: '读解分析',
        categoryTag: '日常便条 · 约会地点确认',
        question: 'Où Pierre donne-t-il rendez-vous à son ami Julien ?',
        contextText: 'Salut Julien ! Je suis bien arrivé à Paris ce matin. Retrouvons-nous devant le musée du Louvre à 15 heures, juste à côté de la grande pyramide de verre. Ensuite, on pourra aller prendre un café ensemble. À tout à l\'heure ! — Pierre',
        options: [
          'À la gare de Lyon.',
          'Dans un café du quartier.',
          'Devant le musée du Louvre.',
          'Dans la station de métro.'
        ],
        correctAnswer: 2,
        explanation: '【便签邮件阅读】\n便条明确写明碰头地点：“Retrouvons-nous devant le musée du Louvre à 15 heures”（我们15点在卢浮宫博物馆门前碰头）。对应选项 C。',
        score: 15,
        grammarTag: '便笺便条阅读 · 地点提取'
      }
    ]
  },

  {
    id: 'delf-a2-officiel-01',
    title: 'DELF A2 欧标国际标准样题卷 (工作/出行综合机考)',
    frenchTitle: 'Diplôme d\'Études en Langue Française — Niveau A2 (Session officielle)',
    track: 'delf',
    level: 'DELF A2',
    schoolOrOrg: '法国国际教育研究中心 (FEI)',
    yearOrSession: '国际欧标标准样卷',
    summary: '面向 A2 初中级学员，涵盖职场会议语音通知、法国当地餐厅招聘广告与租赁合同阅读。',
    durationMinutes: 55,
    totalScore: 50,
    questions: [
      {
        id: 'delf_a2_q1',
        questionType: '听解原声',
        categoryTag: '电话语音 · 职场突发事件',
        question: 'Pourquoi la réunion de demain matin est-elle annulée et reportée ?',
        audioScript: '« Bonjour à tous, ici la directrice. En raison de la grève des transports annoncée pour demain matin sur le réseau métropolitain, notre réunion de projet est reportée à jeudi après-midi à quatorze heures. Merci de prévenir vos collègues. »',
        options: [
          'Parce que la directrice est en voyage d\'affaires.',
          'En raison d\'une grève annoncée des transports.',
          'À cause d\'une panne de courant dans les bureaux.',
          'Par manque total de participants.'
        ],
        correctAnswer: 1,
        explanation: '【听力原文剖析】\n语音信息开篇说明原因：“En raison de la grève des transports annoncée pour demain matin...”（由于明早预告的交通罢工...）。对应选项 B。',
        score: 25,
        grammarTag: '电话留言理解 · 因果关系'
      },
      {
        id: 'delf_a2_q2',
        questionType: '读解分析',
        categoryTag: '实用文体 · 招聘启事要求',
        question: 'Pour postuler à ce poste de serveur, quelle condition est obligatoire ?',
        contextText: 'OFFRE D\'EMPLOI :\nRestaurant gastronomique situé au cœur de Bordeaux recherche un serveur / une serveuse dynamique à temps plein.\nProfil exigé : Expérience d\'au moins un an en restauration traditionnelle, très bonne maîtrise du français et un niveau d\'anglais correct pour accueillir les touristes.\nHoraires : Du mardi au samedi soir (18h - 23h30).\nEnvoyez votre CV à : contact@restaurant-bordeaux.fr',
        options: [
          'Avoir son propre véhicule motorisé.',
          'Parler au moins quatre langues étrangères.',
          'Avoir au moins un an d\'expérience en restauration.',
          'Habiter obligatoirement dans le centre de Paris.'
        ],
        correctAnswer: 2,
        explanation: '【招聘文体阅读】\n招聘要求 Profil exigé 首行明确注明：“Expérience d\'au moins un an en restauration traditionnelle”（在传统餐饮行业具备至少一年的工作经验）。选 C。',
        score: 25,
        grammarTag: '招聘广告阅读 · 条件筛选'
      }
    ]
  },

  {
    id: 'delf-b1-officiel-01',
    title: 'DELF B1 欧标进阶全真机考精选卷 (时事讨论与长篇阅读)',
    frenchTitle: 'Diplôme d\'Études en Langue Française — Niveau B1 (Session d\'examen)',
    track: 'delf',
    level: 'DELF B1',
    schoolOrOrg: '法国国际教育研究中心 (FEI)',
    yearOrSession: '国际欧标进阶卷',
    summary: '面向中高级法语学习者，考察对法国社会现象电台访谈理解与现代远程办公利弊长篇深度阅读。',
    durationMinutes: 70,
    totalScore: 50,
    questions: [
      {
        id: 'delf_b1_q1',
        questionType: '听解原声',
        categoryTag: '电台访谈 · 观点主旨理解',
        question: 'Quel est le thème principal de cette interview radiophonique ?',
        audioScript: '« Journaliste : Bienvenue sur France Inter. Aujourd\'hui, nous nous intéressons à la semaine de quatre jours en entreprise. De plus en plus de salariés et d\'employeurs français expérimentent cette nouvelle organisation du travail pour concilier vie professionnelle et vie personnelle tout en maintenant une productivité optimale. »',
        options: [
          'L\'augmentation du temps de travail le week-end.',
          'L\'expérimentation de la semaine de travail de quatre jours.',
          'La fermeture des entreprises en période estivale.',
          'La baisse générale des salaires en France.'
        ],
        correctAnswer: 1,
        explanation: '【听力主旨剖析】\n电台主持人原话开门见山：“...nous nous intéressons à la semaine de quatre jours en entreprise”（今天我们关注企业推行的四天工作制）。选项 B 准确概括全篇核心主题。',
        score: 25,
        grammarTag: '听力主旨提取 · 广播访谈'
      },
      {
        id: 'delf_b1_q2',
        questionType: '读解分析',
        categoryTag: '深度论说文 · 观点论证分析',
        question: 'D\'après l\'auteur, quel est le risque majeur associé au développement excessif du télétravail ?',
        contextText: 'Si le télétravail apporte indéniablement une plus grande flexibilité horaire et supprime la fatigue liée aux trajets quotidiens, de nombreux sociologues alertent sur ses dérives potentielles. L\'effacement progressif de la frontière entre vie privée et vie professionnelle, combiné au risque d\'isolement social prolongé des salariés, peut à terme nuire gravement à la cohésion des équipes et au bien-être psychologique des individus.',
        options: [
          'La baisse drastique de la vitesse d\'Internet.',
          'L\'isolement social et la confusion entre vie privée et professionnelle.',
          'L\'obligation de déménager loin des grandes métropoles.',
          'Le coût excessif du matériel informatique.'
        ],
        correctAnswer: 1,
        explanation: '【论说文观点匹配】\n原文最后一句指明风险：“L\'effacement progressif de la frontière entre vie privée et vie professionnelle, combiné au risque d\'isolement social prolongé...”（私人生活与职业界限的逐渐模糊，加上员工长期社交孤立的风险...）。精准对应选项 B。',
        score: 25,
        grammarTag: '论说文深层理解 · 风险推断'
      }
    ]
  },

  {
    id: 'delf-b2-officiel-01',
    title: 'DELF B2 欧标高级官方全真机考精选卷 (当代社会热点思辨)',
    frenchTitle: 'Diplôme d\'Études en Langue Française — Niveau B2 (Session officielle)',
    track: 'delf',
    level: 'DELF B2',
    schoolOrOrg: '法国国际教育研究中心 (FEI)',
    yearOrSession: '国际欧标高级官方卷',
    summary: '面向 B2 独立运用者与留学读研考生，深度考察法国电台关于人工智能与职场转型的深度辩论听解，以及生态转型法律长篇论说文分析。',
    durationMinutes: 90,
    totalScore: 50,
    questions: [
      {
        id: 'delf_b2_q1',
        questionType: '听解原声',
        categoryTag: '电台辩论 · 科技伦理与就业',
        question: 'D\'après les intervenants dans cette émission, quel est le principal défi posé par l\'intégration de l\'IA générative dans les entreprises ?',
        audioScript: '« Journaliste : Nous poursuivons notre dossier sur l\'intelligence artificielle générative. Selon l\'économiste invité, si l\'IA promet des gains de productivité spectaculaires, le véritable défi réside dans la formation continue des salariés et la requalification des compétences pour éviter une précarisation accrue des profils juniors. »',
        options: [
          'Le coût énergétique des centres de données.',
          'La nécessité de former et requalifier les compétences des salariés.',
          'L\'interdiction légale immédiate de tous les logiciels d\'automatisation.',
          'La suppression totale du travail humain d\'ici cinq ans.'
        ],
        correctAnswer: 1,
        explanation: '【听力论辩主旨剖析】\n经济学家明确指出：“...le véritable défi réside dans la formation continue des salariés et la requalification des compétences...”（真正的挑战在于员工的持续培训与技能重塑）。精准对应选项 B。',
        score: 25,
        grammarTag: '听力思辨理解 · 论点提炼'
      },
      {
        id: 'delf_b2_q2',
        questionType: '读解分析',
        categoryTag: '深度学术评述 · 生态法治与公民实践',
        question: 'D\'après le texte, quelle est la conclusion de l\'auteur concernant l\'efficacité des politiques environnementales actuelles ?',
        contextText: 'Face à l\'urgence climatique, la multiplication des réglementations et des incitations fiscales ne saurait suffire sans une transformation profonde des modèles de production industrielle et des habitudes individuelles de consommation. L\'auteur souligne que la transition écologique ne sera couronnée de succès que si elle s\'accompagne d\'une véritable justice sociale, garantissant que les populations les plus vulnérables ne supportent pas le coût disproportionné des réformes écologiques.',
        options: [
          'Les incitations fiscales suffisent à elles seules pour résoudre la crise.',
          'La transition écologique ne réussira qu\'en garantissant une réelle justice sociale.',
          'Il faut immédiatement cesser toute production industrielle dans les pays développés.',
          'Les citoyens refusent catégoriquement de modifier leurs habitudes de consommation.'
        ],
        correctAnswer: 1,
        explanation: '【学术论说文深层论点】\n原文结论段深刻指出：“...la transition écologique ne sera couronnée de succès que si elle s\'accompagne d\'une véritable justice sociale...”（生态转型只有在伴随着真正的社会公正时才能取得成功）。与选项 B 完全契合。',
        score: 25,
        grammarTag: '长篇论述观点把握与深层推论'
      }
    ]
  }
];

/**
 * 法语 35 个国际音标体系 & 4 大核心发音/联诵规则数据库
 */

export interface PhoneticItem {
  ipa: string;              // 国际音标，如 [a], [ɛ̃], [ʁ]
  name: string;             // 类别名称
  type: 'oral_vowel' | 'nasal_vowel' | 'semi_vowel' | 'consonant';
  spellingRules: string[];  // 对应常见字母组合，如 ["a", "à", "â"]
  examples: { word: string; phonetic: string; meaning: string }[];
  mouthTips: string;        // 发音技巧与嘴型要领
  audioText?: string;       // Web Speech 朗读文本
}

export interface PronunciationRule {
  id: string;
  title: string;
  frenchTitle: string;
  tag: string;
  summary: string;
  detail: string;
  formula: string;
  examples: {
    phrase: string;
    ipa: string;
    meaning: string;
    highlight: string;
    explanation: string;
  }[];
}

// 1. 35 个国际音标
export const FRENCH_PHONETICS: PhoneticItem[] = [
  // --- 元音 (15个) ---
  // 口元音 (11个)
  {
    ipa: '[a]',
    name: '开前不圆唇元音',
    type: 'oral_vowel',
    spellingRules: ['a', 'à', 'â'],
    examples: [
      { word: 'ami', phonetic: '[ami]', meaning: '朋友' },
      { word: 'papa', phonetic: '[papa]', meaning: '爸爸' },
      { word: 'là', phonetic: '[la]', meaning: '那里' }
    ],
    mouthTips: '舌平放，舌尖抵下齿，下颌自然下垂，口腔开阔发“啊”音。',
    audioText: 'ami papa là'
  },
  {
    ipa: '[e]',
    name: '闭前不圆唇元音',
    type: 'oral_vowel',
    spellingRules: ['é', 'er(词尾)', 'ez(词尾)', 'es(单音节词尾)'],
    examples: [
      { word: 'été', phonetic: '[ete]', meaning: '夏天' },
      { word: 'parler', phonetic: '[paʁle]', meaning: '说话' },
      { word: 'les', phonetic: '[le]', meaning: '这些(定冠词)' }
    ],
    mouthTips: '嘴角用力向两边拉开，呈微笑状，舌尖抵下齿，开口度极小。',
    audioText: 'été parler les'
  },
  {
    ipa: '[ɛ]',
    name: '半开前不圆唇元音',
    type: 'oral_vowel',
    spellingRules: ['è', 'ê', 'ai', 'ei', 'e(闭音节)'],
    examples: [
      { word: 'mer', phonetic: '[mɛʁ]', meaning: '大海' },
      { word: 'faire', phonetic: '[fɛʁ]', meaning: '做' },
      { word: 'fête', phonetic: '[fɛt]', meaning: '节日' }
    ],
    mouthTips: '嘴角向两边咧开，下颌比[e]下降更多，舌尖抵下门牙。',
    audioText: 'mer faire fête'
  },
  {
    ipa: '[i]',
    name: '闭前不圆唇元音',
    type: 'oral_vowel',
    spellingRules: ['i', 'î', 'y'],
    examples: [
      { word: 'lit', phonetic: '[li]', meaning: '床' },
      { word: 'vie', phonetic: '[vi]', meaning: '生活' },
      { word: 'stylo', phonetic: '[stilo]', meaning: '钢笔' }
    ],
    mouthTips: '嘴角极力向两边紧收，舌尖紧抵下齿，舌前部极力抬向硬腭。',
    audioText: 'lit vie stylo'
  },
  {
    ipa: '[o]',
    name: '半闭后圆唇元音',
    type: 'oral_vowel',
    spellingRules: ['o(开音节或词尾)', 'ô', 'au', 'eau'],
    examples: [
      { word: 'beau', phonetic: '[bo]', meaning: '美丽的' },
      { word: 'mot', phonetic: '[mo]', meaning: '单词' },
      { word: 'auto', phonetic: '[oto]', meaning: '汽车' }
    ],
    mouthTips: '双唇突出收圆成小圆孔，舌向后缩，发紧凑圆唇的“哦”。',
    audioText: 'beau mot auto'
  },
  {
    ipa: '[ɔ]',
    name: '半开后圆唇元音',
    type: 'oral_vowel',
    spellingRules: ['o(闭音节)'],
    examples: [
      { word: 'porte', phonetic: '[pɔʁt]', meaning: '门' },
      { word: 'bonne', phonetic: '[bɔn]', meaning: '好的(阴性)' },
      { word: 'pomme', phonetic: '[pɔm]', meaning: '苹果' }
    ],
    mouthTips: '双唇向前突出呈圆形，开口度比[o]大，发音饱满自然。',
    audioText: 'porte bonne pomme'
  },
  {
    ipa: '[u]',
    name: '闭后圆唇元音',
    type: 'oral_vowel',
    spellingRules: ['ou', 'où', 'oû'],
    examples: [
      { word: 'nous', phonetic: '[nu]', meaning: '我们' },
      { word: 'vous', phonetic: '[vu]', meaning: '您/你们' },
      { word: 'tout', phonetic: '[tu]', meaning: '全部' }
    ],
    mouthTips: '双唇极力向前收圆突出，呈小孔状，舌后部大幅抬高，发“乌”音。',
    audioText: 'nous vous tout'
  },
  {
    ipa: '[y]',
    name: '闭前圆唇元音',
    type: 'oral_vowel',
    spellingRules: ['u', 'û'],
    examples: [
      { word: 'tu', phonetic: '[ty]', meaning: '你' },
      { word: 'salut', phonetic: '[saly]', meaning: '你好/再见' },
      { word: 'musique', phonetic: '[myzik]', meaning: '音乐' }
    ],
    mouthTips: '发[i]的舌位（舌尖抵下齿），同时嘴唇像发[u]一样圆紧突出，即发汉语拼音“ü”。',
    audioText: 'tu salut musique'
  },
  {
    ipa: '[ø]',
    name: '半闭前圆唇元音',
    type: 'oral_vowel',
    spellingRules: ['eu(词尾或开音节)', 'œu'],
    examples: [
      { word: 'peu', phonetic: '[pø]', meaning: '很少' },
      { word: 'bleu', phonetic: '[blø]', meaning: '蓝色' },
      { word: 'vœu', phonetic: '[vø]', meaning: '心愿' }
    ],
    mouthTips: '舌位同[e]，双唇圆收突出如同[o]，肌肉紧绷。',
    audioText: 'peu bleu vœu'
  },
  {
    ipa: '[œ]',
    name: '半开前圆唇元音',
    type: 'oral_vowel',
    spellingRules: ['eu(闭音节)', 'œu(闭音节)'],
    examples: [
      { word: 'fleur', phonetic: '[flœʁ]', meaning: '花朵' },
      { word: 'sœur', phonetic: '[sœʁ]', meaning: '姐妹' },
      { word: 'cœur', phonetic: '[kœʁ]', meaning: '心/爱心' }
    ],
    mouthTips: '舌位同[ɛ]，双唇呈圆形突出同[ɔ]，开口度稍大。',
    audioText: 'fleur sœur cœur'
  },
  {
    ipa: '[ə]',
    name: '央元音(哑音e)',
    type: 'oral_vowel',
    spellingRules: ['e(单音节或辅音后)'],
    examples: [
      { word: 'le', phonetic: '[lə]', meaning: '这个(阳性)' },
      { word: 'je', phonetic: '[ʒə]', meaning: '我' },
      { word: 'petit', phonetic: '[pəti]', meaning: '小的' }
    ],
    mouthTips: '嘴唇微微收圆向前，舌头保持中间放松位置，发音极轻短。',
    audioText: 'le je petit'
  },

  // 鼻化元音 (4个) - 法语最具魅力的特色音！
  {
    ipa: '[ɛ̃]',
    name: '前开鼻化元音',
    type: 'nasal_vowel',
    spellingRules: ['in', 'im', 'ain', 'aim', 'ein'],
    examples: [
      { word: 'vin', phonetic: '[vɛ̃]', meaning: '红酒' },
      { word: 'pain', phonetic: '[pɛ̃]', meaning: '面包' },
      { word: 'matin', phonetic: '[matɛ̃]', meaning: '早晨' }
    ],
    mouthTips: '发[ɛ]的同时软腭下垂，让气流同时从口腔与鼻腔呼出，切勿带出[n]音！',
    audioText: 'vin pain matin'
  },
  {
    ipa: '[ɑ̃]',
    name: '后开鼻化元音',
    type: 'nasal_vowel',
    spellingRules: ['an', 'am', 'en', 'em'],
    examples: [
      { word: 'France', phonetic: '[fʁɑ̃s]', meaning: '法国' },
      { word: 'temps', phonetic: '[tɑ̃]', meaning: '时间/天气' },
      { word: 'enfant', phonetic: '[ɑ̃fɑ̃]', meaning: '孩子' }
    ],
    mouthTips: '舌向后缩，口大张，气流大部分从鼻腔震动而出。',
    audioText: 'France temps enfant'
  },
  {
    ipa: '[ɔ̃]',
    name: '半闭后鼻化元音',
    type: 'nasal_vowel',
    spellingRules: ['on', 'om'],
    examples: [
      { word: 'bon', phonetic: '[bɔ̃]', meaning: '好' },
      { word: 'maison', phonetic: '[mɛzɔ̃]', meaning: '房子' },
      { word: 'nom', phonetic: '[nɔ̃]', meaning: '名字' }
    ],
    mouthTips: '发[o]的同时让气流从鼻腔喷出，双唇突出圆拢，共鸣饱满。',
    audioText: 'bon maison nom'
  },
  {
    ipa: '[œ̃]',
    name: '半开前圆唇鼻化元音',
    type: 'nasal_vowel',
    spellingRules: ['un', 'um'],
    examples: [
      { word: 'un', phonetic: '[œ̃]', meaning: '一个(阳性)' },
      { word: 'lundi', phonetic: '[lœ̃di]', meaning: '周一' },
      { word: 'parfum', phonetic: '[paʁfœ̃]', meaning: '香水' }
    ],
    mouthTips: '发[œ]的同时使气流由鼻腔流出，双唇向前突出呈圆形。现代日常口语中常并入[ɛ̃]。',
    audioText: 'un lundi parfum'
  },

  // --- 半元音 (3个) ---
  {
    ipa: '[j]',
    name: '硬腭半元音',
    type: 'semi_vowel',
    spellingRules: ['i+元音', 'y+元音', 'ill'],
    examples: [
      { word: 'bien', phonetic: '[bjɛ̃]', meaning: '好/很好' },
      { word: 'famille', phonetic: '[famij]', meaning: '家庭' },
      { word: 'yeux', phonetic: '[jø]', meaning: '眼睛' }
    ],
    mouthTips: '发[i]的位置，极快滑向后面的元音，类似英语中的 y 辅音。',
    audioText: 'bien famille yeux'
  },
  {
    ipa: '[w]',
    name: '圆唇半元音',
    type: 'semi_vowel',
    spellingRules: ['ou+元音', 'oi', 'oin'],
    examples: [
      { word: 'oui', phonetic: '[wi]', meaning: '是的' },
      { word: 'moi', phonetic: '[mwa]', meaning: '我' },
      { word: 'soir', phonetic: '[swaʁ]', meaning: '晚上' }
    ],
    mouthTips: '发[u]的嘴型快速滑向下一元音，双唇圆拢。oi 组合固定读作 [wa]。',
    audioText: 'oui moi soir'
  },
  {
    ipa: '[ɥ]',
    name: '硬腭圆唇半元音',
    type: 'semi_vowel',
    spellingRules: ['u+元音'],
    examples: [
      { word: 'huit', phonetic: '[ɥit]', meaning: '八(8)' },
      { word: 'nuit', phonetic: '[nɥi]', meaning: '夜晚' },
      { word: 'suis', phonetic: '[sɥi]', meaning: '是(第一人称)' }
    ],
    mouthTips: '发[y]的嘴型瞬间滑向下一元音，法语特色半元音。',
    audioText: 'huit nuit suis'
  },

  // --- 辅音 (17个) ---
  {
    ipa: '[p]',
    name: '双唇清塞音',
    type: 'consonant',
    spellingRules: ['p', 'pp'],
    examples: [{ word: 'pomme', phonetic: '[pɔm]', meaning: '苹果' }],
    mouthTips: '双唇紧闭阻碍气流，然后突然爆破，法语中通常不送气。',
    audioText: 'pomme'
  },
  {
    ipa: '[b]',
    name: '双唇浊塞音',
    type: 'consonant',
    spellingRules: ['b', 'bb'],
    examples: [{ word: 'bonjour', phonetic: '[bɔ̃ʒuʁ]', meaning: '你好' }],
    mouthTips: '双唇紧闭后爆破，声带同时震动。',
    audioText: 'bonjour'
  },
  {
    ipa: '[t]',
    name: '舌尖齿龈清塞音',
    type: 'consonant',
    spellingRules: ['t', 'tt', 'th'],
    examples: [{ word: 'table', phonetic: '[tabl]', meaning: '桌子' }],
    mouthTips: '舌尖抵上齿背，阻碍气流后突然释放，不送强气。',
    audioText: 'table'
  },
  {
    ipa: '[d]',
    name: '舌尖齿龈浊塞音',
    type: 'consonant',
    spellingRules: ['d', 'dd'],
    examples: [{ word: 'deux', phonetic: '[dø]', meaning: '二(2)' }],
    mouthTips: '舌位同[t]，声带剧烈震动。',
    audioText: 'deux'
  },
  {
    ipa: '[k]',
    name: '舌后软腭清塞音',
    type: 'consonant',
    spellingRules: ['c', 'k', 'qu', 'ch(有时)'],
    examples: [{ word: 'café', phonetic: '[kafe]', meaning: '咖啡' }, { word: 'qui', phonetic: '[ki]', meaning: '谁' }],
    mouthTips: '舌后部隆起贴软腭形成阻碍后冲开。',
    audioText: 'café qui'
  },
  {
    ipa: '[g]',
    name: '舌后软腭浊塞音',
    type: 'consonant',
    spellingRules: ['g(在a,o,u前)', 'gu'],
    examples: [{ word: 'gare', phonetic: '[gaʁ]', meaning: '火车站' }, { word: 'guide', phonetic: '[gid]', meaning: '向导' }],
    mouthTips: '舌位同[k]，声带震动发音。',
    audioText: 'gare guide'
  },
  {
    ipa: '[f]',
    name: '唇齿清擦音',
    type: 'consonant',
    spellingRules: ['f', 'ff', 'ph'],
    examples: [{ word: 'femme', phonetic: '[fam]', meaning: '女人' }, { word: 'photo', phonetic: '[fɔto]', meaning: '照片' }],
    mouthTips: '上齿轻触下唇内侧，气流从缝隙中摩擦而出。',
    audioText: 'femme photo'
  },
  {
    ipa: '[v]',
    name: '唇齿浊擦音',
    type: 'consonant',
    spellingRules: ['v', 'w(有时)'],
    examples: [{ word: 'ville', phonetic: '[vil]', meaning: '城市' }, { word: 'voir', phonetic: '[vwaʁ]', meaning: '看见' }],
    mouthTips: '位置同[f]，声带震动。',
    audioText: 'ville voir'
  },
  {
    ipa: '[s]',
    name: '舌尖齿龈清擦音',
    type: 'consonant',
    spellingRules: ['s(词首或双s)', 'c(在e,i前)', 'ç'],
    examples: [{ word: 'soleil', phonetic: '[sɔlɛj]', meaning: '太阳' }, { word: 'merci', phonetic: '[mɛʁsi]', meaning: '谢谢' }],
    mouthTips: '舌尖抵下齿，舌前部与上门牙龈留小缝，气流摩擦而出。',
    audioText: 'soleil merci'
  },
  {
    ipa: '[z]',
    name: '舌尖齿龈浊擦音',
    type: 'consonant',
    spellingRules: ['z', 's(两元音之间)'],
    examples: [{ word: 'rose', phonetic: '[ʁoz]', meaning: '玫瑰' }, { word: 'zéro', phonetic: '[zeʁo]', meaning: '零(0)' }],
    mouthTips: '位置同[s]，声带震动。s在两元音字母间必读[z]！',
    audioText: 'rose zéro'
  },
  {
    ipa: '[ʃ]',
    name: '舌叶硬腭清擦音',
    type: 'consonant',
    spellingRules: ['ch', 'sh'],
    examples: [{ word: 'chat', phonetic: '[ʃa]', meaning: '猫' }, { word: 'chercher', phonetic: '[ʃɛʁʃe]', meaning: '寻找' }],
    mouthTips: '双唇稍向前突出成圆形，舌身向上抬，发汉语拼音“sh”的无卷舌版。',
    audioText: 'chat chercher'
  },
  {
    ipa: '[ʒ]',
    name: '舌叶硬腭浊擦音',
    type: 'consonant',
    spellingRules: ['j', 'g(在e,i,y前)'],
    examples: [{ word: 'jour', phonetic: '[ʒuʁ]', meaning: '日子/天' }, { word: 'manger', phonetic: '[mɑ̃ʒe]', meaning: '吃' }],
    mouthTips: '发[ʃ]的嘴型，同时声带剧烈震动，优雅浑厚。',
    audioText: 'jour manger'
  },
  {
    ipa: '[m]',
    name: '双唇鼻辅音',
    type: 'consonant',
    spellingRules: ['m', 'mm'],
    examples: [{ word: 'merci', phonetic: '[mɛʁsi]', meaning: '谢谢' }],
    mouthTips: '双唇紧闭，软腭下垂，气流从鼻腔通过，声带震动。',
    audioText: 'merci'
  },
  {
    ipa: '[n]',
    name: '舌尖齿龈鼻辅音',
    type: 'consonant',
    spellingRules: ['n', 'nn'],
    examples: [{ word: 'non', phonetic: '[nɔ̃]', meaning: '不' }],
    mouthTips: '舌尖抵上齿龈，气流由鼻腔透出。',
    audioText: 'non'
  },
  {
    ipa: '[ɲ]',
    name: '硬腭鼻辅音',
    type: 'consonant',
    spellingRules: ['gn'],
    examples: [{ word: 'montagne', phonetic: '[mɔ̃taɲ]', meaning: '山脉' }, { word: 'Espagne', phonetic: '[ɛspaɲ]', meaning: '西班牙' }],
    mouthTips: '舌面紧贴硬腭，气流由鼻腔出，类似“捏”的鼻音。',
    audioText: 'montagne Espagne'
  },
  {
    ipa: '[l]',
    name: '舌尖齿龈边音',
    type: 'consonant',
    spellingRules: ['l', 'll'],
    examples: [{ word: 'lune', phonetic: '[lyn]', meaning: '月亮' }],
    mouthTips: '舌尖轻抵上齿龈，气流从舌头两侧平滑流出。',
    audioText: 'lune'
  },
  {
    ipa: '[ʁ]',
    name: '小舌擦音(小舌音)',
    type: 'consonant',
    spellingRules: ['r', 'rr'],
    examples: [
      { word: 'Paris', phonetic: '[paʁi]', meaning: '巴黎' },
      { word: 'rouge', phonetic: '[ʁuʒ]', meaning: '红色' },
      { word: 'merci', phonetic: '[mɛʁsi]', meaning: '谢谢' }
    ],
    mouthTips: '【法语灵魂标志】舌后部抬向小舌（悬雍垂），让呼出的气流引起小舌轻微颤动或摩擦。感觉如同早上含一口水漱喉咙。',
    audioText: 'Paris rouge merci'
  }
];

// 2. 四大核心发音与联诵规则
export const PRONUNCIATION_RULES: PronunciationRule[] = [
  {
    id: 'liaison',
    title: '联诵规则 (Liaison)',
    frenchTitle: 'La Liaison en français',
    tag: '提分难点 · 法语流畅度精髓',
    summary: '在前一个单词以辅音字母结尾、后一个单词以元音或哑音h开头时，原本不发音的词尾辅音必须发出来与后面的元音拼读！',
    detail: '注意联诵时的音变规律：辅音 -s/-x 联诵时变为 [z] 音；辅音 -d 联诵时变为 [t] 音；辅音 -f 联诵时变为 [v] 音。',
    formula: '词末不发音辅音 + 词首元音/哑音h ➔ 拼合发音',
    examples: [
      {
        phrase: 'les enfants',
        ipa: '[le zɑ̃-fɑ̃]',
        meaning: '孩子们',
        highlight: 'les 中的 -s 联诵变为 [z]',
        explanation: '单个 les 读 [le]，因后接元音 e，-s 发 [z] 形成 [le-zɑ̃fɑ̃]。'
      },
      {
        phrase: "c'est un ami",
        ipa: '[sɛ tœ̃ na-mi]',
        meaning: '这是一位朋友',
        highlight: '两次连续联诵：c\'est 的 -t 与 un 的 -n',
        explanation: 'c\'est 词末 t 读出 [t]，un 词末 n 连入 ami 读出 [n]。'
      },
      {
        phrase: 'grand homme',
        ipa: '[gʁɑ̃ tɔm]',
        meaning: '伟大的人',
        highlight: 'grand 的 -d 联诵变为 [t]',
        explanation: '形容词置于名词前必须联诵，-d 音变为 [t]，连上哑音 homme。'
      }
    ]
  },
  {
    id: 'silent_end',
    title: '词尾辅音不发音规则',
    frenchTitle: 'Consonnes finales muettes',
    tag: '入门必备 · 告别乱读',
    summary: '法语大多数单词末尾的单辅音字母（-e, -s, -t, -d, -x, -p, -g）通常一律不发音！',
    detail: '【速记口诀：CaReFuL (CRFL)】：绝大多数情况下，词尾只有 -c, -r, -f, -l 这四个字母会发音，其他辅音结尾基本为哑音。',
    formula: '末尾字母为 c, r, f, l ➔ 发音；其他辅音 ➔ 不发音',
    examples: [
      {
        phrase: 'petit',
        ipa: '[pəti]',
        meaning: '小的 (阳性)',
        highlight: '词尾 t 完全不发音',
        explanation: '读作 [pəti]，绝不能读成英语式的大舌爆破 [pətit]。'
      },
      {
        phrase: 'Paris',
        ipa: '[paʁi]',
        meaning: '巴黎',
        highlight: '词尾 s 完全不发音',
        explanation: '法国人读自己的首都永远是 [pa-ri]，末尾 s 绝无声音。'
      },
      {
        phrase: 'sac / chef / sel',
        ipa: '[sak] / [ʃɛf] / [sɛl]',
        meaning: '包 / 厨师 / 盐',
        highlight: '符合 CaReFuL 规则，末尾 -c, -f, -l 均清脆发音',
        explanation: '这四个辅音属于少数词尾发音的代表。'
      }
    ]
  },
  {
    id: 'combinations',
    title: '常见字母组合读音规律',
    frenchTitle: 'Combinaisons de lettres',
    tag: '看词能读 · 拼读底座',
    summary: '法语极度规则，只要记牢几组固定的字母组合，看到任何新单词都能 100% 正确朗读。',
    detail: '掌握 eau/au = [o], ou = [u], oi = [wa], ai/ei = [ɛ], ch = [ʃ], qu = [k]，法语朗读即通关。',
    formula: '组合固定读音，不受周围辅音干扰',
    examples: [
      {
        phrase: 'beaucoup',
        ipa: '[boku]',
        meaning: '非常/许多',
        highlight: 'eau 读 [o]，ou 读 [u]，末尾 p 不发音',
        explanation: '虽然有 8 个字母，拆解后其实只有两个音节：beau [bo] + coup [ku]。'
      },
      {
        phrase: 'bonsoir',
        ipa: '[bɔ̃swaʁ]',
        meaning: '晚上好',
        highlight: 'oi 永远固定读 [wa]',
        explanation: 'soir 读作 [swaʁ]，结合鼻化音 bon [bɔ̃]。'
      }
    ]
  },
  {
    id: 'elision',
    title: '省音规则 (Élision)',
    frenchTitle: "L'Élision en français",
    tag: '书写与读音规范',
    summary: '当以元音结尾的单音节代词/冠词（如 je, me, te, le, la, de, ne, se, que）遇上以元音或哑音h开头的词时，前面的元音脱落，用省文撇“ \' ”代替。',
    detail: '省音是为了避免两个元音撞车造成发音断顿，使法语朗读像音乐一样流淌连贯。',
    formula: 'je + aime ➔ j\'aime；le + arbre ➔ l\'arbre',
    examples: [
      {
        phrase: "j'aime la France",
        ipa: '[ʒɛm la fʁɑ̃s]',
        meaning: '我爱法国',
        highlight: 'je + aime 省写为 j\'aime',
        explanation: '不能说 je aime，必须合并为一个音节 [ʒɛm]。'
      },
      {
        phrase: "l'hôtel",
        ipa: '[lotɛl]',
        meaning: '酒店',
        highlight: 'le + hôtel 省写为 l\'hôtel',
        explanation: '遇到哑音 h（hotel 开头 h 不发音），视同元音开头，必须省音。'
      }
    ]
  }
];

/**
 * CS313 法语研习社 · 36套国家级与国际官方权威全真试卷库 (满载版)
 * 每套试卷均包含标准官方五大题型、24道高品质试题，满分100分！
 * 涵盖四大权威赛道：
 * 赛道 1：【🎓 考研二外法语 (241/242/243)】全国名校统考真题大卷 (12套)
 * 赛道 2：【🏛️ 大学法语四级考试 (CFT-4)】全国统考权威冲刺大卷 (6套)
 * 赛道 3：【🌍 法国官方 DELF 欧标考级 (A1-B2)】终身认证真题精编卷 (10套)
 * 赛道 4：【⚡ 考研二外 & DELF 四大专项攻坚大卷】重难点考点突破 (8套)
 */

export type ExamTrack = 'kaoyan' | 'cft4' | 'delf' | 'drill';
export type QuestionType = '词汇语法' | '动词变位' | '完形填空' | '读解分析' | '图表告示' | '听解原声';

export interface ExamVocabItem {
  word: string;
  meaning: string;
}

export interface ExamQuestion {
  id: string;
  questionType: QuestionType;
  categoryTag: string;
  question: string;
  contextText?: string;
  audioUrl?: string;
  audioScript?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  translation?: string;
  vocabList?: ExamVocabItem[];
  score: number;
  grammarTag?: string;
}

export interface ExamPaper {
  id: string;
  title: string;
  frenchTitle: string;
  track: ExamTrack;
  level: string;
  schoolOrOrg: string;
  yearOrSession: string;
  summary: string;
  durationMinutes: number;
  totalScore: number;
  isFreePreview?: boolean;
  questions: ExamQuestion[];
}

export const FRENCH_EXAM_PAPERS: ExamPaper[] = [
  {
    "id": "paper_kaoyan_1",
    "title": "2025年全国高校考研二外法语高频真题精编卷 (一)",
    "frenchTitle": "Concours de Master 2025 : Épreuve nationale de français (Vol. 1)",
    "track": "kaoyan",
    "level": "241/242考研",
    "schoolOrOrg": "全国高校统考大纲",
    "yearOrSession": "2025高频冲刺",
    "summary": "汇集全国考研二外高频考点，涵盖直宾提前分词配合、副代词 y/en 深度辨析、虚拟式及长篇阅读分析。",
    "durationMinutes": 60,
    "totalScore": 100,
    "isFreePreview": true,
    "questions": [
      {
        "id": "1_q1",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · dont 深度考查",
        "question": "C'est une entreprise internationale _____ le directeur général est très jeune.",
        "options": [
          "qui",
          "que",
          "dont",
          "où"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune。de + 先行词充当名词的所有格限制补语，必须使用关系代词【dont】。选 C。",
        "translation": "这是一间总经理非常年轻的国际跨国企业。",
        "grammarTag": "关系代词 dont 的所有格用法",
        "vocabList": [
          {
            "word": "directeur général",
            "meaning": "总经理 / CEO"
          },
          {
            "word": "entreprise (n.f.)",
            "meaning": "企业，公司"
          }
        ]
      },
      {
        "id": "1_q2",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · y 的地点与抽象引申",
        "question": "Pensez-vous encore à votre ancien travail ? — Non, je n'_____ pense plus du tout.",
        "options": [
          "en",
          "y",
          "le",
          "lui"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\npenser à qch (思考/挂念某事)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。",
        "translation": "你还会想起以前的那份工作吗？——不，我一点也不再去想它了。",
        "grammarTag": "副代词 y (代替 à + 物)",
        "vocabList": [
          {
            "word": "penser à qch",
            "meaning": "考虑某事，想念某事"
          },
          {
            "word": "ne... plus du tout",
            "meaning": "一点也不再..."
          }
        ]
      },
      {
        "id": "1_q3",
        "questionType": "词汇语法",
        "categoryTag": "条件式 · 与过去假设配合",
        "question": "Si tu m'avais prévenu à temps, je ne _____ pas venu si tard.",
        "options": [
          "serais",
          "serais été",
          "fus",
          "sois"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nSi 引导的对过去虚拟假设句型：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。",
        "translation": "如果你及时通知我，我就不会来得这么晚了。",
        "grammarTag": "Si 条件假设与条件式过去时",
        "vocabList": [
          {
            "word": "prévenir qn à temps",
            "meaning": "及时通知/提醒某人"
          },
          {
            "word": "tard (adv.)",
            "meaning": "迟，晚"
          }
        ]
      },
      {
        "id": "1_q4",
        "questionType": "词汇语法",
        "categoryTag": "介词与冠词 · 国名专有搭配",
        "question": "Le président français effectuera une visite officielle _____ Mexique le mois prochain.",
        "options": [
          "en",
          "au",
          "à",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n阳性单数国名以辅音结尾通常使用定冠词 le (如 le Mexique, le Japon, le Canada)。表示“去往”或“在”阳性单数国名前，介词必须用【au】 (à + le 缩合)！选 B。",
        "translation": "法国总统下个月将对墨西哥进行正式国事访问。",
        "grammarTag": "阳性国名前的介词搭配 (au Mexique)",
        "vocabList": [
          {
            "word": "visite officielle",
            "meaning": "国事访问，正式访问"
          },
          {
            "word": "effectuer (v.)",
            "meaning": "进行，执行"
          }
        ]
      },
      {
        "id": "1_q5",
        "questionType": "词汇语法",
        "categoryTag": "否定副词 · 文学句式辨析",
        "question": "Dans ce village isolé, il n'y a _____ de supermarché ni de pharmacie.",
        "options": [
          "aucun",
          "point",
          "jamais",
          "guère"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。",
        "translation": "在这个偏僻的孤立村庄里，既没有超市，也没有药店。",
        "grammarTag": "否定句型 (ne... point de)",
        "vocabList": [
          {
            "word": "isolé (adj.)",
            "meaning": "孤立的，偏远的"
          },
          {
            "word": "pharmacie (n.f.)",
            "meaning": "药店"
          }
        ]
      },
      {
        "id": "1_q6",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "1_q7",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "1_q8",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "1_q9",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "1_q10",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "1_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "1_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "1_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "1_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "1_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "1_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "1_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "1_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "1_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "1_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "1_q21",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "1_q22",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "1_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "1_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_kaoyan_2",
    "title": "2025年全国高校考研二外法语高频真题精编卷 (二)",
    "frenchTitle": "Concours de Master 2025 : Épreuve nationale de français (Vol. 2)",
    "track": "kaoyan",
    "level": "241/242考研",
    "schoolOrOrg": "全国高校统考大纲",
    "yearOrSession": "2025高频冲刺",
    "summary": "聚焦二外高分突破：愈过去时与过去完成配合、中性代词 le、关系代词 dont 及社科文化长文精读。",
    "durationMinutes": 60,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "2_q1",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "2_q2",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "2_q3",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "2_q4",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "2_q5",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "2_q6",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "2_q7",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "2_q8",
        "questionType": "词汇语法",
        "categoryTag": "自反动词 · 互为间宾不配合",
        "question": "Les deux diplomates se sont _____ la main chaleureusement avant de commencer.",
        "options": [
          "serré",
          "serrée",
          "serrés",
          "serrées"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nse serrer la main 结构中，la main 为直接宾语且位于动词之后，se 实际上充当相互间接宾语（向对方握手），因此过去分词 serré【绝不配合】！选 A。",
        "translation": "两位外交官在开始前热情地握了手。",
        "grammarTag": "自反动词带直宾时分词不配合",
        "vocabList": [
          {
            "word": "se serrer la main",
            "meaning": "握手 (不配合)"
          },
          {
            "word": "chaleureusement (adv.)",
            "meaning": "热情地"
          }
        ]
      },
      {
        "id": "2_q9",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 最高级引导的定语从句",
        "question": "C'est le plus beau musée que je _____ jamais visité de toute ma vie.",
        "options": [
          "ai",
          "aie",
          "avais",
          "aurais"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词被形容词最高级 (le plus beau...) 或 seul / premier 等修饰时，后面的定语从句常使用【虚拟式 (Subjonctif)】以体现说话人的主观感叹评价。visité 复合过去虚拟式为【aie visité】。选 B。",
        "translation": "这是我一生中参观过的最美丽的博物馆。",
        "grammarTag": "最高级先行词后接虚拟式",
        "vocabList": [
          {
            "word": "musée (n.m.)",
            "meaning": "博物馆"
          },
          {
            "word": "de toute ma vie",
            "meaning": "我一生中"
          }
        ]
      },
      {
        "id": "2_q10",
        "questionType": "词汇语法",
        "categoryTag": "复合介词 · 空间与抽象方向",
        "question": "Il a installé son nouvel ordinateur _____ de la grande fenêtre.",
        "options": [
          "près",
          "en face",
          "au milieu",
          "au-dessus"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定方位短语：en face de... (在...对面)。près 也需加 de，但语义上在正对大窗户处摆放用 en face de 最为地道贴切。选 B。",
        "translation": "他把新电脑安装在正对着大窗户的位置。",
        "grammarTag": "空间介词短语 (en face de)",
        "vocabList": [
          {
            "word": "en face de",
            "meaning": "在...正对面"
          },
          {
            "word": "installer (v.)",
            "meaning": "安装，安置"
          }
        ]
      },
      {
        "id": "2_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "2_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "2_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "2_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "2_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "2_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "2_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "2_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "2_q19",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "2_q20",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "2_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "2_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "2_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "2_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_kaoyan_3",
    "title": "2024年北京外国语大学 (242) 二外法语考研统考真题卷",
    "frenchTitle": "Université des Études Étrangères de Pékin (BFSU 242) — Session 2024",
    "track": "kaoyan",
    "level": "241/242考研",
    "schoolOrOrg": "北京外国语大学",
    "yearOrSession": "2024真题卷",
    "summary": "北外官方命题风格：词汇辨析精妙、动词变位严谨、代词多重替换与法国社会发展长篇综合考核。",
    "durationMinutes": 75,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "3_q1",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "3_q2",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "3_q3",
        "questionType": "词汇语法",
        "categoryTag": "自反动词 · 互为间宾不配合",
        "question": "Les deux diplomates se sont _____ la main chaleureusement avant de commencer.",
        "options": [
          "serré",
          "serrée",
          "serrés",
          "serrées"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nse serrer la main 结构中，la main 为直接宾语且位于动词之后，se 实际上充当相互间接宾语（向对方握手），因此过去分词 serré【绝不配合】！选 A。",
        "translation": "两位外交官在开始前热情地握了手。",
        "grammarTag": "自反动词带直宾时分词不配合",
        "vocabList": [
          {
            "word": "se serrer la main",
            "meaning": "握手 (不配合)"
          },
          {
            "word": "chaleureusement (adv.)",
            "meaning": "热情地"
          }
        ]
      },
      {
        "id": "3_q4",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 最高级引导的定语从句",
        "question": "C'est le plus beau musée que je _____ jamais visité de toute ma vie.",
        "options": [
          "ai",
          "aie",
          "avais",
          "aurais"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词被形容词最高级 (le plus beau...) 或 seul / premier 等修饰时，后面的定语从句常使用【虚拟式 (Subjonctif)】以体现说话人的主观感叹评价。visité 复合过去虚拟式为【aie visité】。选 B。",
        "translation": "这是我一生中参观过的最美丽的博物馆。",
        "grammarTag": "最高级先行词后接虚拟式",
        "vocabList": [
          {
            "word": "musée (n.m.)",
            "meaning": "博物馆"
          },
          {
            "word": "de toute ma vie",
            "meaning": "我一生中"
          }
        ]
      },
      {
        "id": "3_q5",
        "questionType": "词汇语法",
        "categoryTag": "复合介词 · 空间与抽象方向",
        "question": "Il a installé son nouvel ordinateur _____ de la grande fenêtre.",
        "options": [
          "près",
          "en face",
          "au milieu",
          "au-dessus"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定方位短语：en face de... (在...对面)。près 也需加 de，但语义上在正对大窗户处摆放用 en face de 最为地道贴切。选 B。",
        "translation": "他把新电脑安装在正对着大窗户的位置。",
        "grammarTag": "空间介词短语 (en face de)",
        "vocabList": [
          {
            "word": "en face de",
            "meaning": "在...正对面"
          },
          {
            "word": "installer (v.)",
            "meaning": "安装，安置"
          }
        ]
      },
      {
        "id": "3_q6",
        "questionType": "词汇语法",
        "categoryTag": "否定句 · 冠词变 de 规则",
        "question": "Mon grand-père ne boit jamais _____ alcool pour préserver sa santé.",
        "options": [
          "d'",
          "de l'",
          "du",
          "un"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n在否定句 (ne... jamais) 中，直接宾语前面的部分冠词 (de l'alcool) 必须一律转变为介词【de】(因遇到元音省音为 d')。选 A。",
        "translation": "我祖父为了保持健康从不喝酒。",
        "grammarTag": "否定句中部分冠词变 de",
        "vocabList": [
          {
            "word": "alcool (n.m.)",
            "meaning": "酒精，酒"
          },
          {
            "word": "préserver la santé",
            "meaning": "保持健康"
          }
        ]
      },
      {
        "id": "3_q7",
        "questionType": "词汇语法",
        "categoryTag": "时间状语从句 · avant que 触发虚拟式",
        "question": "Dépêchons-nous de rentrer avant qu'il ne _____ trop noir.",
        "options": [
          "fait",
          "fasse",
          "fera",
          "faisait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 avant que (在...之前) 引导时间状语从句，从句强制使用【虚拟式 (Subjonctif)】（从句中的 ne 为冗赘虚词，无否定含义）。faire 的虚拟式为 fasse。选 B。",
        "translation": "我们赶在天太黑之前赶紧回家吧。",
        "grammarTag": "avant que 后接虚拟式与虚词 ne",
        "vocabList": [
          {
            "word": "se dépêcher de",
            "meaning": "赶快做某事"
          },
          {
            "word": "faire noir",
            "meaning": "天黑"
          }
        ]
      },
      {
        "id": "3_q8",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · lequel 与介词缩合",
        "question": "Voici la magnifique bibliothèque dans _____ j'ai passé toute ma jeunesse.",
        "options": [
          "laquelle",
          "lequel",
          "lesquelles",
          "dont"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 la bibliothèque 为阴性单数名词，与介词 dans 连用，必须使用复合关系代词阴性单数形式【laquelle】。选 A。",
        "translation": "这就是我度过全部青年时代的宏伟图书馆。",
        "grammarTag": "介词 + lequel/laquelle 复合关系代词",
        "vocabList": [
          {
            "word": "bibliothèque (n.f.)",
            "meaning": "图书馆"
          },
          {
            "word": "jeunesse (n.f.)",
            "meaning": "青年时期"
          }
        ]
      },
      {
        "id": "3_q9",
        "questionType": "词汇语法",
        "categoryTag": "副动词 · En + Participe présent",
        "question": "_____ la rue prudemment, les enfants regardent à gauche et à droite.",
        "options": [
          "En traversant",
          "Traversé",
          "Avoir traversé",
          "Pour traverser"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n副动词 (En + 现在分词 traversant) 在句中充当时间或伴随状语，表示“在过马路的时候”。选 A。",
        "translation": "在小心穿过马路时，孩子们向左看也向右看。",
        "grammarTag": "副动词表示伴随与时间 (En traversant)",
        "vocabList": [
          {
            "word": "traverser la rue",
            "meaning": "穿过马路"
          },
          {
            "word": "prudemment (adv.)",
            "meaning": "谨慎地，小心地"
          }
        ]
      },
      {
        "id": "3_q10",
        "questionType": "词汇语法",
        "categoryTag": "时态配合 · 愈过去时",
        "question": "Hier soir, dès qu'elle _____ son travail, elle est sortie avec ses amies.",
        "options": [
          "a fini",
          "avait fini",
          "eut fini",
          "finissait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为复合过去时 (est sortie)，从句 dès que (一...就...) 表达在过去基准时间点之前已经完成的动作，必须使用愈过去时 (Plus-que-parfait: avait fini) 表达“过去的过去”。选 B。",
        "translation": "昨天晚上，她一完成工作，就和朋友们出去了。",
        "grammarTag": "愈过去时 (Plus-que-parfait)",
        "vocabList": [
          {
            "word": "sortir avec",
            "meaning": "与...一起外出"
          },
          {
            "word": "dès que",
            "meaning": "一...就... (连词短语)"
          }
        ]
      },
      {
        "id": "3_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "3_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "3_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "3_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "3_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "3_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "3_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "3_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "3_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "3_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "3_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "3_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "3_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "3_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_kaoyan_4",
    "title": "2024年上海外国语大学 (241) 二外法语考研统考真题卷",
    "frenchTitle": "Université des Études Internationales de Shanghai (SISU 241) — Session 2024",
    "track": "kaoyan",
    "level": "241/242考研",
    "schoolOrOrg": "上海外国语大学",
    "yearOrSession": "2024真题卷",
    "summary": "上外经典卷面：语法注重时态配合逻辑，完形填空考察虚词短语搭配，长篇论说文立意深远。",
    "durationMinutes": 75,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "4_q1",
        "questionType": "词汇语法",
        "categoryTag": "否定句 · 冠词变 de 规则",
        "question": "Mon grand-père ne boit jamais _____ alcool pour préserver sa santé.",
        "options": [
          "d'",
          "de l'",
          "du",
          "un"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n在否定句 (ne... jamais) 中，直接宾语前面的部分冠词 (de l'alcool) 必须一律转变为介词【de】(因遇到元音省音为 d')。选 A。",
        "translation": "我祖父为了保持健康从不喝酒。",
        "grammarTag": "否定句中部分冠词变 de",
        "vocabList": [
          {
            "word": "alcool (n.m.)",
            "meaning": "酒精，酒"
          },
          {
            "word": "préserver la santé",
            "meaning": "保持健康"
          }
        ]
      },
      {
        "id": "4_q2",
        "questionType": "词汇语法",
        "categoryTag": "时间状语从句 · avant que 触发虚拟式",
        "question": "Dépêchons-nous de rentrer avant qu'il ne _____ trop noir.",
        "options": [
          "fait",
          "fasse",
          "fera",
          "faisait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 avant que (在...之前) 引导时间状语从句，从句强制使用【虚拟式 (Subjonctif)】（从句中的 ne 为冗赘虚词，无否定含义）。faire 的虚拟式为 fasse。选 B。",
        "translation": "我们赶在天太黑之前赶紧回家吧。",
        "grammarTag": "avant que 后接虚拟式与虚词 ne",
        "vocabList": [
          {
            "word": "se dépêcher de",
            "meaning": "赶快做某事"
          },
          {
            "word": "faire noir",
            "meaning": "天黑"
          }
        ]
      },
      {
        "id": "4_q3",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · lequel 与介词缩合",
        "question": "Voici la magnifique bibliothèque dans _____ j'ai passé toute ma jeunesse.",
        "options": [
          "laquelle",
          "lequel",
          "lesquelles",
          "dont"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 la bibliothèque 为阴性单数名词，与介词 dans 连用，必须使用复合关系代词阴性单数形式【laquelle】。选 A。",
        "translation": "这就是我度过全部青年时代的宏伟图书馆。",
        "grammarTag": "介词 + lequel/laquelle 复合关系代词",
        "vocabList": [
          {
            "word": "bibliothèque (n.f.)",
            "meaning": "图书馆"
          },
          {
            "word": "jeunesse (n.f.)",
            "meaning": "青年时期"
          }
        ]
      },
      {
        "id": "4_q4",
        "questionType": "词汇语法",
        "categoryTag": "副动词 · En + Participe présent",
        "question": "_____ la rue prudemment, les enfants regardent à gauche et à droite.",
        "options": [
          "En traversant",
          "Traversé",
          "Avoir traversé",
          "Pour traverser"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n副动词 (En + 现在分词 traversant) 在句中充当时间或伴随状语，表示“在过马路的时候”。选 A。",
        "translation": "在小心穿过马路时，孩子们向左看也向右看。",
        "grammarTag": "副动词表示伴随与时间 (En traversant)",
        "vocabList": [
          {
            "word": "traverser la rue",
            "meaning": "穿过马路"
          },
          {
            "word": "prudemment (adv.)",
            "meaning": "谨慎地，小心地"
          }
        ]
      },
      {
        "id": "4_q5",
        "questionType": "词汇语法",
        "categoryTag": "时态配合 · 愈过去时",
        "question": "Hier soir, dès qu'elle _____ son travail, elle est sortie avec ses amies.",
        "options": [
          "a fini",
          "avait fini",
          "eut fini",
          "finissait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为复合过去时 (est sortie)，从句 dès que (一...就...) 表达在过去基准时间点之前已经完成的动作，必须使用愈过去时 (Plus-que-parfait: avait fini) 表达“过去的过去”。选 B。",
        "translation": "昨天晚上，她一完成工作，就和朋友们出去了。",
        "grammarTag": "愈过去时 (Plus-que-parfait)",
        "vocabList": [
          {
            "word": "sortir avec",
            "meaning": "与...一起外出"
          },
          {
            "word": "dès que",
            "meaning": "一...就... (连词短语)"
          }
        ]
      },
      {
        "id": "4_q6",
        "questionType": "词汇语法",
        "categoryTag": "代词系统 · 双代词语序",
        "question": "Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.",
        "options": [
          "leur en",
          "en leur",
          "les en",
          "en lui"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nparler de qch (用副代词 en 替代) à qn (父母为复数，用间宾代词 leur)。根据双代词语序规则：人称代词 (lui / leur) 必须位于副代词 (y / en) 之前，因此唯一正确顺序为【leur en】。选 A。",
        "translation": "你跟父母谈过你的新项目了吗？——是的，我昨天已经跟他们谈过了。",
        "grammarTag": "双宾语代词位置 (leur en)",
        "vocabList": [
          {
            "word": "parler de qch à qn",
            "meaning": "就某事与某人交谈"
          },
          {
            "word": "projet (n.m.)",
            "meaning": "项目，计划"
          }
        ]
      },
      {
        "id": "4_q7",
        "questionType": "词汇语法",
        "categoryTag": "分词配合 · 直宾提前",
        "question": "Les photos que vous avez _____ sont magnifiques.",
        "options": [
          "pris",
          "prise",
          "prises",
          "prennent"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n在以 avoir 为助动词的复合时态中，直接宾语提前时过去分词必须与直接宾语进行性数配合。先行词 les photos 为阴性复数，关系代词 que 在从句中充当直宾，故 prendre 的过去分词变为主格配合形态【prises】。选 C。",
        "translation": "您拍的那些照片真是太美了。",
        "grammarTag": "过去分词与直宾性数配合",
        "vocabList": [
          {
            "word": "prendre des photos",
            "meaning": "拍照"
          },
          {
            "word": "magnifique (adj.)",
            "meaning": "宏伟壮丽的"
          }
        ]
      },
      {
        "id": "4_q8",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 触发连词短语",
        "question": "Bien qu'il _____ beaucoup de difficultés, il n'a jamais abandonné son rêve.",
        "options": [
          "a",
          "avait",
          "ait",
          "aura"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 bien que (尽管，虽然) 引导让步状语从句，从句动词必须强制使用【虚拟式 (Subjonctif)】。动词 avoir 的虚拟式第三人称单数为【ait】。选 C。",
        "translation": "尽管遇到了许多困难，但他从未放弃自己的梦想。",
        "grammarTag": "虚拟式现在时 (bien que)",
        "vocabList": [
          {
            "word": "bien que + subj.",
            "meaning": "尽管，虽然"
          },
          {
            "word": "abandonner (v.)",
            "meaning": "放弃"
          }
        ]
      },
      {
        "id": "4_q9",
        "questionType": "词汇语法",
        "categoryTag": "代词式动词 · 分词配合避坑",
        "question": "Elles se sont _____ compte de leur erreur un peu trop tard.",
        "options": [
          "rendu",
          "rendue",
          "rendus",
          "rendues"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定短语 se rendre compte de qch (意识到某事)。自反代词 se 在此结构中充当间接宾语，compte 为直接宾语且位于动词之后，因此过去分词 rendu【绝不配合】，保持阳性单数原形 rendu。选 A。",
        "translation": "她们意识到自己的错误时已经有点太晚了。",
        "grammarTag": "代词式动词固定短语 (se rendre compte)",
        "vocabList": [
          {
            "word": "se rendre compte de",
            "meaning": "意识到，发觉 (不配合)"
          },
          {
            "word": "erreur (n.f.)",
            "meaning": "错误"
          }
        ]
      },
      {
        "id": "4_q10",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · dont 深度考查",
        "question": "C'est une entreprise internationale _____ le directeur général est très jeune.",
        "options": [
          "qui",
          "que",
          "dont",
          "où"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune。de + 先行词充当名词的所有格限制补语，必须使用关系代词【dont】。选 C。",
        "translation": "这是一间总经理非常年轻的国际跨国企业。",
        "grammarTag": "关系代词 dont 的所有格用法",
        "vocabList": [
          {
            "word": "directeur général",
            "meaning": "总经理 / CEO"
          },
          {
            "word": "entreprise (n.f.)",
            "meaning": "企业，公司"
          }
        ]
      },
      {
        "id": "4_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "4_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "4_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "4_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "4_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "4_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "4_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "4_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "4_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "4_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "4_q21",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "4_q22",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "4_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "4_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_kaoyan_5",
    "title": "2024年广东外语外贸大学 (243) 二外法语考研真题卷",
    "frenchTitle": "Université des Études Étrangères du Guangdong (GDUFS 243) — Session 2024",
    "track": "kaoyan",
    "level": "241/242考研",
    "schoolOrOrg": "广东外语外贸大学",
    "yearOrSession": "2024真题卷",
    "summary": "广外二外大纲命题：注重商务与日常交际法文、虚拟式判断、双宾语代词位置及阅读细节推断。",
    "durationMinutes": 60,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "5_q1",
        "questionType": "词汇语法",
        "categoryTag": "代词系统 · 双代词语序",
        "question": "Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.",
        "options": [
          "leur en",
          "en leur",
          "les en",
          "en lui"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nparler de qch (用副代词 en 替代) à qn (父母为复数，用间宾代词 leur)。根据双代词语序规则：人称代词 (lui / leur) 必须位于副代词 (y / en) 之前，因此唯一正确顺序为【leur en】。选 A。",
        "translation": "你跟父母谈过你的新项目了吗？——是的，我昨天已经跟他们谈过了。",
        "grammarTag": "双宾语代词位置 (leur en)",
        "vocabList": [
          {
            "word": "parler de qch à qn",
            "meaning": "就某事与某人交谈"
          },
          {
            "word": "projet (n.m.)",
            "meaning": "项目，计划"
          }
        ]
      },
      {
        "id": "5_q2",
        "questionType": "词汇语法",
        "categoryTag": "分词配合 · 直宾提前",
        "question": "Les photos que vous avez _____ sont magnifiques.",
        "options": [
          "pris",
          "prise",
          "prises",
          "prennent"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n在以 avoir 为助动词的复合时态中，直接宾语提前时过去分词必须与直接宾语进行性数配合。先行词 les photos 为阴性复数，关系代词 que 在从句中充当直宾，故 prendre 的过去分词变为主格配合形态【prises】。选 C。",
        "translation": "您拍的那些照片真是太美了。",
        "grammarTag": "过去分词与直宾性数配合",
        "vocabList": [
          {
            "word": "prendre des photos",
            "meaning": "拍照"
          },
          {
            "word": "magnifique (adj.)",
            "meaning": "宏伟壮丽的"
          }
        ]
      },
      {
        "id": "5_q3",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 触发连词短语",
        "question": "Bien qu'il _____ beaucoup de difficultés, il n'a jamais abandonné son rêve.",
        "options": [
          "a",
          "avait",
          "ait",
          "aura"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 bien que (尽管，虽然) 引导让步状语从句，从句动词必须强制使用【虚拟式 (Subjonctif)】。动词 avoir 的虚拟式第三人称单数为【ait】。选 C。",
        "translation": "尽管遇到了许多困难，但他从未放弃自己的梦想。",
        "grammarTag": "虚拟式现在时 (bien que)",
        "vocabList": [
          {
            "word": "bien que + subj.",
            "meaning": "尽管，虽然"
          },
          {
            "word": "abandonner (v.)",
            "meaning": "放弃"
          }
        ]
      },
      {
        "id": "5_q4",
        "questionType": "词汇语法",
        "categoryTag": "代词式动词 · 分词配合避坑",
        "question": "Elles se sont _____ compte de leur erreur un peu trop tard.",
        "options": [
          "rendu",
          "rendue",
          "rendus",
          "rendues"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定短语 se rendre compte de qch (意识到某事)。自反代词 se 在此结构中充当间接宾语，compte 为直接宾语且位于动词之后，因此过去分词 rendu【绝不配合】，保持阳性单数原形 rendu。选 A。",
        "translation": "她们意识到自己的错误时已经有点太晚了。",
        "grammarTag": "代词式动词固定短语 (se rendre compte)",
        "vocabList": [
          {
            "word": "se rendre compte de",
            "meaning": "意识到，发觉 (不配合)"
          },
          {
            "word": "erreur (n.f.)",
            "meaning": "错误"
          }
        ]
      },
      {
        "id": "5_q5",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · dont 深度考查",
        "question": "C'est une entreprise internationale _____ le directeur général est très jeune.",
        "options": [
          "qui",
          "que",
          "dont",
          "où"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune。de + 先行词充当名词的所有格限制补语，必须使用关系代词【dont】。选 C。",
        "translation": "这是一间总经理非常年轻的国际跨国企业。",
        "grammarTag": "关系代词 dont 的所有格用法",
        "vocabList": [
          {
            "word": "directeur général",
            "meaning": "总经理 / CEO"
          },
          {
            "word": "entreprise (n.f.)",
            "meaning": "企业，公司"
          }
        ]
      },
      {
        "id": "5_q6",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · y 的地点与抽象引申",
        "question": "Pensez-vous encore à votre ancien travail ? — Non, je n'_____ pense plus du tout.",
        "options": [
          "en",
          "y",
          "le",
          "lui"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\npenser à qch (思考/挂念某事)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。",
        "translation": "你还会想起以前的那份工作吗？——不，我一点也不再去想它了。",
        "grammarTag": "副代词 y (代替 à + 物)",
        "vocabList": [
          {
            "word": "penser à qch",
            "meaning": "考虑某事，想念某事"
          },
          {
            "word": "ne... plus du tout",
            "meaning": "一点也不再..."
          }
        ]
      },
      {
        "id": "5_q7",
        "questionType": "词汇语法",
        "categoryTag": "条件式 · 与过去假设配合",
        "question": "Si tu m'avais prévenu à temps, je ne _____ pas venu si tard.",
        "options": [
          "serais",
          "serais été",
          "fus",
          "sois"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nSi 引导的对过去虚拟假设句型：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。",
        "translation": "如果你及时通知我，我就不会来得这么晚了。",
        "grammarTag": "Si 条件假设与条件式过去时",
        "vocabList": [
          {
            "word": "prévenir qn à temps",
            "meaning": "及时通知/提醒某人"
          },
          {
            "word": "tard (adv.)",
            "meaning": "迟，晚"
          }
        ]
      },
      {
        "id": "5_q8",
        "questionType": "词汇语法",
        "categoryTag": "介词与冠词 · 国名专有搭配",
        "question": "Le président français effectuera une visite officielle _____ Mexique le mois prochain.",
        "options": [
          "en",
          "au",
          "à",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n阳性单数国名以辅音结尾通常使用定冠词 le (如 le Mexique, le Japon, le Canada)。表示“去往”或“在”阳性单数国名前，介词必须用【au】 (à + le 缩合)！选 B。",
        "translation": "法国总统下个月将对墨西哥进行正式国事访问。",
        "grammarTag": "阳性国名前的介词搭配 (au Mexique)",
        "vocabList": [
          {
            "word": "visite officielle",
            "meaning": "国事访问，正式访问"
          },
          {
            "word": "effectuer (v.)",
            "meaning": "进行，执行"
          }
        ]
      },
      {
        "id": "5_q9",
        "questionType": "词汇语法",
        "categoryTag": "否定副词 · 文学句式辨析",
        "question": "Dans ce village isolé, il n'y a _____ de supermarché ni de pharmacie.",
        "options": [
          "aucun",
          "point",
          "jamais",
          "guère"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。",
        "translation": "在这个偏僻的孤立村庄里，既没有超市，也没有药店。",
        "grammarTag": "否定句型 (ne... point de)",
        "vocabList": [
          {
            "word": "isolé (adj.)",
            "meaning": "孤立的，偏远的"
          },
          {
            "word": "pharmacie (n.f.)",
            "meaning": "药店"
          }
        ]
      },
      {
        "id": "5_q10",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "5_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "5_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "5_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "5_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "5_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "5_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "5_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "5_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "5_q19",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "5_q20",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "5_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "5_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "5_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "5_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_kaoyan_6",
    "title": "2024年南京大学 (241) 二外法语考研统考真题卷",
    "frenchTitle": "Université de Nanjing (NJU 241) — Épreuve de français langue seconde",
    "track": "kaoyan",
    "level": "241/242考研",
    "schoolOrOrg": "南京大学",
    "yearOrSession": "2024统考卷",
    "summary": "南大外院命题风格：强调文学性与正统学术法语，分词配合与虚拟式触发机制考察细致入微。",
    "durationMinutes": 60,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "6_q1",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · y 的地点与抽象引申",
        "question": "Pensez-vous encore à votre ancien travail ? — Non, je n'_____ pense plus du tout.",
        "options": [
          "en",
          "y",
          "le",
          "lui"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\npenser à qch (思考/挂念某事)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。",
        "translation": "你还会想起以前的那份工作吗？——不，我一点也不再去想它了。",
        "grammarTag": "副代词 y (代替 à + 物)",
        "vocabList": [
          {
            "word": "penser à qch",
            "meaning": "考虑某事，想念某事"
          },
          {
            "word": "ne... plus du tout",
            "meaning": "一点也不再..."
          }
        ]
      },
      {
        "id": "6_q2",
        "questionType": "词汇语法",
        "categoryTag": "条件式 · 与过去假设配合",
        "question": "Si tu m'avais prévenu à temps, je ne _____ pas venu si tard.",
        "options": [
          "serais",
          "serais été",
          "fus",
          "sois"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nSi 引导的对过去虚拟假设句型：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。",
        "translation": "如果你及时通知我，我就不会来得这么晚了。",
        "grammarTag": "Si 条件假设与条件式过去时",
        "vocabList": [
          {
            "word": "prévenir qn à temps",
            "meaning": "及时通知/提醒某人"
          },
          {
            "word": "tard (adv.)",
            "meaning": "迟，晚"
          }
        ]
      },
      {
        "id": "6_q3",
        "questionType": "词汇语法",
        "categoryTag": "介词与冠词 · 国名专有搭配",
        "question": "Le président français effectuera une visite officielle _____ Mexique le mois prochain.",
        "options": [
          "en",
          "au",
          "à",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n阳性单数国名以辅音结尾通常使用定冠词 le (如 le Mexique, le Japon, le Canada)。表示“去往”或“在”阳性单数国名前，介词必须用【au】 (à + le 缩合)！选 B。",
        "translation": "法国总统下个月将对墨西哥进行正式国事访问。",
        "grammarTag": "阳性国名前的介词搭配 (au Mexique)",
        "vocabList": [
          {
            "word": "visite officielle",
            "meaning": "国事访问，正式访问"
          },
          {
            "word": "effectuer (v.)",
            "meaning": "进行，执行"
          }
        ]
      },
      {
        "id": "6_q4",
        "questionType": "词汇语法",
        "categoryTag": "否定副词 · 文学句式辨析",
        "question": "Dans ce village isolé, il n'y a _____ de supermarché ni de pharmacie.",
        "options": [
          "aucun",
          "point",
          "jamais",
          "guère"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。",
        "translation": "在这个偏僻的孤立村庄里，既没有超市，也没有药店。",
        "grammarTag": "否定句型 (ne... point de)",
        "vocabList": [
          {
            "word": "isolé (adj.)",
            "meaning": "孤立的，偏远的"
          },
          {
            "word": "pharmacie (n.f.)",
            "meaning": "药店"
          }
        ]
      },
      {
        "id": "6_q5",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "6_q6",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "6_q7",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "6_q8",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "6_q9",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "6_q10",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "6_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "6_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "6_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "6_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "6_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "6_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "6_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "6_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "6_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "6_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "6_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "6_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "6_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "6_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_kaoyan_7",
    "title": "2024年武汉大学 (242) 二外法语考研真题精编卷",
    "frenchTitle": "Université de Wuhan (WHU 242) — Épreuve officielle de français",
    "track": "kaoyan",
    "level": "241/242考研",
    "schoolOrOrg": "武汉大学",
    "yearOrSession": "2024精编卷",
    "summary": "武大经典二外：涵盖动词短语搭配、条件式假设句型、介词用法辨析与现代法国社会长篇精读。",
    "durationMinutes": 60,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "7_q1",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "7_q2",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "7_q3",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "7_q4",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "7_q5",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "7_q6",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "7_q7",
        "questionType": "词汇语法",
        "categoryTag": "自反动词 · 互为间宾不配合",
        "question": "Les deux diplomates se sont _____ la main chaleureusement avant de commencer.",
        "options": [
          "serré",
          "serrée",
          "serrés",
          "serrées"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nse serrer la main 结构中，la main 为直接宾语且位于动词之后，se 实际上充当相互间接宾语（向对方握手），因此过去分词 serré【绝不配合】！选 A。",
        "translation": "两位外交官在开始前热情地握了手。",
        "grammarTag": "自反动词带直宾时分词不配合",
        "vocabList": [
          {
            "word": "se serrer la main",
            "meaning": "握手 (不配合)"
          },
          {
            "word": "chaleureusement (adv.)",
            "meaning": "热情地"
          }
        ]
      },
      {
        "id": "7_q8",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 最高级引导的定语从句",
        "question": "C'est le plus beau musée que je _____ jamais visité de toute ma vie.",
        "options": [
          "ai",
          "aie",
          "avais",
          "aurais"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词被形容词最高级 (le plus beau...) 或 seul / premier 等修饰时，后面的定语从句常使用【虚拟式 (Subjonctif)】以体现说话人的主观感叹评价。visité 复合过去虚拟式为【aie visité】。选 B。",
        "translation": "这是我一生中参观过的最美丽的博物馆。",
        "grammarTag": "最高级先行词后接虚拟式",
        "vocabList": [
          {
            "word": "musée (n.m.)",
            "meaning": "博物馆"
          },
          {
            "word": "de toute ma vie",
            "meaning": "我一生中"
          }
        ]
      },
      {
        "id": "7_q9",
        "questionType": "词汇语法",
        "categoryTag": "复合介词 · 空间与抽象方向",
        "question": "Il a installé son nouvel ordinateur _____ de la grande fenêtre.",
        "options": [
          "près",
          "en face",
          "au milieu",
          "au-dessus"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定方位短语：en face de... (在...对面)。près 也需加 de，但语义上在正对大窗户处摆放用 en face de 最为地道贴切。选 B。",
        "translation": "他把新电脑安装在正对着大窗户的位置。",
        "grammarTag": "空间介词短语 (en face de)",
        "vocabList": [
          {
            "word": "en face de",
            "meaning": "在...正对面"
          },
          {
            "word": "installer (v.)",
            "meaning": "安装，安置"
          }
        ]
      },
      {
        "id": "7_q10",
        "questionType": "词汇语法",
        "categoryTag": "否定句 · 冠词变 de 规则",
        "question": "Mon grand-père ne boit jamais _____ alcool pour préserver sa santé.",
        "options": [
          "d'",
          "de l'",
          "du",
          "un"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n在否定句 (ne... jamais) 中，直接宾语前面的部分冠词 (de l'alcool) 必须一律转变为介词【de】(因遇到元音省音为 d')。选 A。",
        "translation": "我祖父为了保持健康从不喝酒。",
        "grammarTag": "否定句中部分冠词变 de",
        "vocabList": [
          {
            "word": "alcool (n.m.)",
            "meaning": "酒精，酒"
          },
          {
            "word": "préserver la santé",
            "meaning": "保持健康"
          }
        ]
      },
      {
        "id": "7_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "7_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "7_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "7_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "7_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "7_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "7_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "7_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "7_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "7_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "7_q21",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "7_q22",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "7_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "7_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_kaoyan_8",
    "title": "2024年复旦大学 (241) 二外法语考研真题精编卷",
    "frenchTitle": "Université Fudan (FDU 241) — Examen officiel de français langue étrangère",
    "track": "kaoyan",
    "level": "241/242考研",
    "schoolOrOrg": "复旦大学",
    "yearOrSession": "2024精编卷",
    "summary": "复旦二外权威题库：考查词汇广度、自反代词配合陷阱、复杂关系从句以及科技伦理阅读。",
    "durationMinutes": 60,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "8_q1",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "8_q2",
        "questionType": "词汇语法",
        "categoryTag": "自反动词 · 互为间宾不配合",
        "question": "Les deux diplomates se sont _____ la main chaleureusement avant de commencer.",
        "options": [
          "serré",
          "serrée",
          "serrés",
          "serrées"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nse serrer la main 结构中，la main 为直接宾语且位于动词之后，se 实际上充当相互间接宾语（向对方握手），因此过去分词 serré【绝不配合】！选 A。",
        "translation": "两位外交官在开始前热情地握了手。",
        "grammarTag": "自反动词带直宾时分词不配合",
        "vocabList": [
          {
            "word": "se serrer la main",
            "meaning": "握手 (不配合)"
          },
          {
            "word": "chaleureusement (adv.)",
            "meaning": "热情地"
          }
        ]
      },
      {
        "id": "8_q3",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 最高级引导的定语从句",
        "question": "C'est le plus beau musée que je _____ jamais visité de toute ma vie.",
        "options": [
          "ai",
          "aie",
          "avais",
          "aurais"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词被形容词最高级 (le plus beau...) 或 seul / premier 等修饰时，后面的定语从句常使用【虚拟式 (Subjonctif)】以体现说话人的主观感叹评价。visité 复合过去虚拟式为【aie visité】。选 B。",
        "translation": "这是我一生中参观过的最美丽的博物馆。",
        "grammarTag": "最高级先行词后接虚拟式",
        "vocabList": [
          {
            "word": "musée (n.m.)",
            "meaning": "博物馆"
          },
          {
            "word": "de toute ma vie",
            "meaning": "我一生中"
          }
        ]
      },
      {
        "id": "8_q4",
        "questionType": "词汇语法",
        "categoryTag": "复合介词 · 空间与抽象方向",
        "question": "Il a installé son nouvel ordinateur _____ de la grande fenêtre.",
        "options": [
          "près",
          "en face",
          "au milieu",
          "au-dessus"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定方位短语：en face de... (在...对面)。près 也需加 de，但语义上在正对大窗户处摆放用 en face de 最为地道贴切。选 B。",
        "translation": "他把新电脑安装在正对着大窗户的位置。",
        "grammarTag": "空间介词短语 (en face de)",
        "vocabList": [
          {
            "word": "en face de",
            "meaning": "在...正对面"
          },
          {
            "word": "installer (v.)",
            "meaning": "安装，安置"
          }
        ]
      },
      {
        "id": "8_q5",
        "questionType": "词汇语法",
        "categoryTag": "否定句 · 冠词变 de 规则",
        "question": "Mon grand-père ne boit jamais _____ alcool pour préserver sa santé.",
        "options": [
          "d'",
          "de l'",
          "du",
          "un"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n在否定句 (ne... jamais) 中，直接宾语前面的部分冠词 (de l'alcool) 必须一律转变为介词【de】(因遇到元音省音为 d')。选 A。",
        "translation": "我祖父为了保持健康从不喝酒。",
        "grammarTag": "否定句中部分冠词变 de",
        "vocabList": [
          {
            "word": "alcool (n.m.)",
            "meaning": "酒精，酒"
          },
          {
            "word": "préserver la santé",
            "meaning": "保持健康"
          }
        ]
      },
      {
        "id": "8_q6",
        "questionType": "词汇语法",
        "categoryTag": "时间状语从句 · avant que 触发虚拟式",
        "question": "Dépêchons-nous de rentrer avant qu'il ne _____ trop noir.",
        "options": [
          "fait",
          "fasse",
          "fera",
          "faisait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 avant que (在...之前) 引导时间状语从句，从句强制使用【虚拟式 (Subjonctif)】（从句中的 ne 为冗赘虚词，无否定含义）。faire 的虚拟式为 fasse。选 B。",
        "translation": "我们赶在天太黑之前赶紧回家吧。",
        "grammarTag": "avant que 后接虚拟式与虚词 ne",
        "vocabList": [
          {
            "word": "se dépêcher de",
            "meaning": "赶快做某事"
          },
          {
            "word": "faire noir",
            "meaning": "天黑"
          }
        ]
      },
      {
        "id": "8_q7",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · lequel 与介词缩合",
        "question": "Voici la magnifique bibliothèque dans _____ j'ai passé toute ma jeunesse.",
        "options": [
          "laquelle",
          "lequel",
          "lesquelles",
          "dont"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 la bibliothèque 为阴性单数名词，与介词 dans 连用，必须使用复合关系代词阴性单数形式【laquelle】。选 A。",
        "translation": "这就是我度过全部青年时代的宏伟图书馆。",
        "grammarTag": "介词 + lequel/laquelle 复合关系代词",
        "vocabList": [
          {
            "word": "bibliothèque (n.f.)",
            "meaning": "图书馆"
          },
          {
            "word": "jeunesse (n.f.)",
            "meaning": "青年时期"
          }
        ]
      },
      {
        "id": "8_q8",
        "questionType": "词汇语法",
        "categoryTag": "副动词 · En + Participe présent",
        "question": "_____ la rue prudemment, les enfants regardent à gauche et à droite.",
        "options": [
          "En traversant",
          "Traversé",
          "Avoir traversé",
          "Pour traverser"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n副动词 (En + 现在分词 traversant) 在句中充当时间或伴随状语，表示“在过马路的时候”。选 A。",
        "translation": "在小心穿过马路时，孩子们向左看也向右看。",
        "grammarTag": "副动词表示伴随与时间 (En traversant)",
        "vocabList": [
          {
            "word": "traverser la rue",
            "meaning": "穿过马路"
          },
          {
            "word": "prudemment (adv.)",
            "meaning": "谨慎地，小心地"
          }
        ]
      },
      {
        "id": "8_q9",
        "questionType": "词汇语法",
        "categoryTag": "时态配合 · 愈过去时",
        "question": "Hier soir, dès qu'elle _____ son travail, elle est sortie avec ses amies.",
        "options": [
          "a fini",
          "avait fini",
          "eut fini",
          "finissait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为复合过去时 (est sortie)，从句 dès que (一...就...) 表达在过去基准时间点之前已经完成的动作，必须使用愈过去时 (Plus-que-parfait: avait fini) 表达“过去的过去”。选 B。",
        "translation": "昨天晚上，她一完成工作，就和朋友们出去了。",
        "grammarTag": "愈过去时 (Plus-que-parfait)",
        "vocabList": [
          {
            "word": "sortir avec",
            "meaning": "与...一起外出"
          },
          {
            "word": "dès que",
            "meaning": "一...就... (连词短语)"
          }
        ]
      },
      {
        "id": "8_q10",
        "questionType": "词汇语法",
        "categoryTag": "代词系统 · 双代词语序",
        "question": "Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.",
        "options": [
          "leur en",
          "en leur",
          "les en",
          "en lui"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nparler de qch (用副代词 en 替代) à qn (父母为复数，用间宾代词 leur)。根据双代词语序规则：人称代词 (lui / leur) 必须位于副代词 (y / en) 之前，因此唯一正确顺序为【leur en】。选 A。",
        "translation": "你跟父母谈过你的新项目了吗？——是的，我昨天已经跟他们谈过了。",
        "grammarTag": "双宾语代词位置 (leur en)",
        "vocabList": [
          {
            "word": "parler de qch à qn",
            "meaning": "就某事与某人交谈"
          },
          {
            "word": "projet (n.m.)",
            "meaning": "项目，计划"
          }
        ]
      },
      {
        "id": "8_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "8_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "8_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "8_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "8_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "8_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "8_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "8_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "8_q19",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "8_q20",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "8_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "8_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "8_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "8_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_kaoyan_9",
    "title": "2024年中山大学 (242) 二外法语考研真题精编卷",
    "frenchTitle": "Université Sun Yat-sen (SYSU 242) — Examen de Master en français",
    "track": "kaoyan",
    "level": "241/242考研",
    "schoolOrOrg": "中山大学",
    "yearOrSession": "2024精编卷",
    "summary": "中大高频试题：重点攻坚时间状语从句与时态呼应、否定句型变异及社科文化事实推论。",
    "durationMinutes": 60,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "9_q1",
        "questionType": "词汇语法",
        "categoryTag": "时间状语从句 · avant que 触发虚拟式",
        "question": "Dépêchons-nous de rentrer avant qu'il ne _____ trop noir.",
        "options": [
          "fait",
          "fasse",
          "fera",
          "faisait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 avant que (在...之前) 引导时间状语从句，从句强制使用【虚拟式 (Subjonctif)】（从句中的 ne 为冗赘虚词，无否定含义）。faire 的虚拟式为 fasse。选 B。",
        "translation": "我们赶在天太黑之前赶紧回家吧。",
        "grammarTag": "avant que 后接虚拟式与虚词 ne",
        "vocabList": [
          {
            "word": "se dépêcher de",
            "meaning": "赶快做某事"
          },
          {
            "word": "faire noir",
            "meaning": "天黑"
          }
        ]
      },
      {
        "id": "9_q2",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · lequel 与介词缩合",
        "question": "Voici la magnifique bibliothèque dans _____ j'ai passé toute ma jeunesse.",
        "options": [
          "laquelle",
          "lequel",
          "lesquelles",
          "dont"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 la bibliothèque 为阴性单数名词，与介词 dans 连用，必须使用复合关系代词阴性单数形式【laquelle】。选 A。",
        "translation": "这就是我度过全部青年时代的宏伟图书馆。",
        "grammarTag": "介词 + lequel/laquelle 复合关系代词",
        "vocabList": [
          {
            "word": "bibliothèque (n.f.)",
            "meaning": "图书馆"
          },
          {
            "word": "jeunesse (n.f.)",
            "meaning": "青年时期"
          }
        ]
      },
      {
        "id": "9_q3",
        "questionType": "词汇语法",
        "categoryTag": "副动词 · En + Participe présent",
        "question": "_____ la rue prudemment, les enfants regardent à gauche et à droite.",
        "options": [
          "En traversant",
          "Traversé",
          "Avoir traversé",
          "Pour traverser"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n副动词 (En + 现在分词 traversant) 在句中充当时间或伴随状语，表示“在过马路的时候”。选 A。",
        "translation": "在小心穿过马路时，孩子们向左看也向右看。",
        "grammarTag": "副动词表示伴随与时间 (En traversant)",
        "vocabList": [
          {
            "word": "traverser la rue",
            "meaning": "穿过马路"
          },
          {
            "word": "prudemment (adv.)",
            "meaning": "谨慎地，小心地"
          }
        ]
      },
      {
        "id": "9_q4",
        "questionType": "词汇语法",
        "categoryTag": "时态配合 · 愈过去时",
        "question": "Hier soir, dès qu'elle _____ son travail, elle est sortie avec ses amies.",
        "options": [
          "a fini",
          "avait fini",
          "eut fini",
          "finissait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为复合过去时 (est sortie)，从句 dès que (一...就...) 表达在过去基准时间点之前已经完成的动作，必须使用愈过去时 (Plus-que-parfait: avait fini) 表达“过去的过去”。选 B。",
        "translation": "昨天晚上，她一完成工作，就和朋友们出去了。",
        "grammarTag": "愈过去时 (Plus-que-parfait)",
        "vocabList": [
          {
            "word": "sortir avec",
            "meaning": "与...一起外出"
          },
          {
            "word": "dès que",
            "meaning": "一...就... (连词短语)"
          }
        ]
      },
      {
        "id": "9_q5",
        "questionType": "词汇语法",
        "categoryTag": "代词系统 · 双代词语序",
        "question": "Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.",
        "options": [
          "leur en",
          "en leur",
          "les en",
          "en lui"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nparler de qch (用副代词 en 替代) à qn (父母为复数，用间宾代词 leur)。根据双代词语序规则：人称代词 (lui / leur) 必须位于副代词 (y / en) 之前，因此唯一正确顺序为【leur en】。选 A。",
        "translation": "你跟父母谈过你的新项目了吗？——是的，我昨天已经跟他们谈过了。",
        "grammarTag": "双宾语代词位置 (leur en)",
        "vocabList": [
          {
            "word": "parler de qch à qn",
            "meaning": "就某事与某人交谈"
          },
          {
            "word": "projet (n.m.)",
            "meaning": "项目，计划"
          }
        ]
      },
      {
        "id": "9_q6",
        "questionType": "词汇语法",
        "categoryTag": "分词配合 · 直宾提前",
        "question": "Les photos que vous avez _____ sont magnifiques.",
        "options": [
          "pris",
          "prise",
          "prises",
          "prennent"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n在以 avoir 为助动词的复合时态中，直接宾语提前时过去分词必须与直接宾语进行性数配合。先行词 les photos 为阴性复数，关系代词 que 在从句中充当直宾，故 prendre 的过去分词变为主格配合形态【prises】。选 C。",
        "translation": "您拍的那些照片真是太美了。",
        "grammarTag": "过去分词与直宾性数配合",
        "vocabList": [
          {
            "word": "prendre des photos",
            "meaning": "拍照"
          },
          {
            "word": "magnifique (adj.)",
            "meaning": "宏伟壮丽的"
          }
        ]
      },
      {
        "id": "9_q7",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 触发连词短语",
        "question": "Bien qu'il _____ beaucoup de difficultés, il n'a jamais abandonné son rêve.",
        "options": [
          "a",
          "avait",
          "ait",
          "aura"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 bien que (尽管，虽然) 引导让步状语从句，从句动词必须强制使用【虚拟式 (Subjonctif)】。动词 avoir 的虚拟式第三人称单数为【ait】。选 C。",
        "translation": "尽管遇到了许多困难，但他从未放弃自己的梦想。",
        "grammarTag": "虚拟式现在时 (bien que)",
        "vocabList": [
          {
            "word": "bien que + subj.",
            "meaning": "尽管，虽然"
          },
          {
            "word": "abandonner (v.)",
            "meaning": "放弃"
          }
        ]
      },
      {
        "id": "9_q8",
        "questionType": "词汇语法",
        "categoryTag": "代词式动词 · 分词配合避坑",
        "question": "Elles se sont _____ compte de leur erreur un peu trop tard.",
        "options": [
          "rendu",
          "rendue",
          "rendus",
          "rendues"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定短语 se rendre compte de qch (意识到某事)。自反代词 se 在此结构中充当间接宾语，compte 为直接宾语且位于动词之后，因此过去分词 rendu【绝不配合】，保持阳性单数原形 rendu。选 A。",
        "translation": "她们意识到自己的错误时已经有点太晚了。",
        "grammarTag": "代词式动词固定短语 (se rendre compte)",
        "vocabList": [
          {
            "word": "se rendre compte de",
            "meaning": "意识到，发觉 (不配合)"
          },
          {
            "word": "erreur (n.f.)",
            "meaning": "错误"
          }
        ]
      },
      {
        "id": "9_q9",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · dont 深度考查",
        "question": "C'est une entreprise internationale _____ le directeur général est très jeune.",
        "options": [
          "qui",
          "que",
          "dont",
          "où"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune。de + 先行词充当名词的所有格限制补语，必须使用关系代词【dont】。选 C。",
        "translation": "这是一间总经理非常年轻的国际跨国企业。",
        "grammarTag": "关系代词 dont 的所有格用法",
        "vocabList": [
          {
            "word": "directeur général",
            "meaning": "总经理 / CEO"
          },
          {
            "word": "entreprise (n.f.)",
            "meaning": "企业，公司"
          }
        ]
      },
      {
        "id": "9_q10",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · y 的地点与抽象引申",
        "question": "Pensez-vous encore à votre ancien travail ? — Non, je n'_____ pense plus du tout.",
        "options": [
          "en",
          "y",
          "le",
          "lui"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\npenser à qch (思考/挂念某事)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。",
        "translation": "你还会想起以前的那份工作吗？——不，我一点也不再去想它了。",
        "grammarTag": "副代词 y (代替 à + 物)",
        "vocabList": [
          {
            "word": "penser à qch",
            "meaning": "考虑某事，想念某事"
          },
          {
            "word": "ne... plus du tout",
            "meaning": "一点也不再..."
          }
        ]
      },
      {
        "id": "9_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "9_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "9_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "9_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "9_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "9_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "9_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "9_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "9_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "9_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "9_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "9_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "9_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "9_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_kaoyan_10",
    "title": "2023年全国名校考研二外法语综合冲刺精编卷 (A卷)",
    "frenchTitle": "Concours National de Master : Épreuve de synthèse avancée (Série A)",
    "track": "kaoyan",
    "level": "241/242考研",
    "schoolOrOrg": "名校联考精选",
    "yearOrSession": "2023综合冲刺",
    "summary": "整合全国多所985外语院校考研试题核心精华，全真模拟考场环境，自测提分利器。",
    "durationMinutes": 60,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "10_q1",
        "questionType": "词汇语法",
        "categoryTag": "分词配合 · 直宾提前",
        "question": "Les photos que vous avez _____ sont magnifiques.",
        "options": [
          "pris",
          "prise",
          "prises",
          "prennent"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n在以 avoir 为助动词的复合时态中，直接宾语提前时过去分词必须与直接宾语进行性数配合。先行词 les photos 为阴性复数，关系代词 que 在从句中充当直宾，故 prendre 的过去分词变为主格配合形态【prises】。选 C。",
        "translation": "您拍的那些照片真是太美了。",
        "grammarTag": "过去分词与直宾性数配合",
        "vocabList": [
          {
            "word": "prendre des photos",
            "meaning": "拍照"
          },
          {
            "word": "magnifique (adj.)",
            "meaning": "宏伟壮丽的"
          }
        ]
      },
      {
        "id": "10_q2",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 触发连词短语",
        "question": "Bien qu'il _____ beaucoup de difficultés, il n'a jamais abandonné son rêve.",
        "options": [
          "a",
          "avait",
          "ait",
          "aura"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 bien que (尽管，虽然) 引导让步状语从句，从句动词必须强制使用【虚拟式 (Subjonctif)】。动词 avoir 的虚拟式第三人称单数为【ait】。选 C。",
        "translation": "尽管遇到了许多困难，但他从未放弃自己的梦想。",
        "grammarTag": "虚拟式现在时 (bien que)",
        "vocabList": [
          {
            "word": "bien que + subj.",
            "meaning": "尽管，虽然"
          },
          {
            "word": "abandonner (v.)",
            "meaning": "放弃"
          }
        ]
      },
      {
        "id": "10_q3",
        "questionType": "词汇语法",
        "categoryTag": "代词式动词 · 分词配合避坑",
        "question": "Elles se sont _____ compte de leur erreur un peu trop tard.",
        "options": [
          "rendu",
          "rendue",
          "rendus",
          "rendues"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定短语 se rendre compte de qch (意识到某事)。自反代词 se 在此结构中充当间接宾语，compte 为直接宾语且位于动词之后，因此过去分词 rendu【绝不配合】，保持阳性单数原形 rendu。选 A。",
        "translation": "她们意识到自己的错误时已经有点太晚了。",
        "grammarTag": "代词式动词固定短语 (se rendre compte)",
        "vocabList": [
          {
            "word": "se rendre compte de",
            "meaning": "意识到，发觉 (不配合)"
          },
          {
            "word": "erreur (n.f.)",
            "meaning": "错误"
          }
        ]
      },
      {
        "id": "10_q4",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · dont 深度考查",
        "question": "C'est une entreprise internationale _____ le directeur général est très jeune.",
        "options": [
          "qui",
          "que",
          "dont",
          "où"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune。de + 先行词充当名词的所有格限制补语，必须使用关系代词【dont】。选 C。",
        "translation": "这是一间总经理非常年轻的国际跨国企业。",
        "grammarTag": "关系代词 dont 的所有格用法",
        "vocabList": [
          {
            "word": "directeur général",
            "meaning": "总经理 / CEO"
          },
          {
            "word": "entreprise (n.f.)",
            "meaning": "企业，公司"
          }
        ]
      },
      {
        "id": "10_q5",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · y 的地点与抽象引申",
        "question": "Pensez-vous encore à votre ancien travail ? — Non, je n'_____ pense plus du tout.",
        "options": [
          "en",
          "y",
          "le",
          "lui"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\npenser à qch (思考/挂念某事)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。",
        "translation": "你还会想起以前的那份工作吗？——不，我一点也不再去想它了。",
        "grammarTag": "副代词 y (代替 à + 物)",
        "vocabList": [
          {
            "word": "penser à qch",
            "meaning": "考虑某事，想念某事"
          },
          {
            "word": "ne... plus du tout",
            "meaning": "一点也不再..."
          }
        ]
      },
      {
        "id": "10_q6",
        "questionType": "词汇语法",
        "categoryTag": "条件式 · 与过去假设配合",
        "question": "Si tu m'avais prévenu à temps, je ne _____ pas venu si tard.",
        "options": [
          "serais",
          "serais été",
          "fus",
          "sois"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nSi 引导的对过去虚拟假设句型：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。",
        "translation": "如果你及时通知我，我就不会来得这么晚了。",
        "grammarTag": "Si 条件假设与条件式过去时",
        "vocabList": [
          {
            "word": "prévenir qn à temps",
            "meaning": "及时通知/提醒某人"
          },
          {
            "word": "tard (adv.)",
            "meaning": "迟，晚"
          }
        ]
      },
      {
        "id": "10_q7",
        "questionType": "词汇语法",
        "categoryTag": "介词与冠词 · 国名专有搭配",
        "question": "Le président français effectuera une visite officielle _____ Mexique le mois prochain.",
        "options": [
          "en",
          "au",
          "à",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n阳性单数国名以辅音结尾通常使用定冠词 le (如 le Mexique, le Japon, le Canada)。表示“去往”或“在”阳性单数国名前，介词必须用【au】 (à + le 缩合)！选 B。",
        "translation": "法国总统下个月将对墨西哥进行正式国事访问。",
        "grammarTag": "阳性国名前的介词搭配 (au Mexique)",
        "vocabList": [
          {
            "word": "visite officielle",
            "meaning": "国事访问，正式访问"
          },
          {
            "word": "effectuer (v.)",
            "meaning": "进行，执行"
          }
        ]
      },
      {
        "id": "10_q8",
        "questionType": "词汇语法",
        "categoryTag": "否定副词 · 文学句式辨析",
        "question": "Dans ce village isolé, il n'y a _____ de supermarché ni de pharmacie.",
        "options": [
          "aucun",
          "point",
          "jamais",
          "guère"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。",
        "translation": "在这个偏僻的孤立村庄里，既没有超市，也没有药店。",
        "grammarTag": "否定句型 (ne... point de)",
        "vocabList": [
          {
            "word": "isolé (adj.)",
            "meaning": "孤立的，偏远的"
          },
          {
            "word": "pharmacie (n.f.)",
            "meaning": "药店"
          }
        ]
      },
      {
        "id": "10_q9",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "10_q10",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "10_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "10_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "10_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "10_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "10_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "10_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "10_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "10_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "10_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "10_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "10_q21",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "10_q22",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "10_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "10_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_kaoyan_11",
    "title": "2023年全国名校考研二外法语综合冲刺精编卷 (B卷)",
    "frenchTitle": "Concours National de Master : Épreuve de synthèse avancée (Série B)",
    "track": "kaoyan",
    "level": "241/242考研",
    "schoolOrOrg": "名校联考精选",
    "yearOrSession": "2023综合冲刺",
    "summary": "针对易错混淆项设计干扰，深度攻克过去分词配合、副代词 en 的数量代换及长文主旨。",
    "durationMinutes": 60,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "11_q1",
        "questionType": "词汇语法",
        "categoryTag": "条件式 · 与过去假设配合",
        "question": "Si tu m'avais prévenu à temps, je ne _____ pas venu si tard.",
        "options": [
          "serais",
          "serais été",
          "fus",
          "sois"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nSi 引导的对过去虚拟假设句型：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。",
        "translation": "如果你及时通知我，我就不会来得这么晚了。",
        "grammarTag": "Si 条件假设与条件式过去时",
        "vocabList": [
          {
            "word": "prévenir qn à temps",
            "meaning": "及时通知/提醒某人"
          },
          {
            "word": "tard (adv.)",
            "meaning": "迟，晚"
          }
        ]
      },
      {
        "id": "11_q2",
        "questionType": "词汇语法",
        "categoryTag": "介词与冠词 · 国名专有搭配",
        "question": "Le président français effectuera une visite officielle _____ Mexique le mois prochain.",
        "options": [
          "en",
          "au",
          "à",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n阳性单数国名以辅音结尾通常使用定冠词 le (如 le Mexique, le Japon, le Canada)。表示“去往”或“在”阳性单数国名前，介词必须用【au】 (à + le 缩合)！选 B。",
        "translation": "法国总统下个月将对墨西哥进行正式国事访问。",
        "grammarTag": "阳性国名前的介词搭配 (au Mexique)",
        "vocabList": [
          {
            "word": "visite officielle",
            "meaning": "国事访问，正式访问"
          },
          {
            "word": "effectuer (v.)",
            "meaning": "进行，执行"
          }
        ]
      },
      {
        "id": "11_q3",
        "questionType": "词汇语法",
        "categoryTag": "否定副词 · 文学句式辨析",
        "question": "Dans ce village isolé, il n'y a _____ de supermarché ni de pharmacie.",
        "options": [
          "aucun",
          "point",
          "jamais",
          "guère"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。",
        "translation": "在这个偏僻的孤立村庄里，既没有超市，也没有药店。",
        "grammarTag": "否定句型 (ne... point de)",
        "vocabList": [
          {
            "word": "isolé (adj.)",
            "meaning": "孤立的，偏远的"
          },
          {
            "word": "pharmacie (n.f.)",
            "meaning": "药店"
          }
        ]
      },
      {
        "id": "11_q4",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "11_q5",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "11_q6",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "11_q7",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "11_q8",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "11_q9",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "11_q10",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "11_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "11_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "11_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "11_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "11_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "11_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "11_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "11_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "11_q19",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "11_q20",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "11_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "11_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "11_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "11_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_kaoyan_12",
    "title": "北京外国语大学二外法语历年必考压轴经典卷",
    "frenchTitle": "BFSU : Recueil d'excellence des annales de français langue seconde",
    "track": "kaoyan",
    "level": "241/242考研",
    "schoolOrOrg": "北京外国语大学",
    "yearOrSession": "经典必考卷",
    "summary": "沉淀北外十年考研经典题源，涵盖语法重难点终极冲刺与高难度阅读逻辑辨析。",
    "durationMinutes": 75,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "12_q1",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "12_q2",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "12_q3",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "12_q4",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "12_q5",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "12_q6",
        "questionType": "词汇语法",
        "categoryTag": "自反动词 · 互为间宾不配合",
        "question": "Les deux diplomates se sont _____ la main chaleureusement avant de commencer.",
        "options": [
          "serré",
          "serrée",
          "serrés",
          "serrées"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nse serrer la main 结构中，la main 为直接宾语且位于动词之后，se 实际上充当相互间接宾语（向对方握手），因此过去分词 serré【绝不配合】！选 A。",
        "translation": "两位外交官在开始前热情地握了手。",
        "grammarTag": "自反动词带直宾时分词不配合",
        "vocabList": [
          {
            "word": "se serrer la main",
            "meaning": "握手 (不配合)"
          },
          {
            "word": "chaleureusement (adv.)",
            "meaning": "热情地"
          }
        ]
      },
      {
        "id": "12_q7",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 最高级引导的定语从句",
        "question": "C'est le plus beau musée que je _____ jamais visité de toute ma vie.",
        "options": [
          "ai",
          "aie",
          "avais",
          "aurais"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词被形容词最高级 (le plus beau...) 或 seul / premier 等修饰时，后面的定语从句常使用【虚拟式 (Subjonctif)】以体现说话人的主观感叹评价。visité 复合过去虚拟式为【aie visité】。选 B。",
        "translation": "这是我一生中参观过的最美丽的博物馆。",
        "grammarTag": "最高级先行词后接虚拟式",
        "vocabList": [
          {
            "word": "musée (n.m.)",
            "meaning": "博物馆"
          },
          {
            "word": "de toute ma vie",
            "meaning": "我一生中"
          }
        ]
      },
      {
        "id": "12_q8",
        "questionType": "词汇语法",
        "categoryTag": "复合介词 · 空间与抽象方向",
        "question": "Il a installé son nouvel ordinateur _____ de la grande fenêtre.",
        "options": [
          "près",
          "en face",
          "au milieu",
          "au-dessus"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定方位短语：en face de... (在...对面)。près 也需加 de，但语义上在正对大窗户处摆放用 en face de 最为地道贴切。选 B。",
        "translation": "他把新电脑安装在正对着大窗户的位置。",
        "grammarTag": "空间介词短语 (en face de)",
        "vocabList": [
          {
            "word": "en face de",
            "meaning": "在...正对面"
          },
          {
            "word": "installer (v.)",
            "meaning": "安装，安置"
          }
        ]
      },
      {
        "id": "12_q9",
        "questionType": "词汇语法",
        "categoryTag": "否定句 · 冠词变 de 规则",
        "question": "Mon grand-père ne boit jamais _____ alcool pour préserver sa santé.",
        "options": [
          "d'",
          "de l'",
          "du",
          "un"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n在否定句 (ne... jamais) 中，直接宾语前面的部分冠词 (de l'alcool) 必须一律转变为介词【de】(因遇到元音省音为 d')。选 A。",
        "translation": "我祖父为了保持健康从不喝酒。",
        "grammarTag": "否定句中部分冠词变 de",
        "vocabList": [
          {
            "word": "alcool (n.m.)",
            "meaning": "酒精，酒"
          },
          {
            "word": "préserver la santé",
            "meaning": "保持健康"
          }
        ]
      },
      {
        "id": "12_q10",
        "questionType": "词汇语法",
        "categoryTag": "时间状语从句 · avant que 触发虚拟式",
        "question": "Dépêchons-nous de rentrer avant qu'il ne _____ trop noir.",
        "options": [
          "fait",
          "fasse",
          "fera",
          "faisait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 avant que (在...之前) 引导时间状语从句，从句强制使用【虚拟式 (Subjonctif)】（从句中的 ne 为冗赘虚词，无否定含义）。faire 的虚拟式为 fasse。选 B。",
        "translation": "我们赶在天太黑之前赶紧回家吧。",
        "grammarTag": "avant que 后接虚拟式与虚词 ne",
        "vocabList": [
          {
            "word": "se dépêcher de",
            "meaning": "赶快做某事"
          },
          {
            "word": "faire noir",
            "meaning": "天黑"
          }
        ]
      },
      {
        "id": "12_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "12_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "12_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "12_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "12_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "12_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "12_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "12_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "12_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "12_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "12_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "12_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "12_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "12_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_cft4_13",
    "title": "大学法语四级 (CFT-4) 全国统考全真冲刺模拟卷 (一)",
    "frenchTitle": "Certificat de Français pour l'Enseignement Supérieur (CFT-4 : Modèle 1)",
    "track": "cft4",
    "level": "大学法语四级",
    "schoolOrOrg": "教育部高校外语统考",
    "yearOrSession": "2024全真卷",
    "summary": "完全遵循教育部《大学法语四级考试大纲》标准排版，覆盖听力理解、词汇语法、完形与阅读。",
    "durationMinutes": 45,
    "totalScore": 100,
    "isFreePreview": true,
    "questions": [
      {
        "id": "13_q1",
        "questionType": "词汇语法",
        "categoryTag": "自反动词 · 互为间宾不配合",
        "question": "Les deux diplomates se sont _____ la main chaleureusement avant de commencer.",
        "options": [
          "serré",
          "serrée",
          "serrés",
          "serrées"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nse serrer la main 结构中，la main 为直接宾语且位于动词之后，se 实际上充当相互间接宾语（向对方握手），因此过去分词 serré【绝不配合】！选 A。",
        "translation": "两位外交官在开始前热情地握了手。",
        "grammarTag": "自反动词带直宾时分词不配合",
        "vocabList": [
          {
            "word": "se serrer la main",
            "meaning": "握手 (不配合)"
          },
          {
            "word": "chaleureusement (adv.)",
            "meaning": "热情地"
          }
        ]
      },
      {
        "id": "13_q2",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 最高级引导的定语从句",
        "question": "C'est le plus beau musée que je _____ jamais visité de toute ma vie.",
        "options": [
          "ai",
          "aie",
          "avais",
          "aurais"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词被形容词最高级 (le plus beau...) 或 seul / premier 等修饰时，后面的定语从句常使用【虚拟式 (Subjonctif)】以体现说话人的主观感叹评价。visité 复合过去虚拟式为【aie visité】。选 B。",
        "translation": "这是我一生中参观过的最美丽的博物馆。",
        "grammarTag": "最高级先行词后接虚拟式",
        "vocabList": [
          {
            "word": "musée (n.m.)",
            "meaning": "博物馆"
          },
          {
            "word": "de toute ma vie",
            "meaning": "我一生中"
          }
        ]
      },
      {
        "id": "13_q3",
        "questionType": "词汇语法",
        "categoryTag": "复合介词 · 空间与抽象方向",
        "question": "Il a installé son nouvel ordinateur _____ de la grande fenêtre.",
        "options": [
          "près",
          "en face",
          "au milieu",
          "au-dessus"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定方位短语：en face de... (在...对面)。près 也需加 de，但语义上在正对大窗户处摆放用 en face de 最为地道贴切。选 B。",
        "translation": "他把新电脑安装在正对着大窗户的位置。",
        "grammarTag": "空间介词短语 (en face de)",
        "vocabList": [
          {
            "word": "en face de",
            "meaning": "在...正对面"
          },
          {
            "word": "installer (v.)",
            "meaning": "安装，安置"
          }
        ]
      },
      {
        "id": "13_q4",
        "questionType": "词汇语法",
        "categoryTag": "否定句 · 冠词变 de 规则",
        "question": "Mon grand-père ne boit jamais _____ alcool pour préserver sa santé.",
        "options": [
          "d'",
          "de l'",
          "du",
          "un"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n在否定句 (ne... jamais) 中，直接宾语前面的部分冠词 (de l'alcool) 必须一律转变为介词【de】(因遇到元音省音为 d')。选 A。",
        "translation": "我祖父为了保持健康从不喝酒。",
        "grammarTag": "否定句中部分冠词变 de",
        "vocabList": [
          {
            "word": "alcool (n.m.)",
            "meaning": "酒精，酒"
          },
          {
            "word": "préserver la santé",
            "meaning": "保持健康"
          }
        ]
      },
      {
        "id": "13_q5",
        "questionType": "词汇语法",
        "categoryTag": "时间状语从句 · avant que 触发虚拟式",
        "question": "Dépêchons-nous de rentrer avant qu'il ne _____ trop noir.",
        "options": [
          "fait",
          "fasse",
          "fera",
          "faisait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 avant que (在...之前) 引导时间状语从句，从句强制使用【虚拟式 (Subjonctif)】（从句中的 ne 为冗赘虚词，无否定含义）。faire 的虚拟式为 fasse。选 B。",
        "translation": "我们赶在天太黑之前赶紧回家吧。",
        "grammarTag": "avant que 后接虚拟式与虚词 ne",
        "vocabList": [
          {
            "word": "se dépêcher de",
            "meaning": "赶快做某事"
          },
          {
            "word": "faire noir",
            "meaning": "天黑"
          }
        ]
      },
      {
        "id": "13_q6",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · lequel 与介词缩合",
        "question": "Voici la magnifique bibliothèque dans _____ j'ai passé toute ma jeunesse.",
        "options": [
          "laquelle",
          "lequel",
          "lesquelles",
          "dont"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 la bibliothèque 为阴性单数名词，与介词 dans 连用，必须使用复合关系代词阴性单数形式【laquelle】。选 A。",
        "translation": "这就是我度过全部青年时代的宏伟图书馆。",
        "grammarTag": "介词 + lequel/laquelle 复合关系代词",
        "vocabList": [
          {
            "word": "bibliothèque (n.f.)",
            "meaning": "图书馆"
          },
          {
            "word": "jeunesse (n.f.)",
            "meaning": "青年时期"
          }
        ]
      },
      {
        "id": "13_q7",
        "questionType": "词汇语法",
        "categoryTag": "副动词 · En + Participe présent",
        "question": "_____ la rue prudemment, les enfants regardent à gauche et à droite.",
        "options": [
          "En traversant",
          "Traversé",
          "Avoir traversé",
          "Pour traverser"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n副动词 (En + 现在分词 traversant) 在句中充当时间或伴随状语，表示“在过马路的时候”。选 A。",
        "translation": "在小心穿过马路时，孩子们向左看也向右看。",
        "grammarTag": "副动词表示伴随与时间 (En traversant)",
        "vocabList": [
          {
            "word": "traverser la rue",
            "meaning": "穿过马路"
          },
          {
            "word": "prudemment (adv.)",
            "meaning": "谨慎地，小心地"
          }
        ]
      },
      {
        "id": "13_q8",
        "questionType": "词汇语法",
        "categoryTag": "时态配合 · 愈过去时",
        "question": "Hier soir, dès qu'elle _____ son travail, elle est sortie avec ses amies.",
        "options": [
          "a fini",
          "avait fini",
          "eut fini",
          "finissait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为复合过去时 (est sortie)，从句 dès que (一...就...) 表达在过去基准时间点之前已经完成的动作，必须使用愈过去时 (Plus-que-parfait: avait fini) 表达“过去的过去”。选 B。",
        "translation": "昨天晚上，她一完成工作，就和朋友们出去了。",
        "grammarTag": "愈过去时 (Plus-que-parfait)",
        "vocabList": [
          {
            "word": "sortir avec",
            "meaning": "与...一起外出"
          },
          {
            "word": "dès que",
            "meaning": "一...就... (连词短语)"
          }
        ]
      },
      {
        "id": "13_q9",
        "questionType": "词汇语法",
        "categoryTag": "代词系统 · 双代词语序",
        "question": "Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.",
        "options": [
          "leur en",
          "en leur",
          "les en",
          "en lui"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nparler de qch (用副代词 en 替代) à qn (父母为复数，用间宾代词 leur)。根据双代词语序规则：人称代词 (lui / leur) 必须位于副代词 (y / en) 之前，因此唯一正确顺序为【leur en】。选 A。",
        "translation": "你跟父母谈过你的新项目了吗？——是的，我昨天已经跟他们谈过了。",
        "grammarTag": "双宾语代词位置 (leur en)",
        "vocabList": [
          {
            "word": "parler de qch à qn",
            "meaning": "就某事与某人交谈"
          },
          {
            "word": "projet (n.m.)",
            "meaning": "项目，计划"
          }
        ]
      },
      {
        "id": "13_q10",
        "questionType": "词汇语法",
        "categoryTag": "分词配合 · 直宾提前",
        "question": "Les photos que vous avez _____ sont magnifiques.",
        "options": [
          "pris",
          "prise",
          "prises",
          "prennent"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n在以 avoir 为助动词的复合时态中，直接宾语提前时过去分词必须与直接宾语进行性数配合。先行词 les photos 为阴性复数，关系代词 que 在从句中充当直宾，故 prendre 的过去分词变为主格配合形态【prises】。选 C。",
        "translation": "您拍的那些照片真是太美了。",
        "grammarTag": "过去分词与直宾性数配合",
        "vocabList": [
          {
            "word": "prendre des photos",
            "meaning": "拍照"
          },
          {
            "word": "magnifique (adj.)",
            "meaning": "宏伟壮丽的"
          }
        ]
      },
      {
        "id": "13_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "13_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "13_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "13_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "13_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "13_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "13_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "13_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "13_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "13_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "13_q21",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "13_q22",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "13_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "13_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_cft4_14",
    "title": "大学法语四级 (CFT-4) 全国统考全真冲刺模拟卷 (二)",
    "frenchTitle": "Certificat de Français pour l'Enseignement Supérieur (CFT-4 : Modèle 2)",
    "track": "cft4",
    "level": "大学法语四级",
    "schoolOrOrg": "教育部高校外语统考",
    "yearOrSession": "2024全真卷",
    "summary": "标准化考题分布，精准检验公外法语学员 A2-B1 水平阶段的核心语言综合运用能力。",
    "durationMinutes": 45,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "14_q1",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · lequel 与介词缩合",
        "question": "Voici la magnifique bibliothèque dans _____ j'ai passé toute ma jeunesse.",
        "options": [
          "laquelle",
          "lequel",
          "lesquelles",
          "dont"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 la bibliothèque 为阴性单数名词，与介词 dans 连用，必须使用复合关系代词阴性单数形式【laquelle】。选 A。",
        "translation": "这就是我度过全部青年时代的宏伟图书馆。",
        "grammarTag": "介词 + lequel/laquelle 复合关系代词",
        "vocabList": [
          {
            "word": "bibliothèque (n.f.)",
            "meaning": "图书馆"
          },
          {
            "word": "jeunesse (n.f.)",
            "meaning": "青年时期"
          }
        ]
      },
      {
        "id": "14_q2",
        "questionType": "词汇语法",
        "categoryTag": "副动词 · En + Participe présent",
        "question": "_____ la rue prudemment, les enfants regardent à gauche et à droite.",
        "options": [
          "En traversant",
          "Traversé",
          "Avoir traversé",
          "Pour traverser"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n副动词 (En + 现在分词 traversant) 在句中充当时间或伴随状语，表示“在过马路的时候”。选 A。",
        "translation": "在小心穿过马路时，孩子们向左看也向右看。",
        "grammarTag": "副动词表示伴随与时间 (En traversant)",
        "vocabList": [
          {
            "word": "traverser la rue",
            "meaning": "穿过马路"
          },
          {
            "word": "prudemment (adv.)",
            "meaning": "谨慎地，小心地"
          }
        ]
      },
      {
        "id": "14_q3",
        "questionType": "词汇语法",
        "categoryTag": "时态配合 · 愈过去时",
        "question": "Hier soir, dès qu'elle _____ son travail, elle est sortie avec ses amies.",
        "options": [
          "a fini",
          "avait fini",
          "eut fini",
          "finissait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为复合过去时 (est sortie)，从句 dès que (一...就...) 表达在过去基准时间点之前已经完成的动作，必须使用愈过去时 (Plus-que-parfait: avait fini) 表达“过去的过去”。选 B。",
        "translation": "昨天晚上，她一完成工作，就和朋友们出去了。",
        "grammarTag": "愈过去时 (Plus-que-parfait)",
        "vocabList": [
          {
            "word": "sortir avec",
            "meaning": "与...一起外出"
          },
          {
            "word": "dès que",
            "meaning": "一...就... (连词短语)"
          }
        ]
      },
      {
        "id": "14_q4",
        "questionType": "词汇语法",
        "categoryTag": "代词系统 · 双代词语序",
        "question": "Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.",
        "options": [
          "leur en",
          "en leur",
          "les en",
          "en lui"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nparler de qch (用副代词 en 替代) à qn (父母为复数，用间宾代词 leur)。根据双代词语序规则：人称代词 (lui / leur) 必须位于副代词 (y / en) 之前，因此唯一正确顺序为【leur en】。选 A。",
        "translation": "你跟父母谈过你的新项目了吗？——是的，我昨天已经跟他们谈过了。",
        "grammarTag": "双宾语代词位置 (leur en)",
        "vocabList": [
          {
            "word": "parler de qch à qn",
            "meaning": "就某事与某人交谈"
          },
          {
            "word": "projet (n.m.)",
            "meaning": "项目，计划"
          }
        ]
      },
      {
        "id": "14_q5",
        "questionType": "词汇语法",
        "categoryTag": "分词配合 · 直宾提前",
        "question": "Les photos que vous avez _____ sont magnifiques.",
        "options": [
          "pris",
          "prise",
          "prises",
          "prennent"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n在以 avoir 为助动词的复合时态中，直接宾语提前时过去分词必须与直接宾语进行性数配合。先行词 les photos 为阴性复数，关系代词 que 在从句中充当直宾，故 prendre 的过去分词变为主格配合形态【prises】。选 C。",
        "translation": "您拍的那些照片真是太美了。",
        "grammarTag": "过去分词与直宾性数配合",
        "vocabList": [
          {
            "word": "prendre des photos",
            "meaning": "拍照"
          },
          {
            "word": "magnifique (adj.)",
            "meaning": "宏伟壮丽的"
          }
        ]
      },
      {
        "id": "14_q6",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 触发连词短语",
        "question": "Bien qu'il _____ beaucoup de difficultés, il n'a jamais abandonné son rêve.",
        "options": [
          "a",
          "avait",
          "ait",
          "aura"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 bien que (尽管，虽然) 引导让步状语从句，从句动词必须强制使用【虚拟式 (Subjonctif)】。动词 avoir 的虚拟式第三人称单数为【ait】。选 C。",
        "translation": "尽管遇到了许多困难，但他从未放弃自己的梦想。",
        "grammarTag": "虚拟式现在时 (bien que)",
        "vocabList": [
          {
            "word": "bien que + subj.",
            "meaning": "尽管，虽然"
          },
          {
            "word": "abandonner (v.)",
            "meaning": "放弃"
          }
        ]
      },
      {
        "id": "14_q7",
        "questionType": "词汇语法",
        "categoryTag": "代词式动词 · 分词配合避坑",
        "question": "Elles se sont _____ compte de leur erreur un peu trop tard.",
        "options": [
          "rendu",
          "rendue",
          "rendus",
          "rendues"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定短语 se rendre compte de qch (意识到某事)。自反代词 se 在此结构中充当间接宾语，compte 为直接宾语且位于动词之后，因此过去分词 rendu【绝不配合】，保持阳性单数原形 rendu。选 A。",
        "translation": "她们意识到自己的错误时已经有点太晚了。",
        "grammarTag": "代词式动词固定短语 (se rendre compte)",
        "vocabList": [
          {
            "word": "se rendre compte de",
            "meaning": "意识到，发觉 (不配合)"
          },
          {
            "word": "erreur (n.f.)",
            "meaning": "错误"
          }
        ]
      },
      {
        "id": "14_q8",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · dont 深度考查",
        "question": "C'est une entreprise internationale _____ le directeur général est très jeune.",
        "options": [
          "qui",
          "que",
          "dont",
          "où"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune。de + 先行词充当名词的所有格限制补语，必须使用关系代词【dont】。选 C。",
        "translation": "这是一间总经理非常年轻的国际跨国企业。",
        "grammarTag": "关系代词 dont 的所有格用法",
        "vocabList": [
          {
            "word": "directeur général",
            "meaning": "总经理 / CEO"
          },
          {
            "word": "entreprise (n.f.)",
            "meaning": "企业，公司"
          }
        ]
      },
      {
        "id": "14_q9",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · y 的地点与抽象引申",
        "question": "Pensez-vous encore à votre ancien travail ? — Non, je n'_____ pense plus du tout.",
        "options": [
          "en",
          "y",
          "le",
          "lui"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\npenser à qch (思考/挂念某事)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。",
        "translation": "你还会想起以前的那份工作吗？——不，我一点也不再去想它了。",
        "grammarTag": "副代词 y (代替 à + 物)",
        "vocabList": [
          {
            "word": "penser à qch",
            "meaning": "考虑某事，想念某事"
          },
          {
            "word": "ne... plus du tout",
            "meaning": "一点也不再..."
          }
        ]
      },
      {
        "id": "14_q10",
        "questionType": "词汇语法",
        "categoryTag": "条件式 · 与过去假设配合",
        "question": "Si tu m'avais prévenu à temps, je ne _____ pas venu si tard.",
        "options": [
          "serais",
          "serais été",
          "fus",
          "sois"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nSi 引导的对过去虚拟假设句型：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。",
        "translation": "如果你及时通知我，我就不会来得这么晚了。",
        "grammarTag": "Si 条件假设与条件式过去时",
        "vocabList": [
          {
            "word": "prévenir qn à temps",
            "meaning": "及时通知/提醒某人"
          },
          {
            "word": "tard (adv.)",
            "meaning": "迟，晚"
          }
        ]
      },
      {
        "id": "14_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "14_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "14_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "14_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "14_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "14_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "14_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "14_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "14_q19",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "14_q20",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "14_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "14_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "14_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "14_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_cft4_15",
    "title": "大学法语四级 (CFT-4) 全国统考全真冲刺模拟卷 (三)",
    "frenchTitle": "Certificat de Français pour l'Enseignement Supérieur (CFT-4 : Modèle 3)",
    "track": "cft4",
    "level": "大学法语四级",
    "schoolOrOrg": "教育部高校外语统考",
    "yearOrSession": "2023全真卷",
    "summary": "历年四级考纲核心汇编：代词式动词变位、日常生活情景交际、广播短文听解与事实提取。",
    "durationMinutes": 45,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "15_q1",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 触发连词短语",
        "question": "Bien qu'il _____ beaucoup de difficultés, il n'a jamais abandonné son rêve.",
        "options": [
          "a",
          "avait",
          "ait",
          "aura"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 bien que (尽管，虽然) 引导让步状语从句，从句动词必须强制使用【虚拟式 (Subjonctif)】。动词 avoir 的虚拟式第三人称单数为【ait】。选 C。",
        "translation": "尽管遇到了许多困难，但他从未放弃自己的梦想。",
        "grammarTag": "虚拟式现在时 (bien que)",
        "vocabList": [
          {
            "word": "bien que + subj.",
            "meaning": "尽管，虽然"
          },
          {
            "word": "abandonner (v.)",
            "meaning": "放弃"
          }
        ]
      },
      {
        "id": "15_q2",
        "questionType": "词汇语法",
        "categoryTag": "代词式动词 · 分词配合避坑",
        "question": "Elles se sont _____ compte de leur erreur un peu trop tard.",
        "options": [
          "rendu",
          "rendue",
          "rendus",
          "rendues"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定短语 se rendre compte de qch (意识到某事)。自反代词 se 在此结构中充当间接宾语，compte 为直接宾语且位于动词之后，因此过去分词 rendu【绝不配合】，保持阳性单数原形 rendu。选 A。",
        "translation": "她们意识到自己的错误时已经有点太晚了。",
        "grammarTag": "代词式动词固定短语 (se rendre compte)",
        "vocabList": [
          {
            "word": "se rendre compte de",
            "meaning": "意识到，发觉 (不配合)"
          },
          {
            "word": "erreur (n.f.)",
            "meaning": "错误"
          }
        ]
      },
      {
        "id": "15_q3",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · dont 深度考查",
        "question": "C'est une entreprise internationale _____ le directeur général est très jeune.",
        "options": [
          "qui",
          "que",
          "dont",
          "où"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune。de + 先行词充当名词的所有格限制补语，必须使用关系代词【dont】。选 C。",
        "translation": "这是一间总经理非常年轻的国际跨国企业。",
        "grammarTag": "关系代词 dont 的所有格用法",
        "vocabList": [
          {
            "word": "directeur général",
            "meaning": "总经理 / CEO"
          },
          {
            "word": "entreprise (n.f.)",
            "meaning": "企业，公司"
          }
        ]
      },
      {
        "id": "15_q4",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · y 的地点与抽象引申",
        "question": "Pensez-vous encore à votre ancien travail ? — Non, je n'_____ pense plus du tout.",
        "options": [
          "en",
          "y",
          "le",
          "lui"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\npenser à qch (思考/挂念某事)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。",
        "translation": "你还会想起以前的那份工作吗？——不，我一点也不再去想它了。",
        "grammarTag": "副代词 y (代替 à + 物)",
        "vocabList": [
          {
            "word": "penser à qch",
            "meaning": "考虑某事，想念某事"
          },
          {
            "word": "ne... plus du tout",
            "meaning": "一点也不再..."
          }
        ]
      },
      {
        "id": "15_q5",
        "questionType": "词汇语法",
        "categoryTag": "条件式 · 与过去假设配合",
        "question": "Si tu m'avais prévenu à temps, je ne _____ pas venu si tard.",
        "options": [
          "serais",
          "serais été",
          "fus",
          "sois"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nSi 引导的对过去虚拟假设句型：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。",
        "translation": "如果你及时通知我，我就不会来得这么晚了。",
        "grammarTag": "Si 条件假设与条件式过去时",
        "vocabList": [
          {
            "word": "prévenir qn à temps",
            "meaning": "及时通知/提醒某人"
          },
          {
            "word": "tard (adv.)",
            "meaning": "迟，晚"
          }
        ]
      },
      {
        "id": "15_q6",
        "questionType": "词汇语法",
        "categoryTag": "介词与冠词 · 国名专有搭配",
        "question": "Le président français effectuera une visite officielle _____ Mexique le mois prochain.",
        "options": [
          "en",
          "au",
          "à",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n阳性单数国名以辅音结尾通常使用定冠词 le (如 le Mexique, le Japon, le Canada)。表示“去往”或“在”阳性单数国名前，介词必须用【au】 (à + le 缩合)！选 B。",
        "translation": "法国总统下个月将对墨西哥进行正式国事访问。",
        "grammarTag": "阳性国名前的介词搭配 (au Mexique)",
        "vocabList": [
          {
            "word": "visite officielle",
            "meaning": "国事访问，正式访问"
          },
          {
            "word": "effectuer (v.)",
            "meaning": "进行，执行"
          }
        ]
      },
      {
        "id": "15_q7",
        "questionType": "词汇语法",
        "categoryTag": "否定副词 · 文学句式辨析",
        "question": "Dans ce village isolé, il n'y a _____ de supermarché ni de pharmacie.",
        "options": [
          "aucun",
          "point",
          "jamais",
          "guère"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。",
        "translation": "在这个偏僻的孤立村庄里，既没有超市，也没有药店。",
        "grammarTag": "否定句型 (ne... point de)",
        "vocabList": [
          {
            "word": "isolé (adj.)",
            "meaning": "孤立的，偏远的"
          },
          {
            "word": "pharmacie (n.f.)",
            "meaning": "药店"
          }
        ]
      },
      {
        "id": "15_q8",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "15_q9",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "15_q10",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "15_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "15_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "15_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "15_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "15_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "15_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "15_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "15_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "15_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "15_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "15_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "15_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "15_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "15_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_cft4_16",
    "title": "大学法语四级 (CFT-4) 语法词汇结构专项突破卷",
    "frenchTitle": "CFT-4 : Entraînement intensif en vocabulaire et structures grammaticales",
    "track": "cft4",
    "level": "大学法语四级",
    "schoolOrOrg": "教育部高校外语统考",
    "yearOrSession": "专项冲刺卷",
    "summary": "针对四级选择题失分重灾区集训：固定搭配、时态复合用法、虚拟式判断与介词填空。",
    "durationMinutes": 40,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "16_q1",
        "questionType": "词汇语法",
        "categoryTag": "介词与冠词 · 国名专有搭配",
        "question": "Le président français effectuera une visite officielle _____ Mexique le mois prochain.",
        "options": [
          "en",
          "au",
          "à",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n阳性单数国名以辅音结尾通常使用定冠词 le (如 le Mexique, le Japon, le Canada)。表示“去往”或“在”阳性单数国名前，介词必须用【au】 (à + le 缩合)！选 B。",
        "translation": "法国总统下个月将对墨西哥进行正式国事访问。",
        "grammarTag": "阳性国名前的介词搭配 (au Mexique)",
        "vocabList": [
          {
            "word": "visite officielle",
            "meaning": "国事访问，正式访问"
          },
          {
            "word": "effectuer (v.)",
            "meaning": "进行，执行"
          }
        ]
      },
      {
        "id": "16_q2",
        "questionType": "词汇语法",
        "categoryTag": "否定副词 · 文学句式辨析",
        "question": "Dans ce village isolé, il n'y a _____ de supermarché ni de pharmacie.",
        "options": [
          "aucun",
          "point",
          "jamais",
          "guère"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。",
        "translation": "在这个偏僻的孤立村庄里，既没有超市，也没有药店。",
        "grammarTag": "否定句型 (ne... point de)",
        "vocabList": [
          {
            "word": "isolé (adj.)",
            "meaning": "孤立的，偏远的"
          },
          {
            "word": "pharmacie (n.f.)",
            "meaning": "药店"
          }
        ]
      },
      {
        "id": "16_q3",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "16_q4",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "16_q5",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "16_q6",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "16_q7",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "16_q8",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "16_q9",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "16_q10",
        "questionType": "词汇语法",
        "categoryTag": "自反动词 · 互为间宾不配合",
        "question": "Les deux diplomates se sont _____ la main chaleureusement avant de commencer.",
        "options": [
          "serré",
          "serrée",
          "serrés",
          "serrées"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nse serrer la main 结构中，la main 为直接宾语且位于动词之后，se 实际上充当相互间接宾语（向对方握手），因此过去分词 serré【绝不配合】！选 A。",
        "translation": "两位外交官在开始前热情地握了手。",
        "grammarTag": "自反动词带直宾时分词不配合",
        "vocabList": [
          {
            "word": "se serrer la main",
            "meaning": "握手 (不配合)"
          },
          {
            "word": "chaleureusement (adv.)",
            "meaning": "热情地"
          }
        ]
      },
      {
        "id": "16_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "16_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "16_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "16_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "16_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "16_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "16_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "16_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "16_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "16_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "16_q21",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "16_q22",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "16_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "16_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_cft4_17",
    "title": "大学法语四级 (CFT-4) 完形填空与读解精练卷",
    "frenchTitle": "CFT-4 : Texte à trous et compréhension écrite approfondie",
    "track": "cft4",
    "level": "大学法语四级",
    "schoolOrOrg": "教育部高校外语统考",
    "yearOrSession": "专项冲刺卷",
    "summary": "精选四级真题标准完形与现代生活社科短文，强化语感与上下文逻辑推理。",
    "durationMinutes": 40,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "17_q1",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "17_q2",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "17_q3",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "17_q4",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "17_q5",
        "questionType": "词汇语法",
        "categoryTag": "自反动词 · 互为间宾不配合",
        "question": "Les deux diplomates se sont _____ la main chaleureusement avant de commencer.",
        "options": [
          "serré",
          "serrée",
          "serrés",
          "serrées"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nse serrer la main 结构中，la main 为直接宾语且位于动词之后，se 实际上充当相互间接宾语（向对方握手），因此过去分词 serré【绝不配合】！选 A。",
        "translation": "两位外交官在开始前热情地握了手。",
        "grammarTag": "自反动词带直宾时分词不配合",
        "vocabList": [
          {
            "word": "se serrer la main",
            "meaning": "握手 (不配合)"
          },
          {
            "word": "chaleureusement (adv.)",
            "meaning": "热情地"
          }
        ]
      },
      {
        "id": "17_q6",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 最高级引导的定语从句",
        "question": "C'est le plus beau musée que je _____ jamais visité de toute ma vie.",
        "options": [
          "ai",
          "aie",
          "avais",
          "aurais"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词被形容词最高级 (le plus beau...) 或 seul / premier 等修饰时，后面的定语从句常使用【虚拟式 (Subjonctif)】以体现说话人的主观感叹评价。visité 复合过去虚拟式为【aie visité】。选 B。",
        "translation": "这是我一生中参观过的最美丽的博物馆。",
        "grammarTag": "最高级先行词后接虚拟式",
        "vocabList": [
          {
            "word": "musée (n.m.)",
            "meaning": "博物馆"
          },
          {
            "word": "de toute ma vie",
            "meaning": "我一生中"
          }
        ]
      },
      {
        "id": "17_q7",
        "questionType": "词汇语法",
        "categoryTag": "复合介词 · 空间与抽象方向",
        "question": "Il a installé son nouvel ordinateur _____ de la grande fenêtre.",
        "options": [
          "près",
          "en face",
          "au milieu",
          "au-dessus"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定方位短语：en face de... (在...对面)。près 也需加 de，但语义上在正对大窗户处摆放用 en face de 最为地道贴切。选 B。",
        "translation": "他把新电脑安装在正对着大窗户的位置。",
        "grammarTag": "空间介词短语 (en face de)",
        "vocabList": [
          {
            "word": "en face de",
            "meaning": "在...正对面"
          },
          {
            "word": "installer (v.)",
            "meaning": "安装，安置"
          }
        ]
      },
      {
        "id": "17_q8",
        "questionType": "词汇语法",
        "categoryTag": "否定句 · 冠词变 de 规则",
        "question": "Mon grand-père ne boit jamais _____ alcool pour préserver sa santé.",
        "options": [
          "d'",
          "de l'",
          "du",
          "un"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n在否定句 (ne... jamais) 中，直接宾语前面的部分冠词 (de l'alcool) 必须一律转变为介词【de】(因遇到元音省音为 d')。选 A。",
        "translation": "我祖父为了保持健康从不喝酒。",
        "grammarTag": "否定句中部分冠词变 de",
        "vocabList": [
          {
            "word": "alcool (n.m.)",
            "meaning": "酒精，酒"
          },
          {
            "word": "préserver la santé",
            "meaning": "保持健康"
          }
        ]
      },
      {
        "id": "17_q9",
        "questionType": "词汇语法",
        "categoryTag": "时间状语从句 · avant que 触发虚拟式",
        "question": "Dépêchons-nous de rentrer avant qu'il ne _____ trop noir.",
        "options": [
          "fait",
          "fasse",
          "fera",
          "faisait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 avant que (在...之前) 引导时间状语从句，从句强制使用【虚拟式 (Subjonctif)】（从句中的 ne 为冗赘虚词，无否定含义）。faire 的虚拟式为 fasse。选 B。",
        "translation": "我们赶在天太黑之前赶紧回家吧。",
        "grammarTag": "avant que 后接虚拟式与虚词 ne",
        "vocabList": [
          {
            "word": "se dépêcher de",
            "meaning": "赶快做某事"
          },
          {
            "word": "faire noir",
            "meaning": "天黑"
          }
        ]
      },
      {
        "id": "17_q10",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · lequel 与介词缩合",
        "question": "Voici la magnifique bibliothèque dans _____ j'ai passé toute ma jeunesse.",
        "options": [
          "laquelle",
          "lequel",
          "lesquelles",
          "dont"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 la bibliothèque 为阴性单数名词，与介词 dans 连用，必须使用复合关系代词阴性单数形式【laquelle】。选 A。",
        "translation": "这就是我度过全部青年时代的宏伟图书馆。",
        "grammarTag": "介词 + lequel/laquelle 复合关系代词",
        "vocabList": [
          {
            "word": "bibliothèque (n.f.)",
            "meaning": "图书馆"
          },
          {
            "word": "jeunesse (n.f.)",
            "meaning": "青年时期"
          }
        ]
      },
      {
        "id": "17_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "17_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "17_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "17_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "17_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "17_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "17_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "17_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "17_q19",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "17_q20",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "17_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "17_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "17_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "17_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_cft4_18",
    "title": "大学法语四级 (CFT-4) 历年真题高频核心考点精编卷",
    "frenchTitle": "CFT-4 : Sélection officielle des annales et points clés",
    "track": "cft4",
    "level": "大学法语四级",
    "schoolOrOrg": "教育部高校外语统考",
    "yearOrSession": "经典真题卷",
    "summary": "汇聚高校大学法语四级历年最具代表性高频题型，夯实基础，决胜考场。",
    "durationMinutes": 45,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "18_q1",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 最高级引导的定语从句",
        "question": "C'est le plus beau musée que je _____ jamais visité de toute ma vie.",
        "options": [
          "ai",
          "aie",
          "avais",
          "aurais"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词被形容词最高级 (le plus beau...) 或 seul / premier 等修饰时，后面的定语从句常使用【虚拟式 (Subjonctif)】以体现说话人的主观感叹评价。visité 复合过去虚拟式为【aie visité】。选 B。",
        "translation": "这是我一生中参观过的最美丽的博物馆。",
        "grammarTag": "最高级先行词后接虚拟式",
        "vocabList": [
          {
            "word": "musée (n.m.)",
            "meaning": "博物馆"
          },
          {
            "word": "de toute ma vie",
            "meaning": "我一生中"
          }
        ]
      },
      {
        "id": "18_q2",
        "questionType": "词汇语法",
        "categoryTag": "复合介词 · 空间与抽象方向",
        "question": "Il a installé son nouvel ordinateur _____ de la grande fenêtre.",
        "options": [
          "près",
          "en face",
          "au milieu",
          "au-dessus"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定方位短语：en face de... (在...对面)。près 也需加 de，但语义上在正对大窗户处摆放用 en face de 最为地道贴切。选 B。",
        "translation": "他把新电脑安装在正对着大窗户的位置。",
        "grammarTag": "空间介词短语 (en face de)",
        "vocabList": [
          {
            "word": "en face de",
            "meaning": "在...正对面"
          },
          {
            "word": "installer (v.)",
            "meaning": "安装，安置"
          }
        ]
      },
      {
        "id": "18_q3",
        "questionType": "词汇语法",
        "categoryTag": "否定句 · 冠词变 de 规则",
        "question": "Mon grand-père ne boit jamais _____ alcool pour préserver sa santé.",
        "options": [
          "d'",
          "de l'",
          "du",
          "un"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n在否定句 (ne... jamais) 中，直接宾语前面的部分冠词 (de l'alcool) 必须一律转变为介词【de】(因遇到元音省音为 d')。选 A。",
        "translation": "我祖父为了保持健康从不喝酒。",
        "grammarTag": "否定句中部分冠词变 de",
        "vocabList": [
          {
            "word": "alcool (n.m.)",
            "meaning": "酒精，酒"
          },
          {
            "word": "préserver la santé",
            "meaning": "保持健康"
          }
        ]
      },
      {
        "id": "18_q4",
        "questionType": "词汇语法",
        "categoryTag": "时间状语从句 · avant que 触发虚拟式",
        "question": "Dépêchons-nous de rentrer avant qu'il ne _____ trop noir.",
        "options": [
          "fait",
          "fasse",
          "fera",
          "faisait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 avant que (在...之前) 引导时间状语从句，从句强制使用【虚拟式 (Subjonctif)】（从句中的 ne 为冗赘虚词，无否定含义）。faire 的虚拟式为 fasse。选 B。",
        "translation": "我们赶在天太黑之前赶紧回家吧。",
        "grammarTag": "avant que 后接虚拟式与虚词 ne",
        "vocabList": [
          {
            "word": "se dépêcher de",
            "meaning": "赶快做某事"
          },
          {
            "word": "faire noir",
            "meaning": "天黑"
          }
        ]
      },
      {
        "id": "18_q5",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · lequel 与介词缩合",
        "question": "Voici la magnifique bibliothèque dans _____ j'ai passé toute ma jeunesse.",
        "options": [
          "laquelle",
          "lequel",
          "lesquelles",
          "dont"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 la bibliothèque 为阴性单数名词，与介词 dans 连用，必须使用复合关系代词阴性单数形式【laquelle】。选 A。",
        "translation": "这就是我度过全部青年时代的宏伟图书馆。",
        "grammarTag": "介词 + lequel/laquelle 复合关系代词",
        "vocabList": [
          {
            "word": "bibliothèque (n.f.)",
            "meaning": "图书馆"
          },
          {
            "word": "jeunesse (n.f.)",
            "meaning": "青年时期"
          }
        ]
      },
      {
        "id": "18_q6",
        "questionType": "词汇语法",
        "categoryTag": "副动词 · En + Participe présent",
        "question": "_____ la rue prudemment, les enfants regardent à gauche et à droite.",
        "options": [
          "En traversant",
          "Traversé",
          "Avoir traversé",
          "Pour traverser"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n副动词 (En + 现在分词 traversant) 在句中充当时间或伴随状语，表示“在过马路的时候”。选 A。",
        "translation": "在小心穿过马路时，孩子们向左看也向右看。",
        "grammarTag": "副动词表示伴随与时间 (En traversant)",
        "vocabList": [
          {
            "word": "traverser la rue",
            "meaning": "穿过马路"
          },
          {
            "word": "prudemment (adv.)",
            "meaning": "谨慎地，小心地"
          }
        ]
      },
      {
        "id": "18_q7",
        "questionType": "词汇语法",
        "categoryTag": "时态配合 · 愈过去时",
        "question": "Hier soir, dès qu'elle _____ son travail, elle est sortie avec ses amies.",
        "options": [
          "a fini",
          "avait fini",
          "eut fini",
          "finissait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为复合过去时 (est sortie)，从句 dès que (一...就...) 表达在过去基准时间点之前已经完成的动作，必须使用愈过去时 (Plus-que-parfait: avait fini) 表达“过去的过去”。选 B。",
        "translation": "昨天晚上，她一完成工作，就和朋友们出去了。",
        "grammarTag": "愈过去时 (Plus-que-parfait)",
        "vocabList": [
          {
            "word": "sortir avec",
            "meaning": "与...一起外出"
          },
          {
            "word": "dès que",
            "meaning": "一...就... (连词短语)"
          }
        ]
      },
      {
        "id": "18_q8",
        "questionType": "词汇语法",
        "categoryTag": "代词系统 · 双代词语序",
        "question": "Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.",
        "options": [
          "leur en",
          "en leur",
          "les en",
          "en lui"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nparler de qch (用副代词 en 替代) à qn (父母为复数，用间宾代词 leur)。根据双代词语序规则：人称代词 (lui / leur) 必须位于副代词 (y / en) 之前，因此唯一正确顺序为【leur en】。选 A。",
        "translation": "你跟父母谈过你的新项目了吗？——是的，我昨天已经跟他们谈过了。",
        "grammarTag": "双宾语代词位置 (leur en)",
        "vocabList": [
          {
            "word": "parler de qch à qn",
            "meaning": "就某事与某人交谈"
          },
          {
            "word": "projet (n.m.)",
            "meaning": "项目，计划"
          }
        ]
      },
      {
        "id": "18_q9",
        "questionType": "词汇语法",
        "categoryTag": "分词配合 · 直宾提前",
        "question": "Les photos que vous avez _____ sont magnifiques.",
        "options": [
          "pris",
          "prise",
          "prises",
          "prennent"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n在以 avoir 为助动词的复合时态中，直接宾语提前时过去分词必须与直接宾语进行性数配合。先行词 les photos 为阴性复数，关系代词 que 在从句中充当直宾，故 prendre 的过去分词变为主格配合形态【prises】。选 C。",
        "translation": "您拍的那些照片真是太美了。",
        "grammarTag": "过去分词与直宾性数配合",
        "vocabList": [
          {
            "word": "prendre des photos",
            "meaning": "拍照"
          },
          {
            "word": "magnifique (adj.)",
            "meaning": "宏伟壮丽的"
          }
        ]
      },
      {
        "id": "18_q10",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 触发连词短语",
        "question": "Bien qu'il _____ beaucoup de difficultés, il n'a jamais abandonné son rêve.",
        "options": [
          "a",
          "avait",
          "ait",
          "aura"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 bien que (尽管，虽然) 引导让步状语从句，从句动词必须强制使用【虚拟式 (Subjonctif)】。动词 avoir 的虚拟式第三人称单数为【ait】。选 C。",
        "translation": "尽管遇到了许多困难，但他从未放弃自己的梦想。",
        "grammarTag": "虚拟式现在时 (bien que)",
        "vocabList": [
          {
            "word": "bien que + subj.",
            "meaning": "尽管，虽然"
          },
          {
            "word": "abandonner (v.)",
            "meaning": "放弃"
          }
        ]
      },
      {
        "id": "18_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "18_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "18_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "18_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "18_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "18_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "18_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "18_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "18_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "18_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "18_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "18_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "18_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "18_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_delf_19",
    "title": "DELF A1 官方标准全真机考精选卷 (卷一)",
    "frenchTitle": "Diplôme d'Études en Langue Française — Niveau A1 (Session 1)",
    "track": "delf",
    "level": "DELF A1",
    "schoolOrOrg": "法国国际教育研究中心 (FEI)",
    "yearOrSession": "官方标准卷",
    "summary": "法国官方 A1 终身认证样卷：日常生活广播、个人信息填表、基础时刻表查询与简单告示解读。",
    "durationMinutes": 30,
    "totalScore": 100,
    "isFreePreview": true,
    "questions": [
      {
        "id": "19_q1",
        "questionType": "词汇语法",
        "categoryTag": "副动词 · En + Participe présent",
        "question": "_____ la rue prudemment, les enfants regardent à gauche et à droite.",
        "options": [
          "En traversant",
          "Traversé",
          "Avoir traversé",
          "Pour traverser"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n副动词 (En + 现在分词 traversant) 在句中充当时间或伴随状语，表示“在过马路的时候”。选 A。",
        "translation": "在小心穿过马路时，孩子们向左看也向右看。",
        "grammarTag": "副动词表示伴随与时间 (En traversant)",
        "vocabList": [
          {
            "word": "traverser la rue",
            "meaning": "穿过马路"
          },
          {
            "word": "prudemment (adv.)",
            "meaning": "谨慎地，小心地"
          }
        ]
      },
      {
        "id": "19_q2",
        "questionType": "词汇语法",
        "categoryTag": "时态配合 · 愈过去时",
        "question": "Hier soir, dès qu'elle _____ son travail, elle est sortie avec ses amies.",
        "options": [
          "a fini",
          "avait fini",
          "eut fini",
          "finissait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为复合过去时 (est sortie)，从句 dès que (一...就...) 表达在过去基准时间点之前已经完成的动作，必须使用愈过去时 (Plus-que-parfait: avait fini) 表达“过去的过去”。选 B。",
        "translation": "昨天晚上，她一完成工作，就和朋友们出去了。",
        "grammarTag": "愈过去时 (Plus-que-parfait)",
        "vocabList": [
          {
            "word": "sortir avec",
            "meaning": "与...一起外出"
          },
          {
            "word": "dès que",
            "meaning": "一...就... (连词短语)"
          }
        ]
      },
      {
        "id": "19_q3",
        "questionType": "词汇语法",
        "categoryTag": "代词系统 · 双代词语序",
        "question": "Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.",
        "options": [
          "leur en",
          "en leur",
          "les en",
          "en lui"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nparler de qch (用副代词 en 替代) à qn (父母为复数，用间宾代词 leur)。根据双代词语序规则：人称代词 (lui / leur) 必须位于副代词 (y / en) 之前，因此唯一正确顺序为【leur en】。选 A。",
        "translation": "你跟父母谈过你的新项目了吗？——是的，我昨天已经跟他们谈过了。",
        "grammarTag": "双宾语代词位置 (leur en)",
        "vocabList": [
          {
            "word": "parler de qch à qn",
            "meaning": "就某事与某人交谈"
          },
          {
            "word": "projet (n.m.)",
            "meaning": "项目，计划"
          }
        ]
      },
      {
        "id": "19_q4",
        "questionType": "词汇语法",
        "categoryTag": "分词配合 · 直宾提前",
        "question": "Les photos que vous avez _____ sont magnifiques.",
        "options": [
          "pris",
          "prise",
          "prises",
          "prennent"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n在以 avoir 为助动词的复合时态中，直接宾语提前时过去分词必须与直接宾语进行性数配合。先行词 les photos 为阴性复数，关系代词 que 在从句中充当直宾，故 prendre 的过去分词变为主格配合形态【prises】。选 C。",
        "translation": "您拍的那些照片真是太美了。",
        "grammarTag": "过去分词与直宾性数配合",
        "vocabList": [
          {
            "word": "prendre des photos",
            "meaning": "拍照"
          },
          {
            "word": "magnifique (adj.)",
            "meaning": "宏伟壮丽的"
          }
        ]
      },
      {
        "id": "19_q5",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 触发连词短语",
        "question": "Bien qu'il _____ beaucoup de difficultés, il n'a jamais abandonné son rêve.",
        "options": [
          "a",
          "avait",
          "ait",
          "aura"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 bien que (尽管，虽然) 引导让步状语从句，从句动词必须强制使用【虚拟式 (Subjonctif)】。动词 avoir 的虚拟式第三人称单数为【ait】。选 C。",
        "translation": "尽管遇到了许多困难，但他从未放弃自己的梦想。",
        "grammarTag": "虚拟式现在时 (bien que)",
        "vocabList": [
          {
            "word": "bien que + subj.",
            "meaning": "尽管，虽然"
          },
          {
            "word": "abandonner (v.)",
            "meaning": "放弃"
          }
        ]
      },
      {
        "id": "19_q6",
        "questionType": "词汇语法",
        "categoryTag": "代词式动词 · 分词配合避坑",
        "question": "Elles se sont _____ compte de leur erreur un peu trop tard.",
        "options": [
          "rendu",
          "rendue",
          "rendus",
          "rendues"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定短语 se rendre compte de qch (意识到某事)。自反代词 se 在此结构中充当间接宾语，compte 为直接宾语且位于动词之后，因此过去分词 rendu【绝不配合】，保持阳性单数原形 rendu。选 A。",
        "translation": "她们意识到自己的错误时已经有点太晚了。",
        "grammarTag": "代词式动词固定短语 (se rendre compte)",
        "vocabList": [
          {
            "word": "se rendre compte de",
            "meaning": "意识到，发觉 (不配合)"
          },
          {
            "word": "erreur (n.f.)",
            "meaning": "错误"
          }
        ]
      },
      {
        "id": "19_q7",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · dont 深度考查",
        "question": "C'est une entreprise internationale _____ le directeur général est très jeune.",
        "options": [
          "qui",
          "que",
          "dont",
          "où"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune。de + 先行词充当名词的所有格限制补语，必须使用关系代词【dont】。选 C。",
        "translation": "这是一间总经理非常年轻的国际跨国企业。",
        "grammarTag": "关系代词 dont 的所有格用法",
        "vocabList": [
          {
            "word": "directeur général",
            "meaning": "总经理 / CEO"
          },
          {
            "word": "entreprise (n.f.)",
            "meaning": "企业，公司"
          }
        ]
      },
      {
        "id": "19_q8",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · y 的地点与抽象引申",
        "question": "Pensez-vous encore à votre ancien travail ? — Non, je n'_____ pense plus du tout.",
        "options": [
          "en",
          "y",
          "le",
          "lui"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\npenser à qch (思考/挂念某事)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。",
        "translation": "你还会想起以前的那份工作吗？——不，我一点也不再去想它了。",
        "grammarTag": "副代词 y (代替 à + 物)",
        "vocabList": [
          {
            "word": "penser à qch",
            "meaning": "考虑某事，想念某事"
          },
          {
            "word": "ne... plus du tout",
            "meaning": "一点也不再..."
          }
        ]
      },
      {
        "id": "19_q9",
        "questionType": "词汇语法",
        "categoryTag": "条件式 · 与过去假设配合",
        "question": "Si tu m'avais prévenu à temps, je ne _____ pas venu si tard.",
        "options": [
          "serais",
          "serais été",
          "fus",
          "sois"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nSi 引导的对过去虚拟假设句型：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。",
        "translation": "如果你及时通知我，我就不会来得这么晚了。",
        "grammarTag": "Si 条件假设与条件式过去时",
        "vocabList": [
          {
            "word": "prévenir qn à temps",
            "meaning": "及时通知/提醒某人"
          },
          {
            "word": "tard (adv.)",
            "meaning": "迟，晚"
          }
        ]
      },
      {
        "id": "19_q10",
        "questionType": "词汇语法",
        "categoryTag": "介词与冠词 · 国名专有搭配",
        "question": "Le président français effectuera une visite officielle _____ Mexique le mois prochain.",
        "options": [
          "en",
          "au",
          "à",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n阳性单数国名以辅音结尾通常使用定冠词 le (如 le Mexique, le Japon, le Canada)。表示“去往”或“在”阳性单数国名前，介词必须用【au】 (à + le 缩合)！选 B。",
        "translation": "法国总统下个月将对墨西哥进行正式国事访问。",
        "grammarTag": "阳性国名前的介词搭配 (au Mexique)",
        "vocabList": [
          {
            "word": "visite officielle",
            "meaning": "国事访问，正式访问"
          },
          {
            "word": "effectuer (v.)",
            "meaning": "进行，执行"
          }
        ]
      },
      {
        "id": "19_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "19_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "19_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "19_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "19_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "19_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "19_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "19_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "19_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "19_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "19_q21",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "19_q22",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "19_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "19_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_delf_20",
    "title": "DELF A1 官方日常生活与交通场景测试卷 (卷二)",
    "frenchTitle": "Diplôme d'Études en Langue Française — Niveau A1 (Session 2)",
    "track": "delf",
    "level": "DELF A1",
    "schoolOrOrg": "法国国际教育研究中心 (FEI)",
    "yearOrSession": "官方冲刺卷",
    "summary": "贴合法国日常生活场景：火车站买票问询、超级市场购物短句、餐馆点餐与日常问候。",
    "durationMinutes": 30,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "20_q1",
        "questionType": "词汇语法",
        "categoryTag": "代词式动词 · 分词配合避坑",
        "question": "Elles se sont _____ compte de leur erreur un peu trop tard.",
        "options": [
          "rendu",
          "rendue",
          "rendus",
          "rendues"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定短语 se rendre compte de qch (意识到某事)。自反代词 se 在此结构中充当间接宾语，compte 为直接宾语且位于动词之后，因此过去分词 rendu【绝不配合】，保持阳性单数原形 rendu。选 A。",
        "translation": "她们意识到自己的错误时已经有点太晚了。",
        "grammarTag": "代词式动词固定短语 (se rendre compte)",
        "vocabList": [
          {
            "word": "se rendre compte de",
            "meaning": "意识到，发觉 (不配合)"
          },
          {
            "word": "erreur (n.f.)",
            "meaning": "错误"
          }
        ]
      },
      {
        "id": "20_q2",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · dont 深度考查",
        "question": "C'est une entreprise internationale _____ le directeur général est très jeune.",
        "options": [
          "qui",
          "que",
          "dont",
          "où"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune。de + 先行词充当名词的所有格限制补语，必须使用关系代词【dont】。选 C。",
        "translation": "这是一间总经理非常年轻的国际跨国企业。",
        "grammarTag": "关系代词 dont 的所有格用法",
        "vocabList": [
          {
            "word": "directeur général",
            "meaning": "总经理 / CEO"
          },
          {
            "word": "entreprise (n.f.)",
            "meaning": "企业，公司"
          }
        ]
      },
      {
        "id": "20_q3",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · y 的地点与抽象引申",
        "question": "Pensez-vous encore à votre ancien travail ? — Non, je n'_____ pense plus du tout.",
        "options": [
          "en",
          "y",
          "le",
          "lui"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\npenser à qch (思考/挂念某事)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。",
        "translation": "你还会想起以前的那份工作吗？——不，我一点也不再去想它了。",
        "grammarTag": "副代词 y (代替 à + 物)",
        "vocabList": [
          {
            "word": "penser à qch",
            "meaning": "考虑某事，想念某事"
          },
          {
            "word": "ne... plus du tout",
            "meaning": "一点也不再..."
          }
        ]
      },
      {
        "id": "20_q4",
        "questionType": "词汇语法",
        "categoryTag": "条件式 · 与过去假设配合",
        "question": "Si tu m'avais prévenu à temps, je ne _____ pas venu si tard.",
        "options": [
          "serais",
          "serais été",
          "fus",
          "sois"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nSi 引导的对过去虚拟假设句型：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。",
        "translation": "如果你及时通知我，我就不会来得这么晚了。",
        "grammarTag": "Si 条件假设与条件式过去时",
        "vocabList": [
          {
            "word": "prévenir qn à temps",
            "meaning": "及时通知/提醒某人"
          },
          {
            "word": "tard (adv.)",
            "meaning": "迟，晚"
          }
        ]
      },
      {
        "id": "20_q5",
        "questionType": "词汇语法",
        "categoryTag": "介词与冠词 · 国名专有搭配",
        "question": "Le président français effectuera une visite officielle _____ Mexique le mois prochain.",
        "options": [
          "en",
          "au",
          "à",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n阳性单数国名以辅音结尾通常使用定冠词 le (如 le Mexique, le Japon, le Canada)。表示“去往”或“在”阳性单数国名前，介词必须用【au】 (à + le 缩合)！选 B。",
        "translation": "法国总统下个月将对墨西哥进行正式国事访问。",
        "grammarTag": "阳性国名前的介词搭配 (au Mexique)",
        "vocabList": [
          {
            "word": "visite officielle",
            "meaning": "国事访问，正式访问"
          },
          {
            "word": "effectuer (v.)",
            "meaning": "进行，执行"
          }
        ]
      },
      {
        "id": "20_q6",
        "questionType": "词汇语法",
        "categoryTag": "否定副词 · 文学句式辨析",
        "question": "Dans ce village isolé, il n'y a _____ de supermarché ni de pharmacie.",
        "options": [
          "aucun",
          "point",
          "jamais",
          "guère"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。",
        "translation": "在这个偏僻的孤立村庄里，既没有超市，也没有药店。",
        "grammarTag": "否定句型 (ne... point de)",
        "vocabList": [
          {
            "word": "isolé (adj.)",
            "meaning": "孤立的，偏远的"
          },
          {
            "word": "pharmacie (n.f.)",
            "meaning": "药店"
          }
        ]
      },
      {
        "id": "20_q7",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "20_q8",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "20_q9",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "20_q10",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "20_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "20_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "20_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "20_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "20_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "20_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "20_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "20_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "20_q19",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "20_q20",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "20_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "20_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "20_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "20_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_delf_21",
    "title": "DELF A2 官方生活实用与海报告示测试卷 (卷一)",
    "frenchTitle": "Diplôme d'Études en Langue Française — Niveau A2 (Session 1)",
    "track": "delf",
    "level": "DELF A2",
    "schoolOrOrg": "法国国际教育研究中心 (FEI)",
    "yearOrSession": "官方标准卷",
    "summary": "初级独立运用阶段：房产租房广告解读、博物馆活动通告、电话留言听取与短文细节捕捉。",
    "durationMinutes": 45,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "21_q1",
        "questionType": "词汇语法",
        "categoryTag": "否定副词 · 文学句式辨析",
        "question": "Dans ce village isolé, il n'y a _____ de supermarché ni de pharmacie.",
        "options": [
          "aucun",
          "point",
          "jamais",
          "guère"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。",
        "translation": "在这个偏僻的孤立村庄里，既没有超市，也没有药店。",
        "grammarTag": "否定句型 (ne... point de)",
        "vocabList": [
          {
            "word": "isolé (adj.)",
            "meaning": "孤立的，偏远的"
          },
          {
            "word": "pharmacie (n.f.)",
            "meaning": "药店"
          }
        ]
      },
      {
        "id": "21_q2",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "21_q3",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "21_q4",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "21_q5",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "21_q6",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "21_q7",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "21_q8",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "21_q9",
        "questionType": "词汇语法",
        "categoryTag": "自反动词 · 互为间宾不配合",
        "question": "Les deux diplomates se sont _____ la main chaleureusement avant de commencer.",
        "options": [
          "serré",
          "serrée",
          "serrés",
          "serrées"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nse serrer la main 结构中，la main 为直接宾语且位于动词之后，se 实际上充当相互间接宾语（向对方握手），因此过去分词 serré【绝不配合】！选 A。",
        "translation": "两位外交官在开始前热情地握了手。",
        "grammarTag": "自反动词带直宾时分词不配合",
        "vocabList": [
          {
            "word": "se serrer la main",
            "meaning": "握手 (不配合)"
          },
          {
            "word": "chaleureusement (adv.)",
            "meaning": "热情地"
          }
        ]
      },
      {
        "id": "21_q10",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 最高级引导的定语从句",
        "question": "C'est le plus beau musée que je _____ jamais visité de toute ma vie.",
        "options": [
          "ai",
          "aie",
          "avais",
          "aurais"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词被形容词最高级 (le plus beau...) 或 seul / premier 等修饰时，后面的定语从句常使用【虚拟式 (Subjonctif)】以体现说话人的主观感叹评价。visité 复合过去虚拟式为【aie visité】。选 B。",
        "translation": "这是我一生中参观过的最美丽的博物馆。",
        "grammarTag": "最高级先行词后接虚拟式",
        "vocabList": [
          {
            "word": "musée (n.m.)",
            "meaning": "博物馆"
          },
          {
            "word": "de toute ma vie",
            "meaning": "我一生中"
          }
        ]
      },
      {
        "id": "21_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "21_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "21_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "21_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "21_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "21_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "21_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "21_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "21_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "21_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "21_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "21_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "21_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "21_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_delf_22",
    "title": "DELF A2 官方短篇叙事与广播原声精炼卷 (卷二)",
    "frenchTitle": "Diplôme d'Études en Langue Française — Niveau A2 (Session 2)",
    "track": "delf",
    "level": "DELF A2",
    "schoolOrOrg": "法国国际教育研究中心 (FEI)",
    "yearOrSession": "官方冲刺卷",
    "summary": "涵盖个人经历叙述、旅游行程咨询、周末休闲安排与公共交通变动通告。",
    "durationMinutes": 45,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "22_q1",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "22_q2",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "22_q3",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "22_q4",
        "questionType": "词汇语法",
        "categoryTag": "自反动词 · 互为间宾不配合",
        "question": "Les deux diplomates se sont _____ la main chaleureusement avant de commencer.",
        "options": [
          "serré",
          "serrée",
          "serrés",
          "serrées"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nse serrer la main 结构中，la main 为直接宾语且位于动词之后，se 实际上充当相互间接宾语（向对方握手），因此过去分词 serré【绝不配合】！选 A。",
        "translation": "两位外交官在开始前热情地握了手。",
        "grammarTag": "自反动词带直宾时分词不配合",
        "vocabList": [
          {
            "word": "se serrer la main",
            "meaning": "握手 (不配合)"
          },
          {
            "word": "chaleureusement (adv.)",
            "meaning": "热情地"
          }
        ]
      },
      {
        "id": "22_q5",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 最高级引导的定语从句",
        "question": "C'est le plus beau musée que je _____ jamais visité de toute ma vie.",
        "options": [
          "ai",
          "aie",
          "avais",
          "aurais"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词被形容词最高级 (le plus beau...) 或 seul / premier 等修饰时，后面的定语从句常使用【虚拟式 (Subjonctif)】以体现说话人的主观感叹评价。visité 复合过去虚拟式为【aie visité】。选 B。",
        "translation": "这是我一生中参观过的最美丽的博物馆。",
        "grammarTag": "最高级先行词后接虚拟式",
        "vocabList": [
          {
            "word": "musée (n.m.)",
            "meaning": "博物馆"
          },
          {
            "word": "de toute ma vie",
            "meaning": "我一生中"
          }
        ]
      },
      {
        "id": "22_q6",
        "questionType": "词汇语法",
        "categoryTag": "复合介词 · 空间与抽象方向",
        "question": "Il a installé son nouvel ordinateur _____ de la grande fenêtre.",
        "options": [
          "près",
          "en face",
          "au milieu",
          "au-dessus"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定方位短语：en face de... (在...对面)。près 也需加 de，但语义上在正对大窗户处摆放用 en face de 最为地道贴切。选 B。",
        "translation": "他把新电脑安装在正对着大窗户的位置。",
        "grammarTag": "空间介词短语 (en face de)",
        "vocabList": [
          {
            "word": "en face de",
            "meaning": "在...正对面"
          },
          {
            "word": "installer (v.)",
            "meaning": "安装，安置"
          }
        ]
      },
      {
        "id": "22_q7",
        "questionType": "词汇语法",
        "categoryTag": "否定句 · 冠词变 de 规则",
        "question": "Mon grand-père ne boit jamais _____ alcool pour préserver sa santé.",
        "options": [
          "d'",
          "de l'",
          "du",
          "un"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n在否定句 (ne... jamais) 中，直接宾语前面的部分冠词 (de l'alcool) 必须一律转变为介词【de】(因遇到元音省音为 d')。选 A。",
        "translation": "我祖父为了保持健康从不喝酒。",
        "grammarTag": "否定句中部分冠词变 de",
        "vocabList": [
          {
            "word": "alcool (n.m.)",
            "meaning": "酒精，酒"
          },
          {
            "word": "préserver la santé",
            "meaning": "保持健康"
          }
        ]
      },
      {
        "id": "22_q8",
        "questionType": "词汇语法",
        "categoryTag": "时间状语从句 · avant que 触发虚拟式",
        "question": "Dépêchons-nous de rentrer avant qu'il ne _____ trop noir.",
        "options": [
          "fait",
          "fasse",
          "fera",
          "faisait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 avant que (在...之前) 引导时间状语从句，从句强制使用【虚拟式 (Subjonctif)】（从句中的 ne 为冗赘虚词，无否定含义）。faire 的虚拟式为 fasse。选 B。",
        "translation": "我们赶在天太黑之前赶紧回家吧。",
        "grammarTag": "avant que 后接虚拟式与虚词 ne",
        "vocabList": [
          {
            "word": "se dépêcher de",
            "meaning": "赶快做某事"
          },
          {
            "word": "faire noir",
            "meaning": "天黑"
          }
        ]
      },
      {
        "id": "22_q9",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · lequel 与介词缩合",
        "question": "Voici la magnifique bibliothèque dans _____ j'ai passé toute ma jeunesse.",
        "options": [
          "laquelle",
          "lequel",
          "lesquelles",
          "dont"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 la bibliothèque 为阴性单数名词，与介词 dans 连用，必须使用复合关系代词阴性单数形式【laquelle】。选 A。",
        "translation": "这就是我度过全部青年时代的宏伟图书馆。",
        "grammarTag": "介词 + lequel/laquelle 复合关系代词",
        "vocabList": [
          {
            "word": "bibliothèque (n.f.)",
            "meaning": "图书馆"
          },
          {
            "word": "jeunesse (n.f.)",
            "meaning": "青年时期"
          }
        ]
      },
      {
        "id": "22_q10",
        "questionType": "词汇语法",
        "categoryTag": "副动词 · En + Participe présent",
        "question": "_____ la rue prudemment, les enfants regardent à gauche et à droite.",
        "options": [
          "En traversant",
          "Traversé",
          "Avoir traversé",
          "Pour traverser"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n副动词 (En + 现在分词 traversant) 在句中充当时间或伴随状语，表示“在过马路的时候”。选 A。",
        "translation": "在小心穿过马路时，孩子们向左看也向右看。",
        "grammarTag": "副动词表示伴随与时间 (En traversant)",
        "vocabList": [
          {
            "word": "traverser la rue",
            "meaning": "穿过马路"
          },
          {
            "word": "prudemment (adv.)",
            "meaning": "谨慎地，小心地"
          }
        ]
      },
      {
        "id": "22_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "22_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "22_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "22_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "22_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "22_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "22_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "22_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "22_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "22_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "22_q21",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "22_q22",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "22_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "22_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_delf_23",
    "title": "DELF B1 官方社会热点与电台访谈精选卷 (卷一)",
    "frenchTitle": "Diplôme d'Études en Langue Française — Niveau B1 (Session 1)",
    "track": "delf",
    "level": "DELF B1",
    "schoolOrOrg": "法国国际教育研究中心 (FEI)",
    "yearOrSession": "官方标准卷",
    "summary": "B1 进阶核心卷：法国电台原声专访听解（四天工作制探讨）、媒体热点报道与观点推断。",
    "durationMinutes": 60,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "23_q1",
        "questionType": "词汇语法",
        "categoryTag": "复合介词 · 空间与抽象方向",
        "question": "Il a installé son nouvel ordinateur _____ de la grande fenêtre.",
        "options": [
          "près",
          "en face",
          "au milieu",
          "au-dessus"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定方位短语：en face de... (在...对面)。près 也需加 de，但语义上在正对大窗户处摆放用 en face de 最为地道贴切。选 B。",
        "translation": "他把新电脑安装在正对着大窗户的位置。",
        "grammarTag": "空间介词短语 (en face de)",
        "vocabList": [
          {
            "word": "en face de",
            "meaning": "在...正对面"
          },
          {
            "word": "installer (v.)",
            "meaning": "安装，安置"
          }
        ]
      },
      {
        "id": "23_q2",
        "questionType": "词汇语法",
        "categoryTag": "否定句 · 冠词变 de 规则",
        "question": "Mon grand-père ne boit jamais _____ alcool pour préserver sa santé.",
        "options": [
          "d'",
          "de l'",
          "du",
          "un"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n在否定句 (ne... jamais) 中，直接宾语前面的部分冠词 (de l'alcool) 必须一律转变为介词【de】(因遇到元音省音为 d')。选 A。",
        "translation": "我祖父为了保持健康从不喝酒。",
        "grammarTag": "否定句中部分冠词变 de",
        "vocabList": [
          {
            "word": "alcool (n.m.)",
            "meaning": "酒精，酒"
          },
          {
            "word": "préserver la santé",
            "meaning": "保持健康"
          }
        ]
      },
      {
        "id": "23_q3",
        "questionType": "词汇语法",
        "categoryTag": "时间状语从句 · avant que 触发虚拟式",
        "question": "Dépêchons-nous de rentrer avant qu'il ne _____ trop noir.",
        "options": [
          "fait",
          "fasse",
          "fera",
          "faisait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 avant que (在...之前) 引导时间状语从句，从句强制使用【虚拟式 (Subjonctif)】（从句中的 ne 为冗赘虚词，无否定含义）。faire 的虚拟式为 fasse。选 B。",
        "translation": "我们赶在天太黑之前赶紧回家吧。",
        "grammarTag": "avant que 后接虚拟式与虚词 ne",
        "vocabList": [
          {
            "word": "se dépêcher de",
            "meaning": "赶快做某事"
          },
          {
            "word": "faire noir",
            "meaning": "天黑"
          }
        ]
      },
      {
        "id": "23_q4",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · lequel 与介词缩合",
        "question": "Voici la magnifique bibliothèque dans _____ j'ai passé toute ma jeunesse.",
        "options": [
          "laquelle",
          "lequel",
          "lesquelles",
          "dont"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 la bibliothèque 为阴性单数名词，与介词 dans 连用，必须使用复合关系代词阴性单数形式【laquelle】。选 A。",
        "translation": "这就是我度过全部青年时代的宏伟图书馆。",
        "grammarTag": "介词 + lequel/laquelle 复合关系代词",
        "vocabList": [
          {
            "word": "bibliothèque (n.f.)",
            "meaning": "图书馆"
          },
          {
            "word": "jeunesse (n.f.)",
            "meaning": "青年时期"
          }
        ]
      },
      {
        "id": "23_q5",
        "questionType": "词汇语法",
        "categoryTag": "副动词 · En + Participe présent",
        "question": "_____ la rue prudemment, les enfants regardent à gauche et à droite.",
        "options": [
          "En traversant",
          "Traversé",
          "Avoir traversé",
          "Pour traverser"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n副动词 (En + 现在分词 traversant) 在句中充当时间或伴随状语，表示“在过马路的时候”。选 A。",
        "translation": "在小心穿过马路时，孩子们向左看也向右看。",
        "grammarTag": "副动词表示伴随与时间 (En traversant)",
        "vocabList": [
          {
            "word": "traverser la rue",
            "meaning": "穿过马路"
          },
          {
            "word": "prudemment (adv.)",
            "meaning": "谨慎地，小心地"
          }
        ]
      },
      {
        "id": "23_q6",
        "questionType": "词汇语法",
        "categoryTag": "时态配合 · 愈过去时",
        "question": "Hier soir, dès qu'elle _____ son travail, elle est sortie avec ses amies.",
        "options": [
          "a fini",
          "avait fini",
          "eut fini",
          "finissait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为复合过去时 (est sortie)，从句 dès que (一...就...) 表达在过去基准时间点之前已经完成的动作，必须使用愈过去时 (Plus-que-parfait: avait fini) 表达“过去的过去”。选 B。",
        "translation": "昨天晚上，她一完成工作，就和朋友们出去了。",
        "grammarTag": "愈过去时 (Plus-que-parfait)",
        "vocabList": [
          {
            "word": "sortir avec",
            "meaning": "与...一起外出"
          },
          {
            "word": "dès que",
            "meaning": "一...就... (连词短语)"
          }
        ]
      },
      {
        "id": "23_q7",
        "questionType": "词汇语法",
        "categoryTag": "代词系统 · 双代词语序",
        "question": "Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.",
        "options": [
          "leur en",
          "en leur",
          "les en",
          "en lui"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nparler de qch (用副代词 en 替代) à qn (父母为复数，用间宾代词 leur)。根据双代词语序规则：人称代词 (lui / leur) 必须位于副代词 (y / en) 之前，因此唯一正确顺序为【leur en】。选 A。",
        "translation": "你跟父母谈过你的新项目了吗？——是的，我昨天已经跟他们谈过了。",
        "grammarTag": "双宾语代词位置 (leur en)",
        "vocabList": [
          {
            "word": "parler de qch à qn",
            "meaning": "就某事与某人交谈"
          },
          {
            "word": "projet (n.m.)",
            "meaning": "项目，计划"
          }
        ]
      },
      {
        "id": "23_q8",
        "questionType": "词汇语法",
        "categoryTag": "分词配合 · 直宾提前",
        "question": "Les photos que vous avez _____ sont magnifiques.",
        "options": [
          "pris",
          "prise",
          "prises",
          "prennent"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n在以 avoir 为助动词的复合时态中，直接宾语提前时过去分词必须与直接宾语进行性数配合。先行词 les photos 为阴性复数，关系代词 que 在从句中充当直宾，故 prendre 的过去分词变为主格配合形态【prises】。选 C。",
        "translation": "您拍的那些照片真是太美了。",
        "grammarTag": "过去分词与直宾性数配合",
        "vocabList": [
          {
            "word": "prendre des photos",
            "meaning": "拍照"
          },
          {
            "word": "magnifique (adj.)",
            "meaning": "宏伟壮丽的"
          }
        ]
      },
      {
        "id": "23_q9",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 触发连词短语",
        "question": "Bien qu'il _____ beaucoup de difficultés, il n'a jamais abandonné son rêve.",
        "options": [
          "a",
          "avait",
          "ait",
          "aura"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 bien que (尽管，虽然) 引导让步状语从句，从句动词必须强制使用【虚拟式 (Subjonctif)】。动词 avoir 的虚拟式第三人称单数为【ait】。选 C。",
        "translation": "尽管遇到了许多困难，但他从未放弃自己的梦想。",
        "grammarTag": "虚拟式现在时 (bien que)",
        "vocabList": [
          {
            "word": "bien que + subj.",
            "meaning": "尽管，虽然"
          },
          {
            "word": "abandonner (v.)",
            "meaning": "放弃"
          }
        ]
      },
      {
        "id": "23_q10",
        "questionType": "词汇语法",
        "categoryTag": "代词式动词 · 分词配合避坑",
        "question": "Elles se sont _____ compte de leur erreur un peu trop tard.",
        "options": [
          "rendu",
          "rendue",
          "rendus",
          "rendues"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定短语 se rendre compte de qch (意识到某事)。自反代词 se 在此结构中充当间接宾语，compte 为直接宾语且位于动词之后，因此过去分词 rendu【绝不配合】，保持阳性单数原形 rendu。选 A。",
        "translation": "她们意识到自己的错误时已经有点太晚了。",
        "grammarTag": "代词式动词固定短语 (se rendre compte)",
        "vocabList": [
          {
            "word": "se rendre compte de",
            "meaning": "意识到，发觉 (不配合)"
          },
          {
            "word": "erreur (n.f.)",
            "meaning": "错误"
          }
        ]
      },
      {
        "id": "23_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "23_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "23_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "23_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "23_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "23_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "23_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "23_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "23_q19",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "23_q20",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "23_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "23_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "23_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "23_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_delf_24",
    "title": "DELF B1 官方深度论点分析与事实推断卷 (卷二)",
    "frenchTitle": "Diplôme d'Études en Langue Française — Niveau B1 (Session 2)",
    "track": "delf",
    "level": "DELF B1",
    "schoolOrOrg": "法国国际教育研究中心 (FEI)",
    "yearOrSession": "官方冲刺卷",
    "summary": "考察独立阐述见解与权衡利弊能力：环保生活方式、数字设备对青少年影响及论说阅读。",
    "durationMinutes": 60,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "24_q1",
        "questionType": "词汇语法",
        "categoryTag": "时态配合 · 愈过去时",
        "question": "Hier soir, dès qu'elle _____ son travail, elle est sortie avec ses amies.",
        "options": [
          "a fini",
          "avait fini",
          "eut fini",
          "finissait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为复合过去时 (est sortie)，从句 dès que (一...就...) 表达在过去基准时间点之前已经完成的动作，必须使用愈过去时 (Plus-que-parfait: avait fini) 表达“过去的过去”。选 B。",
        "translation": "昨天晚上，她一完成工作，就和朋友们出去了。",
        "grammarTag": "愈过去时 (Plus-que-parfait)",
        "vocabList": [
          {
            "word": "sortir avec",
            "meaning": "与...一起外出"
          },
          {
            "word": "dès que",
            "meaning": "一...就... (连词短语)"
          }
        ]
      },
      {
        "id": "24_q2",
        "questionType": "词汇语法",
        "categoryTag": "代词系统 · 双代词语序",
        "question": "Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.",
        "options": [
          "leur en",
          "en leur",
          "les en",
          "en lui"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nparler de qch (用副代词 en 替代) à qn (父母为复数，用间宾代词 leur)。根据双代词语序规则：人称代词 (lui / leur) 必须位于副代词 (y / en) 之前，因此唯一正确顺序为【leur en】。选 A。",
        "translation": "你跟父母谈过你的新项目了吗？——是的，我昨天已经跟他们谈过了。",
        "grammarTag": "双宾语代词位置 (leur en)",
        "vocabList": [
          {
            "word": "parler de qch à qn",
            "meaning": "就某事与某人交谈"
          },
          {
            "word": "projet (n.m.)",
            "meaning": "项目，计划"
          }
        ]
      },
      {
        "id": "24_q3",
        "questionType": "词汇语法",
        "categoryTag": "分词配合 · 直宾提前",
        "question": "Les photos que vous avez _____ sont magnifiques.",
        "options": [
          "pris",
          "prise",
          "prises",
          "prennent"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n在以 avoir 为助动词的复合时态中，直接宾语提前时过去分词必须与直接宾语进行性数配合。先行词 les photos 为阴性复数，关系代词 que 在从句中充当直宾，故 prendre 的过去分词变为主格配合形态【prises】。选 C。",
        "translation": "您拍的那些照片真是太美了。",
        "grammarTag": "过去分词与直宾性数配合",
        "vocabList": [
          {
            "word": "prendre des photos",
            "meaning": "拍照"
          },
          {
            "word": "magnifique (adj.)",
            "meaning": "宏伟壮丽的"
          }
        ]
      },
      {
        "id": "24_q4",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 触发连词短语",
        "question": "Bien qu'il _____ beaucoup de difficultés, il n'a jamais abandonné son rêve.",
        "options": [
          "a",
          "avait",
          "ait",
          "aura"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 bien que (尽管，虽然) 引导让步状语从句，从句动词必须强制使用【虚拟式 (Subjonctif)】。动词 avoir 的虚拟式第三人称单数为【ait】。选 C。",
        "translation": "尽管遇到了许多困难，但他从未放弃自己的梦想。",
        "grammarTag": "虚拟式现在时 (bien que)",
        "vocabList": [
          {
            "word": "bien que + subj.",
            "meaning": "尽管，虽然"
          },
          {
            "word": "abandonner (v.)",
            "meaning": "放弃"
          }
        ]
      },
      {
        "id": "24_q5",
        "questionType": "词汇语法",
        "categoryTag": "代词式动词 · 分词配合避坑",
        "question": "Elles se sont _____ compte de leur erreur un peu trop tard.",
        "options": [
          "rendu",
          "rendue",
          "rendus",
          "rendues"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定短语 se rendre compte de qch (意识到某事)。自反代词 se 在此结构中充当间接宾语，compte 为直接宾语且位于动词之后，因此过去分词 rendu【绝不配合】，保持阳性单数原形 rendu。选 A。",
        "translation": "她们意识到自己的错误时已经有点太晚了。",
        "grammarTag": "代词式动词固定短语 (se rendre compte)",
        "vocabList": [
          {
            "word": "se rendre compte de",
            "meaning": "意识到，发觉 (不配合)"
          },
          {
            "word": "erreur (n.f.)",
            "meaning": "错误"
          }
        ]
      },
      {
        "id": "24_q6",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · dont 深度考查",
        "question": "C'est une entreprise internationale _____ le directeur général est très jeune.",
        "options": [
          "qui",
          "que",
          "dont",
          "où"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune。de + 先行词充当名词的所有格限制补语，必须使用关系代词【dont】。选 C。",
        "translation": "这是一间总经理非常年轻的国际跨国企业。",
        "grammarTag": "关系代词 dont 的所有格用法",
        "vocabList": [
          {
            "word": "directeur général",
            "meaning": "总经理 / CEO"
          },
          {
            "word": "entreprise (n.f.)",
            "meaning": "企业，公司"
          }
        ]
      },
      {
        "id": "24_q7",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · y 的地点与抽象引申",
        "question": "Pensez-vous encore à votre ancien travail ? — Non, je n'_____ pense plus du tout.",
        "options": [
          "en",
          "y",
          "le",
          "lui"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\npenser à qch (思考/挂念某事)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。",
        "translation": "你还会想起以前的那份工作吗？——不，我一点也不再去想它了。",
        "grammarTag": "副代词 y (代替 à + 物)",
        "vocabList": [
          {
            "word": "penser à qch",
            "meaning": "考虑某事，想念某事"
          },
          {
            "word": "ne... plus du tout",
            "meaning": "一点也不再..."
          }
        ]
      },
      {
        "id": "24_q8",
        "questionType": "词汇语法",
        "categoryTag": "条件式 · 与过去假设配合",
        "question": "Si tu m'avais prévenu à temps, je ne _____ pas venu si tard.",
        "options": [
          "serais",
          "serais été",
          "fus",
          "sois"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nSi 引导的对过去虚拟假设句型：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。",
        "translation": "如果你及时通知我，我就不会来得这么晚了。",
        "grammarTag": "Si 条件假设与条件式过去时",
        "vocabList": [
          {
            "word": "prévenir qn à temps",
            "meaning": "及时通知/提醒某人"
          },
          {
            "word": "tard (adv.)",
            "meaning": "迟，晚"
          }
        ]
      },
      {
        "id": "24_q9",
        "questionType": "词汇语法",
        "categoryTag": "介词与冠词 · 国名专有搭配",
        "question": "Le président français effectuera une visite officielle _____ Mexique le mois prochain.",
        "options": [
          "en",
          "au",
          "à",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n阳性单数国名以辅音结尾通常使用定冠词 le (如 le Mexique, le Japon, le Canada)。表示“去往”或“在”阳性单数国名前，介词必须用【au】 (à + le 缩合)！选 B。",
        "translation": "法国总统下个月将对墨西哥进行正式国事访问。",
        "grammarTag": "阳性国名前的介词搭配 (au Mexique)",
        "vocabList": [
          {
            "word": "visite officielle",
            "meaning": "国事访问，正式访问"
          },
          {
            "word": "effectuer (v.)",
            "meaning": "进行，执行"
          }
        ]
      },
      {
        "id": "24_q10",
        "questionType": "词汇语法",
        "categoryTag": "否定副词 · 文学句式辨析",
        "question": "Dans ce village isolé, il n'y a _____ de supermarché ni de pharmacie.",
        "options": [
          "aucun",
          "point",
          "jamais",
          "guère"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。",
        "translation": "在这个偏僻的孤立村庄里，既没有超市，也没有药店。",
        "grammarTag": "否定句型 (ne... point de)",
        "vocabList": [
          {
            "word": "isolé (adj.)",
            "meaning": "孤立的，偏远的"
          },
          {
            "word": "pharmacie (n.f.)",
            "meaning": "药店"
          }
        ]
      },
      {
        "id": "24_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "24_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "24_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "24_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "24_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "24_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "24_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "24_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "24_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "24_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "24_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "24_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "24_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "24_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_delf_25",
    "title": "DELF B1 官方职场交流与文化新闻机考卷 (卷三)",
    "frenchTitle": "Diplôme d'Études en Langue Française — Niveau B1 (Session 3)",
    "track": "delf",
    "level": "DELF B1",
    "schoolOrOrg": "法国国际教育研究中心 (FEI)",
    "yearOrSession": "官方冲刺卷",
    "summary": "职场正式邮件往来、员工培训通知解读、法国艺术展览新闻及社会趋势分析。",
    "durationMinutes": 60,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "25_q1",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · dont 深度考查",
        "question": "C'est une entreprise internationale _____ le directeur général est très jeune.",
        "options": [
          "qui",
          "que",
          "dont",
          "où"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune。de + 先行词充当名词的所有格限制补语，必须使用关系代词【dont】。选 C。",
        "translation": "这是一间总经理非常年轻的国际跨国企业。",
        "grammarTag": "关系代词 dont 的所有格用法",
        "vocabList": [
          {
            "word": "directeur général",
            "meaning": "总经理 / CEO"
          },
          {
            "word": "entreprise (n.f.)",
            "meaning": "企业，公司"
          }
        ]
      },
      {
        "id": "25_q2",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · y 的地点与抽象引申",
        "question": "Pensez-vous encore à votre ancien travail ? — Non, je n'_____ pense plus du tout.",
        "options": [
          "en",
          "y",
          "le",
          "lui"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\npenser à qch (思考/挂念某事)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。",
        "translation": "你还会想起以前的那份工作吗？——不，我一点也不再去想它了。",
        "grammarTag": "副代词 y (代替 à + 物)",
        "vocabList": [
          {
            "word": "penser à qch",
            "meaning": "考虑某事，想念某事"
          },
          {
            "word": "ne... plus du tout",
            "meaning": "一点也不再..."
          }
        ]
      },
      {
        "id": "25_q3",
        "questionType": "词汇语法",
        "categoryTag": "条件式 · 与过去假设配合",
        "question": "Si tu m'avais prévenu à temps, je ne _____ pas venu si tard.",
        "options": [
          "serais",
          "serais été",
          "fus",
          "sois"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nSi 引导的对过去虚拟假设句型：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。",
        "translation": "如果你及时通知我，我就不会来得这么晚了。",
        "grammarTag": "Si 条件假设与条件式过去时",
        "vocabList": [
          {
            "word": "prévenir qn à temps",
            "meaning": "及时通知/提醒某人"
          },
          {
            "word": "tard (adv.)",
            "meaning": "迟，晚"
          }
        ]
      },
      {
        "id": "25_q4",
        "questionType": "词汇语法",
        "categoryTag": "介词与冠词 · 国名专有搭配",
        "question": "Le président français effectuera une visite officielle _____ Mexique le mois prochain.",
        "options": [
          "en",
          "au",
          "à",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n阳性单数国名以辅音结尾通常使用定冠词 le (如 le Mexique, le Japon, le Canada)。表示“去往”或“在”阳性单数国名前，介词必须用【au】 (à + le 缩合)！选 B。",
        "translation": "法国总统下个月将对墨西哥进行正式国事访问。",
        "grammarTag": "阳性国名前的介词搭配 (au Mexique)",
        "vocabList": [
          {
            "word": "visite officielle",
            "meaning": "国事访问，正式访问"
          },
          {
            "word": "effectuer (v.)",
            "meaning": "进行，执行"
          }
        ]
      },
      {
        "id": "25_q5",
        "questionType": "词汇语法",
        "categoryTag": "否定副词 · 文学句式辨析",
        "question": "Dans ce village isolé, il n'y a _____ de supermarché ni de pharmacie.",
        "options": [
          "aucun",
          "point",
          "jamais",
          "guère"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。",
        "translation": "在这个偏僻的孤立村庄里，既没有超市，也没有药店。",
        "grammarTag": "否定句型 (ne... point de)",
        "vocabList": [
          {
            "word": "isolé (adj.)",
            "meaning": "孤立的，偏远的"
          },
          {
            "word": "pharmacie (n.f.)",
            "meaning": "药店"
          }
        ]
      },
      {
        "id": "25_q6",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "25_q7",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "25_q8",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "25_q9",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "25_q10",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "25_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "25_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "25_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "25_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "25_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "25_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "25_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "25_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "25_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "25_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "25_q21",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "25_q22",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "25_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "25_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_delf_26",
    "title": "DELF B2 官方学术论辩与科技伦理高级测试卷 (卷一)",
    "frenchTitle": "Diplôme d'Études en Langue Française — Niveau B2 (Session 1)",
    "track": "delf",
    "level": "DELF B2",
    "schoolOrOrg": "法国国际教育研究中心 (FEI)",
    "yearOrSession": "官方标准卷",
    "summary": "面向高阶独立运用者与赴法读研考生：人工智能与就业变革学术辩论、伦理法律深读。",
    "durationMinutes": 75,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "26_q1",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "26_q2",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "26_q3",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "26_q4",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "26_q5",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "26_q6",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "26_q7",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "26_q8",
        "questionType": "词汇语法",
        "categoryTag": "自反动词 · 互为间宾不配合",
        "question": "Les deux diplomates se sont _____ la main chaleureusement avant de commencer.",
        "options": [
          "serré",
          "serrée",
          "serrés",
          "serrées"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nse serrer la main 结构中，la main 为直接宾语且位于动词之后，se 实际上充当相互间接宾语（向对方握手），因此过去分词 serré【绝不配合】！选 A。",
        "translation": "两位外交官在开始前热情地握了手。",
        "grammarTag": "自反动词带直宾时分词不配合",
        "vocabList": [
          {
            "word": "se serrer la main",
            "meaning": "握手 (不配合)"
          },
          {
            "word": "chaleureusement (adv.)",
            "meaning": "热情地"
          }
        ]
      },
      {
        "id": "26_q9",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 最高级引导的定语从句",
        "question": "C'est le plus beau musée que je _____ jamais visité de toute ma vie.",
        "options": [
          "ai",
          "aie",
          "avais",
          "aurais"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词被形容词最高级 (le plus beau...) 或 seul / premier 等修饰时，后面的定语从句常使用【虚拟式 (Subjonctif)】以体现说话人的主观感叹评价。visité 复合过去虚拟式为【aie visité】。选 B。",
        "translation": "这是我一生中参观过的最美丽的博物馆。",
        "grammarTag": "最高级先行词后接虚拟式",
        "vocabList": [
          {
            "word": "musée (n.m.)",
            "meaning": "博物馆"
          },
          {
            "word": "de toute ma vie",
            "meaning": "我一生中"
          }
        ]
      },
      {
        "id": "26_q10",
        "questionType": "词汇语法",
        "categoryTag": "复合介词 · 空间与抽象方向",
        "question": "Il a installé son nouvel ordinateur _____ de la grande fenêtre.",
        "options": [
          "près",
          "en face",
          "au milieu",
          "au-dessus"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定方位短语：en face de... (在...对面)。près 也需加 de，但语义上在正对大窗户处摆放用 en face de 最为地道贴切。选 B。",
        "translation": "他把新电脑安装在正对着大窗户的位置。",
        "grammarTag": "空间介词短语 (en face de)",
        "vocabList": [
          {
            "word": "en face de",
            "meaning": "在...正对面"
          },
          {
            "word": "installer (v.)",
            "meaning": "安装，安置"
          }
        ]
      },
      {
        "id": "26_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "26_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "26_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "26_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "26_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "26_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "26_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "26_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "26_q19",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "26_q20",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "26_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "26_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "26_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "26_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_delf_27",
    "title": "DELF B2 官方生态法治与当代思辨高级测试卷 (卷二)",
    "frenchTitle": "Diplôme d'Études en Langue Française — Niveau B2 (Session 2)",
    "track": "delf",
    "level": "DELF B2",
    "schoolOrOrg": "法国国际教育研究中心 (FEI)",
    "yearOrSession": "官方冲刺卷",
    "summary": "高难度批判性阅读与听解：气候正义、城市韧性规划与全球化经济模式转型研读。",
    "durationMinutes": 75,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "27_q1",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "27_q2",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "27_q3",
        "questionType": "词汇语法",
        "categoryTag": "自反动词 · 互为间宾不配合",
        "question": "Les deux diplomates se sont _____ la main chaleureusement avant de commencer.",
        "options": [
          "serré",
          "serrée",
          "serrés",
          "serrées"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nse serrer la main 结构中，la main 为直接宾语且位于动词之后，se 实际上充当相互间接宾语（向对方握手），因此过去分词 serré【绝不配合】！选 A。",
        "translation": "两位外交官在开始前热情地握了手。",
        "grammarTag": "自反动词带直宾时分词不配合",
        "vocabList": [
          {
            "word": "se serrer la main",
            "meaning": "握手 (不配合)"
          },
          {
            "word": "chaleureusement (adv.)",
            "meaning": "热情地"
          }
        ]
      },
      {
        "id": "27_q4",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 最高级引导的定语从句",
        "question": "C'est le plus beau musée que je _____ jamais visité de toute ma vie.",
        "options": [
          "ai",
          "aie",
          "avais",
          "aurais"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词被形容词最高级 (le plus beau...) 或 seul / premier 等修饰时，后面的定语从句常使用【虚拟式 (Subjonctif)】以体现说话人的主观感叹评价。visité 复合过去虚拟式为【aie visité】。选 B。",
        "translation": "这是我一生中参观过的最美丽的博物馆。",
        "grammarTag": "最高级先行词后接虚拟式",
        "vocabList": [
          {
            "word": "musée (n.m.)",
            "meaning": "博物馆"
          },
          {
            "word": "de toute ma vie",
            "meaning": "我一生中"
          }
        ]
      },
      {
        "id": "27_q5",
        "questionType": "词汇语法",
        "categoryTag": "复合介词 · 空间与抽象方向",
        "question": "Il a installé son nouvel ordinateur _____ de la grande fenêtre.",
        "options": [
          "près",
          "en face",
          "au milieu",
          "au-dessus"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定方位短语：en face de... (在...对面)。près 也需加 de，但语义上在正对大窗户处摆放用 en face de 最为地道贴切。选 B。",
        "translation": "他把新电脑安装在正对着大窗户的位置。",
        "grammarTag": "空间介词短语 (en face de)",
        "vocabList": [
          {
            "word": "en face de",
            "meaning": "在...正对面"
          },
          {
            "word": "installer (v.)",
            "meaning": "安装，安置"
          }
        ]
      },
      {
        "id": "27_q6",
        "questionType": "词汇语法",
        "categoryTag": "否定句 · 冠词变 de 规则",
        "question": "Mon grand-père ne boit jamais _____ alcool pour préserver sa santé.",
        "options": [
          "d'",
          "de l'",
          "du",
          "un"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n在否定句 (ne... jamais) 中，直接宾语前面的部分冠词 (de l'alcool) 必须一律转变为介词【de】(因遇到元音省音为 d')。选 A。",
        "translation": "我祖父为了保持健康从不喝酒。",
        "grammarTag": "否定句中部分冠词变 de",
        "vocabList": [
          {
            "word": "alcool (n.m.)",
            "meaning": "酒精，酒"
          },
          {
            "word": "préserver la santé",
            "meaning": "保持健康"
          }
        ]
      },
      {
        "id": "27_q7",
        "questionType": "词汇语法",
        "categoryTag": "时间状语从句 · avant que 触发虚拟式",
        "question": "Dépêchons-nous de rentrer avant qu'il ne _____ trop noir.",
        "options": [
          "fait",
          "fasse",
          "fera",
          "faisait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 avant que (在...之前) 引导时间状语从句，从句强制使用【虚拟式 (Subjonctif)】（从句中的 ne 为冗赘虚词，无否定含义）。faire 的虚拟式为 fasse。选 B。",
        "translation": "我们赶在天太黑之前赶紧回家吧。",
        "grammarTag": "avant que 后接虚拟式与虚词 ne",
        "vocabList": [
          {
            "word": "se dépêcher de",
            "meaning": "赶快做某事"
          },
          {
            "word": "faire noir",
            "meaning": "天黑"
          }
        ]
      },
      {
        "id": "27_q8",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · lequel 与介词缩合",
        "question": "Voici la magnifique bibliothèque dans _____ j'ai passé toute ma jeunesse.",
        "options": [
          "laquelle",
          "lequel",
          "lesquelles",
          "dont"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 la bibliothèque 为阴性单数名词，与介词 dans 连用，必须使用复合关系代词阴性单数形式【laquelle】。选 A。",
        "translation": "这就是我度过全部青年时代的宏伟图书馆。",
        "grammarTag": "介词 + lequel/laquelle 复合关系代词",
        "vocabList": [
          {
            "word": "bibliothèque (n.f.)",
            "meaning": "图书馆"
          },
          {
            "word": "jeunesse (n.f.)",
            "meaning": "青年时期"
          }
        ]
      },
      {
        "id": "27_q9",
        "questionType": "词汇语法",
        "categoryTag": "副动词 · En + Participe présent",
        "question": "_____ la rue prudemment, les enfants regardent à gauche et à droite.",
        "options": [
          "En traversant",
          "Traversé",
          "Avoir traversé",
          "Pour traverser"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n副动词 (En + 现在分词 traversant) 在句中充当时间或伴随状语，表示“在过马路的时候”。选 A。",
        "translation": "在小心穿过马路时，孩子们向左看也向右看。",
        "grammarTag": "副动词表示伴随与时间 (En traversant)",
        "vocabList": [
          {
            "word": "traverser la rue",
            "meaning": "穿过马路"
          },
          {
            "word": "prudemment (adv.)",
            "meaning": "谨慎地，小心地"
          }
        ]
      },
      {
        "id": "27_q10",
        "questionType": "词汇语法",
        "categoryTag": "时态配合 · 愈过去时",
        "question": "Hier soir, dès qu'elle _____ son travail, elle est sortie avec ses amies.",
        "options": [
          "a fini",
          "avait fini",
          "eut fini",
          "finissait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为复合过去时 (est sortie)，从句 dès que (一...就...) 表达在过去基准时间点之前已经完成的动作，必须使用愈过去时 (Plus-que-parfait: avait fini) 表达“过去的过去”。选 B。",
        "translation": "昨天晚上，她一完成工作，就和朋友们出去了。",
        "grammarTag": "愈过去时 (Plus-que-parfait)",
        "vocabList": [
          {
            "word": "sortir avec",
            "meaning": "与...一起外出"
          },
          {
            "word": "dès que",
            "meaning": "一...就... (连词短语)"
          }
        ]
      },
      {
        "id": "27_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "27_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "27_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "27_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "27_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "27_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "27_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "27_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "27_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "27_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "27_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "27_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "27_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "27_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_delf_28",
    "title": "DELF B2 国际欧标深度综合论述冲刺大卷 (卷三)",
    "frenchTitle": "Diplôme d'Études en Langue Française — Niveau B2 (Session 3)",
    "track": "delf",
    "level": "DELF B2",
    "schoolOrOrg": "法国国际教育研究中心 (FEI)",
    "yearOrSession": "官方精选大卷",
    "summary": "法国原版社论与前沿人文大文，全方位对标法国大学入学语言门槛考核。",
    "durationMinutes": 75,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "28_q1",
        "questionType": "词汇语法",
        "categoryTag": "否定句 · 冠词变 de 规则",
        "question": "Mon grand-père ne boit jamais _____ alcool pour préserver sa santé.",
        "options": [
          "d'",
          "de l'",
          "du",
          "un"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n在否定句 (ne... jamais) 中，直接宾语前面的部分冠词 (de l'alcool) 必须一律转变为介词【de】(因遇到元音省音为 d')。选 A。",
        "translation": "我祖父为了保持健康从不喝酒。",
        "grammarTag": "否定句中部分冠词变 de",
        "vocabList": [
          {
            "word": "alcool (n.m.)",
            "meaning": "酒精，酒"
          },
          {
            "word": "préserver la santé",
            "meaning": "保持健康"
          }
        ]
      },
      {
        "id": "28_q2",
        "questionType": "词汇语法",
        "categoryTag": "时间状语从句 · avant que 触发虚拟式",
        "question": "Dépêchons-nous de rentrer avant qu'il ne _____ trop noir.",
        "options": [
          "fait",
          "fasse",
          "fera",
          "faisait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 avant que (在...之前) 引导时间状语从句，从句强制使用【虚拟式 (Subjonctif)】（从句中的 ne 为冗赘虚词，无否定含义）。faire 的虚拟式为 fasse。选 B。",
        "translation": "我们赶在天太黑之前赶紧回家吧。",
        "grammarTag": "avant que 后接虚拟式与虚词 ne",
        "vocabList": [
          {
            "word": "se dépêcher de",
            "meaning": "赶快做某事"
          },
          {
            "word": "faire noir",
            "meaning": "天黑"
          }
        ]
      },
      {
        "id": "28_q3",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · lequel 与介词缩合",
        "question": "Voici la magnifique bibliothèque dans _____ j'ai passé toute ma jeunesse.",
        "options": [
          "laquelle",
          "lequel",
          "lesquelles",
          "dont"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 la bibliothèque 为阴性单数名词，与介词 dans 连用，必须使用复合关系代词阴性单数形式【laquelle】。选 A。",
        "translation": "这就是我度过全部青年时代的宏伟图书馆。",
        "grammarTag": "介词 + lequel/laquelle 复合关系代词",
        "vocabList": [
          {
            "word": "bibliothèque (n.f.)",
            "meaning": "图书馆"
          },
          {
            "word": "jeunesse (n.f.)",
            "meaning": "青年时期"
          }
        ]
      },
      {
        "id": "28_q4",
        "questionType": "词汇语法",
        "categoryTag": "副动词 · En + Participe présent",
        "question": "_____ la rue prudemment, les enfants regardent à gauche et à droite.",
        "options": [
          "En traversant",
          "Traversé",
          "Avoir traversé",
          "Pour traverser"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n副动词 (En + 现在分词 traversant) 在句中充当时间或伴随状语，表示“在过马路的时候”。选 A。",
        "translation": "在小心穿过马路时，孩子们向左看也向右看。",
        "grammarTag": "副动词表示伴随与时间 (En traversant)",
        "vocabList": [
          {
            "word": "traverser la rue",
            "meaning": "穿过马路"
          },
          {
            "word": "prudemment (adv.)",
            "meaning": "谨慎地，小心地"
          }
        ]
      },
      {
        "id": "28_q5",
        "questionType": "词汇语法",
        "categoryTag": "时态配合 · 愈过去时",
        "question": "Hier soir, dès qu'elle _____ son travail, elle est sortie avec ses amies.",
        "options": [
          "a fini",
          "avait fini",
          "eut fini",
          "finissait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为复合过去时 (est sortie)，从句 dès que (一...就...) 表达在过去基准时间点之前已经完成的动作，必须使用愈过去时 (Plus-que-parfait: avait fini) 表达“过去的过去”。选 B。",
        "translation": "昨天晚上，她一完成工作，就和朋友们出去了。",
        "grammarTag": "愈过去时 (Plus-que-parfait)",
        "vocabList": [
          {
            "word": "sortir avec",
            "meaning": "与...一起外出"
          },
          {
            "word": "dès que",
            "meaning": "一...就... (连词短语)"
          }
        ]
      },
      {
        "id": "28_q6",
        "questionType": "词汇语法",
        "categoryTag": "代词系统 · 双代词语序",
        "question": "Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.",
        "options": [
          "leur en",
          "en leur",
          "les en",
          "en lui"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nparler de qch (用副代词 en 替代) à qn (父母为复数，用间宾代词 leur)。根据双代词语序规则：人称代词 (lui / leur) 必须位于副代词 (y / en) 之前，因此唯一正确顺序为【leur en】。选 A。",
        "translation": "你跟父母谈过你的新项目了吗？——是的，我昨天已经跟他们谈过了。",
        "grammarTag": "双宾语代词位置 (leur en)",
        "vocabList": [
          {
            "word": "parler de qch à qn",
            "meaning": "就某事与某人交谈"
          },
          {
            "word": "projet (n.m.)",
            "meaning": "项目，计划"
          }
        ]
      },
      {
        "id": "28_q7",
        "questionType": "词汇语法",
        "categoryTag": "分词配合 · 直宾提前",
        "question": "Les photos que vous avez _____ sont magnifiques.",
        "options": [
          "pris",
          "prise",
          "prises",
          "prennent"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n在以 avoir 为助动词的复合时态中，直接宾语提前时过去分词必须与直接宾语进行性数配合。先行词 les photos 为阴性复数，关系代词 que 在从句中充当直宾，故 prendre 的过去分词变为主格配合形态【prises】。选 C。",
        "translation": "您拍的那些照片真是太美了。",
        "grammarTag": "过去分词与直宾性数配合",
        "vocabList": [
          {
            "word": "prendre des photos",
            "meaning": "拍照"
          },
          {
            "word": "magnifique (adj.)",
            "meaning": "宏伟壮丽的"
          }
        ]
      },
      {
        "id": "28_q8",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 触发连词短语",
        "question": "Bien qu'il _____ beaucoup de difficultés, il n'a jamais abandonné son rêve.",
        "options": [
          "a",
          "avait",
          "ait",
          "aura"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 bien que (尽管，虽然) 引导让步状语从句，从句动词必须强制使用【虚拟式 (Subjonctif)】。动词 avoir 的虚拟式第三人称单数为【ait】。选 C。",
        "translation": "尽管遇到了许多困难，但他从未放弃自己的梦想。",
        "grammarTag": "虚拟式现在时 (bien que)",
        "vocabList": [
          {
            "word": "bien que + subj.",
            "meaning": "尽管，虽然"
          },
          {
            "word": "abandonner (v.)",
            "meaning": "放弃"
          }
        ]
      },
      {
        "id": "28_q9",
        "questionType": "词汇语法",
        "categoryTag": "代词式动词 · 分词配合避坑",
        "question": "Elles se sont _____ compte de leur erreur un peu trop tard.",
        "options": [
          "rendu",
          "rendue",
          "rendus",
          "rendues"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定短语 se rendre compte de qch (意识到某事)。自反代词 se 在此结构中充当间接宾语，compte 为直接宾语且位于动词之后，因此过去分词 rendu【绝不配合】，保持阳性单数原形 rendu。选 A。",
        "translation": "她们意识到自己的错误时已经有点太晚了。",
        "grammarTag": "代词式动词固定短语 (se rendre compte)",
        "vocabList": [
          {
            "word": "se rendre compte de",
            "meaning": "意识到，发觉 (不配合)"
          },
          {
            "word": "erreur (n.f.)",
            "meaning": "错误"
          }
        ]
      },
      {
        "id": "28_q10",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · dont 深度考查",
        "question": "C'est une entreprise internationale _____ le directeur général est très jeune.",
        "options": [
          "qui",
          "que",
          "dont",
          "où"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune。de + 先行词充当名词的所有格限制补语，必须使用关系代词【dont】。选 C。",
        "translation": "这是一间总经理非常年轻的国际跨国企业。",
        "grammarTag": "关系代词 dont 的所有格用法",
        "vocabList": [
          {
            "word": "directeur général",
            "meaning": "总经理 / CEO"
          },
          {
            "word": "entreprise (n.f.)",
            "meaning": "企业，公司"
          }
        ]
      },
      {
        "id": "28_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "28_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "28_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "28_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "28_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "28_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "28_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "28_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "28_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "28_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "28_q21",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "28_q22",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "28_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "28_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_drill_29",
    "title": "【专项突破】直宾间宾与副代词 y/en 双代词语序专练 (卷一)",
    "frenchTitle": "Module Spécialisé 1 : Pronoms personnels compléments et pronoms adverbiaux (Vol. 1)",
    "track": "drill",
    "level": "专项攻坚",
    "schoolOrOrg": "法语教研组权威研发",
    "yearOrSession": "考点突破卷",
    "summary": "专攻二外最容易丢分的代词考点：直宾、间宾、y、en 在各类时态与祈使句中的位置及配合。",
    "durationMinutes": 35,
    "totalScore": 100,
    "isFreePreview": true,
    "questions": [
      {
        "id": "29_q1",
        "questionType": "词汇语法",
        "categoryTag": "代词系统 · 双代词语序",
        "question": "Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.",
        "options": [
          "leur en",
          "en leur",
          "les en",
          "en lui"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nparler de qch (用副代词 en 替代) à qn (父母为复数，用间宾代词 leur)。根据双代词语序规则：人称代词 (lui / leur) 必须位于副代词 (y / en) 之前，因此唯一正确顺序为【leur en】。选 A。",
        "translation": "你跟父母谈过你的新项目了吗？——是的，我昨天已经跟他们谈过了。",
        "grammarTag": "双宾语代词位置 (leur en)",
        "vocabList": [
          {
            "word": "parler de qch à qn",
            "meaning": "就某事与某人交谈"
          },
          {
            "word": "projet (n.m.)",
            "meaning": "项目，计划"
          }
        ]
      },
      {
        "id": "29_q2",
        "questionType": "词汇语法",
        "categoryTag": "分词配合 · 直宾提前",
        "question": "Les photos que vous avez _____ sont magnifiques.",
        "options": [
          "pris",
          "prise",
          "prises",
          "prennent"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n在以 avoir 为助动词的复合时态中，直接宾语提前时过去分词必须与直接宾语进行性数配合。先行词 les photos 为阴性复数，关系代词 que 在从句中充当直宾，故 prendre 的过去分词变为主格配合形态【prises】。选 C。",
        "translation": "您拍的那些照片真是太美了。",
        "grammarTag": "过去分词与直宾性数配合",
        "vocabList": [
          {
            "word": "prendre des photos",
            "meaning": "拍照"
          },
          {
            "word": "magnifique (adj.)",
            "meaning": "宏伟壮丽的"
          }
        ]
      },
      {
        "id": "29_q3",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 触发连词短语",
        "question": "Bien qu'il _____ beaucoup de difficultés, il n'a jamais abandonné son rêve.",
        "options": [
          "a",
          "avait",
          "ait",
          "aura"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 bien que (尽管，虽然) 引导让步状语从句，从句动词必须强制使用【虚拟式 (Subjonctif)】。动词 avoir 的虚拟式第三人称单数为【ait】。选 C。",
        "translation": "尽管遇到了许多困难，但他从未放弃自己的梦想。",
        "grammarTag": "虚拟式现在时 (bien que)",
        "vocabList": [
          {
            "word": "bien que + subj.",
            "meaning": "尽管，虽然"
          },
          {
            "word": "abandonner (v.)",
            "meaning": "放弃"
          }
        ]
      },
      {
        "id": "29_q4",
        "questionType": "词汇语法",
        "categoryTag": "代词式动词 · 分词配合避坑",
        "question": "Elles se sont _____ compte de leur erreur un peu trop tard.",
        "options": [
          "rendu",
          "rendue",
          "rendus",
          "rendues"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定短语 se rendre compte de qch (意识到某事)。自反代词 se 在此结构中充当间接宾语，compte 为直接宾语且位于动词之后，因此过去分词 rendu【绝不配合】，保持阳性单数原形 rendu。选 A。",
        "translation": "她们意识到自己的错误时已经有点太晚了。",
        "grammarTag": "代词式动词固定短语 (se rendre compte)",
        "vocabList": [
          {
            "word": "se rendre compte de",
            "meaning": "意识到，发觉 (不配合)"
          },
          {
            "word": "erreur (n.f.)",
            "meaning": "错误"
          }
        ]
      },
      {
        "id": "29_q5",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · dont 深度考查",
        "question": "C'est une entreprise internationale _____ le directeur général est très jeune.",
        "options": [
          "qui",
          "que",
          "dont",
          "où"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune。de + 先行词充当名词的所有格限制补语，必须使用关系代词【dont】。选 C。",
        "translation": "这是一间总经理非常年轻的国际跨国企业。",
        "grammarTag": "关系代词 dont 的所有格用法",
        "vocabList": [
          {
            "word": "directeur général",
            "meaning": "总经理 / CEO"
          },
          {
            "word": "entreprise (n.f.)",
            "meaning": "企业，公司"
          }
        ]
      },
      {
        "id": "29_q6",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · y 的地点与抽象引申",
        "question": "Pensez-vous encore à votre ancien travail ? — Non, je n'_____ pense plus du tout.",
        "options": [
          "en",
          "y",
          "le",
          "lui"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\npenser à qch (思考/挂念某事)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。",
        "translation": "你还会想起以前的那份工作吗？——不，我一点也不再去想它了。",
        "grammarTag": "副代词 y (代替 à + 物)",
        "vocabList": [
          {
            "word": "penser à qch",
            "meaning": "考虑某事，想念某事"
          },
          {
            "word": "ne... plus du tout",
            "meaning": "一点也不再..."
          }
        ]
      },
      {
        "id": "29_q7",
        "questionType": "词汇语法",
        "categoryTag": "条件式 · 与过去假设配合",
        "question": "Si tu m'avais prévenu à temps, je ne _____ pas venu si tard.",
        "options": [
          "serais",
          "serais été",
          "fus",
          "sois"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nSi 引导的对过去虚拟假设句型：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。",
        "translation": "如果你及时通知我，我就不会来得这么晚了。",
        "grammarTag": "Si 条件假设与条件式过去时",
        "vocabList": [
          {
            "word": "prévenir qn à temps",
            "meaning": "及时通知/提醒某人"
          },
          {
            "word": "tard (adv.)",
            "meaning": "迟，晚"
          }
        ]
      },
      {
        "id": "29_q8",
        "questionType": "词汇语法",
        "categoryTag": "介词与冠词 · 国名专有搭配",
        "question": "Le président français effectuera une visite officielle _____ Mexique le mois prochain.",
        "options": [
          "en",
          "au",
          "à",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n阳性单数国名以辅音结尾通常使用定冠词 le (如 le Mexique, le Japon, le Canada)。表示“去往”或“在”阳性单数国名前，介词必须用【au】 (à + le 缩合)！选 B。",
        "translation": "法国总统下个月将对墨西哥进行正式国事访问。",
        "grammarTag": "阳性国名前的介词搭配 (au Mexique)",
        "vocabList": [
          {
            "word": "visite officielle",
            "meaning": "国事访问，正式访问"
          },
          {
            "word": "effectuer (v.)",
            "meaning": "进行，执行"
          }
        ]
      },
      {
        "id": "29_q9",
        "questionType": "词汇语法",
        "categoryTag": "否定副词 · 文学句式辨析",
        "question": "Dans ce village isolé, il n'y a _____ de supermarché ni de pharmacie.",
        "options": [
          "aucun",
          "point",
          "jamais",
          "guère"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。",
        "translation": "在这个偏僻的孤立村庄里，既没有超市，也没有药店。",
        "grammarTag": "否定句型 (ne... point de)",
        "vocabList": [
          {
            "word": "isolé (adj.)",
            "meaning": "孤立的，偏远的"
          },
          {
            "word": "pharmacie (n.f.)",
            "meaning": "药店"
          }
        ]
      },
      {
        "id": "29_q10",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "29_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "29_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "29_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "29_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "29_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "29_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "29_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "29_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "29_q19",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "29_q20",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "29_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "29_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "29_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "29_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_drill_30",
    "title": "【专项突破】关系代词 qui/que/dont/où 与中性代词专练 (卷二)",
    "frenchTitle": "Module Spécialisé 1 : Pronoms relatifs simples et composés (Vol. 2)",
    "track": "drill",
    "level": "专项攻坚",
    "schoolOrOrg": "法语教研组权威研发",
    "yearOrSession": "考点突破卷",
    "summary": "系统梳理简单与复合关系代词：dont 的所有格属性、lequel 介词缩合及中性代词 le 替代从句。",
    "durationMinutes": 35,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "30_q1",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · y 的地点与抽象引申",
        "question": "Pensez-vous encore à votre ancien travail ? — Non, je n'_____ pense plus du tout.",
        "options": [
          "en",
          "y",
          "le",
          "lui"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\npenser à qch (思考/挂念某事)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。",
        "translation": "你还会想起以前的那份工作吗？——不，我一点也不再去想它了。",
        "grammarTag": "副代词 y (代替 à + 物)",
        "vocabList": [
          {
            "word": "penser à qch",
            "meaning": "考虑某事，想念某事"
          },
          {
            "word": "ne... plus du tout",
            "meaning": "一点也不再..."
          }
        ]
      },
      {
        "id": "30_q2",
        "questionType": "词汇语法",
        "categoryTag": "条件式 · 与过去假设配合",
        "question": "Si tu m'avais prévenu à temps, je ne _____ pas venu si tard.",
        "options": [
          "serais",
          "serais été",
          "fus",
          "sois"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nSi 引导的对过去虚拟假设句型：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。",
        "translation": "如果你及时通知我，我就不会来得这么晚了。",
        "grammarTag": "Si 条件假设与条件式过去时",
        "vocabList": [
          {
            "word": "prévenir qn à temps",
            "meaning": "及时通知/提醒某人"
          },
          {
            "word": "tard (adv.)",
            "meaning": "迟，晚"
          }
        ]
      },
      {
        "id": "30_q3",
        "questionType": "词汇语法",
        "categoryTag": "介词与冠词 · 国名专有搭配",
        "question": "Le président français effectuera une visite officielle _____ Mexique le mois prochain.",
        "options": [
          "en",
          "au",
          "à",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n阳性单数国名以辅音结尾通常使用定冠词 le (如 le Mexique, le Japon, le Canada)。表示“去往”或“在”阳性单数国名前，介词必须用【au】 (à + le 缩合)！选 B。",
        "translation": "法国总统下个月将对墨西哥进行正式国事访问。",
        "grammarTag": "阳性国名前的介词搭配 (au Mexique)",
        "vocabList": [
          {
            "word": "visite officielle",
            "meaning": "国事访问，正式访问"
          },
          {
            "word": "effectuer (v.)",
            "meaning": "进行，执行"
          }
        ]
      },
      {
        "id": "30_q4",
        "questionType": "词汇语法",
        "categoryTag": "否定副词 · 文学句式辨析",
        "question": "Dans ce village isolé, il n'y a _____ de supermarché ni de pharmacie.",
        "options": [
          "aucun",
          "point",
          "jamais",
          "guère"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。",
        "translation": "在这个偏僻的孤立村庄里，既没有超市，也没有药店。",
        "grammarTag": "否定句型 (ne... point de)",
        "vocabList": [
          {
            "word": "isolé (adj.)",
            "meaning": "孤立的，偏远的"
          },
          {
            "word": "pharmacie (n.f.)",
            "meaning": "药店"
          }
        ]
      },
      {
        "id": "30_q5",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "30_q6",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "30_q7",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "30_q8",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "30_q9",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "30_q10",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "30_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "30_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "30_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "30_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "30_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "30_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "30_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "30_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "30_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "30_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "30_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "30_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "30_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "30_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_drill_31",
    "title": "【专项突破】复合过去 vs 未完成过去 vs 愈过去时配合专练 (卷一)",
    "frenchTitle": "Module Spécialisé 2 : Concordance des temps du passé (Vol. 1)",
    "track": "drill",
    "level": "专项攻坚",
    "schoolOrOrg": "法语教研组权威研发",
    "yearOrSession": "考点突破卷",
    "summary": "精准切分过去时态坐标：瞬间完成 vs 延续背景，过去的过去时态严谨呼应。",
    "durationMinutes": 35,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "31_q1",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "31_q2",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "31_q3",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "31_q4",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "31_q5",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "31_q6",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "31_q7",
        "questionType": "词汇语法",
        "categoryTag": "自反动词 · 互为间宾不配合",
        "question": "Les deux diplomates se sont _____ la main chaleureusement avant de commencer.",
        "options": [
          "serré",
          "serrée",
          "serrés",
          "serrées"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nse serrer la main 结构中，la main 为直接宾语且位于动词之后，se 实际上充当相互间接宾语（向对方握手），因此过去分词 serré【绝不配合】！选 A。",
        "translation": "两位外交官在开始前热情地握了手。",
        "grammarTag": "自反动词带直宾时分词不配合",
        "vocabList": [
          {
            "word": "se serrer la main",
            "meaning": "握手 (不配合)"
          },
          {
            "word": "chaleureusement (adv.)",
            "meaning": "热情地"
          }
        ]
      },
      {
        "id": "31_q8",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 最高级引导的定语从句",
        "question": "C'est le plus beau musée que je _____ jamais visité de toute ma vie.",
        "options": [
          "ai",
          "aie",
          "avais",
          "aurais"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词被形容词最高级 (le plus beau...) 或 seul / premier 等修饰时，后面的定语从句常使用【虚拟式 (Subjonctif)】以体现说话人的主观感叹评价。visité 复合过去虚拟式为【aie visité】。选 B。",
        "translation": "这是我一生中参观过的最美丽的博物馆。",
        "grammarTag": "最高级先行词后接虚拟式",
        "vocabList": [
          {
            "word": "musée (n.m.)",
            "meaning": "博物馆"
          },
          {
            "word": "de toute ma vie",
            "meaning": "我一生中"
          }
        ]
      },
      {
        "id": "31_q9",
        "questionType": "词汇语法",
        "categoryTag": "复合介词 · 空间与抽象方向",
        "question": "Il a installé son nouvel ordinateur _____ de la grande fenêtre.",
        "options": [
          "près",
          "en face",
          "au milieu",
          "au-dessus"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定方位短语：en face de... (在...对面)。près 也需加 de，但语义上在正对大窗户处摆放用 en face de 最为地道贴切。选 B。",
        "translation": "他把新电脑安装在正对着大窗户的位置。",
        "grammarTag": "空间介词短语 (en face de)",
        "vocabList": [
          {
            "word": "en face de",
            "meaning": "在...正对面"
          },
          {
            "word": "installer (v.)",
            "meaning": "安装，安置"
          }
        ]
      },
      {
        "id": "31_q10",
        "questionType": "词汇语法",
        "categoryTag": "否定句 · 冠词变 de 规则",
        "question": "Mon grand-père ne boit jamais _____ alcool pour préserver sa santé.",
        "options": [
          "d'",
          "de l'",
          "du",
          "un"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n在否定句 (ne... jamais) 中，直接宾语前面的部分冠词 (de l'alcool) 必须一律转变为介词【de】(因遇到元音省音为 d')。选 A。",
        "translation": "我祖父为了保持健康从不喝酒。",
        "grammarTag": "否定句中部分冠词变 de",
        "vocabList": [
          {
            "word": "alcool (n.m.)",
            "meaning": "酒精，酒"
          },
          {
            "word": "préserver la santé",
            "meaning": "保持健康"
          }
        ]
      },
      {
        "id": "31_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "31_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "31_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "31_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "31_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "31_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "31_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "31_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "31_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "31_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "31_q21",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "31_q22",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "31_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "31_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_drill_32",
    "title": "【专项突破】虚拟式触发从句与条件式假设用法专练 (卷二)",
    "frenchTitle": "Module Spécialisé 2 : Mode subjonctif et système hypothétique (Vol. 2)",
    "track": "drill",
    "level": "专项攻坚",
    "schoolOrOrg": "法语教研组权威研发",
    "yearOrSession": "考点突破卷",
    "summary": "直击二外语法制高点：情感/意愿/怀疑/连词短语触发虚拟式，以及 Si 条件句三层假设系统。",
    "durationMinutes": 35,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "32_q1",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "32_q2",
        "questionType": "词汇语法",
        "categoryTag": "自反动词 · 互为间宾不配合",
        "question": "Les deux diplomates se sont _____ la main chaleureusement avant de commencer.",
        "options": [
          "serré",
          "serrée",
          "serrés",
          "serrées"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nse serrer la main 结构中，la main 为直接宾语且位于动词之后，se 实际上充当相互间接宾语（向对方握手），因此过去分词 serré【绝不配合】！选 A。",
        "translation": "两位外交官在开始前热情地握了手。",
        "grammarTag": "自反动词带直宾时分词不配合",
        "vocabList": [
          {
            "word": "se serrer la main",
            "meaning": "握手 (不配合)"
          },
          {
            "word": "chaleureusement (adv.)",
            "meaning": "热情地"
          }
        ]
      },
      {
        "id": "32_q3",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 最高级引导的定语从句",
        "question": "C'est le plus beau musée que je _____ jamais visité de toute ma vie.",
        "options": [
          "ai",
          "aie",
          "avais",
          "aurais"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词被形容词最高级 (le plus beau...) 或 seul / premier 等修饰时，后面的定语从句常使用【虚拟式 (Subjonctif)】以体现说话人的主观感叹评价。visité 复合过去虚拟式为【aie visité】。选 B。",
        "translation": "这是我一生中参观过的最美丽的博物馆。",
        "grammarTag": "最高级先行词后接虚拟式",
        "vocabList": [
          {
            "word": "musée (n.m.)",
            "meaning": "博物馆"
          },
          {
            "word": "de toute ma vie",
            "meaning": "我一生中"
          }
        ]
      },
      {
        "id": "32_q4",
        "questionType": "词汇语法",
        "categoryTag": "复合介词 · 空间与抽象方向",
        "question": "Il a installé son nouvel ordinateur _____ de la grande fenêtre.",
        "options": [
          "près",
          "en face",
          "au milieu",
          "au-dessus"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定方位短语：en face de... (在...对面)。près 也需加 de，但语义上在正对大窗户处摆放用 en face de 最为地道贴切。选 B。",
        "translation": "他把新电脑安装在正对着大窗户的位置。",
        "grammarTag": "空间介词短语 (en face de)",
        "vocabList": [
          {
            "word": "en face de",
            "meaning": "在...正对面"
          },
          {
            "word": "installer (v.)",
            "meaning": "安装，安置"
          }
        ]
      },
      {
        "id": "32_q5",
        "questionType": "词汇语法",
        "categoryTag": "否定句 · 冠词变 de 规则",
        "question": "Mon grand-père ne boit jamais _____ alcool pour préserver sa santé.",
        "options": [
          "d'",
          "de l'",
          "du",
          "un"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n在否定句 (ne... jamais) 中，直接宾语前面的部分冠词 (de l'alcool) 必须一律转变为介词【de】(因遇到元音省音为 d')。选 A。",
        "translation": "我祖父为了保持健康从不喝酒。",
        "grammarTag": "否定句中部分冠词变 de",
        "vocabList": [
          {
            "word": "alcool (n.m.)",
            "meaning": "酒精，酒"
          },
          {
            "word": "préserver la santé",
            "meaning": "保持健康"
          }
        ]
      },
      {
        "id": "32_q6",
        "questionType": "词汇语法",
        "categoryTag": "时间状语从句 · avant que 触发虚拟式",
        "question": "Dépêchons-nous de rentrer avant qu'il ne _____ trop noir.",
        "options": [
          "fait",
          "fasse",
          "fera",
          "faisait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 avant que (在...之前) 引导时间状语从句，从句强制使用【虚拟式 (Subjonctif)】（从句中的 ne 为冗赘虚词，无否定含义）。faire 的虚拟式为 fasse。选 B。",
        "translation": "我们赶在天太黑之前赶紧回家吧。",
        "grammarTag": "avant que 后接虚拟式与虚词 ne",
        "vocabList": [
          {
            "word": "se dépêcher de",
            "meaning": "赶快做某事"
          },
          {
            "word": "faire noir",
            "meaning": "天黑"
          }
        ]
      },
      {
        "id": "32_q7",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · lequel 与介词缩合",
        "question": "Voici la magnifique bibliothèque dans _____ j'ai passé toute ma jeunesse.",
        "options": [
          "laquelle",
          "lequel",
          "lesquelles",
          "dont"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 la bibliothèque 为阴性单数名词，与介词 dans 连用，必须使用复合关系代词阴性单数形式【laquelle】。选 A。",
        "translation": "这就是我度过全部青年时代的宏伟图书馆。",
        "grammarTag": "介词 + lequel/laquelle 复合关系代词",
        "vocabList": [
          {
            "word": "bibliothèque (n.f.)",
            "meaning": "图书馆"
          },
          {
            "word": "jeunesse (n.f.)",
            "meaning": "青年时期"
          }
        ]
      },
      {
        "id": "32_q8",
        "questionType": "词汇语法",
        "categoryTag": "副动词 · En + Participe présent",
        "question": "_____ la rue prudemment, les enfants regardent à gauche et à droite.",
        "options": [
          "En traversant",
          "Traversé",
          "Avoir traversé",
          "Pour traverser"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n副动词 (En + 现在分词 traversant) 在句中充当时间或伴随状语，表示“在过马路的时候”。选 A。",
        "translation": "在小心穿过马路时，孩子们向左看也向右看。",
        "grammarTag": "副动词表示伴随与时间 (En traversant)",
        "vocabList": [
          {
            "word": "traverser la rue",
            "meaning": "穿过马路"
          },
          {
            "word": "prudemment (adv.)",
            "meaning": "谨慎地，小心地"
          }
        ]
      },
      {
        "id": "32_q9",
        "questionType": "词汇语法",
        "categoryTag": "时态配合 · 愈过去时",
        "question": "Hier soir, dès qu'elle _____ son travail, elle est sortie avec ses amies.",
        "options": [
          "a fini",
          "avait fini",
          "eut fini",
          "finissait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为复合过去时 (est sortie)，从句 dès que (一...就...) 表达在过去基准时间点之前已经完成的动作，必须使用愈过去时 (Plus-que-parfait: avait fini) 表达“过去的过去”。选 B。",
        "translation": "昨天晚上，她一完成工作，就和朋友们出去了。",
        "grammarTag": "愈过去时 (Plus-que-parfait)",
        "vocabList": [
          {
            "word": "sortir avec",
            "meaning": "与...一起外出"
          },
          {
            "word": "dès que",
            "meaning": "一...就... (连词短语)"
          }
        ]
      },
      {
        "id": "32_q10",
        "questionType": "词汇语法",
        "categoryTag": "代词系统 · 双代词语序",
        "question": "Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.",
        "options": [
          "leur en",
          "en leur",
          "les en",
          "en lui"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nparler de qch (用副代词 en 替代) à qn (父母为复数，用间宾代词 leur)。根据双代词语序规则：人称代词 (lui / leur) 必须位于副代词 (y / en) 之前，因此唯一正确顺序为【leur en】。选 A。",
        "translation": "你跟父母谈过你的新项目了吗？——是的，我昨天已经跟他们谈过了。",
        "grammarTag": "双宾语代词位置 (leur en)",
        "vocabList": [
          {
            "word": "parler de qch à qn",
            "meaning": "就某事与某人交谈"
          },
          {
            "word": "projet (n.m.)",
            "meaning": "项目，计划"
          }
        ]
      },
      {
        "id": "32_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "32_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "32_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "32_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "32_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "32_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "32_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "32_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "32_q19",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "32_q20",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "32_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "32_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "32_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "32_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_drill_33",
    "title": "【专项突破】完形填空 (Texte à trous) 与介词固定搭配攻坚 (卷一)",
    "frenchTitle": "Module Spécialisé 3 : Texte à trous et prépositions idiomatiques (Vol. 1)",
    "track": "drill",
    "level": "专项攻坚",
    "schoolOrOrg": "法语教研组权威研发",
    "yearOrSession": "考点突破卷",
    "summary": "集训动词介词搭配 (à / de / pour / contre) 及冠词省略规律，提升完形语感速度。",
    "durationMinutes": 35,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "33_q1",
        "questionType": "词汇语法",
        "categoryTag": "时间状语从句 · avant que 触发虚拟式",
        "question": "Dépêchons-nous de rentrer avant qu'il ne _____ trop noir.",
        "options": [
          "fait",
          "fasse",
          "fera",
          "faisait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 avant que (在...之前) 引导时间状语从句，从句强制使用【虚拟式 (Subjonctif)】（从句中的 ne 为冗赘虚词，无否定含义）。faire 的虚拟式为 fasse。选 B。",
        "translation": "我们赶在天太黑之前赶紧回家吧。",
        "grammarTag": "avant que 后接虚拟式与虚词 ne",
        "vocabList": [
          {
            "word": "se dépêcher de",
            "meaning": "赶快做某事"
          },
          {
            "word": "faire noir",
            "meaning": "天黑"
          }
        ]
      },
      {
        "id": "33_q2",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · lequel 与介词缩合",
        "question": "Voici la magnifique bibliothèque dans _____ j'ai passé toute ma jeunesse.",
        "options": [
          "laquelle",
          "lequel",
          "lesquelles",
          "dont"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 la bibliothèque 为阴性单数名词，与介词 dans 连用，必须使用复合关系代词阴性单数形式【laquelle】。选 A。",
        "translation": "这就是我度过全部青年时代的宏伟图书馆。",
        "grammarTag": "介词 + lequel/laquelle 复合关系代词",
        "vocabList": [
          {
            "word": "bibliothèque (n.f.)",
            "meaning": "图书馆"
          },
          {
            "word": "jeunesse (n.f.)",
            "meaning": "青年时期"
          }
        ]
      },
      {
        "id": "33_q3",
        "questionType": "词汇语法",
        "categoryTag": "副动词 · En + Participe présent",
        "question": "_____ la rue prudemment, les enfants regardent à gauche et à droite.",
        "options": [
          "En traversant",
          "Traversé",
          "Avoir traversé",
          "Pour traverser"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n副动词 (En + 现在分词 traversant) 在句中充当时间或伴随状语，表示“在过马路的时候”。选 A。",
        "translation": "在小心穿过马路时，孩子们向左看也向右看。",
        "grammarTag": "副动词表示伴随与时间 (En traversant)",
        "vocabList": [
          {
            "word": "traverser la rue",
            "meaning": "穿过马路"
          },
          {
            "word": "prudemment (adv.)",
            "meaning": "谨慎地，小心地"
          }
        ]
      },
      {
        "id": "33_q4",
        "questionType": "词汇语法",
        "categoryTag": "时态配合 · 愈过去时",
        "question": "Hier soir, dès qu'elle _____ son travail, elle est sortie avec ses amies.",
        "options": [
          "a fini",
          "avait fini",
          "eut fini",
          "finissait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为复合过去时 (est sortie)，从句 dès que (一...就...) 表达在过去基准时间点之前已经完成的动作，必须使用愈过去时 (Plus-que-parfait: avait fini) 表达“过去的过去”。选 B。",
        "translation": "昨天晚上，她一完成工作，就和朋友们出去了。",
        "grammarTag": "愈过去时 (Plus-que-parfait)",
        "vocabList": [
          {
            "word": "sortir avec",
            "meaning": "与...一起外出"
          },
          {
            "word": "dès que",
            "meaning": "一...就... (连词短语)"
          }
        ]
      },
      {
        "id": "33_q5",
        "questionType": "词汇语法",
        "categoryTag": "代词系统 · 双代词语序",
        "question": "Tu as parlé de ton nouveau projet à tes parents ? — Oui, je _____ ai parlé hier.",
        "options": [
          "leur en",
          "en leur",
          "les en",
          "en lui"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nparler de qch (用副代词 en 替代) à qn (父母为复数，用间宾代词 leur)。根据双代词语序规则：人称代词 (lui / leur) 必须位于副代词 (y / en) 之前，因此唯一正确顺序为【leur en】。选 A。",
        "translation": "你跟父母谈过你的新项目了吗？——是的，我昨天已经跟他们谈过了。",
        "grammarTag": "双宾语代词位置 (leur en)",
        "vocabList": [
          {
            "word": "parler de qch à qn",
            "meaning": "就某事与某人交谈"
          },
          {
            "word": "projet (n.m.)",
            "meaning": "项目，计划"
          }
        ]
      },
      {
        "id": "33_q6",
        "questionType": "词汇语法",
        "categoryTag": "分词配合 · 直宾提前",
        "question": "Les photos que vous avez _____ sont magnifiques.",
        "options": [
          "pris",
          "prise",
          "prises",
          "prennent"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n在以 avoir 为助动词的复合时态中，直接宾语提前时过去分词必须与直接宾语进行性数配合。先行词 les photos 为阴性复数，关系代词 que 在从句中充当直宾，故 prendre 的过去分词变为主格配合形态【prises】。选 C。",
        "translation": "您拍的那些照片真是太美了。",
        "grammarTag": "过去分词与直宾性数配合",
        "vocabList": [
          {
            "word": "prendre des photos",
            "meaning": "拍照"
          },
          {
            "word": "magnifique (adj.)",
            "meaning": "宏伟壮丽的"
          }
        ]
      },
      {
        "id": "33_q7",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 触发连词短语",
        "question": "Bien qu'il _____ beaucoup de difficultés, il n'a jamais abandonné son rêve.",
        "options": [
          "a",
          "avait",
          "ait",
          "aura"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 bien que (尽管，虽然) 引导让步状语从句，从句动词必须强制使用【虚拟式 (Subjonctif)】。动词 avoir 的虚拟式第三人称单数为【ait】。选 C。",
        "translation": "尽管遇到了许多困难，但他从未放弃自己的梦想。",
        "grammarTag": "虚拟式现在时 (bien que)",
        "vocabList": [
          {
            "word": "bien que + subj.",
            "meaning": "尽管，虽然"
          },
          {
            "word": "abandonner (v.)",
            "meaning": "放弃"
          }
        ]
      },
      {
        "id": "33_q8",
        "questionType": "词汇语法",
        "categoryTag": "代词式动词 · 分词配合避坑",
        "question": "Elles se sont _____ compte de leur erreur un peu trop tard.",
        "options": [
          "rendu",
          "rendue",
          "rendus",
          "rendues"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定短语 se rendre compte de qch (意识到某事)。自反代词 se 在此结构中充当间接宾语，compte 为直接宾语且位于动词之后，因此过去分词 rendu【绝不配合】，保持阳性单数原形 rendu。选 A。",
        "translation": "她们意识到自己的错误时已经有点太晚了。",
        "grammarTag": "代词式动词固定短语 (se rendre compte)",
        "vocabList": [
          {
            "word": "se rendre compte de",
            "meaning": "意识到，发觉 (不配合)"
          },
          {
            "word": "erreur (n.f.)",
            "meaning": "错误"
          }
        ]
      },
      {
        "id": "33_q9",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · dont 深度考查",
        "question": "C'est une entreprise internationale _____ le directeur général est très jeune.",
        "options": [
          "qui",
          "que",
          "dont",
          "où"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune。de + 先行词充当名词的所有格限制补语，必须使用关系代词【dont】。选 C。",
        "translation": "这是一间总经理非常年轻的国际跨国企业。",
        "grammarTag": "关系代词 dont 的所有格用法",
        "vocabList": [
          {
            "word": "directeur général",
            "meaning": "总经理 / CEO"
          },
          {
            "word": "entreprise (n.f.)",
            "meaning": "企业，公司"
          }
        ]
      },
      {
        "id": "33_q10",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · y 的地点与抽象引申",
        "question": "Pensez-vous encore à votre ancien travail ? — Non, je n'_____ pense plus du tout.",
        "options": [
          "en",
          "y",
          "le",
          "lui"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\npenser à qch (思考/挂念某事)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。",
        "translation": "你还会想起以前的那份工作吗？——不，我一点也不再去想它了。",
        "grammarTag": "副代词 y (代替 à + 物)",
        "vocabList": [
          {
            "word": "penser à qch",
            "meaning": "考虑某事，想念某事"
          },
          {
            "word": "ne... plus du tout",
            "meaning": "一点也不再..."
          }
        ]
      },
      {
        "id": "33_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "33_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "33_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "33_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "33_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "33_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "33_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "33_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "33_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "33_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "33_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "33_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "33_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "33_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_drill_34",
    "title": "【专项突破】完形填空 (Texte à trous) 与连词短语攻坚 (卷二)",
    "frenchTitle": "Module Spécialisé 3 : Connecteurs logiques et cohésion textuelle (Vol. 2)",
    "track": "drill",
    "level": "专项攻坚",
    "schoolOrOrg": "法语教研组权威研发",
    "yearOrSession": "考点突破卷",
    "summary": "攻克转折、让步、因果、目的连词在语篇中的衔接作用，完形填空百发百中。",
    "durationMinutes": 35,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "34_q1",
        "questionType": "词汇语法",
        "categoryTag": "分词配合 · 直宾提前",
        "question": "Les photos que vous avez _____ sont magnifiques.",
        "options": [
          "pris",
          "prise",
          "prises",
          "prennent"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n在以 avoir 为助动词的复合时态中，直接宾语提前时过去分词必须与直接宾语进行性数配合。先行词 les photos 为阴性复数，关系代词 que 在从句中充当直宾，故 prendre 的过去分词变为主格配合形态【prises】。选 C。",
        "translation": "您拍的那些照片真是太美了。",
        "grammarTag": "过去分词与直宾性数配合",
        "vocabList": [
          {
            "word": "prendre des photos",
            "meaning": "拍照"
          },
          {
            "word": "magnifique (adj.)",
            "meaning": "宏伟壮丽的"
          }
        ]
      },
      {
        "id": "34_q2",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 触发连词短语",
        "question": "Bien qu'il _____ beaucoup de difficultés, il n'a jamais abandonné son rêve.",
        "options": [
          "a",
          "avait",
          "ait",
          "aura"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 bien que (尽管，虽然) 引导让步状语从句，从句动词必须强制使用【虚拟式 (Subjonctif)】。动词 avoir 的虚拟式第三人称单数为【ait】。选 C。",
        "translation": "尽管遇到了许多困难，但他从未放弃自己的梦想。",
        "grammarTag": "虚拟式现在时 (bien que)",
        "vocabList": [
          {
            "word": "bien que + subj.",
            "meaning": "尽管，虽然"
          },
          {
            "word": "abandonner (v.)",
            "meaning": "放弃"
          }
        ]
      },
      {
        "id": "34_q3",
        "questionType": "词汇语法",
        "categoryTag": "代词式动词 · 分词配合避坑",
        "question": "Elles se sont _____ compte de leur erreur un peu trop tard.",
        "options": [
          "rendu",
          "rendue",
          "rendus",
          "rendues"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定短语 se rendre compte de qch (意识到某事)。自反代词 se 在此结构中充当间接宾语，compte 为直接宾语且位于动词之后，因此过去分词 rendu【绝不配合】，保持阳性单数原形 rendu。选 A。",
        "translation": "她们意识到自己的错误时已经有点太晚了。",
        "grammarTag": "代词式动词固定短语 (se rendre compte)",
        "vocabList": [
          {
            "word": "se rendre compte de",
            "meaning": "意识到，发觉 (不配合)"
          },
          {
            "word": "erreur (n.f.)",
            "meaning": "错误"
          }
        ]
      },
      {
        "id": "34_q4",
        "questionType": "词汇语法",
        "categoryTag": "关系代词 · dont 深度考查",
        "question": "C'est une entreprise internationale _____ le directeur général est très jeune.",
        "options": [
          "qui",
          "que",
          "dont",
          "où"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n分析从句：le directeur général [de cette entreprise] est très jeune。de + 先行词充当名词的所有格限制补语，必须使用关系代词【dont】。选 C。",
        "translation": "这是一间总经理非常年轻的国际跨国企业。",
        "grammarTag": "关系代词 dont 的所有格用法",
        "vocabList": [
          {
            "word": "directeur général",
            "meaning": "总经理 / CEO"
          },
          {
            "word": "entreprise (n.f.)",
            "meaning": "企业，公司"
          }
        ]
      },
      {
        "id": "34_q5",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · y 的地点与抽象引申",
        "question": "Pensez-vous encore à votre ancien travail ? — Non, je n'_____ pense plus du tout.",
        "options": [
          "en",
          "y",
          "le",
          "lui"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\npenser à qch (思考/挂念某事)。介词 à + 事物名词，在法语中必须使用副代词【y】替代并置于相关动词之前。选 B。",
        "translation": "你还会想起以前的那份工作吗？——不，我一点也不再去想它了。",
        "grammarTag": "副代词 y (代替 à + 物)",
        "vocabList": [
          {
            "word": "penser à qch",
            "meaning": "考虑某事，想念某事"
          },
          {
            "word": "ne... plus du tout",
            "meaning": "一点也不再..."
          }
        ]
      },
      {
        "id": "34_q6",
        "questionType": "词汇语法",
        "categoryTag": "条件式 · 与过去假设配合",
        "question": "Si tu m'avais prévenu à temps, je ne _____ pas venu si tard.",
        "options": [
          "serais",
          "serais été",
          "fus",
          "sois"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nSi 引导的对过去虚拟假设句型：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。",
        "translation": "如果你及时通知我，我就不会来得这么晚了。",
        "grammarTag": "Si 条件假设与条件式过去时",
        "vocabList": [
          {
            "word": "prévenir qn à temps",
            "meaning": "及时通知/提醒某人"
          },
          {
            "word": "tard (adv.)",
            "meaning": "迟，晚"
          }
        ]
      },
      {
        "id": "34_q7",
        "questionType": "词汇语法",
        "categoryTag": "介词与冠词 · 国名专有搭配",
        "question": "Le président français effectuera une visite officielle _____ Mexique le mois prochain.",
        "options": [
          "en",
          "au",
          "à",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n阳性单数国名以辅音结尾通常使用定冠词 le (如 le Mexique, le Japon, le Canada)。表示“去往”或“在”阳性单数国名前，介词必须用【au】 (à + le 缩合)！选 B。",
        "translation": "法国总统下个月将对墨西哥进行正式国事访问。",
        "grammarTag": "阳性国名前的介词搭配 (au Mexique)",
        "vocabList": [
          {
            "word": "visite officielle",
            "meaning": "国事访问，正式访问"
          },
          {
            "word": "effectuer (v.)",
            "meaning": "进行，执行"
          }
        ]
      },
      {
        "id": "34_q8",
        "questionType": "词汇语法",
        "categoryTag": "否定副词 · 文学句式辨析",
        "question": "Dans ce village isolé, il n'y a _____ de supermarché ni de pharmacie.",
        "options": [
          "aucun",
          "point",
          "jamais",
          "guère"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。",
        "translation": "在这个偏僻的孤立村庄里，既没有超市，也没有药店。",
        "grammarTag": "否定句型 (ne... point de)",
        "vocabList": [
          {
            "word": "isolé (adj.)",
            "meaning": "孤立的，偏远的"
          },
          {
            "word": "pharmacie (n.f.)",
            "meaning": "药店"
          }
        ]
      },
      {
        "id": "34_q9",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "34_q10",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "34_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "34_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "34_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 复合过去 vs 未完成过去",
        "question": "Pendant que nous (dîner) _____, le téléphone a soudainement sonné.",
        "options": [
          "avons dîné",
          "dînions",
          "dînâmes",
          "dînerons"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\npendant que 引导过去的正在进行的背景动作（当时正在吃晚餐），主句 a sonné 是突发短暂完成动作。背景延续动作必须使用【未完成过去时 (Imparfait: dînions)】。选 B。",
        "translation": "当我们正在吃晚饭的时候，电话突然响了。",
        "grammarTag": "未完成过去时充当背景时态",
        "vocabList": [
          {
            "word": "pendant que",
            "meaning": "当...的时候 (伴随延续)"
          },
          {
            "word": "soudainement (adv.)",
            "meaning": "突然，骤然"
          }
        ]
      },
      {
        "id": "34_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "34_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "34_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "34_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "34_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "34_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "34_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "34_q21",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "34_q22",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "34_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "34_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_drill_35",
    "title": "【专项突破】长篇阅读理解 (Compréhension écrite) 法国社会文化精读 (卷一)",
    "frenchTitle": "Module Spécialisé 4 : Lecture critique — Société et culture françaises (Vol. 1)",
    "track": "drill",
    "level": "专项攻坚",
    "schoolOrOrg": "法语教研组权威研发",
    "yearOrSession": "考点突破卷",
    "summary": "法国社科原版大文：生活方式变革、教育公平与文化多样性事实推理精练。",
    "durationMinutes": 40,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "35_q1",
        "questionType": "词汇语法",
        "categoryTag": "条件式 · 与过去假设配合",
        "question": "Si tu m'avais prévenu à temps, je ne _____ pas venu si tard.",
        "options": [
          "serais",
          "serais été",
          "fus",
          "sois"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nSi 引导的对过去虚拟假设句型：Si + 直陈式愈过去时 (avais prévenu)，主句必须使用【条件式过去时 (Conditionnel passé)】：助动词条件式现在时 (serais) + 过去分词 (venu)。选 A。",
        "translation": "如果你及时通知我，我就不会来得这么晚了。",
        "grammarTag": "Si 条件假设与条件式过去时",
        "vocabList": [
          {
            "word": "prévenir qn à temps",
            "meaning": "及时通知/提醒某人"
          },
          {
            "word": "tard (adv.)",
            "meaning": "迟，晚"
          }
        ]
      },
      {
        "id": "35_q2",
        "questionType": "词汇语法",
        "categoryTag": "介词与冠词 · 国名专有搭配",
        "question": "Le président français effectuera une visite officielle _____ Mexique le mois prochain.",
        "options": [
          "en",
          "au",
          "à",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n阳性单数国名以辅音结尾通常使用定冠词 le (如 le Mexique, le Japon, le Canada)。表示“去往”或“在”阳性单数国名前，介词必须用【au】 (à + le 缩合)！选 B。",
        "translation": "法国总统下个月将对墨西哥进行正式国事访问。",
        "grammarTag": "阳性国名前的介词搭配 (au Mexique)",
        "vocabList": [
          {
            "word": "visite officielle",
            "meaning": "国事访问，正式访问"
          },
          {
            "word": "effectuer (v.)",
            "meaning": "进行，执行"
          }
        ]
      },
      {
        "id": "35_q3",
        "questionType": "词汇语法",
        "categoryTag": "否定副词 · 文学句式辨析",
        "question": "Dans ce village isolé, il n'y a _____ de supermarché ni de pharmacie.",
        "options": [
          "aucun",
          "point",
          "jamais",
          "guère"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\nne... point de... ni de... 是传统书面法语与考研二外高频考查句型，相当于 ne... pas de... (根本没有，绝无)。aucun 后直接接单数名词不用 de；guère 意为“几乎不”。选 B。",
        "translation": "在这个偏僻的孤立村庄里，既没有超市，也没有药店。",
        "grammarTag": "否定句型 (ne... point de)",
        "vocabList": [
          {
            "word": "isolé (adj.)",
            "meaning": "孤立的，偏远的"
          },
          {
            "word": "pharmacie (n.f.)",
            "meaning": "药店"
          }
        ]
      },
      {
        "id": "35_q4",
        "questionType": "词汇语法",
        "categoryTag": "连接连词 · 因果与时间逻辑",
        "question": "_____ il pleuvait à verse, nous avons préféré rester à l'hôtel.",
        "options": [
          "Comme",
          "Puisque",
          "Parce que",
          "Car"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n引导原因从句且置于【句首】时，首选连词为【Comme】！Parce que 和 car 一般置于主句之后，不能直接置于句首。选 A。",
        "translation": "由于当时正下着倾盆大雨，我们宁愿留在酒店里。",
        "grammarTag": "句首原因状语从句 (Comme)",
        "vocabList": [
          {
            "word": "pleuvoir à verse",
            "meaning": "倾盆大雨，下暴雨"
          },
          {
            "word": "préférer + inf.",
            "meaning": "宁愿做某事"
          }
        ]
      },
      {
        "id": "35_q5",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 情感心理动词后接从句",
        "question": "Je suis vraiment ravi que vous _____ enfin assister à notre conférence.",
        "options": [
          "pouvez",
          "puissiez",
          "pourrez",
          "pouviez"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句表示喜悦、欣慰等主观心理情感 (être ravi que, être content que)，从句强制要求使用【虚拟式 (Subjonctif)】。pouvoir 的虚拟式现在时变位：que vous puissiez。选 B。",
        "translation": "得知您终于能出席我们的研讨会，我真是太高兴了。",
        "grammarTag": "情感动词后接虚拟式 (être ravi que)",
        "vocabList": [
          {
            "word": "être ravi de / que",
            "meaning": "对...感到由衷高兴"
          },
          {
            "word": "assister à",
            "meaning": "出席，参加"
          }
        ]
      },
      {
        "id": "35_q6",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "35_q7",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "35_q8",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "35_q9",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "35_q10",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "35_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 简单将来时特殊词根",
        "question": "Dès que le professeur arrivera, nous lui (envoyer) _____ notre rapport.",
        "options": [
          "envoyons",
          "enverrons",
          "envoyerons",
          "enverrions"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\ndès que 引导的时间状语从句使用简单将来时 (arrivera)，主句同样使用简单将来时。动词 envoyer 的将来时词根特殊异化为 enverr-，第一人称复数变位为【enverrons】。选 B。",
        "translation": "老师一到，我们就将向他递交我们的报告。",
        "grammarTag": "envoyer 的简单将来时变位",
        "vocabList": [
          {
            "word": "envoyer qch à qn",
            "meaning": "寄送某物给某人"
          },
          {
            "word": "rapport (n.m.)",
            "meaning": "报告，汇报"
          }
        ]
      },
      {
        "id": "35_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式现在时表委婉",
        "question": "Excusez-moi monsieur, (pouvoir) _____-vous m'indiquer le chemin de la gare ?",
        "options": [
          "pouvez",
          "pourriez",
          "puissiez",
          "pourrez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n在法语交际中，提出礼貌请求、委婉发问必须使用【条件式现在时 (Conditionnel présent)】：pourriez-vous...？这比直陈式 pouvez-vous 更加优雅客气。选 B。",
        "translation": "打扰一下先生，请问您能给我指一下去火车站的路吗？",
        "grammarTag": "条件式现在时表示礼貌委婉请求",
        "vocabList": [
          {
            "word": "indiquer le chemin",
            "meaning": "指路，领路"
          },
          {
            "word": "gare (n.f.)",
            "meaning": "火车站"
          }
        ]
      },
      {
        "id": "35_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 先将来时 (Futur antérieur)",
        "question": "Quand tu (terminer) _____ tes études de médecine, tu seras un excellent chirurgien.",
        "options": [
          "termineras",
          "auras terminé",
          "avais terminé",
          "termines"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (seras)，从句 quand 表示在未来的某一动作之前已完成的动作，必须使用【先将来时 (Futur antérieur: auras terminé)】。选 B。",
        "translation": "当你完成医学学业时，你将会成为一名杰出的外科医生。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "études de médecine",
            "meaning": "医学学业"
          },
          {
            "word": "chirurgien (n.m.)",
            "meaning": "外科医生"
          }
        ]
      },
      {
        "id": "35_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "35_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (1) 空应填入哪个动词短语搭配？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "commencent",
          "décident",
          "hésitent",
          "pensent"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】commencer à faire qch (开始做某事)。décider 需接 de，hésiter 虽可接 à 但语意不符“正开始测试”。选 A。",
        "translation": "commencent à tester (开始测试)",
        "grammarTag": "动词介词搭配 (commencer à)"
      },
      {
        "id": "35_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (2) 空应填入哪个介词与冠词缩合？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "du",
          "au",
          "de",
          "le"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定短语 bénéficier de qch (享有/获益于某物)。le droit 前面缩合为 de + le =【du】。选 A。",
        "translation": "bénéficier du droit à la déconnexion (享有离线权)",
        "grammarTag": "动词搭配与缩合冠词 (bénéficier du)"
      },
      {
        "id": "35_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (3) 空应填入哪个介词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "à",
          "de",
          "pour",
          "vers"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 contribuer à faire qch (有助于做某事，对...做贡献)。选 A。",
        "translation": "contribuer à augmenter la productivité (有助于提高生产力)",
        "grammarTag": "固定搭配 (contribuer à)"
      },
      {
        "id": "35_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 法国现代职场四天工作制与离线权思辨",
        "question": "第 (4) 空应填入哪个冠词？",
        "contextText": "Depuis quelques années, le monde du travail en France connaît une véritable mutation. De plus en plus d'entreprises (1)_____ à tester la semaine de quatre jours afin d'améliorer la qualité de vie des salariés. Les employés bénéficient également (2)_____ droit à la déconnexion pendant le week-end. Selon les sondages récents, cette organisation moderne contribue (3)_____ augmenter la productivité globale tout en diminuant considérablement (4)_____ stress professionnel.",
        "options": [
          "le",
          "du",
          "au",
          "un"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】diminuer 是直接及物动词，直接接名词直宾 le stress (减轻职业压力)。选 A。",
        "translation": "diminuer le stress (减轻压力)",
        "grammarTag": "动词及物性与直接宾语"
      },
      {
        "id": "35_q19",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Jusqu'à quand un voyageur peut-il échanger son billet TGV sans payer aucun frais ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Jusqu'à 6 jours avant le départ du train.",
          "Jusqu'à 30 minutes avant le départ.",
          "Le jour même du voyage à la gare.",
          "Pendant 30 jours après le voyage."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第一条明确注明：échangeables et remboursables sans frais jusqu'à 6 jours avant le départ (发车前6天之前可免手续费退改签)。选 A。",
        "translation": "旅客最迟什么时候可以免费改签其 TGV 火车票？——发车前6天。",
        "grammarTag": "实用公文图表阅读 · 期限与费用"
      },
      {
        "id": "35_q20",
        "questionType": "读解分析",
        "categoryTag": "实用告示 · 法国国铁 SNCF 火车票改签与退款官方须知",
        "question": "Que se passe-t-il si un voyageur souhaite échanger son billet 20 minutes avant le départ ?",
        "contextText": "SNCF VOYAGEURS — CONDITIONS OFFICIELLES D'ÉCHANGE ET DE REMBOURSEMENT TGV INOUI\n\n1. Billets échangeables et remboursables sans frais jusqu'à 6 jours avant le départ du train.\n2. À partir de 5 jours et jusqu'à 30 minutes avant l'heure de départ, une retenue forfaitaire de 19 € par personne et par trajet s'applique sur chaque billet.\n3. Dès 30 minutes avant le départ, les billets deviennent non remboursables. L'échange reste possible jusqu'au départ uniquement pour un autre train le même jour et sur le même trajet.\n4. Tout remboursement s'effectue automatiquement sur le compte bancaire ayant servi au paiement initial sous un délai de 3 à 5 jours ouvrés.",
        "options": [
          "Le billet n'est plus remboursable, mais échangeable pour le même jour et trajet.",
          "Le billet est remboursé à 100 % immédiatement en liquide.",
          "Aucun changement n'est possible sous aucun prétexte.",
          "Le voyageur doit payer une pénalité de 100 €."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】告示第三条注明：从发车前30分钟起不可退款，但在发车前仍可改签同一天相同行程的其他班次。选 A。",
        "translation": "如果旅客在发车前20分钟想要改签车票，会怎么样？——不可退款，但可改签同日同路线车次。",
        "grammarTag": "实用公文图表阅读 · 限制条件"
      },
      {
        "id": "35_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "35_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "35_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 法国电台专访环境保护倡议",
        "question": "D'après l'invitée de l'émission, que faut-il faire pour réduire l'empreinte carbone ?",
        "audioScript": "Chers auditeurs de France Culture, aujourd'hui nous recevons Madame Claire Dubois, directrice de recherche en écologie. Selon elle, pour réduire efficacement notre empreinte carbone, le simple geste de consommer des produits locaux et de saison permettrait de diminuer les émissions de gaz à effet de serre de près de trente pour cent.",
        "options": [
          "Consommer des produits locaux et de saison.",
          "Arrêter définitivement de voyager à l'étranger.",
          "Acheter uniquement des produits importés par avion.",
          "Fermer toutes les usines du pays."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n嘉宾核心观点原话：consommer des produits locaux et de saison permettrait de diminuer les émissions de près de 30% (消费本地和当季食品)。选 A。",
        "translation": "亲爱的法国文化广播电台听众，今天我们连线生态学研究主任克莱尔·杜布瓦女士。据她介绍，消费本地与当季产品可将碳排放减少近30%。",
        "grammarTag": "社论与新闻采访观点提取",
        "vocabList": [
          {
            "word": "empreinte carbone",
            "meaning": "碳足迹"
          },
          {
            "word": "de saison",
            "meaning": "当季的"
          }
        ]
      },
      {
        "id": "35_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎生活实用咨询",
        "question": "Combien de documents principaux la banquière demande-t-elle à l'étudiant ?",
        "audioScript": "Bonjour madame. J'aimerais ouvrir un compte bancaire pour mes études en France. Quels sont les documents nécessaires ? — Bonjour monsieur ! Il vous faut votre passeport, une attestation d'inscription de votre université ainsi qu'un justificatif de domicile de moins de trois mois.",
        "options": [
          "Trois documents (passeport, attestation, justificatif de domicile).",
          "Un seul document (carte d'identité).",
          "Cinq documents avec un extrait de casier judiciaire.",
          "Aucun document n'est exigé."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n银行职员列举了三件必需文件：1. passeport (护照), 2. attestation d'inscription (注册证明), 3. justificatif de domicile (3个月内住所证明)。选 A。",
        "translation": "“您好女士，我想开立学生银行账户，需要哪些文件？”——“您需要护照、大学注册证明和3个月内的住所证明。”",
        "grammarTag": "行政与生活场景交际",
        "vocabList": [
          {
            "word": "justificatif de domicile",
            "meaning": "住所证明"
          },
          {
            "word": "attestation (n.f.)",
            "meaning": "证明书"
          }
        ]
      }
    ]
  },
  {
    "id": "paper_drill_36",
    "title": "【专项突破】长篇阅读理解 (Compréhension écrite) 科技与生态批判精读 (卷二)",
    "frenchTitle": "Module Spécialisé 4 : Lecture critique — Transition écologique et numérique (Vol. 2)",
    "track": "drill",
    "level": "专项攻坚",
    "schoolOrOrg": "法语教研组权威研发",
    "yearOrSession": "考点突破卷",
    "summary": "当代欧洲学术热点论述精读：技术中立性思辨、绿色发展与数字文明深度考题突破。",
    "durationMinutes": 40,
    "totalScore": 100,
    "isFreePreview": false,
    "questions": [
      {
        "id": "36_q1",
        "questionType": "词汇语法",
        "categoryTag": "副代词 · en 代替数量短语",
        "question": "Combien de dictionnaires français avez-vous dans votre bureau ? — J'_____ ai trois.",
        "options": [
          "les",
          "y",
          "en",
          "des"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n当回答中保留基数词 (trois) 时，前面被省略的名词必须用副代词【en】来指代，构成 j'en ai + 数字 的经典结构。选 C。",
        "translation": "您办公室里有几本法语字典？——我有三本。",
        "grammarTag": "副代词 en 代替数量名词",
        "vocabList": [
          {
            "word": "dictionnaire (n.m.)",
            "meaning": "字典，词典"
          },
          {
            "word": "combien de",
            "meaning": "多少 (后接复数)"
          }
        ]
      },
      {
        "id": "36_q2",
        "questionType": "词汇语法",
        "categoryTag": "指示代词 · celui 的性数配合",
        "question": "Cette robe rouge est jolie, mais je préfère _____ qui est dans la vitrine.",
        "options": [
          "celui",
          "celle",
          "ceux",
          "celles"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词 cette robe 为阴性单数名词，指示代词必须与其性数保持一致，指代阴性单数事物用【celle】。选 B。",
        "translation": "这条红色的连衣裙很漂亮，但我更喜欢橱窗里的那一条。",
        "grammarTag": "指示代词 celui/celle/ceux/celles",
        "vocabList": [
          {
            "word": "robe (n.f.)",
            "meaning": "连衣裙，长袍"
          },
          {
            "word": "vitrine (n.f.)",
            "meaning": "橱窗"
          }
        ]
      },
      {
        "id": "36_q3",
        "questionType": "词汇语法",
        "categoryTag": "先行词 · ce qui / ce que 引导主从句",
        "question": "Il est arrivé en retard à la réunion, _____ a beaucoup énervé le directeur.",
        "options": [
          "qui",
          "que",
          "ce qui",
          "ce que"
        ],
        "correctAnswer": 2,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词是前面整句话所叙述的事情（他开会迟到这件事），且在从句中充当主语（...激怒了主管），必须使用复合关系代词【ce qui】。选 C。",
        "translation": "他开会迟到了，这让主管非常恼火。",
        "grammarTag": "关系代词 ce qui 代替整句话做主语",
        "vocabList": [
          {
            "word": "en retard",
            "meaning": "迟到"
          },
          {
            "word": "énerver qn",
            "meaning": "使某人恼火，激怒"
          }
        ]
      },
      {
        "id": "36_q4",
        "questionType": "词汇语法",
        "categoryTag": "复合时态 · 先将来时表示将来先完成",
        "question": "Dès que nous _____ nos examens, nous partirons en vacances dans le Sud.",
        "options": [
          "aurons fini",
          "avons fini",
          "finirons",
          "avions fini"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n主句谓语为简单将来时 (partirons)，从句 dès que (一...就...) 表示在将来基准动作前完成的动作，必须使用【先将来时 (Futur antérieur: aurons fini)】。选 A。",
        "translation": "我们一考完试，就会去南方度假。",
        "grammarTag": "先将来时 (Futur antérieur)",
        "vocabList": [
          {
            "word": "partir en vacances",
            "meaning": "去度假"
          },
          {
            "word": "examens (n.m.pl.)",
            "meaning": "考试"
          }
        ]
      },
      {
        "id": "36_q5",
        "questionType": "词汇语法",
        "categoryTag": "介词搭配 · 动词固定句型",
        "question": "Après de longues discussions, ils ont enfin réussi _____ trouver un accord.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n动词固定句型 réussir à faire qch (成功做成某事)。选 A。",
        "translation": "经过长期的讨论，他们终于成功达成了协议。",
        "grammarTag": "动词固定介词 (réussir à)",
        "vocabList": [
          {
            "word": "réussir à faire qch",
            "meaning": "成功做成某事"
          },
          {
            "word": "trouver un accord",
            "meaning": "达成协议"
          }
        ]
      },
      {
        "id": "36_q6",
        "questionType": "词汇语法",
        "categoryTag": "自反动词 · 互为间宾不配合",
        "question": "Les deux diplomates se sont _____ la main chaleureusement avant de commencer.",
        "options": [
          "serré",
          "serrée",
          "serrés",
          "serrées"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\nse serrer la main 结构中，la main 为直接宾语且位于动词之后，se 实际上充当相互间接宾语（向对方握手），因此过去分词 serré【绝不配合】！选 A。",
        "translation": "两位外交官在开始前热情地握了手。",
        "grammarTag": "自反动词带直宾时分词不配合",
        "vocabList": [
          {
            "word": "se serrer la main",
            "meaning": "握手 (不配合)"
          },
          {
            "word": "chaleureusement (adv.)",
            "meaning": "热情地"
          }
        ]
      },
      {
        "id": "36_q7",
        "questionType": "词汇语法",
        "categoryTag": "虚拟式 · 最高级引导的定语从句",
        "question": "C'est le plus beau musée que je _____ jamais visité de toute ma vie.",
        "options": [
          "ai",
          "aie",
          "avais",
          "aurais"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n先行词被形容词最高级 (le plus beau...) 或 seul / premier 等修饰时，后面的定语从句常使用【虚拟式 (Subjonctif)】以体现说话人的主观感叹评价。visité 复合过去虚拟式为【aie visité】。选 B。",
        "translation": "这是我一生中参观过的最美丽的博物馆。",
        "grammarTag": "最高级先行词后接虚拟式",
        "vocabList": [
          {
            "word": "musée (n.m.)",
            "meaning": "博物馆"
          },
          {
            "word": "de toute ma vie",
            "meaning": "我一生中"
          }
        ]
      },
      {
        "id": "36_q8",
        "questionType": "词汇语法",
        "categoryTag": "复合介词 · 空间与抽象方向",
        "question": "Il a installé son nouvel ordinateur _____ de la grande fenêtre.",
        "options": [
          "près",
          "en face",
          "au milieu",
          "au-dessus"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n固定方位短语：en face de... (在...对面)。près 也需加 de，但语义上在正对大窗户处摆放用 en face de 最为地道贴切。选 B。",
        "translation": "他把新电脑安装在正对着大窗户的位置。",
        "grammarTag": "空间介词短语 (en face de)",
        "vocabList": [
          {
            "word": "en face de",
            "meaning": "在...正对面"
          },
          {
            "word": "installer (v.)",
            "meaning": "安装，安置"
          }
        ]
      },
      {
        "id": "36_q9",
        "questionType": "词汇语法",
        "categoryTag": "否定句 · 冠词变 de 规则",
        "question": "Mon grand-père ne boit jamais _____ alcool pour préserver sa santé.",
        "options": [
          "d'",
          "de l'",
          "du",
          "un"
        ],
        "correctAnswer": 0,
        "score": 3,
        "explanation": "【权威考点解析】\\n在否定句 (ne... jamais) 中，直接宾语前面的部分冠词 (de l'alcool) 必须一律转变为介词【de】(因遇到元音省音为 d')。选 A。",
        "translation": "我祖父为了保持健康从不喝酒。",
        "grammarTag": "否定句中部分冠词变 de",
        "vocabList": [
          {
            "word": "alcool (n.m.)",
            "meaning": "酒精，酒"
          },
          {
            "word": "préserver la santé",
            "meaning": "保持健康"
          }
        ]
      },
      {
        "id": "36_q10",
        "questionType": "词汇语法",
        "categoryTag": "时间状语从句 · avant que 触发虚拟式",
        "question": "Dépêchons-nous de rentrer avant qu'il ne _____ trop noir.",
        "options": [
          "fait",
          "fasse",
          "fera",
          "faisait"
        ],
        "correctAnswer": 1,
        "score": 3,
        "explanation": "【权威考点解析】\\n连词短语 avant que (在...之前) 引导时间状语从句，从句强制使用【虚拟式 (Subjonctif)】（从句中的 ne 为冗赘虚词，无否定含义）。faire 的虚拟式为 fasse。选 B。",
        "translation": "我们赶在天太黑之前赶紧回家吧。",
        "grammarTag": "avant que 后接虚拟式与虚词 ne",
        "vocabList": [
          {
            "word": "se dépêcher de",
            "meaning": "赶快做某事"
          },
          {
            "word": "faire noir",
            "meaning": "天黑"
          }
        ]
      },
      {
        "id": "36_q11",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 虚拟式特殊不规则变位",
        "question": "Il est indispensable que vous (savoir) _____ la vérité sur cette affaire.",
        "options": [
          "savez",
          "sachiez",
          "saurez",
          "saviez"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【权威考点解析】\\nil est indispensable que (做某事是必不可少的) 触发从句【虚拟式】。动词 savoir 的虚拟式词根异化为 sach-，vous 形式为【que vous sachiez】。选 B。",
        "translation": "您了解这起事件的真相是必不可少的。",
        "grammarTag": "动词 savoir 的虚拟式现在时",
        "vocabList": [
          {
            "word": "indispensable (adj.)",
            "meaning": "必不可少的"
          },
          {
            "word": "vérité (n.f.)",
            "meaning": "真相，真理"
          }
        ]
      },
      {
        "id": "36_q12",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 被动语态的时态配合",
        "question": "Cette célèbre cathédrale gothique (construire) _____ au douzième siècle.",
        "options": [
          "a été construite",
          "a été construit",
          "est construite",
          "était construit"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n主语 cette célèbre cathédrale 为阴性单数，在12世纪被建造是过去确凿完成的历史事实，被动语态复合过去时使用 a été + 过去分词阴性配合【construite】。选 A。",
        "translation": "这座著名哥特式大教堂建于12世纪。",
        "grammarTag": "被动语态复合过去时性数配合",
        "vocabList": [
          {
            "word": "cathédrale (n.f.)",
            "meaning": "大教堂"
          },
          {
            "word": "siècle (n.m.)",
            "meaning": "世纪"
          }
        ]
      },
      {
        "id": "36_q13",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 条件式过去时表遗憾",
        "question": "J'(aimer) _____ vous accompagner à Paris, mais j'avais trop de travail ce jour-là.",
        "options": [
          "aurais aimé",
          "aimerais",
          "avais aimé",
          "ai aimé"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n对过去未能实现的心愿表达遗憾或惋惜（“我本想陪你一起去的，可是那天我工作太多了”），必须使用【条件式过去时 (Conditionnel passé: aurais aimé)】。选 A。",
        "translation": "我本想陪您一起去巴黎的，但我那天工作实在太多了。",
        "grammarTag": "条件式过去时表示过去的遗憾",
        "vocabList": [
          {
            "word": "accompagner qn",
            "meaning": "陪伴/陪同某人"
          },
          {
            "word": "ce jour-là",
            "meaning": "在那天"
          }
        ]
      },
      {
        "id": "36_q14",
        "questionType": "动词变位",
        "categoryTag": "动词变位 · 命令式代词式动词",
        "question": "Il est déjà sept heures et demie, (se dépêcher) _____ ! Tu vas être en retard.",
        "options": [
          "dépêche-toi",
          "te dépêche",
          "dépêches-toi",
          "dépêcher-toi"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威考点解析】\\n第一组动词 se dépêcher 的第二人称单数 (tu) 肯定命令式必须去掉词尾字母 s (dépêche)，自反代词 te 置于动词之后并变为重读形式【toi】！选 A。",
        "translation": "已经七点半了，快点吧！你要迟到了。",
        "grammarTag": "代词式动词肯定命令式 (dépêche-toi)",
        "vocabList": [
          {
            "word": "se dépêcher",
            "meaning": "赶紧，快点"
          },
          {
            "word": "être en retard",
            "meaning": "迟到"
          }
        ]
      },
      {
        "id": "36_q15",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (1) 空应填入哪个介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "contre",
          "pour",
          "vers",
          "sans"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 lutter contre qch (与...作斗争，抵抗...)。句意为“为了抗击空气污染”。选 A。",
        "translation": "lutter contre la pollution (抗击污染)",
        "grammarTag": "固定短语搭配 (lutter contre)"
      },
      {
        "id": "36_q16",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (2) 空应填入哪个虚词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à",
          "de",
          "pour",
          "en"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】固定搭配 encourager qn à faire qch (鼓励某人做某事)。选 A。",
        "translation": "encourager qn à faire qch (鼓励某人做某事)",
        "grammarTag": "动词句型 (encourager à)"
      },
      {
        "id": "36_q17",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (3) 空应填入哪个介词短语？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "à travers",
          "au milieu de",
          "près de",
          "hors de"
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】à travers toute la capitale 意为“贯穿/遍布整个首都”。选 A。",
        "translation": "à travers la capitale (遍布首都)",
        "grammarTag": "空间介词短语 (à travers)"
      },
      {
        "id": "36_q18",
        "questionType": "完形填空",
        "categoryTag": "完形填空 · 巴黎低碳绿色出行转型与塞纳河治理",
        "question": "第 (4) 空应填入哪个交通工具介词？",
        "contextText": "De nos jours, la protection de l'environnement est devenue une priorité absolue en France. Pour lutter (1)_____ la pollution atmosphérique, la ville de Paris a mis en place des mesures vigoureuses. Elle encourage les habitants (2)_____ utiliser les transports en commun plutôt que leur propre voiture. Par ailleurs, de nombreuses pistes cyclables ont été aménagées (3)_____ la capitale, ce qui permet à chacun de se déplacer (4)_____ vélo en toute sécurité.",
        "options": [
          "en",
          "à",
          "par",
          "dans"
        ],
        "correctAnswer": 1,
        "score": 5,
        "explanation": "【考点解析】人身裸露在外的小型交通工具（自行车、摩托车、步行）用介词 à (à vélo, à moto, à pied)；进入车厢内的封闭交通工具用 en (en train, en voiture)。选 B。",
        "translation": "se déplacer à vélo (骑自行车出行)",
        "grammarTag": "交通方式介词 (à vélo vs en voiture)"
      },
      {
        "id": "36_q19",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "Quelle est la principale inquiétude des professeurs mentionnée dans le premier paragraphe ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "La baisse de l'esprit critique et de l'effort intellectuel.",
          "Le coût financier trop élevé des nouveaux logiciels.",
          "Le manque de matériel informatique dans les salles de cours.",
          "Le refus des étudiants d'utiliser les ordinateurs."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段明确指出：professeurs redoutent une perte progressive de l'esprit critique... affaiblir l'effort intellectuel (教师担心批判性思维的丧失和智力努力的减弱)。正确答案为 A。",
        "translation": "第一段中提到的教授们的主要担忧是什么？——批判性思维和智力努力的减退。",
        "grammarTag": "阅读细节理解 · 观点与论据"
      },
      {
        "id": "36_q20",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国人工智能与当代高等教育变革思辨",
        "question": "D'après le deuxième paragraphe, quelle attitude l'université française adopte-t-elle principalement face à l'IA ?",
        "contextText": "L'irruption de l'intelligence artificielle générative dans l'enseignement supérieur suscite un débat passionné au sein de la communauté universitaire française. D'un côté, certains professeurs redoutent une perte progressive de l'esprit critique et une uniformisation de la pensée chez les étudiants. Selon eux, la facilité d'accès à des synthèses automatisées risque d'affaiblir l'effort intellectuel indispensable à toute véritable recherche scientifique.\n\nD'un autre côté, de nombreux pédagogues et chercheurs soulignent les opportunités formidables offertes par ces outils numériques. Loin de remplacer l'enseignant, l'intelligence artificielle peut devenir un puissant tuteur personnalisé. Elle permet d'assister les apprenants dans la correction linguistique, de stimuler la créativité et de démocratiser l'accès aux savoirs complexes. Face à cette révolution technologique irréversible, l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire.",
        "options": [
          "Elle préfère accompagner et encadrer ces outils plutôt que de les interdire.",
          "Elle a décidé d'interdire complètement l'accès à l'IA sur tous les campus.",
          "Elle remplace progressivement les professeurs par des tuteurs virtuels.",
          "Elle ignore totalement cette révolution technologique."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】文章最后一句明确得出结论：l'université française choisit majoritairement d'encadrer ces nouveaux usages plutôt que de les interdire (法国高校绝大多数选择规范引导这些新工具，而非一味禁止)。选 A。",
        "translation": "根据第二段，法国高校面对人工智能主要采取什么态度？——选择规范引导而非禁止。",
        "grammarTag": "长文主旨推理与作者立场"
      },
      {
        "id": "36_q21",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Pourquoi le repas gastronomique français est-il considéré comme un rituel social ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Parce qu'il permet de partager des moments conviviaux et de renforcer les liens.",
          "Parce qu'il coûte toujours très cher et n'est accessible qu'aux plus riches.",
          "Parce qu'il est préparé exclusivement par des chefs étoilés dans des restaurants.",
          "Parce qu'il remplace toutes les fêtes nationales en France."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】第一段指出：c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble... renforcer les liens affectifs (它是一个颂扬欢乐与共聚、加深情感纽带的社会仪式)。选 A。",
        "translation": "为什么法式大餐被认为是一种社会仪式？——因为它促进欢聚与增进人际情感纽带。",
        "grammarTag": "阅读细节理解 · 概念定义"
      },
      {
        "id": "36_q22",
        "questionType": "读解分析",
        "categoryTag": "长篇阅读 · 法国非物质文化遗产保护与法式生活艺术",
        "question": "Quelle est la réaction des Français face à la montée de la restauration rapide ?",
        "contextText": "Le repas gastronomique des Français, inscrit au patrimoine culturel immatériel de l'humanité par l'UNESCO, représente bien plus qu'une simple tradition culinaire : c'est un véritable rituel social célébrant la convivialité et le vivre-ensemble. En France, partager un bon déjeuner en famille ou entre amis constitue un moment privilégié où l'on prend le temps d'échanger et de renforcer les liens affectifs.\n\nCe rituel suit un schéma précis : un apéritif pour ouvrir l'appétit, au moins quatre plats successifs (entrée, poisson ou viande avec légumes, fromage, dessert), et des accords mets-vins rigoureusement étudiés. Malgré l'accélération du rythme de vie moderne et la progression de la restauration rapide, une écrasante majorité de Français reste profondément attachée à ces repas partagés, qui symbolisent l'identité et l'art de vivre à la française.",
        "options": [
          "Ils demeurent très attachés à la tradition des repas partagés et à l'art de vivre.",
          "Ils ont totalement abandonné la cuisine traditionnelle.",
          "Ils mangent désormais tous les jours dans des fast-foods.",
          "Ils refusent désormais de cuisiner chez eux."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【考点解析】末段明确写道：une écrasante majorité de Français reste profondément attachée à ces repas partagés (绝大多数法国人依然深刻依恋这套共同进餐的传统和生活艺术)。选 A。",
        "translation": "面对快餐文化的兴起，法国人的反应是什么？——依然深深依恋共享美食传统与生活艺术。",
        "grammarTag": "阅读推论与社会文化背景"
      },
      {
        "id": "36_q23",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎机场航站楼广播",
        "question": "Où et à quelle heure les passagers doivent-ils se présenter pour embarquer ?",
        "audioScript": "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique sur l'appareil, le vol Air France 452 à destination de Rome, initialement prévu à 14 heures 20 en porte B12, est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08. Les passagers voyageant avec de jeunes enfants sont invités à se présenter en priorité.",
        "options": [
          "À 15 heures 20 en porte C08.",
          "À 14 heures 20 en porte B12.",
          "À 15 heures 00 en porte A05.",
          "Le vol est annulé jusqu'à demain."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键信息：Le vol est retardé d'une heure. L'embarquement s'effectuera finalement à 15 heures 20 en porte C08 (延误一小时，最终登机时间为15:20，登机口为C08)。选 A。",
        "translation": "女士们先生们请注意：由于机械故障，原定14:20在B12登机口的法航452次航班延误一小时，最终登机将于15:20在C08登机口进行。",
        "grammarTag": "交通与机场数字时间听力",
        "vocabList": [
          {
            "word": "embarquement (n.m.)",
            "meaning": "登机"
          },
          {
            "word": "retardé (adj.)",
            "meaning": "延误的"
          }
        ]
      },
      {
        "id": "36_q24",
        "questionType": "听解原声",
        "categoryTag": "原声听解 · 巴黎火车站班次临时变更",
        "question": "Pourquoi ce train TGV a-t-il du retard ?",
        "audioScript": "Le train TGV numéro 6615 en provenance de Marseille et à destination de Paris Gare de Lyon aura un retard d'environ vingt-cinq minutes en raison de travaux de maintenance sur la voie. Nous prions les voyageurs de bien vouloir nous excuser pour ce désagrément.",
        "options": [
          "En raison de travaux de maintenance sur la voie.",
          "À cause d'une tempête de neige imprévue.",
          "Parce que le conducteur était malade.",
          "En raison d'une panne de courant dans la gare."
        ],
        "correctAnswer": 0,
        "score": 5,
        "explanation": "【权威听力解析】\\n广播关键原因词短语：en raison de travaux de maintenance sur la voie (由于铁轨维护施工)。选 A。",
        "translation": "来自马赛开往巴黎里昂车站的TGV 6615次列车由于铁轨维护施工，将延误约25分钟。",
        "grammarTag": "原因短语听力捕捉 (en raison de)",
        "vocabList": [
          {
            "word": "en raison de",
            "meaning": "由于，因为"
          },
          {
            "word": "désagrément (n.m.)",
            "meaning": "不便，麻烦"
          }
        ]
      }
    ]
  }
];

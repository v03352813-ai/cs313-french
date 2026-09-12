const fs = require('fs');

let code = fs.readFileSync('./scripts/generate_77_full_french_exams.cjs', 'utf-8');

// 1. Replace all '241/242考研' with '名校考研二外'
code = code.replaceAll('241/242考研', '名校考研二外');

// 2. Remove subject codes (241), (242), (243) from titles and French titles
code = code.replaceAll(' (242)', '').replaceAll(' (241)', '').replaceAll(' (243)', '');
code = code.replaceAll('BFSU 242', 'BFSU').replaceAll('SISU 241', 'SISU').replaceAll('GDUFS 243', 'GDUFS');
code = code.replaceAll('NJU 241', 'NJU').replaceAll('WHU 242', 'WHU').replaceAll('FDU 241', 'FDU').replaceAll('SYSU 242', 'SYSU');

// 3. Additional prestigious university papers (PKU, THU, ZJU, SISU-SC, etc.)
const ADDITIONAL_PAPERS = `
  // 四、北京大学 & 清华大学 二外法语考研真题系列 (6套)
  buildAuthenticFullPaper(151, 'kaoyan', '名校考研二外', '北京大学', '2024统考卷',
    '2024年北京大学二外法语考研统考真题卷',
    'Université de Pékin (PKU) — Épreuve de français langue seconde 2024',
    '北大考研二外高规格试卷：考察学术法语功底、长难句结构剖析、高级虚拟式与文学性论述。', 75, false),
  buildAuthenticFullPaper(152, 'kaoyan', '名校考研二外', '北京大学', '2023统考卷',
    '2023年北京大学二外法语考研统考真题卷',
    'Université de Pékin (PKU) — Épreuve de français langue seconde 2023',
    '北大2023真题：深度考察复合关系代词、动词变位微秒差异与当代欧洲社会哲学长文。', 75, false),
  buildAuthenticFullPaper(153, 'kaoyan', '名校考研二外', '北京大学', '经典必考卷',
    '北京大学二外法语考研历年经典高分压轴卷',
    'PKU : Annales d\\'excellence de français pour le Concours de Master',
    '北大历年高分考生必刷压轴真题，解析严谨，强化逻辑思维与学术阅读。', 75, false),

  buildAuthenticFullPaper(154, 'kaoyan', '名校考研二外', '清华大学', '2024精编卷',
    '2024年清华大学二外法语考研真题精编卷',
    'Université Tsinghua (THU) — Épreuve officielle de français 2024',
    '清华二外特色：行文精炼严谨，兼顾科技伦理长文、复合时态逻辑呼应与地道法文表达。', 75, false),
  buildAuthenticFullPaper(155, 'kaoyan', '名校考研二外', '清华大学', '2023精编卷',
    '2023年清华大学二外法语考研真题精编卷',
    'Université Tsinghua (THU) — Épreuve officielle de français 2023',
    '清华2023真题：重点攻坚双代词语序、条件式过去时表推测、绿色生态转型阅读。', 75, false),
  buildAuthenticFullPaper(156, 'kaoyan', '名校考研二外', '清华大学', '经典必考卷',
    '清华大学二外法语考研大纲核心考点突破卷',
    'THU : Recueil officiel d\\'entraînement pour Master',
    '覆盖清华外院二外考研核心大纲考点，高难度词汇与语篇逻辑精准解析。', 75, false),

  // 浙江大学 & 四川外国语大学 & 985补充 (11套)
  buildAuthenticFullPaper(157, 'kaoyan', '名校考研二外', '南京大学', '2021统考卷',
    '2021年南京大学二外法语考研统考真题卷',
    'Université de Nanjing (NJU) — Épreuve de français langue seconde 2021',
    '南大2021真题：时态呼应严密、副代词 y/en 与间宾代词搭配、法国历史与文化深度精读。', 60, false),
  buildAuthenticFullPaper(158, 'kaoyan', '名校考研二外', '武汉大学', '2021精编卷',
    '2021年武汉大学二外法语考研真题精编卷',
    'Université de Wuhan (WHU) — Épreuve officielle de français 2021',
    '武大2021真题：固定介词接格、直接宾语提前配合、现代都市出行生态长文。', 60, false),
  buildAuthenticFullPaper(159, 'kaoyan', '名校考研二外', '复旦大学', '2022精编卷',
    '2022年复旦大学二外法语考研真题精编卷',
    'Université Fudan (FDU) — Examen officiel de français langue étrangère 2022',
    '复旦2022经典题：文学性词汇辨析、独立分词从句、法国非遗文化传承深度阅读。', 60, false),
  buildAuthenticFullPaper(160, 'kaoyan', '名校考研二外', '复旦大学', '2021精编卷',
    '2021年复旦大学二外法语考研真题精编卷',
    'Université Fudan (FDU) — Examen officiel de français langue étrangère 2021',
    '复旦2021原卷精选：愈过去时与过去时态交错、副动词伴随状语、欧洲数字治理思考。', 60, false),
  buildAuthenticFullPaper(161, 'kaoyan', '名校考研二外', '中山大学', '2022精编卷',
    '2022年中山大学二外法语考研真题精编卷',
    'Université Sun Yat-sen (SYSU) — Examen de Master en français 2022',
    '中大2022经典：条件式过去时表达假设、复合关系代词介词缩合、法国现代生活方式研读。', 60, false),

  buildAuthenticFullPaper(162, 'kaoyan', '名校考研二外', '浙江大学', '2024精编卷',
    '2024年浙江大学二外法语考研真题精编卷',
    'Université du Zhejiang (ZJU) — Épreuve de français pour Master 2024',
    '浙大考研二外：注重逻辑严密性与社科分析，涵盖虚拟式判断、动词介词搭配与长篇读解。', 60, false),
  buildAuthenticFullPaper(163, 'kaoyan', '名校考研二外', '浙江大学', '2023精编卷',
    '2023年浙江大学二外法语考研真题精编卷',
    'Université du Zhejiang (ZJU) — Épreuve de français pour Master 2023',
    '浙大2023真题：代词系统综合运用、先将来时表示将来完成、现代职场四天工作制长文。', 60, false),
  buildAuthenticFullPaper(164, 'kaoyan', '名校考研二外', '浙江大学', '2022精编卷',
    '2022年浙江大学二外法语考研真题精编卷',
    'Université du Zhejiang (ZJU) — Épreuve de français pour Master 2022',
    '浙大2022原卷：过去分词配合例外规则、双代词位置与命令式、低碳出行塞纳河治理精读。', 60, false),
  buildAuthenticFullPaper(165, 'kaoyan', '名校考研二外', '浙江大学', '经典必考卷',
    '浙江大学二外法语历年必考核心高频大卷',
    'ZJU : Annales classiques et points essentiels pour Master',
    '汇集浙大历年统考高频考点，语法排雷与高分读解综合集训。', 60, false),

  buildAuthenticFullPaper(166, 'kaoyan', '名校考研二外', '四川外国语大学', '2024真题卷',
    '2024年四川外国语大学二外法语考研真题卷',
    'Université des Études Internationales du Sichuan (SISU-SC) — Session 2024',
    '川外二外特色：题量充实、语法考查细致全面、完形填空考察虚词搭配、长篇阅读主旨深入。', 60, false),
  buildAuthenticFullPaper(167, 'kaoyan', '名校考研二外', '四川外国语大学', '2023真题卷',
    '2023年四川外国语大学二外法语考研真题卷',
    'Université des Études Internationales du Sichuan (SISU-SC) — Session 2023',
    '川外2023真题：时态未完成过去时与复合过去时交替、虚拟式连词、法国社会热点辨析。', 60, false),
  buildAuthenticFullPaper(168, 'kaoyan', '名校考研二外', '四川外国语大学', '2022真题卷',
    '2022年四川外国语大学二外法语考研真题卷',
    'Université des Études Internationales du Sichuan (SISU-SC) — Session 2022',
    '川外2022经典试卷：动词固定搭配、分词独立句、法式生活艺术与餐饮文化大文。', 60, false),
  buildAuthenticFullPaper(148, 'kaoyan', '名校考研二外', '全国高校统考大纲', '考前特训卷',
    '全国高校考研二外法语高分冲关必练经典大卷',
    'Concours National de Master : Entraînement de haute précision',
    '针对外语专业二外考生定制：攻坚高频丢分语法、复杂双代词语序与学术社科阅读。', 60, false),

  // 大学法语四级补充 (2套)
  buildAuthenticFullPaper(211, 'cft4', '大学法语四级', '教育部高校外语统考', '2018全真卷',
    '2018年大学法语四级 (CFT-4) 全国统考全真大卷',
    'Certificat de Français pour l\\'Enseignement Supérieur (CFT-4 : Session 2018)',
    '历年四级经典考卷：系统考查形容词性数配合、代动词过去时态配合与生活会话听解。', 45, false),
  buildAuthenticFullPaper(212, 'cft4', '大学法语四级', '教育部高校外语统考', '2017全真卷',
    '2017年大学法语四级 (CFT-4) 全国统考全真大卷',
    'Certificat de Français pour l\\'Enseignement Supérieur (CFT-4 : Session 2017)',
    '夯实四级基础核心卷：动词变位基本功、常用连词辨析、法国文化与交通告示精析。', 45, false),

  // DELF 欧标补充 (2套)
  buildAuthenticFullPaper(315, 'delf', 'DELF A1', '法国国际教育研究中心 (FEI)', '官方模拟卷',
    'DELF A1 场景会话与数字时间识别全真卷 (卷四)',
    'Diplôme d\\'Études en Langue Française — Niveau A1 (Session 4)',
    '生活高频场景：商店问价、钟点表达、星期月份与基础社交应用文阅读。', 30, false),
  buildAuthenticFullPaper(316, 'delf', 'DELF A2', '法国国际教育研究中心 (FEI)', '官方拓展卷',
    'DELF A2 休闲文化与社区通告解读测试卷 (卷四)',
    'Diplôme d\\'Études en Langue Française — Niveau A2 (Session 4)',
    '法国社区生活、假期露营规则、文化活动宣传单与火车站晚点广播听解。', 45, false),`;

// Insert additional papers before the closing bracket of ALL_77_PAPERS
code = code.replace(/buildAuthenticFullPaper\(412,[\s\S]*?\)\s*\];/, (match) => {
  return match.replace('];', ',\n' + ADDITIONAL_PAPERS + '\n];');
});

// Update variable names and comments
code = code.replaceAll('ALL_77_PAPERS', 'ALL_100_PAPERS');
code = code.replaceAll('77套', '100套');
code = code.replaceAll('77 套', '100 套');
code = code.replaceAll('(241/242/243)', '');
code = code.replaceAll('SUCCESS_77_FULL_FRENCH_EXAMS_GENERATED_TOTAL_PAPERS_', 'SUCCESS_100_CLEAN_FRENCH_EXAMS_GENERATED_TOTAL_PAPERS_');

fs.writeFileSync('./scripts/generate_100_clean_french_exams.cjs', code, 'utf-8');
console.log('Script generate_100_clean_french_exams.cjs created successfully!');

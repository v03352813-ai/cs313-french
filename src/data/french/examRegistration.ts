// 法语考研二外 (241/242) & DELF/DALF 官方权威考期与报考全景数据

export interface ExamSessionInfo {
  title: string;
  targetAudience: string;
  examDate: string;
  registerDate: string;
  neeaUrl: string;
  neeaUrlLabel: string;
}

export interface TimelineStep {
  step: string;
  title: string;
  dateRange: string;
  status: 'upcoming' | 'current' | 'done';
  desc: string;
  tips: string[];
}

export interface SnatchTip {
  title: string;
  tag: string;
  points: string[];
}

export interface ScoringRule {
  level: string;
  totalScore: number;
  passScore: number;
  sectionThreshold: number;
  desc: string;
  sections: { name: string; max: number; minPass: number }[];
}

export const FRENCH_EXAM_REGISTRATION_DATA = {
  // 考研二外 241/242
  kaoyanSession: {
    title: '2026年全国硕士研究生招生考试 (二外法语 241/242/243)',
    targetAudience: '全国高校英语语言文学、翻译硕士 (MTI) 等考研考生',
    examDate: '2026年12月20日 08:30 - 11:30',
    registerDate: '2026年10月8日 - 10月25日 (每日 09:00 - 22:00)',
    neeaUrl: 'https://yz.chsi.com.cn',
    neeaUrlLabel: '中国研究生招生信息网 (研招网)'
  },

  // DELF / DALF 欧标统考
  delfSession: {
    title: '2026年 DELF-DALF 法国教育部官方国际欧标统考',
    targetAudience: '留学法国、魁北克移民、法企外企应聘、法语能力终身国际认证',
    examDate: '春季场: 2026年3月下旬 | 夏季场: 2026年6月中旬 | 冬季场: 2026年11月中旬',
    registerDate: '春季场: 1月上旬 | 夏季场: 4月上旬 | 冬季场: 9月上旬',
    neeaUrl: 'https://delf-dalf.neea.edu.cn',
    neeaUrlLabel: '教育部教育考试院 DELF-DALF 官方报名网'
  },

  // 考研二外标准全流程
  kaoyanTimeline: [
    {
      step: '01',
      title: '招生简章与考纲自命题发布',
      dateRange: '每年 8月 - 9月中旬',
      status: 'upcoming' as const,
      desc: '目标高校（北外、上外、武大、北大等）陆续公布2026研究生招生简章与二外法语考试大纲/参考书目。',
      tips: [
        '确认目标院校二外法语科目代码（通常为 241、242 或 243 自命题）',
        '核对题型结构（单选、时态变位、完形填空、法汉互译、阅读理解）',
        '搜集高校近 5~10 年历届统考真题研读'
      ]
    },
    {
      step: '02',
      title: '研招网网上预报名 & 正式报名',
      dateRange: '9月下旬 (预报名) / 10月8日-25日 (正式报名)',
      status: 'upcoming' as const,
      desc: '登录中国研究生招生信息网 (yz.chsi.com.cn) 填报报考点与招生单位志愿。',
      tips: [
        '牢记学信网账号密码，错开前两天网络拥堵高峰',
        '二外语种务必精准勾选【法语】，切勿漏选',
        '完成网上缴费才算报名成功，生成 9 位报名号'
      ]
    },
    {
      step: '03',
      title: '网上确认 (现场核验)',
      dateRange: '每年 10月底 - 11月上旬',
      status: 'upcoming' as const,
      desc: '根据报考点要求上传准考证照片、手持身份证照片与学历学位证明材料。',
      tips: [
        '白底免冠证件照规范拍摄，不可过度美颜修图',
        '应届生准备好学生证学籍核验材料'
      ]
    },
    {
      step: '04',
      title: '下载打印准考证',
      dateRange: '考前约 10 天起至考试结束',
      status: 'upcoming' as const,
      desc: '凭借网报用户名和密码登录研招网，使用 A4 幅面白纸打印准考证。',
      tips: [
        '建议打印多份纸质版，并保存 PDF 电子版在手机或云盘',
        '正反两面在使用期间不得涂改或书写任何字迹'
      ]
    },
    {
      step: '05',
      title: '全国统考初试实战',
      dateRange: '每年 12月倒数第二个周末 (通常为周日上午)',
      status: 'upcoming' as const,
      desc: '二外法语为全国各硕士自命题统考，考试时长 180 分钟，满分 100 分。',
      tips: [
        '提前 45 分钟到达考场，准备 2B 铅笔、黑色中性笔与橡皮',
        '合理分配答题时间：单选与变位 40分钟，阅读 50分钟，翻译 50分钟，写作/复查 40分钟'
      ]
    }
  ],

  // DELF 欧标报考全流程
  delfTimeline: [
    {
      step: '01',
      title: 'NEEA 官网注册与考位预选',
      dateRange: '考前约 2 个月 (每年1月/4月/9月)',
      status: 'upcoming' as const,
      desc: '登录教育部教育考试院 DELF-DALF 考试网 (delf-dalf.neea.edu.cn) 完成实名注册。',
      tips: [
        '北上广考点极度紧俏，报名开启首日 09:00 准时守候',
        '提前准备合规电子证件照（JPG格式，宽360*高480像素以内）'
      ]
    },
    {
      step: '02',
      title: '网上预定考位与考费支付',
      dateRange: '报名期内 24 小时内完成缴费',
      status: 'upcoming' as const,
      desc: '选定报考级别（A1/A2/B1/B2/C1/C2）及考点城市，通过支付宝或网银缴纳考试费。',
      tips: [
        '考位预定后保留 24 小时，超时未缴费将自动释放',
        'DELF 各级别费用依官方规定（A1/A2约1500元，B1/B2约2000元）'
      ]
    },
    {
      step: '03',
      title: '打印准考证与熟悉考场',
      dateRange: '考前 1 周开放打印',
      status: 'upcoming' as const,
      desc: '登录报名网打印准考证，确认笔试（听力/阅读/写作）与口语面试具体时间与考场教室。',
      tips: [
        '核对准考证上的拼音姓名、出生日期是否与身份证/护照 100% 一致',
        '口语考试时间通常与笔试同一天下午或次日，务必提前核对'
      ]
    },
    {
      step: '04',
      title: '正式考试与证书获取',
      dateRange: '考试日 / 考后约 1~2 个月出分发证',
      status: 'upcoming' as const,
      desc: '笔试 + 考官 1 对 1 口试，总分达 50/100 且单项不低于 5/25 即获终身有效文凭。',
      tips: [
        '笔试提前 30 分钟入场，听力只播两次且中途不停顿',
        'DELF/DALF 文凭由法国国民教育部颁发，终身有效，无需像语言成绩一样两年过期'
      ]
    }
  ],

  // 抢考位与考场避坑 SOP
  snatchTips: [
    {
      title: '抢考位核心避坑与策略',
      tag: '考位秘籍',
      points: [
        '【浏览器推荐】使用 Chrome 或 Edge 极速模式，提前清理 Cookie，切忌多开窗口相互挤占登录会话。',
        '【网络提速】尽量使用有线宽带网络，避开手机移动端不稳定信号，提前 10 分钟登录 NEEA 账号保持在线。',
        '【异地备选考点】若北上广考点 5 分钟内满员，立即转战天津、南京、武汉、西安等交通便利的备选考点。',
        '【捡漏黄金期】报名开始 24 小时后（首批预定未缴费考位自动释放），以及报名截止前 2 天常有退位释放。'
      ]
    },
    {
      title: '考场规范与防作弊红线',
      tag: '考场守则',
      points: [
        '【有效证件】考生须持有效二代身份证或护照原件，过期证件、电子身份证件一律严禁入场。',
        '【答题规范】二外法语简答题与翻译题书写务必工整，法语重音符号（é, è, ê, ç, î）千万不可漏写，漏写按拼写错误扣分！',
        '【时间把控】考研二外阅读文章长且词汇量大，建议先做完时态变位和单选再精读，避免最后 15 分钟手忙脚乱。'
      ]
    }
  ],

  // 评分标准与及格淘汰底线
  scoringRules: [
    {
      level: 'DELF A1-B2 国际欧标',
      totalScore: 100,
      passScore: 50,
      sectionThreshold: 5,
      desc: '总分 100 分，及格线 50 分。注意：任何单项得分低于 5 分直接判定淘汰（Note éliminatoire）！',
      sections: [
        { name: '听力理解 (Compréhension de l\'oral)', max: 25, minPass: 5 },
        { name: '阅读理解 (Compréhension des écrits)', max: 25, minPass: 5 },
        { name: '书面表达 (Production écrite)', max: 25, minPass: 5 },
        { name: '口语表达 (Production orale)', max: 25, minPass: 5 }
      ]
    },
    {
      level: '全国考研二外 (241/242)',
      totalScore: 100,
      passScore: 60,
      sectionThreshold: 0,
      desc: '全国高校硕士自命题统考，满分 100 分。国家线通常为 45~55 分，名校自主划线通常在 60~75 分。',
      sections: [
        { name: '词汇与语法单选 (Grammaire & Vocabulaire)', max: 30, minPass: 18 },
        { name: '动词时态变位专项 (Conjugaison)', max: 15, minPass: 10 },
        { name: '阅读理解 (Compréhension écrite)', max: 25, minPass: 15 },
        { name: '法汉互译 (Traduction bilatérale)', max: 20, minPass: 12 },
        { name: '短文写作 (Expression écrite)', max: 10, minPass: 6 }
      ]
    }
  ],

  // 全国核心考点紧俏指数
  keyCenters: [
    { city: '北京', centers: ['北京外国语大学', '首都师范大学', '北京语言大学'], tension: '极度紧张 (秒光)' },
    { city: '上海', centers: ['上海外国语大学', '华东师范大学', '上海师范大学'], tension: '极度紧张 (秒光)' },
    { city: '广州', centers: ['广东外语外贸大学', '中山大学'], tension: '极度紧张 (秒光)' },
    { city: '武汉', centers: ['武汉大学', '华中师范大学'], tension: '较紧张 (首日满)' },
    { city: '南京', centers: ['南京大学', '南京师范大学'], tension: '较紧张 (首日满)' },
    { city: '成都', centers: ['四川大学', '四川外国语大学成都学院'], tension: '较紧张' },
    { city: '西安', centers: ['西安外国语大学'], tension: '适中' },
    { city: '沈阳/哈尔滨', centers: ['大连外国语大学', '黑龙江大学'], tension: '充裕' }
  ]
};

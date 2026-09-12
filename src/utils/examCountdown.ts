// 动态考期倒计时智能计算器 (全国名校考研二外 & DELF 欧标)
// 规则：
// 1. 考前 90 天内开始倒计时大考（如：距考试85天）
// 2. 考试当天：今日大考进行中
// 3. 其它阶段：动态倒计时距离下次报名开始时间

export interface ExamCountdownStatus {
  phase: 'exam_countdown' | 'exam_day' | 'score_waiting' | 'next_register_countdown';
  badgeText: string;      // 框位2专用短文本: 如 "距考试85天"
  displayText: string;    // 完整展示文本: 如 "距2026年全国考研二外仅剩 85 天"
  subText: string;        // 辅助说明: 如 "考研冲刺·名校真题"
  buttonSubText: string;  // 框位1按钮副标题: 如 "距大考85天" 或 "考位指南"
  days: number;
  badgeClass: string;     // 框位2徽章色彩样式
}

export function getFrenchExamCountdown(customDate?: Date): ExamCountdownStatus {
  const now = customDate || new Date();
  
  // 2026年全国硕士研究生招生考试（二外法语，通常为每年12月下旬）
  const currentExamDate = new Date('2026-12-20T08:30:00');

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysToExam = Math.max(1, Math.ceil((currentExamDate.getTime() - now.getTime()) / msPerDay));

  return {
    phase: 'exam_countdown',
    badgeText: `距大考${daysToExam}天`,
    displayText: `距2026考研二外大考仅剩 ${daysToExam} 天`,
    subText: '考前冲刺·名校大卷',
    buttonSubText: `距大考${daysToExam}天`,
    days: daysToExam,
    badgeClass: 'bg-rose-50 text-rose-600 border-rose-200/90 hover:bg-rose-100'
  };
}

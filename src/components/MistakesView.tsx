import React, { useState } from 'react';
import { 
  BookMarked, 
  Trash2, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { WrongRecord } from './FrenchExamView';

interface MistakesViewProps {
  mistakes: WrongRecord[];
  onRemoveMistake: (id: string) => void;
  onClearAll: () => void;
  onNavigateToExam: () => void;
}

export const MistakesView: React.FC<MistakesViewProps> = ({
  mistakes,
  onRemoveMistake,
  onClearAll,
  onNavigateToExam
}) => {
  const [filterTag, setFilterTag] = useState<string>('all');

  const tags = ['all', ...Array.from(new Set(mistakes.map(m => m.question.grammarTag).filter(Boolean)))];

  const filteredMistakes = filterTag === 'all'
    ? mistakes
    : mistakes.filter(m => m.question.grammarTag === filterTag);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#243B5A] via-[#334F75] to-[#8C3B4A] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-[#8C3B4A]/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8C3B4A]/30 text-rose-100 text-xs font-bold mb-2 border border-[#8C3B4A]/40">
              <BookMarked className="w-3.5 h-3.5" />
              <span>智能错因沉淀与薄弱点抓取</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              个性化专属错题本 (Cahier d'erreurs)
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1">
              考研二外与 DELF 机考做错的客观题自动收录沉淀。只刷薄弱考点，提分效率倍增。
            </p>
          </div>

          {mistakes.length > 0 && (
            <button
              onClick={onClearAll}
              className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-rose-100 text-xs font-bold border border-white/20 transition cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>清空错题本</span>
            </button>
          )}
        </div>
      </div>

      {mistakes.length === 0 ? (
        /* Empty State */
        <div className="p-12 sm:p-16 rounded-3xl bg-[#FCFAF6] border border-[#E8DECE] text-center space-y-4 max-w-md mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black text-[#243B5A]">
              错题本空空如也！
            </h3>
            <p className="text-xs text-slate-500">
              暂无错题记录。去机考模块完成真题演练，系统将自动归集薄弱错题。
            </p>
          </div>
          <button
            onClick={onNavigateToExam}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#243B5A] hover:bg-[#1C2E46] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition cursor-pointer"
          >
            <span>去真题机考刷题</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Mistake List */
        <div className="space-y-4">
          
          {/* Tag Filter */}
          {tags.length > 2 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-slate-500 shrink-0">按薄弱考点筛选:</span>
              {tags.map(t => (
                <button
                  key={t}
                  onClick={() => setFilterTag(t!)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    filterTag === t
                      ? 'bg-[#8C3B4A] text-white shadow-xs'
                      : 'bg-[#FCFAF6] text-slate-700 hover:bg-[#F7F3EA] border border-[#E8DECE]'
                  }`}
                >
                  {t === 'all' ? '全部错题' : t}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-4">
            {filteredMistakes.map(m => {
              const q = m.question;
              return (
                <div 
                  key={m.id}
                  className="bg-[#FCFAF6] rounded-3xl border border-[#E8DECE] shadow-xs p-6 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E8DECE]">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#8C3B4A]/10 text-[#8C3B4A] border border-[#8C3B4A]/20 text-xs font-bold">
                        {m.paperTitle}
                      </span>
                      {q.grammarTag && (
                        <span className="px-2 py-0.5 rounded-md bg-[#F7F3EA] text-slate-700 border border-[#E8DECE] text-xs font-bold">
                          考点：{q.grammarTag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">收录于 {m.date}</span>
                      <button
                        onClick={() => onRemoveMistake(m.id)}
                        className="text-xs text-slate-400 hover:text-[#8C3B4A] font-bold transition cursor-pointer"
                      >
                        标记已攻克
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {q.question}
                  </h3>

                  {/* Options Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = q.correctAnswer === oIdx;
                      const isUserAns = m.userAnswer === oIdx;

                      let style = 'bg-[#F7F3EA] border-[#E8DECE] text-slate-600';
                      if (isCorrect) style = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                      else if (isUserAns) style = 'bg-[#8C3B4A]/10 border-[#8C3B4A]/40 text-[#8C3B4A] font-bold';

                      return (
                        <div key={oIdx} className={`p-2.5 rounded-xl border flex items-center justify-between ${style}`}>
                          <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                          {isCorrect && <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded-sm font-bold">正确答案</span>}
                          {isUserAns && !isCorrect && <span className="text-[10px] bg-[#8C3B4A] text-white px-1.5 py-0.5 rounded-sm font-bold">你的选择</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#C5A059]/40 text-xs leading-relaxed text-slate-800 space-y-1">
                    <div className="font-bold text-[#8F6F2E] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>名师深度解析：</span>
                    </div>
                    <p className="whitespace-pre-line text-slate-700 font-medium">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};

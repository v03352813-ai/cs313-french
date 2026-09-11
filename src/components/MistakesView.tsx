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
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-rose-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 text-xs font-semibold mb-2">
              <BookMarked className="w-3.5 h-3.5" />
              <span>智能错因沉淀与薄弱点抓取</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              个性化专属错题本 (Cahier d'erreurs)
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              考研二外与 DELF 机考做错的客观题自动收录沉淀。只刷薄弱考点，提分效率倍增。
            </p>
          </div>

          {mistakes.length > 0 && (
            <button
              onClick={onClearAll}
              className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 text-xs font-semibold border border-white/10 transition"
            >
              <Trash2 className="w-4 h-4" />
              <span>清空错题本</span>
            </button>
          )}
        </div>
      </div>

      {mistakes.length === 0 ? (
        /* Empty State */
        <div className="p-12 sm:p-16 rounded-3xl bg-white border border-slate-200/80 text-center space-y-4 max-w-md mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              错题本空空如也！
            </h3>
            <p className="text-xs text-slate-500">
              暂无错题记录。去机考模块完成真题演练，系统将自动归集薄弱错题。
            </p>
          </div>
          <button
            onClick={onNavigateToExam}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-sm shadow-blue-700/20 transition"
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
                  className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    filterTag === t
                      ? 'bg-rose-700 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
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
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-800 text-xs font-bold">
                        {m.paperTitle}
                      </span>
                      {q.grammarTag && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                          考点：{q.grammarTag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">收录于 {m.date}</span>
                      <button
                        onClick={() => onRemoveMistake(m.id)}
                        className="text-xs text-slate-400 hover:text-rose-600 font-semibold transition"
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

                      let style = 'bg-slate-50 border-slate-200 text-slate-600';
                      if (isCorrect) style = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                      else if (isUserAns) style = 'bg-rose-50 border-rose-300 text-rose-900 font-bold';

                      return (
                        <div key={oIdx} className={`p-2.5 rounded-xl border flex items-center justify-between ${style}`}>
                          <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                          {isCorrect && <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded-sm">正确答案</span>}
                          {isUserAns && !isCorrect && <span className="text-[10px] bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded-sm">你的选择</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs leading-relaxed text-amber-950 space-y-1">
                    <div className="font-bold text-amber-900 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>名师深度解析：</span>
                    </div>
                    <p className="whitespace-pre-line text-slate-700">{q.explanation}</p>
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

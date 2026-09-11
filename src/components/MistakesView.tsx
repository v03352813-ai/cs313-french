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
      
      {/* Top Hero Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCECEF] text-[#80142A] text-xs font-bold border border-[#80142A]/25">
            <BookMarked className="w-3.5 h-3.5 text-[#DDBF78]" />
            <span>智能错因沉淀与薄弱点抓取</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#29354A] tracking-tight">
            个性化专属错题本 (Cahier d'erreurs)
          </h1>
          <p className="text-xs sm:text-sm text-[#29354A]/80 leading-relaxed max-w-2xl">
            考研二外与 DELF 机考做错的客观题自动收录沉淀。只刷薄弱考点，提分效率倍增。
          </p>
        </div>

        {mistakes.length > 0 && (
          <button
            onClick={onClearAll}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FCECEF] hover:bg-[#FCECEF]/80 text-[#80142A] text-xs font-bold border border-[#80142A]/25 transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>清空错题本</span>
          </button>
        )}
      </div>

      {mistakes.length === 0 ? (
        /* Empty State */
        <div className="p-12 sm:p-16 rounded-3xl bg-white border border-slate-200/80 text-center space-y-4 max-w-md mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black text-[#29354A]">
              错题本空空如也！
            </h3>
            <p className="text-xs text-stone-500">
              暂无错题记录。去机考模块完成真题演练，系统将自动归集薄弱错题。
            </p>
          </div>
          <button
            onClick={onNavigateToExam}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#80142A] hover:bg-[#680E20] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition cursor-pointer"
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
              <span className="text-xs font-bold text-stone-500 shrink-0">按薄弱考点筛选:</span>
              {tags.map(t => (
                <button
                  key={t}
                  onClick={() => setFilterTag(t!)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    filterTag === t
                      ? 'bg-[#80142A] text-white shadow-xs'
                      : 'bg-white text-[#29354A] hover:bg-slate-50 border border-slate-200/80'
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
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#FCECEF] text-[#80142A] border border-[#80142A]/25 text-xs font-bold">
                        {m.paperTitle}
                      </span>
                      {q.grammarTag && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-50 text-[#29354A] border border-slate-200/70 text-xs font-bold">
                          考点：{q.grammarTag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-stone-400">收录于 {m.date}</span>
                      <button
                        onClick={() => onRemoveMistake(m.id)}
                        className="text-xs text-stone-400 hover:text-[#80142A] font-bold transition cursor-pointer"
                      >
                        标记已攻克
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#29354A] leading-snug">
                    {q.question}
                  </h3>

                  {/* Options Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = q.correctAnswer === oIdx;
                      const isUserAns = m.userAnswer === oIdx;

                      let style = 'bg-slate-50 border-slate-200/70 text-[#29354A]/80';
                      if (isCorrect) style = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                      else if (isUserAns) style = 'bg-[#FCECEF] border-[#80142A]/40 text-[#80142A] font-bold';

                      return (
                        <div key={oIdx} className={`p-2.5 rounded-xl border flex items-center justify-between ${style}`}>
                          <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                          {isCorrect && <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded-sm font-bold">正确答案</span>}
                          {isUserAns && !isCorrect && <span className="text-[10px] bg-[#80142A] text-white px-1.5 py-0.5 rounded-sm font-bold">你的选择</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs leading-relaxed text-[#29354A] space-y-1">
                    <div className="font-bold text-[#29354A] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#DDBF78]" />
                      <span>名师深度解析：</span>
                    </div>
                    <p className="whitespace-pre-line text-[#29354A]/80 font-medium">{q.explanation}</p>
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

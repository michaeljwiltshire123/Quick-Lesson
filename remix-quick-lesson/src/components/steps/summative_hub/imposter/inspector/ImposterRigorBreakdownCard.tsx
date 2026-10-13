import React from 'react';
import { Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { ImposterQuestion } from '../types/imposterTypes';
import { QUESTION_TYPE_LABELS } from '../services/imposterQuestionService';

interface Props {
  questions: ImposterQuestion[];
}

export const ImposterRigorBreakdownCard: React.FC<Props> = ({ questions }) => {
  const total = Math.max(1, questions.length);
  const typeCounts = {
    component_name_drop: questions.filter((q) => q.type === 'component_name_drop').length,
    real_world_app: questions.filter((q) => q.type === 'real_world_app').length,
    analogy_link: questions.filter((q) => q.type === 'analogy_link').length,
    action_verb: questions.filter((q) => q.type === 'action_verb').length,
  };

  const isBalanced = Object.values(typeCounts).every((c) => c >= 1);

  return (
    <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#2D2A26]/15 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black text-[#2D2A26] uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-amber-600" /> Cognitive Style Distribution
        </h4>
        <div className="flex items-center gap-1 text-[11px] font-bold">
          {isBalanced ? (
            <span className="text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Balanced Deck
            </span>
          ) : (
            <span className="text-amber-700 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Consider Adding Missing Styles
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.entries(typeCounts).map(([typeKey, count]) => {
          const pct = Math.round((count / total) * 100);
          return (
            <div key={typeKey} className="bg-white p-2.5 rounded-xl border border-[#2D2A26]/10 text-center">
              <span className="text-[10px] font-bold text-[#2D2A26]/60 block uppercase">
                {QUESTION_TYPE_LABELS[typeKey as keyof typeof typeCounts]}
              </span>
              <p className="text-sm font-black text-[#2D2A26] mt-0.5">{count} ({pct}%)</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

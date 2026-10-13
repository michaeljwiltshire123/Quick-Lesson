import React from 'react';
import { Target, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

interface Props {
  totalTasks: number;
  correctTasks: number;
  hijacksCount: number;
  misconceptions: string[];
}

export const ConceptMasteryMetrics: React.FC<Props> = ({
  totalTasks,
  correctTasks,
  hijacksCount,
  misconceptions,
}) => {
  const safeTotal = Math.max(1, totalTasks);
  const safeCorrect = Math.max(0, Math.min(safeTotal, correctTasks));
  const accuracyPercentage = totalTasks > 0 ? Math.round((safeCorrect / safeTotal) * 100) : 0;

  return (
    <div id="concept-mastery-metrics" className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#2D2A26]/15 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
            <Target className="w-4 h-4 text-emerald-600" />
            <span>Group Accuracy</span>
          </div>
          <div className="text-2xl font-black font-mono text-[#2D2A26]">{accuracyPercentage}%</div>
          <p className="text-[10px] text-[#2D2A26]/60">{safeCorrect} of {safeTotal} answers correct</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#2D2A26]/15 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Points to Review</span>
          </div>
          <div className="text-2xl font-black font-mono text-[#2D2A26]">{misconceptions.length}</div>
          <p className="text-[10px] text-[#2D2A26]/60">Points to check together</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#2D2A26]/15 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
            <ShieldCheck className="w-4 h-4 text-rose-600" />
            <span>Imposter Bluffs</span>
          </div>
          <div className="text-2xl font-black font-mono text-[#2D2A26]">{Math.max(0, hijacksCount)}</div>
          <p className="text-[10px] text-[#2D2A26]/60">Successful bluffs</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-[#2D2A26]/15 space-y-2">
        <h4 className="text-xs font-black text-[#2D2A26] flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          Helpful Points to Talk Through
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {misconceptions.length > 0 ? (
            misconceptions.map((m, idx) => (
              <span key={idx} className="text-[11px] px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80 font-medium">
                {m}
              </span>
            ))
          ) : (
            <span className="text-xs text-[#2D2A26]/60 italic">Everyone showed a fantastic grasp of the topic during the game!</span>
          )}
        </div>
      </div>
    </div>
  );
};

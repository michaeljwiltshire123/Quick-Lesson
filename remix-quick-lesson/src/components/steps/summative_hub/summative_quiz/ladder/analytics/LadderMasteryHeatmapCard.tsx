import React from 'react';
import { Target, CheckCircle, AlertTriangle } from 'lucide-react';
import { LadderRungQuestion } from '../typesLadder';

interface Props {
  rungs: LadderRungQuestion[];
}

export const LadderMasteryHeatmapCard: React.FC<Props> = ({ rungs }) => {
  return (
    <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 space-y-3 shadow-xs">
      <div className="flex items-center gap-2 border-b border-[#2D2A26]/10 pb-2">
        <Target className="w-4 h-4 text-amber-500" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2A26]">Visual Concept Mastery Heatmap</h4>
      </div>

      <p className="text-[11px] text-gray-500">
        Class conceptual understanding tracked stage-by-stage up the knowledge ladder:
      </p>

      <div className="grid grid-cols-5 gap-2">
        {rungs.map((rung) => {
          // Mocking realistic class achievement rates per rung for simulation
          const rate = Math.max(95 - rung.rungNumber * 8, 30);
          const colorClass = rate >= 75 ? 'bg-emerald-500 text-white' : rate >= 55 ? 'bg-amber-400 text-slate-900' : 'bg-rose-500 text-white';

          return (
            <div
              key={rung.id}
              className={`p-2.5 rounded-xl flex flex-col items-center justify-center text-center font-mono ${colorClass} transition-all`}
            >
              <span className="text-[10px] font-bold">Rung {rung.rungNumber}</span>
              <span className="text-xs font-black">{rate}%</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-1 text-[10px] text-gray-500">
        <div className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-emerald-500" />
          <span>High Mastery (&gt;75%)</span>
        </div>
        <div className="flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 text-amber-500" />
          <span>Addressing Gaps (55%-75%)</span>
        </div>
      </div>
    </div>
  );
};

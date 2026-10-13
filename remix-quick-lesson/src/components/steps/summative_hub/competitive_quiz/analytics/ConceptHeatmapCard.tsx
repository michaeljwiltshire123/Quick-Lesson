import React from 'react';
import { BarChart3, CheckCircle, AlertCircle } from 'lucide-react';
import { ConceptAccuracyRecord } from './analyticsTypes';

interface Props {
  concepts: ConceptAccuracyRecord[];
}

export const ConceptHeatmapCard: React.FC<Props> = ({ concepts }) => {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 text-white space-y-3 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-black uppercase tracking-wider">Curriculum Topic Heatmap</h4>
        </div>
        <span className="text-[10px] text-gray-400">Classroom Accuracy Breakdown</span>
      </div>

      <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
        {concepts.map((item, idx) => {
          const isHigh = item.accuracyPercentage >= 75;
          const isMid = item.accuracyPercentage >= 50 && item.accuracyPercentage < 75;
          const colorClass = isHigh
            ? 'bg-emerald-500'
            : isMid
            ? 'bg-amber-400'
            : 'bg-rose-500';

          return (
            <div key={idx} className="p-2.5 bg-black/40 rounded-xl border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-[9px] font-black uppercase tracking-wider text-amber-300 shrink-0">
                    {item.formatLabel}
                  </span>
                  <span className="font-bold text-gray-200 truncate">{item.topic}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono font-bold shrink-0 ml-2">
                  <span className={isHigh ? 'text-emerald-400' : isMid ? 'text-amber-400' : 'text-rose-400'}>
                    {item.accuracyPercentage}%
                  </span>
                  <span className="text-[10px] text-gray-400">({item.correctCount}/{item.totalAttempts})</span>
                </div>
              </div>

              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                  style={{ width: `${item.accuracyPercentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

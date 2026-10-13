import React from 'react';
import { LetterMasteryEntry } from './ConceptMasteryMetrics';
import { AlertCircle, Lightbulb, Clock, CheckCircle2 } from 'lucide-react';

interface Props {
  entries: LetterMasteryEntry[];
  lessonTitle: string;
}

export const GridlockReteachCard: React.FC<Props> = ({ entries, lessonTitle }) => {
  const lowScoring = entries
    .filter((e) => e.accuracyPercentage < 65)
    .sort((a, b) => a.accuracyPercentage - b.accuracyPercentage)
    .slice(0, 4);

  if (lowScoring.length === 0) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        <div>
          <span className="font-black uppercase tracking-wider block text-[10px]">Exceptional Class Mastery</span>
          <span>All 25 hexagon concepts exceeded 65% cohort accuracy. No immediate reteach required.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#2D2A26]/10 shadow-xs space-y-3">
      <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-600" />
          <h4 className="text-xs font-black uppercase text-[#2D2A26] tracking-wider">
            5-Minute Reteach Interventions & Misconceptions
          </h4>
        </div>
        <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" /> Targeted Consolidation
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {lowScoring.map((item) => (
          <div key={`reteach-${item.letter}`} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#2D2A26]/10 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono font-black text-xs px-2 py-0.5 bg-rose-100 text-rose-800 rounded-md border border-rose-200">
                Hex '{item.letter}' ({Math.max(1, item.accuracyPercentage)}%)
              </span>
              <span className="text-[10px] font-bold text-gray-400">Low Accuracy Node</span>
            </div>
            <div className="font-bold text-[#2D2A26]">{item.conceptPrompt}</div>
            <p className="text-[11px] text-gray-600 leading-snug">
              {item.misconceptionAlert || `Revisit distinction between '${item.letter}' vocabulary and adjacent topic definitions during the next starter.`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

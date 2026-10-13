import React from 'react';
import { AlertCircle, CheckCircle2, Target } from 'lucide-react';

export interface LetterMasteryEntry {
  letter: string;
  conceptPrompt: string;
  accuracyPercentage: number;
  totalAttempts: number;
  misconceptionAlert?: string;
}

interface Props {
  entries: LetterMasteryEntry[];
}

export const ConceptMasteryMetrics: React.FC<Props> = ({ entries }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black text-[#2D2A26] uppercase tracking-wider flex items-center gap-1.5">
          <Target className="w-4 h-4 text-emerald-600" />
          Hexagon Concept Breakdown & Mastery
        </h4>
        <span className="text-[10px] text-gray-500 font-bold">25 Curriculum Nodes</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
        {entries.map((item) => {
          const isHigh = item.accuracyPercentage >= 75;
          const isLow = item.accuracyPercentage < 50;

          return (
            <div
              key={`metric-${item.letter}`}
              className="p-3 bg-white rounded-xl border border-[#2D2A26]/10 flex flex-col justify-between space-y-1.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#2D2A26] text-white flex items-center justify-center font-mono font-black text-xs">
                    {item.letter}
                  </div>
                  <span className="text-xs font-bold text-[#2D2A26] truncate max-w-[170px]">
                    {item.conceptPrompt}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isHigh
                      ? 'bg-emerald-100 text-emerald-800'
                      : isLow
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {Math.max(1, item.accuracyPercentage)}%
                </span>
              </div>

              {item.misconceptionAlert && (
                <div className="flex items-center gap-1.5 text-[10px] text-amber-900 bg-amber-50 p-1.5 rounded-lg border border-amber-200">
                  <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
                  <span className="truncate">{item.misconceptionAlert}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

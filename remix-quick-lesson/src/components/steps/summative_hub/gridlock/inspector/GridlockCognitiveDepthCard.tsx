import React from 'react';
import { GridlockQuestion } from '../types/gridlockTypes';
import { Brain, Layers, CheckCircle2, Award } from 'lucide-react';

interface Props {
  questions: GridlockQuestion[];
}

export const GridlockCognitiveDepthCard: React.FC<Props> = ({ questions }) => {
  const bloomsCounts: Record<string, number> = {
    Remember: 0, Understand: 0, Apply: 0, Analyse: 0, Evaluate: 0,
  };

  const chunkCoverage: Record<string, number> = {};

  questions.forEach((q) => {
    const level = q.bloomsLevel || 'Understand';
    bloomsCounts[level] = (bloomsCounts[level] || 0) + 1;
    const chunkName = q.chunkTitle || 'Core Lesson Material';
    chunkCoverage[chunkName] = (chunkCoverage[chunkName] || 0) + 1;
  });

  const total = Math.max(1, questions.length);
  const higherOrderCount = (bloomsCounts.Apply || 0) + (bloomsCounts.Analyse || 0) + (bloomsCounts.Evaluate || 0);
  const hotPercentage = Math.round((higherOrderCount / total) * 100);

  return (
    <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#2D2A26]/15 space-y-3 text-[#2D2A26]">
      <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-amber-600" />
          <h4 className="text-xs font-black uppercase tracking-wider">Cognitive Depth & Bloom's Rigour</h4>
        </div>
        <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
          {hotPercentage}% Higher-Order Thinking
        </span>
      </div>

      {/* Bloom's Distribution Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
        {Object.entries(bloomsCounts).map(([level, count]) => {
          const pct = Math.round((count / total) * 100);
          return (
            <div key={level} className="p-2 bg-white rounded-xl border border-[#2D2A26]/10 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-gray-500 block">{level}</span>
              <span className="text-base font-black text-[#2D2A26]">{count}</span>
              <span className="text-[9px] text-gray-400 block font-medium">({pct}%)</span>
            </div>
          );
        })}
      </div>

      {/* Chunk Coverage Footprint */}
      <div className="pt-2 border-t border-[#2D2A26]/10 space-y-1.5">
        <span className="text-[10px] font-bold uppercase text-gray-500 block flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" /> Lesson Chunk Alignment ({Object.keys(chunkCoverage).length} Sections Covered)
        </span>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(chunkCoverage).map(([title, count]) => (
            <span key={title} className="px-2 py-1 bg-white text-[11px] font-bold rounded-lg border border-[#2D2A26]/10 text-gray-700 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate max-w-[140px]">{title}</span>
              <span className="text-amber-700 font-mono">({count})</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

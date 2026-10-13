import React, { useState } from 'react';
import { LetterMasteryEntry } from './ConceptMasteryMetrics';
import { Layers, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Props {
  entries: LetterMasteryEntry[];
}

export const GridlockConceptHeatmapCard: React.FC<Props> = ({ entries }) => {
  const [filter, setFilter] = useState<'all' | 'needs_attention'>('all');

  const displayed = filter === 'all'
    ? entries
    : entries.filter((e) => e.accuracyPercentage < 60);

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#2D2A26]/10 shadow-xs space-y-3">
      <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-600" />
          <h4 className="text-xs font-black uppercase text-[#2D2A26] tracking-wider">
            Concept Mastery Heatmap (25 Hexagon Nodes)
          </h4>
        </div>
        <div className="flex gap-1 text-[10px] font-bold">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-2 py-1 rounded-lg cursor-pointer ${filter === 'all' ? 'bg-[#2D2A26] text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            All Hexes ({entries.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('needs_attention')}
            className={`px-2 py-1 rounded-lg cursor-pointer ${filter === 'needs_attention' ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Needs Reteach ({entries.filter((e) => e.accuracyPercentage < 60).length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 max-h-56 overflow-y-auto pr-1">
        {displayed.map((item) => {
          const acc = Math.max(1, item.accuracyPercentage);
          const isHigh = acc >= 75;
          const isLow = acc < 50;

          return (
            <div
              key={`heatmap-${item.letter}`}
              className={`p-2 rounded-xl border flex flex-col justify-between space-y-1 transition-all ${
                isHigh
                  ? 'bg-emerald-50/60 border-emerald-200'
                  : isLow
                  ? 'bg-rose-50/60 border-rose-200'
                  : 'bg-amber-50/60 border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-xs px-1.5 py-0.5 bg-[#2D2A26] text-white rounded">
                  {item.letter}
                </span>
                <span className={`text-[10px] font-black ${isHigh ? 'text-emerald-700' : isLow ? 'text-rose-700' : 'text-amber-700'}`}>
                  {acc}%
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#2D2A26] truncate" title={item.conceptPrompt}>
                {item.conceptPrompt}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

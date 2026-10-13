import React from 'react';
import { Target, Layers } from 'lucide-react';
import { LessonChunk } from '../../../../../types';
import { ImposterQuestion } from '../types/imposterTypes';

export interface ChunkMasteryStat {
  chunkTitle: string;
  accuracyPct: number;
  bluffDetectionPct: number;
  attempts: number;
}

interface Props {
  chunks?: LessonChunk[];
  questions?: ImposterQuestion[];
  masteryStats?: ChunkMasteryStat[];
}

export const ImposterMasteryHeatmapCard: React.FC<Props> = ({
  chunks = [],
  questions = [],
  masteryStats,
}) => {
  const stats: ChunkMasteryStat[] = masteryStats || (
    chunks.length > 0
      ? chunks.map((c, i) => ({
          chunkTitle: c.title || `Milestone ${i + 1}`,
          accuracyPct: Math.min(100, Math.max(30, 85 - (i * 12))),
          bluffDetectionPct: Math.min(100, Math.max(25, 75 - (i * 8))),
          attempts: 6 + (i * 2),
        }))
      : [
          { chunkTitle: 'Milestone 1: Core Vocabulary', accuracyPct: 88, bluffDetectionPct: 82, attempts: 12 },
          { chunkTitle: 'Milestone 2: Real-World Scenarios', accuracyPct: 68, bluffDetectionPct: 60, attempts: 10 },
          { chunkTitle: 'Milestone 3: Process Sequencing', accuracyPct: 54, bluffDetectionPct: 45, attempts: 8 },
        ]
  );

  const getColourClass = (pct: number) => {
    if (pct >= 75) return 'bg-emerald-500';
    if (pct >= 55) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#2D2A26]/15 space-y-3">
      <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-600" />
          <h4 className="text-xs font-black text-[#2D2A26] uppercase tracking-wider">
            Lesson Chunk Mastery Heatmap
          </h4>
        </div>
        <span className="text-[11px] text-[#2D2A26]/60 font-medium">Concept Accuracy vs Bluff Catch Rate</span>
      </div>

      <div className="space-y-2.5">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-3 rounded-xl border border-[#2D2A26]/10 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#2D2A26] truncate">{s.chunkTitle}</span>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="text-emerald-700 font-bold">{s.accuracyPct}% Concept</span>
                <span className="text-purple-700 font-bold">{s.bluffDetectionPct}% Caught</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="flex justify-between text-[9px] text-[#2D2A26]/60 mb-0.5">
                  <span>Knowledge Accuracy</span>
                  <span>{s.accuracyPct}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${getColourClass(s.accuracyPct)} transition-all`} style={{ width: `${s.accuracyPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[9px] text-[#2D2A26]/60 mb-0.5">
                  <span>Bluff Detection</span>
                  <span>{s.bluffDetectionPct}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${getColourClass(s.bluffDetectionPct)} transition-all`} style={{ width: `${s.bluffDetectionPct}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

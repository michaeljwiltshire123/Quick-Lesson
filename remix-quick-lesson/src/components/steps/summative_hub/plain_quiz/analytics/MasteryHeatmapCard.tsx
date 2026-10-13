import React from 'react';
import { Award, BookOpen } from 'lucide-react';
import { SummativeQuizQuestion } from '../../summative_quiz/typesSummativeQuiz';

interface Props {
  questions: SummativeQuizQuestion[];
}

interface ChunkMastery {
  title: string;
  index: number;
  scorePercent: number;
  status: 'green' | 'amber' | 'red';
}

export const MasteryHeatmapCard: React.FC<Props> = ({ questions }) => {
  const chunkMap = new Map<string, { title: string; index: number; count: number }>();

  questions.forEach((q, idx) => {
    const key = q.chunkTitle || `Chunk ${(q.chunkIndex ?? idx % 3) + 1}`;
    const existing = chunkMap.get(key) || { title: key, index: q.chunkIndex ?? idx, count: 0 };
    existing.count += 1;
    chunkMap.set(key, existing);
  });

  const masteries: ChunkMastery[] = Array.from(chunkMap.values()).map((item, idx) => {
    const mockScore = Math.max(45, Math.min(95, 88 - (idx * 12)));
    const status = mockScore >= 80 ? 'green' : mockScore >= 65 ? 'amber' : 'red';
    return { title: item.title, index: item.index, scorePercent: mockScore, status };
  });

  return (
    <div className="bg-[#1E1C1A] text-white p-4.5 rounded-2xl border border-white/10 space-y-3.5">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-200">
            Mastery Heatmap by Lesson Chunk
          </h3>
        </div>
        <span className="text-[10px] text-gray-400 font-mono">Classroom Breakdown</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {masteries.map((m) => {
          const badgeClass =
            m.status === 'green'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : m.status === 'amber'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-rose-500/20 text-rose-300 border-rose-500/40';

          const barClass =
            m.status === 'green' ? 'bg-emerald-500' : m.status === 'amber' ? 'bg-amber-500' : 'bg-rose-500';

          return (
            <div key={m.title} className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-1.5 truncate max-w-[140px]">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{m.title}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${badgeClass}`}>
                  {m.scorePercent}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full ${barClass} transition-all duration-500`} style={{ width: `${m.scorePercent}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

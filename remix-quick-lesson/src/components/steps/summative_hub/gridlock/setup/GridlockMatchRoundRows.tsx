import React from 'react';
import { GridlockQuestion, TournamentFormat } from '../types/gridlockTypes';
import { getRoundsCountForFormat } from '../factories/multiRoundQuestionBank';

interface Props {
  questions: GridlockQuestion[];
  selectedIdx: number;
  onSelectIndex: (index: number) => void;
  tournamentFormat?: TournamentFormat;
}

const ROUND_TITLES = [
  'Match 1 (Core Terms)',
  'Match 2 (Techniques)',
  'Match 3 (Distinctions)',
  'Match 4 (Applications)',
  'Match 5 (Mastery)',
  'Match 6 (Championship)',
  'Match 7 (Decider)',
];

export const GridlockMatchRoundRows: React.FC<Props> = ({
  questions,
  selectedIdx,
  onSelectIndex,
  tournamentFormat = 'best-of-3',
}) => {
  const roundSize = 25;
  const targetRounds = getRoundsCountForFormat(tournamentFormat);
  const totalRounds = Math.min(targetRounds, Math.max(1, Math.ceil(questions.length / roundSize)));
  
  const rounds = Array.from({ length: totalRounds }, (_, rIdx) => ({
    roundNumber: rIdx + 1,
    title: ROUND_TITLES[rIdx] || `Match ${rIdx + 1}`,
    items: questions.slice(rIdx * roundSize, (rIdx + 1) * roundSize),
  }));

  return (
    <div className="space-y-3 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#2D2A26]/10">
      {rounds.map((round, rIdx) => (
        <div
          key={`match-row-${round.roundNumber}`}
          className="space-y-1.5 pb-2 border-b border-[#2D2A26]/10 last:border-b-0 last:pb-0"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase text-[#2D2A26] tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              {round.title}
            </span>
            <span className="text-[10px] text-gray-500 font-medium">
              {round.items.length} Hexes (Match {round.roundNumber})
            </span>
          </div>

          <div className="flex items-center gap-1 flex-wrap">
            {round.items.map((q, localIdx) => {
              const globalIdx = rIdx * roundSize + localIdx;
              const isSelected = selectedIdx === globalIdx;

              return (
                <button
                  key={`letter-btn-${round.roundNumber}-${q?.letter || localIdx}-${globalIdx}`}
                  type="button"
                  title={`${q.letter}: ${q.targetAnswer}`}
                  onClick={() => onSelectIndex(globalIdx)}
                  className={`min-w-7 h-7 px-1 rounded-md font-mono font-black text-[10px] flex items-center justify-center border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#2D2A26] text-white border-black ring-2 ring-amber-400 shadow-xs'
                      : 'bg-white text-[#2D2A26] border-[#2D2A26]/15 hover:bg-amber-50'
                  }`}
                >
                  <span>{q?.letter || 'A'}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};


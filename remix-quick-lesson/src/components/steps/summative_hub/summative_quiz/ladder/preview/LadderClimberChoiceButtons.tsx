import React from 'react';

interface Props {
  choices: string[];
  selectedAnswer: number | null;
  eliminatedChoices: number[];
  onSelect: (idx: number) => void;
}

const COLORS = [
  'border-cyan-500/30 bg-cyan-950/20 text-cyan-200 hover:bg-cyan-950/40',
  'border-rose-500/30 bg-rose-950/20 text-rose-200 hover:bg-rose-950/40',
  'border-amber-500/30 bg-amber-950/20 text-amber-200 hover:bg-amber-950/40',
  'border-emerald-500/30 bg-emerald-950/20 text-emerald-200 hover:bg-emerald-950/40'
];

export const LadderClimberChoiceButtons: React.FC<Props> = ({
  choices, selectedAnswer, eliminatedChoices, onSelect,
}) => {
  return (
    <div className="flex flex-col justify-around gap-1 py-0.5">
      {choices.map((choice, idx) => {
        const isEliminated = eliminatedChoices.includes(idx);
        const isSelected = selectedAnswer === idx;
        if (isEliminated) {
          return (
            <div key={idx} className="py-1 px-2.5 bg-white/5 border border-white/5 text-gray-500 opacity-20 rounded-lg text-[8px] line-through shrink-0">
              Option {['A', 'B', 'C', 'D'][idx]} eliminated
            </div>
          );
        }
        return (
          <button
            key={idx}
            disabled={selectedAnswer !== null}
            onClick={() => onSelect(idx)}
            className={`w-full py-1.5 px-2.5 rounded-lg border text-[9px] font-bold text-left transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              isSelected
                ? 'bg-amber-500 border-amber-400 text-slate-950 font-black shadow-[0_0_12px_rgba(245,158,11,0.4)] scale-[0.98]'
                : COLORS[idx]
            }`}
          >
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black shrink-0 ${isSelected ? 'bg-slate-950 text-amber-400' : 'bg-white/10'}`}>
              {['A', 'B', 'C', 'D'][idx]}
            </span>
            <span className="flex-1 whitespace-normal break-words leading-tight text-[9px]">{choice}</span>
          </button>
        );
      })}
    </div>
  );
};

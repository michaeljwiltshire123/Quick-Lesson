import React from 'react';
import { LifelineType } from '../typesLadder';

interface Props {
  usedLifelines: LifelineType[];
  tokensLeft: number;
  selectedAnswer: number | null;
  onTriggerLifeline: (type: LifelineType) => void;
}

const LIFELINES: { type: LifelineType; label: string }[] = [
  { type: 'fifty_fifty', label: '50:50' },
  { type: 'ask_room', label: 'Class' },
  { type: 'safety_shield', label: 'Shield' },
  { type: 'ask_player', label: 'Peer' },
  { type: 'question_swap', label: 'Swap' },
];

export const LadderLifelineButtonRow: React.FC<Props> = ({
  usedLifelines, tokensLeft, selectedAnswer, onTriggerLifeline,
}) => {
  if (selectedAnswer !== null) return null;

  return (
    <div className="grid grid-cols-5 gap-1 pt-1 border-t border-white/10 shrink-0 font-sans">
      {LIFELINES.map(({ type, label }) => {
        const used = usedLifelines.includes(type);
        return (
          <button
            key={type}
            disabled={used || tokensLeft <= 0}
            onClick={() => onTriggerLifeline(type)}
            className={`py-1 text-[7px] font-black uppercase tracking-wider rounded transition-all text-center cursor-pointer ${
              used
                ? 'bg-red-500/10 text-red-400 line-through opacity-30 cursor-not-allowed'
                : tokensLeft <= 0
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-amber-300'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

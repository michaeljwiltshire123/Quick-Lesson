import React from 'react';
import { QuestionCard } from '../types/competitiveQuizTypes';

const formatOptText = (val: any): string => {
  if (typeof val === 'string') return val;
  if (val && typeof val === 'object') {
    return val.left && val.right ? `${val.left} ➔ ${val.right}` : val.text || Object.values(val).join(' ➔ ');
  }
  return String(val ?? '');
};

interface Props {
  card: QuestionCard;
  selectedChoice: number | null;
  onSelectChoice: (idx: number) => void;
  wagerAmount?: number;
  onChangeWager?: (amount: number) => void;
}

export const FormatAnswerInputGrid: React.FC<Props> = ({
  card,
  selectedChoice,
  onSelectChoice,
  wagerAmount = 100,
  onChangeWager,
}) => {
  if (card.format === 'binary_blitz') {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {['True', 'False'].map((label, idx) => (
          <button
            key={label}
            type="button"
            onClick={() => onSelectChoice(idx)}
            className={`py-3.5 rounded-2xl font-black text-sm uppercase transition-all cursor-pointer border-2 ${
              selectedChoice === idx ? 'bg-amber-400 text-slate-950 border-white shadow-lg' : 'bg-white/10 text-white border-white/20'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    );
  }

  const options = card.options && card.options.length > 0 ? card.options : ['Choice A', 'Choice B', 'Choice C', 'Choice D'];

  return (
    <div className="space-y-2">
      {card.format === 'wager_drop' && (
        <div className="flex items-center justify-between text-xs font-bold text-gray-300 pb-1">
          <span>Wager:</span>
          <div className="flex gap-1.5">
            {[50, 100, 200].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => onChangeWager?.(val)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                  wagerAmount === val ? 'bg-amber-500 text-slate-950 font-black' : 'bg-white/10 text-white'
                }`}
              >
                {val} pts
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectChoice(idx)}
            className={`p-3 rounded-2xl text-xs font-bold text-left transition-all cursor-pointer border flex items-center gap-2.5 ${
              selectedChoice === idx ? 'bg-amber-400 text-slate-950 border-white shadow-md' : 'bg-white/10 text-white border-white/15'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
              selectedChoice === idx ? 'bg-slate-950 text-amber-400' : 'bg-black/40 text-gray-300'
            }`}>
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="truncate">{formatOptText(opt)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

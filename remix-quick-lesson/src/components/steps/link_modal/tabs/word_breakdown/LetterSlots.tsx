import React from 'react';

interface Props {
  term: string;
  isRevealed: boolean;
}

export const LetterSlots: React.FC<Props> = ({ term, isRevealed }) => {
  const characters = term.split('');

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 py-3 px-2 bg-amber-500/5 rounded-xl border border-amber-500/15">
      {characters.map((char, idx) => {
        const isSpecial = char === ' ' || char === '-';
        if (isSpecial) {
          return (
            <span key={idx} className="w-3 text-center font-bold text-[#2D2A26]/40 text-sm">
              {char}
            </span>
          );
        }
        return (
          <span
            key={idx}
            className={`w-7 h-8 sm:w-8 sm:h-9 flex items-center justify-center font-mono font-bold text-sm sm:text-base rounded-lg border transition-all duration-200 ${
              isRevealed
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
                : 'bg-white border-[#2D2A26]/20 text-transparent border-b-2 border-b-[#D97706]'
            }`}
          >
            {isRevealed ? char.toUpperCase() : '_'}
          </span>
        );
      })}
    </div>
  );
};

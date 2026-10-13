import React from 'react';
import { Repeat } from 'lucide-react';

interface ShelfRepeatPillsProps {
  repeatTimes: number;
  onSelectRepeat: (repeatTimes: number) => void;
}

export const ShelfRepeatPills: React.FC<ShelfRepeatPillsProps> = ({
  repeatTimes,
  onSelectRepeat,
}) => {
  const options = [
    { value: 1, label: 'x1 Once' },
    { value: 2, label: 'x2 Twice' },
    { value: 999, label: 'Loop' },
  ] as const;

  return (
    <div className="flex items-center gap-1">
      <span className="text-[9px] font-extrabold text-amber-950 uppercase tracking-wider shrink-0 w-11 flex items-center gap-0.5">
        <Repeat className="w-2.5 h-2.5 text-amber-800" />
        Loop:
      </span>
      <div className="flex items-center gap-1 flex-1">
        {options.map(({ value, label }) => {
          const isActive = value === 999 ? repeatTimes >= 999 : repeatTimes === value;
          return (
            <button
              key={value}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectRepeat(value);
              }}
              className={`flex-1 py-1 px-1.5 rounded-lg text-[9.5px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                isActive
                  ? 'bg-amber-800 text-white shadow-2xs scale-[1.02]'
                  : 'bg-white hover:bg-amber-100/70 text-stone-700 border border-amber-200'
              }`}
            >
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

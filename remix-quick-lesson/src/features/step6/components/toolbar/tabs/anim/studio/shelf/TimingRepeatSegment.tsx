import React from 'react';
import { Repeat } from 'lucide-react';

interface TimingRepeatSegmentProps {
  repeatTimes: number;
  onSelectRepeat: (repeatTimes: number) => void;
}

export const TimingRepeatSegment: React.FC<TimingRepeatSegmentProps> = ({
  repeatTimes,
  onSelectRepeat,
}) => {
  const options = [
    { value: 1, label: 'Once (1×)', desc: 'Emphasises briefly once.' },
    { value: 2, label: 'Double (2×)', desc: 'Pulses twice for attention.' },
    { value: 999, label: 'Continuous', desc: 'Loops while slide is active.' },
  ] as const;

  return (
    <div className="space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black uppercase tracking-wider text-stone-700 flex items-center gap-1">
          <Repeat className="w-3 h-3 text-stone-500" />
          Emphasis Repetition
        </label>
        <span className="text-[9.5px] font-bold text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
          {repeatTimes >= 999 ? 'Continuous' : `${repeatTimes}×`}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200/70">
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
              className={`py-1.5 px-1 rounded-lg text-[10px] font-bold flex items-center justify-center cursor-pointer transition-all ${
                isActive
                  ? 'bg-white text-stone-900 shadow-xs ring-1 ring-stone-900/10'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/50'
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

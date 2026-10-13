import React from 'react';
import { Gauge } from 'lucide-react';

interface TimingPaceSegmentProps {
  duration: number;
  onSelectDuration: (duration: number) => void;
}

export const TimingPaceSegment: React.FC<TimingPaceSegmentProps> = ({
  duration,
  onSelectDuration,
}) => {
  const options = [
    {
      value: 0.4,
      label: 'Snappy',
      badge: '0.4s',
      description: 'Quick, lively motion to keep classroom pace moving briskly.',
    },
    {
      value: 0.8,
      label: 'Smooth',
      badge: '0.8s',
      description: 'Natural, balanced pacing suited for lesson explanations.',
    },
    {
      value: 1.4,
      label: 'Gentle',
      badge: '1.4s',
      description: 'Calm, steady transition allowing pupils to absorb information.',
    },
  ] as const;

  const currentOption = options.find((o) => Math.abs(duration - o.value) < 0.15) || options[1];

  return (
    <div className="space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black uppercase tracking-wider text-stone-700 flex items-center gap-1">
          <Gauge className="w-3 h-3 text-stone-500" />
          Motion Pace
        </label>
        <span className="text-[9.5px] font-mono font-bold text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
          {duration.toFixed(1)}s
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200/70">
        {options.map(({ value, label, badge }) => {
          const isActive = Math.abs(duration - value) < 0.15;
          return (
            <button
              key={value}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectDuration(value);
              }}
              className={`py-1.5 px-1 rounded-lg text-[10px] font-bold flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all ${
                isActive
                  ? 'bg-white text-stone-900 shadow-xs ring-1 ring-stone-900/10'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/50'
              }`}
            >
              <span>{label}</span>
              <span className={`text-[8.5px] font-mono ${isActive ? 'text-amber-800' : 'text-stone-400'}`}>
                {badge}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-[9.5px] text-stone-500 leading-snug px-0.5">
        {currentOption.description}
      </p>
    </div>
  );
};

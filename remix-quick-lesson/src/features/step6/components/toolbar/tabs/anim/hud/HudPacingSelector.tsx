import React from 'react';
import { AnimationCategory } from '../studio/types';
import { Gauge, Repeat } from 'lucide-react';
import { normalizeDuration } from '../timing/DurationInputGuard';

interface HudPacingSelectorProps {
  category: AnimationCategory;
  duration: number;
  repeatTimes: number;
  onSelectDuration: (dur: number) => void;
  onSelectRepeat: (rep: number) => void;
}

export const HudPacingSelector: React.FC<HudPacingSelectorProps> = ({
  category, duration, repeatTimes, onSelectDuration, onSelectRepeat,
}) => {
  duration = normalizeDuration(duration);
  const speeds = [
    { label: 'Snappy', sec: 0.4 },
    { label: 'Smooth', sec: 0.8 },
    { label: 'Gentle', sec: 1.4 },
  ];

  const repeats = [1, 2, 3];

  return (
    <div className="space-y-1.5 select-none">
      <div className="flex items-center justify-between text-[10px] font-bold text-stone-500 uppercase tracking-wider">
        <span className="flex items-center gap-1">
          <Gauge className="w-3 h-3 text-stone-500" />
          <span>Speed & Pacing</span>
        </span>
        <span className="font-mono text-[10px] font-semibold text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded">
          {duration.toFixed(1)}s
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="grid grid-cols-3 gap-1.5 flex-1">
          {speeds.map((s) => {
            const isSelected = Math.abs(duration - s.sec) < 0.15;
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => onSelectDuration(s.sec)}
                className={`py-1.5 px-1 rounded-xl border text-center cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-stone-900 border-stone-900 text-white shadow-xs font-bold'
                    : 'bg-stone-50/80 border-stone-200 hover:border-stone-300 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <div className="text-[10px] font-bold">{s.label}</div>
                <div className={`text-[8.5px] font-mono ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>{s.sec}s</div>
              </button>
            );
          })}
        </div>

        {category === 'emphasis' && (
          <div className="flex items-center gap-1 pl-1 border-l border-stone-200">
            <span className="text-[9px] font-bold text-stone-400 flex items-center gap-0.5">
              <Repeat className="w-2.5 h-2.5" /> Loop:
            </span>
            <div className="flex gap-0.5">
              {repeats.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => onSelectRepeat(r)}
                  className={`w-6 h-6 rounded-lg text-[9.5px] font-bold flex items-center justify-center cursor-pointer border transition-all ${
                    repeatTimes === r
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-stone-50/80 text-stone-600 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {r}x
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

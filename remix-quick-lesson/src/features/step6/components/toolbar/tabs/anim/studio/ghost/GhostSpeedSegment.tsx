import React from 'react';
import { AnimationCategory } from '../types';
import DurationInputGuard, { normalizeDuration } from '../../timing/DurationInputGuard';

interface GhostSpeedSegmentProps {
  duration: number;
  repeatTimes: number;
  category: AnimationCategory;
  onSelectDuration: (dur: number) => void;
  onSelectRepeat: (rep: number) => void;
}

export const GhostSpeedSegment: React.FC<GhostSpeedSegmentProps> = ({
  duration, repeatTimes, category, onSelectDuration, onSelectRepeat,
}) => {
  duration = normalizeDuration(duration);
  const speeds = [
    { label: 'Snappy', sec: 0.4 },
    { label: 'Smooth', sec: 0.8 },
    { label: 'Gentle', sec: 1.4 },
  ];

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] font-bold text-stone-500 uppercase tracking-wider">
          <span>Speed</span>
          <span className="font-mono text-stone-700 font-semibold">{duration.toFixed(1)}s</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {speeds.map((s) => {
            const active = Math.abs(duration - s.sec) < 0.15;
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => onSelectDuration(s.sec)}
                className={`py-1.5 px-1 rounded-xl text-[10px] font-bold border cursor-pointer transition-all ${
                  active
                    ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                    : 'bg-stone-50/80 border-stone-200 hover:border-stone-300 hover:bg-stone-100 text-stone-600'
                }`}
              >
                <div>{s.label}</div>
                <div className={`text-[8.5px] font-mono ${active ? 'text-stone-300' : 'text-stone-400'}`}>{s.sec}s</div>
              </button>
            );
          })}
        </div>
      </div>
      <DurationInputGuard value={duration} onChange={onSelectDuration} />

      {category === 'emphasis' && (
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Repeat Loop</span>
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => onSelectRepeat(r)}
                className={`py-1 rounded-xl text-[10px] font-bold border cursor-pointer transition-all ${
                  repeatTimes === r
                    ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                    : 'bg-stone-50/80 border-stone-200 hover:border-stone-300 hover:bg-stone-100 text-stone-600'
                }`}
              >
                {r}×
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Gauge } from 'lucide-react';

interface ShelfSpeedPillsProps {
  duration: number;
  onSelectDuration: (duration: number) => void;
}

export const ShelfSpeedPills: React.FC<ShelfSpeedPillsProps> = ({
  duration,
  onSelectDuration,
}) => {
  const options = [
    { value: 0.4, label: 'Snappy', sub: '0.4s' },
    { value: 0.8, label: 'Smooth', sub: '0.8s' },
    { value: 1.4, label: 'Gentle', sub: '1.4s' },
  ] as const;

  return (
    <div className="flex items-center gap-1">
      <span className="text-[9px] font-extrabold text-amber-950 uppercase tracking-wider shrink-0 w-11 flex items-center gap-0.5">
        <Gauge className="w-2.5 h-2.5 text-amber-800" />
        Speed:
      </span>
      <div className="flex items-center gap-1 flex-1">
        {options.map(({ value, label, sub }) => {
          const isActive = Math.abs(duration - value) < 0.15;
          return (
            <button
              key={value}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectDuration(value);
              }}
              className={`flex-1 py-1 px-1.5 rounded-lg text-[9.5px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                isActive
                  ? 'bg-amber-800 text-white shadow-2xs scale-[1.02]'
                  : 'bg-white hover:bg-amber-100/70 text-stone-700 border border-amber-200'
              }`}
            >
              <span>{label}</span>
              <span className="opacity-75 font-mono text-[8.5px]">({sub})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { Star } from 'lucide-react';

interface Props {
  rating: number;
  onChangeRating: (r: number) => void;
  disabled?: boolean;
}

const CONFIDENCE_LEVELS = [
  { level: 1, label: 'Exploring' },
  { level: 2, label: 'Fairly Confident' },
  { level: 3, label: 'Completely Certain' },
];

export const StudentConfidenceSlider: React.FC<Props> = ({ rating, onChangeRating, disabled = false }) => {
  return (
    <div className="p-3 bg-[#F8F6F0]/70 rounded-xl border border-[#2D2A26]/10 space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-wider text-[#2D2A26]/70">
          How confident are you in this answer?
        </label>
        <span className="text-xs font-semibold text-amber-800">
          {CONFIDENCE_LEVELS.find((c) => c.level === rating)?.label || 'Select rating'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {CONFIDENCE_LEVELS.map(({ level, label }) => {
          const isSelected = rating === level;
          return (
            <button
              key={level}
              type="button"
              disabled={disabled}
              onClick={() => onChangeRating(level)}
              className={`p-2 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                isSelected
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-white text-[#2D2A26]/80 hover:bg-[#F8F6F0] border-[#2D2A26]/15'
              } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: level }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${isSelected ? 'fill-white text-white' : 'fill-amber-400 text-amber-500'}`}
                  />
                ))}
              </div>
              <span className="text-[10px] truncate max-w-full">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

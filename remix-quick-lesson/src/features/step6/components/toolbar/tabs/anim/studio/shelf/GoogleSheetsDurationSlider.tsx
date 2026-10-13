import React from 'react';

interface GoogleSheetsDurationSliderProps {
  duration: number;
  onSelectDuration: (duration: number) => void;
  isEmphasis?: boolean;
  repeatTimes?: number;
  onSelectRepeat?: (repeatTimes: number) => void;
}

export const GoogleSheetsDurationSlider: React.FC<GoogleSheetsDurationSliderProps> = ({
  duration,
  onSelectDuration,
  isEmphasis,
  repeatTimes = 1,
  onSelectRepeat,
}) => {
  return (
    <div className="px-1 py-1 space-y-1 border-t border-stone-200/70 text-left">
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-stone-600 font-bold">Speed / Duration</span>
        <span className="font-mono font-black text-amber-950 bg-amber-100/80 px-1.5 py-0.2 rounded text-[10px]">
          {Math.max(0.3, Math.min(5.0, duration)).toFixed(1)}s
        </span>
      </div>
      <input
        type="range"
        min={0.3}
        max={5.0}
        step={0.1}
        value={Math.max(0.3, Math.min(5.0, duration))}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          e.stopPropagation();
          onSelectDuration(parseFloat(e.target.value));
        }}
        className="w-full accent-amber-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
      />
      <div className="flex justify-between text-[8.5px] font-mono text-stone-400">
        <span>0.3s (Fast)</span>
        <span>5.0s (Slow)</span>
      </div>

      {isEmphasis && onSelectRepeat && (
        <div className="pt-1 border-t border-stone-200/70 flex items-center justify-between">
          <span className="text-[9.5px] text-stone-600 font-bold">Repeats</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((count) => (
              <button
                key={count}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRepeat(count);
                }}
                className={`px-1.5 py-0.2 text-[9px] font-bold rounded cursor-pointer ${
                  repeatTimes === count
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {count}x
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

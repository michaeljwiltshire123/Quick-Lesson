import React from 'react';
import { MousePointer, Clock, Zap, Repeat } from 'lucide-react';

interface CardInlineSettingsDrawerProps {
  category: 'entrance' | 'emphasis' | 'exit';
  trigger: string;
  onTriggerChange: (val: string) => void;
  duration: number;
  onDurationChange: (val: number) => void;
  delay: number;
  onDelayChange: (val: number) => void;
  emphasisRepeat?: number;
  onEmphasisRepeatChange?: (val: number) => void;
}

export const CardInlineSettingsDrawer: React.FC<CardInlineSettingsDrawerProps> = ({
  category, trigger, onTriggerChange, duration, onDurationChange, delay, onDelayChange,
  emphasisRepeat = 1, onEmphasisRepeatChange,
}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="mt-2.5 pt-2 border-t border-amber-300/80 space-y-2 text-stone-800 text-[11px] animate-in fade-in"
    >
      <div className="flex items-center justify-between gap-1">
        <span className="font-bold text-amber-950 flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-800" />
          <span>Trigger:</span>
        </span>
        <div className="flex bg-white/90 p-0.5 rounded-lg border border-amber-200">
          {(['onClick', 'withPrevious', 'afterPrevious'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onTriggerChange(t)}
              className={`px-2 py-0.5 rounded-md font-bold text-[9.5px] cursor-pointer transition-all ${
                trigger === t ? 'bg-amber-800 text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t === 'onClick' ? 'On Click' : t === 'withPrevious' ? 'Together' : 'Successive'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 bg-white/80 p-2 rounded-xl border border-amber-200">
        <div>
          <div className="flex justify-between text-[10px] font-bold text-stone-700 mb-0.5">
            <span>Speed</span>
            <span className="font-mono text-amber-900">{duration.toFixed(1)}s</span>
          </div>
          <input
            type="range" min={0.2} max={3.0} step={0.1} value={duration}
            onChange={(e) => onDurationChange(parseFloat(e.target.value))}
            className="w-full accent-amber-800 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-[10px] font-bold text-stone-700 mb-0.5">
            <span>Delay</span>
            <span className="font-mono text-amber-900">{delay.toFixed(1)}s</span>
          </div>
          <input
            type="range" min={0.0} max={3.0} step={0.2} value={delay}
            onChange={(e) => onDelayChange(parseFloat(e.target.value))}
            className="w-full accent-amber-800 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
          />
        </div>
      </div>

      {category === 'emphasis' && onEmphasisRepeatChange && (
        <div className="flex items-center justify-between gap-1 bg-white/80 px-2 py-1.5 rounded-xl border border-amber-200">
          <span className="font-bold text-stone-700 text-[10px] flex items-center gap-1">
            <Repeat className="w-3 h-3 text-amber-800" />
            <span>Loop Repeats:</span>
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onEmphasisRepeatChange(n)}
                className={`w-5 h-5 rounded-md font-black text-[9.5px] cursor-pointer transition-all ${
                  emphasisRepeat === n ? 'bg-amber-800 text-white shadow-2xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {n}x
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

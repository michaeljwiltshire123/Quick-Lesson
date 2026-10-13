import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface ElementStudioSlidersProps {
  category: 'entrance' | 'emphasis' | 'exit';
  animationType: string;
  duration: number;
  onDurationChange: (val: number) => void;
  delay: number;
  onDelayChange: (val: number) => void;
  emphasisRepeat: number;
  onEmphasisRepeatChange: (val: number) => void;
}

export const ElementStudioSliders: React.FC<ElementStudioSlidersProps> = ({
  category, animationType, duration, onDurationChange, delay, onDelayChange,
  emphasisRepeat, onEmphasisRepeatChange,
}) => {
  return (
    <div className="space-y-3 pt-1 border-t border-stone-200">
      {category === 'emphasis' && animationType !== 'none' && (
        <div className="flex items-center justify-between p-2 bg-amber-50 border border-amber-200 rounded-xl">
          <span className="font-bold text-amber-950 text-xs">Repeat Multiplier:</span>
          <div className="flex items-center gap-2">
            <button
              type="button" onClick={() => onEmphasisRepeatChange(Math.max(1, emphasisRepeat - 1))}
              className="p-1 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 cursor-pointer"
            >
              <Minus className="w-3 h-3 text-stone-700" />
            </button>
            <span className="font-black text-amber-900 text-xs w-8 text-center">{emphasisRepeat}×</span>
            <button
              type="button" onClick={() => onEmphasisRepeatChange(Math.min(5, emphasisRepeat + 1))}
              className="p-1 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 cursor-pointer"
            >
              <Plus className="w-3 h-3 text-stone-700" />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex justify-between font-bold text-[11px] mb-1">
            <span>Speed</span>
            <span className="font-mono text-amber-800">{duration.toFixed(1)}s</span>
          </div>
          <input
            type="range" min={0.2} max={3.0} step={0.1} value={duration}
            onChange={(e) => onDurationChange(parseFloat(e.target.value))}
            className="w-full accent-amber-700 cursor-pointer"
          />
        </div>
        <div>
          <div className="flex justify-between font-bold text-[11px] mb-1">
            <span>Delay</span>
            <span className="font-mono text-amber-800">{delay.toFixed(1)}s</span>
          </div>
          <input
            type="range" min={0.0} max={3.0} step={0.1} value={delay}
            onChange={(e) => onDelayChange(parseFloat(e.target.value))}
            className="w-full accent-amber-700 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

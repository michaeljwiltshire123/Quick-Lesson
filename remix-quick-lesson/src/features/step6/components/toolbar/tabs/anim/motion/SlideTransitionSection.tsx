import React from 'react';
import { CanvasTheme } from '../../../../../types/slideTypes';
import { SLIDE_TRANSITION_OPTIONS } from './motionEffectOptions';
import { CopyCheck, Layers } from 'lucide-react';

interface SlideTransitionSectionProps {
  theme?: Partial<CanvasTheme>;
  onUpdateTheme: (patch: Partial<CanvasTheme>) => void;
  onApplyThemeToAll?: (patch: Partial<CanvasTheme>) => void;
  slidesCount?: number;
}

export const SlideTransitionSection: React.FC<SlideTransitionSectionProps> = ({
  theme,
  onUpdateTheme,
  onApplyThemeToAll,
  slidesCount = 1,
}) => {
  const currentTransition = theme?.transitionEffect || 'none';
  const duration = (theme as any)?.transitionDuration ?? 0.6;

  const handleChangeTransition = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateTheme({ transitionEffect: e.target.value } as any);
  };

  const handleChangeSpeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateTheme({ transitionDuration: parseFloat(e.target.value) } as any);
  };

  const handleApplyToAll = () => {
    if (onApplyThemeToAll) {
      onApplyThemeToAll({
        transitionEffect: currentTransition,
        transitionDuration: duration,
      } as any);
    }
  };

  return (
    <div className="space-y-2 p-3 bg-stone-50 rounded-2xl border border-stone-200/90 shadow-2xs text-xs text-stone-800">
      <div className="flex items-center gap-1.5 font-black text-stone-900 tracking-tight">
        <Layers className="w-3.5 h-3.5 text-amber-700" />
        <span>Slide Transitions</span>
      </div>

      <div className="space-y-1">
        <label className="text-[10.5px] font-semibold text-stone-600 block">Transition Type</label>
        <select
          value={currentTransition}
          onChange={handleChangeTransition}
          className="w-full bg-white border border-stone-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 cursor-pointer shadow-2xs"
        >
          {SLIDE_TRANSITION_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {currentTransition !== 'none' && (
        <div className="space-y-1 pt-1 border-t border-stone-200">
          <div className="flex items-center justify-between text-[10px] font-semibold text-stone-500">
            <span>Transition Speed</span>
            <span className="font-mono text-stone-800">{duration.toFixed(1)}s</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-stone-400 font-bold">Fast</span>
            <input
              type="range"
              min="0.3"
              max="2.0"
              step="0.1"
              value={duration}
              onChange={handleChangeSpeed}
              className="w-full accent-amber-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
            />
            <span className="text-[9px] text-stone-400 font-bold">Slow</span>
          </div>
        </div>
      )}

      {onApplyThemeToAll && slidesCount > 1 && (
        <button
          type="button"
          onClick={handleApplyToAll}
          className="w-full mt-1 py-1.5 px-2 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl text-[10.5px] font-bold text-stone-700 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
        >
          <CopyCheck className="w-3 h-3 text-amber-800" />
          <span>Apply to all slides ({slidesCount})</span>
        </button>
      )}
    </div>
  );
};

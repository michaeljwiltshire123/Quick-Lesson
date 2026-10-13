import React from 'react';
import { CanvasTheme } from '../../types/slideTypes';
import { Film, Sparkles } from 'lucide-react';

interface SlideTransitionPickerProps {
  currentTheme?: Partial<CanvasTheme>;
  onUpdateTheme: (theme: Partial<CanvasTheme>) => void;
}

const TRANSITIONS = [
  { id: 'fade', name: 'Smooth Fade' },
  { id: 'slide', name: 'Slide Push' },
  { id: 'zoom', name: 'Zoom Focus' },
  { id: 'none', name: 'Instant' },
];

export const SlideTransitionPicker: React.FC<SlideTransitionPickerProps> = ({
  currentTheme = {},
  onUpdateTheme,
}) => {
  const activeTransition = (currentTheme as any).transitionEffect || 'fade';
  const isRainbowHeader = Boolean((currentTheme as any).isRainbowHeader);

  return (
    <div className="space-y-3 pt-3 border-t border-stone-100">
      <div className="flex items-center justify-between pb-1 border-b border-stone-100">
        <div className="flex items-center gap-1.5">
          <Film className="w-4 h-4 text-amber-700" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">Slide Transitions & Style</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {TRANSITIONS.map((tr) => (
          <button
            key={tr.id}
            type="button"
            onClick={() => onUpdateTheme({ ...(currentTheme || {}), transitionEffect: tr.id } as any)}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              activeTransition === tr.id ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-2xs' : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            {tr.name}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onUpdateTheme({ ...(currentTheme || {}), isRainbowHeader: !isRainbowHeader } as any)}
        className={`w-full py-2 px-3 rounded-xl border font-semibold text-xs flex items-center justify-between transition-all cursor-pointer ${
          isRainbowHeader
            ? 'bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border-amber-400 text-amber-950 ring-1 ring-amber-300'
            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Rainbow Header Effect</span>
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isRainbowHeader ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-600'}`}>
          {isRainbowHeader ? 'ON' : 'OFF'}
        </span>
      </button>
    </div>
  );
};

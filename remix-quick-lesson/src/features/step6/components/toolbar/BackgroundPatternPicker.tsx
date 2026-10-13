import React from 'react';
import { CanvasTheme } from '../../types/slideTypes';
import { LayoutGrid, Grid, Square, Sparkles } from 'lucide-react';

interface BackgroundPatternPickerProps {
  currentTheme?: Partial<CanvasTheme>;
  onUpdateTheme: (theme: Partial<CanvasTheme>) => void;
}

const PATTERNS = [
  { id: 'solid', name: 'Clean Solid', icon: Square },
  { id: 'dots', name: 'Dot Grid', icon: Sparkles },
  { id: 'maths_grid', name: 'Graph Paper', icon: Grid },
  { id: 'chalkboard', name: 'Chalkboard', icon: LayoutGrid },
  { id: 'parchment', name: 'Parchment', icon: Square },
];

export const BackgroundPatternPicker: React.FC<BackgroundPatternPickerProps> = ({
  currentTheme = {},
  onUpdateTheme,
}) => {
  const activePattern = (currentTheme as any).backgroundPattern || 'solid';

  const handleSelectPattern = (patId: string) => {
    let patch: Partial<CanvasTheme> = { ...(currentTheme || {}), backgroundPattern: patId } as any;
    if (patId === 'chalkboard') {
      patch = { ...patch, backgroundColor: '#1E293B', textColor: '#F8FAFC', accentColor: '#38BDF8' };
    } else if (patId === 'parchment') {
      patch = { ...patch, backgroundColor: '#FEF3C7', textColor: '#78350F', accentColor: '#D97706' };
    }
    onUpdateTheme(patch);
  };

  return (
    <div className="space-y-2 pt-2 border-t border-stone-100">
      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
        Canvas Texture & Background Style
      </label>
      <div className="grid grid-cols-3 gap-1.5">
        {PATTERNS.map((pat) => (
          <button
            key={pat.id}
            type="button"
            onClick={() => handleSelectPattern(pat.id)}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border flex items-center justify-center gap-1 transition-all cursor-pointer ${
              activePattern === pat.id
                ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold shadow-2xs'
                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
            }`}
          >
            <span>{pat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

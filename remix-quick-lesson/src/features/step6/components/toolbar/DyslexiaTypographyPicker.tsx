import React from 'react';
import { Type, Sparkles } from 'lucide-react';
import { CanvasTheme } from '../../types/slideTypes';

interface DyslexiaTypographyPickerProps {
  currentTheme?: Partial<CanvasTheme>;
  onUpdateTheme: (theme: Partial<CanvasTheme>) => void;
}

export const DyslexiaTypographyPicker: React.FC<DyslexiaTypographyPickerProps> = ({
  currentTheme = {},
  onUpdateTheme,
}) => {
  const isDyslexicMode = Boolean(currentTheme.isDyslexicFriendly);
  const currentFont = currentTheme.fontFamily || 'sans-serif';

  const toggleDyslexicMode = () => {
    const next = !isDyslexicMode;
    onUpdateTheme({
      isDyslexicFriendly: next,
      fontFamily: next ? 'Lexend, OpenDyslexic, sans-serif' : 'system-ui, sans-serif',
      lineHeight: next ? 1.65 : 1.35,
    });
  };

  return (
    <div className="space-y-3 pt-3 border-t border-stone-100">
      <div className="flex items-center justify-between pb-1 border-b border-stone-100">
        <div className="flex items-center gap-1.5">
          <Type className="w-4 h-4 text-amber-700" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">Typography & Accessibility</h3>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleDyslexicMode}
        className={`w-full py-2 px-3 rounded-xl border font-semibold text-xs flex items-center justify-between transition-all cursor-pointer ${
          isDyslexicMode
            ? 'bg-amber-100 border-amber-500 text-amber-950 ring-1 ring-amber-400'
            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Dyslexia-Friendly Layout</span>
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isDyslexicMode ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-600'}`}>
          {isDyslexicMode ? 'ON (1.65x)' : 'OFF'}
        </span>
      </button>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onUpdateTheme({ fontFamily: 'system-ui, sans-serif' })}
          className={`py-1.5 px-2 rounded-lg border text-xs font-medium cursor-pointer ${
            currentFont.includes('system-ui') ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold' : 'bg-white border-stone-200'
          }`}
        >
          Modern Clean
        </button>
        <button
          type="button"
          onClick={() => onUpdateTheme({ fontFamily: 'Georgia, serif' })}
          className={`py-1.5 px-2 rounded-lg border text-xs font-serif cursor-pointer ${
            currentFont.includes('Georgia') ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold' : 'bg-white border-stone-200'
          }`}
        >
          Curriculum Serif
        </button>
      </div>
    </div>
  );
};

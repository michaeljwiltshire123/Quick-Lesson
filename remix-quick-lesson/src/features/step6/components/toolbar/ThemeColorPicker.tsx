import React, { useState } from 'react';
import { CanvasTheme } from '../../types/slideTypes';
import { BackgroundPatternPicker } from './BackgroundPatternPicker';
import { Palette, Check, Sparkles } from 'lucide-react';

interface ThemeColorPickerProps {
  currentTheme?: Partial<CanvasTheme>;
  onUpdateTheme: (theme: Partial<CanvasTheme>) => void;
  onApplyToAll: (theme: Partial<CanvasTheme>) => void;
}

const PRESET_PALETTES = [
  { name: 'Classic Cream', bg: '#FAF9F5', text: '#1C1917', accent: '#D97706' },
  { name: 'British Sage', bg: '#F2F6F3', text: '#1E293B', accent: '#059669' },
  { name: 'Warm Parchment', bg: '#FFFBEB', text: '#78350F', accent: '#D97706' },
  { name: 'Slate Night', bg: '#0F172A', text: '#F8FAFC', accent: '#38BDF8' },
  { name: 'Royal Navy', bg: '#0F2137', text: '#F1F5F9', accent: '#818CF8' },
];

export const ThemeColorPicker: React.FC<ThemeColorPickerProps> = ({
  currentTheme = {}, onUpdateTheme, onApplyToAll,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const activeBg = currentTheme.backgroundColor || '#FAF9F5';
  const activeText = currentTheme.textColor || '#1C1917';
  const activeAccent = currentTheme.accentColor || '#D97706';

  const handleApplyAll = () => {
    onApplyToAll({ backgroundColor: activeBg, textColor: activeText, accentColor: activeAccent });
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 pb-1 border-b border-stone-100">
        <Palette className="w-4 h-4 text-amber-700" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">Slide Theme & Colours</h3>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {PRESET_PALETTES.map((p) => (
          <button
            key={p.name} type="button"
            onClick={() => onUpdateTheme({ backgroundColor: p.bg, textColor: p.text, accentColor: p.accent })}
            className={`h-8 rounded-lg border flex items-center justify-center cursor-pointer ${activeBg === p.bg ? 'ring-2 ring-amber-600 scale-105' : 'border-stone-200'}`}
            style={{ backgroundColor: p.bg }} title={p.name}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.accent }} />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <label className="flex flex-col gap-1 text-[10px] font-semibold text-stone-600">
          <span>Background</span>
          <input type="color" value={activeBg} onChange={(e) => onUpdateTheme({ backgroundColor: e.target.value })} className="w-full h-6 rounded border border-stone-200 cursor-pointer bg-transparent" />
        </label>
        <label className="flex flex-col gap-1 text-[10px] font-semibold text-stone-600">
          <span>Text</span>
          <input type="color" value={activeText} onChange={(e) => onUpdateTheme({ textColor: e.target.value })} className="w-full h-6 rounded border border-stone-200 cursor-pointer bg-transparent" />
        </label>
        <label className="flex flex-col gap-1 text-[10px] font-semibold text-stone-600">
          <span>Accent</span>
          <input type="color" value={activeAccent} onChange={(e) => onUpdateTheme({ accentColor: e.target.value })} className="w-full h-6 rounded border border-stone-200 cursor-pointer bg-transparent" />
        </label>
      </div>

      <BackgroundPatternPicker currentTheme={currentTheme} onUpdateTheme={onUpdateTheme} />

      <button
        type="button" onClick={handleApplyAll}
        className="w-full py-1.5 px-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
      >
        {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Sparkles className="w-3.5 h-3.5 text-amber-700" />}
        <span>{copiedAll ? 'Theme Applied to All!' : 'Apply Theme to All Slides'}</span>
      </button>
    </div>
  );
};

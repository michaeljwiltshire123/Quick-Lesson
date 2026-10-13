import React, { useState } from 'react';
import { CanvasTheme } from '../../../types/slideTypes';
import { Palette, X, Check } from 'lucide-react';

interface ThemePreset {
  id: string;
  name: string;
  description: string;
  theme: Partial<CanvasTheme>;
}

export const THEME_PRESETS: ThemePreset[] = [
  { id: 'scholar', name: 'Classic Scholar', description: 'Clean white slide with slate borders & gold accents', theme: { backgroundColor: '#FFFFFF', textColor: '#0F172A', cardColor: '#F8FAFC', cardBorderColor: '#E2E8F0' } },
  { id: 'cream', name: 'Warm Chalk & Cream', description: 'Eye-friendly soft cream with warm amber tones', theme: { backgroundColor: '#FAF9F5', textColor: '#1C1917', cardColor: '#FFFFFF', cardBorderColor: '#FDE68A' } },
  { id: 'sage', name: 'Cambridge Sage', description: 'Calming botanical green with crisp reading contrast', theme: { backgroundColor: '#F0FDF4', textColor: '#14532D', cardColor: '#FFFFFF', cardBorderColor: '#BBF7D0' } },
  { id: 'oxford', name: 'Oxford Royal', description: 'Collegiate crisp layout with royal sapphire highlights', theme: { backgroundColor: '#F8FAFC', textColor: '#1E293B', cardColor: '#FFFFFF', cardBorderColor: '#BFDBFE' } },
  { id: 'charcoal', name: 'Charcoal Focus', description: 'High-contrast dark theme for bright interactive boards', theme: { backgroundColor: '#18181B', textColor: '#F4F4F5', cardColor: '#27272A', cardBorderColor: '#3F3F46' } },
];

interface ThemePresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTheme: (theme: Partial<CanvasTheme>, applyToAll: boolean) => void;
}

export const ThemePresetsModal: React.FC<ThemePresetsModalProps> = ({
  isOpen, onClose, onApplyTheme,
}) => {
  const [selectedId, setSelectedId] = useState<string>('cream');
  if (!isOpen) return null;

  const current = THEME_PRESETS.find((t) => t.id === selectedId) || THEME_PRESETS[0];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in select-none">
      <div className="bg-white border border-stone-300 rounded-3xl max-w-lg w-full p-5 shadow-2xl text-stone-900 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-100 rounded-xl text-amber-800"><Palette className="w-5 h-5" /></span>
            <div><h3 className="text-sm font-black text-stone-900">Presentation Themes</h3><p className="text-[11px] text-stone-500">Choose cohesive colours, cards & borders</p></div>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 hover:bg-stone-100 rounded-xl text-stone-500 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>

        <div className="space-y-2">
          {THEME_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => setSelectedId(preset.id)}
              className={`p-3 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                selectedId === preset.id ? 'border-amber-600 bg-amber-50/60 shadow-xs' : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg border border-stone-300 flex items-center justify-center text-[10px] font-bold shadow-2xs" style={{ backgroundColor: preset.theme.backgroundColor, color: preset.theme.textColor }}>Aa</div>
                <div><div className="font-bold text-xs text-stone-900">{preset.name}</div><div className="text-[10.5px] text-stone-500">{preset.description}</div></div>
              </div>
              {selectedId === preset.id && <span className="p-1 bg-amber-600 text-white rounded-full"><Check className="w-3.5 h-3.5" /></span>}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
          <button type="button" onClick={() => { onApplyTheme(current.theme, false); onClose(); }} className="flex-1 py-2 px-3 rounded-xl border border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs cursor-pointer">Apply to this slide</button>
          <button type="button" onClick={() => { onApplyTheme(current.theme, true); onClose(); }} className="flex-1 py-2 px-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs cursor-pointer shadow-xs">Apply to all slides</button>
        </div>
      </div>
    </div>
  );
};

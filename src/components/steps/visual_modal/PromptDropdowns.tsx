import React from 'react';
import { Shuffle } from 'lucide-react';
import { PROMPT_OPTIONS } from './presetData';

export interface PromptSelections {
  subject: string; style: string; action: string; lighting: string;
  mood: string; palette: string; composition: string; technical: string;
  exaggeration: number; negatives: string[]; themeAware: boolean;
}

interface PromptDropdownsProps {
  selections: PromptSelections;
  onChange: (fn: (prev: PromptSelections) => PromptSelections) => void;
}

export const PromptDropdowns: React.FC<PromptDropdownsProps> = ({ selections, onChange }) => {
  const fields = [
    { key: 'subject', label: 'Subject / Persona', options: PROMPT_OPTIONS.subjects },
    { key: 'style', label: 'Artistic Style', options: PROMPT_OPTIONS.styles },
    { key: 'action', label: 'Action / Pose', options: PROMPT_OPTIONS.actions },
    { key: 'lighting', label: 'Lighting', options: PROMPT_OPTIONS.lighting },
    { key: 'mood', label: 'Mood / Atmosphere', options: PROMPT_OPTIONS.moods },
    { key: 'palette', label: 'Colour Palette', options: PROMPT_OPTIONS.palettes },
    { key: 'composition', label: 'Composition', options: PROMPT_OPTIONS.compositions },
    { key: 'technical', label: 'Technical Details', options: PROMPT_OPTIONS.technical },
  ] as const;

  const handleRandomize = () => {
    const pick = (arr: readonly string[]) => arr[Math.floor(Math.random() * arr.length)];
    onChange((p) => ({
      ...p,
      subject: pick(PROMPT_OPTIONS.subjects), style: pick(PROMPT_OPTIONS.styles),
      action: pick(PROMPT_OPTIONS.actions), lighting: pick(PROMPT_OPTIONS.lighting),
      mood: pick(PROMPT_OPTIONS.moods), palette: pick(PROMPT_OPTIONS.palettes),
      composition: pick(PROMPT_OPTIONS.compositions), technical: pick(PROMPT_OPTIONS.technical),
      exaggeration: Math.floor(Math.random() * 5) + 1,
    }));
  };

  return (
    <div className="space-y-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-bold text-[#2D2A26] text-base">Prompt Parameters</span>
        <button type="button" onClick={handleRandomize} className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-[#D97706] border border-[#D97706]/30 font-bold rounded-lg flex items-center gap-1.5 cursor-pointer text-sm">
          <Shuffle className="w-3.5 h-3.5" /> Randomize
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-xs font-semibold text-[#2D2A26]/80 mb-1">{f.label}</label>
            <select value={(selections as any)[f.key]} onChange={(e) => onChange((p) => ({ ...p, [f.key]: e.target.value }))} className="w-full bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-lg p-1.5 text-sm font-medium focus:outline-none">
              {f.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#2D2A26]/10">
        <div className="flex-1">
          <label className="block text-xs font-bold text-[#2D2A26]">Exaggeration / Absurdity: Stage {selections.exaggeration}</label>
          <input type="range" min="1" max="5" value={selections.exaggeration} onChange={(e) => onChange((p) => ({ ...p, exaggeration: Number(e.target.value) }))} className="w-full accent-[#D97706] cursor-pointer mt-1" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-[#2D2A26] bg-[#F8F6F0] px-3 py-1.5 rounded-lg border border-[#2D2A26]/15">
          <input type="checkbox" checked={selections.themeAware} onChange={(e) => onChange((p) => ({ ...p, themeAware: e.target.checked }))} className="accent-[#D97706] w-4 h-4" />
          <span>Theme-Aware Prompt</span>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-bold text-[#2D2A26]/80">Negatives:</span>
        {PROMPT_OPTIONS.negatives.map((neg) => {
          const active = selections.negatives.includes(neg);
          return (
            <button key={neg} type="button" onClick={() => onChange((p) => ({ ...p, negatives: active ? p.negatives.filter((n) => n !== neg) : [...p.negatives, neg] }))} className={`px-2.5 py-1 rounded-md text-xs border font-medium transition-colors cursor-pointer ${active ? 'bg-red-50 border-red-300 text-red-700 font-bold' : 'bg-[#F8F6F0] border-[#2D2A26]/15 text-[#2D2A26]/80'}`}>
              {active ? '✓ ' : '+ '}{neg}
            </button>
          );
        })}
      </div>
    </div>
  );
};

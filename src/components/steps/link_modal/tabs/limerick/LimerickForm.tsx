import React from 'react';
import { Sparkles, Feather, HelpCircle, Key, BookOpen } from 'lucide-react';
import { LimerickFormState, PoetryStyle } from './types';

interface Props {
  formState: LimerickFormState;
  onChange: (s: LimerickFormState) => void;
  onGenerate: () => void;
  generating: boolean;
}

const STYLES: { id: PoetryStyle; label: string }[] = [
  { id: 'limerick', label: 'Limerick' },
  { id: 'couplet', label: 'Couplet' },
  { id: 'ballad', label: 'Ballad' },
  { id: 'rap', label: 'Rap' }
];

export const LimerickForm: React.FC<Props> = ({ formState, onChange, onGenerate, generating }) => (
  <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-2xs space-y-3">
    <div className="flex items-center gap-2 border-b border-[#2D2A26]/10 pb-2">
      <Feather className="w-5 h-5 text-[#D97706]" />
      <div>
        <h3 className="text-sm font-bold text-[#2D2A26]">Limerick &amp; Rhyming Verse Maker</h3>
        <p className="text-[11px] text-[#2D2A26]/70">Craft memorable mnemonic verses for retention.</p>
      </div>
    </div>
    <div className="space-y-1">
      <label className="text-xs font-bold text-[#2D2A26] flex items-center gap-1"><BookOpen className="w-3 h-3 text-[#D97706]" /> Core Concept</label>
      <input type="text" value={formState.concept} onChange={(e) => onChange({ ...formState, concept: e.target.value })} placeholder="e.g. Photosynthesis" className="w-full px-3 py-1.5 rounded-xl bg-[#F8F6F0] border border-[#2D2A26]/15 text-xs text-[#2D2A26]" />
    </div>
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#2D2A26] flex items-center gap-1"><HelpCircle className="w-3 h-3 text-[#D97706]" /> Takeaway Goal</label>
      </div>
      <div className="grid grid-cols-3 gap-1 pb-0.5">
        {[
          'Who did it best',
          'What makes it work',
          'Where it applies',
          'When to use it',
          'Why it matters',
          'How it works'
        ].map((chip) => (
          <button key={chip} type="button" onClick={() => onChange({ ...formState, takeawayGoal: chip })} className="px-1.5 py-1 rounded-lg text-[10px] font-semibold bg-[#F8F6F0] text-[#2D2A26]/70 hover:text-[#D97706] border border-[#2D2A26]/10 cursor-pointer text-center truncate">+ {chip}</button>
        ))}
      </div>
      <input type="text" value={formState.takeawayGoal} onChange={(e) => onChange({ ...formState, takeawayGoal: e.target.value })} placeholder="e.g. Remember sunlight conversion" className="w-full px-3 py-1.5 rounded-xl bg-[#F8F6F0] border border-[#2D2A26]/15 text-xs text-[#2D2A26]" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div className="space-y-1">
        <label className="text-xs font-bold text-[#2D2A26] flex items-center gap-1"><Key className="w-3 h-3 text-[#D97706]" /> Mnemonic Acronym</label>
        <input type="text" value={formState.mnemonic} onChange={(e) => onChange({ ...formState, mnemonic: e.target.value })} placeholder="e.g. PEMDAS" className="w-full px-3 py-1.5 rounded-xl bg-[#F8F6F0] border border-[#2D2A26]/15 text-xs text-[#2D2A26]" />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold text-[#2D2A26]">Style</label>
        <div className="grid grid-cols-4 gap-1 bg-[#F8F6F0] p-1 rounded-xl border border-[#2D2A26]/10">
          {STYLES.map((st) => (
            <button key={st.id} type="button" onClick={() => onChange({ ...formState, style: st.id })} className={`py-1 px-1 rounded-lg text-[10px] font-semibold cursor-pointer transition-all text-center ${formState.style === st.id ? 'bg-white text-[#D97706] shadow-2xs font-bold border border-[#2D2A26]/10' : 'text-[#2D2A26]/70 hover:text-[#2D2A26]'}`}>{st.label}</button>
          ))}
        </div>
      </div>
    </div>
    <button type="button" disabled={generating || !formState.concept.trim() || !formState.takeawayGoal.trim()} onClick={onGenerate} className="w-full py-2 px-3 rounded-xl bg-[#2D2A26] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#2D2A26]/90 cursor-pointer disabled:opacity-50">
      <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
      {generating ? 'Composing 4 Verses...' : 'Generate 4 Verse Options ✨'}
    </button>
  </div>
);

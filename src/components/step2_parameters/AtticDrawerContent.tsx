import React from 'react';
import { Sparkles, Trash2, Plus } from 'lucide-react';
import { ModuleScheme } from '../../types';

interface AtticDrawerContentProps {
  moduleScheme: ModuleScheme;
  onUpdateScenario: (scenario: string) => void;
  onAddDeliverable: (item: string) => void;
  onRemoveDeliverable: (index: number) => void;
  onAddCriterion: (code: string) => void;
  onRemoveCriterion: (index: number) => void;
  onLookAgain: () => void;
}

export const AtticDrawerContent: React.FC<AtticDrawerContentProps> = ({
  moduleScheme, onUpdateScenario, onAddDeliverable, onRemoveDeliverable,
  onAddCriterion, onRemoveCriterion, onLookAgain,
}) => {
  const [newDeliv, setNewDeliv] = React.useState('');
  const [newCrit, setNewCrit] = React.useState('');

  const submitDeliv = () => {
    if (newDeliv.trim()) { onAddDeliverable(newDeliv.trim()); setNewDeliv(''); }
  };
  const submitCrit = () => {
    if (newCrit.trim()) { onAddCriterion(newCrit.trim().toUpperCase()); setNewCrit(''); }
  };

  return (
    <div className="pt-4 border-t border-[#2D2A26]/10 space-y-4 text-[#2D2A26]">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-[#2D2A26]">Vocational Scenario</label>
          {moduleScheme.hasBrief && (
            <button type="button" onClick={onLookAgain} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F59E0B]/20 hover:bg-[#F59E0B]/30 text-[#2D2A26] text-[11px] font-bold transition-colors cursor-pointer">
              <Sparkles className="w-3 h-3 text-[#F59E0B]" /> Look Again ✨
            </button>
          )}
        </div>
        <textarea
          value={moduleScheme.vocationalScenario}
          onChange={(e) => onUpdateScenario(e.target.value)}
          placeholder={moduleScheme.hasBrief ? "Refine vocational learning scenario or workplace context..." : "No syllabus uploaded. Type a vocational context or upload a brief in Step 1."}
          rows={2}
          className="w-full bg-white border border-[#2D2A26]/15 rounded-xl p-3 text-xs text-[#2D2A26] placeholder-[#2D2A26]/40 focus:outline-none focus:border-[#F59E0B] resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2 bg-white/70 border border-[#2D2A26]/10 rounded-xl p-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#2D2A26]">Required Deliverables ({moduleScheme.deliverables.length})</div>
          {moduleScheme.deliverables.length === 0 ? (
            <p className="text-[11px] text-[#2D2A26]/50 italic py-1">No deliverables listed yet.</p>
          ) : (
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {moduleScheme.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-white px-2 py-1 rounded border border-[#2D2A26]/10">
                  <span className="truncate text-[#2D2A26]">{item}</span>
                  <button type="button" onClick={() => onRemoveDeliverable(idx)} className="text-[#2D2A26]/40 hover:text-red-500 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-1.5 pt-1">
            <input type="text" value={newDeliv} onChange={(e) => setNewDeliv(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submitDeliv()} placeholder="Add deliverable..." className="flex-1 bg-white border border-[#2D2A26]/15 rounded px-2 py-1 text-xs text-[#2D2A26] placeholder-[#2D2A26]/40 focus:outline-none focus:border-[#F59E0B]" />
            <button type="button" onClick={submitDeliv} className="p-1.5 bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#2D2A26] rounded cursor-pointer transition-colors"><Plus className="w-3 h-3 stroke-[2.5]" /></button>
          </div>
        </div>

        <div className="space-y-2 bg-white/70 border border-[#2D2A26]/10 rounded-xl p-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#2D2A26]">Assessed Criteria ({moduleScheme.assessedCriteria.length})</div>
          {moduleScheme.assessedCriteria.length === 0 ? (
            <p className="text-[11px] text-[#2D2A26]/50 italic py-1">No assessed criteria specified.</p>
          ) : (
            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
              {moduleScheme.assessedCriteria.map((code, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-[#F59E0B]/50 text-[#2D2A26] text-xs font-semibold">
                  <span className="text-[#F59E0B] font-bold">{code}</span>
                  <button type="button" onClick={() => onRemoveCriterion(idx)} className="text-[#2D2A26]/40 hover:text-red-500 cursor-pointer"><Trash2 className="w-2.5 h-2.5" /></button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-1.5 pt-1">
            <input type="text" value={newCrit} onChange={(e) => setNewCrit(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submitCrit()} placeholder="e.g. P1, M2..." className="flex-1 bg-white border border-[#2D2A26]/15 rounded px-2 py-1 text-xs text-[#2D2A26] placeholder-[#2D2A26]/40 focus:outline-none focus:border-[#F59E0B]" />
            <button type="button" onClick={submitCrit} className="p-1.5 bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#2D2A26] rounded cursor-pointer transition-colors"><Plus className="w-3 h-3 stroke-[2.5]" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useMemo } from 'react';
import { Compass, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  concept: string; contextScript?: string; selectedWorkflow: string; customWorkflow: string;
  onSelectWorkflow: (wf: string) => void; onCustomWorkflowChange: (val: string) => void;
  onProceedToGenerate: () => void; isGenerating?: boolean;
}

export const ProcessFinderCard: React.FC<Props> = ({
  concept, contextScript, selectedWorkflow, customWorkflow,
  onSelectWorkflow, onCustomWorkflowChange, onProceedToGenerate, isGenerating,
}) => {
  const suggested = useMemo(() => [
    `5-Phase Investigation Loop for ${concept || 'Topic'}`,
    `Sequential Problem-Solving & Evaluation Protocol`,
    `Observation, Hypothesis & Verification Workflow`,
    `Curriculum Recall & Diagnostic Revision Framework`,
  ], [concept]);

  const activeSelection = customWorkflow.trim() || selectedWorkflow;

  return (
    <div className="bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl p-4 space-y-3 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2D2A26]/10 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-amber-500/10 text-[#D97706]"><Compass className="w-4 h-4" /></div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#2D2A26]">Identify Target System or Workflow</h4>
            <p className="text-[11px] text-[#2D2A26]/70">Anchor mnemonic to an authentic curriculum procedure</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100/80 text-[#B45309] border border-[#F59E0B]/30">
          Concept: {concept || 'General Topic'}
        </span>
      </div>

      {contextScript && (
        <div className="bg-white/80 border border-[#2D2A26]/10 rounded-md p-2 text-[11px] text-[#2D2A26]/80 italic line-clamp-2">
          "{contextScript}"
        </div>
      )}

      <div className="space-y-1.5">
        <label className="block text-[11px] font-semibold text-[#2D2A26]">Suggested Classroom Processes</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {suggested.map((wf) => {
            const isSel = selectedWorkflow === wf && !customWorkflow.trim();
            return (
              <button key={wf} type="button" onClick={() => { onSelectWorkflow(wf); onCustomWorkflowChange(''); }}
                className={`text-left p-2 rounded-lg text-xs border transition-all cursor-pointer flex items-start gap-1.5 ${
                  isSel ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-400'
                        : 'bg-white border-[#2D2A26]/15 text-[#2D2A26]/80 hover:border-[#F59E0B]'}`}>
                <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isSel ? 'text-emerald-600' : 'text-[#2D2A26]/30'}`} />
                <span className="line-clamp-2 leading-tight">{wf}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-[11px] font-semibold text-[#2D2A26]">Or Custom Classroom Procedure</label>
        <input type="text" value={customWorkflow} onChange={(e) => onCustomWorkflowChange(e.target.value)}
          placeholder="e.g. 5 steps of cellular respiration, PEMDAS order of operations..."
          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#2D2A26]/20 bg-white text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]" />
      </div>

      <div className="flex justify-end pt-1">
        <button type="button" disabled={!activeSelection || isGenerating} onClick={onProceedToGenerate}
          className="px-3.5 py-1.5 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-50 text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer">
          <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Synthesising...' : 'Craft Memorable Acronyms'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

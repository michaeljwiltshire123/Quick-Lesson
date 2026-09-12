import React from 'react';
import { ListOrdered, Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { LearningProgressionStepRow } from './LearningProgressionStepRow';

interface LearningProgressionProps {
  learningObjectives: string[];
  onUpdateObjective: (index: number, val: string) => void;
  onAddObjective: (val?: string) => void;
  onRemoveObjective: (index: number) => void;
  onClearObjectives: () => void;
  onGenerateSequence: () => Promise<void>;
  isGeneratingSequence?: boolean;
}

export const LearningProgression: React.FC<LearningProgressionProps> = ({
  learningObjectives, onUpdateObjective, onAddObjective, onRemoveObjective,
  onClearObjectives, onGenerateSequence, isGeneratingSequence = false,
}) => (
  <section id="tour-learning-progression" className="w-full bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
    <div className="space-y-4">
      <header className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2D2A26] text-[#F59E0B] flex items-center justify-center shrink-0">
            <ListOrdered className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#2D2A26]">Learning Progression & Sequencing</h3>
            <p className="text-xs text-[#2D2A26]/70">Define step-by-step milestones or select from suggestions.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onGenerateSequence}
            disabled={isGeneratingSequence}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#2D2A26] text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGeneratingSequence ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />}
            <span>{isGeneratingSequence ? 'Generating...' : 'Generate Sequence ✨'}</span>
          </button>
          {learningObjectives.length > 0 && (
            <button
              type="button"
              onClick={onClearObjectives}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold inline-flex items-center gap-1 cursor-pointer pl-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </header>
      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {learningObjectives.length === 0 ? (
          <div className="p-6 text-center border border-dashed border-[#2D2A26]/20 rounded-xl bg-white/60 space-y-2">
            <p className="text-xs font-semibold text-[#2D2A26]">Empty Progression Canvas</p>
            <p className="text-[11px] text-[#2D2A26]/60">
              Click <strong>&quot;Generate Sequence ✨&quot;</strong> above to build a custom 3–6 step progression.
            </p>
          </div>
        ) : (
          learningObjectives.map((step, idx) => (
            <LearningProgressionStepRow
              key={idx} step={step} index={idx}
              onUpdate={onUpdateObjective} onRemove={onRemoveObjective}
            />
          ))
        )}
      </div>
    </div>
    <div className="pt-2 border-t border-[#2D2A26]/10 flex items-center justify-between">
      <button
        type="button"
        onClick={() => onAddObjective('')}
        className="inline-flex items-center gap-1 text-xs font-bold text-[#2D2A26] hover:text-[#F59E0B] transition-colors cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Add Custom Step</span>
      </button>
      <span className="text-[11px] text-[#2D2A26]/60">
        {learningObjectives.length} {learningObjectives.length === 1 ? 'step' : 'steps'} configured
      </span>
    </div>
  </section>
);

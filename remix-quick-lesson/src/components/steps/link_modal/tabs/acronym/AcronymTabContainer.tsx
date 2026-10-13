import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { LessonChunk, ChunkAttachment } from '../../../../../types';
import { AcronymFormState, AcronymItem } from './types';
import { ProcessFinderCard } from './ProcessFinderCard';
import { AcronymOptionCard } from './AcronymOptionCard';
import { generateAcronymsApi } from './acronymGenerator';

interface Props {
  activeChunk?: LessonChunk; slideTitle?: string; subject?: string; gradeLevel?: string;
  onAddAttachment?: (att: Partial<ChunkAttachment>) => void; onUpdateChunk?: (updated: LessonChunk) => void;
  onSendToLimerick?: (item: AcronymItem, workflow?: string) => void;
}

export const AcronymTabContainer: React.FC<Props> = ({
  activeChunk, slideTitle, subject, gradeLevel, onAddAttachment, onUpdateChunk, onSendToLimerick,
}) => {
  const [formState, setFormState] = useState<AcronymFormState>({
    concept: activeChunk?.title || slideTitle || '',
    contextScript: activeChunk?.teacherScript || activeChunk?.coreExplanation || '',
    selectedWorkflow: '', customWorkflow: '',
  });
  const [wizardStep, setWizardStep] = useState<'workflow' | 'acronyms'>('workflow');
  const [items, setItems] = useState<AcronymItem[]>([]);
  const [generating, setGenerating] = useState(false);
  const [attachedIds, setAttachedIds] = useState<string[]>([]);

  const handleGenerate = async () => {
    setGenerating(true);
    const results = await generateAcronymsApi(formState, subject, gradeLevel);
    setItems(results);
    setGenerating(false);
    setWizardStep('acronyms');
  };

  const handleAttach = (item: AcronymItem) => {
    onAddAttachment?.({
      id: `att-acronym-${Date.now()}`,
      name: `Mnemonic Acronym: ${item.word} (${item.meaning})`,
      type: 'document', platform: 'other', udlPathway: 'all',
      questSteps: item.breakdown.map((b) => `${b.letter}: ${b.term} - ${b.explanation}`),
    });
    setAttachedIds((prev) => [...prev, item.id]);
    if (activeChunk && onUpdateChunk) {
      const cues = activeChunk.retrievalCues ? `${activeChunk.retrievalCues}; [Acronym: ${item.word}]` : `[Acronym: ${item.word}]`;
      onUpdateChunk({ ...activeChunk, retrievalCues: cues });
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-4">
      {wizardStep === 'workflow' ? (
        <ProcessFinderCard
          concept={formState.concept} contextScript={formState.contextScript}
          selectedWorkflow={formState.selectedWorkflow} customWorkflow={formState.customWorkflow}
          onSelectWorkflow={(wf) => setFormState((p) => ({ ...p, selectedWorkflow: wf }))}
          onCustomWorkflowChange={(val) => setFormState((p) => ({ ...p, customWorkflow: val }))}
          onProceedToGenerate={handleGenerate} isGenerating={generating}
        />
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl p-3 shadow-2xs">
            <button type="button" onClick={() => setWizardStep('workflow')}
              className="px-2.5 py-1.5 rounded-lg border border-[#2D2A26]/15 bg-white text-xs font-semibold text-[#2D2A26] flex items-center gap-1.5 hover:bg-black/5 cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Workflows
            </button>
            <div className="text-xs font-bold text-[#2D2A26] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>4 Tailored Educational Acronyms</span>
            </div>
            <button type="button" onClick={handleGenerate} disabled={generating}
              className="px-2.5 py-1.5 rounded-lg bg-[#F59E0B] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#D97706] disabled:opacity-50 cursor-pointer">
              <RotateCcw className={`w-3.5 h-3.5 ${generating ? 'animate-spin' : ''}`} /> Re-synthesise
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {items.map((it) => (
              <AcronymOptionCard key={it.id} item={it} onAttach={handleAttach} isAttached={attachedIds.includes(it.id)}
                onSendToLimerick={(item) => {
                  handleAttach(item);
                  const activeWf = formState.customWorkflow.trim() || formState.selectedWorkflow.trim();
                  onSendToLimerick?.(item, activeWf);
                }}
                onUpdateItem={(up) => setItems((p) => p.map((x) => (x.id === up.id ? up : x)))} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

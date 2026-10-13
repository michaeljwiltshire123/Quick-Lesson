import React, { useState, useEffect } from 'react';
import { Check, Send, Play, Smartphone } from 'lucide-react';
import { LessonChunk, ChunkAttachment } from '../../../../../types';
import { PollFormState, PollSuggestion, PollType } from './types';
import { createDefaultOptions, fetchPollSuggestions } from './pollGenerator';
import { PollTypeSelector } from './PollTypeSelector';
import { PollFormControls } from './PollFormControls';
import { AiPollSuggestionsBar } from './AiPollSuggestionsBar';
import { TeacherLivePollView } from './live_present';
import { StudentPollViewContainer } from './student_view';

interface Props {
  activeChunk?: LessonChunk; slideTitle?: string; subject?: string;
  gradeLevel?: string; onAddAttachment?: (att: Partial<ChunkAttachment>) => void;
  onUpdateChunk?: (updated: LessonChunk) => void;
}

export const InteractivePollTabContainer: React.FC<Props> = ({
  activeChunk, slideTitle, subject, gradeLevel, onAddAttachment, onUpdateChunk,
}) => {
  const concept = activeChunk?.title || slideTitle || 'Diagnostic Assessment';
  const [formState, setFormState] = useState<PollFormState>({
    question: `Which fundamental principle governs ${concept}?`,
    pollType: PollType.Single, options: createDefaultOptions(PollType.Single),
    timerSeconds: 30, isAnonymous: false, isBlindVoting: true,
    enableConfidenceMeter: true,
    misconceptionExplainer: `Examines core causation versus superficial correlation in ${concept}.`,
  });
  const [suggestions, setSuggestions] = useState<PollSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAttached, setIsAttached] = useState(false);
  const [viewMode, setViewMode] = useState<'edit' | 'live' | 'student'>('edit');

  const loadSuggestions = async () => {
    setIsLoading(true);
    const data = await fetchPollSuggestions(concept, subject, gradeLevel);
    setSuggestions(data);
    setIsLoading(false);
  };

  useEffect(() => { loadSuggestions(); }, [concept]);

  const handleSelectSuggestion = (s: PollSuggestion) => {
    setFormState((p) => ({
      ...p, question: s.question, pollType: s.pollType, misconceptionExplainer: s.misconceptionExplainer,
      options: s.options.map((t, i) => ({ id: `sugg-${i}`, text: t })),
    }));
  };

  const handleAttach = () => {
    onAddAttachment?.({
      id: `att-poll-${Date.now()}`, name: `Interactive Poll: ${formState.question.slice(0, 40)}`,
      type: 'quiz', platform: 'other', udlPathway: 'all', cfuPrompt: formState.question,
      questSteps: formState.options.map((o) => o.text),
    });
    if (activeChunk && onUpdateChunk) {
      const timer = formState.timerSeconds ? `${formState.timerSeconds}s timer` : 'Untimed';
      onUpdateChunk({
        ...activeChunk, formativeTaskBadge: 'Live Poll', formativeTaskGrouping: 'Whole Class',
        formativeTaskTitle: formState.question,
        formativeTaskDetails: `${formState.pollType.toUpperCase()} • ${formState.options.length} opts • ${timer}`,
      });
    }
    setIsAttached(true);
  };

  if (viewMode === 'live') {
    return <TeacherLivePollView pollConfig={formState} onClose={() => setViewMode('edit')} activeChunk={activeChunk} onAddAttachment={onAddAttachment} onUpdateChunk={onUpdateChunk} />;
  }
  if (viewMode === 'student') return <StudentPollViewContainer pollConfig={formState} onClose={() => setViewMode('edit')} />;

  return (
    <div className="space-y-3.5 max-w-3xl mx-auto pb-4">
      <AiPollSuggestionsBar suggestions={suggestions} isLoading={isLoading} onRefresh={loadSuggestions} onSelectSuggestion={handleSelectSuggestion} />
      <PollTypeSelector selectedType={formState.pollType} onSelectType={(type) => setFormState((p) => ({ ...p, pollType: type, options: createDefaultOptions(type) }))} />
      <PollFormControls formState={formState} onChange={(patch) => setFormState((p) => ({ ...p, ...patch }))} />
      <div className="flex items-center justify-between pt-2">
        {isAttached ? (
          <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" /> Attached
          </div>
        ) : <div />}
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setViewMode('student')} className="px-3 py-2 bg-white hover:bg-black/5 text-[#2D2A26] border border-[#2D2A26]/20 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer">
            <Smartphone className="w-3.5 h-3.5 text-[#D97706]" /> Pupil View
          </button>
          <button type="button" onClick={() => setViewMode('live')} className="px-3 py-2 bg-white hover:bg-black/5 text-[#2D2A26] border border-[#2D2A26]/20 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer">
            <Play className="w-3.5 h-3.5 text-[#D97706]" /> Live Mode
          </button>
          <button type="button" onClick={handleAttach} className="px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-colors">
            <Send className="w-3.5 h-3.5" /> Attach Live Poll
          </button>
        </div>
      </div>
    </div>
  );
};

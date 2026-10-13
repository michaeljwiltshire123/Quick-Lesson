import React, { useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { ModuleScheme } from '../../types';
import { buildBriefProgressions } from './briefProgressionBuilder';
import { ProgressionSuggestionItem } from './ProgressionSuggestionItem';

interface ProgressionSuggestionsProps {
  onSelectSuggestion: (label: string) => void;
  selectedLabels?: string[]; lessonTitle?: string; subject?: string; gradeLevel?: string;
  learningObjectives?: string[]; moduleScheme?: ModuleScheme;
}

export const ProgressionSuggestions: React.FC<ProgressionSuggestionsProps> = ({
  onSelectSuggestion, selectedLabels = [], lessonTitle = '', subject = '', gradeLevel = '',
  learningObjectives = [], moduleScheme,
}) => {
  const [hasClickedGenerate, setHasClickedGenerate] = useState<boolean>(false);
  const items = useMemo(() => buildBriefProgressions(lessonTitle, subject, learningObjectives, moduleScheme || {
    courseTitle: '', unitName: '', planningWeek: 1, unitDurationWeeks: 1, vocationalScenario: '',
    deliverables: [], assessedCriteria: [], hasBrief: false,
  }), [lessonTitle, subject, learningObjectives, moduleScheme]);
  const handleGenerateClick = () => { if (items.length) setHasClickedGenerate(true); };
  const isTitleEmpty = !lessonTitle.trim();

  return (
    <aside id="tour-progression-suggestions" className="w-full bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-2xl p-5 text-[#2D2A26] shadow-xs flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <header className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
          <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#F59E0B]" /><h3 className="text-sm font-bold text-[#2D2A26]">Lesson progression suggestions</h3></div>
          {hasClickedGenerate && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#2D2A26] flex items-center gap-1">
              <span>{items.length} Subtopics</span>
            </span>
          )}
        </header>
        {!hasClickedGenerate ? (
          <div className="py-8 text-center border border-dashed border-[#2D2A26]/20 rounded-xl bg-white/60 space-y-3 px-4">
            <p className="text-xs font-semibold text-[#2D2A26]">No Suggestions Generated Yet</p>
            <p className="text-[11px] text-[#2D2A26]/60 leading-normal">{isTitleEmpty ? 'Add a lesson title to see suggestions based on your brief.' : 'Prepare brief-based learning focuses instantly, without external AI calls.'}</p>
            <button type="button" onClick={handleGenerateClick} disabled={!items.length} className="w-full py-2.5 px-4 bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-40 disabled:cursor-not-allowed text-[#2D2A26] font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-2xs flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /><span>Show brief-based suggestions</span>
            </button>
          </div>
        ) : (
          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {items.map((item, idx) => (<ProgressionSuggestionItem key={item.id} item={item} index={idx} isAdded={selectedLabels.includes(item.label)} onSelect={onSelectSuggestion} />))}
          </div>
        )}
      </div>
      <div className="pt-2 border-t border-[#2D2A26]/10 flex items-center justify-between text-[11px] text-[#2D2A26]/60">
        <span>{hasClickedGenerate ? 'Derived from lesson and unit brief' : 'Prepared locally; no AI call'}</span><span>Hover (i) for Definition</span>
      </div>
    </aside>
  );
};

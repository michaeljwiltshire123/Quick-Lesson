import React, { useEffect, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { ProgressionItem } from './progressionData';
import { ProgressionSuggestionItem } from './ProgressionSuggestionItem';

interface ProgressionSuggestionsProps {
  onSelectSuggestion: (label: string) => void;
  selectedLabels?: string[]; lessonTitle?: string; subject?: string; gradeLevel?: string;
}

export const ProgressionSuggestions: React.FC<ProgressionSuggestionsProps> = ({
  onSelectSuggestion, selectedLabels = [], lessonTitle = '', subject = '', gradeLevel = '',
}) => {
  const [items, setItems] = useState<ProgressionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasClickedGenerate, setHasClickedGenerate] = useState<boolean>(false);

  useEffect(() => {
    if (!hasClickedGenerate) return;
    const trimmed = lessonTitle.trim();
    if (!trimmed) { setItems([]); return; }
    let mounted = true;
    setLoading(true);
    fetch('/api/generate-progression-suggestions', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonTitle: trimmed, subject: subject || 'General', gradeLevel: gradeLevel || 'Key Stage 3', currentObjectives: selectedLabels }),
    })
      .then((res) => res.ok && (res.headers.get('content-type') || '').includes('application/json') ? res.json() : null)
      .then((data) => {
        if (!mounted) return;
        const rawList = data?.data?.items || data?.items;
        if (Array.isArray(rawList) && rawList.length > 0) {
          setItems(rawList.map((it: any, idx: number) => ({
            id: String(idx + 1), label: it.label || it.title || `Subtopic ${idx + 1}`,
            tooltip: it.tooltip || it.definition || 'Curriculum subtopic concept.', category: it.category || 'Curriculum',
          })));
        } else { setItems([]); }
      })
      .catch(() => { if (mounted) setItems([]); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [hasClickedGenerate, lessonTitle, subject, gradeLevel, selectedLabels]);

  const handleGenerateClick = () => { if (lessonTitle.trim().length > 0) setHasClickedGenerate(true); };
  const isTitleEmpty = !lessonTitle.trim();

  return (
    <aside id="tour-progression-suggestions" className="w-full bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-2xl p-5 text-[#2D2A26] shadow-xs flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <header className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
          <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#F59E0B]" /><h3 className="text-sm font-bold text-[#2D2A26]">AI Progression suggestions</h3></div>
          {hasClickedGenerate && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#2D2A26] flex items-center gap-1">
              {loading && <Loader2 className="w-2.5 h-2.5 animate-spin" />}<span>{items.length} Subtopics</span>
            </span>
          )}
        </header>
        {!hasClickedGenerate ? (
          <div className="py-8 text-center border border-dashed border-[#2D2A26]/20 rounded-xl bg-white/60 space-y-3 px-4">
            <p className="text-xs font-semibold text-[#2D2A26]">No Suggestions Generated Yet</p>
            <p className="text-[11px] text-[#2D2A26]/60 leading-normal">{isTitleEmpty ? 'Please enter a lesson title in the form to enable AI suggestions.' : 'Generate 20 custom academic and industry-level subtopics for this lesson.'}</p>
            <button type="button" onClick={handleGenerateClick} disabled={isTitleEmpty || loading} className="w-full py-2.5 px-4 bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-40 disabled:cursor-not-allowed text-[#2D2A26] font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-2xs flex items-center justify-center gap-1.5">
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}<span>Generate Suggestions ✨</span>
            </button>
          </div>
        ) : (
          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {items.map((item, idx) => (<ProgressionSuggestionItem key={item.id} item={item} index={idx} isAdded={selectedLabels.includes(item.label)} onSelect={onSelectSuggestion} />))}
          </div>
        )}
      </div>
      <div className="pt-2 border-t border-[#2D2A26]/10 flex items-center justify-between text-[11px] text-[#2D2A26]/60">
        <span>{hasClickedGenerate ? 'AI Custom Generated' : 'Pending Generation'}</span><span>Hover (i) for Definition</span>
      </div>
    </aside>
  );
};

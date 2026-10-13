import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Plus, Feather } from 'lucide-react';
import { AcronymItem, LetterBreakdown } from './types';

interface Props {
  item: AcronymItem;
  onUpdateItem: (updated: AcronymItem) => void;
  onAttach: (item: AcronymItem) => void;
  onSendToLimerick?: (item: AcronymItem) => void;
  isAttached?: boolean;
}

export const AcronymOptionCard: React.FC<Props> = ({ item, onUpdateItem, onAttach, onSendToLimerick, isAttached }) => {
  const [expanded, setExpanded] = useState(true);

  const handleTermChange = (idx: number, newTerm: string) => {
    const nextBreakdown: LetterBreakdown[] = item.breakdown.map((b, i) =>
      i === idx ? { ...b, term: newTerm } : b
    );
    const newMeaning = nextBreakdown.map((b) => b.term).join(', ');
    onUpdateItem({ ...item, breakdown: nextBreakdown, meaning: newMeaning });
  };

  const handleExplanationChange = (idx: number, newExp: string) => {
    const nextBreakdown = item.breakdown.map((b, i) => (i === idx ? { ...b, explanation: newExp } : b));
    onUpdateItem({ ...item, breakdown: nextBreakdown });
  };

  return (
    <div className="bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl p-3.5 space-y-3 shadow-2xs hover:border-[#F59E0B]/50 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-0.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl font-black tracking-widest text-[#D97706] font-mono px-2.5 py-0.5 bg-amber-100/70 border border-[#F59E0B]/40 rounded-lg">
              {item.word}
            </span>
            <span className="text-xs font-semibold text-[#2D2A26] truncate">{item.meaning}</span>
          </div>
          {item.rationale && <p className="text-[11px] text-[#2D2A26]/65 italic">{item.rationale}</p>}
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <div className="flex items-center gap-1.5">
            <button type="button" onClick={() => setExpanded(!expanded)}
              className="p-1 text-[#2D2A26]/60 hover:text-[#2D2A26] rounded-md hover:bg-black/5 cursor-pointer">
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button type="button" onClick={() => onAttach(item)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-2xs ${
                isAttached ? 'bg-emerald-600 text-white' : 'bg-[#F59E0B] hover:bg-[#D97706] text-white'
              }`}>
              {isAttached ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{isAttached ? 'Attached' : 'Attach Acronym'}</span>
            </button>
          </div>
          {onSendToLimerick && (
            <button type="button" onClick={() => onSendToLimerick(item)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white hover:bg-amber-50 text-[#D97706] border border-[#F59E0B]/50 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all hover:border-[#D97706]">
              <Feather className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Send to Rhyme &amp; Limerick</span>
            </button>
          )}
        </div>
      </div>

      {expanded && (
        <div className="space-y-1.5 pt-1 border-t border-[#2D2A26]/10">
          <div className="flex items-center justify-between text-[10px] font-semibold text-[#2D2A26]/60 uppercase tracking-wider px-1">
            <span>Letter Breakdown &amp; Inline Term Editor</span>
            <span>Refine steps prior to attaching</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {item.breakdown.map((b, idx) => (
              <div key={idx} className="bg-white border border-[#2D2A26]/10 rounded-lg p-2 flex items-start gap-2 shadow-2xs">
                <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-500/30 flex items-center justify-center font-bold font-mono text-xs shrink-0 mt-0.5">
                  {b.letter}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <input type="text" value={b.term} onChange={(e) => handleTermChange(idx, e.target.value)}
                    className="w-full text-xs font-bold text-[#2D2A26] border-b border-transparent focus:border-[#F59E0B] focus:outline-none bg-transparent px-0.5" />
                  <input type="text" value={b.explanation} onChange={(e) => handleExplanationChange(idx, e.target.value)}
                    placeholder="Classroom action or cue..."
                    className="w-full text-[11px] text-[#2D2A26]/70 border-b border-transparent focus:border-[#F59E0B] focus:outline-none bg-transparent px-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

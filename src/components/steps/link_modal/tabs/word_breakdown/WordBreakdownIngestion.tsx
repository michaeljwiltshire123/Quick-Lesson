import React, { useState } from 'react';
import { Plus, ArrowRight, Sparkles, BookOpen, Loader2 } from 'lucide-react';
import { WordBreakdownItem } from './types';
import { createBreakdownItem } from './morphologyHelper';
import { WordIngestionRow } from './WordIngestionRow';

interface Props {
  items: WordBreakdownItem[];
  onUpdateItems: (items: WordBreakdownItem[]) => void;
  onProceed: () => void;
  activeChunkTitle?: string;
  onAnalyseConcept?: () => void;
  analysing?: boolean;
  generating?: boolean;
}

export const WordBreakdownIngestion: React.FC<Props> = ({
  items, onUpdateItems, onProceed, activeChunkTitle, onAnalyseConcept, analysing, generating
}) => {
  const [customTerm, setCustomTerm] = useState('');
  const handleAddTerm = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!customTerm.trim()) return;
    onUpdateItems([...items, createBreakdownItem(customTerm)]);
    setCustomTerm('');
  };
  const selectedCount = items.filter(it => it.selected).length;

  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-[#D97706]/20 rounded-2xl p-3 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-[#D97706]">
            <BookOpen className="w-4 h-4" />
            <h3 className="text-xs sm:text-sm font-bold text-[#2D2A26]">Concept Vocabulary Ingestion</h3>
          </div>
          <p className="text-[11px] text-[#2D2A26]/80 mt-0.5">Targeting difficult terms for {activeChunkTitle ? `"${activeChunkTitle}"` : 'active concept'}.</p>
        </div>
        {onAnalyseConcept && (
          <button type="button" onClick={onAnalyseConcept} disabled={analysing || generating} className="px-2.5 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 border border-[#D97706]/30 text-[#92400E] rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors disabled:opacity-50">
            {analysing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />}
            {analysing ? 'Analysing...' : '✨ Auto-Analyse Concept'}
          </button>
        )}
      </div>

      <form onSubmit={handleAddTerm} className="flex gap-2">
        <input type="text" value={customTerm} onChange={(e) => setCustomTerm(e.target.value)} placeholder="Add custom difficult vocabulary term..." className="flex-1 bg-white border border-[#2D2A26]/15 rounded-xl px-3 py-1.5 text-xs text-[#2D2A26] placeholder-[#2D2A26]/40 focus:outline-none focus:border-[#D97706]" />
        <button type="button" onClick={() => handleAddTerm()} className="px-3 py-1.5 bg-white hover:bg-amber-50 border border-[#2D2A26]/15 text-[#2D2A26] rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-2xs transition-colors shrink-0">
          <Plus className="w-3.5 h-3.5 text-[#D97706]" /> Add Term
        </button>
      </form>

      <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
        {items.length === 0 ? (
          <div className="p-4 text-center rounded-2xl border border-dashed border-[#2D2A26]/20 bg-[#F8F6F0]/60 text-[#2D2A26]/70 space-y-1">
            <p className="text-xs font-semibold">No vocabulary terms ingested yet for this concept card.</p>
            <p className="text-[11px] text-[#2D2A26]/60">Click "Auto-Analyse Concept" above or type a word to extract difficult terms.</p>
          </div>
        ) : (
          items.map(item => (
            <WordIngestionRow key={item.id} item={item} onToggleSelect={(id) => onUpdateItems(items.map(it => it.id === id ? { ...it, selected: !it.selected } : it))} onRemove={(id) => onUpdateItems(items.filter(it => it.id !== id))} />
          ))
        )}
      </div>

      <div className="pt-2 flex items-center justify-between border-t border-[#2D2A26]/10">
        <span className="text-xs text-[#2D2A26]/70">{selectedCount} of {items.length} terms selected</span>
        <button type="button" disabled={selectedCount === 0 || generating} onClick={onProceed} className="px-4 py-2 bg-[#D97706] hover:bg-[#B45309] disabled:opacity-40 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors">
          {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {generating ? 'Creating Visual Puzzles...' : 'Create Visual Puzzles'}
          {!generating && <ArrowRight className="w-4 h-4 ml-0.5" />}
        </button>
      </div>
    </div>
  );
};

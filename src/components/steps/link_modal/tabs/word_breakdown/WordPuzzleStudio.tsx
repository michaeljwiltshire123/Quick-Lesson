import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Check, Sparkles, Puzzle } from 'lucide-react';
import { WordBreakdownItem, ClueType } from './types';
import { WordPuzzleCard } from './WordPuzzleCard';
import { WhiteboardSyncBadge } from './WhiteboardSyncBadge';

interface Props {
  items: WordBreakdownItem[];
  onUpdateClueType: (id: string, type: ClueType) => void;
  onUpdateImage?: (id: string, url: string) => void;
  onBackToIngestion: () => void;
  onAttachPuzzleResources?: () => void;
  attached?: boolean;
  slideTitle?: string;
  whiteboardAttached?: boolean;
  onToggleWhiteboard?: (val: boolean) => void;
}

export const WordPuzzleStudio: React.FC<Props> = ({
  items, onUpdateClueType, onUpdateImage, onBackToIngestion, onAttachPuzzleResources, attached,
  slideTitle, whiteboardAttached = false, onToggleWhiteboard
}) => {
  const [globalRevealed, setGlobalRevealed] = useState<boolean | undefined>(undefined);
  const activeItems = items.filter(it => it.selected !== false);
  const toggleAll = () => setGlobalRevealed(prev => prev === true ? false : true);

  return (
    <div className="space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-[#D97706]/20 rounded-2xl p-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#D97706]/15 rounded-xl text-[#D97706]"><Puzzle className="w-5 h-5" /></div>
          <div>
            <h3 className="text-sm font-bold text-[#2D2A26]">Classroom Visual Puzzle Studio</h3>
            <p className="text-xs text-[#2D2A26]/75">{activeItems.length} active curriculum puzzles</p>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleAll}
          className="px-3 py-1.5 bg-white border border-[#2D2A26]/15 hover:bg-amber-50 rounded-xl text-xs font-bold text-[#2D2A26] flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
        >
          {globalRevealed ? <EyeOff className="w-3.5 h-3.5 text-[#D97706]" /> : <Eye className="w-3.5 h-3.5 text-[#D97706]" />}
          {globalRevealed ? 'Conceal All' : 'Reveal All'}
        </button>
      </div>

      {onToggleWhiteboard && (
        <WhiteboardSyncBadge
          isAttached={whiteboardAttached}
          termCount={activeItems.length}
          onToggleAttach={onToggleWhiteboard}
          slideTitle={slideTitle}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
        {activeItems.map(item => (
          <WordPuzzleCard
            key={item.id}
            item={item}
            onUpdateClueType={onUpdateClueType}
            onUpdateImage={onUpdateImage}
            globalRevealed={globalRevealed}
          />
        ))}
      </div>

      <div className="pt-2.5 flex items-center justify-between border-t border-[#2D2A26]/10">
        <button
          type="button"
          onClick={onBackToIngestion}
          className="px-3.5 py-2 bg-white hover:bg-[#F8F6F0] border border-[#2D2A26]/15 text-[#2D2A26] rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Edit Terms &amp; Morphology
        </button>

        {onAttachPuzzleResources && (
          <button
            type="button"
            onClick={onAttachPuzzleResources}
            disabled={attached}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors ${
              attached ? 'bg-emerald-600 text-white cursor-default' : 'bg-[#D97706] hover:bg-[#B45309] text-white'
            }`}
          >
            {attached ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            {attached ? 'Puzzles Attached' : 'Attach to Lesson Materials'}
          </button>
        )}
      </div>
    </div>
  );
};

import React, { useRef, useEffect } from 'react';
import { DiscussionStarterCard } from '../../types/starterCard';
import { PromptTextBox } from './PromptTextBox';
import { Check, Plus, Trash2 } from 'lucide-react';

interface StarterConceptCardProps {
  card: DiscussionStarterCard;
  activeChunkId: string;
  isHighlighted?: boolean;
  onUpdateCard: (updated: DiscussionStarterCard) => void;
  onToggleAttach: (cardId: string, chunkId: string) => void;
  onDeleteCard: (cardId: string) => void;
}

export const StarterConceptCard: React.FC<StarterConceptCardProps> = ({
  card,
  activeChunkId,
  isHighlighted = false,
  onUpdateCard,
  onToggleAttach,
  onDeleteCard,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isAttached = card.milestoneChunkId === activeChunkId;
  const isTrueCard = card.formatType === 'true_false';
  const isTrueVal = card.isTrue === true;

  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isHighlighted]);

  const handlePromptChange = (newPrompt: string) => {
    onUpdateCard({ ...card, promptText: newPrompt });
  };

  const cardBorderColor = isHighlighted
    ? 'border-2 border-[#F59E0B] ring-4 ring-[#F59E0B]/30 shadow-lg scale-[1.02]'
    : isTrueCard
    ? isTrueVal
      ? 'border-l-4 border-l-emerald-500 border-[#2D2A26]/15'
      : 'border-l-4 border-l-rose-500 border-[#2D2A26]/15'
    : 'border-[#2D2A26]/15';

  return (
    <div
      ref={cardRef}
      className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between relative group ${cardBorderColor}`}
    >
      <button
        onClick={() => onDeleteCard(card.id)}
        className="absolute top-3 right-3 p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-70 group-hover:opacity-100 cursor-pointer"
        title="Delete card"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          {isTrueCard && (
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${
                isTrueVal
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-rose-100 text-rose-800 border-rose-300'
              }`}
            >
              {isTrueVal ? 'True Statement' : 'False Statement'}
            </span>
          )}
          {isHighlighted && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#F59E0B] text-amber-950 shadow-xs animate-pulse">
              Active Question
            </span>
          )}
        </div>

        <div className="bg-[#F8F6F0]/50 rounded-xl p-3.5 border border-[#2D2A26]/10">
          <PromptTextBox promptText={card.promptText} onChangePrompt={handlePromptChange} />
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={() => onToggleAttach(card.id, activeChunkId)}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
            isAttached
              ? 'bg-[#10B981]/15 text-[#047857] border border-[#10B981]/30 hover:bg-[#10B981]/25'
              : 'bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-sm'
          }`}
        >
          {isAttached ? (
            <>
              <Check className="w-4 h-4" />
              <span>Attached to Chunk ✓</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Attach to Chunk</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

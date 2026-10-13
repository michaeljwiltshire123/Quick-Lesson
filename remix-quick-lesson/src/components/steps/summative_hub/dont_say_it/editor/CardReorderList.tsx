import React from 'react';
import { ArrowUp, ArrowDown, Edit3, Trash2, Sparkles } from 'lucide-react';
import { SecretWordCard } from '../types/dontSayItTypes';

interface Props {
  cards: SecretWordCard[];
  onMoveCard: (index: number, direction: 'up' | 'down') => void;
  onEditCard: (card: SecretWordCard) => void;
  onRerollCard: (card: SecretWordCard) => void;
  onDeleteCard: (id: string) => void;
}

export const CardReorderList: React.FC<Props> = ({ cards, onMoveCard, onEditCard, onRerollCard, onDeleteCard }) => {
  return (
    <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-xs">
      {cards.map((card, idx) => {
        const banned = card.activeBannedWords?.length ? card.activeBannedWords : card.studentBannedWords || [];
        return (
          <div key={card.id || idx} className="p-3 bg-white border border-gray-200 rounded-xl hover:border-amber-400 transition-all flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 font-mono font-black flex items-center justify-center text-[10px] shrink-0">
                {idx + 1}
              </span>
              <div className="min-w-0">
                <h4 className="font-black text-gray-900 text-sm truncate">{card.targetWord}</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {banned.map((b, bIdx) => (
                    <span key={bIdx} className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold">
                      🚫 {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button type="button" onClick={() => onMoveCard(idx, 'up')} disabled={idx === 0} className="p-1 text-gray-400 hover:text-black disabled:opacity-20 cursor-pointer"><ArrowUp className="w-3.5 h-3.5" /></button>
              <button type="button" onClick={() => onMoveCard(idx, 'down')} disabled={idx === cards.length - 1} className="p-1 text-gray-400 hover:text-black disabled:opacity-20 cursor-pointer"><ArrowDown className="w-3.5 h-3.5" /></button>
              <button type="button" onClick={() => onRerollCard(card)} className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg cursor-pointer" title="AI Re-roll"><Sparkles className="w-3.5 h-3.5" /></button>
              <button type="button" onClick={() => onEditCard(card)} className="p-1 text-amber-600 hover:bg-amber-50 rounded-lg cursor-pointer" title="Edit"><Edit3 className="w-3.5 h-3.5" /></button>
              <button type="button" onClick={() => onDeleteCard(card.id)} className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

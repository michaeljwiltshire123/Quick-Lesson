import React, { useState } from 'react';
import { SecretWordCard } from '../types/dontSayItTypes';
import { CardReorderList, CustomTabooCardCreator, TabooCardEditorModal } from '../editor';
import { DontSayItSimulatorModal } from '../preview';
import { TabooPreFlightInspectorModal } from '../inspector';
import { regenerateSingleTabooCard } from '../services/tabooCardService';
import { MessageSquare, RefreshCw, Eye, ShieldCheck } from 'lucide-react';

interface Props {
  cards: SecretWordCard[];
  lessonTitle?: string;
  onUpdateCards?: (updatedCards: SecretWordCard[]) => void;
  onResetCards?: () => void;
}

export const DontSayItCardPreviewList: React.FC<Props> = ({
  cards,
  lessonTitle = 'Lesson Challenge',
  onUpdateCards,
  onResetCards,
}) => {
  const [editingCard, setEditingCard] = useState<SecretWordCard | null>(null);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  const handleMoveCard = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= cards.length) return;
    const next = [...cards];
    const [moved] = next.splice(index, 1);
    next.splice(targetIdx, 0, moved);
    onUpdateCards?.(next);
  };

  const handleRerollCard = async (card: SecretWordCard) => {
    const fresh = await regenerateSingleTabooCard(card, lessonTitle);
    onUpdateCards?.(cards.map((c) => (c.id === card.id ? fresh : c)));
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#2D2A26]/15 shadow-xs space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2D2A26]/10 pb-2.5">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-rose-600" />
          <h4 className="text-xs font-black uppercase tracking-wider text-[#2D2A26]">Taboo Cards ({cards.length})</h4>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setIsInspectorOpen(true)} className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer border border-purple-200">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
            <span>Audit Misconceptions</span>
          </button>
          <button type="button" onClick={() => setIsSimulatorOpen(true)} className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow-xs">
            <Eye className="w-3.5 h-3.5" />
            <span>Test Simulator</span>
          </button>
          {onResetCards && (
            <button type="button" onClick={onResetCards} className="text-[10px] font-bold text-gray-600 hover:text-black flex items-center gap-1 cursor-pointer bg-[#F8F6F0] px-2.5 py-1.5 rounded-xl border border-black/10">
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>
      </div>

      <CardReorderList cards={cards} onMoveCard={handleMoveCard} onEditCard={(card) => setEditingCard(card)} onRerollCard={handleRerollCard} onDeleteCard={(id) => onUpdateCards?.(cards.filter((c) => c.id !== id))} />
      <CustomTabooCardCreator onAddCard={(newCard) => onUpdateCards?.([...cards, newCard])} />
      <TabooCardEditorModal isOpen={Boolean(editingCard)} card={editingCard} lessonTitle={lessonTitle} onSave={(updated) => onUpdateCards?.(cards.map((c) => (c.id === updated.id ? updated : c)))} onClose={() => setEditingCard(null)} />
      <DontSayItSimulatorModal isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)} cards={cards} />
      <TabooPreFlightInspectorModal isOpen={isInspectorOpen} onClose={() => setIsInspectorOpen(false)} cards={cards} lessonTitle={lessonTitle} />
    </div>
  );
};

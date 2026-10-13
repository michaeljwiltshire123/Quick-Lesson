import React from 'react';
import { SecretWordCard } from '../types/dontSayItTypes';
import { ShieldAlert, Edit2 } from 'lucide-react';

interface Props {
  card: SecretWordCard;
  index: number;
  onUpdateCard: (updated: SecretWordCard) => void;
}

export const EditableCardItem: React.FC<Props> = ({ card, index, onUpdateCard }) => {
  const handleTargetWordChange = (val: string) => {
    onUpdateCard({ ...card, targetWord: val });
  };

  const handleBannedWordChange = (wordIdx: number, val: string) => {
    const updated = [...(card.activeBannedWords || card.aiFallbackBannedWords)];
    updated[wordIdx] = val;
    onUpdateCard({
      ...card,
      activeBannedWords: updated,
      aiFallbackBannedWords: updated,
    });
  };

  const bannedList = (card.activeBannedWords?.length ? card.activeBannedWords : card.aiFallbackBannedWords).slice(0, 4);

  return (
    <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#2D2A26]/10 space-y-2 hover:border-[#2D2A26]/30 transition-all shadow-2xs">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase text-amber-800">Card #{index + 1}</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-bold uppercase">
          Editable
        </span>
      </div>

      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase text-gray-400 block">Target Word (1-3 words)</label>
        <input
          type="text"
          value={card.targetWord}
          onChange={(e) => handleTargetWordChange(e.target.value)}
          className="w-full px-2 py-1 bg-white border border-[#2D2A26]/20 rounded-lg text-xs font-black font-mono uppercase text-[#2D2A26] focus:ring-1 focus:ring-black focus:outline-hidden"
          placeholder="Target Word"
        />
      </div>

      <div className="space-y-1.5 pt-1 border-t border-black/5">
        <div className="text-[9px] font-bold text-gray-500 uppercase flex items-center gap-1">
          <ShieldAlert className="w-3 h-3 text-rose-500" /> Forbidden Terms:
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {bannedList.map((w, idx) => (
            <input
              key={idx}
              type="text"
              value={w}
              onChange={(e) => handleBannedWordChange(idx, e.target.value)}
              className="px-1.5 py-1 bg-white border border-rose-200 rounded text-[10px] font-medium text-rose-950 focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
              placeholder={`Banned #${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle, ShieldAlert } from 'lucide-react';
import { MysteryGiftDefinition } from '../types/mysteryGiftTypes';
import { getRandomMysteryGifts } from './mysteryGiftCatalog';

interface Props {
  isOpen: boolean;
  isUnderdog?: boolean;
  onSelectGift: (gift: MysteryGiftDefinition) => void;
  onClose?: () => void;
}

export const ExpandedChestPickerModal: React.FC<Props> = ({
  isOpen,
  isUnderdog = false,
  onSelectGift,
}) => {
  const [chests] = useState<MysteryGiftDefinition[]>(() => getRandomMysteryGifts(3, isUnderdog));
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (!isOpen) return null;

  const handlePick = (idx: number) => {
    setSelectedIdx(idx);
    const chosen = chests[idx];
    setTimeout(() => onSelectGift(chosen), 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-5 max-w-md w-full text-white space-y-4 shadow-2xl text-center">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-3 h-3" />
            <span>Speed Qualifying Bonus</span>
          </div>
          <h3 className="text-base font-black text-white">Choose a Mystery Gift</h3>
          <p className="text-xs text-gray-300">Tap one glowing chest to unveil your tactical buff</p>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2">
          {chests.map((gift, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={gift.id}
                type="button"
                onClick={() => handlePick(idx)}
                disabled={selectedIdx !== null}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 border-white text-slate-950 scale-105 shadow-xl'
                    : 'bg-black/50 border-amber-400/40 hover:border-amber-400 text-amber-300 hover:scale-102'
                }`}
              >
                {isSelected ? (
                  <CheckCircle className="w-8 h-8 text-slate-950 animate-bounce" />
                ) : (
                  <Gift className="w-8 h-8 text-amber-400 animate-pulse" />
                )}
                <span className="text-[10px] font-black uppercase tracking-wider mt-2">
                  Chest {idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {selectedIdx !== null && (
          <div className="p-3 bg-amber-400/20 border border-amber-400/40 rounded-2xl text-left space-y-1 animate-in fade-in">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black text-amber-300">{chests[selectedIdx].name}</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black">
                {chests[selectedIdx].rarity}
              </span>
            </div>
            <p className="text-[11px] text-gray-200">{chests[selectedIdx].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

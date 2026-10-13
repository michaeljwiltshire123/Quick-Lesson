import React, { useState } from 'react';
import { Gift, Zap, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { PowerUpItem } from '../types/competitiveQuizTypes';

interface Props {
  onSelectChest: (powerUp: PowerUpItem) => void;
  onDismiss?: () => void;
}

const REWARDS: PowerUpItem[] = [
  { id: 'pw-shield', type: 'shield', name: 'Aegis Shield', description: 'Blocks the next freeze attack', durationSeconds: 20, iconName: 'Shield' },
  { id: 'pw-double', type: 'double_down', name: 'Pot Surge 2x', description: 'Doubles your next correct answer', durationSeconds: 15, iconName: 'Zap' },
  { id: 'pw-timewarp', type: 'time_warp', name: 'Time Warp', description: 'Grants +5 extra seconds to lock in', durationSeconds: 15, iconName: 'Sparkles' },
];

export const MysteryChestPickerCard: React.FC<Props> = ({ onSelectChest }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handlePick = (idx: number) => {
    setSelectedIdx(idx);
    const reward = REWARDS[idx] || REWARDS[0];
    setTimeout(() => onSelectChest(reward), 800);
  };

  return (
    <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-4 text-white space-y-3 shadow-2xl text-center">
      <div className="space-y-1">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
          ⚡ Speed Bonus Qualified!
        </span>
        <h4 className="text-sm font-black text-white">Choose Your Mystery Chest</h4>
        <p className="text-[11px] text-gray-300">Tap one glowing chest to unlock a tactical bonus</p>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-1">
        {REWARDS.map((item, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handlePick(idx)}
              disabled={selectedIdx !== null}
              className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 border-white text-slate-950 scale-105 shadow-xl'
                  : 'bg-black/40 border-amber-400/40 hover:border-amber-400 text-amber-300 hover:scale-102'
              }`}
            >
              {isSelected ? (
                <CheckCircle2 className="w-8 h-8 text-slate-950 animate-bounce" />
              ) : (
                <Gift className="w-8 h-8 text-amber-400 animate-pulse" />
              )}
              <span className="text-[10px] font-black uppercase tracking-wider mt-1.5">
                Chest {idx + 1}
              </span>
            </button>
          );
        })}
      </div>

      {selectedIdx !== null && (
        <div className="p-2.5 bg-amber-400/20 border border-amber-400/40 rounded-xl text-xs font-black text-amber-200 animate-in fade-in">
          Unlocked: {REWARDS[selectedIdx].name} ({REWARDS[selectedIdx].description})
        </div>
      )}
    </div>
  );
};

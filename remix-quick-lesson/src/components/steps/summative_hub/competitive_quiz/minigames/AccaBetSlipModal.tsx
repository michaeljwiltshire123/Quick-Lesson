import React, { useState } from 'react';
import { X, CheckSquare, Square, AlertOctagon, TrendingUp, Zap } from 'lucide-react';

interface Classmate {
  id: string;
  name: string;
  avatar: string;
}

interface Props {
  isOpen: boolean;
  classmates: Classmate[];
  onLockInBet: (selectedIds: string[]) => void;
  onClose: () => void;
}

export const AccaBetSlipModal: React.FC<Props> = ({
  isOpen,
  classmates,
  onLockInBet,
  onClose,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const togglePupil = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleLockIn = () => {
    if (selectedIds.length === 0) return;
    onLockInBet(selectedIds);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-emerald-400 rounded-3xl p-5 max-w-sm w-full text-white space-y-4 shadow-2xl">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-300">
              High-Stakes Acca Bet Slip
            </h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-gray-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-2.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-[11px] space-y-1">
          <p className="font-bold text-emerald-300">Rule: Steal 50% of winnings from all chosen pupils!</p>
          <p className="text-gray-300 text-[10px]">
            ⚠️ If even ONE person misses, you get nothing. If &gt;90% of class is correct, bet voids.
          </p>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {classmates.map((c) => {
            const isChecked = selectedIds.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => togglePupil(c.id)}
                className={`w-full p-2 rounded-xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{c.avatar}</span>
                  <span>{c.name}</span>
                </div>
                {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-gray-400" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-xs font-bold text-amber-400">
            {selectedIds.length} Picks • Potential: +{selectedIds.length * 75} pts
          </span>
          <button
            type="button"
            disabled={selectedIds.length === 0}
            onClick={handleLockIn}
            className="px-4 py-2 bg-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase cursor-pointer disabled:opacity-40 shadow-lg"
          >
            Lock In Acca
          </button>
        </div>
      </div>
    </div>
  );
};

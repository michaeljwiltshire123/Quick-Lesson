import React, { useState } from 'react';
import { Award, X, Plus, Minus, UserCheck } from 'lucide-react';
import { PlayerState } from '../types/competitiveQuizTypes';

interface Props {
  isOpen: boolean;
  players: PlayerState[];
  onApplyOverride: (playerId: string, deltaPoints: number, reason: string) => void;
  onClose: () => void;
}

export const ManualScoreOverrideModal: React.FC<Props> = ({
  isOpen,
  players,
  onApplyOverride,
  onClose,
}) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(players[0]?.id || '');
  const [delta, setDelta] = useState(50);
  const [reason, setReason] = useState('Excellent classroom contribution');

  if (!isOpen) return null;

  const handleApply = () => {
    if (!selectedPlayerId) return;
    onApplyOverride(selectedPlayerId, delta, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-5 max-w-sm w-full text-white space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-black uppercase tracking-wider">Manual Score Adjustment</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-gray-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-gray-300 font-bold mb-1">Select Pupil</label>
            <select
              value={selectedPlayerId}
              onChange={(e) => setSelectedPlayerId(e.target.value)}
              className="w-full bg-slate-800 border border-white/15 rounded-xl p-2 text-white font-bold"
            >
              {players.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.score} pts)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">Point Adjustment</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDelta((d) => d - 50)}
                className="p-2 rounded-xl bg-rose-600/30 text-rose-300 border border-rose-500/40 hover:bg-rose-600/50 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={delta}
                onChange={(e) => setDelta(Number(e.target.value))}
                className="w-full text-center bg-slate-800 border border-white/15 rounded-xl p-2 font-mono font-black text-amber-300"
              />
              <button
                type="button"
                onClick={() => setDelta((d) => d + 50)}
                className="p-2 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/50 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">Teacher Reason Note</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-slate-800 border border-white/15 rounded-xl p-2 text-white"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <UserCheck className="w-4 h-4" />
          <span>Apply Score Adjustment</span>
        </button>
      </div>
    </div>
  );
};

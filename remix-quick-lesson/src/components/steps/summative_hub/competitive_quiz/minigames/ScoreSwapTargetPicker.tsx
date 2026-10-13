import React from 'react';
import { ArrowLeftRight, UserCheck } from 'lucide-react';
import { PlayerState } from '../types/competitiveQuizTypes';

interface Props {
  currentPlayerId: string;
  players: PlayerState[];
  selectedTargetId: string | null;
  onSelectTarget: (targetId: string) => void;
  onConfirm: () => void;
}

export const ScoreSwapTargetPicker: React.FC<Props> = ({
  currentPlayerId,
  players,
  selectedTargetId,
  onSelectTarget,
  onConfirm,
}) => {
  const eligibleRivals = players.filter((p) => p.id !== currentPlayerId);

  return (
    <div className="bg-slate-900 border-2 border-purple-500 rounded-3xl p-4 text-white space-y-3 shadow-xl">
      <div className="space-y-1 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[10px] font-black uppercase tracking-wider border border-purple-500/40">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Tactical Score Swap</span>
        </div>
        <h4 className="text-sm font-black text-white">Choose Your Swap Target</h4>
        <p className="text-[11px] text-gray-300">
          If you answer the next question correctly, your score will swap with this rival!
        </p>
      </div>

      <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
        {eligibleRivals.map((rival) => {
          const isSelected = selectedTargetId === rival.id;
          return (
            <button
              key={rival.id}
              type="button"
              onClick={() => onSelectTarget(rival.id)}
              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                isSelected
                  ? 'bg-purple-600 border-white text-white shadow-md'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                <span className="w-6 h-6 rounded-lg bg-black/40 flex items-center justify-center text-[10px] font-black">
                  {rival.name.charAt(0)}
                </span>
                <span>{rival.name}</span>
              </div>
              <span className="font-mono font-black text-amber-300">{rival.score} pts</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onConfirm}
        disabled={!selectedTargetId}
        className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
          selectedTargetId
            ? 'bg-purple-500 hover:bg-purple-400 text-slate-950 shadow-lg'
            : 'bg-white/10 text-gray-500 cursor-not-allowed'
        }`}
      >
        <UserCheck className="w-4 h-4" />
        <span>Lock In Target Rival</span>
      </button>
    </div>
  );
};

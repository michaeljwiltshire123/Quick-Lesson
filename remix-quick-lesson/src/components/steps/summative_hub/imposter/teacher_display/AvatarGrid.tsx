import React from 'react';
import { Ghost, CheckCircle2 } from 'lucide-react';
import { Player } from '../types/imposterTypes';

interface Props {
  players: Player[];
  selectedPlayerId?: string;
  onSelectPlayer?: (player: Player) => void;
}

const AVATAR_PALETTE = ['bg-rose-100 text-rose-800 border-rose-300', 'bg-sky-100 text-sky-800 border-sky-300', 'bg-emerald-100 text-emerald-800 border-emerald-300', 'bg-amber-100 text-amber-800 border-amber-300', 'bg-purple-100 text-purple-800 border-purple-300', 'bg-teal-100 text-teal-800 border-teal-300'];

export const AvatarGrid: React.FC<Props> = ({ players, selectedPlayerId, onSelectPlayer }) => {
  return (
    <div id="imposter-avatar-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {players.map((player, idx) => {
        const colorClass = AVATAR_PALETTE[idx % AVATAR_PALETTE.length];
        const isSelected = selectedPlayerId === player.id;

        return (
          <div
            key={player.id}
            id={`avatar-card-${player.id}`}
            onClick={() => onSelectPlayer?.(player)}
            className={`p-3 rounded-2xl border transition-all text-center flex flex-col items-center gap-2 cursor-pointer ${
              !player.isAlive
                ? 'bg-stone-100/70 border-stone-200 opacity-60'
                : isSelected
                ? 'bg-white border-amber-600 shadow-md ring-2 ring-amber-400/40'
                : 'bg-white border-[#2D2A26]/10 hover:border-amber-300 shadow-2xs'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 ${colorClass} relative`}>
              {player.name.slice(0, 2).toUpperCase()}
              {!player.isAlive && (
                <div className="absolute -top-1 -right-1 bg-stone-700 text-white rounded-full p-0.5" title="Spectating Ghost">
                  <Ghost className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div className="w-full truncate">
              <p className="text-xs font-bold text-[#2D2A26] truncate">{player.name}</p>
              <div className="flex items-center justify-center gap-1 mt-0.5 text-[10px] text-[#2D2A26]/60">
                {player.isAlive ? (
                  <span className="flex items-center gap-0.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Tasks: {player.completedTasks}
                  </span>
                ) : (
                  <span className="font-semibold text-stone-500">Ghost Writer</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

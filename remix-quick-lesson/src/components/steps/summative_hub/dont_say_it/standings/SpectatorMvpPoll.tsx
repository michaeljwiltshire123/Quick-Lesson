import React, { useState } from 'react';
import { Award, CheckCircle2, Heart } from 'lucide-react';
import { Player } from '../types/dontSayItTypes';

interface Props {
  candidatePlayers: Player[];
  onVoteSubmitted?: (playerId: string) => void;
}

export const SpectatorMvpPoll: React.FC<Props> = ({ candidatePlayers, onVoteSubmitted }) => {
  const [votedId, setVotedId] = useState<string | null>(null);

  const handleVote = (id: string) => {
    if (votedId) return;
    setVotedId(id);
    onVoteSubmitted?.(id);
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 text-white space-y-3 shadow-lg text-left">
      <div className="flex items-center gap-2 text-amber-400">
        <Award className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-black uppercase tracking-wider">Audience Quick Poll</span>
      </div>
      <div className="text-xs text-gray-300">
        Who gave the most articulate, creative clue this round?
      </div>

      <div className="space-y-1.5">
        {candidatePlayers.map((player) => {
          const isSelected = votedId === player.id;
          return (
            <button
              key={player.id}
              type="button"
              disabled={Boolean(votedId)}
              onClick={() => handleVote(player.id)}
              className={`w-full p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : votedId
                  ? 'bg-white/5 border-white/5 text-gray-500 cursor-default'
                  : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span>{player.name}</span>
              {isSelected ? (
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
              ) : !votedId ? (
                <Heart className="w-3.5 h-3.5 text-gray-400" />
              ) : null}
            </button>
          );
        })}
      </div>

      {votedId && (
        <div className="text-[10px] text-center text-amber-300 font-bold uppercase tracking-wider">
          Vote recorded! Recognising speaking fluency.
        </div>
      )}
    </div>
  );
};

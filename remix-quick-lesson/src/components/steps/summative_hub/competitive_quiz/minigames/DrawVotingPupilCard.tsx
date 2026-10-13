import React, { useState } from 'react';
import { CheckCircle2, Heart } from 'lucide-react';
import { DrawDuelMatchup } from '../types/minigameTypes';

interface Props {
  matchup: DrawDuelMatchup;
  onCastVote: (chosenPlayerId: string) => void;
}

export const DrawVotingPupilCard: React.FC<Props> = ({ matchup, onCastVote }) => {
  const [votedId, setVotedId] = useState<string | null>(null);

  const handleVote = (id: string) => {
    if (votedId) return;
    setVotedId(id);
    onCastVote(id);
  };

  return (
    <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-4 text-white space-y-3 text-center">
      <div className="space-y-1">
        <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
          Class Vote
        </span>
        <h4 className="text-sm font-black">Which drawing best captured "{matchup.prompt}"?</h4>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          type="button"
          onClick={() => handleVote(matchup.playerA.playerId)}
          disabled={votedId !== null}
          className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-2 cursor-pointer transition-all ${
            votedId === matchup.playerA.playerId
              ? 'bg-amber-400 text-slate-950 border-white shadow-xl'
              : 'bg-black/40 border-amber-400/40 hover:border-amber-400 text-white'
          }`}
        >
          <span className="text-xs font-black">{matchup.playerA.playerName}</span>
          {votedId === matchup.playerA.playerId ? (
            <CheckCircle2 className="w-6 h-6 text-slate-950" />
          ) : (
            <Heart className="w-6 h-6 text-amber-400" />
          )}
          <span className="text-[10px] uppercase font-bold">Vote Artist 1</span>
        </button>

        <button
          type="button"
          onClick={() => handleVote(matchup.playerB.playerId)}
          disabled={votedId !== null}
          className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-2 cursor-pointer transition-all ${
            votedId === matchup.playerB.playerId
              ? 'bg-blue-500 text-white border-white shadow-xl'
              : 'bg-black/40 border-blue-400/40 hover:border-blue-400 text-white'
          }`}
        >
          <span className="text-xs font-black">{matchup.playerB.playerName}</span>
          {votedId === matchup.playerB.playerId ? (
            <CheckCircle2 className="w-6 h-6 text-white" />
          ) : (
            <Heart className="w-6 h-6 text-blue-400" />
          )}
          <span className="text-[10px] uppercase font-bold">Vote Artist 2</span>
        </button>
      </div>

      {votedId && (
        <p className="text-[11px] text-amber-300 font-bold animate-in fade-in">
          Vote recorded! Watch the main projector screen for the verdict.
        </p>
      )}
    </div>
  );
};

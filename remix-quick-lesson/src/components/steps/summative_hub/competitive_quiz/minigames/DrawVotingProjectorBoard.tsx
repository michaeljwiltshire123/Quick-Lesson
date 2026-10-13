import React from 'react';
import { Palette, Trophy, Users } from 'lucide-react';
import { DrawDuelMatchup } from '../types/minigameTypes';

interface Props {
  matchup: DrawDuelMatchup;
  onConcludeVote?: () => void;
}

export const DrawVotingProjectorBoard: React.FC<Props> = ({ matchup, onConcludeVote }) => {
  const totalVotes = matchup.votesA.length + matchup.votesB.length;
  const pctA = totalVotes > 0 ? Math.round((matchup.votesA.length / totalVotes) * 100) : 50;
  const pctB = totalVotes > 0 ? Math.round((matchup.votesB.length / totalVotes) * 100) : 50;

  return (
    <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-5 text-white space-y-4 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-black uppercase tracking-wider">
            Draw Duel: <span className="text-amber-300">{matchup.prompt}</span>
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono">
          <Users className="w-3.5 h-3.5 text-amber-400" />
          <span>{totalVotes} Class Votes</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Drawing A */}
        <div className="bg-black/50 border border-white/15 rounded-2xl p-3 text-center space-y-2">
          <div className="flex items-center justify-between text-xs font-bold px-1">
            <span className="text-amber-400">{matchup.playerA.playerName}</span>
            <span className="font-mono text-white">{pctA}% ({matchup.votesA.length})</span>
          </div>
          <div className="bg-[#0F172A] rounded-xl overflow-hidden border border-white/10 h-44 flex items-center justify-center">
            {matchup.playerA.strokeDataUrl ? (
              <img src={matchup.playerA.strokeDataUrl} alt="Drawing A" className="h-full w-auto object-contain" />
            ) : (
              <span className="text-gray-500 text-xs">Waiting for sketch...</span>
            )}
          </div>
        </div>

        {/* Drawing B */}
        <div className="bg-black/50 border border-white/15 rounded-2xl p-3 text-center space-y-2">
          <div className="flex items-center justify-between text-xs font-bold px-1">
            <span className="text-blue-400">{matchup.playerB.playerName}</span>
            <span className="font-mono text-white">{pctB}% ({matchup.votesB.length})</span>
          </div>
          <div className="bg-[#0F172A] rounded-xl overflow-hidden border border-white/10 h-44 flex items-center justify-center">
            {matchup.playerB.strokeDataUrl ? (
              <img src={matchup.playerB.strokeDataUrl} alt="Drawing B" className="h-full w-auto object-contain" />
            ) : (
              <span className="text-gray-500 text-xs">Waiting for sketch...</span>
            )}
          </div>
        </div>
      </div>

      {onConcludeVote && (
        <button
          type="button"
          onClick={onConcludeVote}
          className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-md"
        >
          Award Double Points To Winning Artist
        </button>
      )}
    </div>
  );
};

import React from 'react';
import { UserX, Scale } from 'lucide-react';
import { Player } from '../types/imposterTypes';
import { VotingTallyRow } from './VotingTallyRow';

interface Props {
  players: Player[];
  voteCounts: Record<string, number>;
  onTriggerTieBreaker: (tiedPlayerIds: [string, string]) => void;
  onConfirmElimination: (playerId: string) => void;
}

export const VotingTallyBoard: React.FC<Props> = ({
  players,
  voteCounts,
  onTriggerTieBreaker,
  onConfirmElimination,
}) => {
  const alivePlayers = players.filter((p) => p.isAlive);
  const sorted = [...alivePlayers].sort((a, b) => (voteCounts[b.id] || 0) - (voteCounts[a.id] || 0));
  const topVotes = sorted.length > 0 ? (voteCounts[sorted[0].id] || 0) : 0;
  const highestTied = sorted.filter((p) => (voteCounts[p.id] || 0) === topVotes && topVotes > 0);
  const isTie = highestTied.length === 2;

  return (
    <div id="imposter-voting-tally-board" className="bg-white border border-[#2D2A26]/15 rounded-3xl p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
        <div>
          <h3 className="text-sm font-black text-[#2D2A26] uppercase tracking-wide">Anonymous Ballot Tally</h3>
          <p className="text-xs text-[#2D2A26]/60">Live results aggregated without revealing voter identity</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300">
          Ballot Closed
        </span>
      </div>

      <div className="space-y-2">
        {sorted.map((player) => (
          <VotingTallyRow
            key={player.id}
            player={player}
            votes={voteCounts[player.id] || 0}
            isHighest={(voteCounts[player.id] || 0) === topVotes && topVotes > 0}
          />
        ))}
      </div>

      <div className="pt-2 border-t border-[#2D2A26]/10 flex items-center justify-between">
        {isTie ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold">
              <Scale className="w-4 h-4 text-amber-600" />
              Deadlock: Exact tie between {highestTied[0].name} and {highestTied[1].name}
            </div>
            <button
              id="btn-trigger-tiebreaker"
              type="button"
              onClick={() => onTriggerTieBreaker([highestTied[0].id, highestTied[1].id])}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 shadow-sm"
            >
              Resolve Tie-Breaker
            </button>
          </div>
        ) : sorted.length > 0 && topVotes > 0 ? (
          <div className="flex items-center justify-between w-full">
            <div className="text-xs text-[#2D2A26]/80 font-medium">
              Plurality identifies: <strong className="font-bold">{sorted[0].name}</strong>
            </div>
            <button
              id="btn-confirm-elimination"
              type="button"
              onClick={() => onConfirmElimination(sorted[0].id)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5 shadow-sm"
            >
              <UserX className="w-3.5 h-3.5" /> Confirm Pupil Ejection
            </button>
          </div>
        ) : (
          <p className="text-xs text-[#2D2A26]/60">No decisive votes cast this round.</p>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Scale, Check, AlertCircle } from 'lucide-react';
import { Player } from '../types/imposterTypes';
import { calculateTieBreakerResolution } from './tieBreakerLogic';

interface Props {
  tiedPlayers: [Player, Player];
  alivePlayers: Player[];
  onResolveElimination: (eliminatedId: string, explanation: string) => void;
  onCancel: () => void;
}

export const TieBreakerResolution: React.FC<Props> = ({
  tiedPlayers,
  alivePlayers,
  onResolveElimination,
  onCancel,
}) => {
  const [playerA, playerB] = tiedPlayers;
  const [wordA, setWordA] = useState('');
  const [wordB, setWordB] = useState('');
  const [voteA, setVoteA] = useState(0);
  const [voteB, setVoteB] = useState(0);

  const isEvenAlive = alivePlayers.length % 2 === 0;

  const handleCalculateResolution = () => {
    const res = calculateTieBreakerResolution(playerA, playerB, voteA, voteB);
    onResolveElimination(res.eliminated.id, res.reason);
  };

  return (
    <div id="imposter-tiebreaker-modal" className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-[#2D2A26]/20 max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-black text-[#2D2A26]">Deadlock Tie-Breaker Resolution</h3>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            {alivePlayers.length} Active Pupils ({isEvenAlive ? 'Even Count' : 'Odd Count'})
          </span>
        </div>

        <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${isEvenAlive ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-blue-50 text-blue-900 border border-blue-200'}`}>
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            {isEvenAlive
              ? 'Even number of active pupils: Imposter votes DO NOT count in this run-off ballot.'
              : 'Odd number of active pupils: Imposter votes DO count in this run-off ballot.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { player: playerA, word: wordA, setWord: setWordA, vote: voteA, setVote: setVoteA },
            { player: playerB, word: wordB, setWord: setWordB, vote: voteB, setVote: setVoteB },
          ].map(({ player, word, setWord, vote, setVote }) => (
            <div key={player.id} className="p-3 bg-[#F8F6F0] rounded-2xl border border-[#2D2A26]/10 space-y-2">
              <p className="text-xs font-bold text-[#2D2A26]">{player.name}</p>
              <input
                type="text"
                placeholder="1-word answer"
                value={word}
                onChange={(e) => setWord(e.target.value.trim().slice(0, 20))}
                className="w-full text-xs p-2 rounded-lg bg-white border border-[#2D2A26]/15"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-medium text-[#2D2A26]/70">Votes:</span>
                <input
                  type="number"
                  min={0}
                  value={vote}
                  onChange={(e) => setVote(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-14 text-xs font-mono font-bold p-1 text-center bg-white border rounded"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#2D2A26]/10">
          <button type="button" onClick={onCancel} className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#2D2A26]/70 hover:bg-black/5">
            Cancel
          </button>
          <button
            id="btn-resolve-tiebreaker-decision"
            type="button"
            onClick={handleCalculateResolution}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 shadow-sm"
          >
            <Check className="w-3.5 h-3.5" /> Enforce Tie Resolution
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Scale, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  totalJudges?: number;
  onVoteFoul: (isUpheld: boolean) => void;
  onTeacherOverride?: () => void;
}

export const JudgeConsensusVoteModal: React.FC<Props> = ({
  isOpen,
  totalJudges = 3,
  onVoteFoul,
  onTeacherOverride,
}) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [myVote, setMyVote] = useState<boolean | null>(null);

  if (!isOpen) return null;

  const handleCastVote = (upheld: boolean) => {
    setMyVote(upheld);
    setHasVoted(true);
    onVoteFoul(upheld);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 text-white w-full max-w-sm rounded-3xl p-6 border-2 border-red-500/50 shadow-2xl space-y-4 text-center animate-in zoom-in-95">
        <div className="w-12 h-12 rounded-2xl bg-red-600/30 text-red-400 mx-auto flex items-center justify-center border border-red-500">
          <Scale className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase text-red-400 tracking-wider">Judges Conferring</div>
          <h3 className="text-lg font-black tracking-tight text-white">Majority Consensus Vote</h3>
          <p className="text-xs text-slate-300">
            Did the active clue-giver speak a forbidden word? Majority of {totalJudges} votes decides.
          </p>
        </div>

        {!hasVoted ? (
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => handleCastVote(true)}
              className="py-3 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1 cursor-pointer shadow-md"
            >
              <XCircle className="w-5 h-5" />
              <span>Foul Upheld</span>
            </button>

            <button
              type="button"
              onClick={() => handleCastVote(false)}
              className="py-3 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1 cursor-pointer shadow-md"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Play On</span>
            </button>
          </div>
        ) : (
          <div className="p-3 bg-slate-800 rounded-xl border border-white/10 text-xs text-amber-400 font-bold">
            Vote cast ({myVote ? 'Foul Upheld' : 'Play On'}). Awaiting consensus tally...
          </div>
        )}

        {onTeacherOverride && (
          <button
            type="button"
            onClick={onTeacherOverride}
            className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer pt-2 block mx-auto"
          >
            Teacher Override / Cancel Foul
          </button>
        )}
      </div>
    </div>
  );
};

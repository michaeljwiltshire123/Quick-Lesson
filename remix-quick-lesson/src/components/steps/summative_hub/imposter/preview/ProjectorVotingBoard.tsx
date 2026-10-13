import React from 'react';
import { Vote, EyeOff } from 'lucide-react';
import { MockPupil } from './ProjectorSubmissionTracker';

interface Props {
  pupils: MockPupil[];
  isShadowVoteActive?: boolean;
}

export const ProjectorVotingBoard: React.FC<Props> = ({
  pupils,
  isShadowVoteActive = false,
}) => {
  const mockVotes: Record<string, number> = {
    Oliver: 1, Amelia: 3, George: 2, Harry: 0, Isla: 0, Ava: 0,
  };

  return (
    <div className="space-y-3">
      <div className="text-center space-y-1">
        <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
          isShadowVoteActive
            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
        }`}>
          {isShadowVoteActive ? <EyeOff className="w-3.5 h-3.5" /> : <Vote className="w-3.5 h-3.5" />}
          {isShadowVoteActive ? 'Closed Ballot Voting (Single Round Only)' : 'Open Ballot Accusation'}
        </div>
        <h3 className="text-base font-black text-white">Cast Your Vote on Your Device</h3>
        <p className="text-[11px] text-white/70">
          {isShadowVoteActive
            ? 'Live tallies concealed for this round only. Standard vote counts resume next round.'
            : 'Live votes tallying in real-time.'}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {pupils.map((p) => {
          const voteCount = mockVotes[p.name] || 0;
          return (
            <div
              key={p.name}
              className="p-3 bg-slate-800/90 rounded-2xl border border-white/10 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{p.avatar}</span>
                <span className="text-xs font-bold text-white truncate">{p.name}</span>
              </div>
              <div className="px-2.5 py-1 rounded-xl bg-slate-900 border border-white/10 font-mono font-black text-xs">
                {isShadowVoteActive ? (
                  <span className="text-white/40">???</span>
                ) : (
                  <span className={voteCount > 0 ? 'text-amber-400' : 'text-white/40'}>
                    {voteCount} {voteCount === 1 ? 'vote' : 'votes'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

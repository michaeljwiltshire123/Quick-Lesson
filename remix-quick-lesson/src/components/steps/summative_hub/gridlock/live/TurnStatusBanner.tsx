import React from 'react';
import { TeamColor } from '../types/gridlockTypes';
import { GamePhase } from '../game_loop/useGridlockTurnEngine';
import { Sparkles, Clock, ArrowRight, CornerDownRight, RefreshCw } from 'lucide-react';

interface Props {
  turnTeam: TeamColor;
  answeringTeam: TeamColor;
  phase: GamePhase;
  timeLeft: number;
  feedback: string | null;
  letter?: string;
  onSwapQuestion?: () => void;
  hasBackups?: boolean;
}

export const TurnStatusBanner: React.FC<Props> = ({
  turnTeam, answeringTeam, phase, timeLeft, feedback, letter, onSwapQuestion, hasBackups,
}) => {
  const isRed = answeringTeam === 'red';

  return (
    <div className="bg-[#1E1C1A] text-white px-4 py-3 rounded-2xl border border-white/10 shadow-lg flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className={`w-3.5 h-3.5 rounded-full ring-4 ${isRed ? 'bg-red-500 ring-red-500/20' : 'bg-blue-500 ring-blue-500/20'}`} />
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1">
            {phase === 'picking' ? (
              <>
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{turnTeam.toUpperCase()} Team's Turn To Pick Hex</span>
              </>
            ) : phase === 'bounce' ? (
              <>
                <CornerDownRight className="w-3 h-3 text-amber-400 animate-pulse" />
                <span className="text-amber-400 font-bold">BOUNCE-BACK ({answeringTeam.toUpperCase()})</span>
              </>
            ) : (
              <>
                <ArrowRight className="w-3 h-3 text-amber-400" />
                <span>{answeringTeam.toUpperCase()} Team Answering Hex '{letter}'</span>
              </>
            )}
          </div>
          <div className="text-xs font-bold text-gray-200">
            {feedback || (phase === 'picking' ? `Select any neutral hexagon to challenge!` : `30-second timer active`)}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onSwapQuestion && hasBackups && phase === 'answering' && (
          <button
            onClick={onSwapQuestion}
            title="Swap this question for an unused question in the lesson bank"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-xs text-amber-300 rounded-lg border border-amber-400/30 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Swap Question</span>
          </button>
        )}
        {(phase === 'answering' || phase === 'bounce') && (
          <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 font-mono">
            <Clock className={`w-3.5 h-3.5 ${timeLeft <= 5 ? 'text-rose-400 animate-spin' : 'text-amber-400'}`} />
            <span className={`text-sm font-black ${timeLeft <= 5 ? 'text-rose-400' : 'text-amber-300'}`}>
              {timeLeft}s
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

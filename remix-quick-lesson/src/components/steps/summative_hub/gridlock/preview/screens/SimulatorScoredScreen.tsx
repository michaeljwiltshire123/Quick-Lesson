import React from 'react';
import { CheckCircle2, Flame, ArrowRight, Sparkles } from 'lucide-react';
import { TeamColor } from '../../types/gridlockTypes';

interface Props {
  letter: string;
  winningTeam: TeamColor;
  targetAnswer: string;
  streakCount: number;
  onContinueToNextPick: () => void;
}

export const SimulatorScoredScreen: React.FC<Props> = ({
  letter,
  winningTeam,
  targetAnswer,
  streakCount,
  onContinueToNextPick,
}) => {
  const isRed = winningTeam === 'red';

  return (
    <div className="bg-[#1A1816] p-6 rounded-3xl border-2 border-emerald-500/30 shadow-2xl max-w-xl mx-auto space-y-5 text-center text-white animate-in zoom-in-95">
      <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400 shadow-lg">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <div className="space-y-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
          Hexagon Captured!
        </span>
        <h2 className="text-2xl font-black">
          {isRed ? 'RED SQUAD' : 'BLUE SQUAD'} CLAIMS HEX '{letter}'!
        </h2>
        <p className="text-xs text-gray-300">
          Target Answer Accepted: <span className="font-mono font-bold text-amber-300">"{targetAnswer}"</span>
        </p>
      </div>

      <div className="bg-black/60 p-4 rounded-2xl border border-white/10 flex items-center justify-around">
        <div className="text-center">
          <div className="text-[10px] uppercase font-bold text-gray-400">Response Speed</div>
          <div className="text-base font-mono font-black text-amber-400">1.8s (Lightning)</div>
        </div>
        <div className="h-8 w-px bg-white/20" />
        <div className="text-center">
          <div className="text-[10px] uppercase font-bold text-gray-400">Active Streak</div>
          <div className="text-base font-black text-orange-400 flex items-center justify-center gap-1">
            <Flame className="w-4 h-4 fill-orange-400" /> {streakCount}x Streak (2x PTS)
          </div>
        </div>
      </div>

      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200">
        ✨ Because {isRed ? 'Red' : 'Blue'} Squad answered correctly, they hold the turn to choose the next hexagon!
      </div>

      <button
        type="button"
        onClick={onContinueToNextPick}
        className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-sm rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
      >
        <span>CHOOSE NEXT HEXAGON TILE</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

import React from 'react';
import { CheckCircle2, FastForward, Trophy, Flame, AlertCircle } from 'lucide-react';
import { getRoundMultiplier } from './roundEscalationEngine';

interface Props {
  currentRound: number;
  currentDecayingPoints: number;
  activeTeamName: string;
  onCorrect: () => void;
  onPass: () => void;
  onEndTurn: () => void;
}

export const TeacherMasterControls: React.FC<Props> = ({
  currentRound,
  currentDecayingPoints,
  activeTeamName,
  onCorrect,
  onPass,
  onEndTurn,
}) => {
  const multiplier = getRoundMultiplier(currentRound);
  const potentialAward = currentDecayingPoints * multiplier;

  return (
    <div className="bg-[#2D2A26] text-white p-4 sm:p-5 rounded-3xl border border-white/10 shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-black uppercase tracking-wider text-white">
            Teacher Master Controls
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Round {currentRound} ({multiplier}x Multiplier)
          </span>
          <span className="text-xs font-bold text-gray-300">Team: {activeTeamName}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Correct Guess Button */}
        <button
          type="button"
          onClick={onCorrect}
          className="py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg transform hover:scale-102"
        >
          <CheckCircle2 className="w-5 h-5 fill-current" />
          <span>CORRECT (+{potentialAward} pts)</span>
        </button>

        {/* Pass / Skip Button */}
        <button
          type="button"
          onClick={onPass}
          className="py-3 px-4 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <FastForward className="w-4 h-4" />
          <span>PASS WORD (-50 pts)</span>
        </button>

        {/* End Turn Button */}
        <button
          type="button"
          onClick={onEndTurn}
          className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
        >
          <AlertCircle className="w-4 h-4 text-gray-400" />
          <span>End 60s Turn Early</span>
        </button>
      </div>
    </div>
  );
};

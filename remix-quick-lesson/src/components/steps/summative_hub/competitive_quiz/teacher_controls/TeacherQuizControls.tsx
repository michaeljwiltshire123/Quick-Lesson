import React, { useState } from 'react';
import { Play, Pause, SkipForward, Coins, Award, Shield } from 'lucide-react';
import { PlayerState } from '../types/competitiveQuizTypes';
import { ManualScoreOverrideModal } from './ManualScoreOverrideModal';

interface Props {
  roomCode: string;
  isPaused: boolean;
  players: PlayerState[];
  currentPot: number;
  onTogglePause: () => void;
  onSkipRound: () => void;
  onForcePotUnlock: () => void;
  onApplyScoreOverride: (playerId: string, delta: number, reason: string) => void;
}

export const TeacherQuizControls: React.FC<Props> = ({
  roomCode,
  isPaused,
  players,
  currentPot,
  onTogglePause,
  onSkipRound,
  onForcePotUnlock,
  onApplyScoreOverride,
}) => {
  const [isOverrideOpen, setIsOverrideOpen] = useState(false);

  return (
    <>
      <div className="bg-slate-900/95 backdrop-blur-md border border-amber-400/40 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 text-white shadow-2xl">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-300 font-mono font-black text-xs border border-amber-400/30">
            ROOM {roomCode}
          </span>
          <span className="text-xs text-gray-300 font-bold hidden sm:inline">Teacher Master Dock</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Pause / Resume */}
          <button
            type="button"
            onClick={onTogglePause}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
              isPaused
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-gray-200'
            }`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-slate-950" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          {/* Skip Round */}
          <button
            type="button"
            onClick={onSkipRound}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-gray-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Skip Round</span>
          </button>

          {/* Force Pot Unlock */}
          <button
            type="button"
            onClick={onForcePotUnlock}
            title={`Force unlock the ${currentPot} pt pot`}
            className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>Unlock Pot ({currentPot})</span>
          </button>

          {/* Adjust Scores */}
          <button
            type="button"
            onClick={() => setIsOverrideOpen(true)}
            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Adjust Scores</span>
          </button>
        </div>
      </div>

      <ManualScoreOverrideModal
        isOpen={isOverrideOpen}
        players={players}
        onApplyOverride={onApplyScoreOverride}
        onClose={() => setIsOverrideOpen(false)}
      />
    </>
  );
};

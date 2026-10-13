import React, { useState, useEffect } from 'react';
import { Player, TeamConfig } from '../types/dontSayItTypes';
import { Disc, UserCheck } from 'lucide-react';

interface Props {
  activeTeam: TeamConfig;
  teamPlayers: Player[];
  selectedGuesser: Player | null;
  onSelectGuesser: (player: Player) => void;
  isSpinning?: boolean;
}

export const GuesserWheelCard: React.FC<Props> = ({
  activeTeam,
  teamPlayers,
  selectedGuesser,
  onSelectGuesser,
  isSpinning = false,
}) => {
  const [highlightIdx, setHighlightIdx] = useState(0);

  useEffect(() => {
    if (!isSpinning || teamPlayers.length === 0) return;
    const interval = setInterval(() => {
      setHighlightIdx((prev) => (prev + 1) % teamPlayers.length);
    }, 110);
    return () => clearInterval(interval);
  }, [isSpinning, teamPlayers.length]);

  return (
    <div className="relative bg-slate-950 p-5 rounded-2xl border-2 border-amber-500/30 shadow-2xl space-y-4 overflow-hidden">
      {/* Neon Roulette Glow aura */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between border-b border-amber-500/20 pb-2.5 relative z-10">
        <div className="flex items-center gap-2">
          <Disc className={`w-4 h-4 text-amber-400 ${isSpinning ? 'animate-spin' : ''}`} />
          <h4 className="text-xs font-black uppercase tracking-wider text-amber-200">
            Neon Roulette Selection Wheel: {activeTeam.name}
          </h4>
        </div>
        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
          Spotlight Guesser
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 relative z-10">
        {teamPlayers.map((p, idx) => {
          const isSelected = selectedGuesser?.id === p.id;
          const isWheelActive = isSpinning && highlightIdx === idx;
          return (
            <button
              key={p.id}
              type="button"
              disabled={isSpinning}
              onClick={() => onSelectGuesser(p)}
              className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 font-black border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.6)] ring-2 ring-white'
                  : isWheelActive
                  ? 'bg-amber-400 text-black border-amber-200 scale-105 shadow-[0_0_20px_rgba(251,191,36,0.9)] animate-pulse'
                  : 'bg-slate-900/80 text-slate-200 border-slate-800 hover:border-amber-500/40 hover:bg-slate-800/80'
              }`}
            >
              <div className="text-[9px] font-bold uppercase tracking-wider opacity-60">Pupil {idx + 1}</div>
              <div className="text-xs font-black truncate">{p.name}</div>
            </button>
          );
        })}
      </div>

      {selectedGuesser && !isSpinning && (
        <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl flex items-center gap-2.5 text-amber-200 relative z-10 shadow-inner">
          <UserCheck className="w-5 h-5 text-amber-400 shrink-0 drop-shadow" />
          <div className="text-xs">
            <span className="font-bold text-amber-300">{selectedGuesser.name}</span> is front-of-class! Opponents preparing forbidden words.
          </div>
        </div>
      )}
    </div>
  );
};

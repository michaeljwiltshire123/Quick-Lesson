import React from 'react';
import { Sparkles, Trophy } from 'lucide-react';

interface Props {
  points: number;
  teamName: string;
}

export const ActiveTeamCelebrationOverlay: React.FC<Props> = ({ points, teamName }) => {
  const confettiColors = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'];

  return (
    <div className="p-5 bg-gradient-to-b from-amber-500/20 via-emerald-500/15 to-transparent border-2 border-amber-400 rounded-3xl text-center space-y-3 relative overflow-hidden shadow-2xl">
      {/* Lightweight pure CSS confetti particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-75">
        {[...Array(16)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-xs animate-bounce"
            style={{
              left: `${(i * 6.5) % 95}%`,
              top: `${(i * 12) % 80}%`,
              width: `${6 + (i % 5)}px`,
              height: `${8 + (i % 6)}px`,
              backgroundColor: confettiColors[i % confettiColors.length],
              transform: `rotate(${i * 25}deg)`,
              animationDuration: `${1.2 + (i % 4) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-2">
        <div className="w-12 h-12 mx-auto bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center shadow-lg">
          <Trophy className="w-7 h-7" />
        </div>
        <div className="text-xs font-black uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Splendid Articulation!
        </div>
        <h3 className="text-2xl font-black text-white uppercase">{teamName}</h3>
        <div className="text-3xl font-mono font-black text-amber-400">+{points} Pts</div>
        <p className="text-xs text-gray-300 max-w-xs mx-auto">
          Outstanding collaboration and vocabulary precision under pressure.
        </p>
      </div>
    </div>
  );
};

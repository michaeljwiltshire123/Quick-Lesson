import React from 'react';
import { EyeOff, Play, Smartphone } from 'lucide-react';

interface Props {
  guesserName: string;
  opposingTeamName: string;
  isUnlocked: boolean;
  onJudgeUnlock: () => void;
}

export const AntiPeekGuard: React.FC<Props> = ({
  guesserName,
  opposingTeamName,
  isUnlocked,
  onJudgeUnlock,
}) => {
  if (isUnlocked) return null;

  return (
    <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md rounded-3xl z-30 flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-amber-400 flex items-center justify-center shadow-xl">
        <EyeOff className="w-8 h-8" />
      </div>

      <div className="space-y-1.5 max-w-md">
        <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
          Anti-Peek Security Guard
        </span>
        <h2 className="text-2xl font-black text-white tracking-tight">
          {guesserName || 'Guesser'}, TURN AROUND!
        </h2>
        <p className="text-xs text-slate-300">
          Guesser must look away while <span className="font-bold text-amber-400">{opposingTeamName}</span> enters forbidden words.
        </p>
      </div>

      <button
        type="button"
        onClick={onJudgeUnlock}
        className="py-3 px-5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
      >
        <Play className="w-4 h-4 fill-current" />
        <span>Opposing Judge: Unlock & Start Round</span>
      </button>
    </div>
  );
};

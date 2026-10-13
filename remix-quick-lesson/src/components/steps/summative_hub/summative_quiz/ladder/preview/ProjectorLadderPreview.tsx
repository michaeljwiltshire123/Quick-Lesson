import React from 'react';
import { Lock, Award } from 'lucide-react';
import { LadderSkin } from '../typesLadder';

interface Props {
  skin: LadderSkin;
  currentRung: number;
  totalRungs: number;
  safetyNets: number[];
  score: number;
  gameStatus: 'active' | 'success' | 'failed';
}

export const ProjectorLadderPreview: React.FC<Props> = ({
  skin,
  currentRung,
  totalRungs,
  safetyNets,
  score,
  gameStatus,
}) => {
  const rungsArray = Array.from({ length: totalRungs }, (_, i) => totalRungs - i);

  // Define skin-specific styles
  const skinStyles = {
    film_tower: { bg: 'bg-[#141210]', accent: 'text-amber-500', border: 'border-amber-500/20' },
    lab_rack: { bg: 'bg-[#0B1515]', accent: 'text-teal-400', border: 'border-teal-500/20' },
    temple_steps: { bg: 'bg-[#18110B]', accent: 'text-orange-400', border: 'border-orange-500/20' },
  }[skin] || { bg: 'bg-[#1E1C1A]', accent: 'text-amber-500', border: 'border-white/10' };

  return (
    <div className={`p-4 rounded-2xl border ${skinStyles.border} ${skinStyles.bg} text-white space-y-4 shadow-xl`}>
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Classroom Board Display</span>
        <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-0.5 rounded border border-white/5">
          <Award className={`w-3.5 h-3.5 ${skinStyles.accent}`} />
          <span className="text-xs font-mono font-bold text-gray-200">Total Points: {score.toLocaleString()}</span>
        </div>
      </div>

      {/* Vertical Ladder Steps */}
      <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
        {rungsArray.map((num) => {
          const isSafety = safetyNets.includes(num);
          const isCurrent = currentRung === num;
          const points = num * 25000;

          let stepBg = 'bg-white/5 hover:bg-white/10';
          if (isCurrent) {
            stepBg = gameStatus === 'failed' ? 'bg-red-950/60 border border-red-500' : 'bg-amber-500/20 border border-amber-400';
          } else if (isSafety) {
            stepBg = 'bg-emerald-950/40 border border-emerald-500/30';
          }

          return (
            <div
              key={num}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${stepBg}`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-lg font-mono text-xs flex items-center justify-center ${
                  isCurrent ? 'bg-amber-500 text-slate-950 font-black' : 'bg-white/10 text-gray-300'
                }`}>
                  {num}
                </span>
                <span className={isCurrent ? 'text-amber-300' : isSafety ? 'text-emerald-400' : 'text-gray-300'}>
                  {isSafety ? 'Safety Net Level' : `Rung Stage ${num}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-gray-300">{points.toLocaleString()} pts</span>
                {isSafety && <Lock className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

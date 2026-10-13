import React from 'react';
import { ArrowRight, Smartphone, Shield, Lock } from 'lucide-react';
import { LadderSkin } from '../typesLadder';

interface Props {
  currentRung: number;
  totalRungs: number;
  safetyNets: number[];
  score: number;
  skin: LadderSkin;
  onNext: () => void;
}

export const LadderSimulatorClimb: React.FC<Props> = ({
  currentRung, totalRungs, safetyNets, score, skin, onNext,
}) => {
  const rungsArray = Array.from({ length: totalRungs }, (_, i) => totalRungs - i);

  const skinStyles = {
    film_tower: { bg: 'bg-[#141210]', text: 'text-amber-500', border: 'border-amber-500/20' },
    lab_rack: { bg: 'bg-[#0B1515]', text: 'text-teal-400', border: 'border-teal-500/20' },
    temple_steps: { bg: 'bg-[#18110B]', text: 'text-orange-400', border: 'border-orange-500/20' },
  }[skin] || { bg: 'bg-[#1E1C1A]', text: 'text-amber-500', border: 'border-white/10' };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-center">
      {/* Projector Board Display */}
      <div className={`p-5 rounded-2xl border ${skinStyles.border} ${skinStyles.bg} space-y-4 shadow-xl text-white`}>
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Escalation Tower Climb</span>
          <span className={`text-xs font-mono font-bold ${skinStyles.text}`}>Class Score: {score.toLocaleString()} pts</span>
        </div>

        {/* Climb Tower Steps */}
        <div className="space-y-1 max-h-[220px] overflow-y-auto pr-1 text-xs">
          {rungsArray.map((num) => {
            const isSafety = safetyNets.includes(num);
            const isCurrent = currentRung === num;
            const points = num * 25000;

            let stepStyle = 'bg-white/5 opacity-55 text-gray-400';
            if (isCurrent) {
              stepStyle = 'bg-amber-500/20 border border-amber-400 text-amber-300 scale-[1.01]';
            } else if (num < currentRung) {
              stepStyle = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10';
            } else if (isSafety) {
              stepStyle = 'bg-emerald-950/30 border border-emerald-500/20 text-emerald-300';
            }

            return (
              <div key={num} className={`flex items-center justify-between px-3 py-1.5 rounded-lg font-bold transition-all ${stepStyle}`}>
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded font-mono text-[10px] flex items-center justify-center ${isCurrent ? 'bg-amber-500 text-slate-900 font-black' : 'bg-white/10 text-gray-300'}`}>{num}</span>
                  <span>{isSafety ? 'Safety Zone Level' : `Stage ${num}`}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <span>{points.toLocaleString()}</span>
                  {isSafety && <Lock className="w-3 h-3 text-emerald-400" />}
                </div>
              </div>
            );
          })}
        </div>

        <button type="button" onClick={onNext} className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5">
          <span>Continue Rung Challenge</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Pupil Smartphone Display */}
      <div className="bg-[#1C1A17] border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center space-y-4 shadow-xl min-h-[280px]">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Student Device Mockup</span>
        <div className="bg-[#12110F] border-4 border-slate-700 rounded-3xl p-4 aspect-[9/16] max-w-[220px] w-full flex flex-col justify-center items-center text-center space-y-3 text-white">
          <Smartphone className="w-8 h-8 text-amber-400 animate-bounce" />
          <div className="text-xs font-bold">Scaling Higher! 🧗</div>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Congratulations, the class passed Stage {currentRung - 1 || 1}! Preparing for next challenge.
          </p>
        </div>
      </div>
    </div>
  );
};

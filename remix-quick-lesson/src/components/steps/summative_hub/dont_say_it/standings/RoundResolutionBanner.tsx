import React from 'react';
import { CheckCircle2, Clock, AlertOctagon, Sparkles } from 'lucide-react';
import { RoundResolution } from '../types/roundResolutionTypes';

interface Props {
  resolution: RoundResolution;
}

export const RoundResolutionBanner: React.FC<Props> = ({ resolution }) => {
  const isSuccess = resolution.reason === 'word_guessed';
  const isTimeout = resolution.reason === 'time_expired';

  return (
    <div className="space-y-3 text-center">
      {isSuccess && (
        <div className="p-4 bg-emerald-500/20 border-2 border-emerald-400 rounded-2xl flex items-center justify-center gap-3 text-emerald-300">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div className="text-left">
            <div className="text-base font-black uppercase text-white tracking-wide">
              Word Solved in {resolution.timeTakenSeconds}s! +{resolution.pointsEarned} Pts
            </div>
            <div className="text-xs text-emerald-200">
              Awarded to <span className="font-bold text-white">{resolution.teamName}</span> for rapid scientific articulation.
            </div>
          </div>
        </div>
      )}

      {isTimeout && (
        <div className="p-4 bg-amber-500/20 border-2 border-amber-400 rounded-2xl flex items-center justify-center gap-3 text-amber-200">
          <Clock className="w-6 h-6 text-amber-400 shrink-0" />
          <div className="text-left">
            <div className="text-base font-black uppercase text-white tracking-wide">
              Out of Time! 0 Pts Awarded
            </div>
            <div className="text-xs text-amber-200">
              The 60-second timer elapsed before <span className="font-bold text-white">{resolution.teamName}</span> could identify the term.
            </div>
          </div>
        </div>
      )}

      {!isSuccess && !isTimeout && (
        <div className="p-4 bg-rose-500/20 border-2 border-rose-400 rounded-2xl flex items-center justify-center gap-3 text-rose-200">
          <AlertOctagon className="w-6 h-6 text-rose-400 shrink-0" />
          <div className="text-left">
            <div className="text-base font-black uppercase text-white tracking-wide">
              Foul Called! Round Forfeited
            </div>
            <div className="text-xs text-rose-200">
              A forbidden word was spoken by the clue givers. No points awarded this turn.
            </div>
          </div>
        </div>
      )}

      {/* Secret Term & Forbidden Words Solution Reveal */}
      <div className="bg-slate-900/90 border border-white/15 p-3.5 rounded-2xl space-y-2">
        <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" /> Target Scientific Concept
        </div>
        <div className="text-2xl font-black uppercase tracking-tight text-white">{resolution.targetWord}</div>
        <div className="text-[11px] text-gray-400 font-bold">Forbidden Sabotage Terms that Were in Play:</div>
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          {resolution.forbiddenWords.map((word, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-rose-950/80 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-black uppercase">
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

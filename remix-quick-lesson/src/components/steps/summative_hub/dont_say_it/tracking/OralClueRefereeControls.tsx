import React from 'react';
import { AlertOctagon, CheckCircle2, SkipForward, Volume2 } from 'lucide-react';
import { FoulCounterCard } from './FoulCounterCard';

interface Props {
  foulCount: number;
  successCount: number;
  skipCount: number;
  onLogFoul: (wordSpoken?: string) => void;
  onLogSuccess: () => void;
  onLogSkip: () => void;
}

export const OralClueRefereeControls: React.FC<Props> = ({
  foulCount,
  successCount,
  skipCount,
  onLogFoul,
  onLogSuccess,
  onLogSkip,
}) => {
  return (
    <div className="bg-slate-950 border-2 border-amber-400 p-4 rounded-3xl text-white space-y-3.5 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider">
            Pair / Referee Oral Tracker
          </h4>
        </div>
        <span className="text-[10px] font-mono bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
          LIVE TAP CONTROLS
        </span>
      </div>

      <FoulCounterCard foulCount={foulCount} successCount={successCount} skipCount={skipCount} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
        <button
          type="button"
          onClick={() => onLogFoul()}
          className="py-3 px-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black rounded-xl text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-95 transition-all"
        >
          <AlertOctagon className="w-4 h-4 animate-pulse" />
          <span>Taboo Word Said!</span>
        </button>

        <button
          type="button"
          onClick={onLogSuccess}
          className="py-3 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-95 transition-all"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Clue Guessed (+100)</span>
        </button>

        <button
          type="button"
          onClick={onLogSkip}
          className="py-3 px-3 bg-slate-800 hover:bg-slate-700 text-gray-300 font-bold rounded-xl text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <SkipForward className="w-3.5 h-3.5" />
          <span>Pass Card (-20)</span>
        </button>
      </div>
    </div>
  );
};

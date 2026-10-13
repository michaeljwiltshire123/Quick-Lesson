import React from 'react';
import { Ear, CheckCircle2, ShieldAlert } from 'lucide-react';

interface Props {
  judgeName: string;
  isGameRunning: boolean;
  isAdjudicationActive: boolean;
  onHeardTheWord: () => void;
}

export const HeardTheWordButton: React.FC<Props> = ({
  judgeName,
  isGameRunning,
  isAdjudicationActive,
  onHeardTheWord,
}) => {
  return (
    <div className="bg-[#2D2A26] text-white p-5 rounded-3xl border-2 border-emerald-400/40 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Ear className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
              Guessing Squad Official
            </div>
            <div className="text-sm font-black text-white">{judgeName} (Ear Witness)</div>
          </div>
        </div>
        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
          Scorer Judge
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-slate-300 leading-relaxed">
          Listen to the guesser at the front. As soon as they say the exact secret word, tap below to lock in the points!
        </p>

        <button
          type="button"
          disabled={!isGameRunning || isAdjudicationActive}
          onClick={onHeardTheWord}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 rounded-2xl text-sm font-black transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xl transform active:scale-98"
        >
          <CheckCircle2 className="w-6 h-6 fill-current" />
          <span>HEARD THE WORD! (CONFIRM GUESS)</span>
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { Scale, Play, AlertOctagon, BellRing, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface Props {
  judgeName: string;
  isGameRunning: boolean;
  isAntiPeekActive: boolean;
  whistleblowerAlert?: string | null;
  onUnlockAntiPeek: () => void;
  onTriggerFoul: () => void;
}

export const OpposingJudgePanel: React.FC<Props> = ({
  judgeName,
  isGameRunning,
  isAntiPeekActive,
  whistleblowerAlert,
  onUnlockAntiPeek,
  onTriggerFoul,
}) => {
  return (
    <div className="bg-slate-900 text-white p-5 rounded-3xl border-2 border-amber-400/40 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-400">Opposing Official Judge</div>
            <div className="text-sm font-black text-white">{judgeName}</div>
          </div>
        </div>
        <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          {isAntiPeekActive ? 'Round Setup' : 'Live Round'}
        </span>
      </div>

      {whistleblowerAlert && (
        <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-2xl flex items-center gap-2.5 text-rose-300 animate-bounce">
          <BellRing className="w-5 h-5 text-rose-400 shrink-0" />
          <div className="text-xs font-black">Whistleblower Tip: {whistleblowerAlert}</div>
        </div>
      )}

      <div className="space-y-3">
        {isAntiPeekActive ? (
          <div className="p-4 bg-emerald-950/90 border-2 border-emerald-400 rounded-2xl space-y-3 text-center shadow-lg">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                Setup Screen Verification
              </span>
              <h3 className="text-base font-black text-white uppercase">Ready to Begin Round</h3>
            </div>

            <div className="bg-black/50 p-2.5 rounded-xl text-left space-y-1.5 border border-white/10 text-xs text-slate-200">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>1. Guesser has back turned to screen</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>2. Opposing sabotage words locked in</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onUnlockAntiPeek}
              className="w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-2xl text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl transform active:scale-95"
            >
              <Play className="w-5 h-5 fill-current text-slate-950" />
              <span>START THE GAME (60s ROUND)</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-slate-300">
              Listen carefully to oral clues. Flag an immediate foul if clue-givers say any forbidden words!
            </p>
            <button
              type="button"
              onClick={onTriggerFoul}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-sm font-black transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xl animate-pulse"
            >
              <AlertOctagon className="w-5 h-5" />
              <span>FLAG FOUL / OBJECTION!</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

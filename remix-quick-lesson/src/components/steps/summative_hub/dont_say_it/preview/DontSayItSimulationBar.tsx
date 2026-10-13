import React from 'react';
import { Play, RotateCcw, AlertOctagon, CheckCircle, Flame, ArrowLeft, Hourglass } from 'lucide-react';

interface Props {
  isAdjudicating: boolean;
  isRoundActive?: boolean;
  onBackToSetup: () => void;
  onTriggerFoul: () => void;
  onHeardTheWord: () => void;
  onSendReaction: (emoji: string) => void;
  onResetTimer: () => void;
  onToggleRound?: () => void;
}

export const DontSayItSimulationBar: React.FC<Props> = ({
  isAdjudicating,
  isRoundActive = false,
  onBackToSetup,
  onTriggerFoul,
  onHeardTheWord,
  onSendReaction,
  onResetTimer,
  onToggleRound,
}) => {
  return (
    <div className="bg-slate-900 text-white p-3.5 rounded-2xl border border-white/15 flex flex-wrap items-center justify-between gap-3 shadow-xl">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBackToSetup}
          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Setup</span>
        </button>
        <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-lg border border-amber-500/30">
          Live Play Simulation Mode
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {onToggleRound && (
          <button
            type="button"
            onClick={onToggleRound}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
              isRoundActive
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500 shadow-md'
            }`}
          >
            {isRoundActive ? <Hourglass className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRoundActive ? 'End Turn / Between-Rounds' : 'Start 60s Round'}</span>
          </button>
        )}

        <button type="button" onClick={onTriggerFoul} className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>Foul</span>
        </button>

        <button type="button" onClick={onHeardTheWord} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Heard Word</span>
        </button>

        <button type="button" onClick={() => onSendReaction('🔥')} className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border border-white/10">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Reaction</span>
        </button>

        <button type="button" onClick={onResetTimer} className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border border-white/10">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

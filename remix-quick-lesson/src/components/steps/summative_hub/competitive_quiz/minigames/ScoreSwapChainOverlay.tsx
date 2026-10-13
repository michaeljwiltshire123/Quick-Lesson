import React from 'react';
import { ArrowLeftRight, Zap, CheckCircle2, X } from 'lucide-react';
import { ScoreSwapChainEntry } from '../types/minigameTypes';

interface Props {
  chainLog: ScoreSwapChainEntry[];
  onDismiss: () => void;
}

export const ScoreSwapChainOverlay: React.FC<Props> = ({ chainLog, onDismiss }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-purple-500 rounded-3xl p-6 max-w-lg w-full text-white space-y-4 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-purple-400 animate-spin" />
            <h3 className="text-base font-black uppercase tracking-wider text-purple-300">
              Score Swap Chain Reaction!
            </h3>
          </div>
          <button type="button" onClick={onDismiss} className="p-1 text-gray-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-300">
          Swaps resolved in order of pupil answer speed. Chained swaps dynamically updated current scores!
        </p>

        <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
          {chainLog.map((step, idx) => (
            <div
              key={idx}
              className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-2xl flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2 font-bold min-w-0">
                <span className="w-5 h-5 rounded-full bg-purple-500 text-slate-950 flex items-center justify-center text-[10px] font-black shrink-0">
                  {idx + 1}
                </span>
                <span className="text-white truncate">{step.playerName}</span>
                <ArrowLeftRight className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="text-purple-300 truncate">{step.targetPlayerName}</span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] shrink-0">
                <span className="text-gray-400 line-through">{step.scoreBefore}</span>
                <span className="font-black text-emerald-400">{step.scoreAfter} pts</span>
                <span className="text-[10px] text-purple-300 font-normal">({(step.answerSpeedMs / 1000).toFixed(1)}s)</span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="w-full py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
        >
          Confirm Final Leaderboard
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { Shield, Zap, Flame, ShieldAlert, ArrowRight, X } from 'lucide-react';
import { ResolvedAttackResult } from './attackProcessor';

interface Props {
  results: ResolvedAttackResult[];
  onDismiss: () => void;
}

export const AttackResolutionOverlay: React.FC<Props> = ({ results, onDismiss }) => {
  if (results.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-6 max-w-lg w-full text-white space-y-4 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400 animate-bounce" />
            <h3 className="text-base font-black uppercase tracking-wider text-white">
              Tactical Attacks Resolved
            </h3>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
          {results.map((res) => (
            <div
              key={res.attackId}
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-all ${
                res.wasShielded
                  ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold min-w-0">
                <span className="text-white truncate">{res.attackerName}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="text-white truncate">{res.targetName}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {res.wasShielded ? (
                  <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono font-black text-[10px] flex items-center gap-1 border border-cyan-500/30">
                    <Shield className="w-3 h-3" /> BLOCKED
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-mono font-black text-[10px] flex items-center gap-1 border border-rose-500/30">
                    <Flame className="w-3 h-3" /> -{res.scoreShift} pts
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
        >
          Continue Round
        </button>
      </div>
    </div>
  );
};

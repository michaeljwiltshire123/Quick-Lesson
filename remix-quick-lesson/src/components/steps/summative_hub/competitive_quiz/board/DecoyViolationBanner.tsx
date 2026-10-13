import React from 'react';
import { AlertTriangle, Users, Flame, X } from 'lucide-react';
import { DecoyViolation } from '../types/competitiveQuizTypes';

interface Props {
  violation: DecoyViolation | null;
  onDismiss?: () => void;
}

export const DecoyViolationBanner: React.FC<Props> = ({ violation, onDismiss }) => {
  if (!violation) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-rose-950 via-red-900 to-rose-950 border-2 border-rose-500 rounded-2xl p-4 text-white shadow-2xl animate-bounce">
      {/* Alert Glow Bar */}
      <div className="absolute inset-0 bg-red-600/10 pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center shrink-0 shadow-lg text-white">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-rose-500/30 text-rose-300 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border border-rose-400/40">
                Decoy Trap Sprung
              </span>
              <span className="text-[11px] text-rose-200">Premature Flip Violation!</span>
            </div>
            <h4 className="text-sm md:text-base font-black tracking-tight text-white mt-0.5">
              🚨 <span className="text-amber-300 underline font-black">{violation.playerName}</span> tried to hijack the pot prematurely and failed!
            </h4>
            <div className="flex items-center gap-2 text-xs text-rose-200 mt-1">
              <span className="font-bold text-rose-100 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Penalised -{violation.penaltyPoints} pts (50% forfeited)
              </span>
              <span>•</span>
              <span className="text-amber-200 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                Evenly distributed across bottom 5 pupils!
              </span>
            </div>
          </div>
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-rose-200 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

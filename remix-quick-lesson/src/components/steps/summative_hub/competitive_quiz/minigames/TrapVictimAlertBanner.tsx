import React from 'react';
import { Skull, AlertTriangle, ArrowRight, Zap } from 'lucide-react';
import { TrapPenaltyEvent } from './trapAnswerEngine';

interface Props {
  events: TrapPenaltyEvent[];
  onDismiss?: () => void;
}

export const TrapVictimAlertBanner: React.FC<Props> = ({ events, onDismiss }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className="space-y-2 p-3 bg-purple-950/90 border-2 border-purple-400 rounded-2xl text-white shadow-xl animate-bounce">
      <div className="flex items-center justify-between border-b border-purple-400/30 pb-1.5">
        <div className="flex items-center gap-2">
          <Skull className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-black uppercase tracking-wider text-purple-300">
            Pupil Trap Ambush Triggered!
          </span>
        </div>
        {onDismiss && (
          <button type="button" onClick={onDismiss} className="text-xs text-gray-400 hover:text-white font-bold cursor-pointer">
            Dismiss
          </button>
        )}
      </div>

      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
        {events.map((ev, idx) => (
          <div
            key={idx}
            className="p-2 bg-black/50 border border-purple-500/40 rounded-xl flex items-center justify-between text-xs"
          >
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-rose-400">{ev.victimName}</span>
                <span className="text-gray-400 text-[10px]">fell for</span>
                <span className="text-purple-300">"{ev.chosenTrapText}"</span>
              </div>
              <p className="text-[10px] text-gray-400">Planted by {ev.authorName}</p>
            </div>

            <div className="text-right shrink-0 font-mono">
              <span className="text-xs font-black text-amber-400">+{ev.pointsDeducted} pts</span>
              <div className="text-[9px] text-purple-300 font-bold">Transferred</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

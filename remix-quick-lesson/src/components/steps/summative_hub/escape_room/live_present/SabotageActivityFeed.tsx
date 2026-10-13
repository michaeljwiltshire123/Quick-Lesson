import React from 'react';
import { Zap, ShieldAlert, Activity } from 'lucide-react';
import { SabotageEvent } from './typesLiveEscape';

interface Props {
  events: SabotageEvent[];
  onTriggerSimulatedSabotage?: () => void;
}

export const SabotageActivityFeed: React.FC<Props> = ({ events, onTriggerSimulatedSabotage }) => (
  <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-xs space-y-3">
    <div className="flex items-center justify-between gap-2 border-b border-[#2D2A26]/10 pb-2.5">
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-[#D97706]" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D2A26]">
          Live Hindrance & Sabotage Feed
        </h3>
      </div>
      {onTriggerSimulatedSabotage && (
        <button
          type="button"
          onClick={onTriggerSimulatedSabotage}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#F8F6F0] hover:bg-white text-[#2D2A26] border border-[#2D2A26]/15 cursor-pointer shadow-2xs transition-all"
        >
          <Zap className="w-3 h-3 text-[#D97706]" />
          <span>Simulate Sabotage Shot</span>
        </button>
      )}
    </div>

    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
      {events.length === 0 ? (
        <p className="text-xs text-[#2D2A26]/50 italic py-2 text-center">
          No active hindrance effects deployed yet. Teams earn Sabotage Shots by unlocking stations.
        </p>
      ) : (
        events.map((evt) => (
          <div
            key={evt.id}
            className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-[#F8F6F0] border border-[#2D2A26]/10 text-xs transition-all hover:bg-amber-50/40"
          >
            <div className="flex items-start gap-2">
              <div className="p-1 rounded-md bg-amber-500/15 text-[#D97706] mt-0.5 shrink-0">
                <ShieldAlert className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-[#2D2A26]">{evt.attackerTeamName}</span>
                  <span className="text-[10px] text-[#2D2A26]/50">deployed</span>
                  <span className="font-bold text-[#D97706] uppercase text-[10px] px-1.5 py-0.2 bg-amber-100/60 rounded border border-amber-200">
                    {evt.effect.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-[#2D2A26]/50">against</span>
                  <span className="font-bold text-[#2D2A26]">{evt.targetTeamName}</span>
                </div>
                <p className="text-[11px] text-[#2D2A26]/70 mt-0.5">{evt.description}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#2D2A26]/40 shrink-0">{evt.timestamp}</span>
          </div>
        ))
      )}
    </div>
  </div>
);

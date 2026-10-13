import React from 'react';
import { ToggleLeft, ShieldAlert, Users, RotateCw, Sparkles } from 'lucide-react';
import { LifelineType } from '../typesLadder';

interface Props {
  activeLifelines: LifelineType[];
  onTriggerLifeline: (type: LifelineType) => void;
  usedLifelines: LifelineType[];
  safetyNets: number[];
  currentRung: number;
  onSetRung: (rung: number) => void;
}

export const LifelineSimulatorBar: React.FC<Props> = ({
  activeLifelines,
  onTriggerLifeline,
  usedLifelines,
  safetyNets,
  currentRung,
  onSetRung,
}) => {
  return (
    <div className="bg-[#1E1C1A] border border-white/10 rounded-2xl p-4 space-y-4 text-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Lifeline & Safety Net Test Bench</span>
        </h4>
        <span className="text-[10px] font-medium text-gray-400 bg-white/5 px-2 py-0.5 rounded">
          Classroom Simulation Mode
        </span>
      </div>

      {/* Rung & Safety Net Quick Selectors */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase font-bold text-gray-400 block">Jump to Rung & Test Safety Net Locking:</span>
        <div className="flex flex-wrap gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
            const isSafety = safetyNets.includes(num);
            const isCurrent = currentRung === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => onSetRung(num)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 border border-amber-400'
                    : isSafety
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                R{num}{isSafety && '🔒'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lifeline Buttons */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase font-bold text-gray-400 block">Simulate Pupil Lifelines:</span>
        <div className="flex flex-wrap gap-2">
          {activeLifelines.map((type) => {
            const isUsed = usedLifelines.includes(type);
            const label = type === 'fifty_fifty' ? '50/50 Split' :
                          type === 'safety_shield' ? 'Safety Shield' :
                          type === 'ask_room' ? 'Ask the Class' :
                          type === 'question_swap' ? 'Question Swap' : type;

            const icon = type === 'fifty_fifty' ? <ToggleLeft className="w-3.5 h-3.5 text-amber-400" /> :
                         type === 'safety_shield' ? <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" /> :
                         type === 'ask_room' ? <Users className="w-3.5 h-3.5 text-blue-400" /> :
                         <RotateCw className="w-3.5 h-3.5 text-[#F59E0B]" />;

            return (
              <button
                key={type}
                type="button"
                disabled={isUsed}
                onClick={() => onTriggerLifeline(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isUsed
                    ? 'bg-black/30 border-white/5 text-gray-500 line-through cursor-not-allowed'
                    : 'bg-[#2D2A26] hover:bg-black border-white/10 text-white'
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

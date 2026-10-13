import React from 'react';
import { Shield, ArrowRight, Award } from 'lucide-react';
import { LifelineType } from '../typesLadder';
import { LadderStudentDeviceWelcome } from './LadderStudentDeviceWelcome';
import { LadderPointsTowerCard } from './LadderPointsTowerCard';

interface Props {
  lifelines: LifelineType[];
  safetyNets: number[];
  onNext: () => void;
}

export const LadderSimulatorRules: React.FC<Props> = ({ lifelines, onNext }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-center font-sans text-white animate-in fade-in">
      <div className="lg:col-span-7 bg-[#1C1A17] border border-amber-500/20 rounded-2xl p-5 space-y-3.5 shadow-xl">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 inline-block font-sans">
          Climb Rules & Safety Zones
        </span>
        <h3 className="text-base font-black text-white font-sans leading-tight">How the Escalation Works</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
          <div className="flex items-start gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-emerald-400 font-bold text-[10px] uppercase">Safety Zones: Stage 3 &amp; 7</strong>
              <span className="text-[10px] leading-relaxed">Once reached, your score is locked. Incorrect answers will not drop you lower!</span>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
            <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-400 font-bold text-[10px] uppercase">Escalating Point Rungs</strong>
              <span className="text-[10px] leading-relaxed">Each correct step multiplies your rewards exponentially. Reach the summit!</span>
            </div>
          </div>
        </div>

        <LadderPointsTowerCard />

        <button
          type="button"
          onClick={onNext}
          className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-[#181614] rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all flex items-center justify-center gap-1 font-sans uppercase tracking-wider"
        >
          <span>Start the Climb</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="lg:col-span-5 flex flex-col items-center space-y-3 font-sans">
        <div className="bg-[#1C1A17] border border-white/10 rounded-2xl p-4 flex flex-col justify-center items-center text-center space-y-4 shadow-xl w-full">
          <div className="bg-[#12110F] border-4 border-slate-700 rounded-3xl p-4 aspect-[9/16] max-w-[240px] w-full flex flex-col justify-between min-h-[380px]">
            <div className="border-b border-white/5 pb-1 flex justify-between items-center text-[9px] text-gray-400 font-mono">
              <span>Rules Explainer Panel</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <LadderStudentDeviceWelcome lifelines={lifelines} maxAllowed={3} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LadderSimulatorRules;

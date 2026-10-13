import React from 'react';
import { Play } from 'lucide-react';
import { LifelineType } from '../typesLadder';
import { LadderStudentDeviceWelcome } from './LadderStudentDeviceWelcome';

interface Props {
  title: string;
  onStart: () => void;
  lifelines: LifelineType[];
}

export const LadderSimulatorLobby: React.FC<Props> = ({ title, onStart, lifelines }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-center font-sans text-white animate-in fade-in">
      <div className="lg:col-span-7 bg-[#1C1A17] border border-amber-500/20 rounded-2xl p-6 text-center space-y-5 shadow-xl">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 font-sans inline-block">
          Main Classroom Presentation Board
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white font-sans">{title}</h2>
        <p className="text-xs text-gray-400 leading-relaxed max-w-lg mx-auto font-sans">
          Welcome to the Escalation Ladder! Scale from foundational recall questions to complex analytical debugging scenarios. Join on your device to participate.
        </p>

        <div className="flex justify-center items-center gap-6 max-w-sm mx-auto">
          <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex-1">
            <span className="text-[10px] text-gray-500 block uppercase font-bold mb-0.5 font-sans">Class Code</span>
            <strong className="text-xl font-mono tracking-widest text-amber-400">495 201</strong>
          </div>
          <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex-1">
            <span className="text-[10px] text-gray-500 block uppercase font-bold mb-0.5 font-sans">Participants</span>
            <strong className="text-xl font-mono text-emerald-400">24 Active</strong>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onStart}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-[#181614] rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-1.5 mx-auto font-sans"
          >
            <Play className="w-4 h-4 fill-[#181614]" />
            <span>Launch Presentation Game Loop</span>
          </button>
        </div>
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
export default LadderSimulatorLobby;

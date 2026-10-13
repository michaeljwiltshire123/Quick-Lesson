import React from 'react';
import { Award, RefreshCw, Smartphone, Trophy } from 'lucide-react';

interface Props {
  score: number;
  maxScore: number;
  onRestart: () => void;
  success: boolean;
}

export const LadderSimulatorCeremony: React.FC<Props> = ({ score, maxScore, onRestart, success }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-center">
      {/* Projector Board Display */}
      <div className="bg-[#1C1A17] border border-amber-500/30 rounded-2xl p-6 text-center space-y-4 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-amber-500/15 flex items-center justify-center mx-auto text-amber-400 animate-pulse">
          <Trophy className="w-6 h-6" />
        </div>
        
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">End-Of-Game Ceremony</span>
          <h3 className="text-xl font-black text-white">{success ? 'Escalation Tower Conquered! 🎉' : 'Climb Completed! 🧗'}</h3>
        </div>

        <div className="bg-black/30 p-4 rounded-xl border border-white/5 inline-block text-center">
          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Final Class Reward Points</span>
          <strong className="text-2xl font-mono text-emerald-400">{score.toLocaleString()} pts</strong>
          <span className="text-[9px] text-gray-400 block mt-1">out of {maxScore.toLocaleString()} maximum possible</span>
        </div>

        <div>
          <button
            type="button"
            onClick={onRestart}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-[#181614] rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-1.5 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Play Session Loop Again</span>
          </button>
        </div>
      </div>

      {/* Pupil Smartphone Display */}
      <div className="bg-[#1C1A17] border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center space-y-4 shadow-xl min-h-[280px]">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Student Device Mockup</span>
        <div className="bg-[#12110F] border-4 border-slate-700 rounded-3xl p-4 aspect-[9/16] max-w-[220px] w-full flex flex-col justify-center items-center text-center space-y-3 text-white">
          <Award className="w-9 h-9 text-amber-400" />
          <div className="text-xs font-bold">Game Session Completed!</div>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Check your achievements! Total Points earned: <strong>{score.toLocaleString()}</strong>. Well played!
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { LifelineType } from '../typesLadder';
import { Shield, Sparkles, Users, RefreshCw, Zap } from 'lucide-react';

interface Props {
  lifelines: LifelineType[];
  maxAllowed?: number;
}

const LIFELINE_DESC: Record<string, { label: string; desc: string; icon: React.ReactNode }> = {
  fifty_fifty: { label: '50:50 Split', desc: 'Vaporises 2 incorrect choices from your device screen instantly.', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
  ask_room: { label: 'Ask Classroom', desc: 'Locks you until time runs out, then shows you how the class voted and grants +10s.', icon: <Users className="w-3.5 h-3.5 text-blue-400" /> },
  safety_shield: { label: 'Safety Shield', desc: 'Protects you from falling back down to the safety net if you answer incorrectly.', icon: <Shield className="w-3.5 h-3.5 text-emerald-400" /> },
  ask_player: { label: 'Expert Peer', desc: 'Nominates a high-scoring peer to help. Gives you 15s to copy or change.', icon: <Zap className="w-3.5 h-3.5 text-amber-500" /> },
  question_swap: { label: 'Concept Swap', desc: 'Replaces this challenge with a brand new, very different question.', icon: <RefreshCw className="w-3.5 h-3.5 text-orange-400" /> },
};

export const LadderStudentDeviceWelcome: React.FC<Props> = ({ lifelines, maxAllowed = 3 }) => {
  const [selected, setSelected] = useState<LifelineType | null>(null);

  return (
    <div className="flex-1 py-2 flex flex-col justify-start text-left space-y-3 font-sans text-white text-[11px] h-full overflow-y-auto">
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2 text-center space-y-1">
        <span className="font-extrabold uppercase text-[10px] text-amber-400">Class Room Active Rules</span>
        <p className="text-[10px] text-gray-300 leading-normal">
          Ascend the Tower Rungs together! Safety net holds you at Stage 3 and 7.
        </p>
      </div>

      <div className="bg-white/5 rounded-xl p-2.5 space-y-1.5 border border-white/5">
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Play Tokens Available:</span>
        <p className="text-[10px] font-bold text-emerald-400 font-sans">
          You can play up to <span className="underline">{maxAllowed} lifelines</span> total this game!
        </p>
      </div>

      <div className="space-y-1.5 flex-1">
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Tap to Inspect Lifelines:</span>
        <div className="grid grid-cols-2 gap-1.5">
          {lifelines.map((type) => {
            const data = LIFELINE_DESC[type];
            if (!data) return null;
            return (
              <button key={type} onClick={() => setSelected(selected === type ? null : type)}
                className={`p-1.5 rounded-lg border text-left flex items-center gap-1.5 cursor-pointer transition-colors ${selected === type ? 'bg-amber-500/20 border-amber-500' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                {data.icon}
                <span className="font-bold text-[9px] truncate">{data.label}</span>
              </button>
            );
          })}
        </div>

        {selected && LIFELINE_DESC[selected] && (
          <div className="bg-amber-950/20 border border-amber-500/20 p-2 rounded-xl text-[10px] leading-relaxed text-amber-200 animate-in fade-in slide-in-from-top-1 font-sans">
            <strong className="block mb-0.5">{LIFELINE_DESC[selected].label}</strong>
            {LIFELINE_DESC[selected].desc}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Vote, MessageSquare } from 'lucide-react';
import { ImposterRole } from '../types/imposterTypes';
import { StudentPhoneGhostWorkshopView } from './StudentPhoneGhostWorkshopView';

interface Props {
  boardPhase: 'discussion' | 'voting' | 'elimination';
  role: ImposterRole;
}

export const StudentPhoneStageViews: React.FC<Props> = ({ boardPhase, role }) => {
  const [votedTarget, setVotedTarget] = useState<string | null>(null);

  if (boardPhase === 'discussion') {
    return (
      <div className="space-y-3">
        <div className="p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-500/40 text-indigo-200 space-y-1">
          <span className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1">
            <MessageSquare className="w-3 h-3" /> Class Discussion Mode
          </span>
          <p className="text-xs font-medium">
            {role === 'imposter'
              ? 'Coaching Tip: Oliver just mentioned "splitting water". Nod and build on that!'
              : 'Listen closely to explanations. Who gave a vague or slightly mismatched answer?'}
          </p>
        </div>
        <div className="p-2.5 bg-slate-800/90 rounded-xl space-y-1 text-center">
          <span className="text-[10px] text-white/50">Your Submitted Answer</span>
          <p className="text-xs font-bold text-amber-300">
            &ldquo;{role === 'imposter' ? 'Sunlight traps light energy' : 'Lactic acid'}&rdquo;
          </p>
        </div>
      </div>
    );
  }

  if (boardPhase === 'voting') {
    return (
      <div className="space-y-2">
        <div className="text-center">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
            {role === 'imposter' ? 'Imposter Assassination Vote' : 'Accuse the Imposter'}
          </span>
          <p className="text-[10px] text-white/70">
            {role === 'imposter' ? 'Vote to secretly kill an honest player' : 'Vote for the suspicious answer'}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {['Oliver 🦉', 'Amelia 🦊', 'Harry 🦁', 'George 🐻'].map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setVotedTarget(name)}
              className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                votedTarget === name
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                  : 'bg-slate-800 text-white border-white/10 hover:bg-slate-700'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        {votedTarget && (
          <p className="text-[10px] text-emerald-400 text-center font-bold">
            Vote locked for {votedTarget}
          </p>
        )}
      </div>
    );
  }

  return <StudentPhoneGhostWorkshopView topic="Cellular Respiration" />;
};

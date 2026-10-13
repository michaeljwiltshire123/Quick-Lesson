import React from 'react';
import { Layers, MessageSquare, Vote, Skull, CheckCircle2 } from 'lucide-react';
import { BoardPhase } from './ProjectorHeaderNav';

interface Props {
  currentPhase: BoardPhase;
  onSelectPhase: (phase: BoardPhase) => void;
}

const PHASES: { key: BoardPhase; label: string; desc: string; icon: React.FC<any> }[] = [
  { key: 'task', label: '1. Secret Task', desc: 'Hidden prompts on phone', icon: Layers },
  { key: 'discussion', label: '2. Discussion', desc: 'Answers side-by-side', icon: MessageSquare },
  { key: 'voting', label: '3. Voting Ballot', desc: 'Accusations & shadow vote', icon: Vote },
  { key: 'elimination', label: '4. Elimination', desc: 'Double kill & ghost rewards', icon: Skull },
];

export const ImposterPhaseFlowBar: React.FC<Props> = ({ currentPhase, onSelectPhase }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-800/80 p-2 rounded-2xl border border-white/10">
      {PHASES.map((p) => {
        const Icon = p.icon;
        const isActive = currentPhase === p.key;
        return (
          <button
            key={p.key}
            type="button"
            onClick={() => onSelectPhase(p.key)}
            className={`p-2 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2 border ${
              isActive
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-xs'
                : 'bg-slate-900/60 text-white/70 border-white/5 hover:border-white/20 hover:text-white'
            }`}
          >
            <div className={`p-1.5 rounded-lg ${isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-400'}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs block font-black truncate">{p.label}</span>
              <span className={`text-[9px] block truncate ${isActive ? 'text-slate-900/80' : 'text-white/50'}`}>
                {p.desc}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

import React from 'react';
import { Clock } from 'lucide-react';

export type BoardPhase = 'task' | 'discussion' | 'voting' | 'elimination';

interface Props {
  roomCode: string;
  currentIndex: number;
  totalQuestions: number;
  timerSeconds: number;
  boardPhase: BoardPhase;
  onSelectPhase: (phase: BoardPhase) => void;
}

export const ProjectorHeaderNav: React.FC<Props> = ({
  roomCode,
  currentIndex,
  totalQuestions,
  timerSeconds,
  boardPhase,
  onSelectPhase,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-2">
      <div className="flex items-center gap-2">
        <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 font-mono font-black text-xs">
          ROOM: {roomCode}
        </span>
        <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
          Round {currentIndex + 1} of {totalQuestions}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex bg-slate-800 p-0.5 rounded-lg border border-white/10 text-[10px] font-bold">
          {(['task', 'discussion', 'voting', 'elimination'] as BoardPhase[]).map((phase) => (
            <button
              key={phase}
              type="button"
              onClick={() => onSelectPhase(phase)}
              className={`px-2 py-1 rounded-md capitalize cursor-pointer transition-all ${
                boardPhase === phase
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {phase === 'elimination' ? 'Results' : phase}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 font-mono text-xs font-black text-amber-300 bg-slate-800 px-2.5 py-1 rounded-lg border border-white/10">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{timerSeconds}s</span>
        </div>
      </div>
    </div>
  );
};

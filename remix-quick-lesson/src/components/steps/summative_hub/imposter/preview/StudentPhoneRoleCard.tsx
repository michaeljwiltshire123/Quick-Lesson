import React from 'react';
import { ImposterQuestion, ImposterRole } from '../types/imposterTypes';
import { Zap } from 'lucide-react';

interface Props {
  role: ImposterRole;
  question: ImposterQuestion;
  energyPoints: number;
}

export const StudentPhoneRoleCard: React.FC<Props> = ({ role, question, energyPoints }) => {
  if (role === 'innocent') {
    return (
      <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200">
        <span className="text-[10px] uppercase font-bold tracking-wider block text-emerald-400">
          Curriculum Topic
        </span>
        <p className="text-xs font-black mt-0.5">{question.topicClue || 'Main Lesson Subject'}</p>
      </div>
    );
  }

  return (
    <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400">
          Secret Bluff Dossier
        </span>
        <span className="text-[10px] font-mono bg-rose-900/60 px-1.5 py-0.5 rounded text-amber-300 flex items-center gap-0.5">
          <Zap className="w-2.5 h-2.5 fill-current" /> {energyPoints}pt
        </span>
      </div>
      <p className="text-[11px] font-medium mt-1">
        {question.imposterClue || 'Bluff and write a plausible answer.'}
      </p>
    </div>
  );
};

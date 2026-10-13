import React from 'react';
import { UserCheck, ArrowRight, BookOpen } from 'lucide-react';
import { Player } from '../types/imposterTypes';

export interface InterventionPupil {
  id: string;
  name: string;
  missedConcept: string;
  recommendedAction: string;
}

interface Props {
  players?: Player[];
  interventions?: InterventionPupil[];
}

export const ImposterTargetedInterventionsCard: React.FC<Props> = ({
  players = [],
  interventions,
}) => {
  const pupils: InterventionPupil[] = interventions || (
    players.length > 0
      ? players
          .filter((p) => p.role === 'innocent' && (p.completedTasks <= 2 || p.score <= 10))
          .slice(0, 3)
          .map((p) => ({
            id: p.id,
            name: p.name,
            missedConcept: 'Component Name Drop & Precision',
            recommendedAction: 'Provide visual cue card for core terminology',
          }))
      : [
          { id: '1', name: 'Oliver', missedConcept: 'Precise component names', recommendedAction: '1-to-1 starter vocabulary pairing' },
          { id: '2', name: 'George', missedConcept: 'Distinguishing cause vs effect', recommendedAction: 'Mini whiteboard sequencing check' },
        ]
  );

  return (
    <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#2D2A26]/15 space-y-3">
      <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-600" />
          <h4 className="text-xs font-black text-[#2D2A26] uppercase tracking-wider">
            Targeted Pupil Interventions
          </h4>
        </div>
        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
          {pupils.length} Identified
        </span>
      </div>

      <div className="space-y-2">
        {pupils.map((pupil) => (
          <div key={pupil.id} className="bg-white p-2.5 rounded-xl border border-[#2D2A26]/10 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black text-[#2D2A26]">{pupil.name}</span>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-md border border-rose-200">
                {pupil.missedConcept}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#2D2A26]/70">
              <ArrowRight className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>{pupil.recommendedAction}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

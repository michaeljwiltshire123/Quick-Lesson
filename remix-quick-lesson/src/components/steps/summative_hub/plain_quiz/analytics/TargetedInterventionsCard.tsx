import React from 'react';
import { Users, AlertTriangle, ArrowRight } from 'lucide-react';

export interface PupilSupportItem {
  name: string;
  missedConcept: string;
  recommendedAction: string;
}

interface Props {
  interventions?: PupilSupportItem[];
}

const DEFAULT_INTERVENTIONS: PupilSupportItem[] = [
  {
    name: 'Oliver B.',
    missedConcept: 'Chunk 2: Keyframe Timing',
    recommendedAction: 'Provide 1-on-1 visual scaffold guide during starter',
  },
  {
    name: 'Amelia K.',
    missedConcept: 'Chunk 1: Core Vocabulary',
    recommendedAction: 'Assign quick key term matching exercise',
  },
];

export const TargetedInterventionsCard: React.FC<Props> = ({
  interventions = DEFAULT_INTERVENTIONS,
}) => {
  return (
    <div className="bg-[#1E1C1A] text-white p-4.5 rounded-2xl border border-white/10 space-y-3.5">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-200">
            Targeted Pupil Interventions
          </h3>
        </div>
        <span className="text-[10px] text-gray-400 font-mono">{interventions.length} Pupils Flagged</span>
      </div>

      <div className="space-y-2.5">
        {interventions.map((item, idx) => (
          <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300">{item.name}</span>
              <span className="flex items-center gap-1 text-[10px] text-rose-300 font-bold bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
                <AlertTriangle className="w-3 h-3" />
                {item.missedConcept}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-300 font-medium pt-1 border-t border-white/5">
              <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>{item.recommendedAction}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

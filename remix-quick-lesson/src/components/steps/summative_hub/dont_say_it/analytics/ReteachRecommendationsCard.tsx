import React from 'react';
import { Target, ArrowRight, Lightbulb, CheckCircle } from 'lucide-react';

export interface ReteachItem {
  topic: string;
  recommendation: string;
  actionableActivity: string;
}

interface Props {
  items?: ReteachItem[];
}

const DEFAULT_RETEACH: ReteachItem[] = [
  {
    topic: 'Section 1: Respiration vs Breathing',
    recommendation: 'Re-explain that respiration is a chemical cellular reaction releasing ATP energy, not gas exchange in lungs.',
    actionableActivity: 'Run a 3-minute "Chemical vs Mechanical" Sorting Diagram starter.',
  },
  {
    topic: 'Section 2: Photosynthesis Energy Transfer',
    recommendation: 'Emphasise light as energy driver rather than a physical matter ingredient.',
    actionableActivity: 'Prompt pupils to write a 2-sentence summary using "energy converter".',
  },
];

export const ReteachRecommendationsCard: React.FC<Props> = ({ items = DEFAULT_RETEACH }) => {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-600" />
          <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
            Actionable Follow-Up Reteach Recommendations
          </h4>
        </div>
        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
          Curriculum Alignment
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {items.map((item, idx) => (
          <div key={idx} className="p-3 bg-amber-50/50 border border-amber-200 rounded-xl space-y-1">
            <div className="flex items-center justify-between font-bold text-amber-950">
              <span className="flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5 text-amber-600" /> {item.topic}</span>
              <span className="text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-black uppercase">Target Area</span>
            </div>
            <p className="text-[11px] text-slate-700 font-medium pl-5">{item.recommendation}</p>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 font-bold pl-5 pt-1">
              <ArrowRight className="w-3 h-3 text-emerald-600" />
              <span>Suggested 5-Min Activity: {item.actionableActivity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

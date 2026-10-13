import React from 'react';
import { Sparkles, MessageSquare, RefreshCw } from 'lucide-react';
import { LadderRungQuestion } from '../typesLadder';

interface Props {
  rungs: LadderRungQuestion[];
}

export const LadderReteachCoachCard: React.FC<Props> = ({ rungs }) => {
  const lowestMasteryRung = rungs.reduce((acc, r) => (r.rungNumber > acc.rungNumber ? r : acc), rungs[0] || { rungNumber: 10, prompt: 'Evaluation structures' });

  const mockScript = `Right class, let's address the misconception on Stage ${lowestMasteryRung?.rungNumber || 10}. Many of you selected the standard distractors because you missed the critical evaluation boundary. Let's prioritise understanding this together: when we analyse these parameters, always remember to cross-reference our core curriculum checklist. Let's do a quick live practice to cement this behaviour!`;

  return (
    <div className="bg-amber-50/50 border border-amber-500/25 rounded-2xl p-4 space-y-3 shadow-xs">
      <div className="flex items-center justify-between border-b border-amber-500/10 pb-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">AI Concept Reteach Coach</h4>
        </div>
        <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
          2-Min Intervention
        </span>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-bold text-amber-800 uppercase block">Target Intervention Node:</span>
        <div className="text-xs text-amber-900 bg-amber-100/60 p-2.5 rounded-xl border border-amber-200/50 italic leading-relaxed">
          "{lowestMasteryRung?.prompt || 'Advanced critical analysis concepts'}"
        </div>
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-amber-800 uppercase block">Suggested Teacher Delivery Script:</span>
        <div className="bg-white/80 p-3 rounded-xl border border-amber-200 text-xs text-gray-700 leading-relaxed font-serif flex items-start gap-2.5">
          <MessageSquare className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>{mockScript}</span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';

interface Props {
  explainer: string;
  totalVotes: number;
}

export const MisconceptionAndReflectionBanner: React.FC<Props> = ({ explainer, totalVotes }) => {
  const getFollowUpRecommendation = (): string => {
    if (totalVotes === 0) {
      return 'Invite initial pupil responses before discussing core principles.';
    }
    if (totalVotes < 5) {
      return 'Encourage peer discussion in pairs to build consensus on key terminology.';
    }
    return 'If split answers emerge, facilitate targeted cold-calling to address the primary misconception directly.';
  };

  return (
    <div className="bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-2xl p-3.5 space-y-2.5 shadow-2xs">
      {explainer && (
        <div className="flex items-start gap-2 text-xs text-[#2D2A26]">
          <Lightbulb className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-[11px] uppercase tracking-wider text-[#D97706]">
              Teacher Misconception Guidance
            </span>
            <p className="text-[#2D2A26]/85 leading-relaxed">{explainer}</p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 text-xs bg-white p-2.5 rounded-xl border border-amber-200">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-[11px] uppercase tracking-wider text-amber-800">
            Pedagogical Reflection Strategy
          </span>
          <p className="text-[#2D2A26]/80 text-[11px] leading-snug">
            {getFollowUpRecommendation()}
          </p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Award, BookmarkCheck } from 'lucide-react';

interface Props {
  criteriaCodes: string[];
  coveredConcepts: string[];
}

export const TaskCardBadges: React.FC<Props> = ({ criteriaCodes, coveredConcepts }) => (
  <div className="space-y-2">
    {criteriaCodes.length > 0 && (
      <div className="flex flex-wrap items-center gap-1.5">
        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-800 uppercase tracking-wide mr-0.5">
          <Award className="w-3 h-3 text-[#D97706]" />
          <span>Criteria:</span>
        </div>
        {criteriaCodes.map((code) => (
          <span
            key={code}
            className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200/80 shadow-2xs"
          >
            {code}
          </span>
        ))}
      </div>
    )}

    {coveredConcepts.length > 0 && (
      <div className="flex flex-wrap items-center gap-1.5">
        <div className="flex items-center gap-1 text-[10px] font-semibold text-[#2D2A26]/60 mr-0.5">
          <BookmarkCheck className="w-3 h-3 text-emerald-600" />
          <span>Coverage:</span>
        </div>
        {coveredConcepts.map((concept) => (
          <span
            key={concept}
            className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-50 text-emerald-900 border border-emerald-200 shadow-2xs"
          >
            {concept}
          </span>
        ))}
      </div>
    )}
  </div>
);

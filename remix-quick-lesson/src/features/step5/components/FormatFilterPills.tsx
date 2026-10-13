import React from 'react';
import { DiscussionStarterFormatType } from '../types/starterTypes';
import { RotateCw } from 'lucide-react';

interface FormatFilterPillsProps {
  selectedFilter: DiscussionStarterFormatType;
  onSelectFilter: (filter: DiscussionStarterFormatType) => void;
  counts: Record<string, number>;
  onRefreshCategory?: (filter: DiscussionStarterFormatType) => void;
  isGenerating?: boolean;
}

export const FormatFilterPills: React.FC<FormatFilterPillsProps> = ({
  selectedFilter,
  onSelectFilter,
  counts,
  onRefreshCategory,
  isGenerating = false,
}) => {
  const filters: { id: DiscussionStarterFormatType; label: string }[] = [
    { id: 'true_false', label: 'True / False' },
    { id: 'forced_dichotomy', label: 'Forced Choice' },
    { id: 'paradox', label: 'Paradox' },
    { id: 'would_you_rather', label: 'Would You Rather' },
    { id: 'predict_disaster', label: 'Predict Disaster' },
    { id: 'finger_scale', label: 'Finger Scale (1-10)' },
    { id: 'socratic_tension', label: 'Socratic Tension' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => {
          const isActive = selectedFilter === f.id;
          const count = counts[f.id] || 0;

          return (
            <button
              key={f.id}
              onClick={() => onSelectFilter(f.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                isActive
                  ? 'bg-[#2D2A26] text-[#F59E0B] border-2 border-[#F59E0B] ring-2 ring-[#F59E0B]/20'
                  : 'bg-white text-[#2D2A26] border border-[#2D2A26]/15 hover:bg-[#F8F6F0]'
              }`}
            >
              <span>{f.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-[#F59E0B] text-[#2D2A26]' : 'bg-[#2D2A26]/10 text-[#2D2A26]/70'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {onRefreshCategory && (
        <button
          onClick={() => onRefreshCategory(selectedFilter)}
          disabled={isGenerating}
          title={`Generate 6 new sparks for ${filters.find((f) => f.id === selectedFilter)?.label}`}
          className="px-3 py-1.5 rounded-xl border border-[#2D2A26]/20 bg-white hover:bg-[#F8F6F0] text-[#2D2A26] text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
        >
          <RotateCw className={`w-3.5 h-3.5 text-[#D97706] ${isGenerating ? 'animate-spin' : ''}`} />
          <span>Refresh Category</span>
        </button>
      )}
    </div>
  );
};

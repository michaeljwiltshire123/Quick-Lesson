import React from 'react';
import { X } from 'lucide-react';

interface LearningProgressionStepRowProps {
  step: string;
  index: number;
  onUpdate: (index: number, val: string) => void;
  onRemove: (index: number) => void;
}

export const LearningProgressionStepRow: React.FC<LearningProgressionStepRowProps> = ({
  step,
  index,
  onUpdate,
  onRemove,
}) => (
  <div className="flex items-center gap-2 bg-white p-2 sm:p-2.5 rounded-xl border border-[#2D2A26]/15 shadow-2xs">
    <span className="w-6 h-6 rounded-full bg-[#2D2A26] text-[#F8F6F0] text-xs font-bold flex items-center justify-center shrink-0">
      {index + 1}
    </span>
    <input
      type="text"
      value={step}
      onChange={(e) => onUpdate(index, e.target.value)}
      placeholder={`Milestone Step ${index + 1}...`}
      className="flex-1 bg-transparent text-xs text-[#2D2A26] placeholder-[#2D2A26]/40 focus:outline-none"
    />
    <button
      type="button"
      onClick={() => onRemove(index)}
      className="text-[#2D2A26]/40 hover:text-rose-600 p-1 cursor-pointer transition-colors"
      title="Remove Step"
    >
      <X className="w-3.5 h-3.5" />
    </button>
  </div>
);

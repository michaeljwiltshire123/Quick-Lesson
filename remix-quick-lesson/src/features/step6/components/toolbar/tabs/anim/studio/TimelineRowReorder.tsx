import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface TimelineRowReorderProps {
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export const TimelineRowReorder: React.FC<TimelineRowReorderProps> = ({
  index, total, onMoveUp, onMoveDown,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 shrink-0 select-none">
      <button
        type="button"
        disabled={index === 0}
        onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
        className="p-0.5 rounded hover:bg-stone-200 disabled:opacity-20 text-stone-600 hover:text-stone-900 cursor-pointer disabled:cursor-not-allowed transition-colors"
        title="Move step up in sequence"
      >
        <ChevronUp className="w-3 h-3" />
      </button>
      <button
        type="button"
        disabled={index === total - 1}
        onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
        className="p-0.5 rounded hover:bg-stone-200 disabled:opacity-20 text-stone-600 hover:text-stone-900 cursor-pointer disabled:cursor-not-allowed transition-colors"
        title="Move step down in sequence"
      >
        <ChevronDown className="w-3 h-3" />
      </button>
    </div>
  );
};

import React from 'react';
import { Info } from 'lucide-react';
import { ProgressionItem } from './progressionData';

interface ProgressionSuggestionItemProps {
  item: ProgressionItem;
  isAdded: boolean;
  onSelect: (label: string) => void;
  index?: number;
}

export const ProgressionSuggestionItem: React.FC<ProgressionSuggestionItemProps> = ({
  item,
  isAdded,
  onSelect,
  index = 2,
}) => (
  <div
    onClick={() => onSelect(item.label)}
    className={`relative w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer border ${
      isAdded
        ? 'bg-[#F59E0B]/15 border-[#F59E0B]/60 text-[#2D2A26] font-semibold'
        : 'bg-white border-[#2D2A26]/15 text-[#2D2A26] hover:bg-neutral-50 hover:border-[#F59E0B]/70'
    }`}
  >
    <span className="truncate pr-2 select-none">{item.label}</span>
    <div
      className="group/info flex items-center ml-1 shrink-0"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`Definition for ${item.label}`}
        className="p-1 rounded-full text-[#2D2A26]/40 group-hover/info:text-[#F59E0B] hover:text-[#F59E0B] transition-colors cursor-help"
      >
        <Info className="w-3.5 h-3.5" />
      </div>

      <div
        className={`absolute left-0 right-0 ${
          index < 2 ? 'top-full mt-1.5' : 'bottom-full mb-1.5'
        } hidden group-hover/info:block z-50 p-3.5 rounded-xl bg-[#FAF8F5] text-[#2D2A26] text-xs leading-relaxed shadow-xl border border-[#2D2A26]/20 pointer-events-none whitespace-normal break-words`}
      >
        <div className="font-bold text-[#2D2A26] text-xs pb-1 mb-1.5 border-b border-[#2D2A26]/10 flex items-center justify-between gap-1">
          <span className="text-amber-700 font-bold break-words">{item.label}</span>
          <span className="text-[10px] uppercase font-semibold text-[#2D2A26]/50 bg-white px-1.5 py-0.5 rounded border border-[#2D2A26]/10 shrink-0">
            {item.category}
          </span>
        </div>
        <p className="text-[#2D2A26]/85 text-xs leading-normal whitespace-normal break-words">
          {item.tooltip}
        </p>
      </div>
    </div>
  </div>
);


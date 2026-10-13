import React from 'react';
import { CheckCircle2, CheckSquare, SlidersHorizontal, ListOrdered, MessageSquare, ImageIcon, Cloud } from 'lucide-react';
import { PollType } from './types';

interface Props {
  selectedType: PollType;
  onSelectType: (type: PollType) => void;
}

interface FormatMeta {
  type: PollType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const POLL_FORMATS: FormatMeta[] = [
  { type: PollType.Single, label: 'Multiple Choice', icon: CheckCircle2 },
  { type: PollType.Multi, label: 'Checkbox', icon: CheckSquare },
  { type: PollType.Likert, label: 'Likert Scale', icon: SlidersHorizontal },
  { type: PollType.Ranking, label: 'Ranking', icon: ListOrdered },
  { type: PollType.Open, label: 'Open-Ended', icon: MessageSquare },
  { type: PollType.Image, label: 'Image Poll', icon: ImageIcon },
  { type: PollType.Wordcloud, label: 'Word Cloud', icon: Cloud },
];

export const PollTypeSelector: React.FC<Props> = ({ selectedType, onSelectType }) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2D2A26]/70">
        Poll Format
      </label>
      <div className="flex flex-wrap gap-1.5">
        {POLL_FORMATS.map((fmt) => {
          const Icon = fmt.icon;
          const isSelected = selectedType === fmt.type;
          return (
            <button
              key={fmt.type}
              type="button"
              onClick={() => onSelectType(fmt.type)}
              className={`px-2.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-[#F8F6F0] hover:bg-white text-[#2D2A26]/80 hover:text-[#2D2A26] border-[#2D2A26]/15'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#D97706]'}`} />
              <span>{fmt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

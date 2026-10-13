import React from 'react';
import { DiscussionStarterFormatType } from '../../types/starterTypes';
import { ChevronDown } from 'lucide-react';

interface FormatSelectorDropdownProps {
  currentFormat: DiscussionStarterFormatType;
  onChangeFormat: (newFormat: DiscussionStarterFormatType) => void;
}

export const FormatSelectorDropdown: React.FC<FormatSelectorDropdownProps> = ({
  currentFormat,
  onChangeFormat,
}) => {
  const formats: { id: DiscussionStarterFormatType; label: string }[] = [
    { id: 'true_false', label: 'True / False' },
    { id: 'forced_dichotomy', label: 'Forced Choice' },
    { id: 'paradox', label: 'Paradox' },
    { id: 'would_you_rather', label: 'Would You Rather' },
    { id: 'predict_disaster', label: 'Predict Disaster' },
    { id: 'finger_scale', label: 'Finger Scale (1-10)' },
    { id: 'socratic_tension', label: 'Socratic Tension' },
  ];

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center">
        <select
          value={currentFormat}
          onChange={(e) => onChangeFormat(e.target.value as DiscussionStarterFormatType)}
          className="appearance-none bg-white border border-stone-300 hover:border-stone-400 text-stone-800 text-xs font-semibold rounded-lg px-3 py-1.5 pr-8 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-800/20 cursor-pointer"
        >
          {formats.map((fmt) => (
            <option key={fmt.id} value={fmt.id}>
              {fmt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 pointer-events-none" />
      </div>
    </div>
  );
};

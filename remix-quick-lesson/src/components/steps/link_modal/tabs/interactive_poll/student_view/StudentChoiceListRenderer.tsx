import React from 'react';
import { Check, Image as ImageIcon } from 'lucide-react';
import { PollOption, PollType } from '../types';

interface Props {
  pollType: PollType;
  options: PollOption[];
  selectedOptionIds: string[];
  onChangeSelection: (ids: string[]) => void;
  disabled: boolean;
}

export const StudentChoiceListRenderer: React.FC<Props> = ({
  pollType, options, selectedOptionIds, onChangeSelection, disabled,
}) => (
  <div className="space-y-2">
    {options.map((opt) => {
      const isSel = selectedOptionIds.includes(opt.id);
      const toggle = () => {
        const next = isSel ? selectedOptionIds.filter((id) => id !== opt.id) : [opt.id];
        onChangeSelection(next);
      };
      return (
        <button
          key={opt.id}
          type="button"
          disabled={disabled}
          onClick={toggle}
          className={`w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
            isSel
              ? 'bg-amber-50 border-[#F59E0B] text-amber-900 shadow-2xs font-semibold'
              : 'bg-white border-[#2D2A26]/15 text-[#2D2A26] hover:bg-[#F8F6F0]'
          }`}
        >
          <div className="flex items-center gap-2.5 truncate">
            {pollType === PollType.Image && (
              <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shrink-0">
                <ImageIcon className="w-4 h-4" />
              </div>
            )}
            <span className="text-xs truncate">{opt.text}</span>
          </div>
          <div
            className={`w-4 h-4 rounded-md border flex items-center justify-center ${
              isSel ? 'bg-amber-500 border-amber-600 text-white' : 'border-[#2D2A26]/30'
            }`}
          >
            {isSel && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
        </button>
      );
    })}
  </div>
);

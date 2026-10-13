import React from 'react';
import { Palette, Check } from 'lucide-react';
import { AVATAR_COLOURS, AvatarColourScheme } from './avatarPresets';

interface Props {
  selectedColourId: string;
  onSelectColour: (colour: AvatarColourScheme) => void;
}

export const AvatarColourPicker: React.FC<Props> = ({ selectedColourId, onSelectColour }) => {
  const currentColour = AVATAR_COLOURS.find((c) => c.id === selectedColourId) || AVATAR_COLOURS[0];

  return (
    <div className="space-y-2 bg-[#F8F6F0] p-3 rounded-2xl border border-[#2D2A26]/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#2D2A26]">
          <Palette className="w-3.5 h-3.5 text-amber-600" />
          <span>Adjust Avatar Colour</span>
        </div>
        <span className="text-[10px] font-semibold text-[#2D2A26]/60">
          {currentColour.name}
        </span>
      </div>

      <div className="flex items-center justify-between gap-1.5 pt-0.5">
        {AVATAR_COLOURS.map((col) => {
          const isChosen = col.id === selectedColourId;
          return (
            <button
              key={col.id}
              type="button"
              onClick={() => onSelectColour(col)}
              title={col.name}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${col.dotClass} ${
                isChosen
                  ? 'ring-2 ring-offset-2 ring-[#2D2A26] scale-110 shadow-xs'
                  : 'hover:scale-105 opacity-80 hover:opacity-100'
              }`}
            >
              {isChosen && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

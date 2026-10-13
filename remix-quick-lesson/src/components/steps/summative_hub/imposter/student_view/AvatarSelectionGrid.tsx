import React from 'react';
import { AVATAR_OPTIONS, AvatarOption, AvatarColourScheme } from './avatarPresets';

interface Props {
  selectedAvatarId: string;
  colourScheme: AvatarColourScheme;
  onSelectAvatar: (avatar: AvatarOption) => void;
}

export const AvatarSelectionGrid: React.FC<Props> = ({
  selectedAvatarId,
  colourScheme,
  onSelectAvatar,
}) => {
  return (
    <div className="grid grid-cols-4 gap-2 max-h-52 overflow-y-auto pr-1 scrollbar-thin">
      {AVATAR_OPTIONS.map((av) => {
        const isSelected = selectedAvatarId === av.id;
        return (
          <button
            key={av.id}
            type="button"
            onClick={() => onSelectAvatar(av)}
            className={`p-2 rounded-2xl border text-center flex flex-col items-center gap-1 transition-all cursor-pointer ${
              isSelected
                ? `border-[#2D2A26] bg-amber-50/70 shadow-xs ring-2 ${colourScheme.ringClass}`
                : 'border-[#2D2A26]/10 hover:border-amber-300 bg-white hover:bg-[#F8F6F0]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                isSelected ? `${colourScheme.bgClass} scale-105 shadow-2xs` : 'bg-stone-100 text-stone-700'
              }`}
            >
              {av.emoji}
            </div>
            <span className="text-[9.5px] font-bold text-[#2D2A26] truncate w-full leading-tight">
              {av.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

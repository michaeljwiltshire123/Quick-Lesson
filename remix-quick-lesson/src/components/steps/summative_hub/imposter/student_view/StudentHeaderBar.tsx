import React from 'react';
import { X, Palette } from 'lucide-react';

interface Props {
  studentName: string;
  avatarEmoji?: string;
  avatarColor?: string;
  onOpenCustomizer?: () => void;
  onExit?: () => void;
}

export const StudentHeaderBar: React.FC<Props> = ({
  studentName,
  avatarEmoji,
  avatarColor,
  onOpenCustomizer,
  onExit,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onOpenCustomizer}
          title="Customise Avatar & Colour"
          className={`w-9 h-9 rounded-full font-bold text-sm flex items-center justify-center border shadow-2xs transition-all cursor-pointer ${
            avatarColor ? avatarColor : 'bg-amber-200 text-amber-900 border-amber-300'
          }`}
        >
          {avatarEmoji ? <span>{avatarEmoji}</span> : studentName.slice(0, 2).toUpperCase()}
        </button>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-black text-[#2D2A26]">{studentName}</h3>
            {onOpenCustomizer && (
              <button
                type="button"
                onClick={onOpenCustomizer}
                className="text-[10px] text-amber-700 hover:text-amber-800 flex items-center gap-0.5 font-bold cursor-pointer"
              >
                <Palette className="w-2.5 h-2.5" />
                <span>Colours</span>
              </button>
            )}
          </div>
          <p className="text-[10px] text-[#2D2A26]/60">Imposter Game</p>
        </div>
      </div>
      {onExit && (
        <button
          type="button"
          onClick={onExit}
          className="p-1.5 rounded-lg text-[#2D2A26]/60 hover:bg-black/5 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

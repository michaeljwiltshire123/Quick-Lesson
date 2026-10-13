import React, { useState, useEffect } from 'react';
import { User, Clock, Check } from 'lucide-react';
import { AVATAR_OPTIONS, AVATAR_COLOURS, AvatarOption, AvatarColourScheme } from './avatarPresets';
import { AvatarColourPicker } from './AvatarColourPicker';
import { AvatarSelectionGrid } from './AvatarSelectionGrid';

interface Props {
  isOpen: boolean;
  onSelectAvatar: (avatarId: string, colourClass?: string, emoji?: string) => void;
  initialAvatarId?: string;
}

export const AvatarCustomizerModal: React.FC<Props> = ({
  isOpen,
  onSelectAvatar,
  initialAvatarId = 'av-owl',
}) => {
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption>(() =>
    AVATAR_OPTIONS.find((a) => a.id === initialAvatarId) || AVATAR_OPTIONS[0]
  );
  const [selectedColour, setSelectedColour] = useState<AvatarColourScheme>(AVATAR_COLOURS[0]);

  useEffect(() => {
    if (!isOpen) return;
    setSecondsLeft(30);
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onSelectAvatar(selectedAvatar.id, selectedColour.bgClass, selectedAvatar.emoji);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, selectedAvatar, selectedColour, onSelectAvatar]);

  if (!isOpen || secondsLeft === 0) return null;

  return (
    <div id="avatar-customizer-modal" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-[#2D2A26]/20 max-w-sm w-full p-5 shadow-2xl space-y-3.5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-100 text-amber-800">
              <User className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-black text-[#2D2A26]">Customise Pupil Avatar</h3>
              <p className="text-[10px] text-[#2D2A26]/60">16 characters with adjustable colours</p>
            </div>
          </div>
          <div className={`flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border transition-all ${
            secondsLeft <= 10
              ? 'text-rose-700 bg-rose-50 border-rose-300 animate-pulse'
              : 'text-amber-900 bg-amber-50 border-amber-300'
          }`}>
            <Clock className={`w-3.5 h-3.5 ${secondsLeft <= 10 ? 'text-rose-600' : 'text-amber-600'}`} />
            <span>{secondsLeft}s</span>
          </div>
        </div>

        <div className="space-y-3">
          <AvatarColourPicker
            selectedColourId={selectedColour.id}
            onSelectColour={setSelectedColour}
          />
          <AvatarSelectionGrid
            selectedAvatarId={selectedAvatar.id}
            colourScheme={selectedColour}
            onSelectAvatar={setSelectedAvatar}
          />
        </div>

        <button
          type="button"
          onClick={() => onSelectAvatar(selectedAvatar.id, selectedColour.bgClass, selectedAvatar.emoji)}
          className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#2D2A26] hover:bg-black text-white flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-98"
        >
          <Check className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Confirm {selectedAvatar.name} ({selectedColour.name})</span>
        </button>
      </div>
    </div>
  );
};

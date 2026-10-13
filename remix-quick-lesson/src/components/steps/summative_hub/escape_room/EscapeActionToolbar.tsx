import React from 'react';
import { Paperclip, Eye, CheckCircle2, QrCode } from 'lucide-react';
import { EscapeRoomConfig } from './typesEscape';

interface Props {
  config: EscapeRoomConfig;
  isAttached: boolean;
  onAttachToLesson: () => void;
  onPreviewLiveBoard: () => void;
}

export const EscapeActionToolbar: React.FC<Props> = ({
  config, isAttached, onAttachToLesson, onPreviewLiveBoard,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-[#2D2A26]/15 rounded-2xl shadow-xs">
      <div className="flex items-center gap-2.5 text-xs text-[#2D2A26]/80">
        <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
          <QrCode className="w-4 h-4" />
        </div>
        <div>
          <div className="font-bold text-[#2D2A26]">Lesson Planning Mode</div>
          <div className="text-[11px] text-[#2D2A26]/60">
            Attaches 4 non-numeric challenge locks, pupil QR badge, and presentation slide links to plan.
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPreviewLiveBoard}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#F8F6F0] hover:bg-white text-[#2D2A26] border border-[#2D2A26]/15 cursor-pointer shadow-2xs active:scale-98 transition-all"
        >
          <Eye className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Preview Live Board</span>
        </button>

        <button
          type="button"
          onClick={onAttachToLesson}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer shadow-xs active:scale-98 transition-all ${
            isAttached
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-amber-500 hover:bg-amber-600 text-white'
          }`}
        >
          {isAttached ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Attached to Lesson Plan</span>
            </>
          ) : (
            <>
              <Paperclip className="w-3.5 h-3.5" />
              <span>Attach Escape Room to Lesson Plan</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

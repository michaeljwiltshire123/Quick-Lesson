import React from 'react';
import { ShieldCheck, QrCode, MonitorPlay } from 'lucide-react';
import { ImposterGameState } from './types/imposterTypes';
import { StudentPreviewModal } from './StudentPreviewModal';

interface Props {
  gameState: ImposterGameState;
  onOpenSetup: () => void;
  onPresentMainBoard: () => void;
  onNotice?: (msg: string) => void;
}

export const ImposterActiveRoomBanner: React.FC<Props> = ({
  gameState,
  onOpenSetup,
  onPresentMainBoard,
  onNotice,
}) => {
  return (
    <div className="bg-[#F8F6F0] rounded-2xl p-5 border border-[#2D2A26]/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-[#2D2A26]">Classroom Lobby Active</span>
        </div>
        <div className="text-3xl font-black font-mono tracking-widest text-[#2D2A26]">
          {gameState.roomCode}
        </div>
        <p className="text-xs text-[#2D2A26]/60">
          {gameState.config.imposterCount} Imposter(s) • {gameState.config.timerPreset}s Timer • {gameState.config.offlinePrintable ? 'Printable mode on' : 'Digital devices'}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          id="btn-view-imposter-lobby"
          type="button"
          onClick={onOpenSetup}
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-[#2D2A26]/20 text-[#2D2A26] flex items-center gap-1.5 shadow-2xs hover:bg-stone-50"
        >
          <QrCode className="w-3.5 h-3.5 text-amber-600" />
          Show QR & Slides Link
        </button>

        <StudentPreviewModal
          lessonTitle={gameState.config.lessonTitle}
          onNotice={onNotice}
        />

        <button
          id="btn-present-main-board"
          type="button"
          onClick={onPresentMainBoard}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 shadow-sm"
        >
          <MonitorPlay className="w-3.5 h-3.5" />
          Present Main Board
        </button>
      </div>
    </div>
  );
};

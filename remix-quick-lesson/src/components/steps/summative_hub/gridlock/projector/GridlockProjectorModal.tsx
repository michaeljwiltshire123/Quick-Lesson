import React from 'react';
import { GridlockGameState } from '../types/gridlockTypes';
import { GridlockInteractiveArena } from './GridlockInteractiveArena';
import { X, Maximize2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  gameState: GridlockGameState;
  onClose: () => void;
  onNotice?: (msg: string) => void;
}

export const GridlockProjectorModal: React.FC<Props> = ({
  isOpen,
  gameState,
  onClose,
  onNotice,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#121110]/90 backdrop-blur-md flex flex-col p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-7xl mx-auto flex flex-col space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10 text-white">
          <div className="flex items-center gap-2">
            <Maximize2 className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-black uppercase tracking-wider">
              Classroom Projector Arena • {gameState.roomCode}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <GridlockInteractiveArena
          initialGameState={gameState}
          onClose={onClose}
          onNotice={onNotice}
        />
      </div>
    </div>
  );
};

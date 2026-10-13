import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import { Player } from '../types/imposterTypes';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  onPlayAgain: () => void;
  onViewReport?: () => void;
}

export const ClassVictoryModal: React.FC<Props> = ({ isOpen, onClose, players, onPlayAgain, onViewReport }) => {
  if (!isOpen) return null;

  const imposters = players.filter((p) => p.role === 'imposter');
  const innocents = players.filter((p) => p.role === 'innocent');

  return (
    <div id="imposter-class-victory-modal" className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-[#2D2A26]/20 max-w-lg w-full p-6 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
        <div className="w-14 h-14 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
          <Trophy className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full">
            Victory!
          </span>
          <h2 className="text-xl font-black text-[#2D2A26]">The Team Won!</h2>
          <p className="text-xs text-[#2D2A26]/70 max-w-md mx-auto">
            The group successfully spotted all the imposters and worked out the answers together!
          </p>
        </div>

        <div className="bg-[#F8F6F0] p-3.5 rounded-2xl border border-[#2D2A26]/10 space-y-2 text-left">
          <div>
            <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wide">Imposters Caught</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {imposters.map((imp) => (
                <span key={imp.id} className="text-xs font-bold px-2 py-0.5 bg-rose-100 text-rose-800 border border-rose-300 rounded-lg">
                  {imp.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">Team Members</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {innocents.map((inn) => (
                <span key={inn.id} className="text-xs font-medium px-2 py-0.5 bg-white text-[#2D2A26] border border-[#2D2A26]/15 rounded-md">
                  {inn.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-center gap-2">
          {onViewReport && (
            <button
              id="btn-view-summary-report"
              type="button"
              onClick={onViewReport}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              Game Summary
            </button>
          )}
          <button
            id="btn-imposter-play-again"
            type="button"
            onClick={onPlayAgain}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

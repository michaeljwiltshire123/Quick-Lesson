import React from 'react';
import { Presentation, CheckCircle, MonitorPlay } from 'lucide-react';

interface Props {
  isAttached: boolean;
  termCount: number;
  onToggleAttach: (attached: boolean) => void;
  slideTitle?: string;
}

export const WhiteboardSyncBadge: React.FC<Props> = ({
  isAttached, termCount, onToggleAttach, slideTitle
}) => {
  const handleToggle = () => {
    const nextState = !isAttached;
    try {
      sessionStorage.setItem(
        'whiteboard_puzzle_deck_sync',
        JSON.stringify({
          active: nextState,
          termCount,
          slideTitle: slideTitle || 'Vocabulary Puzzles',
          syncedAt: Date.now()
        })
      );
    } catch {}
    onToggleAttach(nextState);
  };

  return (
    <div className="border border-[#2D2A26]/15 rounded-2xl p-3 bg-white shadow-2xs space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${isAttached ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-[#D97706]'}`}>
            <Presentation className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#2D2A26] flex items-center gap-1.5">
              Whiteboard Puzzle Game
              {isAttached && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  <CheckCircle className="w-3 h-3" /> Live Synced
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#2D2A26]/70">
              {isAttached ? `Deck of ${termCount} puzzles pinned to Step 3 Card & Step 10 Launchpad` : `Broadcast ${termCount} vocabulary puzzles to classroom whiteboard`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
            isAttached
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100'
              : 'bg-[#D97706] hover:bg-[#B45309] text-white shadow-xs'
          }`}
        >
          <MonitorPlay className="w-3.5 h-3.5" />
          {isAttached ? 'Detach Whiteboard Game' : 'Attach Whiteboard Puzzle Game to Step 3 Card'}
        </button>
      </div>
    </div>
  );
};

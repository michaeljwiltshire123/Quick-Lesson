import React, { useState } from 'react';
import { Presentation, CheckCircle, MonitorPlay, Gamepad2 } from 'lucide-react';
import { LimerickItem } from './types';
import { InteractiveSetupModal } from './InteractiveSetupModal';
import { InteractiveGameModal } from './InteractiveGameModal';

interface Props {
  isAttached: boolean;
  verses: LimerickItem[];
  onToggleAttach: (attached: boolean) => void;
  slideTitle?: string;
}

export const LimerickWhiteboardSyncBadge: React.FC<Props> = ({
  isAttached, verses, onToggleAttach, slideTitle
}) => {
  const [showSetup, setShowSetup] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [assignmentTitle, setAssignmentTitle] = useState('Interactive Rhyme Challenge');

  const selectedItems = verses.filter(v => v.selected);
  const activeVerses = selectedItems.length > 0 ? selectedItems : verses;

  const handleToggle = () => {
    const nextState = !isAttached;
    try {
      sessionStorage.setItem(
        'whiteboard_limerick_deck_sync',
        JSON.stringify({
          active: nextState,
          verseCount: activeVerses.length,
          verses: activeVerses.map(v => ({ title: v.title, style: v.style, lines: v.verses })),
          slideTitle: slideTitle || 'Rhyming Verse Maker',
          syncedAt: Date.now()
        })
      );
    } catch {}
    onToggleAttach(nextState);
  };

  return (
    <div className="border border-[#2D2A26]/15 rounded-2xl p-3 bg-white shadow-2xs space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${isAttached ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-[#D97706]'}`}>
            <Presentation className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#2D2A26] flex items-center gap-1.5">
              Whiteboard Rhyme Game
              {isAttached && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  <CheckCircle className="w-3 h-3" /> Live Synced
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#2D2A26]/70">
              {isAttached ? `Deck of ${activeVerses.length} verses pinned` : `Broadcast rhyming verses to classroom whiteboard`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
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
            {isAttached ? 'Detach Whiteboard Game' : 'Attach Rhyme Game to Step 3 Card'}
          </button>
        </div>
      </div>

      <div className="pt-2 border-t border-[#2D2A26]/10 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[#2D2A26]/80">
          Interactive Student Game ({activeVerses.length} verses selected):
        </span>
        <button
          type="button"
          onClick={() => setShowSetup(true)}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <Gamepad2 className="w-3.5 h-3.5 text-[#D97706]" /> Setup Interactive Game & QR Code
        </button>
      </div>

      <InteractiveSetupModal
        items={activeVerses}
        isOpen={showSetup}
        onClose={() => setShowSetup(false)}
        onLaunchGame={(config) => {
          setAssignmentTitle(config.title);
          setShowSetup(false);
          setShowGame(true);
        }}
      />

      <InteractiveGameModal
        items={activeVerses}
        isOpen={showGame}
        onClose={() => setShowGame(false)}
        assignmentTitle={assignmentTitle}
      />
    </div>
  );
};

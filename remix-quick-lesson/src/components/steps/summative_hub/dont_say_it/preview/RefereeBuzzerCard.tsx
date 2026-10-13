import React, { useState } from 'react';
import { Volume2, ShieldAlert, SkipForward, AlertOctagon } from 'lucide-react';

interface Props {
  onFoul: () => void;
  onPass: () => void;
}

export const RefereeBuzzerCard: React.FC<Props> = ({ onFoul, onPass }) => {
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleTriggerFoul = () => {
    setLastAction('FOUL! Forbidden word uttered!');
    onFoul();
    setTimeout(() => setLastAction(null), 2000);
  };

  const handleTriggerPass = () => {
    setLastAction('Card Passed (-20 pts)');
    onPass();
    setTimeout(() => setLastAction(null), 1500);
  };

  return (
    <div className="bg-slate-950 border-2 border-rose-500 rounded-2xl p-4 text-white shadow-xl space-y-3 flex flex-col justify-between">
      <div className="flex justify-between items-center text-[10px] uppercase font-bold text-rose-400 border-b border-rose-500/30 pb-2">
        <span className="flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> Referee Control Panel</span>
        <span className="bg-rose-500/20 px-2 py-0.5 rounded text-rose-300 font-mono">LIVE JUDGE</span>
      </div>

      <div className="space-y-2 text-center py-2">
        <p className="text-[11px] text-gray-300 font-medium">Listen closely! If the clue-giver says ANY forbidden taboo word, hit the penalty buzzer instantly.</p>
        {lastAction && (
          <div className="p-2 bg-rose-500/20 border border-rose-500 text-rose-300 font-black text-xs rounded-xl animate-bounce">
            {lastAction}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={handleTriggerFoul}
          className="w-full py-4 bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white font-black rounded-xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-900/50 cursor-pointer active:scale-95 transition-all"
        >
          <AlertOctagon className="w-5 h-5 text-white animate-pulse" />
          <span>BUZZER: TABOO WORD SAID!</span>
        </button>

        <button
          type="button"
          onClick={handleTriggerPass}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 font-bold rounded-xl text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <SkipForward className="w-3.5 h-3.5" />
          <span>Pass Card (-20 pts)</span>
        </button>
      </div>
    </div>
  );
};

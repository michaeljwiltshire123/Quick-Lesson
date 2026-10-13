import React, { useState } from 'react';
import { Flag, Flame, Smile, VolumeX, Skull, Timer, CheckCircle2 } from 'lucide-react';

interface Props {
  studentName: string;
  onSendReaction: (emoji: string) => void;
  onWhistleblow: (reason: string) => void;
  onPlaceBet?: (prediction: 'under_30' | 'over_30') => void;
}

const EMOJIS = ['🔥', '😬', '🤫', '💀'];

export const SpectatorLivePanel: React.FC<Props> = ({
  studentName,
  onSendReaction,
  onWhistleblow,
  onPlaceBet,
}) => {
  const [hasFlagged, setHasFlagged] = useState(false);
  const [prediction, setPrediction] = useState<'under_30' | 'over_30' | null>(null);

  const handleFlag = (reason: string) => {
    setHasFlagged(true);
    onWhistleblow(reason);
    setTimeout(() => setHasFlagged(false), 5000);
  };

  const handleBet = (pred: 'under_30' | 'over_30') => {
    setPrediction(pred);
    onPlaceBet?.(pred);
  };

  return (
    <div className="bg-slate-900 text-white p-5 rounded-3xl border border-white/10 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="text-xs font-black uppercase tracking-wider text-amber-400">Live Squad Actions</div>
        <span className="text-[10px] text-gray-400 font-bold">{studentName}</span>
      </div>

      {/* Whistleblower Assist */}
      <div className="space-y-1.5">
        <div className="text-[10px] uppercase font-bold text-gray-300 flex items-center gap-1.5">
          <Flag className="w-3.5 h-3.5 text-rose-500" /> Whistleblower Assist (Alert Your Judge)
        </div>
        <button
          type="button"
          disabled={hasFlagged}
          onClick={() => handleFlag('Forbidden word heard')}
          className={`w-full py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            hasFlagged
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-rose-600 hover:bg-rose-700 text-white shadow-md active:scale-98'
          }`}
        >
          <Flag className="w-4 h-4" />
          <span>{hasFlagged ? '⚠️ Warning Sent to Your Judge!' : 'Flag Forbidden Word Slip-Up!'}</span>
        </button>
      </div>

      {/* Silent Emoji Reactions */}
      <div className="space-y-1.5 pt-1">
        <div className="text-[10px] uppercase font-bold text-gray-300 flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-amber-400" /> Silent Projector Reactions
        </div>
        <div className="grid grid-cols-4 gap-2">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => onSendReaction(emoji)}
              className="py-2.5 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl text-xl transition-all transform active:scale-90 flex items-center justify-center cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Timer Predictions */}
      <div className="space-y-1.5 pt-1 border-t border-white/10">
        <div className="text-[10px] uppercase font-bold text-gray-300 flex items-center gap-1.5">
          <Timer className="w-3.5 h-3.5 text-blue-400" /> 30s Speed Prediction (+50 Pts)
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleBet('under_30')}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              prediction === 'under_30'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                : 'bg-slate-800 text-slate-200 border-white/10 hover:bg-slate-700'
            }`}
          >
            ⚡ Under 30s
          </button>
          <button
            type="button"
            onClick={() => handleBet('over_30')}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              prediction === 'over_30'
                ? 'bg-blue-500 text-white border-blue-400 font-black'
                : 'bg-slate-800 text-slate-200 border-white/10 hover:bg-slate-700'
            }`}
          >
            ⏳ Over 30s
          </button>
        </div>
      </div>
    </div>
  );
};

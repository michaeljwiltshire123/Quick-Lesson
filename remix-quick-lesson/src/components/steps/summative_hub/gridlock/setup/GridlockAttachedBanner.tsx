import React from 'react';
import { CheckCircle2, ArrowRight, Grid } from 'lucide-react';

interface Props {
  roomCode: string;
  onContinueToStep5?: () => void;
}

export const GridlockAttachedBanner: React.FC<Props> = ({ roomCode, onContinueToStep5 }) => {
  return (
    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-black text-emerald-900 flex items-center gap-2">
            Attached to Lesson Plan
            <span className="text-[10px] bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded-full font-mono">
              Room: {roomCode}
            </span>
          </div>
          <p className="text-[11px] text-emerald-800">
            GridLock 5x5 battle is saved in your lesson sequence. Ready for your active lesson delivery.
          </p>
        </div>
      </div>

      {onContinueToStep5 && (
        <button
          type="button"
          onClick={onContinueToStep5}
          className="py-2 px-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
        >
          <span>Step 5: Hook & Vocabulary</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

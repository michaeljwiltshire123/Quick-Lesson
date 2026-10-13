import React, { useEffect, useState } from 'react';
import { QuestionSwapQueue } from './typesLiveLadder';
import { RefreshCw, Zap } from 'lucide-react';

interface Props {
  queue: QuestionSwapQueue | null;
  onExecuteSwap: () => void;
  onCancelSwap: () => void;
}

export const QuestionSwapSyncOverlay: React.FC<Props> = ({ queue, onExecuteSwap, onCancelSwap }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!queue || !queue.pending) return;
    setCountdown(10);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onExecuteSwap();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [queue, onExecuteSwap]);

  if (!queue || !queue.pending) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white border-2 border-amber-500 rounded-3xl p-6 max-w-md w-full shadow-xl space-y-4 text-center">
        <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <RefreshCw className="w-6 h-6 animate-spin" />
        </div>

        <div>
          <h3 className="text-base font-bold text-[#2D2A26]">Synchronized Concept Swap</h3>
          <p className="text-xs text-[#2D2A26]/70 mt-1">
            Queued swap for Rung {queue.sourceRung}. Applying across class in {countdown}s...
          </p>
        </div>

        <div className="bg-[#F8F6F0] p-3 rounded-2xl border border-[#2D2A26]/10 text-left space-y-1">
          <div className="text-[10px] font-bold text-amber-800 uppercase flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-600" /> New Question Prompt:
          </div>
          <div className="text-xs font-bold text-[#2D2A26]">{queue.newPrompt}</div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onCancelSwap}
            className="flex-1 py-2.5 bg-[#F8F6F0] hover:bg-white text-[#2D2A26] border border-[#2D2A26]/15 rounded-xl text-xs font-bold cursor-pointer"
          >
            Dismiss
          </button>
          <button
            type="button"
            onClick={onExecuteSwap}
            className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer"
          >
            Execute Swap Now
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, FastForward, Volume2, VolumeX } from 'lucide-react';

interface Props {
  activeIdx: number;
  totalCount: number;
  timer: number;
  isRunning: boolean;
  isMuted?: boolean;
  onToggleMute?: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onFastForwardPhase?: () => void;
}

export const ImposterSimulatorControls: React.FC<Props> = ({
  activeIdx,
  totalCount,
  timer,
  isRunning,
  isMuted = false,
  onToggleMute,
  onPrev,
  onNext,
  onToggleTimer,
  onResetTimer,
  onFastForwardPhase,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/80 p-3 rounded-2xl border border-white/10">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={activeIdx === 0}
          className="p-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 rounded-lg text-xs cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-bold font-mono px-2 text-amber-300">
          Round {activeIdx + 1} of {totalCount}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={activeIdx === totalCount - 1}
          className="p-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 rounded-lg text-xs cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 font-mono font-black text-amber-400 text-sm">
        {onToggleMute && (
          <button
            type="button"
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Presenter' : 'Mute Presenter Voice'}
            className={`p-1.5 rounded-lg text-xs cursor-pointer transition-colors border ${
              isMuted ? 'bg-slate-800 text-rose-400 border-rose-500/30' : 'bg-slate-800 text-emerald-400 border-emerald-500/30'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
        <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-white/10 text-xs">
          ⏱️ {timer}s
        </span>
        <button
          type="button"
          onClick={onToggleTimer}
          className="px-3 py-1.5 bg-amber-400 text-slate-950 rounded-lg text-xs font-black cursor-pointer hover:bg-amber-300 transition-colors flex items-center gap-1.5 shadow-xs"
        >
          {isRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isRunning ? 'Pause Live Game' : 'Auto-Play Game Loop'}</span>
        </button>
        {onFastForwardPhase && (
          <button
            type="button"
            onClick={onFastForwardPhase}
            title="Jump to Next Phase"
            className="p-1.5 bg-indigo-600 text-white rounded-lg text-xs cursor-pointer hover:bg-indigo-500 transition-colors flex items-center gap-1"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">Skip Phase</span>
          </button>
        )}
        <button
          type="button"
          onClick={onResetTimer}
          title="Restart Loop"
          className="p-1.5 bg-slate-700 text-white rounded-lg text-xs cursor-pointer hover:bg-slate-600 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

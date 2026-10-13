import React from 'react';
import { Play, Square, MousePointer } from 'lucide-react';

interface MotionPlayBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  totalRules: number;
}

export const MotionPlayBar: React.FC<MotionPlayBarProps> = ({
  isPlaying,
  onTogglePlay,
  totalRules,
}) => {
  return (
    <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/90 shadow-2xs space-y-2 select-none">
      <button
        type="button"
        onClick={onTogglePlay}
        disabled={totalRules === 0 && !isPlaying}
        className={`w-full py-2.5 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all active:scale-[0.99] disabled:opacity-40 ${
          isPlaying
            ? 'bg-amber-500 hover:bg-amber-600 text-amber-950 ring-2 ring-amber-400'
            : 'bg-stone-900 hover:bg-stone-800 text-white'
        }`}
      >
        {isPlaying ? (
          <>
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>Stop Playback</span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span>Play Slide Animations</span>
          </>
        )}
      </button>

      {isPlaying && (
        <div className="flex items-center justify-center gap-1.5 p-1.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] font-bold">
          <MousePointer className="w-3.5 h-3.5 text-amber-700 animate-bounce" />
          <span>Click slide canvas to advance</span>
        </div>
      )}
    </div>
  );
};

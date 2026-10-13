import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface PresenterBottomControlsProps {
  isLastSlideAndStep: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const PresenterBottomControls: React.FC<PresenterBottomControlsProps> = ({
  isLastSlideAndStep, onPrev, onNext,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-stone-900 border-t border-stone-800 z-30">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="px-4 py-2 bg-stone-800 hover:bg-stone-700 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" /> Previous (←)
      </button>
      <span className="text-xs text-stone-400">
        Click slide or press Space / Arrow keys to step through animations & slides
      </span>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="px-4 py-2 bg-amber-700 hover:bg-amber-600 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
      >
        {isLastSlideAndStep ? (
          <span className="flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5" /> Restart Presentation</span>
        ) : (
          <span className="flex items-center gap-1">Next (→) <ChevronRight className="w-4 h-4" /></span>
        )}
      </button>
    </div>
  );
};

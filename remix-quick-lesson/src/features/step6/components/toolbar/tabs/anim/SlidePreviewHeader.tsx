import React from 'react';
import { Play, RotateCcw, Eye } from 'lucide-react';

interface SlidePreviewHeaderProps {
  isInteractiveTest: boolean;
  maxStep: number;
  onReset: () => void;
  onStartInteractive: () => void;
}

export const SlidePreviewHeader: React.FC<SlidePreviewHeaderProps> = ({
  isInteractiveTest,
  onReset,
  onStartInteractive,
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="font-extrabold text-stone-900 flex items-center gap-1.5 text-xs">
        <Eye className="w-4 h-4 text-amber-700" />
        <span>Interactive Slide Preview</span>
      </span>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onReset}
          className="px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-[10.5px] font-bold text-stone-700 cursor-pointer shadow-2xs transition-colors"
          title="Show all slide elements"
        >
          Show All
        </button>
        <button
          type="button"
          onClick={onStartInteractive}
          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-black flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
          title="Play interactive sequence step-by-step"
        >
          {isInteractiveTest ? <RotateCcw className="w-3 h-3" /> : <Play className="w-3 h-3 fill-white" />}
          <span>{isInteractiveTest ? 'Restart Sequence' : 'Test Sequence'}</span>
        </button>
      </div>
    </div>
  );
};

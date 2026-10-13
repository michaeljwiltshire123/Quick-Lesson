import React from 'react';
import { TransitionVisualOverlay } from '../../toolbar/tabs/anim/preview/TransitionVisualOverlay';
import { MousePointer, CheckCircle2 } from 'lucide-react';

interface CanvasMotionPlaybackOverlayProps {
  transitionEffect?: string;
  step: number;
  maxStep: number;
  onAdvance: () => void;
}

export const CanvasMotionPlaybackOverlay: React.FC<CanvasMotionPlaybackOverlayProps> = ({
  transitionEffect,
  step,
  maxStep,
  onAdvance,
}) => {
  const isComplete = step >= maxStep;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onAdvance();
      }}
      className="absolute inset-0 z-40 cursor-pointer flex flex-col justify-between p-4 bg-transparent select-none"
    >
      {Boolean(transitionEffect && transitionEffect !== 'none') && step === 0 && (
        <TransitionVisualOverlay effectId={transitionEffect!} speed={0.6} />
      )}

      <div className="flex justify-center w-full pointer-events-none">
        <div className="bg-stone-900/90 backdrop-blur-xs text-white px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl border border-white/20 animate-in fade-in">
          {isComplete ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Animations complete • Click Stop to exit</span>
            </>
          ) : (
            <>
              <MousePointer className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>Click slide to advance animation ({step}/{maxStep})</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

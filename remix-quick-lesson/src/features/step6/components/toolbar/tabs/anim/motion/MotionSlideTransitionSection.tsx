import React, { useState } from 'react';
import { SLIDE_TRANSITION_OPTIONS } from './motionPanelTypes';
import { ChevronDown, ChevronRight, Square, Sparkles } from 'lucide-react';

interface MotionSlideTransitionSectionProps {
  currentTransition: string;
  onChangeTransition: (transId: string) => void;
  onApplyToAll: () => void;
  onOpenTransitionsLibrary?: () => void;
}

export const MotionSlideTransitionSection: React.FC<MotionSlideTransitionSectionProps> = ({
  currentTransition = 'none',
  onChangeTransition,
  onApplyToAll,
  onOpenTransitionsLibrary,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [duration, setDuration] = useState(0.8);
  const currentOption = SLIDE_TRANSITION_OPTIONS.find((o) => o.id === currentTransition) || SLIDE_TRANSITION_OPTIONS[0];

  return (
    <div className="space-y-2.5 pb-3 border-b border-stone-200 select-none">
      <div className="flex items-center justify-between text-xs font-semibold text-stone-800 tracking-tight">
        <span>Slide Transition</span>
        {onOpenTransitionsLibrary && (
          <button
            type="button" onClick={onOpenTransitionsLibrary}
            className="text-[10.5px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer hover:underline"
          >
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>40+ Library</span>
          </button>
        )}
      </div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer hover:bg-stone-50 py-1 px-1 rounded transition-colors text-xs text-stone-700"
      >
        {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-stone-500" /> : <ChevronRight className="w-3.5 h-3.5 text-stone-500" />}
        <Square className="w-4 h-4 text-stone-600 stroke-[1.75]" />
        <span className="font-medium text-stone-800">{currentOption.label}</span>
      </div>

      {isOpen && (
        <div className="space-y-2.5 pl-6 pt-1">
          <select
            value={currentTransition}
            onChange={(e) => onChangeTransition(e.target.value)}
            className="w-full bg-stone-50 hover:bg-stone-100/80 border border-stone-300 rounded-md px-3 py-1.5 text-xs text-stone-800 font-normal focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer shadow-2xs"
          >
            {SLIDE_TRANSITION_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>

          {currentTransition !== 'none' && (
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                <span>Slow</span>
                <span className="font-mono text-stone-700">{duration.toFixed(1)}s</span>
                <span>Fast</span>
              </div>
              <input
                type="range" min="0.3" max="3.0" step="0.1" value={duration}
                onChange={(e) => setDuration(parseFloat(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>
          )}

          <div>
            <button
              type="button" onClick={onApplyToAll}
              className="inline-block bg-white hover:bg-stone-50 active:bg-stone-100 border border-stone-300 rounded-md py-1.5 px-3.5 text-xs text-stone-800 font-medium cursor-pointer transition-colors shadow-2xs"
            >
              Apply to all slides
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

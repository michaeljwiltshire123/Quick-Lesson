import React from 'react';
import { Maximize2, Clock, FileText, X } from 'lucide-react';

interface PresenterHeaderBarProps {
  currentSlide: number;
  totalSlides: number;
  animStep: number;
  maxAnimStep: number;
  seconds: number;
  showNotes: boolean;
  onToggleNotes: () => void;
  onClose: () => void;
}

export const PresenterHeaderBar: React.FC<PresenterHeaderBarProps> = ({
  currentSlide, totalSlides, animStep, maxAnimStep, seconds, showNotes, onToggleNotes, onClose,
}) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-stone-900/90 border-b border-stone-800 z-30">
      <div className="flex items-center gap-3">
        <Maximize2 className="w-5 h-5 text-amber-500" />
        <span className="text-sm font-bold">
          Live Presentation • Slide {currentSlide} of {totalSlides} • Step {animStep}/{maxAnimStep}
        </span>
      </div>
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="flex items-center gap-1 text-amber-400">
          <Clock className="w-4 h-4" />{mins}:{secs < 10 ? `0${secs}` : secs}
        </span>
        <button
          type="button"
          onClick={onToggleNotes}
          className={`px-2.5 py-1 rounded-lg border font-sans cursor-pointer flex items-center gap-1.5 ${
            showNotes ? 'bg-amber-600 border-amber-500' : 'bg-stone-800 border-stone-700'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Notes
        </button>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 bg-stone-800 hover:bg-stone-700 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

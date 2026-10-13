import React from 'react';
import { Presentation, Layers, Sparkles } from 'lucide-react';
import { Step3Stepper } from '../../../components/step3_chunks/Step3Stepper';

interface SlideDeckHeaderProps {
  lessonTitle: string;
  slideCount: number;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onBack?: () => void;
  onOpenPageTransitions?: () => void;
}

export const SlideDeckHeader: React.FC<SlideDeckHeaderProps> = ({
  lessonTitle,
  slideCount,
  onOpenPageTransitions,
}) => {
  return (
    <header className="space-y-4">
      <Step3Stepper currentStep={6} />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-stone-200 p-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Presentation className="w-5 h-5 text-amber-700" />
              <h1 className="text-xl font-bold text-stone-900">Slide & Media Layout Editor</h1>
              <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <Layers className="w-3 h-3" /> {slideCount} Slides
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Arranging presentation visuals and speaker cues for: <span className="font-semibold text-stone-700">{lessonTitle}</span>
            </p>
          </div>
        </div>

        {onOpenPageTransitions && (
          <button
            type="button"
            onClick={onOpenPageTransitions}
            className="bg-amber-100/90 hover:bg-amber-200 border border-amber-300 text-amber-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-xs cursor-pointer transition-all hover:scale-[1.02] active:scale-95 shrink-0"
            title="Browse 40+ classroom, sci-fi, and wild presentation transitions"
          >
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span>Page Transitions (40+ Library)</span>
          </button>
        )}
      </div>
    </header>
  );
};

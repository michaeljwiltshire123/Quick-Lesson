import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Layers, Clock } from 'lucide-react';

interface Step6ToStep7NavigationProps {
  slideCount: number;
  totalMinutes: number;
  onBack?: () => void;
  onContinue: () => void;
}

export const Step6ToStep7Navigation: React.FC<Step6ToStep7NavigationProps> = ({
  slideCount,
  totalMinutes,
  onBack,
  onContinue,
}) => {
  return (
    <footer aria-label="Step 6 Navigation Footer" className="mt-8 pt-5 border-t border-stone-200">
      <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-stone-600 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Slide Customisations Saved</span>
          </div>

          <div className="flex items-center gap-3 text-stone-500 font-medium">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <strong className="text-stone-800 font-bold">{slideCount}</strong> slides
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <strong className="text-stone-800 font-bold">{Math.max(1, totalMinutes)}</strong> mins delivery
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Discussion Starters</span>
            </button>
          )}

          <button
            type="button"
            onClick={onContinue}
            className="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 active:scale-[0.99] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
          >
            <span>Continue to Retrieval Bank & Launchpad</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

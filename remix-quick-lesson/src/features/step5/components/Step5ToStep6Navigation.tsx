import React from 'react';
import { ArrowRight, Presentation, Sparkles } from 'lucide-react';

interface Step5ToStep6NavigationProps {
  onContinueToStep6: () => void;
  isSyncing?: boolean;
}

export const Step5ToStep6Navigation: React.FC<Step5ToStep6NavigationProps> = ({
  onContinueToStep6,
  isSyncing = false,
}) => {
  return (
    <aside aria-label="Step 6 Navigation" className="bg-gradient-to-r from-amber-50 via-stone-50 to-amber-50/40 border border-amber-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5 my-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-inner">
          <Presentation className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-stone-900 text-base">Classroom Slide Deck Ready for Review</h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" /> Step 6
            </span>
          </div>
          <p className="text-stone-600 text-sm mt-0.5">
            Synthesise your teaching milestones and discussion sparks into an interactive slide presentation.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinueToStep6}
        disabled={isSyncing}
        className="px-6 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 active:scale-[0.99] text-white font-semibold transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{isSyncing ? 'Synchronising sparks...' : 'Continue to Slide & Media Layout Editor'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </aside>
  );
};

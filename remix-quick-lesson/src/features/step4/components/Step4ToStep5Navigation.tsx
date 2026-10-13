import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface Step4ToStep5NavigationProps {
  onContinueToStep5: () => void;
}

export const Step4ToStep5Navigation: React.FC<Step4ToStep5NavigationProps> = ({
  onContinueToStep5,
}) => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-stone-50 border border-amber-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 text-base">Ready for Diagnostic Discussion Starters?</h3>
          <p className="text-stone-600 text-sm">
            Transition smoothly to Step 5 to configure Socratic questions, paradoxes, and misconception triggers.
          </p>
        </div>
      </div>

      <button
        onClick={onContinueToStep5}
        className="px-6 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer text-sm"
      >
        <span>Continue to Discussion Starters</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

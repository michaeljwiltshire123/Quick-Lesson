import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { QuizModalTab } from './QuizModalTabsBar';
import { LociWizardStep } from './tabs/loci/types';

interface Props {
  isAtEnd: boolean;
  activeTab: QuizModalTab;
  lociStep: LociWizardStep;
  lociAttached: boolean;
  onDone: () => void;
}

export const QuizModalFooter: React.FC<Props> = ({
  isAtEnd, activeTab, lociStep, lociAttached, onDone,
}) => (
  <div className="p-4 border-t border-[#2D2A26]/10 bg-white flex items-center justify-between shrink-0">
    <div className="text-xs sm:text-sm text-[#2D2A26]/70 font-semibold flex items-center gap-2">
      {activeTab === 'loci' && lociStep === 'script' && !lociAttached && (
        <span className="text-amber-800 font-bold bg-amber-50 px-2 py-1 rounded border border-amber-200">
          ⚠️ Click &quot;Attach&quot; above to link this Memory Palace to your concept card!
        </span>
      )}
      {activeTab !== 'loci' || lociStep !== 'script' ? 'Complete the steps above to finish creating this resource.' : ''}
    </div>
    {isAtEnd && (
      <button
        type="button"
        onClick={onDone}
        className={`px-4 py-2 text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-colors ${
          activeTab === 'loci' && lociStep === 'script' && !lociAttached
            ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 opacity-80'
            : 'bg-[#2D2A26] hover:bg-black text-white'
        }`}
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Done
      </button>
    )}
  </div>
);

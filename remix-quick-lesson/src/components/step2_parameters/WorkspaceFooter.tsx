import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface WorkspaceFooterProps {
  onBack: () => void;
  onContinue: () => void;
  continueDisabled?: boolean;
}

export const WorkspaceFooter: React.FC<WorkspaceFooterProps> = ({
  onBack,
  onContinue,
  continueDisabled = false,
}) => {
  return (
    <footer className="w-full bg-[#F8F6F0] pt-6 pb-2 border-t border-[#2D2A26]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <button
        type="button"
        onClick={onBack}
        className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#F8F6F0] text-[#2D2A26] text-xs font-bold rounded-xl border border-[#2D2A26]/20 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>← Back to Ingestor</span>
      </button>

      <button
        type="button"
        onClick={onContinue}
        disabled={continueDisabled}
        className={`w-full sm:w-auto px-7 py-3 bg-[#2D2A26] hover:bg-[#2D2A26]/90 text-[#F59E0B] text-xs font-bold rounded-xl border border-[#2D2A26] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
          continueDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <span>Continue to Steps Workspace →</span>
        <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
      </button>
    </footer>
  );
};

import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onBackToStep3: () => void;
}

export const Step4SummativeFooter: React.FC<Props> = ({ onBackToStep3 }) => (
  <footer className="w-full bg-[#F8F6F0] pt-4 pb-2 border-t border-[#2D2A26]/10 flex items-center justify-between">
    <button
      type="button"
      onClick={onBackToStep3}
      className="px-5 py-2.5 bg-white hover:bg-[#F8F6F0] text-[#2D2A26] text-xs font-bold rounded-xl border border-[#2D2A26]/20 shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-98"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>← Back to Chunks Workspace</span>
    </button>
  </footer>
);

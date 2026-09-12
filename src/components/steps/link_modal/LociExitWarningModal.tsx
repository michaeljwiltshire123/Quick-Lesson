import React from 'react';

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConfirmExit: () => void;
}

export const LociExitWarningModal: React.FC<Props> = ({
  isOpen, onCancel, onConfirmExit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-amber-300 rounded-2xl p-5 max-w-md space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-amber-800 font-bold text-base">
          ⚠️ Hold on! Memory Palace Not Attached
        </div>
        <p className="text-xs text-[#2D2A26]/90 leading-relaxed">
          You haven&apos;t clicked <strong className="text-[#D97706]">Attach</strong> to link this Memory Palace to your concept card yet. Your draft walkthrough is safely saved in memory, but students won&apos;t see it until attached!
        </p>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-[#D97706] text-white text-xs font-bold rounded-xl hover:bg-amber-700 cursor-pointer"
          >
            Return &amp; Attach
          </button>
          <button
            type="button"
            onClick={onConfirmExit}
            className="px-4 py-2 bg-[#F8F6F0] border border-[#2D2A26]/20 text-[#2D2A26] text-xs font-bold rounded-xl hover:bg-black/5 cursor-pointer"
          >
            Exit Anyway (Draft Saved)
          </button>
        </div>
      </div>
    </div>
  );
};

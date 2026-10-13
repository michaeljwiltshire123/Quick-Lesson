import React from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

interface Step5FooterNavProps {
  onBack?: () => void;
  onContinue: () => void;
  isSyncing?: boolean;
  showContinue?: boolean;
}

export const Step5FooterNav: React.FC<Step5FooterNavProps> = ({
  onBack,
  onContinue,
  isSyncing = false,
  showContinue = true,
}) => {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-stone-200">
      {onBack && (
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100 transition-all flex items-center gap-2 cursor-pointer text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}
      {showContinue && <button
        onClick={onContinue}
        disabled={isSyncing}
        className="ml-auto px-6 py-2.5 rounded-xl bg-amber-800 text-white font-semibold hover:bg-amber-900 transition-all flex items-center gap-2 shadow-md cursor-pointer text-sm disabled:opacity-50"
      >
        <ShieldCheck className="w-4 h-4 text-amber-200" />
        <span>{isSyncing ? 'Locking Edits...' : 'Save & Continue'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>}
    </div>
  );
};

import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  onContinueToStep5: () => void;
}

export const ImposterAttachedBanner: React.FC<Props> = ({ onContinueToStep5 }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-emerald-50 border border-emerald-200/90 rounded-2xl shadow-2xs">
    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
      <span>Attached to Lesson Plan — Room code, role assignments, and QR links saved.</span>
    </div>
    <button
      type="button"
      onClick={onContinueToStep5}
      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer shadow-xs active:scale-98 transition-all"
    >
      <span>Continue to Step 5: Hook & Vocabulary</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </button>
  </div>
);

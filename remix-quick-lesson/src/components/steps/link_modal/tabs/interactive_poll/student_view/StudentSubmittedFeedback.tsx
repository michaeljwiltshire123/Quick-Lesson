import React from 'react';
import { CheckCircle2, RotateCcw, X } from 'lucide-react';

interface Props {
  studentName?: string;
  isTimedOut: boolean;
  onRevise?: () => void;
  onClose?: () => void;
}

export const StudentSubmittedFeedback: React.FC<Props> = ({
  studentName, isTimedOut, onRevise, onClose,
}) => (
  <div className="py-8 px-6 text-center space-y-4 bg-white rounded-2xl border border-emerald-200 shadow-sm">
    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600">
      <CheckCircle2 className="w-7 h-7" />
    </div>
    <div className="space-y-1">
      <h3 className="text-base font-bold text-[#2D2A26]">
        {isTimedOut ? 'Session Completed!' : 'Response Submitted!'}
      </h3>
      <p className="text-xs text-[#2D2A26]/70 max-w-xs mx-auto">
        {studentName ? `Thank you, ${studentName}. ` : 'Thank you. '}
        Your classroom response has been registered with your teacher.
      </p>
    </div>

    <div className="flex items-center justify-center gap-2 pt-2">
      {!isTimedOut && onRevise && (
        <button
          type="button"
          onClick={onRevise}
          className="px-3.5 py-1.5 rounded-xl border border-[#2D2A26]/20 bg-[#F8F6F0] hover:bg-black/5 text-xs font-semibold text-[#2D2A26] flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#D97706]" /> Change Response
        </button>
      )}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="px-3.5 py-1.5 rounded-xl bg-[#2D2A26] hover:bg-black text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" /> Close
        </button>
      )}
    </div>
  </div>
);

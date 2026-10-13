import React from 'react';
import { RotateCcw, X, AlertCircle } from 'lucide-react';

interface RestartLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const RestartLessonModal: React.FC<RestartLessonModalProps> = ({
  isOpen, onClose, onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2A26]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="restart-modal-title"
        className="w-full max-w-md bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-2xl p-6 shadow-xl space-y-4"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/20 text-[#2D2A26] flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5 text-[#D97706]" />
            </div>
            <div>
              <h2 id="restart-modal-title" className="text-base font-bold text-[#2D2A26]">
                Restart Lesson
              </h2>
              <p className="text-xs text-[#2D2A26]/60">Start a fresh lesson plan</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#2D2A26]/10 text-[#2D2A26]/60 transition-colors"
            aria-label="Close dialogue"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-[#2D2A26]/10 flex gap-2.5 text-xs text-[#2D2A26]/80 leading-relaxed">
          <AlertCircle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
          <p>
            Are you sure you wish to restart? This will reset all drafted lesson parameters,
            progression milestones, and uploaded documents so you can plan anew from scratch.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#2D2A26]/20 hover:bg-white text-[#2D2A26] transition-colors cursor-pointer"
          >
            Keep Planning
          </button>
          <button
            type="button"
            onClick={() => { onConfirm(); onClose(); }}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#2D2A26] transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Lesson</span>
          </button>
        </div>
      </div>
    </div>
  );
};

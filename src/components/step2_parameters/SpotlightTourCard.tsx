import React from 'react';
import { Sparkles, X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { SpotlightStep } from './spotlightSteps';

interface SpotlightTourCardProps {
  step: SpotlightStep;
  stepIndex: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  cardStyle: React.CSSProperties;
}

export const SpotlightTourCard: React.FC<SpotlightTourCardProps> = ({
  step, stepIndex, totalSteps, onPrev, onNext, onClose, cardStyle,
}) => {
  const isLast = stepIndex === totalSteps - 1;

  return (
    <div
      style={cardStyle}
      className="fixed z-60 pointer-events-auto bg-[#F8F6F0] text-[#2D2A26] border border-[#F59E0B]/50 rounded-2xl p-5 shadow-2xl w-84 sm:w-96 space-y-3.5 transition-all duration-300"
    >
      <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-[#F59E0B]/20 text-[#D97706]"><Sparkles className="w-3.5 h-3.5" /></span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D2A26]/70">Step {stepIndex + 1} of {totalSteps}</span>
        </div>
        <button type="button" onClick={onClose} aria-label="Close walkthrough" className="p-1 text-[#2D2A26]/50 hover:text-[#2D2A26] rounded-lg hover:bg-black/5 cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-sm font-bold text-[#2D2A26]">{step.title}</h4>
        <p className="text-xs text-[#2D2A26]/80 leading-relaxed">{step.description}</p>
      </div>

      {step.actionTip && (
        <div className="p-2.5 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[11px] font-medium text-[#2D2A26] flex items-start gap-2">
          <span className="font-bold text-[#D97706] shrink-0">Tip:</span>
          <span>{step.actionTip}</span>
        </div>
      )}

      <div className="flex items-center justify-between pt-1 border-t border-[#2D2A26]/10">
        <button type="button" onClick={onClose} className="text-xs font-semibold text-[#2D2A26]/60 hover:text-[#2D2A26] cursor-pointer">
          Skip tour
        </button>
        <div className="flex items-center gap-2">
          {stepIndex > 0 && (
            <button type="button" onClick={onPrev} className="px-2.5 py-1.5 rounded-xl border border-[#2D2A26]/20 bg-white hover:bg-neutral-100 text-xs font-bold text-[#2D2A26] flex items-center gap-1 cursor-pointer">
              <ChevronLeft className="w-3.5 h-3.5" /><span>Back</span>
            </button>
          )}
          <button type="button" onClick={onNext} className="px-3.5 py-1.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#2D2A26] text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs">
            <span>{isLast ? 'Finish tour' : 'Next'}</span>
            {isLast ? <Check className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { SPOTLIGHT_STEPS } from './spotlightSteps';
import { useSpotlightBounds } from './useSpotlightBounds';
import { SpotlightTourCard } from './SpotlightTourCard';

interface SpotlightTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpotlightTour: React.FC<SpotlightTourProps> = ({ isOpen, onClose }) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setStepIndex(0);
  }, [isOpen]);

  const currentStep = SPOTLIGHT_STEPS[stepIndex] || SPOTLIGHT_STEPS[0];
  const rect = useSpotlightBounds(currentStep.targetId, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' && stepIndex < SPOTLIGHT_STEPS.length - 1) setStepIndex((s) => s + 1);
      else if (e.key === 'ArrowLeft' && stepIndex > 0) setStepIndex((s) => s - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, stepIndex, onClose]);

  if (!isOpen) return null;

  const cardStyle: React.CSSProperties = rect
    ? {
        top: (rect.top + rect.height + 250 < window.innerHeight)
          ? `${rect.top + rect.height + 16}px`
          : `${Math.max(16, rect.top - 240)}px`,
        left: `${Math.max(16, Math.min(window.innerWidth - 384, rect.left))}px`,
      }
    : { top: '35%', left: '50%', transform: 'translate(-50%, -50%)' };

  const handleNext = () => {
    if (stepIndex < SPOTLIGHT_STEPS.length - 1) setStepIndex((s) => s + 1);
    else onClose();
  };

  const pad = 8;
  const rx = rect ? rect.left - pad : 0;
  const ry = rect ? rect.top - pad : 0;
  const rw = rect ? rect.width + pad * 2 : 0;
  const rh = rect ? rect.height + pad * 2 : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none pointer-events-none">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'translate3d(0,0,0)' }}>
        <defs>
          <mask id="tour-spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            {rect && <rect x={rx} y={ry} width={rw} height={rh} rx="16" fill="black" />}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(33, 29, 24, 0.72)" mask="url(#tour-spotlight-mask)" />
        {rect && <rect x={rx} y={ry} width={rw} height={rh} rx="16" fill="none" stroke="#F59E0B" strokeWidth="2.5" className="transition-all duration-300" />}
      </svg>
      {rect && (
        <div className="pointer-events-auto">
          <div className="absolute top-0 left-0 right-0" style={{ height: Math.max(0, ry) }} />
          <div className="absolute left-0 right-0 bottom-0" style={{ top: Math.max(0, ry + rh) }} />
          <div className="absolute left-0" style={{ top: Math.max(0, ry), height: rh, width: Math.max(0, rx) }} />
          <div className="absolute right-0" style={{ top: Math.max(0, ry), height: rh, left: Math.max(0, rx + rw) }} />
        </div>
      )}
      <SpotlightTourCard
        step={currentStep} stepIndex={stepIndex} totalSteps={SPOTLIGHT_STEPS.length}
        onPrev={() => setStepIndex((s) => Math.max(0, s - 1))} onNext={handleNext} onClose={onClose} cardStyle={cardStyle}
      />
    </div>
  );
};

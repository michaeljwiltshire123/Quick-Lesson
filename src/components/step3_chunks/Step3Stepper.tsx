import React from 'react';
import { Check } from 'lucide-react';

interface StepItem {
  number: number;
  label: string;
}

const STEPS: StepItem[] = [
  { number: 1, label: 'Ingestion' },
  { number: 2, label: 'Parameters' },
  { number: 3, label: 'Milestones' },
  { number: 4, label: 'Classroom Materials' },
];

interface Step3StepperProps {
  currentStep?: number;
}

export const Step3Stepper: React.FC<Step3StepperProps> = ({ currentStep = 3 }) => {
  return (
    <nav aria-label="Curriculum Planning Steps" className="w-full max-w-2xl mx-auto py-2">
      <ol className="relative flex items-center justify-between">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-[#2D2A26]/10 -z-0" />
        {STEPS.map((step) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;

          return (
            <li key={step.number} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 shadow-sm ${
                  isActive
                    ? 'bg-[#2D2A26] text-[#F59E0B] border-2 border-[#F59E0B] ring-4 ring-[#F59E0B]/20'
                    : isCompleted
                    ? 'bg-[#F59E0B] text-white border-2 border-[#F59E0B]'
                    : 'bg-white text-[#2D2A26]/40 border-2 border-[#2D2A26]/15'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
              </div>
              <span
                className={`mt-2 text-xs font-semibold tracking-tight ${
                  isActive ? 'text-[#2D2A26]' : isCompleted ? 'text-[#2D2A26]/80' : 'text-[#2D2A26]/40'
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

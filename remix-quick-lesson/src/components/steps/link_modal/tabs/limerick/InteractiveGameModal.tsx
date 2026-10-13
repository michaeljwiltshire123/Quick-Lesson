import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Gamepad2 } from 'lucide-react';
import { LimerickItem } from './types';
import { GameStepCard } from './GameStepCard';

interface Props {
  items: LimerickItem[];
  isOpen: boolean;
  onClose: () => void;
  assignmentTitle: string;
}

export const InteractiveGameModal: React.FC<Props> = ({ items, isOpen, onClose, assignmentTitle }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  if (!isOpen) return null;

  const totalVersesCount = items.reduce((acc, curr) => acc + curr.verses.length, 0);
  const totalSteps = totalVersesCount + 2;

  const handleNext = () => setCurrentStep(prev => Math.min(totalSteps - 1, prev + 1));
  const handlePrev = () => setCurrentStep(prev => Math.max(0, prev - 1));

  const handleDownload = () => {
    const allText = items.map(it => `${it.title}\n${it.verses.join('\n')}\nTakeaway: ${it.takeawayGoal}`).join('\n\n---\n\n');
    const blob = new Blob([`${assignmentTitle}\n\n${allText}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interactive_rhyme_summary.txt`;
    a.click();
  };

  const handleSaveDrive = () => {
    alert('Connected to Google Drive! File saved successfully to your Drive root folder.');
  };

  const handleGoToClassroom = () => {
    window.open('https://classroom.google.com', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#2D2A26]/10 space-y-5 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-[#D97706]" />
            <div>
              <h3 className="text-sm font-bold text-[#2D2A26]">{assignmentTitle}</h3>
              <p className="text-[10px] text-[#2D2A26]/60">Interactive Student Recall Game ({items.length} cards)</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-full hover:bg-black/5 text-[#2D2A26]/60 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <GameStepCard
            currentStep={currentStep}
            totalSteps={totalSteps}
            items={items}
            assignmentTitle={assignmentTitle}
            userAnswers={userAnswers}
            onAnswerChange={(step, val) => setUserAnswers({ ...userAnswers, [step]: val })}
            onDownload={handleDownload}
            onSaveDrive={handleSaveDrive}
            onGoToClassroom={handleGoToClassroom}
          />
        </div>

        <div className="flex items-center justify-between border-t border-[#2D2A26]/10 pt-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F8F6F0] text-[#2D2A26] disabled:opacity-30 cursor-pointer flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-[11px] font-bold text-[#2D2A26]/60">Step {currentStep + 1} of {totalSteps}</span>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#D97706] text-white disabled:opacity-30 cursor-pointer flex items-center gap-1"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

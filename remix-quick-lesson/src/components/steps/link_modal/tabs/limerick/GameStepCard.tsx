import React from 'react';
import { Award, CheckCircle2, Download, HardDrive, ExternalLink, QrCode } from 'lucide-react';
import { LimerickItem } from './types';

interface Props {
  currentStep: number;
  totalSteps: number;
  items: LimerickItem[];
  assignmentTitle: string;
  userAnswers: Record<number, string>;
  onAnswerChange: (step: number, val: string) => void;
  onDownload: () => void;
  onSaveDrive: () => void;
  onGoToClassroom: () => void;
}

export const GameStepCard: React.FC<Props> = ({
  currentStep,
  totalSteps,
  items,
  assignmentTitle,
  userAnswers,
  onAnswerChange,
  onDownload,
  onSaveDrive,
  onGoToClassroom,
}) => {
  // Flatten all verses across items with their item reference
  const allVerses: { itemTitle: string; verse: string; globalIndex: number }[] = [];
  items.forEach((item) => {
    item.verses.forEach((verse) => {
      allVerses.push({ itemTitle: item.title, verse, globalIndex: allVerses.length + 1 });
    });
  });

  if (currentStep === 0) {
    return (
      <div className="space-y-4 text-center py-6">
        <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto text-[#D97706]">
          <Award className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-[#2D2A26]">How to Play & Memorise</h4>
        <p className="text-xs text-[#2D2A26]/70 max-w-sm mx-auto">
          Read through the selected verses carefully. On the next cards, fill in the missing blanks to test your recall across {items.length} rhyme cards!
        </p>
        <div className="pt-2 flex justify-center">
          <div className="p-3 bg-white border border-[#2D2A26]/15 rounded-2xl shadow-2xs inline-flex flex-col items-center">
            <QrCode className="w-16 h-16 text-[#2D2A26]" />
            <span className="text-[10px] font-bold text-[#2D2A26]/60 mt-1">Student Mobile QR Code</span>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep > 0 && currentStep <= allVerses.length) {
    const currentItemVerse = allVerses[currentStep - 1];
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs font-bold text-[#2D2A26]/70">
          <span>{currentItemVerse.itemTitle} (Verse {currentStep} of {allVerses.length})</span>
          <span className="text-[#D97706]">Fill in the blank</span>
        </div>
        <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#2D2A26]/10 space-y-3">
          <p className="text-sm font-medium text-[#2D2A26] italic leading-relaxed">{currentItemVerse.verse}</p>
          <input
            type="text"
            placeholder="Type missing word or phrase..."
            value={userAnswers[currentStep] || ''}
            onChange={e => onAnswerChange(currentStep, e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#2D2A26]/15 text-xs font-semibold text-[#2D2A26]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center py-4">
      <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
        <CheckCircle2 className="w-6 h-6" />
      </div>
      <h4 className="text-base font-bold text-[#2D2A26]">Challenge Complete! 🎉</h4>
      <p className="text-xs text-[#2D2A26]/70">
        Great work mastering all selected rhymes. Save your summary and submit it to Google Classroom.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <button
          type="button"
          onClick={onDownload}
          className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#F8F6F0] text-[#2D2A26] border border-[#2D2A26]/15 hover:bg-black/5 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#D97706]" /> Download Summary
        </button>
        <button
          type="button"
          onClick={onSaveDrive}
          className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#F8F6F0] text-[#2D2A26] border border-[#2D2A26]/15 hover:bg-black/5 flex items-center justify-center gap-2 cursor-pointer"
        >
          <HardDrive className="w-4 h-4 text-emerald-600" /> Save to Drive
        </button>
      </div>
      <div className="pt-2">
        <button
          type="button"
          onClick={onGoToClassroom}
          className="w-full py-3 px-4 rounded-2xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" /> Go to Classroom Assignment (Turn-In)
        </button>
      </div>
    </div>
  );
};

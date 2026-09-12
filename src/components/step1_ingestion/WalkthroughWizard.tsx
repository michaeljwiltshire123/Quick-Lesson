import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SyllabusQuestionCard } from './SyllabusQuestionCard';
import { NotesStepCard } from './NotesStepCard';
import { ThemeStepCard } from './ThemeStepCard';
import { TopicTitleStepCard } from './TopicTitleStepCard';

export interface WalkthroughWizardProps {
  initialStep?: number;
  onBackToOnboarding: () => void;
  moduleBriefFile: { name: string; content: string } | null;
  onUploadModuleBrief: (file: { name: string; content: string } | null) => void;
  rawNotes: string;
  onRawNotesChange: (notes: string) => void;
  videoLinks: string[];
  onAddVideoLink: (link: string) => void;
  onRemoveVideoLink: (index: number) => void;
  draftFile: { name: string; content: string } | null;
  onUploadDraftFile: (file: { name: string; content: string } | null) => void;
  themeNotes: string;
  onThemeNotesChange: (theme: string) => void;
  lessonTitle: string;
  onLessonTitleChange: (title: string) => void;
  onCompleteWizard: () => void;
}

export const WalkthroughWizard: React.FC<WalkthroughWizardProps> = (p) => {
  const [activeStep, setActiveStep] = useState<number>(p.initialStep || 1);
  const handleBack = () => (activeStep > 1 ? setActiveStep(activeStep - 1) : p.onBackToOnboarding());

  return (
    <div className="w-full max-w-2xl bg-white border border-[#2D2A26]/10 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 relative">
      <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-4">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back"
          className="flex items-center gap-2 text-xs font-semibold text-[#2D2A26]/70 hover:text-[#2D2A26] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#2D2A26]" />
          <span>{activeStep === 1 ? 'Back to Overview' : 'Previous Question'}</span>
        </button>
        <span className="text-xs font-medium text-[#2D2A26]/50">Step {activeStep} of 4</span>
      </div>

      {activeStep === 1 && (
        <SyllabusQuestionCard
          moduleBriefFile={p.moduleBriefFile}
          onUploadModuleBrief={p.onUploadModuleBrief}
          onNextStep={() => setActiveStep(2)}
        />
      )}
      {activeStep === 2 && (
        <NotesStepCard
          rawNotes={p.rawNotes}
          onRawNotesChange={p.onRawNotesChange}
          videoLinks={p.videoLinks}
          onAddVideoLink={p.onAddVideoLink}
          onRemoveVideoLink={p.onRemoveVideoLink}
          draftFile={p.draftFile}
          onUploadDraftFile={p.onUploadDraftFile}
          onNextStep={() => setActiveStep(3)}
        />
      )}
      {activeStep === 3 && (
        <ThemeStepCard
          themeNotes={p.themeNotes}
          onThemeNotesChange={p.onThemeNotesChange}
          onNextStep={() => setActiveStep(4)}
        />
      )}
      {activeStep === 4 && (
        <TopicTitleStepCard
          lessonTitle={p.lessonTitle}
          onLessonTitleChange={p.onLessonTitleChange}
          onComplete={p.onCompleteWizard}
        />
      )}
    </div>
  );
};

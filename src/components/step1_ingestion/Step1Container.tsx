import React from 'react';
import { OnboardingBanner } from './OnboardingBanner';
import { WalkthroughWizard } from './WalkthroughWizard';
import { AppStateData } from '../../utils/storage';

interface Step1ContainerProps {
  state: AppStateData; wizardInitialStep?: number; libraryMessage: boolean;
  onSetLibraryMessage: (val: boolean) => void; onStartWizard: () => void;
  onBackToOnboarding: () => void; onCompleteWizard: () => void;
  onFileParsed: (name: string, content: string, fileBase64?: string, mimeType?: string) => void;
  onUploadModuleBrief: (file: { name: string; content: string } | null) => void;
  onRawNotesChange: (val: string) => void; onAddVideoLink: (link: string) => void;
  onRemoveVideoLink: (idx: number) => void;
  onUploadDraftFile: (file: { name: string; content: string } | null) => void;
  onThemeNotesChange: (val: string) => void; onLessonTitleChange: (val: string) => void;
  onLoadSavedBrief?: (parsed: any) => void;
}

export const Step1Container: React.FC<Step1ContainerProps> = (p) => (
  <div className="w-full flex flex-col items-center gap-4">
    {!p.state.isWizardActive ? (
      <>
        <OnboardingBanner
          onBegin={p.onStartWizard}
          onOpenLibrary={() => p.onSetLibraryMessage(true)}
          onFileParsed={p.onFileParsed}
          onLoadSavedBrief={p.onLoadSavedBrief}
        />
        {p.libraryMessage && (
          <div className="w-full max-w-2xl bg-amber-50 border border-[#F59E0B]/30 rounded-xl p-4 text-xs text-[#2D2A26] flex items-center justify-between">
            <span>No saved lesson drafts found in local session storage.</span>
            <button type="button" onClick={() => p.onSetLibraryMessage(false)} className="text-[#2D2A26]/60 hover:text-[#2D2A26] font-semibold cursor-pointer underline">Dismiss</button>
          </div>
        )}
      </>
    ) : (
      <WalkthroughWizard
        initialStep={p.wizardInitialStep}
        onBackToOnboarding={p.onBackToOnboarding}
        moduleBriefFile={p.state.moduleBriefFile}
        onUploadModuleBrief={p.onUploadModuleBrief}
        rawNotes={p.state.rawNotes}
        onRawNotesChange={p.onRawNotesChange}
        videoLinks={p.state.videoLinks}
        onAddVideoLink={p.onAddVideoLink}
        onRemoveVideoLink={p.onRemoveVideoLink}
        draftFile={p.state.draftFile}
        onUploadDraftFile={p.onUploadDraftFile}
        themeNotes={p.state.themeNotes}
        onThemeNotesChange={p.onThemeNotesChange}
        lessonTitle={p.state.lessonTitle}
        onLessonTitleChange={p.onLessonTitleChange}
        onCompleteWizard={p.onCompleteWizard}
      />
    )}
  </div>
);

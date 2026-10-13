import React from 'react';
import { WizardHeader } from './WizardHeader';
import { LessonChunk, ModuleScheme } from '../../types';
import { PickerSelectedDoc } from '../../types/workspace';

interface WizardLayoutProps {
  children: React.ReactNode;
  onRestartLesson?: () => void;
  onWalkthrough?: () => void;
  lessonTitle?: string;
  subject?: string;
  gradeLevel?: string;
  chunks?: LessonChunk[];
  moduleScheme?: ModuleScheme;
  onFilePicked?: (doc: PickerSelectedDoc) => void;
  isFullWidth?: boolean;
}

export const WizardLayout: React.FC<WizardLayoutProps> = ({
  children,
  onRestartLesson,
  onWalkthrough,
  lessonTitle,
  subject,
  gradeLevel,
  chunks,
  moduleScheme,
  onFilePicked,
  isFullWidth = false,
}) => {
  const isLivePresentationRoute = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('liveRole');
  return (
    <div className={`min-h-screen bg-[#F8F6F0] text-[#2D2A26] font-sans ${isLivePresentationRoute ? '' : 'flex flex-col'}`}>
      {!isLivePresentationRoute && <WizardHeader
        onRestartLesson={onRestartLesson}
        onWalkthrough={onWalkthrough}
        lessonTitle={lessonTitle}
        subject={subject}
        gradeLevel={gradeLevel}
        chunks={chunks}
        moduleScheme={moduleScheme}
        onFilePicked={onFilePicked}
      />}

      <main className={isLivePresentationRoute ? 'min-h-screen w-full' : `flex-1 w-full ${isFullWidth ? 'max-w-[1800px] px-2 sm:px-4 py-4' : 'max-w-5xl px-6 py-10'} mx-auto flex flex-col`}>
        {children}
      </main>

      {!isLivePresentationRoute && <footer className="w-full max-w-7xl mx-auto px-6 py-4 border-t border-[#2D2A26]/10 text-center text-xs text-[#2D2A26]/50">
        Quick Lesson — British Curriculum Backward Design Framework
      </footer>}
    </div>
  );
};

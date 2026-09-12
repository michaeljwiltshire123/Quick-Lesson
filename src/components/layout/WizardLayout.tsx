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
}) => {
  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#2D2A26] flex flex-col font-sans">
      <WizardHeader
        onRestartLesson={onRestartLesson}
        onWalkthrough={onWalkthrough}
        lessonTitle={lessonTitle}
        subject={subject}
        gradeLevel={gradeLevel}
        chunks={chunks}
        moduleScheme={moduleScheme}
        onFilePicked={onFilePicked}
      />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10 flex flex-col items-center justify-center">
        {children}
      </main>

      <footer className="w-full max-w-5xl mx-auto px-6 py-6 border-t border-[#2D2A26]/10 text-center text-xs text-[#2D2A26]/50">
        Quick Lesson — British Curriculum Backward Design Framework
      </footer>
    </div>
  );
};

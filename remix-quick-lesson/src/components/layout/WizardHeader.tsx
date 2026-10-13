import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { RestartLessonModal } from './RestartLessonModal';
import { HeaderActionButtons } from './HeaderActionButtons';
import { GoogleWorkspaceHubModal } from '../google_workspace';
import { initAuth, googleSignIn, googleSignOut } from '../../services/google/googleAuth';
import { GoogleUser, PickerSelectedDoc } from '../../types/workspace';
import { LessonChunk, ModuleScheme, DEFAULT_MODULE_SCHEME } from '../../types';

interface WizardHeaderProps {
  onRestartLesson?: () => void;
  onWalkthrough?: () => void;
  lessonTitle?: string;
  subject?: string;
  gradeLevel?: string;
  chunks?: LessonChunk[];
  moduleScheme?: ModuleScheme;
  onFilePicked?: (doc: PickerSelectedDoc) => void;
}

export const WizardHeader: React.FC<WizardHeaderProps> = ({
  onRestartLesson,
  onWalkthrough,
  lessonTitle = 'Curriculum Lesson',
  subject = 'General',
  gradeLevel = 'Secondary',
  chunks = [],
  moduleScheme = DEFAULT_MODULE_SCHEME,
  onFilePicked,
}) => {
  const [isRestartOpen, setIsRestartOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<GoogleUser | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isWorkspaceHubOpen, setIsWorkspaceHubOpen] = useState(false);

  useEffect(() => initAuth((u) => setCurrentUser(u), () => setCurrentUser(null)), []);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const res = await googleSignIn();
      if (res?.user) setCurrentUser(res.user);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await googleSignOut();
    setCurrentUser(null);
  };

  return (
    <header className="w-full max-w-5xl mx-auto px-6 py-6 border-b border-[#2D2A26]/10 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-[#F59E0B]" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#2D2A26]">Quick Lesson</h1>
          <p className="text-xs text-[#2D2A26]/60 font-medium">Lesson Planner - UK Curriculum Framework</p>
        </div>
      </div>

      <HeaderActionButtons
        currentUser={currentUser}
        isSigningIn={isSigningIn}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        onOpenWorkspaceHub={() => setIsWorkspaceHubOpen(true)}
        onWalkthrough={onWalkthrough}
        onOpenRestart={() => setIsRestartOpen(true)}
        hasRestart={Boolean(onRestartLesson)}
      />

      <RestartLessonModal isOpen={isRestartOpen} onClose={() => setIsRestartOpen(false)} onConfirm={onRestartLesson} />

      <GoogleWorkspaceHubModal
        isOpen={isWorkspaceHubOpen}
        onClose={() => setIsWorkspaceHubOpen(false)}
        lessonTitle={lessonTitle}
        subject={subject}
        gradeLevel={gradeLevel}
        chunks={chunks}
        moduleScheme={moduleScheme}
        onFilePicked={(doc) => {
          onFilePicked?.(doc);
          setIsWorkspaceHubOpen(false);
        }}
      />
    </header>
  );
};

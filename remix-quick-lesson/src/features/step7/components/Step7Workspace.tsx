import React, { useEffect, useState } from 'react';
import { LessonChunk, ModuleScheme, SelectedSummativeTask } from '../../../types';
import { LessonPackage } from '../services/exporters/lessonPackageTypes';
import { SlideItem } from '../../step6/types/slideTypes';
import { loadSlideDeckFromSession } from '../../step6/services/slideSyncService';
import { ExportHubPanel } from './ExportHubPanel';
import { LiveSessionPanel } from './LiveSessionPanel';
import { Step7WorkspaceShell } from './Step7WorkspaceShell';

interface Props { title: string; subject: string; chunks: LessonChunk[]; scheme: ModuleScheme; brief: string; gradeLevel: string; lessonDuration: number; rawNotes: string; themeNotes: string; videoLinks: string[]; onBack: () => void; summativeTask?: SelectedSummativeTask; learningObjectives: string[]; onImportLesson: (pack: LessonPackage) => void }
export const Step7Workspace: React.FC<Props> = ({ title, subject, chunks, scheme, brief, gradeLevel, lessonDuration, rawNotes, themeNotes, videoLinks, onBack, summativeTask, learningObjectives, onImportLesson }) => {
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [error, setError] = useState('');
  const presentationSlides = slides.filter((slide) => !slide.isHidden);
  useEffect(() => {
    try { setSlides(loadSlideDeckFromSession(title) || []); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not load saved slides.'); }
  }, [title]);
  if (new URLSearchParams(location.search).get('liveRole')) {
    return <LiveSessionPanel slides={presentationSlides} title={title} />;
  }
  return <Step7WorkspaceShell title={title} subject={subject} slideCount={presentationSlides.length} onBack={onBack}>
    {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-800">{error}</p>}
    {!slides.length && <p className="rounded-xl border border-amber-300 bg-amber-50 p-4">No saved slide deck was found. Return to Step 6 and save the completed slides before exporting or starting a live lesson.</p>}
    <div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
      <ExportHubPanel title={title} subject={subject} chunks={chunks} slides={presentationSlides} allSlides={slides} scheme={scheme} brief={brief} gradeLevel={gradeLevel} lessonDuration={lessonDuration} rawNotes={rawNotes} themeNotes={themeNotes} videoLinks={videoLinks} summativeTask={summativeTask} learningObjectives={learningObjectives} onImportLesson={onImportLesson} />
      <section className="space-y-4 rounded-3xl border border-amber-200 bg-amber-100/50 p-4 sm:p-5">
        <header><p className="text-xs font-bold uppercase tracking-wider text-amber-900">Teach and review</p>
          <h2 className="mt-1 text-xl font-bold text-stone-900">Live lesson hub</h2></header>
        <LiveSessionPanel slides={presentationSlides} title={title} />
      </section>
    </div>
  </Step7WorkspaceShell>;
};

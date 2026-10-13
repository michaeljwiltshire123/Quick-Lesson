import { LessonChunk, ModuleScheme, SelectedSummativeTask } from '../../../../types';
import { SlideItem } from '../../../step6/types/slideTypes';
import { downloadFile, safeFilename } from './downloadFile';
import { LessonPackage } from './lessonPackageTypes';

export function downloadLessonPackage(
  title: string, subject: string, scheme: ModuleScheme, chunks: LessonChunk[], slides: SlideItem[],
  learningObjectives: string[] = [], summativeTask?: SelectedSummativeTask,
  extras: Pick<LessonPackage['lesson'], 'gradeLevel' | 'lessonDuration' | 'rawNotes' | 'themeNotes' | 'videoLinks'> = {},
) {
  if (!slides.length) throw new Error('Save slides before exporting a lesson package.');
  const packageData: LessonPackage = {
    format: 'quick-lesson', version: 1, exportedAt: new Date().toISOString(),
    lesson: { title, subject, scheme, chunks, slides, learningObjectives, summativeTask, ...extras },
  };
  downloadFile(JSON.stringify(packageData, null, 2), 'application/json;charset=utf-8', `${safeFilename(title)}.lesson`);
}

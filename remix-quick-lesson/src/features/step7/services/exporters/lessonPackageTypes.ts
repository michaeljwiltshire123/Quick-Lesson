import { LessonChunk, ModuleScheme, SelectedSummativeTask } from '../../../../types';
import { SlideItem } from '../../../step6/types/slideTypes';

export interface LessonPackage {
  format: 'quick-lesson';
  version: 1;
  exportedAt?: string;
  lesson: {
    title: string; subject: string; scheme: ModuleScheme;
    chunks: LessonChunk[]; slides: SlideItem[]; learningObjectives: string[];
    gradeLevel?: string; lessonDuration?: number; rawNotes?: string; themeNotes?: string; videoLinks?: string[];
    summativeTask?: SelectedSummativeTask;
  };
}

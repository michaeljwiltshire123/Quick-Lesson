import { SlideItem } from '../types/slideTypes';
import { LessonChunk } from '../../../types';
import { assembleSlideData } from '../services/slideDataAssemblyService';

export function createDefaultSlideDeck(
  lessonTitle = 'Classroom Lesson',
  subject = 'Curriculum Topic',
  chunks: LessonChunk[] = [],
  learningObjectives: string[] = [],
): SlideItem[] {
  return assembleSlideData(lessonTitle, subject, chunks, learningObjectives);
}

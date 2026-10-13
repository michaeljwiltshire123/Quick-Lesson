import { ImposterQuestion } from '../types/imposterTypes';
import { LessonChunk } from '../../../../../types';
import {
  getOrGeneratePool,
  getPoolQuestionForRound,
} from './generator';

export function createLessonGroundedQuestion(
  lessonTitle: string,
  chunks?: LessonChunk[],
  roundIndex: number = 0
): ImposterQuestion {
  return getPoolQuestionForRound(roundIndex, lessonTitle, chunks);
}

export function generateLessonQuestionSet(
  lessonTitle: string,
  chunks?: LessonChunk[]
): ImposterQuestion[] {
  const pool = getOrGeneratePool(lessonTitle, chunks);
  return pool.questions;
}

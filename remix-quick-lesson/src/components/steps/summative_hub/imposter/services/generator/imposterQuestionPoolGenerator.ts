import { ImposterQuestion } from '../../types/imposterTypes';
import { LessonChunk } from '../../../../../../types';
import { extractLessonQuestionContext } from '../context_extractor';
import {
  buildComponentNameDropBatch,
  buildRealWorldAppBatch,
  buildAnalogyLinkBatch,
  buildActionVerbBatch,
} from './batchPoolHelpers';

export interface PreGeneratedPoolResult {
  lessonTitle: string;
  totalQuestions: number;
  questions: ImposterQuestion[];
  generatedAt: number;
}

export function generateFullImposterPool(
  lessonTitle: string,
  chunks: LessonChunk[] = []
): PreGeneratedPoolResult {
  const ctx = extractLessonQuestionContext(lessonTitle, chunks);

  const dropBatch = buildComponentNameDropBatch(ctx);
  const realBatch = buildRealWorldAppBatch(ctx);
  const analogyBatch = buildAnalogyLinkBatch(ctx);
  const verbBatch = buildActionVerbBatch(ctx);

  // Interleave the 4 types so rounds naturally rotate through all 4 styles
  const interleaved: ImposterQuestion[] = [];
  for (let i = 0; i < 10; i++) {
    interleaved.push(dropBatch[i]);
    interleaved.push(realBatch[i]);
    interleaved.push(analogyBatch[i]);
    interleaved.push(verbBatch[i]);
  }

  return {
    lessonTitle: ctx.lessonTitle,
    totalQuestions: interleaved.length, // Exactly 40
    questions: interleaved,
    generatedAt: Date.now(),
  };
}

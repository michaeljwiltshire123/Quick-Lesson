import { SummativeQuizQuestion } from '../../summative_quiz/typesSummativeQuiz';
import { LessonChunk } from '../../../../../types';
import { createChunkGroundedQuestions } from './chunkGroundedPlainQuizFactory';

export async function routePlainQuizGeneration(
  lessonTitle: string,
  chunks: LessonChunk[],
  count: number,
  aiGenerator?: () => Promise<SummativeQuizQuestion[]>
): Promise<SummativeQuizQuestion[]> {
  if (aiGenerator) {
    try {
      const result = await aiGenerator();
      if (result && result.length > 0) return result;
    } catch {
      // Fallback to grounded generator
    }
  }

  return createChunkGroundedQuestions(lessonTitle, chunks, count);
}

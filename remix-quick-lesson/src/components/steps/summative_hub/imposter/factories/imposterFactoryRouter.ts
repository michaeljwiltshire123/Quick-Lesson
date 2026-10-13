import { ImposterQuestion } from '../types/imposterTypes';
import { LessonChunk } from '../../../../../types';
import { fetchChunkGroundedImposterQuestions } from './chunkGroundedImposterFactory';
import { getInitialImposterDeck } from '../services/imposterQuestionService';

export async function resolveImposterQuestions(
  lessonTitle: string,
  chunks: LessonChunk[] = []
): Promise<ImposterQuestion[]> {
  const aiResults = await fetchChunkGroundedImposterQuestions(lessonTitle, chunks);
  if (aiResults.length > 0) {
    return aiResults;
  }
  return getInitialImposterDeck(lessonTitle, chunks);
}

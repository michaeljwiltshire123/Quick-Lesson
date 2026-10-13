import { SummativeQuizQuestion } from '../../summative_quiz/typesSummativeQuiz';
import { LessonChunk } from '../../../../../types';

export function createChunkGroundedQuestions(
  lessonTitle: string,
  chunks: LessonChunk[] = [],
  count: number = 6
): SummativeQuizQuestion[] {
  const questions: SummativeQuizQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const chunkIdx = chunks.length > 0 ? i % chunks.length : undefined;
    const chunk = chunkIdx !== undefined ? chunks[chunkIdx] : undefined;
    const topic = chunk?.title || lessonTitle || `Lesson Concept ${i + 1}`;
    const intent = chunk?.learningIntent || 'Curriculum understanding';

    const sourceText = chunk?.coreExplanation || chunk?.teacherScript || chunk?.vocabulary || '';
    const keywords = sourceText
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 5)
      .slice(0, 3);

    const term = keywords[0] ? `"${keywords[0]}"` : topic;

    questions.push({
      id: `grounded-q-${Date.now()}-${i + 1}`,
      questionNumber: i + 1,
      prompt: `When working through ${topic}, how does using ${term} help you master ${intent.toLowerCase()}?`,
      choices: [
        `It gives a clear, practical method to achieve ${topic}`,
        `It is just an extra detail that doesn't change the outcome`,
        `It mixes up key terms with completely unrelated subjects`,
        `It means you no longer need to check or evaluate your work`,
      ],
      correctChoiceIndex: 0,
      explanation: `Using ${term} directly helps you understand and master ${topic}.`,
      chunkIndex: chunkIdx,
      chunkTitle: topic,
      learningIntent: intent,
    });
  }

  return questions;
}

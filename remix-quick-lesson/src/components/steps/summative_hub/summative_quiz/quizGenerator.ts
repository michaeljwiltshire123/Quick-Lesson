import { SummativeQuizQuestion } from './typesSummativeQuiz';
import { LessonChunk } from '../../../../types';

export function generateQuizQuestions(
  lessonTitle: string,
  chunks: LessonChunk[] = [],
  count: number = 6
): SummativeQuizQuestion[] {
  const questions: SummativeQuizQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const chunkIdx = chunks.length > 0 ? i % chunks.length : undefined;
    const chunk = chunkIdx !== undefined ? chunks[chunkIdx] : undefined;
    const topic = chunk?.title || lessonTitle || `Core Concept ${i + 1}`;

    if (i % 2 === 1) {
      questions.push({
        id: `q-draft-${i + 1}`,
        questionNumber: i + 1,
        prompt: `Imagine a student is working on "${topic}". What is the most effective approach?`,
        choices: [
          `Apply the core rules of ${topic} step-by-step to reach a clear result`,
          `Guess the outcome without checking any underlying steps`,
          `Skip the core technique and focus only on superficial details`,
          `Ignore key feedback and stick to incorrect assumptions`,
        ],
        correctChoiceIndex: 0,
        explanation: `Applying structured steps in ${topic} ensures your work is accurate and reliable.`,
        chunkIndex: chunkIdx,
        chunkTitle: topic,
      });
    } else {
      questions.push({
        id: `q-draft-${i + 1}`,
        questionNumber: i + 1,
        prompt: `Why is understanding "${topic}" essential when studying ${lessonTitle || 'this unit'}?`,
        choices: [
          `It forms the foundation needed to solve more complex problems in ${topic}`,
          `It is an outdated rule that isn't used in practical work anymore`,
          `It only exists to make the assignment longer without adding value`,
          `It replaces the need to learn any other key terminology`,
        ],
        correctChoiceIndex: 0,
        explanation: `${topic} provides the essential knowledge base for mastering ${lessonTitle || 'the lesson'}.`,
        chunkIndex: chunkIdx,
        chunkTitle: topic,
      });
    }
  }

  return questions;
}

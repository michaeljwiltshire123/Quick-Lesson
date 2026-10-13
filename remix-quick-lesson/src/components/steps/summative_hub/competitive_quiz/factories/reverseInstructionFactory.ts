import { QuestionCard } from '../types/competitiveQuizTypes';

export const createReverseInstructionQuestion = (
  chunk: { title?: string; notes?: string },
  lessonTitle: string,
  index: number
): QuestionCard => {
  const topic = chunk.title || lessonTitle;
  return {
    id: `factory-rev-${index}-${Date.now().toString(36)}`,
    format: 'reverse_instruction',
    formatLabel: 'Reverse Reflex (DO NOT!)',
    prompt: `DO NOT select the accurate fact about ${topic}! Tap the single INCORRECT claim!`,
    options: [
      `It obeys standard curriculum conservation laws`,
      `It produces measurable, verifiable output`,
      `It occurs instantaneously with zero energy change`,
      `It functions within defined system boundaries`,
    ],
    correctIndex: 2,
    explanation: `Because the reflex command was 'DO NOT pick the accurate fact', the wrong claim (Option C) was the target!`,
    speedLimitSeconds: 7,
    potValue: 180,
    conceptCovered: topic,
    difficulty: 'stretch',
  };
};

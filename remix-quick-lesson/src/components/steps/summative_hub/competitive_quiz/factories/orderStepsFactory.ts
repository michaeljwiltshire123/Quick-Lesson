import { QuestionCard } from '../types/competitiveQuizTypes';

interface ChunkLike {
  title?: string;
  notes?: string;
}

export const createOrderStepsQuestion = (
  chunk: ChunkLike,
  lessonTitle: string,
  index: number
): QuestionCard => {
  const topic = chunk.title || lessonTitle;

  const step1 = `1. Observe the initial state and baseline conditions of ${topic}`;
  const step2 = `2. Apply the primary mechanism and trigger factor`;
  const step3 = `3. Monitor and record the transitional reaction`;
  const step4 = `4. Verify the final curriculum outcome and evaluate findings`;

  const correctOrder = [step1, step2, step3, step4];
  // Scramble steps for question options
  const scrambledOptions = [step3, step1, step4, step2];

  return {
    id: `factory-ord-${index}-${Date.now().toString(36)}`,
    format: 'order_steps',
    formatLabel: 'Order The Steps',
    prompt: `Arrange the 4 core process stages for ${topic} into their exact chronological order!`,
    options: scrambledOptions,
    correctOrder,
    correctIndex: 0,
    explanation: `The accurate sequence begins with baseline observation, applies the primary mechanism, evaluates the reaction, and concludes with verified findings.`,
    speedLimitSeconds: 15,
    potValue: 150,
    conceptCovered: topic,
    difficulty: 'core',
  };
};

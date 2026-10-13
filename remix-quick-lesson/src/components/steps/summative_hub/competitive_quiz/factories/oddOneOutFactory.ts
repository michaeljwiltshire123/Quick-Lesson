import { QuestionCard } from '../types/competitiveQuizTypes';

interface ChunkLike {
  title?: string;
  notes?: string;
}

export const createOddOneOutQuestion = (
  chunk: ChunkLike,
  lessonTitle: string,
  index: number
): QuestionCard => {
  const topic = chunk.title || lessonTitle;

  const validProp1 = `Essential foundational condition of ${topic}`;
  const validProp2 = `Direct causal factor governing ${topic}`;
  const outlierProp = `Superficial distractor operating under completely inverted rules`;
  const validProp3 = `Verifiable measurable output of ${topic}`;

  const options = [validProp1, validProp2, outlierProp, validProp3];

  return {
    id: `factory-ooo-${index}-${Date.now().toString(36)}`,
    format: 'odd_one_out',
    formatLabel: 'Odd One Out',
    prompt: `Three of these options represent genuine characteristics of ${topic}. Which single option is the conceptual outlier?`,
    options,
    correctIndex: 2,
    explanation: `Option 3 breaks the rule: while Options 1, 2, and 4 are verifiable properties of ${topic}, Option 3 introduces an inverted distractor mechanism.`,
    speedLimitSeconds: 10,
    potValue: 130,
    conceptCovered: topic,
    difficulty: index < 5 ? 'core' : 'stretch',
  };
};

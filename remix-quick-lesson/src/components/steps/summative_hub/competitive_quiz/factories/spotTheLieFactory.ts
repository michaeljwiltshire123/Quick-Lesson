import { QuestionCard } from '../types/competitiveQuizTypes';

interface ChunkLike {
  title?: string;
  notes?: string;
}

export const createSpotTheLieQuestion = (
  chunk: ChunkLike,
  lessonTitle: string,
  index: number
): QuestionCard => {
  const topic = chunk.title || lessonTitle;
  const rawNotes = chunk.notes?.trim() || '';
  const sentences = rawNotes.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 10);

  const fact1 = sentences[0] || `${topic} operates according to verified curriculum principles.`;
  const fact2 = sentences[1] || `${topic} produces observable, measurable outcomes during testing.`;
  const fact3 = sentences[2] || `${topic} requires precise foundational conditions to function correctly.`;
  const plausibleLie = `Contrary to curriculum evidence, ${topic} behaves spontaneously without any governing rules.`;

  const options = [fact1, plausibleLie, fact2, fact3];

  return {
    id: `factory-stl-${index}-${Date.now().toString(36)}`,
    format: 'spot_the_lie',
    formatLabel: 'Spot The Lie',
    prompt: `Three of these statements about ${topic} are true facts from our lesson. Which single statement is the lie?`,
    options,
    correctIndex: 1,
    explanation: `Statement 2 is the lie. In reality, ${fact1.toLowerCase()} and ${fact2.toLowerCase()}`,
    speedLimitSeconds: 12,
    potValue: 120,
    conceptCovered: topic,
    difficulty: index < 3 ? 'starter' : 'core',
  };
};

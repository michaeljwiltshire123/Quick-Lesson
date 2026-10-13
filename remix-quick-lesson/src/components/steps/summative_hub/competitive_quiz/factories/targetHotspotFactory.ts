import { QuestionCard } from '../types/competitiveQuizTypes';

interface ChunkLike {
  title?: string;
  notes?: string;
}

export const createTargetHotspotQuestion = (
  chunk: ChunkLike,
  lessonTitle: string,
  index: number
): QuestionCard => {
  const topic = chunk.title || lessonTitle;

  return {
    id: `factory-tgt-${index}-${Date.now().toString(36)}`,
    format: 'target_tap',
    formatLabel: 'Target Tap (Hotspot)',
    prompt: `Tap the exact focal point on the diagram where the primary reaction for ${topic} occurs!`,
    targetZone: { label: `${topic} Focal Hub`, x: 50, y: 40 },
    options: [
      `Focal Core of ${topic} (Primary Reaction)`,
      `Peripheral Zone A (Secondary Dissipation)`,
      `Boundary Layer (Passive Resistance)`,
      `External Ground State`,
    ],
    correctIndex: 0,
    explanation: `The focal core (Zone 1) is the precise coordinate where the primary transformation initiates in ${topic}.`,
    speedLimitSeconds: 8,
    potValue: 140,
    conceptCovered: topic,
    difficulty: 'stretch',
  };
};

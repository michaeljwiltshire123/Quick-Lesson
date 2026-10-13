import { QuestionCard } from '../types/competitiveQuizTypes';

export const createScoreSwapQuestion = (
  chunk: { title?: string; notes?: string },
  lessonTitle: string,
  index: number
): QuestionCard => {
  const topic = chunk.title || lessonTitle;
  return {
    id: `factory-swap-${index}-${Date.now().toString(36)}`,
    format: 'score_swap',
    formatLabel: 'Score Swap Duel',
    prompt: `MIDWAY DUEL: Lock in the key principle of ${topic} to steal and swap scores with your chosen rival!`,
    options: [
      `Primary governing rule of ${topic}`,
      `Common pupil misconception distractor`,
      `Opposing unrelated principle`,
      `Outdated historical hypothesis`,
    ],
    correctIndex: 0,
    explanation: `Correct answer triggers an instant chain score swap with your targeted opponent on the leaderboard!`,
    speedLimitSeconds: 10,
    potValue: 250,
    conceptCovered: topic,
    difficulty: 'core',
  };
};

export const createAvatarRaceQuestion = (
  chunk: { title?: string; notes?: string },
  lessonTitle: string,
  index: number
): QuestionCard => {
  const topic = chunk.title || lessonTitle;
  return {
    id: `factory-race-${index}-${Date.now().toString(36)}`,
    format: 'avatar_race',
    formatLabel: 'Avatar Sprint Race',
    prompt: `AVATAR SPRINT: Tap the shape matching the true mechanism of ${topic} to propel your runner across the board!`,
    options: ['Circle (Key Catalyst)', 'Triangle (Decoy)', 'Square (Distractor)', 'Star (Outlier)'],
    correctIndex: 0,
    explanation: `Fast tapping on the matching shape sprints your avatar ahead across the projector screen.`,
    speedLimitSeconds: 15,
    potValue: 300,
    conceptCovered: topic,
    difficulty: 'core',
  };
};

export const createDrawShowdownQuestion = (
  chunk: { title?: string; notes?: string },
  lessonTitle: string,
  index: number
): QuestionCard => {
  const topic = chunk.title || lessonTitle;
  return {
    id: `factory-draw-${index}-${Date.now().toString(36)}`,
    format: 'draw_showdown',
    formatLabel: 'Diagram Draw Showdown',
    prompt: `SKETCH BATTLE: Draw a quick diagram illustrating the structure of ${topic}! Best drawing wins double marks!`,
    options: ['Complete Diagram', 'Partial Sketch', 'Key Labels Added', 'Quick Thumbnail'],
    correctIndex: 0,
    explanation: `Peer voting decides which pair of drawings receives the double bounty.`,
    speedLimitSeconds: 20,
    potValue: 200,
    conceptCovered: topic,
    difficulty: 'stretch',
  };
};

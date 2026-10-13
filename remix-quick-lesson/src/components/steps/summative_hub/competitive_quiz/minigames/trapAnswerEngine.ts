export interface TrapCard {
  authorId: string;
  authorName: string;
  trapAnswers: [string, string];
}

export interface TrapPenaltyEvent {
  victimId: string;
  victimName: string;
  authorId: string;
  authorName: string;
  pointsDeducted: number;
  chosenTrapText: string;
}

export const injectTrapAnswersIntoOptions = (
  baseOptions: string[],
  trapCard: TrapCard | null
): string[] => {
  if (!trapCard) return baseOptions;
  const merged = [...baseOptions];
  // Replace up to 2 wrong distractors with custom trap options
  if (trapCard.trapAnswers[0] && merged.length > 2) merged[1] = trapCard.trapAnswers[0];
  if (trapCard.trapAnswers[1] && merged.length > 3) merged[2] = trapCard.trapAnswers[1];
  return merged;
};

export const evaluateTrapVictims = (
  trapCard: TrapCard | null,
  pupilSelections: Record<string, string>,
  pupilScores: Record<string, number>,
  pupilNames: Record<string, string>
): TrapPenaltyEvent[] => {
  if (!trapCard) return [];
  const events: TrapPenaltyEvent[] = [];

  for (const [pupilId, chosenAnswer] of Object.entries(pupilSelections)) {
    if (pupilId === trapCard.authorId) continue;

    if (trapCard.trapAnswers.includes(chosenAnswer)) {
      const victimCurrentScore = pupilScores[pupilId] || 100;
      const penalty = Math.max(20, Math.floor(victimCurrentScore * 0.2));

      events.push({
        victimId: pupilId,
        victimName: pupilNames[pupilId] || pupilId,
        authorId: trapCard.authorId,
        authorName: trapCard.authorName,
        pointsDeducted: penalty,
        chosenTrapText: chosenAnswer,
      });
    }
  }

  return events;
};

export interface AccaBetResult {
  bettorId: string;
  success: boolean;
  pointsStolen: number;
  voidReason?: 'collusion_collar' | 'missed_selection' | null;
  targetResults: Array<{ id: string; name: string; isCorrect: boolean }>;
}

export const resolveAccaBet = (
  bettorId: string,
  targetIds: string[],
  players: Array<{ id: string; name: string; score: number }>,
  answersCorrect: Record<string, boolean>,
  totalPlayersInRoom: number
): AccaBetResult => {
  const correctCountInRoom = Object.values(answersCorrect).filter(Boolean).length;
  const roomAccuracy = totalPlayersInRoom > 0 ? (correctCountInRoom / totalPlayersInRoom) * 100 : 0;

  // Anti-shouting / collusion guard: >90% room accuracy voids the bet
  if (roomAccuracy > 90) {
    return {
      bettorId,
      success: false,
      pointsStolen: 0,
      voidReason: 'collusion_collar',
      targetResults: targetIds.map((id) => ({
        id,
        name: players.find((p) => p.id === id)?.name || id,
        isCorrect: Boolean(answersCorrect[id]),
      })),
    };
  }

  const targetResults = targetIds.map((id) => ({
    id,
    name: players.find((p) => p.id === id)?.name || id,
    isCorrect: Boolean(answersCorrect[id]),
  }));

  const allTargetsCorrect = targetResults.length > 0 && targetResults.every((t) => t.isCorrect);

  if (!allTargetsCorrect) {
    return {
      bettorId,
      success: false,
      pointsStolen: 0,
      voidReason: 'missed_selection',
      targetResults,
    };
  }

  // Calculate 50% steal from each selected target (e.g. 75 pts base win)
  const estimatedWinPerTarget = 150;
  const pointsStolen = Math.floor(targetIds.length * (estimatedWinPerTarget * 0.5));

  return {
    bettorId,
    success: true,
    pointsStolen,
    targetResults,
  };
};

export interface BlitzSurvivor {
  id: string;
  name: string;
  avatar: string;
  isAlive: boolean;
  lastResponseCorrect?: boolean;
}

export interface BlitzGameState {
  round: number;
  speedLimitSeconds: number;
  currentPot: number;
  survivors: BlitzSurvivor[];
  lastLoneEliminatedId?: string;
  isGameOver: boolean;
  winnerId?: string;
  surpriseConsolation?: boolean;
}

export const initBinaryBlitzState = (
  players: Array<{ id: string; name: string; avatar: string }>
): BlitzGameState => ({
  round: 1,
  speedLimitSeconds: 5.0,
  currentPot: 300,
  survivors: players.map((p) => ({ ...p, isAlive: true })),
  isGameOver: false,
});

export const processBlitzRound = (
  state: BlitzGameState,
  answers: Record<string, boolean>,
  correctAnswer: boolean
): BlitzGameState => {
  const previouslyAlive = state.survivors.filter((s) => s.isAlive);
  const updatedSurvivors = state.survivors.map((p) => {
    if (!p.isAlive) return p;
    const answeredCorrectly = answers[p.id] === correctAnswer;
    return { ...p, isAlive: answeredCorrectly, lastResponseCorrect: answeredCorrectly };
  });

  const stillAlive = updatedSurvivors.filter((s) => s.isAlive);
  const newlyEliminated = previouslyAlive.filter((p) => answers[p.id] !== correctAnswer);
  const lastLoneId = newlyEliminated.length === 1 ? newlyEliminated[0].id : state.lastLoneEliminatedId;
  const newPot = state.currentPot + 120 + (previouslyAlive.length * 40);

  // Exactly 1 champion left standing
  if (stillAlive.length === 1) {
    return {
      ...state,
      round: state.round + 1,
      currentPot: newPot,
      survivors: updatedSurvivors,
      isGameOver: true,
      winnerId: stillAlive[0].id,
      surpriseConsolation: false,
    };
  }

  // Simultaneous wipeout (2+ finalists all got it wrong together on same question)
  if (stillAlive.length === 0 && previouslyAlive.length > 0) {
    const rescueWinnerId = lastLoneId || previouslyAlive[0].id;
    return {
      ...state,
      round: state.round + 1,
      currentPot: newPot,
      survivors: updatedSurvivors,
      isGameOver: true,
      winnerId: rescueWinnerId,
      surpriseConsolation: true,
    };
  }

  // Multiple survivors continue into faster next statement (down to 2.2s cap)
  const nextSpeed = Math.max(2.2, +(state.speedLimitSeconds - 0.5).toFixed(1));
  return {
    ...state,
    round: state.round + 1,
    speedLimitSeconds: nextSpeed,
    currentPot: newPot,
    survivors: updatedSurvivors,
    lastLoneEliminatedId: lastLoneId,
    isGameOver: false,
  };
};

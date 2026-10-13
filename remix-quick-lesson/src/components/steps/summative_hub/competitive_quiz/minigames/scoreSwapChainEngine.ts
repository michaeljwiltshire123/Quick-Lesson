import { PlayerState } from '../types/competitiveQuizTypes';
import { ScoreSwapChainEntry } from '../types/minigameTypes';

export interface SwapChainStepResult {
  updatedPlayers: PlayerState[];
  chainLog: ScoreSwapChainEntry[];
}

export const processScoreSwapChain = (
  players: PlayerState[],
  submissions: { playerId: string; targetPlayerId: string; answerSpeedMs: number; isCorrect: boolean }[]
): SwapChainStepResult => {
  const playerMap = new Map(players.map((p) => [p.id, { ...p }]));
  const chainLog: ScoreSwapChainEntry[] = [];

  // Filter to only pupils who answered correctly and sort by fastest answer speed
  const sorted = [...submissions]
    .filter((s) => s.isCorrect && s.playerId !== s.targetPlayerId)
    .sort((a, b) => a.answerSpeedMs - b.answerSpeedMs);

  for (const sub of sorted) {
    const swapper = playerMap.get(sub.playerId);
    const target = playerMap.get(sub.targetPlayerId);

    if (!swapper || !target) continue;

    const swapperOldScore = swapper.score;
    const targetOldScore = target.score;

    // Execute swap using current scores (including if target was already swapped in a previous step)
    swapper.score = targetOldScore;
    target.score = swapperOldScore;

    chainLog.push({
      playerId: swapper.id,
      playerName: swapper.name,
      targetPlayerId: target.id,
      targetPlayerName: target.name,
      answerSpeedMs: sub.answerSpeedMs,
      isCorrect: true,
      scoreBefore: swapperOldScore,
      scoreAfter: swapper.score,
    });
  }

  return {
    updatedPlayers: Array.from(playerMap.values()),
    chainLog,
  };
};

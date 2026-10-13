import { TeamColor } from '../types/gridlockTypes';

export interface GoldHexRoundOutcome {
  isGold: boolean;
  capturingTeam: TeamColor;
  pointsAwarded: number;
  timePenaltyTeam: TeamColor;
  nextQuestionTimeLimitSecs: number;
}

const DEFAULT_QUESTION_TIME_SECS = 20;

export function evaluateGoldHexCapture(
  isGold: boolean,
  capturingTeam: TeamColor,
  baseTimeLimitSecs = DEFAULT_QUESTION_TIME_SECS
): GoldHexRoundOutcome {
  const losingTeam: TeamColor = capturingTeam === 'red' ? 'blue' : 'red';

  if (!isGold) {
    return {
      isGold: false,
      capturingTeam,
      pointsAwarded: 1,
      timePenaltyTeam: losingTeam,
      nextQuestionTimeLimitSecs: Math.max(5, baseTimeLimitSecs),
    };
  }

  // 2x Gold Hex Capture: Double points (2 pts) + 50% time penalty on next question for opponent
  const slashedTimeLimit = Math.max(5, Math.floor(baseTimeLimitSecs * 0.5));

  return {
    isGold: true,
    capturingTeam,
    pointsAwarded: 2,
    timePenaltyTeam: losingTeam,
    nextQuestionTimeLimitSecs: slashedTimeLimit,
  };
}

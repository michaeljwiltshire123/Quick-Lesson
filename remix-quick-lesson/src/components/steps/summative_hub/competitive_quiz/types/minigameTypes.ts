export interface RaceRunner {
  id: string;
  name: string;
  avatarColor: string;
  positionPercent: number; // 0 to 100
  isRacing: boolean;
  rank?: number;
}

export interface RaceBet {
  betterPlayerId: string;
  betterPlayerName: string;
  predictedFirstId: string;
  predictedSecondId: string;
  wagerPoints: number;
}

export interface DrawDuelSubmission {
  playerId: string;
  playerName: string;
  strokeDataUrl: string;
  timestamp: number;
}

export interface DrawDuelMatchup {
  prompt: string;
  playerA: DrawDuelSubmission;
  playerB: DrawDuelSubmission;
  votesA: string[]; // player IDs
  votesB: string[]; // player IDs
  winningPlayerId?: string;
}

export interface ScoreSwapChainEntry {
  playerId: string;
  playerName: string;
  targetPlayerId: string;
  targetPlayerName: string;
  answerSpeedMs: number;
  isCorrect: boolean;
  scoreBefore: number;
  scoreAfter: number;
}

export interface ReverseInstructionRule {
  id: string;
  ruleTitle: string;
  directive: string; // e.g. "Do NOT select the incorrect definition!"
  trickExplanation: string;
}

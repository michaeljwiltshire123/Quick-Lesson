export type RoundEndReason = 'word_guessed' | 'time_expired' | 'foul_forfeit';

export interface RoundResolution {
  reason: RoundEndReason;
  pointsEarned: number;
  timeTakenSeconds: number;
  targetWord: string;
  forbiddenWords: string[];
  teamId: string;
  teamName: string;
  bonusPoints?: number;
  bonusReason?: string;
  mvpVotes?: Record<string, number>;
}

export interface TeamScoreHistory {
  teamId: string;
  previousScore: number;
  newScore: number;
  streak: number;
  rank: number;
  previousRank: number;
}

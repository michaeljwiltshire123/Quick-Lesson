import { PollFormState } from '../types';

export interface VoteCounts {
  [optionId: string]: number;
}

export interface LivePollState {
  pollConfig: PollFormState;
  voteCounts: VoteCounts;
  totalVotes: number;
  remainingSeconds: number | null;
  isTimerRunning: boolean;
  isRevealed: boolean;
  wordCloudEntries: { text: string; count: number }[];
}

export type PollSaveAction = 'save_image' | 'save_to_slide_and_reset' | 'reset_only';

export interface LivePollExportPayload {
  pollTitle: string;
  totalVotes: number;
  resultsSummary: string;
  timestamp: string;
}

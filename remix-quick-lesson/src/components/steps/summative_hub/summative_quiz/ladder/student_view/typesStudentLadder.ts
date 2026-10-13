import { LifelineType } from '../typesLadder';

export interface ActiveLifelineState {
  type: LifelineType;
  used: boolean;
}

export interface TeamVoteConsensus {
  choiceIndex: number;
  percentage: number;
  voterCount: number;
}

export interface QuestionSwapQueueStatus {
  isQueued: boolean;
  message: string;
}

export interface StudentLadderState {
  currentRung: number;
  currentPoints: number;
  safetyNetPoints: number;
  selectedChoice: number | null;
  eliminatedChoices: number[]; // e.g. for 50/50
  lifelines: ActiveLifelineState[];
  activeModal: LifelineType | null;
  swapStatus: QuestionSwapQueueStatus;
  teamVotes: TeamVoteConsensus[];
  isSubmitted: boolean;
}

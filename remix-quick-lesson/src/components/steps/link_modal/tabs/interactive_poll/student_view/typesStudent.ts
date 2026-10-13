import { PollOption, PollType } from '../types';

export interface StudentPollResponse {
  studentName?: string;
  selectedOptionIds: string[];
  rankingOrder?: string[];
  openText?: string;
  wordCloudKeyword?: string;
  confidenceRating?: number; // 1 to 3
  submittedAt: string;
}

export type SubmissionState = 'idle' | 'submitting' | 'submitted' | 'timed_out';

export interface StudentViewState {
  studentName: string;
  selectedOptionIds: string[];
  rankingOrder: string[];
  openText: string;
  wordCloudKeyword: string;
  confidenceRating: number;
  submissionState: SubmissionState;
}

export interface StudentInputRendererProps {
  pollType: PollType;
  options: PollOption[];
  state: StudentViewState;
  onChange: (patch: Partial<StudentViewState>) => void;
  disabled: boolean;
}

import { DiscussionStarterFormatType } from './starterTypes';

export interface DiscussionStarterCard {
  id: string;
  conceptId: string;
  milestoneChunkId: string;
  formatType: DiscussionStarterFormatType;
  promptText: string;
  misconceptionWarning: string;
  teacherDeliveryLine: string;
  isAttached?: boolean;
  isTrue?: boolean;
}

export interface Step5StarterCollection {
  lessonTitle: string;
  subject: string;
  cards: DiscussionStarterCard[];
  lastUpdated: string;
}

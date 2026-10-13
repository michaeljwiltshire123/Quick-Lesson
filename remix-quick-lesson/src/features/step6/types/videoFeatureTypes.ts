export interface VideoCheckpoint {
  id: string;
  timeSec: number;
  timeStr: string; // e.g. "01:30"
  question: string;
}

export interface VideoBookmark {
  id: string;
  timeSec: number;
  label: string; // e.g. "The Chemical Reaction"
}

export interface VideoMetaConfig {
  videoUrl?: string;
  isAutoplay?: boolean;
  isMuted?: boolean;
  isLoop?: boolean;
  hasHandoutQrCode?: boolean;
  aspectRatio?: '16:9' | '9:16' | '4:3';
  playbackSpeed?: number; // 0.5, 0.75, 1, 1.25, 1.5
  isStageMode?: boolean;
  isLoopSegment?: boolean;
  loopStartSec?: number;
  loopEndSec?: number;
  forceCaptions?: boolean;
  isClassroomClean?: boolean;
  posterChoice?: 'default' | 'start' | 'mid' | 'end' | 'custom';
  customPosterUrl?: string;
  checkpoints?: VideoCheckpoint[];
  bookmarks?: VideoBookmark[];
}

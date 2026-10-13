export type SummativeTabKey = 'performance_tasks' | 'escape_room' | 'summative_quiz';

export type MultimodalFormat =
  | 'written_report'
  | 'verbal_pitch'
  | 'visual_sketchnote'
  | 'practical_demo'
  | 'peer_audit'
  | 'data_debug'
  | 'written_cer';

export interface AssessedCriteriaBadge {
  code: string;
  label?: string;
}

export interface SummativeTaskChoice {
  id: string;
  format: MultimodalFormat;
  title: string;
  formatLabel: string;
  description: string;
  criteriaCodes: string[];
  coveredConcepts: string[];
  handoutPrompt: string;
}

export interface SummativeHubState {
  activeTab: SummativeTabKey;
  selectedTaskId: string | null;
  tasks: SummativeTaskChoice[];
  isLoading: boolean;
  exportNotice?: string;
}

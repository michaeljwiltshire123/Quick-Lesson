export interface LetterBreakdown {
  letter: string;
  term: string;
  explanation: string;
}

export interface AcronymItem {
  id: string;
  word: string;
  meaning: string;
  breakdown: LetterBreakdown[];
  rationale?: string;
  selected?: boolean;
}

export interface AcronymWorkflowOption {
  id: string;
  title: string;
  description: string;
  steps: string[];
}

export interface AcronymFormState {
  concept: string;
  contextScript: string;
  selectedWorkflow: string;
  customWorkflow: string;
}

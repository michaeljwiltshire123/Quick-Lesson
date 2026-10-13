export interface QuizQuestionItem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 1-based index (1, 2, 3, 4)
  explanation: string;
}

export type QuestionMixType = 'mcq' | 'tf' | 'mix';

export interface PayloadControlsProps {
  questionCount: number;
  onQuestionCountChange: (count: number) => void;
  questionMix: QuestionMixType;
  onQuestionMixChange: (mix: QuestionMixType) => void;
  customFocus: string;
  onCustomFocusChange: (focus: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

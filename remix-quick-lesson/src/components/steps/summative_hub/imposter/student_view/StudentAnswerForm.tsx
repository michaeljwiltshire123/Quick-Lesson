import React from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { ImposterQuestion } from '../types/imposterTypes';
import { QuestionRendererSwitch } from './QuestionRendererSwitch';

interface Props {
  question: ImposterQuestion;
  answer: string;
  hasSubmitted: boolean;
  onAnswerChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const StudentAnswerForm: React.FC<Props> = ({
  question,
  answer,
  hasSubmitted,
  onAnswerChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <QuestionRendererSwitch
        question={question}
        value={answer}
        onChange={onAnswerChange}
        disabled={hasSubmitted}
      />
      <button
        id="btn-submit-student-answer"
        type="submit"
        disabled={!answer.trim() || hasSubmitted}
        className={`w-full py-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
          hasSubmitted
            ? 'bg-emerald-700 text-white cursor-default'
            : !answer.trim()
            ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
            : 'bg-amber-600 hover:bg-amber-700 text-white active:scale-98'
        }`}
      >
        {hasSubmitted ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            <span>Answer Sent!</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send My Answer</span>
          </>
        )}
      </button>
    </form>
  );
};

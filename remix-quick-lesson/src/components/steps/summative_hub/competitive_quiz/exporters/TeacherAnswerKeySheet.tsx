import React from 'react';
import { QuestionCard } from '../types/competitiveQuizTypes';

interface Props {
  lessonTitle: string;
  questions: QuestionCard[];
}

export const TeacherAnswerKeySheet: React.FC<Props> = ({ lessonTitle, questions }) => {
  return (
    <div className="bg-white text-slate-900 p-8 max-w-4xl mx-auto space-y-6 print:p-0 print:text-black">
      {/* Header */}
      <div className="border-b-2 border-emerald-700 pb-4 flex justify-between items-end">
        <div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
            CONFIDENTIAL • EDUCATOR ONLY
          </span>
          <h1 className="text-xl font-bold uppercase tracking-tight mt-1">{lessonTitle}</h1>
          <p className="text-xs text-slate-600 font-medium">Diagnostic Mark Scheme & Misconception Analysis</p>
        </div>
        <div className="text-xs font-mono text-right">
          <div>Total Assessment Marks: {questions.reduce((sum, q) => sum + q.potValue, 0)}</div>
          <div>Total Rounds: {questions.length}</div>
        </div>
      </div>

      {/* Answer Key List */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const correctLetter = q.correctIndex !== undefined ? String.fromCharCode(65 + q.correctIndex) : 'N/A';
          const rawCorrect = q.options && q.correctIndex !== undefined ? q.options[q.correctIndex] : 'Verified solution';
          const correctText = typeof rawCorrect === 'object' && rawCorrect !== null
            ? (rawCorrect as any).left ? `${(rawCorrect as any).left} ➔ ${(rawCorrect as any).right}` : Object.values(rawCorrect).join(' ➔ ')
            : String(rawCorrect ?? '');

          return (
            <div key={q.id || idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 break-inside-avoid text-xs">
              <div className="flex justify-between items-center font-bold">
                <span className="text-emerald-800">
                  Question {idx + 1} [{q.formatLabel}] • Target: {q.conceptCovered}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono font-black">
                  Correct: Option {correctLetter}
                </span>
              </div>

              <p className="text-slate-800 italic">"{q.prompt}"</p>

              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 font-medium">
                <strong>Correct Answer:</strong> {correctText}
              </div>

              <div className="text-slate-600 text-[11px] leading-relaxed">
                <strong>Pedagogical Rationale:</strong> {q.explanation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

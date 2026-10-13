import React from 'react';
import { QuestionCard } from '../types/competitiveQuizTypes';

interface Props {
  lessonTitle: string;
  questions: QuestionCard[];
}

export const PrintablePupilWorksheet: React.FC<Props> = ({ lessonTitle, questions }) => {
  return (
    <div className="bg-white text-slate-900 p-8 max-w-4xl mx-auto space-y-6 print:p-0 print:text-black">
      {/* Header */}
      <div className="border-b-2 border-black pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-tight">{lessonTitle}</h1>
          <p className="text-xs text-slate-600 font-medium">Curriculum Assessment • Pupil Response Sheet</p>
        </div>
        <div className="text-xs space-y-1 font-mono">
          <div>Pupil Name: ___________________________</div>
          <div>Date: _______________ Class: _________</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs leading-relaxed print:bg-transparent">
        <strong>Instructions:</strong> Read each question carefully. Write your answers clearly in the spaces provided or shade the correct response box.
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id || idx} className="space-y-2 border-b border-slate-200 pb-4 break-inside-avoid">
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-sm">
                Question {idx + 1} ({q.formatLabel})
              </span>
              <span className="text-xs text-slate-500 font-mono">[{q.potValue} Marks]</span>
            </div>
            <p className="text-xs text-slate-800 font-medium leading-normal">{q.prompt}</p>

            {q.options && q.options.length > 0 && (
              <div className="grid grid-cols-2 gap-2 pt-1 pl-2">
                {q.options.map((opt, oIdx) => (
                  <div key={oIdx} className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded border border-slate-400 flex items-center justify-center font-mono text-[10px] font-bold">
                      {String.fromCharCode(65 + oIdx)}
                    </div>
                    <span>
                      {typeof opt === 'object' && opt !== null
                        ? (opt as any).left && (opt as any).right
                          ? `${(opt as any).left} ➔ ${(opt as any).right}`
                          : (opt as any).text || Object.values(opt).join(' ➔ ')
                        : String(opt ?? '')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

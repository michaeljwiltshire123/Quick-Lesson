import React from 'react';
import { SummativeQuizQuestion } from '../../summative_quiz/typesSummativeQuiz';

interface Props {
  questions: SummativeQuizQuestion[];
}

export const CognitiveRigorCard: React.FC<Props> = ({ questions }) => {
  const evaluateRigor = (q: SummativeQuizQuestion) => {
    const text = (q.prompt + ' ' + q.explanation).toLowerCase();
    if (text.includes('why') || text.includes('analyse') || text.includes('compare') || text.includes('evaluate')) {
      return 'Higher Order (Analyse/Evaluate)';
    }
    if (text.includes('how') || text.includes('apply') || text.includes('calculate') || text.includes('approach')) {
      return 'Application & Reasoning';
    }
    return 'Core Understanding & Recall';
  };

  const counts = questions.reduce<Record<string, number>>((acc, q) => {
    const level = evaluateRigor(q);
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});

  const total = Math.max(1, questions.length);

  return (
    <div className="bg-[#1E1C1A] text-white p-4 rounded-2xl border border-white/10 space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Cognitive Depth & Bloom's Taxonomy
        </span>
        <span className="text-[10px] text-gray-400 font-mono">{questions.length} Items Evaluated</span>
      </div>

      <div className="space-y-2">
        {Object.entries({
          'Higher Order (Analyse/Evaluate)': { color: 'bg-emerald-500', bar: 'bg-emerald-500/20' },
          'Application & Reasoning': { color: 'bg-amber-500', bar: 'bg-amber-500/20' },
          'Core Understanding & Recall': { color: 'bg-blue-500', bar: 'bg-blue-500/20' },
        }).map(([label, styles]) => {
          const count = counts[label] || 0;
          const pct = Math.round((count / total) * 100);
          return (
            <div key={label} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300 font-medium">{label}</span>
                <span className="font-mono text-gray-400">{count} ({pct}%)</span>
              </div>
              <div className={`h-2 rounded-full ${styles.bar} overflow-hidden`}>
                <div className={`h-full ${styles.color} transition-all duration-500`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

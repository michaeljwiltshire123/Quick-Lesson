import React from 'react';
import { Zap, Flame, AlertTriangle, Crosshair } from 'lucide-react';

export const CompetitiveSpeedAccuracyDeepDive: React.FC = () => {
  const quadrants = [
    { title: 'Quadrant 1: Fast & Accurate (Fluency Mastery)', count: 14, percent: 52, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { title: 'Quadrant 2: Slow & Accurate (Confidence Lag)', count: 6, percent: 22, color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
    { title: 'Quadrant 3: Fast & Inaccurate (Careless Guessers)', count: 5, percent: 19, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { title: 'Quadrant 4: Slow & Inaccurate (Critical Gaps)', count: 2, percent: 7, color: 'text-rose-700 bg-rose-50 border-rose-200' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-black uppercase text-[#2D2A26] flex items-center gap-1.5">
            <Crosshair className="w-4 h-4 text-rose-600" />
            Speed-Accuracy Tradeoff Matrix &amp; Streak Analysis
          </h4>
          <p className="text-[11px] text-gray-500">Separating impulsive button-mashing from authentic cognitive automaticity</p>
        </div>
        <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
          Fluency Matrix
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quadrants.map((q, idx) => (
          <div key={idx} className={`p-3.5 rounded-2xl border ${q.color} space-y-1 shadow-2xs`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black">{q.title}</span>
              <span className="text-xs font-black font-mono">{q.count} pupils ({q.percent}%)</span>
            </div>
            <p className="text-[11px] opacity-80 leading-snug">
              {idx === 0 ? 'Pupils have achieved deep cognitive automaticity.' :
               idx === 1 ? 'Pupils possess correct understanding but lack speed confidence.' :
               idx === 2 ? 'Impulsive guessing under timed pressure. Requires accuracy penalty conditioning.' :
               'Pupils lack both vocabulary familiarity and speed. Priority Table 1 intervention.'}
            </p>
          </div>
        ))}
      </div>

      <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-2xl text-xs text-rose-950 space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-black uppercase text-[10px] text-rose-900 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-rose-600" /> Round 4 Class Streak-Buster Autopsy
          </span>
          <span className="font-bold text-[10px] text-rose-700">8-Streak Broken</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          Question 4 (&ldquo;Which enzyme is active at pH 2 in the stomach?&rdquo;) shattered the class streak. 64% of fast guessers rushed to press <span className="font-bold">Amylase</span> within 1.5 seconds instead of <span className="font-bold text-emerald-800">Pepsin</span>. Emphasise reading stomach acid clues in your next starter.
        </p>
      </div>
    </div>
  );
};

import React from 'react';
import { Target, Layers, HelpCircle, CheckCircle2 } from 'lucide-react';

export const PlainQuizDeepDive: React.FC = () => {
  const distractorTraps = [
    {
      q: 'Which process requires ATP energy to transport molecules against a concentration gradient?',
      correct: 'Active Transport (48% of class)',
      trap: 'Osmosis (36% picked this misconception)',
      rationale: 'Pupils correctly remembered gradient movement, but forgot that osmosis is strictly water down a gradient without ATP.',
    },
    {
      q: 'Identify the organelle responsible for aerobic cellular respiration.',
      correct: 'Mitochondria (82% of class)',
      trap: 'Ribosome (11% picked this distractor)',
      rationale: 'Secure retention of energy organelle; minor vocabulary confusion with protein synthesis.',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-black uppercase text-[#2D2A26] flex items-center gap-1.5">
            <Target className="w-4 h-4 text-emerald-600" />
            Distractor Analysis &amp; Diagnostic Trap Breakdown
          </h4>
          <p className="text-[11px] text-gray-500">Unpacking specific wrong answers to diagnose cognitive misconceptions</p>
        </div>
        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
          Psychometric Analysis
        </span>
      </div>

      <div className="space-y-3">
        {distractorTraps.map((item, idx) => (
          <div key={idx} className="p-3.5 bg-white rounded-2xl border border-[#2D2A26]/15 space-y-2 shadow-2xs">
            <span className="text-xs font-bold text-[#2D2A26] block leading-snug">{item.q}</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-medium">
                <span className="text-[10px] font-bold text-emerald-700 block uppercase">Correct Response</span>
                {item.correct}
              </div>
              <div className="p-2 bg-rose-50 rounded-xl border border-rose-200 text-rose-950 font-medium">
                <span className="text-[10px] font-bold text-rose-700 block uppercase">Primary Misconception Distractor</span>
                {item.trap}
              </div>
            </div>
            <p className="text-[11px] text-gray-600 italic bg-gray-50 p-2 rounded-xl border border-gray-200/80">
              <span className="font-bold text-[#2D2A26] not-italic">Diagnostic Cause: </span>
              {item.rationale}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

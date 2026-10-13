import React from 'react';
import { Users, CheckCircle2 } from 'lucide-react';

export interface MockPupil {
  name: string;
  avatar: string;
  submitted: boolean;
  sampleAns: string;
}

interface Props {
  pupils: MockPupil[];
}

export const ProjectorSubmissionTracker: React.FC<Props> = ({ pupils }) => {
  const submittedCount = pupils.filter((p) => p.submitted).length;

  return (
    <div className="bg-slate-800/80 rounded-2xl p-3 border border-white/10 space-y-2">
      <div className="flex items-center justify-between text-xs font-bold text-white/80">
        <span className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-amber-400" /> Live Submissions
        </span>
        <span className="font-mono text-amber-300">
          {submittedCount} / {pupils.length} Submitted
        </span>
      </div>

      <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
        <div
          className="bg-emerald-500 h-full transition-all duration-300"
          style={{ width: `${(submittedCount / pupils.length) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
        {pupils.map((p) => (
          <div
            key={p.name}
            className={`p-2 rounded-xl text-center border transition-all ${
              p.submitted
                ? 'bg-emerald-950/40 border-emerald-500/40 text-white'
                : 'bg-slate-900 border-white/10 text-white/50'
            }`}
          >
            <span className="text-lg block mb-0.5">{p.avatar}</span>
            <span className="text-[10px] font-bold block truncate">{p.name}</span>
            <span className="text-[9px] flex items-center justify-center gap-0.5 mt-0.5 font-medium">
              {p.submitted ? (
                <span className="text-emerald-400 flex items-center gap-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Done
                </span>
              ) : (
                <span>Thinking...</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';

interface Props {
  choices: string[];
  mode: 'helper' | 'voter';
}

export const LadderStudentDeviceVoter: React.FC<Props> = ({ choices, mode }) => {
  const [submitted, setSubmitted] = useState<number | null>(null);

  if (submitted !== null) {
    return (
      <div className="space-y-2 text-center p-3 animate-in zoom-in-95 font-sans">
        <span className="text-xs font-extrabold text-emerald-400">✓ Selection Lock</span>
        <p className="text-[10px] text-gray-300 leading-relaxed">
          {mode === 'helper' 
            ? `Your recommendation for Option ${['A', 'B', 'C', 'D'][submitted]} has been successfully shared with the climber!` 
            : `Your opinion vote for Option ${['A', 'B', 'C', 'D'][submitted]} has been added to the audience total!`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 text-center p-1 font-sans">
      <span className="font-black text-[10px] text-blue-400 uppercase tracking-wider block">
        {mode === 'helper' ? 'Peer Expert Helper Screen 🤝' : 'Classroom Voter Screen 👥'}
      </span>
      <p className="text-[10px] text-gray-300 leading-normal mb-1.5">
        {mode === 'helper' 
          ? 'Choose an option to advise your climber peer on their screen!' 
          : 'Submit your opinion choice to help the active climber!'}
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {choices.map((choice, idx) => (
          <button key={idx} onClick={() => setSubmitted(idx)}
            className="p-1.5 bg-white/5 border border-white/5 hover:bg-white/10 rounded-lg text-[9px] font-bold text-left truncate cursor-pointer transition-colors">
            <span className="text-amber-400 font-mono text-[8px] mr-1">Opt {['A', 'B', 'C', 'D'][idx]}.</span>
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};
export default LadderStudentDeviceVoter;

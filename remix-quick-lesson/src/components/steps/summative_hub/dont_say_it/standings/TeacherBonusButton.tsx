import React, { useState } from 'react';
import { Award, Check } from 'lucide-react';
import { playSuccessFanfare } from '../utils/dontSayItSoundEffects';

interface Props {
  activeTeamName: string;
  onAwardBonus: (pts: number, reason: string) => void;
}

export const TeacherBonusButton: React.FC<Props> = ({ activeTeamName, onAwardBonus }) => {
  const [awarded, setAwarded] = useState(false);

  const handleClick = () => {
    if (awarded) return;
    setAwarded(true);
    playSuccessFanfare();
    onAwardBonus(50, 'Teacher Vocabulary Commendation');
  };

  return (
    <div className="flex items-center justify-between p-3 bg-indigo-950/60 border border-indigo-500/40 rounded-2xl">
      <div className="text-left">
        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300 block">
          Teacher Discretionary Commendation
        </span>
        <span className="text-xs text-indigo-100">
          Award bonus points to {activeTeamName} for precise scientific terminology.
        </span>
      </div>

      <button
        type="button"
        onClick={handleClick}
        disabled={awarded}
        className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
          awarded
            ? 'bg-emerald-600 text-white cursor-default'
            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md active:scale-95'
        }`}
      >
        {awarded ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>+50 Awarded</span>
          </>
        ) : (
          <>
            <Award className="w-3.5 h-3.5" />
            <span>+50 Pts Vocabulary Bonus</span>
          </>
        )}
      </button>
    </div>
  );
};

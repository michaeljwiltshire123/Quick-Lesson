import React from 'react';
import { TeamColor } from '../types/gridlockTypes';
import { Smartphone } from 'lucide-react';
import { StreakMultiplierBadge } from '../student_view/StreakMultiplierBadge';

interface Props {
  activeTeam: TeamColor;
  streakCount: number;
  onSwitchTeam: (team: TeamColor) => void;
}

export const TeamInputPhoneHeader: React.FC<Props> = ({
  activeTeam,
  streakCount,
  onSwitchTeam,
}) => {
  const isRed = activeTeam === 'red';

  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
      <div className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-400">
        <Smartphone className="w-4 h-4" /> Team Mobile Device
      </div>
      <div className="flex items-center gap-2">
        <StreakMultiplierBadge streak={streakCount} />
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onSwitchTeam('red')}
            className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase cursor-pointer ${
              isRed ? 'bg-red-600 text-white' : 'bg-white/10 text-gray-400'
            }`}
          >
            Red
          </button>
          <button
            type="button"
            onClick={() => onSwitchTeam('blue')}
            className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase cursor-pointer ${
              !isRed ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-400'
            }`}
          >
            Blue
          </button>
        </div>
      </div>
    </div>
  );
};

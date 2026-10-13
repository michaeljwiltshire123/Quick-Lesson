import React from 'react';
import { Mic, ShieldAlert, Scale, Ear, Users } from 'lucide-react';

export type PreviewRoleOption = 'clue_giver' | 'guesser' | 'saboteur' | 'opposing_judge' | 'guessing_judge' | 'spectator';

interface Props {
  activeRole: PreviewRoleOption;
  onChangeRole: (role: PreviewRoleOption) => void;
}

const ROLES: { id: PreviewRoleOption; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'opposing_judge', label: '⚖️ Opposing Judge (START GAME)', icon: Scale },
  { id: 'clue_giver', label: '🎤 Clue-Giver (Active)', icon: Mic },
  { id: 'saboteur', label: '🛡️ Saboteur (Write Words)', icon: ShieldAlert },
  { id: 'guessing_judge', label: '👂 Guess Judge (Heard Word)', icon: Ear },
  { id: 'spectator', label: '👥 Spectator (Reactions)', icon: Users },
];

export const DeviceRoleSwitcher: React.FC<Props> = ({ activeRole, onChangeRole }) => {
  return (
    <div className="space-y-1.5">
      <div className="text-[10px] font-black uppercase tracking-wider text-gray-600 flex items-center justify-between">
        <span>Preview Student Phone As:</span>
        <span className="text-amber-600 font-bold">Interactive Live Feed</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {ROLES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChangeRole(id)}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
              activeRole === id
                ? 'bg-[#2D2A26] text-white border-black shadow-sm ring-2 ring-amber-400 font-black'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

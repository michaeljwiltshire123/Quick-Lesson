import React from 'react';
import { TeamConfig, TeamColorKey } from '../types/dontSayItTypes';

export const AVAILABLE_COLORS: { key: TeamColorKey; label: string; bg: string }[] = [
  { key: 'red', label: 'Red', bg: 'bg-red-500' },
  { key: 'blue', label: 'Blue', bg: 'bg-blue-500' },
  { key: 'emerald', label: 'Emerald', bg: 'bg-emerald-500' },
  { key: 'amber', label: 'Amber', bg: 'bg-amber-500' },
  { key: 'purple', label: 'Purple', bg: 'bg-purple-500' },
];

interface Props {
  teams: TeamConfig[];
  onUpdateTeamName: (idx: number, name: string) => void;
}

export const TeamListInputs: React.FC<Props> = ({ teams, onUpdateTeamName }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      {teams.map((t, i) => (
        <div key={t.id || i} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#2D2A26]/10 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-600 uppercase">
            <span>Team {i + 1}</span>
            <span className={`w-3 h-3 rounded-full ${AVAILABLE_COLORS.find((c) => c.key === t.color)?.bg || 'bg-amber-500'}`} />
          </div>
          <input
            type="text"
            value={t.name}
            onChange={(e) => onUpdateTeamName(i, e.target.value)}
            className="w-full px-2.5 py-1.5 bg-white border border-[#2D2A26]/15 rounded-lg text-xs font-bold focus:ring-1 focus:ring-black focus:outline-hidden"
            placeholder={`Team ${i + 1} Name`}
          />
        </div>
      ))}
    </div>
  );
};

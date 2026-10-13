import React from 'react';
import { DontSayItRoomConfig } from '../types/dontSayItTypes';
import { TeamListInputs, AVAILABLE_COLORS } from './TeamListInputs';
import { DontSayItMatchParamGrid } from './DontSayItMatchParamGrid';
import { Users } from 'lucide-react';

interface Props {
  config: DontSayItRoomConfig;
  onChangeConfig: (updated: DontSayItRoomConfig) => void;
}

export const DontSayItConfigControls: React.FC<Props> = ({ config, onChangeConfig }) => {
  const handleTeamCountChange = (count: number) => {
    const teams = Array.from({ length: count }, (_, i) => ({
      id: `team-${i + 1}`,
      name: config.teams[i]?.name || `Team ${String.fromCharCode(65 + i)}`,
      color: AVAILABLE_COLORS[i % AVAILABLE_COLORS.length].key,
      score: 0,
    }));
    onChangeConfig({ ...config, teamCount: count, teams });
  };

  const updateTeamName = (idx: number, name: string) => {
    const updated = [...config.teams];
    if (updated[idx]) {
      updated[idx] = { ...updated[idx], name };
      onChangeConfig({ ...config, teams: updated });
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#2D2A26]/15 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2D2A26]/10 pb-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-600" />
          <h4 className="text-xs font-black uppercase tracking-wider text-[#2D2A26]">Classroom Team Setup</h4>
        </div>
        <div className="flex items-center gap-1.5">
          {[2, 3, 4].map((count) => (
            <button
              key={`tc-${count}`}
              type="button"
              onClick={() => handleTeamCountChange(count)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                config.teamCount === count
                  ? 'bg-[#2D2A26] text-white border-black'
                  : 'bg-[#F8F6F0] text-[#2D2A26] border-[#2D2A26]/15 hover:bg-black/5'
              }`}
            >
              {count} Teams
            </button>
          ))}
        </div>
      </div>

      <TeamListInputs teams={config.teams} onUpdateTeamName={updateTeamName} />
      <DontSayItMatchParamGrid config={config} onChangeConfig={onChangeConfig} />
    </div>
  );
};

import React from 'react';
import { Users, RotateCw, Calculator, HelpCircle } from 'lucide-react';
import { ImposterRoomConfig } from '../types/imposterTypes';

interface Props {
  config: ImposterRoomConfig;
  onChange: (updated: Partial<ImposterRoomConfig>) => void;
}

export const ImposterGamePlanControls: React.FC<Props> = ({ config, onChange }) => {
  const estimatedPlayers = Math.max(3, config.estimatedPlayers || 6);
  const roundsPerGame = (config.roundsPerGame || 3) as 2 | 3 | 4 | 5;
  const targetGames = config.targetGamesCount || 3;
  // 1 question per round for the entire room. Target games = roundsPerGame * targetGames + buffer
  const questionsNeeded = roundsPerGame * targetGames;
  const recommendedPool = Math.max(8, questionsNeeded + Math.ceil(questionsNeeded * 0.5));

  return (
    <div id="imposter-game-plan-controls" className="space-y-3.5 bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/70">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Calculator className="w-4 h-4 text-amber-700" />
          <span className="text-xs font-black text-[#2D2A26] uppercase tracking-wide">
            Game Capacity Planning
          </span>
        </div>
        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
          Target: {targetGames} Consecutive Games
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="flex items-center gap-1 text-[11px] font-bold text-[#2D2A26] mb-1">
            <Users className="w-3 h-3 text-amber-600" />
            Connected Pupils
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={3}
              max={35}
              value={estimatedPlayers}
              onChange={(e) => {
                const val = Math.max(3, Math.min(35, parseInt(e.target.value, 10) || 6));
                onChange({ estimatedPlayers: val });
              }}
              className="w-20 px-3 py-1.5 bg-white border border-[#2D2A26]/20 rounded-xl text-xs font-bold text-[#2D2A26] focus:ring-1 focus:ring-amber-500 focus:outline-none"
            />
            <span className="text-[10px] text-[#2D2A26]/60">all answer same prompt</span>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1 text-[11px] font-bold text-[#2D2A26] mb-1">
            <RotateCw className="w-3 h-3 text-amber-600" />
            Rounds per Game
          </label>
          <div className="grid grid-cols-4 gap-1">
            {([2, 3, 4, 5] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => onChange({ roundsPerGame: r })}
                className={`py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  roundsPerGame === r
                    ? 'bg-amber-600 text-white border-amber-700 shadow-2xs'
                    : 'bg-white text-[#2D2A26]/80 border-[#2D2A26]/15 hover:border-amber-400'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-2.5 bg-white rounded-xl border border-amber-200/80 flex items-center justify-between text-xs">
        <div>
          <span className="font-bold text-[#2D2A26] block">
            {targetGames} Games × {roundsPerGame} Rounds = {questionsNeeded} Live Prompts
          </span>
          <span className="text-[10px] text-[#2D2A26]/60 flex items-center gap-1 mt-0.5">
            <HelpCircle className="w-3 h-3 text-amber-600" />
            All {estimatedPlayers} pupils answer simultaneously. +50% reserve for skips.
          </span>
        </div>
        <div className="text-right flex-shrink-0 ml-2">
          <span className="text-[10px] uppercase font-bold text-amber-800 block">Recommended Pool</span>
          <span className="text-sm font-black font-mono text-amber-600">{recommendedPool} Questions</span>
        </div>
      </div>
    </div>
  );
};

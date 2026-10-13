import React from 'react';
import { LadderSkin } from '../typesLadder';
import { ClimberProgress } from './typesLiveLadder';
import { Trophy, Shield, Award } from 'lucide-react';

interface Props {
  climbers: ClimberProgress[];
  totalRungs: number;
  skin: LadderSkin;
  currentRung: number;
}

export const LadderClimberLeaderboard: React.FC<Props> = ({ climbers, totalRungs, skin, currentRung }) => {
  const skinTitle = skin === 'film_tower' ? '🎬 Film Tower' : skin === 'lab_rack' ? '🔬 Lab Rack' : '🏛️ Temple Steps';

  return (
    <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#2D2A26]/10">
        <h4 className="text-xs font-bold text-[#2D2A26] uppercase flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-500" /> Live Ascension Track ({skinTitle})
        </h4>
        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-xl border border-amber-200">
          Target Rung: {currentRung} / {totalRungs}
        </span>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {climbers.map((climber) => (
          <div
            key={climber.id}
            className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
              climber.status === 'eliminated'
                ? 'bg-rose-50/40 border-rose-200 opacity-60'
                : climber.status === 'banked'
                ? 'bg-emerald-50/60 border-emerald-300'
                : 'bg-[#F8F6F0] border-[#2D2A26]/15'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-lg">{climber.avatar}</span>
              <div>
                <div className="text-xs font-bold text-[#2D2A26]">{climber.name}</div>
                <div className="text-[10px] text-[#2D2A26]/70 flex items-center gap-1">
                  <span>Score: {climber.score.toLocaleString()} pts</span>
                  {climber.shieldActive && (
                    <span className="flex items-center gap-0.5 text-emerald-700 font-bold bg-emerald-50 px-1 rounded">
                      <Shield className="w-2.5 h-2.5" /> Shield
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-lg text-xs font-extrabold ${
                climber.status === 'eliminated' ? 'bg-rose-200 text-rose-900' : 'bg-[#2D2A26] text-white'
              }`}>
                Rung {climber.currentRung}
              </span>
              {climber.status === 'banked' && (
                <span title="Banked Summit">
                  <Award className="w-4 h-4 text-emerald-600" />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

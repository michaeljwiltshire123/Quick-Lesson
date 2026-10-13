import React from 'react';
import { BarChart3, Users, Clock, Award } from 'lucide-react';
import { LadderRungQuestion } from '../typesLadder';
import { LadderMasteryHeatmapCard } from './LadderMasteryHeatmapCard';
import { LadderReteachCoachCard } from './LadderReteachCoachCard';

interface Props {
  rungs: LadderRungQuestion[];
}

export const LadderAnalyticsDashboard: React.FC<Props> = ({ rungs }) => {
  return (
    <div className="space-y-4">
      {/* Stats header bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block uppercase font-bold">Class Average Rung</span>
            <span className="text-sm font-black text-[#2D2A26]">Rung Stage 6.2</span>
          </div>
        </div>

        <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block uppercase font-bold">Average Step Time</span>
            <span className="text-sm font-black text-[#2D2A26]">14.5 seconds</span>
          </div>
        </div>

        <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center">
            <Award className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block uppercase font-bold">Accuracy rate</span>
            <span className="text-sm font-black text-[#2D2A26]">68% correct</span>
          </div>
        </div>
      </div>

      {/* Mastery Heatmap and AI Coach cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LadderMasteryHeatmapCard rungs={rungs} />
        <LadderReteachCoachCard rungs={rungs} />
      </div>
    </div>
  );
};

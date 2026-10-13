import React from 'react';
import { VolumeX, ShieldAlert, Award, Clock } from 'lucide-react';

export const DontSayItOralFluencyDeepDive: React.FC = () => {
  const traps = [
    { target: 'Mitochondria', blurted: 'Powerhouse (3 fouls blurted)', penalty: '-3 pts', cause: 'Relying on elementary school cliché instead of describing respiration' },
    { target: 'Photosynthesis', blurted: 'Sunlight (2 fouls blurted)', penalty: '-2 pts', cause: 'Defaulting to basic inputs rather than describing light energy conversion' },
    { target: 'Diffusion', blurted: 'High to low (2 fouls blurted)', penalty: '-2 pts', cause: 'Pupils recited phrase by rote without explaining molecular movement' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-black uppercase text-[#2D2A26] flex items-center gap-1.5">
            <VolumeX className="w-4 h-4 text-purple-600" />
            Oral Expressive Fluency &amp; Forbidden Word Slip-Up Traps
          </h4>
          <p className="text-[11px] text-gray-500">Diagnosing pupils who rely on memorised slogans rather than authentic explanation</p>
        </div>
        <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
          Oral Fluency Metrics
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-white rounded-2xl border border-[#2D2A26]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">Total Forbidden Word Fouls</span>
          <span className="text-xl font-black text-rose-600 font-mono">7 Slip-Ups</span>
          <span className="text-[10px] text-gray-500 block mt-0.5">Cliché dependence</span>
        </div>
        <div className="p-3 bg-white rounded-2xl border border-[#2D2A26]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">Avg Explanation Velocity</span>
          <span className="text-xl font-black text-[#2D2A26] font-mono">18.4s / Card</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Fluent synonym retrieval</span>
        </div>
        <div className="p-3 bg-white rounded-2xl border border-[#2D2A26]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">Oral Clue Success Rate</span>
          <span className="text-xl font-black text-purple-600 font-mono">82% Guessed</span>
          <span className="text-[10px] text-gray-500 block mt-0.5">Strong peer communication</span>
        </div>
      </div>

      <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#2D2A26]/15 space-y-2.5">
        <span className="text-xs font-black uppercase text-[#2D2A26] block">Forbidden Word Foul Autopsy</span>
        <div className="space-y-1.5">
          {traps.map((t, idx) => (
            <div key={idx} className="p-2.5 bg-white rounded-xl border border-[#2D2A26]/10 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-[#2D2A26] block">{t.target}</span>
                <span className="text-[10px] text-rose-600 block">Blurted: {t.blurted}</span>
                <span className="text-[10px] text-gray-500 italic block">{t.cause}</span>
              </div>
              <span className="text-[10px] font-black text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-lg">
                {t.penalty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

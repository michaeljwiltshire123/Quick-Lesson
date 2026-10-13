import React from 'react';
import { AlertOctagon, Flame } from 'lucide-react';

export interface TabooHotspot {
  word: string;
  targetConcept: string;
  stumbleCount: number;
  misconceptionType: string;
}

interface Props {
  hotspots?: TabooHotspot[];
}

const DEFAULT_HOTSPOTS: TabooHotspot[] = [
  { word: 'Glucose', targetConcept: 'Respiration', stumbleCount: 7, misconceptionType: 'Equating reactant with total cellular energy' },
  { word: 'Breathing', targetConcept: 'Cellular Respiration', stumbleCount: 5, misconceptionType: 'Confusing mechanical lungs with chemical cellular oxidation' },
  { word: 'Sunlight', targetConcept: 'Photosynthesis', stumbleCount: 4, misconceptionType: 'Calling light energy a physical chemical reactant' },
];

export const ForbiddenWordHotspotsCard: React.FC<Props> = ({ hotspots = DEFAULT_HOTSPOTS }) => {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-rose-600" />
          <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
            Forbidden Word Stumble Hotspots
          </h4>
        </div>
        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
          Misconception Isolation
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {hotspots.map((hs, i) => (
          <div key={i} className="p-2.5 bg-rose-50/60 border border-rose-200 rounded-xl flex items-start justify-between gap-3">
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-1.5 font-black text-rose-950">
                <AlertOctagon className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span className="truncate">Forbidden Word: "{hs.word}"</span>
                <span className="text-[10px] font-normal text-slate-500">(Target: {hs.targetConcept})</span>
              </div>
              <p className="text-[11px] text-rose-900 font-medium pl-5">{hs.misconceptionType}</p>
            </div>
            <span className="px-2 py-1 bg-rose-600 text-white font-black text-[10px] rounded-lg shrink-0">
              {hs.stumbleCount} Fouls
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

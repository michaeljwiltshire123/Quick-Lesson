import React from 'react';
import { Clock, Plus, Minus, Layers } from 'lucide-react';

interface Props {
  totalRounds: number;
  speedLimitSeconds: number;
  onChangeCount: (newCount: number) => void;
}

const PRESETS = [
  { count: 4, label: '4 Qs', mins: '~3m' },
  { count: 6, label: '6 Qs', mins: '~5m' },
  { count: 8, label: '8 Qs', mins: '~8m' },
  { count: 10, label: '10 Qs', mins: '~10m' },
  { count: 12, label: '12 Qs', mins: '~15m' },
  { count: 15, label: '15 Qs', mins: '~20m' },
];

export const MatchDurationStepperCard: React.FC<Props> = ({
  totalRounds,
  speedLimitSeconds,
  onChangeCount,
}) => {
  const estimatedMins = Math.max(2, Math.ceil((totalRounds * (speedLimitSeconds + 15)) / 60));

  return (
    <div className="bg-white p-4 rounded-2xl border border-[#2D2A26]/15 shadow-xs space-y-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          <h4 className="font-black uppercase tracking-wider text-[#2D2A26]">
            Match Duration & Question Count
          </h4>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Estimated Arena Run Time: <strong>~{estimatedMins} mins</strong></span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Stepper */}
        <div className="flex items-center gap-2 bg-slate-50 border border-gray-200 p-1.5 rounded-xl">
          <button
            type="button"
            disabled={totalRounds <= 3}
            onClick={() => onChangeCount(Math.max(3, totalRounds - 1))}
            className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-40 flex items-center justify-center font-black text-gray-700 cursor-pointer shadow-xs"
            title="Remove 1 question"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="px-3 text-center">
            <span className="text-sm font-black text-[#2D2A26] block leading-none font-mono">
              {totalRounds}
            </span>
            <span className="text-[10px] text-gray-500 font-bold uppercase">Questions</span>
          </div>
          <button
            type="button"
            disabled={totalRounds >= 20}
            onClick={() => onChangeCount(Math.min(20, totalRounds + 1))}
            className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-40 flex items-center justify-center font-black text-gray-700 cursor-pointer shadow-xs"
            title="Add 1 question"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase mr-1 flex items-center gap-1">
            <Layers className="w-3 h-3" /> Presets:
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.count}
              type="button"
              onClick={() => onChangeCount(p.count)}
              className={`px-2.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${
                totalRounds === p.count
                  ? 'bg-[#2D2A26] text-white border-[#2D2A26] shadow-xs'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span>{p.label}</span>
              <span className="text-[10px] opacity-70 ml-1">({p.mins})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

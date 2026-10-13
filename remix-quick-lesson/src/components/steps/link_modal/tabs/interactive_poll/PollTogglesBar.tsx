import React from 'react';
import { Clock, EyeOff, UserX, BarChart2 } from 'lucide-react';
import { PollFormState } from './types';

interface Props {
  formState: PollFormState;
  onChange: (patch: Partial<PollFormState>) => void;
}

const TIMERS: { label: string; value: number | null }[] = [
  { label: 'None', value: null },
  { label: '15s', value: 15 },
  { label: '30s', value: 30 },
  { label: '60s', value: 60 },
];

export const PollTogglesBar: React.FC<Props> = ({ formState, onChange }) => (
  <div className="pt-2 border-t border-[#2D2A26]/10 space-y-2">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="text-[11px] font-bold text-[#2D2A26]/70 flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-amber-600" /> Response Timer
      </span>
      <div className="flex items-center gap-1">
        {TIMERS.map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={() => onChange({ timerSeconds: t.value })}
            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border cursor-pointer ${
              formState.timerSeconds === t.value
                ? 'bg-amber-500 text-white border-amber-600'
                : 'bg-[#F8F6F0] text-[#2D2A26]/70 border-[#2D2A26]/15'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <label className="flex items-center gap-2 text-xs font-semibold text-[#2D2A26] bg-[#F8F6F0]/70 p-2 rounded-lg border border-[#2D2A26]/10 cursor-pointer">
        <input type="checkbox" checked={formState.isAnonymous} onChange={(e) => onChange({ isAnonymous: e.target.checked })} className="accent-amber-500 rounded" />
        <UserX className="w-3.5 h-3.5 text-amber-600" />
        <span className="truncate">Anonymous</span>
      </label>
      <label className="flex items-center gap-2 text-xs font-semibold text-[#2D2A26] bg-[#F8F6F0]/70 p-2 rounded-lg border border-[#2D2A26]/10 cursor-pointer">
        <input type="checkbox" checked={formState.isBlindVoting} onChange={(e) => onChange({ isBlindVoting: e.target.checked })} className="accent-amber-500 rounded" />
        <EyeOff className="w-3.5 h-3.5 text-amber-600" />
        <span className="truncate">Blind Voting</span>
      </label>
      <label className="flex items-center gap-2 text-xs font-semibold text-[#2D2A26] bg-[#F8F6F0]/70 p-2 rounded-lg border border-[#2D2A26]/10 cursor-pointer">
        <input type="checkbox" checked={formState.enableConfidenceMeter} onChange={(e) => onChange({ enableConfidenceMeter: e.target.checked })} className="accent-amber-500 rounded" />
        <BarChart2 className="w-3.5 h-3.5 text-amber-600" />
        <span className="truncate">Confidence</span>
      </label>
    </div>
  </div>
);

import React from 'react';
import { AlertTriangle, CheckCircle2, SkipForward, ShieldAlert } from 'lucide-react';

interface Props {
  foulCount: number;
  successCount: number;
  skipCount: number;
}

export const FoulCounterCard: React.FC<Props> = ({ foulCount, successCount, skipCount }) => {
  return (
    <div className="grid grid-cols-3 gap-2.5 p-3 bg-slate-900 border border-slate-800 rounded-2xl text-white">
      <div className="p-2.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-center">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
        <span className="block text-[10px] font-bold text-emerald-300 uppercase">Successful</span>
        <span className="text-lg font-black text-white">{successCount}</span>
      </div>

      <div className="p-2.5 bg-rose-950/60 border border-rose-500/40 rounded-xl text-center">
        <AlertTriangle className="w-4 h-4 text-rose-400 mx-auto mb-1 animate-pulse" />
        <span className="block text-[10px] font-bold text-rose-300 uppercase">Taboo Fouls</span>
        <span className="text-lg font-black text-rose-200">{foulCount}</span>
      </div>

      <div className="p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-center">
        <SkipForward className="w-4 h-4 text-gray-400 mx-auto mb-1" />
        <span className="block text-[10px] font-bold text-gray-400 uppercase">Skipped</span>
        <span className="text-lg font-black text-gray-200">{skipCount}</span>
      </div>
    </div>
  );
};

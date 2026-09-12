import React from 'react';
import { AlertCircle, History } from 'lucide-react';
import { findMatchingTripletInHistory } from './lociVaultStorage';

interface Props {
  stations: string[];
}

export const LociTripletVaultGuard: React.FC<Props> = ({ stations }) => {
  const match = findMatchingTripletInHistory(stations);
  if (!match) return null;

  return (
    <div className="bg-amber-50/90 border border-amber-300/80 rounded-xl p-2.5 flex items-start gap-2 text-xs text-amber-900 animate-fadeIn">
      <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5 font-bold">
          <span>Sequence Overlap Detected</span>
          <span className="text-[10px] bg-amber-200/60 text-amber-900 px-1.5 py-0.2 rounded inline-flex items-center gap-0.5">
            <History className="w-2.5 h-2.5" /> {match.routeName}
          </span>
        </div>
        <p className="text-[11px] text-amber-800 leading-snug">
          The 3-station sequence <strong className="font-semibold text-amber-950">"{match.sequence}"</strong> was previously assigned in your library. Varying locations prevents proactive cognitive interference.
        </p>
      </div>
    </div>
  );
};

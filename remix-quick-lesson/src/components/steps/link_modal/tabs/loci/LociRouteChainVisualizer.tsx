import React from 'react';
import { ChevronRight, MapPin } from 'lucide-react';

interface Props {
  stations: string[];
}

export const LociRouteChainVisualizer: React.FC<Props> = ({ stations }) => {
  if (!stations || stations.length === 0) return null;

  return (
    <div className="bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl p-2.5 overflow-x-auto shadow-xs">
      <div className="flex items-center gap-1.5 min-w-max text-xs">
        <div className="flex items-center gap-1 text-[11px] font-bold text-[#D97706] uppercase tracking-wider mr-1">
          <MapPin className="w-3.5 h-3.5" /> Route Chain:
        </div>
        {stations.map((st, i) => {
          const isFilled = Boolean(st && st.trim());
          return (
            <React.Fragment key={i}>
              <div
                className={`px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-all border ${
                  isFilled
                    ? 'bg-white border-[#2D2A26]/15 text-[#2D2A26] shadow-2xs'
                    : 'bg-amber-50/70 border-dashed border-amber-300 text-amber-800'
                }`}
              >
                <span className="text-[10px] font-mono text-[#2D2A26]/40">{i + 1}.</span>
                <span>{isFilled ? st : 'Unassigned'}</span>
              </div>
              {i < stations.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-[#2D2A26]/30 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

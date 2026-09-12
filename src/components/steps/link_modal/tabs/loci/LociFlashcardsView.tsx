import React from 'react';
import { Scissors } from 'lucide-react';
import { LociScriptStationItem } from './types';

interface Props {
  stations: LociScriptStationItem[];
}

export const LociFlashcardsView: React.FC<Props> = ({ stations }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-[11px] text-[#2D2A26]/60">
      <span className="font-bold uppercase tracking-wider flex items-center gap-1">
        <Scissors className="w-3.5 h-3.5 text-[#D97706]" /> Double-Sided Flashcard Cut-Sheet (Exact Grid Alignment)
      </span>
      <span>Front: Station / Place | Back: Keyword Term</span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white border border-dashed border-[#2D2A26]/30 p-3 rounded-xl print:p-0 print:border-none">
      {stations.map((s, idx) => (
        <div key={s.term + idx} className="grid grid-cols-2 border-2 border-dashed border-[#2D2A26]/20 rounded-lg overflow-hidden bg-[#F8F6F0]/40 min-h-[100px]">
          {/* Card Front: Place / Station */}
          <div className="p-3 border-r border-dashed border-[#2D2A26]/20 flex flex-col justify-between bg-white text-center">
            <div className="text-[9px] font-bold text-[#2D2A26]/50 uppercase">Station {idx + 1}</div>
            <div className="text-sm font-black text-[#2D2A26] tracking-tight">{s.station}</div>
            <div className="text-[9px] text-[#2D2A26]/40 italic">Fold & Glue Back-to-Back</div>
          </div>
          {/* Card Back: Keyword Term */}
          <div className="p-3 flex flex-col justify-between bg-[#F8F6F0]/80 text-center">
            <div className="text-[9px] font-bold text-[#D97706] uppercase">Keyword</div>
            <div className="text-sm font-black text-[#D97706] uppercase tracking-wide">{s.term}</div>
            <div className="text-[9px] text-[#2D2A26]/40 italic">Memory Palace</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

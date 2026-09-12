import React from 'react';
import { Users2, CalendarClock } from 'lucide-react';

interface Props {
  peerTeachingPrompt?: string;
  spacedRetrievalSchedule?: string[];
}

export const LociReviewEnding: React.FC<Props> = ({ peerTeachingPrompt, spacedRetrievalSchedule }) => (
  <div className="bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl p-3 space-y-2 text-xs">
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 font-bold text-[#D97706] uppercase tracking-wide text-[11px]">
        <Users2 className="w-3.5 h-3.5" /> Peer-Teaching Hand-Off
      </div>
      <p className="text-[#2D2A26]/90 leading-snug">
        {peerTeachingPrompt || 'Close your eyes, turn to your partner, and guide them station-by-station through the palace.'}
      </p>
    </div>
    <div className="pt-1.5 border-t border-[#2D2A26]/10 space-y-1">
      <div className="flex items-center gap-1.5 font-bold text-[#2D2A26]/70 uppercase tracking-wide text-[10px]">
        <CalendarClock className="w-3.5 h-3.5 text-[#D97706]" /> Spaced Retrieval Schedule
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[11px]">
        {(spacedRetrievalSchedule || ['2 Days: Mental Walkthrough', '1 Week: Partner Recall Check', '1 Month: Palace Speed-Run']).map((s, i) => (
          <div key={i} className="bg-white border border-[#2D2A26]/10 px-2 py-1 rounded-md text-[#2D2A26] font-medium">
            {s}
          </div>
        ))}
      </div>
    </div>
  </div>
);

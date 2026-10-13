import React from 'react';

interface Props {
  enabled: boolean;
  onToggle: () => void;
}

export const LociRhythmCuesToggle: React.FC<Props> = ({ enabled, onToggle }) => (
  <div className="flex items-center justify-between bg-[#F8F6F0] p-2.5 rounded-lg border border-[#2D2A26]/10 text-xs">
    <div>
      <div className="font-bold text-[#2D2A26]">Classroom Delivery Rhythm Cues</div>
      <div className="text-[10px] text-[#2D2A26]/60">Adds rhythmic pause markers (/ /) for theatrical teacher pacing</div>
    </div>
    <button
      type="button"
      onClick={onToggle}
      className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${enabled ? 'bg-[#D97706] text-white shadow-2xs' : 'bg-white text-[#2D2A26] border border-[#2D2A26]/15'}`}
    >
      {enabled ? 'Enabled' : 'Disabled'}
    </button>
  </div>
);

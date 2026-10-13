import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { EscapeRoomConfig } from './typesEscape';

interface Props {
  config: EscapeRoomConfig;
  onChangeBrief: (brief: string) => void;
}

export const EscapeNarrativeBanner: React.FC<Props> = ({ config, onChangeBrief }) => (
  <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/60 rounded-2xl p-4 shadow-2xs space-y-2">
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
        <BookOpen className="w-4 h-4 text-[#D97706]" />
        <span>Immersive Scenario Narrative Brief</span>
      </div>
      <div className="flex items-center gap-1 text-[10px] font-bold text-[#D97706] bg-white px-2 py-0.5 rounded-full border border-amber-300/60">
        <Sparkles className="w-3 h-3 text-[#D97706]" />
        <span>4-Lock Challenge Arc</span>
      </div>
    </div>
    <textarea
      rows={2}
      value={config.narrativeBrief}
      onChange={(e) => onChangeBrief(e.target.value)}
      placeholder="Describe the high-stakes classroom scenario setting the mission..."
      className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300/60 bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-[#2D2A26] font-medium"
    />
  </div>
);

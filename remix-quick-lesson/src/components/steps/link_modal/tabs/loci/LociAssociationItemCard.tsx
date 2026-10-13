import React from 'react';
import { ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';
import { LociAssociationOption } from './types';
import { LociStationPickerRow } from './LociStationPickerRow';

interface Props {
  item: LociAssociationOption;
  index: number;
  total: number;
  stationSuggestions?: string[];
  onSelect: (term: string, val: string) => void;
  onCustom: (term: string, val: string) => void;
  onChangeStation: (term: string, val: string) => void;
  onToggleAnchor: (term: string, anchor: string) => void;
  onMoveUp: (idx: number) => void;
  onMoveDown: (idx: number) => void;
}

const SENSORY_BADGES = ['Loud Sound', 'Rough Texture', 'Fast Motion'];

export const LociAssociationItemCard: React.FC<Props> = ({
  item, index, total, stationSuggestions = [], onSelect, onCustom, onChangeStation, onToggleAnchor, onMoveUp, onMoveDown,
}) => {
  const isStationEmpty = !item.station.trim();

  return (
    <div className="bg-white border border-[#2D2A26]/15 rounded-xl p-3 space-y-2 relative shadow-2xs">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-1">
          <span className="text-xs font-mono font-bold text-[#2D2A26]/40">{index + 1}.</span>
          <span className="text-xs font-black text-[#D97706] uppercase tracking-wide">{item.term}</span>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" disabled={index === 0} onClick={() => onMoveUp(index)} className="p-1 rounded hover:bg-black/5 disabled:opacity-20 cursor-pointer">
            <ChevronUp className="w-3.5 h-3.5 text-[#2D2A26]" />
          </button>
          <button type="button" disabled={index === total - 1} onClick={() => onMoveDown(index)} className="p-1 rounded hover:bg-black/5 disabled:opacity-20 cursor-pointer">
            <ChevronDown className="w-3.5 h-3.5 text-[#2D2A26]" />
          </button>
        </div>
      </div>

      <LociStationPickerRow
        index={index}
        term={item.term}
        station={item.station}
        stationSuggestions={stationSuggestions}
        isStationEmpty={isStationEmpty}
        onChangeStation={onChangeStation}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {(item.options || []).map((opt) => (
          <button key={opt} type="button" onClick={() => onSelect(item.term, opt)} className={`p-2 rounded-lg text-left text-xs transition-all cursor-pointer leading-snug border ${item.selected === opt && !item.customText ? 'bg-[#D97706]/15 border-[#D97706] text-[#2D2A26] font-semibold' : 'bg-[#F8F6F0] border-[#2D2A26]/10 text-[#2D2A26]/80 hover:bg-black/5'}`}>
            <span className="[&_strong]:font-bold [&_strong]:text-[#D97706]">
              <Markdown>{opt}</Markdown>
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <input type="text" value={item.customText} onChange={(e) => onCustom(item.term, e.target.value)} placeholder="Or write custom interactive room imagery..." className="flex-1 bg-[#F8F6F0]/60 border border-[#2D2A26]/15 rounded-lg px-2.5 py-1 text-xs text-[#2D2A26]" />
        <div className="flex items-center gap-1 shrink-0">
          {SENSORY_BADGES.map((badge) => (
            <button key={badge} type="button" onClick={() => onToggleAnchor(item.term, badge)} className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-all border ${item.sensoryAnchor === badge ? 'bg-[#2D2A26] text-white border-[#2D2A26]' : 'bg-[#F8F6F0] text-[#2D2A26]/60 border-[#2D2A26]/10 hover:text-[#2D2A26]'}`}>
              <Sparkles className="w-2.5 h-2.5 inline mr-0.5" />{badge}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

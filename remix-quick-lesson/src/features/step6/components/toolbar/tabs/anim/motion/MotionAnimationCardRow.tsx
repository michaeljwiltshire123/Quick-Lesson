import React, { useState } from 'react';
import { MotionAnimationItem } from './motionPanelTypes';
import { getEffectLabel, getTriggerDisplay } from './motionAnimationHelpers';
import { MotionAnimationExpandedFields } from './MotionAnimationExpandedFields';
import { MiniTextThumbnail } from './MiniTextThumbnail';
import { useMotionPlayback } from '../../../../../hooks/useMotionPlayback';
import { ChevronDown, ChevronRight, ChevronUp, GripVertical, FileText, Image as ImageIcon } from 'lucide-react';

interface MotionAnimationCardRowProps {
  item: MotionAnimationItem;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (patch: Partial<MotionAnimationItem>) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onPlaySingle?: () => void;
}

export const MotionAnimationCardRow: React.FC<MotionAnimationCardRowProps> = ({
  item, isSelected, onSelect, onUpdate, onDelete, onMoveUp, onMoveDown,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { setHoveredElementId } = useMotionPlayback();
  const effectLabel = typeof item.effectId === 'string' && item.effectId ? getEffectLabel(item.effectId) : 'Animation';
  const displayLabel = `${effectLabel} (${getTriggerDisplay(item.trigger)})`;
  const snippetTooltip = item.rawContent ? `"${item.rawContent.slice(0, 60)}" — ${displayLabel}` : displayLabel;

  return (
    <div
      onMouseEnter={() => setHoveredElementId(item.elementId)}
      onMouseLeave={() => setHoveredElementId(null)}
      className={`border rounded-lg transition-all ${isSelected ? 'border-amber-400 bg-amber-50/40' : 'border-stone-200 bg-white'}`}
    >
      <div
        onClick={() => { onSelect(); setIsExpanded(!isExpanded); }}
        className="flex items-center justify-between p-2 cursor-pointer hover:bg-stone-50 select-none text-xs"
      >
        <div className="flex items-center gap-1.5 min-w-0" title={snippetTooltip}>
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-stone-500 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-stone-500 shrink-0" />}
          {item.thumbnailUrl ? (
            <img src={item.thumbnailUrl} alt="" className="w-4 h-4 object-cover rounded shrink-0 border border-stone-200" />
          ) : item.elementType === 'text' ? (
            <MiniTextThumbnail content={item.rawContent} />
          ) : (
            <span className="w-4 h-4 bg-stone-100 border border-stone-300 rounded flex items-center justify-center shrink-0">
              {item.elementType === 'image' ? <ImageIcon className="w-2.5 h-2.5 text-stone-500" /> : <FileText className="w-2.5 h-2.5 text-stone-500" />}
            </span>
          )}
          {item.roleBadge && (
            <span className="text-[8.5px] font-bold text-amber-900 bg-amber-100/90 border border-amber-300/80 px-1 py-0.2 rounded shrink-0">
              {item.roleBadge}
            </span>
          )}
          <span className="font-normal text-stone-800 truncate">{displayLabel}</span>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {onMoveUp && (
            <button
              type="button" onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
              className="p-0.5 text-stone-400 hover:text-stone-800 rounded hover:bg-stone-200 transition-colors cursor-pointer"
              title="Move up"
            >
              <ChevronUp className="w-3 h-3" />
            </button>
          )}
          {onMoveDown && (
            <button
              type="button" onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
              className="p-0.5 text-stone-400 hover:text-stone-800 rounded hover:bg-stone-200 transition-colors cursor-pointer"
              title="Move down"
            >
              <ChevronDown className="w-3 h-3" />
            </button>
          )}
          <GripVertical className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        </div>
      </div>

      {isExpanded && (
        <MotionAnimationExpandedFields
          item={item}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

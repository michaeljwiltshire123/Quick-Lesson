import React from 'react';
import { MotionAnimationItem, OBJECT_ANIMATION_OPTIONS } from './motionPanelTypes';
import { Trash2 } from 'lucide-react';

interface MotionAnimationExpandedFieldsProps {
  item: MotionAnimationItem;
  onUpdate: (patch: Partial<MotionAnimationItem>) => void;
  onDelete: () => void;
}

export const MotionAnimationExpandedFields: React.FC<MotionAnimationExpandedFieldsProps> = ({
  item, onUpdate, onDelete,
}) => {
  const duration = Math.max(0.1, Number(item.duration) || 0.8);

  return (
    <div className="p-3 pt-1 border-t border-stone-100 space-y-2.5 bg-stone-50/60 rounded-b-lg">
      <select
        value={item.effectId}
        onChange={(e) => {
          const nextId = e.target.value;
          let cat: 'entrance' | 'emphasis' | 'exit' = 'entrance';
          for (const g of OBJECT_ANIMATION_OPTIONS) {
            const found = g.items.find((i) => i.id === nextId);
            if (found) { cat = found.category; break; }
          }
          onUpdate({ effectId: nextId, category: cat });
        }}
        className="w-full bg-white border border-stone-300 rounded-md px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer shadow-2xs"
      >
        {OBJECT_ANIMATION_OPTIONS.map((group) => (
          <optgroup key={group.group} label={group.group}>
            {group.items.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </optgroup>
        ))}
      </select>

      <select
        value={item.trigger}
        onChange={(e) => onUpdate({ trigger: e.target.value as any })}
        className="w-full bg-white border border-stone-300 rounded-md px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer shadow-2xs"
      >
        <option value="onClick">On click</option>
        <option value="withPrevious">With previous</option>
        <option value="afterPrevious">After previous</option>
      </select>

      <div className="space-y-1 pt-1">
        <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
          <span>Slow</span>
          <span className="font-mono text-stone-700">{duration.toFixed(1)}s</span>
          <span>Fast</span>
        </div>
        <input
          type="range" min="0.3" max="3.0" step="0.1" value={duration}
          onChange={(e) => onUpdate({ duration: Math.max(0.1, parseFloat(e.target.value) || 0.8) })}
          className="w-full accent-amber-500 h-1 bg-stone-200 rounded-lg cursor-pointer"
        />
      </div>

      <div className="flex justify-end pt-1">
        <button
          type="button" onClick={onDelete}
          className="p-1 hover:bg-stone-200 rounded text-stone-500 hover:text-rose-600 transition-colors cursor-pointer"
          title="Delete animation"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

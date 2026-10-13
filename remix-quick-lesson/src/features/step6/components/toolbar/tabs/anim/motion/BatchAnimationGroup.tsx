import React from 'react';
import { Layers } from 'lucide-react';
import { OBJECT_ANIMATION_OPTIONS } from './motionPanelTypes';
import DurationInputGuard from '../timing/DurationInputGuard';
import { TriggerSelectorGroup } from '../timing/TriggerSelectorGroup';

interface BatchAnimationGroupProps {
  selectedCount: number;
  duration: number;
  trigger: string;
  onUpdate: (patch: any) => void;
}

export const BatchAnimationGroup: React.FC<BatchAnimationGroupProps> = ({ selectedCount, duration, trigger, onUpdate }) => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-3 shadow-inner">
      <div className="flex items-center gap-2 text-amber-950 font-black text-xs tracking-tight">
        <Layers className="w-4 h-4" />
        <span>Group Settings ({selectedCount} items)</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">Animation</label>
          <select 
            className="w-full text-[11px] p-1.5 rounded-lg bg-white border border-amber-300 focus:ring-1 focus:ring-amber-500 cursor-pointer"
            onChange={(e) => {
              const [category, effectId] = e.target.value.split('|');
              onUpdate({ category, effectId });
            }}
          >
            {OBJECT_ANIMATION_OPTIONS.map((group) => (
              <optgroup key={group.group} label={group.group}>
                {group.items.map((item) => (
                  <option key={item.id} value={`${item.category}|${item.id}`}>{item.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <TriggerSelectorGroup value={trigger} onChange={(trigger) => onUpdate({ trigger })} />
      </div>
      <DurationInputGuard value={duration} onChange={(duration) => onUpdate({ duration })} />
    </div>
  );
};

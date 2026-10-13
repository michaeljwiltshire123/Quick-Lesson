import React from 'react';
import { SlideElement } from '../../../../../types/slideTypes';
import { Trash2 } from 'lucide-react';
import { ScratchBlockDef } from './scratchTypes';

interface ScratchScriptStripProps {
  element: SlideElement;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
  onDropBlock: (block: ScratchBlockDef, slotType: 'entrance' | 'animation' | 'exit') => void;
}

export const ScratchScriptStrip: React.FC<ScratchScriptStripProps> = ({
  element, onUpdateElementMeta, onDropBlock,
}) => {
  const meta = element.meta || {};
  const entrance = meta.animationType && meta.animationType !== 'none' ? meta.animationType : null;
  const animation = meta.emphasisEffect && meta.emphasisEffect !== 'none' ? meta.emphasisEffect : null;
  const exit = meta.exitAnimationType && meta.exitAnimationType !== 'none' ? meta.exitAnimationType : null;

  const handleDrop = (e: React.DragEvent, slotType: 'entrance' | 'animation' | 'exit') => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json')) as ScratchBlockDef;
      if (data) onDropBlock(data, slotType);
    } catch {}
  };

  const renderSlot = (type: 'entrance' | 'animation' | 'exit', val: string | null, bg: string, border: string) => (
    <div
      onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, type)}
      style={{ backgroundColor: val ? bg : '#ffffff', borderColor: val ? border : '#d1d5db' }}
      className={`px-3 py-1.5 rounded-xl border-2 font-black text-[10px] flex items-center gap-1.5 shrink-0 shadow-2xs transition-all ${
        val ? 'text-white' : 'text-stone-400 border-dashed hover:border-amber-400'
      }`}
    >
      <span>{val ? val.replace(/_/g, ' ') : `+ Drop ${type === 'animation' ? 'Animation' : type}`}</span>
      {val && (
        <button
          type="button"
          onClick={() => onUpdateElementMeta(
            type === 'entrance' ? { animationType: 'none' } :
            type === 'animation' ? { emphasisEffect: 'none', isPulseEmphasis: false, isSpinEmphasis: false } :
            { exitAnimationType: 'none' }
          )}
          className="p-0.5 hover:bg-black/20 rounded cursor-pointer text-white/80 hover:text-white"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      )}
    </div>
  );

  return (
    <div className="p-3 bg-stone-100 border-2 border-stone-300 rounded-2xl space-y-2 select-none shadow-inner">
      <div className="flex items-center justify-between text-xs font-black text-stone-800">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>Active Element Script (Sequence Chain)</span>
        </span>
        <span className="text-[10px] text-stone-500 font-bold">Drop animations onto slots</span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-stone-200/90 rounded-xl border border-stone-300">
        {renderSlot('entrance', entrance, '#4C97FF', '#2E78E6')}
        <span className="text-stone-400 font-black">›</span>
        {renderSlot('animation', animation, '#9966FF', '#7E45E8')}
        <span className="text-stone-400 font-black">›</span>
        {renderSlot('exit', exit, '#FF6680', '#E04B65')}
      </div>
    </div>
  );
};

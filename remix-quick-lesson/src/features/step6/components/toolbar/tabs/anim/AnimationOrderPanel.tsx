import React, { useState } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { ListOrdered, ChevronUp, ChevronDown, Play, RotateCcw } from 'lucide-react';
import { getGoogleSlidesExportLabel } from '../../../../services/googleSlidesExportMapper';

interface AnimationOrderPanelProps {
  elements: SlideElement[];
  selectedElementId?: string | null;
  onSelectElementId?: (id: string) => void;
  onUpdateElements: (elements: SlideElement[]) => void;
}

export const AnimationOrderPanel: React.FC<AnimationOrderPanelProps> = ({
  elements, selectedElementId, onSelectElementId, onUpdateElements,
}) => {
  const [curStep, setCurStep] = useState<number | null>(null);
  const anims = elements
    .filter((el) => Boolean(el.meta?.animationType && el.meta.animationType !== 'none'))
    .sort((a, b) => (a.meta?.animationStep || 1) - (b.meta?.animationStep || 1));

  const shift = (id: string, dir: 'up' | 'down') => {
    const idx = anims.findIndex((e) => e.id === id);
    const tgt = dir === 'up' ? idx - 1 : idx + 1;
    if (idx < 0 || tgt < 0 || tgt >= anims.length) return;
    const cStep = anims[idx].meta?.animationStep || idx + 1;
    const tStep = anims[tgt].meta?.animationStep || tgt + 1;
    onUpdateElements(elements.map((el) => {
      if (el.id === anims[idx].id) return { ...el, meta: { ...(el.meta || {}), animationStep: tStep } };
      if (el.id === anims[tgt].id) return { ...el, meta: { ...(el.meta || {}), animationStep: cStep } };
      return el;
    }));
  };

  const playPreview = () => {
    anims.forEach((el, i) => setTimeout(() => setCurStep(el.meta?.animationStep || i + 1), i * 500));
    setTimeout(() => setCurStep(null), anims.length * 500 + 300);
  };

  return (
    <div className="space-y-1.5 p-2 bg-stone-50 border border-stone-200 rounded-2xl text-xs text-stone-700">
      <div className="font-bold text-stone-800 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <ListOrdered className="w-3.5 h-3.5 text-amber-700" />
          <span>Animation Sequence</span>
        </span>
        <button
          type="button" onClick={playPreview} disabled={anims.length === 0}
          className="px-2 py-0.5 bg-white hover:bg-stone-100 border border-stone-300 rounded font-bold text-[10px] text-amber-900 flex items-center gap-1 cursor-pointer disabled:opacity-40"
        >
          {curStep !== null ? <RotateCcw className="w-2.5 h-2.5 animate-spin" /> : <Play className="w-2.5 h-2.5 fill-amber-800" />}
          <span>{curStep !== null ? `Step ${curStep}` : 'Preview'}</span>
        </button>
      </div>

      {anims.length === 0 ? (
        <div className="p-2 text-center bg-white border border-dashed border-stone-300 rounded-xl text-stone-400 text-[11px]">
          No elements animated yet.
        </div>
      ) : (
        <div className="space-y-1 max-h-[150px] overflow-y-auto pr-0.5">
          {anims.map((el, i) => (
            <div
              key={el.id} onClick={() => onSelectElementId && onSelectElementId(el.id)}
              className={`p-1.5 rounded-xl border flex items-center justify-between text-[11px] cursor-pointer transition-all ${
                curStep === (el.meta?.animationStep || i + 1) ? 'ring-2 ring-amber-500 bg-amber-200 font-black' :
                el.id === selectedElementId ? 'bg-amber-100 border-amber-500 font-bold' : 'bg-white border-stone-200 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-4 h-4 rounded-full bg-amber-800 text-white font-black text-[9px] flex items-center justify-center shrink-0">
                  {el.meta?.animationStep || i + 1}
                </span>
                <span className="truncate max-w-[85px]">{el.caption || (el.type === 'text' ? el.content?.slice(0, 14) : el.type)}</span>
                <span className="text-[9px] text-stone-500 bg-stone-100 px-1 rounded truncate">GS: {getGoogleSlidesExportLabel(el.meta?.animationType || '')}</span>
              </div>
              <div className="flex items-center gap-0.5 shrink-0">
                <button type="button" disabled={i === 0} onClick={(e) => { e.stopPropagation(); shift(el.id, 'up'); }} className="p-0.5 hover:bg-stone-200 rounded disabled:opacity-20 cursor-pointer"><ChevronUp className="w-3 h-3" /></button>
                <button type="button" disabled={i === anims.length - 1} onClick={(e) => { e.stopPropagation(); shift(el.id, 'down'); }} className="p-0.5 hover:bg-stone-200 rounded disabled:opacity-20 cursor-pointer"><ChevronDown className="w-3 h-3" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

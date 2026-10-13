import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { GripVertical, Flag, Sparkles, Zap } from 'lucide-react';

interface ScratchBlockCardProps {
  element: SlideElement;
  index: number;
  isSelected: boolean;
  isDragging: boolean;
  onSelect: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}

export const ScratchBlockCard: React.FC<ScratchBlockCardProps> = ({
  element, index, isSelected, isDragging, onSelect, onDragStart, onDragOver, onDrop, onDragEnd,
}) => {
  const meta = element.meta || {};
  const entry = meta.animationType && meta.animationType !== 'none' ? meta.animationType.replace(/_/g, ' ') : 'Fade In';
  const emphasis = meta.emphasisEffect && meta.emphasisEffect !== 'none' ? meta.emphasisEffect.replace(/_/g, ' ') : (meta.isPulseEmphasis ? 'Pulse' : meta.isSpinEmphasis ? 'Spin' : 'None');
  const exit = meta.exitAnimationType && meta.exitAnimationType !== 'none' ? meta.exitAnimationType.replace(/_/g, ' ') : 'None';
  const label = element.caption || (element.type === 'text' ? element.content?.slice(0, 14) : element.type.toUpperCase());

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      onClick={onSelect}
      className={`relative min-w-[240px] shrink-0 p-2 rounded-2xl border-2 transition-all select-none bg-stone-100 shadow-xs ${
        isDragging ? 'opacity-40 scale-95 border-dashed border-amber-800' : ''
      } ${isSelected ? 'ring-4 ring-amber-400 border-amber-600 bg-amber-50/90 shadow-lg scale-[1.01]' : 'border-stone-300 hover:border-amber-400'}`}
    >
      <div className="flex items-center justify-between gap-1 mb-1.5">
        <div className="flex items-center gap-1.5 truncate">
          <GripVertical className="w-3.5 h-3.5 text-stone-400 cursor-grab shrink-0" />
          <span className="w-4 h-4 rounded-full bg-amber-800 text-white font-black text-[9px] flex items-center justify-center shrink-0">
            {meta.animationStep || index + 1}
          </span>
          <span className="font-black text-[11px] text-stone-900 truncate max-w-[120px]">{label}</span>
        </div>
        <span className="text-[8.5px] font-bold text-amber-900 bg-amber-200/90 px-1.5 py-0.2 rounded">
          {meta.animTrigger || 'onClick'}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-1 p-1 bg-stone-200/90 rounded-xl border border-stone-300 shadow-inner">
          <div className="px-1.5 py-0.5 bg-[#F5CC00] text-amber-950 font-black rounded-md text-[8.5px] flex items-center gap-0.5 shadow-2xs shrink-0 border border-[#D9B400]">
            <Flag className="w-2.5 h-2.5 fill-amber-950" />
            <span>Start</span>
          </div>
          <span className="text-stone-400 font-bold text-[9px]">›</span>
          <div className="px-1.5 py-0.5 bg-[#4C97FF] text-white font-extrabold rounded-md text-[8.5px] flex items-center gap-0.5 shadow-2xs shrink-0 border border-[#2E78E6]">
            <Sparkles className="w-2 h-2 text-blue-200" />
            <span className="capitalize">{entry}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 bg-stone-200/90 rounded-xl border border-stone-300 shadow-inner">
          <div className="px-1.5 py-0.5 bg-[#FFAB19] text-amber-950 font-black rounded-md text-[8.5px] flex items-center gap-0.5 shadow-2xs shrink-0 border border-[#D98E00]">
            <Zap className="w-2.5 h-2.5" />
            <span>Action</span>
          </div>
          <span className="text-stone-400 font-bold text-[9px]">›</span>
          <div className={`px-1.5 py-0.5 font-extrabold rounded-md text-[8.5px] flex items-center gap-0.5 shadow-2xs shrink-0 border ${
            emphasis !== 'None' ? 'bg-[#9966FF] text-white border-[#7E45E8]' : 'bg-white text-stone-500 border-stone-300'
          }`}>
            <span>{emphasis}</span>
          </div>
          <span className="text-stone-400 font-bold text-[9px]">›</span>
          <div className={`px-1.5 py-0.5 font-extrabold rounded-md text-[8.5px] flex items-center gap-0.5 shadow-2xs shrink-0 border ${
            exit !== 'None' ? 'bg-[#FF6680] text-white border-[#E04B65]' : 'bg-white text-stone-500 border-stone-300'
          }`}>
            <span>{exit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

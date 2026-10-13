import React from 'react';
import { ScratchBlockDef } from './scratchTypes';
import { Sparkles } from 'lucide-react';

interface ScratchPaletteBlockProps {
  block: ScratchBlockDef;
  onDragStart: (e: React.DragEvent, block: ScratchBlockDef) => void;
  onQuickAdd: (block: ScratchBlockDef) => void;
}

export const ScratchPaletteBlock: React.FC<ScratchPaletteBlockProps> = ({
  block, onDragStart, onQuickAdd,
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, block)}
      onClick={() => onQuickAdd(block)}
      style={{ backgroundColor: block.color, borderColor: block.borderColor }}
      className="px-2.5 py-1.5 rounded-xl border-2 text-white font-black text-[11px] shadow-sm cursor-grab active:cursor-grabbing hover:scale-105 transition-all flex items-center gap-1.5 select-none"
      title="Drag or click to snap onto script line"
    >
      <Sparkles className="w-3 h-3 text-white/90 shrink-0" />
      <span className="truncate">{block.label}</span>
    </div>
  );
};

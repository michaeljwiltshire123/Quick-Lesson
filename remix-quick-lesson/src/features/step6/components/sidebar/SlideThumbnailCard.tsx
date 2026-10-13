import React from 'react';
import { SlideItem } from '../../types/slideTypes';
import { GripVertical, Combine } from 'lucide-react';

interface SlideThumbnailCardProps {
  slide: SlideItem;
  index: number;
  isActive: boolean;
  isDragging: boolean;
  dropAction: 'reorder-above' | 'reorder-below' | 'merge' | null;
  onSelect: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export const SlideThumbnailCard: React.FC<SlideThumbnailCardProps> = ({
  slide, index, isActive, isDragging, dropAction,
  onSelect, onDragStart, onDragEnd, onDragOver, onDragLeave, onDrop,
}) => {
  const bg = slide.theme?.backgroundColor || '#FAF9F5';
  const txt = slide.theme?.textColor || '#1C1917';
  const pattern = (slide.theme as any)?.backgroundPattern;

  return (
    <div
      draggable
      onClick={onSelect}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`group relative flex items-start gap-2 p-1.5 rounded-md transition-all cursor-pointer select-none ${
        isDragging ? 'opacity-30' : ''
      } ${isActive ? 'bg-amber-500/10' : 'hover:bg-stone-100/80'}`}
    >
      {dropAction === 'reorder-above' && <div className="absolute -top-1 left-2 right-2 h-1 bg-amber-600 rounded-full z-20" />}
      {dropAction === 'reorder-below' && <div className="absolute -bottom-1 left-2 right-2 h-1 bg-amber-600 rounded-full z-20" />}

      {dropAction === 'merge' && (
        <div className="absolute inset-0 bg-amber-900/20 backdrop-blur-[0.5px] rounded-md flex items-center justify-center gap-1.5 z-30">
          <span className="bg-amber-800 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow flex items-center gap-1">
            <Combine className="w-3 h-3 text-amber-200" /> Merge
          </span>
        </div>
      )}

      <div className="flex flex-col items-center pt-1 min-w-[20px] text-stone-400 group-hover:text-stone-700">
        <span className="text-[10px] font-extrabold">{index + 1}</span>
        <GripVertical className="w-3 h-3 mt-1 opacity-40 group-hover:opacity-100" />
      </div>

      <div
        style={{ backgroundColor: bg, color: txt }}
        className={`flex-1 aspect-[16/9] rounded-xs border transition-all p-2 flex flex-col justify-between overflow-hidden shadow-xs relative ${
          isActive
            ? 'border-amber-600 ring-2 ring-amber-600 shadow-md scale-[1.02]'
            : 'border-stone-300 hover:border-stone-400'
        }`}
      >
        <div className="space-y-0.5">
          <div className="text-[9px] font-black line-clamp-1 leading-tight tracking-tight">
            {slide.title || 'Untitled Slide'}
          </div>
          {slide.subtitle && (
            <div className="text-[7px] opacity-60 line-clamp-1">
              {slide.subtitle}
            </div>
          )}
        </div>

        <div className="flex-1 my-1 flex items-center justify-center gap-1 overflow-hidden">
          {slide.elements.slice(0, 3).map((el, i) => (
            <div
              key={el.id || i}
              className="h-full flex-1 rounded-2xs border border-current/20 bg-current/5 flex items-center justify-center text-[6px] px-0.5 overflow-hidden font-medium opacity-70"
            >
              <span className="truncate">{el.type === 'shape' ? '◈' : el.type === 'table' ? '⊞' : el.type === 'image' ? '🖼' : el.content.slice(0, 10)}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[6px] opacity-50 pt-0.5 border-t border-current/15">
          <span>{slide.archetype.replace('_', ' ')}</span>
          <span>{slide.speakerNotes?.timingMinutes || 5}m</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SlideItem } from '../../types/slideTypes';
import { SlideThumbnailCard } from './SlideThumbnailCard';

interface SlideDragDropListProps {
  slides: SlideItem[];
  activeIndex: number;
  onSelectSlide: (index: number) => void;
  onReorder: (from: number, to: number) => void;
  onMerge: (sourceIndex: number, targetIndex: number) => void;
}

export const SlideDragDropList: React.FC<SlideDragDropListProps> = ({
  slides,
  activeIndex,
  onSelectSlide,
  onReorder,
  onMerge,
}) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [dropAction, setDropAction] = useState<'reorder-above' | 'reorder-below' | 'merge' | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggingIndex(index);
    e.dataTransfer.setData('text/plain', String(index));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === index) {
      setDropAction(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const relY = (e.clientY - rect.top) / rect.height;

    setTargetIndex(index);
    if (relY < 0.25) setDropAction('reorder-above');
    else if (relY > 0.75) setDropAction('reorder-below');
    else setDropAction('merge');
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === index) {
      resetDrag();
      return;
    }

    if (dropAction === 'merge') {
      onMerge(draggingIndex, index);
    } else if (dropAction === 'reorder-above') {
      const target = draggingIndex < index ? index - 1 : index;
      onReorder(draggingIndex, Math.max(0, target));
    } else if (dropAction === 'reorder-below') {
      const target = draggingIndex < index ? index : index + 1;
      onReorder(draggingIndex, Math.min(slides.length - 1, target));
    }
    resetDrag();
  };

  const resetDrag = () => {
    setDraggingIndex(null);
    setTargetIndex(null);
    setDropAction(null);
  };

  return (
    <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
      {slides.map((slide, idx) => (
        <SlideThumbnailCard
          key={slide.id}
          slide={slide}
          index={idx}
          isActive={idx === activeIndex}
          isDragging={draggingIndex === idx}
          dropAction={targetIndex === idx ? dropAction : null}
          onSelect={() => onSelectSlide(idx)}
          onDragStart={(e) => handleDragStart(e, idx)}
          onDragEnd={resetDrag}
          onDragOver={(e) => handleDragOver(e, idx)}
          onDragLeave={() => targetIndex === idx && setDropAction(null)}
          onDrop={(e) => handleDrop(e, idx)}
        />
      ))}
    </div>
  );
};

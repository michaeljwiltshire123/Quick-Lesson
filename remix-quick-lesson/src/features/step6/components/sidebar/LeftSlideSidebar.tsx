import React from 'react';
import { SlideItem } from '../../types/slideTypes';
import { SlideDragDropList } from './SlideDragDropList';
import { SlideListControls } from './SlideListControls';
import { Layers } from 'lucide-react';

interface LeftSlideSidebarProps {
  slides: SlideItem[];
  activeIndex: number;
  onSelectSlide: (index: number) => void;
  onReorderSlides: (from: number, to: number) => void;
  onMergeSlides: (sourceIndex: number, targetIndex: number) => void;
  onAddBlankSlide: () => void;
  onDuplicateSlide: (index: number) => void;
  onDeleteSlide: (index: number) => void;
}

export const LeftSlideSidebar: React.FC<LeftSlideSidebarProps> = ({
  slides,
  activeIndex,
  onSelectSlide,
  onReorderSlides,
  onMergeSlides,
  onAddBlankSlide,
  onDuplicateSlide,
  onDeleteSlide,
}) => {
  return (
    <aside
      aria-label="Slide Deck Navigation and Reordering"
      className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm space-y-3 flex flex-col justify-between"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-700" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700">Slide Deck</h2>
          </div>
          <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
            {slides.length} {slides.length === 1 ? 'slide' : 'slides'}
          </span>
        </div>

        <SlideDragDropList
          slides={slides}
          activeIndex={activeIndex}
          onSelectSlide={onSelectSlide}
          onReorder={onReorderSlides}
          onMerge={onMergeSlides}
        />
      </div>

      <SlideListControls
        slidesCount={slides.length}
        activeIndex={activeIndex}
        onAddBlank={onAddBlankSlide}
        onDuplicate={onDuplicateSlide}
        onDelete={onDeleteSlide}
      />
    </aside>
  );
};

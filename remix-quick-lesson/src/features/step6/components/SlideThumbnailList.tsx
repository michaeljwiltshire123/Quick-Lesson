import React from 'react';
import { SlideItem } from '../types/slideTypes';
import { ChevronUp, ChevronDown, Plus, Trash2, Combine, Film } from 'lucide-react';
import { slideTypeColor } from './slideTypeColor';

interface SlideThumbnailListProps {
  slides: SlideItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onMergeWithPrevious: (index: number) => void;
  onDelete: (index: number) => void;
  onAddSlide: () => void;
}

export const SlideThumbnailList: React.FC<SlideThumbnailListProps> = ({
  slides, activeIndex, onSelect, onMoveUp, onMoveDown, onMergeWithPrevious, onDelete, onAddSlide,
}) => {
  return (
    <nav aria-label="Slide Deck Navigation" className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">Lesson Slides</h2>
        <button
          type="button" onClick={onAddSlide}
          className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 hover:underline cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Slide
        </button>
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
        {slides.map((slide, idx) => {
          const isActive = idx === activeIndex;
          const trEffect = slide.theme?.transitionEffect;
          return (
            <div
              key={slide.id} onClick={() => onSelect(idx)}
              className={`p-3 rounded-xl border transition-all cursor-pointer text-left ${
                isActive
                  ? 'border-amber-600 bg-amber-50/50 shadow-sm ring-1 ring-amber-600'
                  : `${slideTypeColor(slide)} hover:border-stone-400`
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-stone-500">Slide {idx + 1}</span>
                <div className="flex items-center gap-1">
                  {trEffect && trEffect !== 'none' && (
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-0.5">
                      <Film className="w-2.5 h-2.5 text-amber-700" />
                      <span className="max-w-[70px] truncate">{trEffect.replace(/_/g, ' ')}</span>
                    </span>
                  )}
                  <span className="text-[10px] font-medium uppercase px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                    {slide.archetype.replace('_', ' ')}
                  </span>
                  {slide.isHidden && <span className="rounded bg-sky-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-sky-900">Hidden</span>}
                </div>
              </div>
              <h3 className="text-xs font-semibold text-stone-800 line-clamp-1">{slide.title}</h3>
              <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{slide.subtitle || 'Standard layout'}</p>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100/80" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-1">
                  <button type="button" disabled={idx === 0} onClick={() => onMoveUp(idx)} className="p-1 rounded text-stone-400 hover:text-stone-700 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed" title="Move slide up">
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" disabled={idx === slides.length - 1} onClick={() => onMoveDown(idx)} className="p-1 rounded text-stone-400 hover:text-stone-700 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed" title="Move slide down">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {idx > 0 && (
                    <button type="button" onClick={() => onMergeWithPrevious(idx)} className="p-1 rounded text-stone-400 hover:text-amber-800 cursor-pointer" title="Merge into previous slide">
                      <Combine className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                {slides.length > 1 && (
                  <button type="button" onClick={() => onDelete(idx)} className="p-1 rounded text-stone-400 hover:text-red-600 cursor-pointer" title="Delete slide">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

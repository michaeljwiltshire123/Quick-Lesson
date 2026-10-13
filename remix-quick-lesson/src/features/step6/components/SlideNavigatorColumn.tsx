import React from 'react';
import { SlideItem, SlideElement } from '../types/slideTypes';
import { SlideThumbnailList } from './SlideThumbnailList';
import { RetrievalWarmUpBank } from './retrieval/RetrievalWarmUpBank';

interface Props {
  slides: SlideItem[]; activeIndex: number; lessonTitle: string;
  onSelect: (index: number) => void; onMove: (from: number, to: number) => void;
  onMerge: (from: number, to: number) => void; onDelete: (index: number) => void;
  onAdd: () => void; onInsert: (element: SlideElement) => void; onOpenWarmup: () => void;
}
export const SlideNavigatorColumn: React.FC<Props> = (props) => (
  <div className="lg:col-span-3 sticky top-3 self-start">
    <SlideThumbnailList slides={props.slides} activeIndex={props.activeIndex} onSelect={props.onSelect}
      onMoveUp={(i) => props.onMove(i, Math.max(0, i - 1))}
      onMoveDown={(i) => props.onMove(i, Math.min(props.slides.length - 1, i + 1))}
      onMergeWithPrevious={(i) => props.onMerge(i, Math.max(0, i - 1))}
      onDelete={props.onDelete} onAddSlide={props.onAdd} />
    <RetrievalWarmUpBank lessonTitle={props.lessonTitle} slides={props.slides} onInsert={props.onInsert} onOpenWarmup={props.onOpenWarmup} />
  </div>
);

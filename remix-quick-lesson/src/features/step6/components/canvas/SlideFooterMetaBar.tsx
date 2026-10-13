import React from 'react';
import { SlideItem } from '../../types/slideTypes';

interface SlideFooterMetaBarProps {
  slide: SlideItem;
  slideNumber: number;
}

export const SlideFooterMetaBar: React.FC<SlideFooterMetaBarProps> = ({ slide, slideNumber }) => {
  return (
    <div className="absolute bottom-2 left-8 right-8 z-10 pointer-events-none border-t border-current/20 pt-1.5 grid grid-cols-3 gap-2 text-[10px] opacity-60">
      <div className="border border-current/20 px-2 py-0.5 rounded-2xs text-left truncate">
        {new Date().toLocaleDateString('en-GB')}
      </div>
      <div className="border border-current/20 px-2 py-0.5 rounded-2xs text-center truncate">
        {slide.title || 'Lesson Overview'}
      </div>
      <div className="border border-current/20 px-2 py-0.5 rounded-2xs text-right">
        Slide {slideNumber} ({slide.speakerNotes?.timingMinutes || 5}m)
      </div>
    </div>
  );
};

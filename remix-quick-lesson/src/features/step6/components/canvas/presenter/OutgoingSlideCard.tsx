import React from 'react';
import { SlideItem } from '../../../types/slideTypes';
import { CanvasElementRenderer } from '../CanvasElementRenderer';

interface OutgoingSlideCardProps {
  slide: SlideItem;
  outgoingStyle?: React.CSSProperties;
}

export const OutgoingSlideCard: React.FC<OutgoingSlideCardProps> = ({ slide, outgoingStyle }) => {
  return (
    <div
      key={`outgoing-${slide.id}`}
      style={{
        backgroundColor: slide.theme?.backgroundColor || '#FAF9F5',
        color: slide.theme?.textColor || '#1C1917',
        ...outgoingStyle,
      }}
      className="absolute inset-0 p-10 shadow-2xl overflow-hidden flex flex-col justify-between pointer-events-none z-10 rounded-3xl"
    >
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-black">{slide.title}</h1>
        {slide.subtitle && <p className="text-base italic opacity-80">{slide.subtitle}</p>}
      </div>

      <div className="relative flex-1 my-4">
        {slide.elements.map((el) => (
          <div key={el.id}>
            <CanvasElementRenderer
              element={el}
              isSelected={false}
              onSelect={() => {}}
              onUpdateContent={() => {}}
              onUpdateElement={() => {}}
              onStartDrag={() => {}}
              onStartResize={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

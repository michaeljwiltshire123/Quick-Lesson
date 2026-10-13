import React from 'react';
import { Layers, ArrowDown, MousePointer } from 'lucide-react';
import { SlideElement } from '../../../../../types/slideTypes';

interface TimelineRowConnectorsProps {
  currentElement: SlideElement;
  previousElement?: SlideElement;
}

export const TimelineRowConnectors: React.FC<TimelineRowConnectorsProps> = ({
  currentElement, previousElement,
}) => {
  if (!previousElement) return null;

  const currentTrigger = currentElement.meta?.animTrigger || 'onClick';
  const isTogether = currentTrigger === 'withPrevious';
  const isSuccessive = currentTrigger === 'afterPrevious';

  return (
    <div className="flex items-center justify-center my-0.5 select-none">
      <div className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold flex items-center gap-1 border ${
        isTogether
          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
          : isSuccessive
          ? 'bg-blue-50 text-blue-800 border-blue-300'
          : 'bg-stone-100 text-stone-500 border-stone-200'
      }`}>
        {isTogether ? (
          <>
            <Layers className="w-2.5 h-2.5 text-emerald-600" />
            <span>Plays Together with {previousElement.caption || 'Previous'}</span>
          </>
        ) : isSuccessive ? (
          <>
            <ArrowDown className="w-2.5 h-2.5 text-blue-600" />
            <span>Successive Chain (Auto)</span>
          </>
        ) : (
          <>
            <MousePointer className="w-2.5 h-2.5 text-stone-400" />
            <span>Waits for Click</span>
          </>
        )}
      </div>
    </div>
  );
};

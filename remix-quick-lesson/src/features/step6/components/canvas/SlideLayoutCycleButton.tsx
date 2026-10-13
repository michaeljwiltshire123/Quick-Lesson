import React from 'react';
import { SlideElement } from '../../types/slideTypes';
import { RefreshCw } from 'lucide-react';

interface SlideLayoutCycleButtonProps {
  elements: SlideElement[];
  onUpdateElements: (elements: SlideElement[]) => void;
}

export const SlideLayoutCycleButton: React.FC<SlideLayoutCycleButtonProps> = ({
  elements, onUpdateElements,
}) => {
  const handleCycleLayout = () => {
    if (elements.length <= 1) {
      onUpdateElements(elements.map((el) => ({ ...el, x: 10, y: 20, width: 80, height: 60 })));
      return;
    }

    if (elements.length === 2) {
      // Toggle between Side-by-Side (50/50) and Top/Bottom (Stacked)
      const isSideBySide = elements[0].x < 40 && elements[1].x > 40;
      if (isSideBySide) {
        // Switch to Top/Bottom
        onUpdateElements([
          { ...elements[0], x: 10, y: 15, width: 80, height: 35 },
          { ...elements[1], x: 10, y: 55, width: 80, height: 35 },
        ]);
      } else {
        // Switch to Side-by-Side
        onUpdateElements([
          { ...elements[0], x: 5, y: 20, width: 43, height: 65 },
          { ...elements[1], x: 52, y: 20, width: 43, height: 65 },
        ]);
      }
      return;
    }

    // For 3+ elements: distribute evenly in horizontal cards or 2x2 grid
    const cardWidth = Math.min(42, Math.floor(90 / elements.length));
    onUpdateElements(
      elements.map((el, idx) => ({
        ...el,
        x: 5 + idx * (cardWidth + 4),
        y: 20,
        width: cardWidth,
        height: 65,
      }))
    );
  };

  return (
    <button
      type="button"
      onClick={handleCycleLayout}
      className="px-2.5 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
      title="Cycle through clean layout arrangements without losing any text or media"
    >
      <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
      <span>Try Another Layout</span>
    </button>
  );
};

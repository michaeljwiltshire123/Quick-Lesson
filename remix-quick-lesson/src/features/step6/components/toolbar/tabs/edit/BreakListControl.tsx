import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { canBreakElementIntoList, breakListIntoSeparateBoxes } from '../../../../utils/breakListHelper';
import { ListTree, Sparkles } from 'lucide-react';

interface BreakListControlProps {
  selectedElement?: SlideElement;
  onSplitElement?: (elements: SlideElement[]) => void;
}

export const BreakListControl: React.FC<BreakListControlProps> = ({
  selectedElement, onSplitElement,
}) => {
  const isEligible = canBreakElementIntoList(selectedElement);

  const handleBreak = () => {
    if (!selectedElement || !onSplitElement) return;
    const splitBoxes = breakListIntoSeparateBoxes(selectedElement);
    if (splitBoxes.length > 1) {
      onSplitElement(splitBoxes);
    }
  };

  return (
    <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5 text-xs text-stone-700 select-none">
      <div className="flex items-center justify-between">
        <span className="font-bold text-stone-900 flex items-center gap-1.5 text-xs">
          <ListTree className="w-3.5 h-3.5 text-amber-700" />
          <span>List Separation</span>
        </span>
        <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/80 px-1.5 py-0.2 rounded border border-amber-300">
          Animation Ready
        </span>
      </div>

      <p className="text-[11px] text-stone-500 leading-tight">
        Split bulleted or numbered text into separate boxes to assign individual reveal animations.
      </p>

      <button
        type="button"
        disabled={!isEligible}
        onClick={handleBreak}
        className={`w-full py-1.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs ${
          isEligible
            ? 'bg-amber-800 hover:bg-amber-900 text-white cursor-pointer hover:shadow-xs'
            : 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300'
        }`}
        title={isEligible ? 'Break list into individual boxes' : 'Select a text box with multiple list items'}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Break list</span>
      </button>
    </div>
  );
};

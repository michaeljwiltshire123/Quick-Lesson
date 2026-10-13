import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface FontSizeStepperProps {
  currentSize?: number;
  onChangeSize: (size: number) => void;
}

export const FontSizeStepper: React.FC<FontSizeStepperProps> = ({
  currentSize = 18, onChangeSize,
}) => {
  return (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onChangeSize(Math.max(8, (currentSize || 18) - 1))}
        className="w-6 h-6 flex items-center justify-center rounded hover:bg-stone-200/70 text-stone-700 cursor-pointer"
        title="Decrease font size (-)"
      >
        <Minus className="w-3 h-3" />
      </button>

      <input
        type="number"
        value={currentSize || 18}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => onChangeSize(Math.max(8, Math.min(96, parseInt(e.target.value, 10) || 18)))}
        className="w-9 h-6 text-center text-xs font-semibold bg-white border border-stone-300 rounded focus:outline-none focus:border-amber-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        title="Font size"
      />

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onChangeSize(Math.min(96, (currentSize || 18) + 1))}
        className="w-6 h-6 flex items-center justify-center rounded hover:bg-stone-200/70 text-stone-700 cursor-pointer"
        title="Increase font size (+)"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
};

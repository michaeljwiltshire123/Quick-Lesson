import React from 'react';
import { ElementTextStyle } from '../../../types/slideTypes';
import { ArrowUpToLine, ArrowDownToLine, MoveVertical, MoveHorizontal } from 'lucide-react';

interface QuickAlignmentControlsProps {
  textStyle?: ElementTextStyle;
  onUpdateStyle?: (patch: Partial<ElementTextStyle>) => void;
  onSnapPosition?: (snap: 'top' | 'center' | 'middle' | 'bottom') => void;
}

export const QuickAlignmentControls: React.FC<QuickAlignmentControlsProps> = ({
  onSnapPosition,
}) => {
  if (!onSnapPosition) return null;

  return (
    <div className="flex items-center gap-0.5 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onSnapPosition('top')}
        className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-stone-700 hover:text-stone-900 cursor-pointer text-xs"
        title="Snap to Top"
      >
        <ArrowUpToLine className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onSnapPosition('center')}
        className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-stone-700 hover:text-stone-900 cursor-pointer text-xs"
        title="Snap to Horizontal Centre"
      >
        <MoveHorizontal className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onSnapPosition('middle')}
        className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-stone-700 hover:text-stone-900 cursor-pointer text-xs"
        title="Snap to Vertical Middle"
      >
        <MoveVertical className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onSnapPosition('bottom')}
        className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-stone-700 hover:text-stone-900 cursor-pointer text-xs"
        title="Snap to Bottom"
      >
        <ArrowDownToLine className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

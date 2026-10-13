import React, { useState } from 'react';
import { AlignJustify, Minus } from 'lucide-react';

interface BorderControlsDropdownProps {
  currentWeight?: number;
  currentDash?: string;
  onChangeWeight: (weight: number) => void;
  onChangeDash?: (dash: string) => void;
}

const WEIGHTS = [0, 1, 2, 3, 4, 8];
const DASH_STYLES = [
  { id: 'solid', label: 'Solid Line ───' },
  { id: 'dashed', label: 'Dashed Line ╌╌╌' },
  { id: 'dotted', label: 'Dotted Line ┄┄┄' },
];

export const BorderControlsDropdown: React.FC<BorderControlsDropdownProps> = ({
  currentWeight = 1, currentDash = 'solid', onChangeWeight, onChangeDash,
}) => {
  const [isWeightOpen, setIsWeightOpen] = useState(false);
  const [isDashOpen, setIsDashOpen] = useState(false);

  return (
    <div className="flex items-center gap-0.5">
      <div className="relative">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setIsWeightOpen(!isWeightOpen)}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-stone-200/70 text-stone-700 cursor-pointer"
          title="Border weight"
        >
          <AlignJustify className="w-3.5 h-3.5" />
        </button>
        {isWeightOpen && (
          <div className="absolute left-0 top-full mt-1 w-28 bg-white rounded-xl shadow-xl border border-stone-200 p-1 z-50 space-y-0.5 animate-in fade-in">
            {WEIGHTS.map((w) => (
              <button
                key={w}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { onChangeWeight(w); setIsWeightOpen(false); }}
                className={`w-full flex items-center justify-between px-2 py-1 text-xs rounded-lg cursor-pointer ${currentWeight === w ? 'bg-amber-100 font-bold text-amber-900' : 'hover:bg-stone-100 text-stone-800'}`}
              >
                <span>{w === 0 ? 'No Border' : `${w}px`}</span>
                <span className="w-8 h-0.5 bg-stone-700 inline-block" style={{ height: `${Math.max(1, w)}px` }} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setIsDashOpen(!isDashOpen)}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-stone-200/70 text-stone-700 cursor-pointer"
          title="Border dash"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        {isDashOpen && onChangeDash && (
          <div className="absolute left-0 top-full mt-1 w-36 bg-white rounded-xl shadow-xl border border-stone-200 p-1 z-50 space-y-0.5 animate-in fade-in">
            {DASH_STYLES.map((d) => (
              <button
                key={d.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { onChangeDash(d.id); setIsDashOpen(false); }}
                className={`w-full text-left px-2 py-1 text-xs rounded-lg cursor-pointer ${currentDash === d.id ? 'bg-amber-100 font-bold text-amber-900' : 'hover:bg-stone-100 text-stone-800'}`}
              >
                {d.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

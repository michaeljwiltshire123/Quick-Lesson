import React, { useState } from 'react';
import { ElementTextStyle } from '../../../types/slideTypes';
import { List, MoveVertical, MoveHorizontal, ChevronDown } from 'lucide-react';

interface SpacingAndBulletControlsProps {
  textStyle?: ElementTextStyle;
  onUpdateStyle: (patch: Partial<ElementTextStyle>) => void;
  onInsertBulletPrefix: (bulletSymbol: string) => void;
}

const BULLET_PRESETS = [
  { symbol: '• ', label: 'Standard Dot' },
  { symbol: '✓ ', label: 'Checkmark' },
  { symbol: '★ ', label: 'Star' },
  { symbol: '➔ ', label: 'Arrow' },
  { symbol: '💡 ', label: 'Lightbulb' },
  { symbol: '📌 ', label: 'Pin' },
];

export const SpacingAndBulletControls: React.FC<SpacingAndBulletControlsProps> = ({
  textStyle = {}, onUpdateStyle, onInsertBulletPrefix,
}) => {
  const [showBullets, setShowBullets] = useState(false);
  const [showSpacing, setShowSpacing] = useState(false);

  return (
    <div className="flex items-center gap-1">
      <div className="relative">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setShowBullets(!showBullets)}
          className="px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1 text-xs font-semibold cursor-pointer"
          title="Custom bullet icon picker"
        >
          <List className="w-3.5 h-3.5 text-amber-800" />
          <span className="text-[11px] hidden sm:inline">Bullets</span>
          <ChevronDown className="w-3 h-3 text-stone-400" />
        </button>
        {showBullets && (
          <div className="absolute right-0 top-full mt-1 w-40 p-1 bg-white rounded-xl shadow-xl border border-stone-200 z-50 space-y-0.5 animate-in fade-in">
            {BULLET_PRESETS.map((b) => (
              <button
                key={b.label}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { onInsertBulletPrefix(b.symbol); setShowBullets(false); }}
                className="w-full text-left px-2 py-1.5 text-xs font-medium hover:bg-amber-50 rounded-lg flex items-center gap-2 cursor-pointer text-stone-800"
              >
                <span className="text-amber-800 font-bold">{b.symbol}</span>
                <span>{b.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setShowSpacing(!showSpacing)}
          className="px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1 text-xs font-semibold cursor-pointer"
          title="Line & letter spacing options"
        >
          <MoveVertical className="w-3.5 h-3.5 text-amber-800" />
          <span className="text-[11px] hidden sm:inline">Spacing</span>
        </button>
        {showSpacing && (
          <div className="absolute right-0 top-full mt-1 w-52 p-2.5 bg-white rounded-xl shadow-xl border border-stone-200 z-50 space-y-2.5 animate-in fade-in text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-stone-700 text-[11px]">
                <span className="flex items-center gap-1"><MoveVertical className="w-3 h-3" /> Line Spacing</span>
                <span>{textStyle.lineHeight || 1.35}x</span>
              </div>
              <input
                type="range" min="1.0" max="2.2" step="0.1"
                value={textStyle.lineHeight || 1.35}
                onChange={(e) => onUpdateStyle({ lineHeight: parseFloat(e.target.value) })}
                className="w-full accent-amber-700 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-stone-700 text-[11px]">
                <span className="flex items-center gap-1"><MoveHorizontal className="w-3 h-3" /> Letter Spacing</span>
                <span>{textStyle.letterSpacing || 0}px</span>
              </div>
              <input
                type="range" min="0" max="4" step="0.5"
                value={textStyle.letterSpacing || 0}
                onChange={(e) => onUpdateStyle({ letterSpacing: parseFloat(e.target.value) })}
                className="w-full accent-amber-700 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

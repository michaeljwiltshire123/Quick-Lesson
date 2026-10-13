import React, { useState } from 'react';
import { ElementTextStyle } from '../../../types/slideTypes';
import { List, MoveVertical, MoveHorizontal } from 'lucide-react';

interface ToolbarSpacingAndBulletsProps {
  textStyle?: ElementTextStyle;
  onUpdateStyle: (patch: Partial<ElementTextStyle>) => void;
  onInsertBullet: (bulletSymbol: string) => void;
}

const BULLET_PRESETS = [
  { symbol: '• ', label: 'Standard Dot' },
  { symbol: '✓ ', label: 'Checkmark' },
  { symbol: '★ ', label: 'Star' },
  { symbol: '➔ ', label: 'Arrow' },
  { symbol: '💡 ', label: 'Lightbulb' },
  { symbol: '📌 ', label: 'Pin' },
];

export const ToolbarSpacingAndBullets: React.FC<ToolbarSpacingAndBulletsProps> = ({
  textStyle = {}, onUpdateStyle, onInsertBullet,
}) => {
  const [showBullets, setShowBullets] = useState(false);
  const [showSpacing, setShowSpacing] = useState(false);

  return (
    <div className="flex items-center gap-0.5">
      {/* Bullets Menu */}
      <div className="relative">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => { setShowBullets(!showBullets); setShowSpacing(false); }}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-stone-200/70 text-stone-700 cursor-pointer"
          title="Bulleted list options"
        >
          <List className="w-3.5 h-3.5" />
        </button>
        {showBullets && (
          <div className="absolute left-0 top-full mt-1 w-40 p-1 bg-white rounded-xl shadow-xl border border-stone-200 z-50 space-y-0.5 animate-in fade-in text-xs">
            {BULLET_PRESETS.map((b) => (
              <button
                key={b.label}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { onInsertBullet(b.symbol); setShowBullets(false); }}
                className="w-full text-left px-2 py-1.5 hover:bg-amber-50 rounded-lg flex items-center gap-2 cursor-pointer text-stone-800"
              >
                <span className="text-amber-800 font-bold">{b.symbol}</span>
                <span>{b.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Spacing Menu */}
      <div className="relative">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => { setShowSpacing(!showSpacing); setShowBullets(false); }}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-stone-200/70 text-stone-700 cursor-pointer"
          title="Line & letter spacing"
        >
          <MoveVertical className="w-3.5 h-3.5" />
        </button>
        {showSpacing && (
          <div className="absolute left-0 top-full mt-1 w-52 p-2.5 bg-white rounded-xl shadow-xl border border-stone-200 z-50 space-y-2.5 animate-in fade-in text-xs">
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

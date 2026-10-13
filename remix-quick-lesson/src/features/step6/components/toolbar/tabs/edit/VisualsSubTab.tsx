import React from 'react';
import { SlideElement, CanvasTheme } from '../../../../types/slideTypes';
import { applyInlineHighlight } from '../../../canvas/richTextFormatter';
import { Sparkles, Highlighter } from 'lucide-react';

interface VisualsSubTabProps {
  currentTheme?: Partial<CanvasTheme>;
  selectedElement?: SlideElement;
  onUpdateTheme: (theme: Partial<CanvasTheme>) => void;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
}

const HIGHLIGHT_COLORS = ['#FEF08A', '#A7F3D0', '#BAE6FD', '#FBCFE8', '#FED7AA'];

export const VisualsSubTab: React.FC<VisualsSubTabProps> = ({
  currentTheme, selectedElement, onUpdateTheme, onUpdateElement,
}) => {
  const isRainbow = Boolean((currentTheme as any)?.isRainbowHeader);

  const handleApplyHighlight = (col?: string) => {
    if (!selectedElement) return;
    const applied = applyInlineHighlight(col, selectedElement.id, (newContent) => {
      onUpdateElement({ content: newContent });
    });
    if (!applied) {
      onUpdateElement({ textStyle: { ...(selectedElement.textStyle || {}), highlight: col } });
    }
  };

  return (
    <div className="space-y-2.5 text-xs text-stone-700 animate-in fade-in pt-2">
      <div className="space-y-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl">
        <label className="font-bold text-stone-800 flex items-center justify-between cursor-pointer">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Rainbow Headers</span>
          </span>
          <input
            type="checkbox"
            checked={isRainbow}
            onChange={(e) => onUpdateTheme({ isRainbowHeader: e.target.checked } as any)}
            className="w-4 h-4 accent-amber-700 rounded cursor-pointer"
          />
        </label>
      </div>

      <div className="space-y-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl">
        <div className="font-bold text-stone-800 flex items-center gap-1.5">
          <Highlighter className="w-3.5 h-3.5 text-amber-700" />
          <span>Quick Text Highlight</span>
        </div>
        <div className="flex items-center gap-1.5 pt-1">
          {HIGHLIGHT_COLORS.map((col) => (
            <button
              key={col}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleApplyHighlight(col)}
              style={{ backgroundColor: col }}
              className="w-6 h-6 rounded-lg border border-stone-300 hover:scale-110 cursor-pointer shadow-2xs transition-transform"
              title={`Highlight selected words with ${col}`}
            />
          ))}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleApplyHighlight(undefined)}
            className="px-2 py-1 bg-stone-200 hover:bg-stone-300 rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

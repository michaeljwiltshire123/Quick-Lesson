import React from 'react';
import { SlideElement, CanvasTheme, ElementTextStyle } from '../../../../types/slideTypes';
import { applyInlineRainbow, hasActiveTextSelection, stripInlineStyles } from '../../../canvas/richTextFormatter';
import { Sparkles } from 'lucide-react';

interface VisualAidsStylingProps {
  currentTheme?: Partial<CanvasTheme>;
  selectedElement?: SlideElement;
  onUpdateTheme?: (theme: Partial<CanvasTheme>) => void;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
}

export const VisualAidsStyling: React.FC<VisualAidsStylingProps> = ({
  selectedElement, onUpdateElement,
}) => {
  const currentStyle = selectedElement?.textStyle || {};
  const isRainbow = Boolean(currentStyle.isRainbow);

  const handleRainbowText = () => {
    if (!selectedElement) return;
    if (hasActiveTextSelection()) {
      applyInlineRainbow(selectedElement.id, (newContent) => onUpdateElement({ content: newContent }));
    } else {
      const cleaned = stripInlineStyles(selectedElement.content || '', ['color']);
      onUpdateElement({ content: cleaned, textStyle: { ...currentStyle, isRainbow: !isRainbow } });
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="space-y-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl">
        <div className="flex items-center justify-between">
          <span className="font-bold text-stone-800 flex items-center gap-1.5 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span className="bg-gradient-to-r from-rose-500 via-amber-500 via-emerald-500 to-purple-600 bg-clip-text text-transparent font-extrabold">Rainbow Text</span>
          </span>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleRainbowText}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all border shadow-2xs ${isRainbow ? 'bg-gradient-to-r from-rose-500 via-amber-500 to-purple-600 text-white border-transparent' : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-300'}`}
            title="Rainbow colour highlighted text or entire text box"
          >
            {isRainbow ? 'Rainbow Active 🌈' : 'Apply Rainbow 🌈'}
          </button>
        </div>
      </div>
    </div>
  );
};

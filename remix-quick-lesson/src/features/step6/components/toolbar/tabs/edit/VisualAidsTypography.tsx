import React, { useState } from 'react';
import { SlideElement, ElementTextStyle } from '../../../../types/slideTypes';
import { FontAndCaseControls } from '../../../canvas/format/FontAndCaseControls';
import { StyleAndShadowControls } from '../../../canvas/format/StyleAndShadowControls';
import { getSelectedText, replaceSelectedTextWith, transformHtmlText } from '../../../canvas/richTextFormatter';
import { Type, Paintbrush } from 'lucide-react';

interface VisualAidsTypographyProps {
  selectedElement?: SlideElement;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
}

export const VisualAidsTypography: React.FC<VisualAidsTypographyProps> = ({
  selectedElement, onUpdateElement,
}) => {
  const [copiedStyle, setCopiedStyle] = useState<ElementTextStyle | null>(null);
  const currentStyle = selectedElement?.textStyle || {};

  const handleUpdateStyle = (patch: Partial<ElementTextStyle>) => {
    onUpdateElement({ textStyle: { ...currentStyle, ...patch } });
  };

  const handleConvertCase = (casing: 'uppercase' | 'lowercase' | 'capitalize') => {
    if (!selectedElement) return;
    const selText = getSelectedText();
    if (selText && selText.trim().length > 0) {
      let transformed = selText;
      if (casing === 'uppercase') transformed = selText.toUpperCase();
      else if (casing === 'lowercase') transformed = selText.toLowerCase();
      else if (casing === 'capitalize') transformed = selText.replace(/\b\w/g, (c) => c.toUpperCase());
      replaceSelectedTextWith(transformed, (newContent) => onUpdateElement({ content: newContent }));
      return;
    }

    const transformFn = (str: string) => {
      if (casing === 'uppercase') return str.toUpperCase();
      if (casing === 'lowercase') return str.toLowerCase();
      return str.replace(/\b\w/g, (c) => c.toUpperCase());
    };
    const transformed = transformHtmlText(selectedElement.content || '', transformFn);
    onUpdateElement({ content: transformed });
  };

  return (
    <div className="space-y-2.5">
      <div className="space-y-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl">
        <div className="font-bold text-stone-800 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5"><Type className="w-3.5 h-3.5 text-amber-700" />Fonts & Case</span>
          <span className="text-[10px] text-stone-500 font-normal">Dyslexia & Title</span>
        </div>
        <div className="flex flex-wrap items-center gap-1 pt-0.5">
          <FontAndCaseControls
            textStyle={currentStyle}
            onUpdateStyle={handleUpdateStyle}
            onConvertContentCase={handleConvertCase}
          />
        </div>
      </div>

      <div className="space-y-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl">
        <div className="font-bold text-stone-800 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5"><Paintbrush className="w-3.5 h-3.5 text-amber-700" />Format Painter & Shadow</span>
        </div>
        <div className="flex items-center gap-1 pt-0.5">
          <StyleAndShadowControls
            textStyle={currentStyle}
            onUpdateStyle={handleUpdateStyle}
            onUpdateContent={(content) => onUpdateElement({ content })}
            copiedStyle={copiedStyle}
            onCopyStyle={(st) => setCopiedStyle(st)}
            onPasteStyle={() => copiedStyle && handleUpdateStyle(copiedStyle)}
          />
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SlideElement, ElementTextStyle } from '../../../types/slideTypes';
import { FontAndCaseControls } from './FontAndCaseControls';
import { StyleAndShadowControls } from './StyleAndShadowControls';
import { SpacingAndBulletControls } from './SpacingAndBulletControls';
import { QuickAlignmentControls } from './QuickAlignmentControls';

interface ContextualFormatBarProps {
  element: SlideElement;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
}

export const ContextualFormatBar: React.FC<ContextualFormatBarProps> = ({
  element, onUpdateElement,
}) => {
  const [copiedStyle, setCopiedStyle] = useState<ElementTextStyle | null>(null);
  const currentStyle = element.textStyle || {};

  const handleUpdateStyle = (patch: Partial<ElementTextStyle>) => {
    onUpdateElement({ textStyle: { ...currentStyle, ...patch } });
  };

  const handleConvertCase = (casing: 'uppercase' | 'lowercase' | 'capitalize') => {
    let text = element.content || '';
    if (casing === 'uppercase') text = text.toUpperCase();
    else if (casing === 'lowercase') text = text.toLowerCase();
    else if (casing === 'capitalize') {
      text = text.replace(/\b\w/g, (char) => char.toUpperCase());
    }
    onUpdateElement({ content: text });
  };

  const handleInsertBullet = (symbol: string) => {
    const lines = (element.content || '').split('\n');
    const bulleted = lines.map((line) => (line.trim().startsWith(symbol.trim()) ? line : `${symbol}${line}`)).join('\n');
    onUpdateElement({ content: bulleted });
  };

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 px-2.5 py-1.5 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-300 shadow-xl text-xs text-stone-800 animate-in fade-in zoom-in-95 pointer-events-auto"
    >
      <FontAndCaseControls
        textStyle={currentStyle}
        onUpdateStyle={handleUpdateStyle}
        onConvertContentCase={handleConvertCase}
      />
      <QuickAlignmentControls
        textStyle={currentStyle}
        onUpdateStyle={handleUpdateStyle}
      />
      <StyleAndShadowControls
        textStyle={currentStyle}
        onUpdateStyle={handleUpdateStyle}
        copiedStyle={copiedStyle}
        onCopyStyle={(st) => setCopiedStyle(st)}
        onPasteStyle={() => copiedStyle && handleUpdateStyle(copiedStyle)}
      />
      <SpacingAndBulletControls
        textStyle={currentStyle}
        onUpdateStyle={handleUpdateStyle}
        onInsertBulletPrefix={handleInsertBullet}
      />
    </div>
  );
};

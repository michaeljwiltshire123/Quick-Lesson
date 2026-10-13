import React from 'react';
import { SlideElement, CanvasTheme } from '../../../../types/slideTypes';
import { stripInlineStyles } from '../../../canvas/richTextFormatter';
import { VisualAidsTypography } from './VisualAidsTypography';
import { TextEffectsControls } from './TextEffectsControls';
import { VisualAidsStyling } from './VisualAidsStyling';
import { BreakListControl } from './BreakListControl';

interface VisualAidsTabProps {
  currentTheme?: Partial<CanvasTheme>;
  selectedElement?: SlideElement;
  onUpdateTheme: (theme: Partial<CanvasTheme>) => void;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
  onReplaceElement?: (newElement: SlideElement) => void;
  onSplitElement?: (elements: SlideElement[]) => void;
}

export const VisualAidsTab: React.FC<VisualAidsTabProps> = ({
  currentTheme, selectedElement, onUpdateTheme, onUpdateElement, onSplitElement,
}) => {
  const currentStyle = (selectedElement?.textStyle || {}) as any;

  const handleUpdateStyle = (patch: Record<string, any>) => {
    let content = selectedElement?.content || '';
    if (patch.ribbonGradient && patch.ribbonGradient !== 'none') {
      content = stripInlineStyles(content, ['color']);
    }
    if (patch.is3DBlock) {
      content = stripInlineStyles(content, ['textShadow']);
    }
    onUpdateElement({ content, textStyle: { ...currentStyle, ...patch } });
  };

  return (
    <div className="space-y-2 text-xs text-stone-700 animate-in fade-in pt-1.5">
      <BreakListControl
        selectedElement={selectedElement}
        onSplitElement={onSplitElement}
      />
      <VisualAidsTypography
        selectedElement={selectedElement}
        onUpdateElement={onUpdateElement}
      />
      <TextEffectsControls
        textStyle={currentStyle}
        onUpdateStyle={handleUpdateStyle}
      />
      <VisualAidsStyling
        currentTheme={currentTheme}
        selectedElement={selectedElement}
        onUpdateTheme={onUpdateTheme}
        onUpdateElement={onUpdateElement}
      />
    </div>
  );
};

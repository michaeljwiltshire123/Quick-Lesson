import React from 'react';
import { SlideElement, CanvasTheme, SlideItem } from '../../../types/slideTypes';
import { GoogleSlidesMotionPanel } from './anim/motion/GoogleSlidesMotionPanel';

interface AnimationsTabProps {
  currentTheme?: Partial<CanvasTheme>;
  selectedElement?: SlideElement;
  elements?: SlideElement[];
  slides?: SlideItem[];
  activeSlideId?: string;
  selectedElementId?: string | null;
  selectedElementIds?: string[];
  onSelectElementId?: (id: string | null) => void;
  onSelectElementIds?: (ids: string[]) => void;
  onUpdateTheme: (theme: Partial<CanvasTheme>) => void;
  onApplyThemeToAll?: (theme: Partial<CanvasTheme>) => void;
  onUpdateElementMeta?: (meta: Record<string, any>) => void;
  onUpdateElements?: (elements: SlideElement[]) => void;
  onInsertElement?: (element: SlideElement) => void;
  onUpdateAllSlides?: (slides: SlideItem[]) => void;
}

export const AnimationsTab: React.FC<AnimationsTabProps> = ({
  currentTheme, elements = [],
  selectedElementId, selectedElementIds, onSelectElementId, onSelectElementIds,
  onUpdateTheme, onApplyThemeToAll, onUpdateElements,
}) => {
  return (
    <div className="text-xs text-stone-700 animate-in fade-in">
      <GoogleSlidesMotionPanel
        currentTheme={currentTheme}
        elements={elements}
        selectedElementId={selectedElementId}
        selectedElementIds={selectedElementIds}
        onSelectElementId={onSelectElementId}
        onSelectElementIds={onSelectElementIds}
        onUpdateTheme={onUpdateTheme}
        onApplyThemeToAll={onApplyThemeToAll}
        onUpdateElements={onUpdateElements}
      />
    </div>
  );
};

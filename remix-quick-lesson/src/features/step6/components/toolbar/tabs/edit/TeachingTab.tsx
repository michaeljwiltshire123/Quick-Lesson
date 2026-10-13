import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { SchoolCrestWatermarkControl } from './SchoolCrestWatermarkControl';
import { TeachingScaffoldingTools } from './TeachingScaffoldingTools';

interface TeachingTabProps {
  selectedElement?: SlideElement;
  existingCrest?: SlideElement;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
  onInsertElement?: (newElement: SlideElement) => void;
  onAddCrestToAllSlides?: (crestElement: SlideElement) => void;
  onRemoveCrestFromAllSlides?: () => void;
  onUpdateCrestOpacity?: (opacity: number) => void;
  onToggleCrestLock?: (isLocked: boolean) => void;
}

export const TeachingTab: React.FC<TeachingTabProps> = ({
  selectedElement, existingCrest, onUpdateElement,
  onAddCrestToAllSlides, onRemoveCrestFromAllSlides, onUpdateCrestOpacity, onToggleCrestLock,
}) => {
  return (
    <div className="space-y-2 text-xs text-stone-700 animate-in fade-in pt-1.5">
      <SchoolCrestWatermarkControl
        existingCrest={existingCrest}
        onAddCrestToAllSlides={onAddCrestToAllSlides}
        onRemoveCrestFromAllSlides={onRemoveCrestFromAllSlides}
        onUpdateCrestOpacity={onUpdateCrestOpacity}
        onToggleCrestLock={onToggleCrestLock}
      />
      <TeachingScaffoldingTools
        selectedElement={selectedElement}
        onUpdateContent={(c) => onUpdateElement({ content: c })}
      />
    </div>
  );
};

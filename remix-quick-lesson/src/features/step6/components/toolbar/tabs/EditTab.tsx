import React, { useState } from 'react';
import { SlideElement, CanvasTheme } from '../../../types/slideTypes';
import { EditSubTabHeader, EditSubTabType } from './edit/EditSubTabHeader';
import { VisualAidsTab } from './edit/VisualAidsTab';
import { TeachingTab } from './edit/TeachingTab';
import { JoyDockTab } from './edit/JoyDockTab';

interface EditTabProps {
  currentTheme?: Partial<CanvasTheme>;
  selectedElement?: SlideElement;
  existingCrest?: SlideElement;
  onUpdateTheme: (theme: Partial<CanvasTheme>) => void;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
  onInsertElement: (newElement: SlideElement) => void;
  onReplaceElement?: (newElement: SlideElement) => void;
  onSplitElement?: (elements: SlideElement[]) => void;
  onAddCrestToAllSlides?: (crestElement: SlideElement) => void;
  onRemoveCrestFromAllSlides?: () => void;
  onUpdateCrestOpacity?: (opacity: number) => void;
  onToggleCrestLock?: (isLocked: boolean) => void;
}

export const EditTab: React.FC<EditTabProps> = ({
  currentTheme, selectedElement, existingCrest, onUpdateTheme, onUpdateElement, onInsertElement, onReplaceElement,
  onSplitElement, onAddCrestToAllSlides, onRemoveCrestFromAllSlides, onUpdateCrestOpacity, onToggleCrestLock,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<EditSubTabType>('visual_aids');

  return (
    <div className="space-y-1 text-xs text-stone-700 animate-in fade-in">
      <EditSubTabHeader
        activeSubTab={activeSubTab}
        onChangeSubTab={setActiveSubTab}
      />

      <div className="pt-0.5">
        {activeSubTab === 'visual_aids' && (
          <VisualAidsTab
            currentTheme={currentTheme}
            selectedElement={selectedElement}
            onUpdateTheme={onUpdateTheme}
            onUpdateElement={onUpdateElement}
            onReplaceElement={onReplaceElement}
            onSplitElement={onSplitElement}
          />
        )}
        {activeSubTab === 'teaching' && (
          <TeachingTab
            selectedElement={selectedElement}
            existingCrest={existingCrest}
            onUpdateElement={onUpdateElement}
            onInsertElement={onInsertElement}
            onAddCrestToAllSlides={onAddCrestToAllSlides}
            onRemoveCrestFromAllSlides={onRemoveCrestFromAllSlides}
            onUpdateCrestOpacity={onUpdateCrestOpacity}
            onToggleCrestLock={onToggleCrestLock}
          />
        )}
        {activeSubTab === 'joy_dock' && (
          <JoyDockTab
            selectedElement={selectedElement}
            onUpdateElement={onUpdateElement}
            onInsertElement={onInsertElement}
          />
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SlideElement, SlideItem } from '../../../../types/slideTypes';
import { ElementAnimationLauncherCard } from './ElementAnimationLauncherCard';
import { ElementAnimationStudioModal } from './ElementAnimationStudioModal';
import { ActiveElementRulesList } from './ActiveElementRulesList';
import { AnimationOrderPanel } from './AnimationOrderPanel';

interface ElementContextualAnimationInspectorProps {
  selectedElement: SlideElement;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
  elements?: SlideElement[];
  onUpdateElements?: (elements: SlideElement[]) => void;
  selectedElementId?: string | null;
  onSelectElementId?: (id: string | null) => void;
  activeSlide?: SlideItem;
}

export const ElementContextualAnimationInspector: React.FC<ElementContextualAnimationInspectorProps> = ({
  selectedElement,
  onUpdateElementMeta,
  elements = [],
  onUpdateElements = () => {},
  selectedElementId = null,
  onSelectElementId = () => {},
  activeSlide,
}) => {
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  return (
    <div className="space-y-3 text-xs text-stone-700 animate-in fade-in">
      <ElementAnimationLauncherCard
        element={selectedElement}
        onOpenStudio={() => setIsStudioOpen(true)}
        onUpdateElementMeta={onUpdateElementMeta}
      />

      <ActiveElementRulesList
        element={selectedElement}
        onUpdateElementMeta={onUpdateElementMeta}
      />

      {elements.length > 0 && onUpdateElements && (
        <AnimationOrderPanel
          elements={elements}
          selectedElementId={selectedElementId}
          onSelectElementId={onSelectElementId}
          onUpdateElements={onUpdateElements}
        />
      )}

      <ElementAnimationStudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        elements={elements}
        selectedElementId={selectedElementId}
        onSelectElementId={(id) => onSelectElementId(id)}
        onUpdateElements={onUpdateElements}
        onUpdateElementMeta={onUpdateElementMeta}
        activeSlide={activeSlide}
      />
    </div>
  );
};

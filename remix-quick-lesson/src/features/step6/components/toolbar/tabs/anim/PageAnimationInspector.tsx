import React, { useState } from 'react';
import { CanvasTheme, SlideElement, SlideItem } from '../../../../types/slideTypes';
import { ActivePageRulesCard } from './ActivePageRulesCard';
import { SlideTransitionLauncherCard } from './SlideTransitionLauncherCard';
import { LiveLessonTransitionsModal } from './LiveLessonTransitionsModal';
import { MousePointerClick } from 'lucide-react';
import {
  applyPairedTransitionToSlideDeck,
  getMatchingEntryTransition,
  getMatchingExitTransition,
} from '../../../../utils/transitionPairingUtils';

interface PageAnimationInspectorProps {
  currentTheme?: Partial<CanvasTheme>;
  slides?: SlideItem[];
  activeSlideId?: string;
  onUpdateTheme: (theme: Partial<CanvasTheme>) => void;
  onApplyThemeToAll?: (theme: Partial<CanvasTheme>) => void;
  onUpdateAllSlides?: (slides: SlideItem[]) => void;
  onInsertElement?: (element: SlideElement) => void;
}

export const PageAnimationInspector: React.FC<PageAnimationInspectorProps> = ({
  currentTheme, slides = [], activeSlideId,
  onUpdateTheme, onApplyThemeToAll, onUpdateAllSlides,
}) => {
  const [isTransitionsModalOpen, setIsTransitionsModalOpen] = useState(false);

  const handleApplyTransition = (transitionId: string, applyToAll: boolean, isExit?: boolean) => {
    const targetIdx = activeSlideId ? slides.findIndex((s) => s.id === activeSlideId) : 0;
    const safeIdx = targetIdx >= 0 ? targetIdx : 0;

    if (onUpdateAllSlides && slides.length > 0) {
      const updated = applyPairedTransitionToSlideDeck(
        slides,
        safeIdx,
        transitionId,
        Boolean(isExit),
        applyToAll
      );
      onUpdateAllSlides(updated);
      return;
    }

    if (applyToAll) {
      const entryId = isExit ? getMatchingEntryTransition(transitionId) : transitionId;
      const exitId = isExit ? transitionId : getMatchingExitTransition(transitionId);
      if (onApplyThemeToAll) onApplyThemeToAll({ transitionEffect: entryId, pageExitEffect: exitId });
      else onUpdateTheme({ transitionEffect: entryId, pageExitEffect: exitId } as any);
    } else {
      const key = isExit ? 'pageExitEffect' : 'transitionEffect';
      onUpdateTheme({ [key]: transitionId } as any);
    }
  };

  const handleClearTransition = () => {
    handleApplyTransition('none', false, false);
  };

  return (
    <div className="space-y-3 text-xs text-stone-700 animate-in fade-in">
      <ActivePageRulesCard
        currentTheme={currentTheme}
        onUpdateTheme={onUpdateTheme}
      />

      <div className="p-2.5 bg-amber-50/90 border border-amber-200/90 rounded-2xl text-stone-800 space-y-1 shadow-2xs">
        <div className="font-extrabold text-amber-950 flex items-center gap-1.5 text-xs">
          <MousePointerClick className="w-4 h-4 text-amber-700" />
          <span>Page Transitions</span>
        </div>
        <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
          Select any element on the canvas to configure element-level animations, or use the launcher below for whole-slide transitions.
        </p>
      </div>

      <SlideTransitionLauncherCard
        currentTheme={currentTheme}
        onOpenTransitionsModal={() => setIsTransitionsModalOpen(true)}
        onClearTransition={handleClearTransition}
      />

      <LiveLessonTransitionsModal
        isOpen={isTransitionsModalOpen}
        onClose={() => setIsTransitionsModalOpen(false)}
        onApplyTransition={handleApplyTransition}
      />
    </div>
  );
};

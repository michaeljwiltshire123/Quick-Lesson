import React, { useState } from 'react';
import { SlideItem, SlideElement, CanvasTheme } from '../../types/slideTypes';
import { DeckTranslatorControl } from './DeckTranslatorControl';
import { LogoManagerModal } from './LogoManagerModal';
import { LiveLessonTransitionsModal } from '../toolbar/tabs/anim/LiveLessonTransitionsModal';
import { ThemePresetsModal } from './theme/ThemePresetsModal';
import { applyPairedTransitionToSlideDeck } from '../../utils/transitionPairingUtils';
import { Play, Timer, RefreshCw, ShieldCheck, Film, Palette } from 'lucide-react';

interface GoogleSlidesInsertBarProps {
  slides?: SlideItem[];
  activeSlide?: SlideItem;
  activeSlideIndex?: number;
  elements?: SlideElement[];
  existingCrest?: SlideElement;
  onInsertElement: (newElement: SlideElement) => void;
  onApplyLayoutTemplate: (templateName: string) => void;
  onCycleLayout?: () => void;
  onOpenTimers?: () => void;
  onOpenPresent: () => void;
  onUpdateActiveSlide?: (patch: Partial<SlideItem>) => void;
  onUpdateAllSlides?: (newSlides: SlideItem[]) => void;
  onAddCrestToAllSlides?: (crestElement: SlideElement) => void;
  onRemoveCrestFromAllSlides?: () => void;
  onUpdateCrestOpacity?: (opacity: number) => void;
  onToggleCrestLock?: (isLocked: boolean) => void;
}

export const GoogleSlidesInsertBar: React.FC<GoogleSlidesInsertBarProps> = ({
  slides = [], activeSlide, activeSlideIndex = 0, existingCrest, onCycleLayout,
  onOpenTimers, onOpenPresent, onUpdateActiveSlide, onUpdateAllSlides,
  onAddCrestToAllSlides, onRemoveCrestFromAllSlides, onUpdateCrestOpacity, onToggleCrestLock,
}) => {
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isTransitionsModalOpen, setIsTransitionsModalOpen] = useState(false);
  const [isThemesModalOpen, setIsThemesModalOpen] = useState(false);

  const handleApplyTransition = (transitionId: string, applyToAll: boolean, isExit?: boolean) => {
    if (onUpdateAllSlides && slides.length > 0) {
      onUpdateAllSlides(applyPairedTransitionToSlideDeck(slides, activeSlideIndex, transitionId, Boolean(isExit), applyToAll));
    } else if (onUpdateActiveSlide && activeSlide) {
      const key = isExit ? 'pageExitEffect' : 'transitionEffect';
      onUpdateActiveSlide({ theme: { ...(activeSlide.theme || {}), [key]: transitionId } });
    }
  };

  const handleApplyTheme = (theme: Partial<CanvasTheme>, applyToAll: boolean) => {
    if (applyToAll && onUpdateAllSlides && slides.length > 0) {
      onUpdateAllSlides(slides.map((s) => ({ ...s, theme: { ...(s.theme || {}), ...theme } })));
    } else if (onUpdateActiveSlide && activeSlide) {
      onUpdateActiveSlide({ theme: { ...(activeSlide.theme || {}), ...theme } });
    }
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-2 p-2 bg-white rounded-2xl border border-stone-200 shadow-xs text-xs font-semibold">
      <div className="flex items-center flex-wrap gap-1.5 relative">
        <button type="button" onClick={() => setIsLogoModalOpen(true)} className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5 cursor-pointer">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> Add Logo
        </button>
        <button type="button" onClick={() => setIsThemesModalOpen(true)} className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 flex items-center gap-1.5 cursor-pointer font-bold">
          <Palette className="w-3.5 h-3.5 text-amber-700" /> Themes
        </button>
        <button type="button" onClick={() => setIsTransitionsModalOpen(true)} className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 flex items-center gap-1.5 cursor-pointer font-bold">
          <Film className="w-3.5 h-3.5 text-amber-700" /> Page Animations
        </button>
        <button type="button" onClick={onOpenTimers} className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 flex items-center gap-1.5 cursor-pointer font-bold">
          <Timer className="w-3.5 h-3.5 text-amber-700" /> Timers
        </button>
        {onCycleLayout && (
          <button type="button" onClick={onCycleLayout} className="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 flex items-center gap-1 cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5 text-amber-700" /> Smart Layout
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {onUpdateAllSlides && <DeckTranslatorControl slides={slides} onUpdateAllSlides={onUpdateAllSlides} />}
        <button type="button" onClick={onOpenPresent} className="px-3.5 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold flex items-center gap-1.5 shadow-sm cursor-pointer">
          <Play className="w-3.5 h-3.5" /> Present
        </button>
      </div>

      <LogoManagerModal isOpen={isLogoModalOpen} existingCrest={existingCrest} onClose={() => setIsLogoModalOpen(false)} onAddCrestToAllSlides={onAddCrestToAllSlides} onRemoveCrestFromAllSlides={onRemoveCrestFromAllSlides} onUpdateCrestOpacity={onUpdateCrestOpacity} onToggleCrestLock={onToggleCrestLock} />
      <ThemePresetsModal isOpen={isThemesModalOpen} onClose={() => setIsThemesModalOpen(false)} onApplyTheme={handleApplyTheme} />
      <LiveLessonTransitionsModal isOpen={isTransitionsModalOpen} onClose={() => setIsTransitionsModalOpen(false)} onApplyTransition={handleApplyTransition} />
    </div>
  );
};

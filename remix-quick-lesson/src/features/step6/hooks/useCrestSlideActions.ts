import { SlideItem, SlideElement } from '../types/slideTypes';

interface UseCrestSlideActionsOptions {
  slides: SlideItem[];
  onUpdateAllSlides: (slides: SlideItem[]) => void;
}

export function useCrestSlideActions({ slides, onUpdateAllSlides }: UseCrestSlideActionsOptions) {
  const handleAddCrestToAll = (crest: SlideElement) => {
    onUpdateAllSlides(slides.map((s) => ({
      ...s,
      elements: [
        ...s.elements.filter((e) => !e.meta?.isSchoolCrest && !e.meta?.isSchoolLogo),
        {
          ...crest,
          id: `el-crest-${s.id}`,
          meta: {
            ...(crest.meta || {}),
            isSchoolCrest: true,
            isSchoolLogo: true,
            linkToSlideId: 'slide-aims-outcomes',
            isAimsReturnAnchor: true,
          },
        },
      ],
    })));
  };

  const handleRemoveCrestFromAll = () => {
    onUpdateAllSlides(slides.map((s) => ({ ...s, elements: s.elements.filter((e) => !e.meta?.isSchoolCrest && !e.meta?.isSchoolLogo) })));
  };

  const handleUpdateCrestOpacity = (opacity: number) => {
    onUpdateAllSlides(slides.map((s) => ({
      ...s,
      elements: s.elements.map((el) => (el.meta?.isSchoolCrest || el.meta?.isSchoolLogo ? { ...el, meta: { ...(el.meta || {}), opacity } } : el)),
    })));
  };

  const handleToggleCrestLock = (isLocked: boolean) => {
    onUpdateAllSlides(slides.map((s) => ({
      ...s,
      elements: s.elements.map((el) => (el.meta?.isSchoolCrest || el.meta?.isSchoolLogo ? { ...el, meta: { ...(el.meta || {}), isLocked } } : el)),
    })));
  };

  return {
    handleAddCrestToAll,
    handleRemoveCrestFromAll,
    handleUpdateCrestOpacity,
    handleToggleCrestLock,
  };
}

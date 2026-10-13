import React, { useState } from 'react';
import { SlideItem, SlideElement } from '../../types/slideTypes';
import { GoogleSlidesMasterToolbar } from './toolbar/GoogleSlidesMasterToolbar';
import { CanvasAlignmentGuides } from './CanvasAlignmentGuides';
import { SlideHeaderTitleInput } from './SlideHeaderTitleInput';
import { CanvasElementsLayer } from './CanvasElementsLayer';
import { CanvasMotionPlaybackOverlay } from './motion/CanvasMotionPlaybackOverlay';
import { AimsOutcomesLayer } from './layers/AimsOutcomesLayer';
import { CognitiveLoadBadge } from './CognitiveLoadBadge';
import { ActiveSlideCanvasModals } from './ActiveSlideCanvasModals';
import { useCanvasInteraction } from './useCanvasInteraction';
import { useMotionPlayback } from '../../hooks/useMotionPlayback';
import { handleCanvasDropFile } from './CanvasPasteDropHandler';
import { getAspectRatioStyle, getCanvasPatternBackground } from './canvasUtils';
import { getAimsAndOutcomesSlideIndex } from '../../utils/slideNavigationUtils';
import { CanvasDrawingOverlay } from './drawing/CanvasDrawingOverlay';
import { useCanvasClipboard } from '../../hooks/useCanvasClipboard';

interface ActiveSlideCanvasProps {
  slide: SlideItem; slides?: SlideItem[]; slideNumber?: number; selectedElementId?: string | null; selectedElementIds?: string[];
  onSelectElementId?: (id: string | null) => void; onSelectElementIds?: (ids: string[]) => void; onSelectSlide?: (index: number) => void;
  canUndo?: boolean; canRedo?: boolean; onUndo?: () => void; onRedo?: () => void;
  onUpdateTitle: (title: string) => void; onUpdateSubtitle: (sub: string) => void;
  onUpdateElements: (elements: SlideElement[]) => void;
}

export const ActiveSlideCanvas: React.FC<ActiveSlideCanvasProps> = ({
  slide, slides, selectedElementId, selectedElementIds, onSelectElementId, onSelectElementIds, onSelectSlide, canUndo, canRedo, onUndo, onRedo,
  onUpdateTitle, onUpdateSubtitle, onUpdateElements,
}) => {
  const [cropElementId, setCropElementId] = useState<string | null>(null);
  const [translateElementId, setTranslateElementId] = useState<string | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const { isPlaying, step, maxStep, advanceStep } = useMotionPlayback();

  const uniqueElements = slide.elements.filter((el, idx, arr) => {
    const firstIdx = arr.findIndex((o) => Math.abs(o.x - el.x) < 2 && Math.abs(o.y - el.y) < 2 && o.type === el.type);
    return firstIdx === idx;
  });

  const { selectedId, setSelectedId, selectedElementIds: activeSelectedIds, handleSelect, aspectRatio, isGridVisible, snapGuides, containerRef, startDrag, start8WayResize } =
    useCanvasInteraction(uniqueElements, onUpdateElements, selectedElementId, onSelectElementId, selectedElementIds, onSelectElementIds);

  const selectedEl = selectedId ? uniqueElements.find((e) => e.id === selectedId) : undefined;
  useCanvasClipboard(uniqueElements, activeSelectedIds, onUpdateElements, onSelectElementIds || (() => {}));
  const isTitle = slide.archetype === 'title';
  const isAims = slide.archetype === 'aims_outcomes' || slide.id === 'slide-aims-outcomes' || slide.title?.toLowerCase().includes('aims');
  const aimsIndex = slides ? getAimsAndOutcomesSlideIndex(slides) : 1;
  const handleContentUpdate = (id: string, c: string) => {
    const updated = uniqueElements.map((e) => (e.id === id ? { ...e, content: c } : e));
    if (isTitle && id === 'el-title-h1') onUpdateTitle(c.replace(/<[^>]*>/g, '').trim());
    else if (isTitle && id === 'el-title-sub') onUpdateSubtitle(c.replace(/<[^>]*>/g, '').trim());
    onUpdateElements(updated);
  };

  return (
    <section aria-label="Interactive Slide Canvas" className="space-y-2">
      <GoogleSlidesMasterToolbar
        selectedElement={selectedEl} canUndo={canUndo} canRedo={canRedo} onUndo={onUndo} onRedo={onRedo}
        onInsertText={() => onUpdateElements([...uniqueElements, { id: `el-txt-${Date.now()}`, type: 'text', x: 10, y: 25, width: 80, height: 40, content: 'New text note...' }])}
        onInsertShape={() => onUpdateElements([...uniqueElements, { id: `el-shp-${Date.now()}`, type: 'shape', shapeType: 'rounded', x: 25, y: 25, width: 50, height: 40, content: 'Concept Box', fillColor: '#FEF3C7', borderColor: '#D97706', borderWidth: 2 }])}
        onInsertConnector={() => onUpdateElements([...uniqueElements, { id: `el-cnt-${Date.now()}`, type: 'text', x: 30, y: 55, width: 40, height: 15, content: '──► Relates To', textStyle: { bold: true, align: 'center' } }])}
        onUpdateElement={(patch) => selectedId && onUpdateElements(uniqueElements.map((e) => (e.id === selectedId ? { ...e, ...patch } : e)))}
        onOpenCrop={() => selectedEl && setCropElementId(cropElementId === selectedEl.id ? null : selectedEl.id)}
        onResetOrReplaceImage={() => selectedEl && onUpdateElements(uniqueElements.map((e) => (e.id === selectedEl.id ? { ...e, crop: undefined, meta: { ...(e.meta || {}), maskShape: 'standard' } } : e)))}
        onAddComment={() => selectedEl && onUpdateElements(uniqueElements.map((e) => (e.id === selectedId ? { ...e, content: `${selectedEl.content || ''}\n💬 Note: Teacher reflection` } : e)))}
        onToggleDraw={() => setIsDrawingMode(!isDrawingMode)} isDrawingActive={isDrawingMode}
      />

      <div
        ref={containerRef} onClick={() => !isPlaying && setSelectedId(null)}
        onDrop={(e) => handleCanvasDropFile(e, (newEl) => onUpdateElements([...uniqueElements, newEl]))} onDragOver={(e) => e.preventDefault()}
        style={{ backgroundColor: slide.theme?.backgroundColor || '#FAF9F5', color: slide.theme?.textColor || '#1C1917', fontFamily: slide.theme?.fontFamily || 'inherit', lineHeight: slide.theme?.lineHeight || 1.35, backgroundImage: getCanvasPatternBackground((slide.theme as any)?.backgroundPattern, isGridVisible, false), backgroundSize: '20px 20px' }}
        className={`relative w-full ${getAspectRatioStyle(aspectRatio)} mx-auto rounded-none sm:rounded-xs border border-stone-300 shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden select-none transition-all ${isPlaying ? 'ring-2 ring-amber-400' : ''}`}
      >
        <CanvasAlignmentGuides showVerticalCenter={snapGuides.v} showHorizontalCenter={snapGuides.h} />
        <div className="relative z-10 px-8 pt-5 pb-1 pointer-events-auto">
          <SlideHeaderTitleInput title={slide.title} subtitle={slide.subtitle} isTitleArchetype={isTitle} isRainbowHeader={Boolean((slide.theme as any)?.isRainbowHeader)} onUpdateTitle={onUpdateTitle} onUpdateSubtitle={onUpdateSubtitle} />
          {isAims && slides && onSelectSlide && <AimsOutcomesLayer slides={slides} onJumpToSlide={onSelectSlide} />}
        </div>

        <CanvasElementsLayer
          elements={isAims ? uniqueElements.filter((element) => !element.id.startsWith('el-aims-')) : uniqueElements}
          selectedIds={activeSelectedIds} cropElementId={cropElementId} isPlaying={isPlaying} step={step}
          containerRef={containerRef} onSelect={(id, e) => !isPlaying && handleSelect(id, e)} onDoneCrop={() => setCropElementId(null)}
          onUpdateContent={handleContentUpdate}
          onUpdateElement={(id, p) => onUpdateElements(uniqueElements.map((e) => (e.id === id ? { ...e, ...p } : e)))}
          onStartDrag={(e, id) => !isPlaying && startDrag(e, id)} onStartResize={(e, id, dir) => !isPlaying && start8WayResize(e, id, dir)}
          onJumpToAims={onSelectSlide ? () => onSelectSlide(aimsIndex) : undefined}
        />

        {isPlaying && <CanvasMotionPlaybackOverlay transitionEffect={slide.theme?.transitionEffect} step={step} maxStep={maxStep} onAdvance={advanceStep} />}
        {isDrawingMode && <CanvasDrawingOverlay elements={uniqueElements} onUpdateElements={onUpdateElements} onClose={() => setIsDrawingMode(false)} />}
      </div>

      <CognitiveLoadBadge elements={uniqueElements} />
      <ActiveSlideCanvasModals translateText={translateElementId ? uniqueElements.find((e) => e.id === translateElementId)?.content : undefined} onCloseTranslate={() => setTranslateElementId(null)} onApplyTranslation={(tr) => translateElementId && onUpdateElements(uniqueElements.map((e) => (e.id === translateElementId ? { ...e, content: tr } : e)))} />
    </section>
  );
};

import React, { CSSProperties } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { CanvasTextElement } from './CanvasTextElement';
import { CanvasMediaElement } from './CanvasMediaElement';
import { CanvasPollElement } from '../poll/CanvasPollElement';
import { CanvasShapeElement } from './CanvasShapeElement';
import { CanvasTableElement } from './CanvasTableElement';
import { CanvasTimerElement } from './CanvasTimerElement';
import { CanvasPupilWheelElement } from '../joy/CanvasPupilWheelElement';
import { CanvasApplauseMeterElement } from '../joy/CanvasApplauseMeterElement';
import { CanvasMysteryBoxElement } from '../joy/CanvasMysteryBoxElement';
import { CanvasSpotlightElement } from '../joy/CanvasSpotlightElement';
import { CanvasDrawingRenderer } from './drawing/CanvasDrawingRenderer';
import { ResizeDirection } from './resizeHandler';

interface CanvasElementRendererProps {
  element: SlideElement;
  isSelected: boolean;
  isCropping?: boolean;
  containerRect?: DOMRect | null;
  animClass?: string;
  animStyle?: CSSProperties;
  onSelect: (e?: React.MouseEvent) => void;
  onUpdateContent: (content: string) => void;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
  onStartDrag: (e: React.PointerEvent | React.MouseEvent) => void;
  onStartResize: (e: React.MouseEvent, dir: ResizeDirection) => void;
  onDoneCrop?: () => void;
  onJumpToAims?: () => void;
  isLivePresentation?: boolean;
}

export const CanvasElementRenderer: React.FC<CanvasElementRendererProps> = ({
  element, isSelected, isCropping, containerRect, animClass, animStyle, onSelect, onUpdateContent, onUpdateElement,
  onStartDrag, onStartResize, onDoneCrop, onJumpToAims, isLivePresentation = false,
}) => {
  const meta = element.meta || {};
  const drag = onStartDrag as (e: React.MouseEvent) => void;
  const localElement = { ...element, x: 0, y: 0, width: 100, height: 100 };
  const renderSpecial = (content: React.ReactNode) => (
    <div
      style={{ left: `${element.x}%`, top: `${element.y}%`, width: `${element.width}%`, height: `${element.height}%`, ...animStyle }}
      className={`absolute ${animClass || ''}`}
    >
      {content}
    </div>
  );

  if (meta.isDrawingLayer) return renderSpecial(<CanvasDrawingRenderer element={localElement} />);
  if (meta.isSpotlightBeam) return renderSpecial(<CanvasSpotlightElement element={localElement} isSelected={isSelected} onSelect={() => onSelect()} onUpdateElement={onUpdateElement} onStartDrag={drag} onStartResize={onStartResize} />);
  if (meta.isMysteryBox) return renderSpecial(<CanvasMysteryBoxElement element={localElement} isSelected={isSelected} onSelect={() => onSelect()} onUpdateElement={onUpdateElement} onStartDrag={drag} onStartResize={onStartResize} />);
  if (meta.isApplauseMeter) return renderSpecial(<CanvasApplauseMeterElement element={localElement} isSelected={isSelected} isLivePresentation={isLivePresentation} onSelect={() => onSelect()} onUpdateElement={onUpdateElement} onStartDrag={drag} onStartResize={onStartResize} />);
  if (meta.isPupilWheel) return renderSpecial(<CanvasPupilWheelElement element={localElement} isSelected={isSelected} onSelect={() => onSelect()} onUpdateElement={onUpdateElement} onStartDrag={drag} onStartResize={onStartResize} />);
  if (meta.isTimer) return renderSpecial(<CanvasTimerElement element={localElement} isSelected={isSelected} onSelect={() => onSelect()} onStartDrag={drag} onStartResize={onStartResize} />);
  if (element.type === 'shape') return <CanvasShapeElement element={element} isSelected={isSelected} onSelect={onSelect} onUpdateContent={onUpdateContent} onStartDrag={drag} onStartResize={onStartResize} animClass={animClass} animStyle={animStyle} />;
  if (element.type === 'table') return renderSpecial(<CanvasTableElement element={localElement} isSelected={isSelected} onSelect={() => onSelect()} onUpdateElement={onUpdateElement} onStartDrag={drag} onStartResize={onStartResize} />);
  if (element.type === 'poll') return renderSpecial(<CanvasPollElement element={localElement} isSelected={isSelected} onSelect={() => onSelect()} onUpdateElement={onUpdateElement} onStartDrag={onStartDrag as (e: React.PointerEvent) => void} />);
  if (element.type === 'video' || element.type === 'image') {
    return <CanvasMediaElement element={element} isSelected={isSelected} isCropping={isCropping} containerRect={containerRect} onSelect={onSelect} onStartDrag={drag} onStartResize={onStartResize} onUpdateElement={onUpdateElement} onDoneCrop={onDoneCrop} onJumpToAims={onJumpToAims} animClass={animClass} animStyle={animStyle} />;
  }

  return (
    <CanvasTextElement
      element={element} isSelected={isSelected} onSelect={onSelect}
      onUpdateContent={onUpdateContent} onUpdateElement={onUpdateElement}
      onStartDrag={drag} onStartResize={onStartResize} animClass={animClass} animStyle={animStyle}
    />
  );
};

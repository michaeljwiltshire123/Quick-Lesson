import React, { CSSProperties } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { GoogleSlidesBoundingBox } from './GoogleSlidesBoundingBox';
import { GoogleSlidesCropOverlay } from './GoogleSlidesCropOverlay';
import { MaskEditOverlay } from './MaskEditOverlay';
import { MediaLogoAimsBadge } from './MediaLogoAimsBadge';
import { CanvasMediaContent } from './CanvasMediaContent';
import { applyCropToElementBounds, fitImageElementAspect } from './cropUtils';
import { getElementClipPath } from './maskUtils';
import { ResizeDirection } from './resizeHandler';
import { useCurvatureDrag } from './useCurvatureDrag';
import { computeImageDropShadow, computeImageFilter, computeImageBorderRadius } from './imageStyleUtils';
import { Image, Video, Lock } from 'lucide-react';

interface CanvasMediaElementProps {
  element: SlideElement;
  isSelected: boolean;
  isCropping?: boolean;
  containerRect?: DOMRect | null;
  animClass?: string;
  animStyle?: CSSProperties;
  onSelect: (e?: React.MouseEvent) => void;
  onStartDrag: (e: React.MouseEvent) => void;
  onStartResize: (e: React.MouseEvent, dir: ResizeDirection) => void;
  onUpdateElement?: (patch: Partial<SlideElement>) => void;
  onDoneCrop?: () => void;
  onJumpToAims?: () => void;
}

export const CanvasMediaElement: React.FC<CanvasMediaElementProps> = ({
  element, isSelected, isCropping, containerRect, animClass, animStyle, onSelect, onStartDrag, onStartResize, onUpdateElement, onDoneCrop, onJumpToAims,
}) => {
  const isVideo = element.type === 'video';
  const isLocked = Boolean(element.meta?.isLocked);
  const isMaskEditing = Boolean(element.meta?.isMaskEditing);
  const isBanner = Boolean(element.meta?.isBannerSticker || element.content?.startsWith('data:image/svg+xml'));
  const isAimsAnchor = Boolean(element.meta?.isSchoolLogo || element.meta?.isSchoolCrest || element.meta?.isAimsReturnAnchor);
  const { startCurvatureDrag } = useCurvatureDrag({ element, onUpdateElement });

  const clipPath = getElementClipPath(element.meta?.maskShape, element.crop, isCropping, element.meta?.customPath, element.meta?.maskScale ?? 100, element.meta?.maskX ?? 50, element.meta?.maskY ?? 50);
  const dropShadow = computeImageDropShadow(element.meta);
  const imgFilter = computeImageFilter(element.meta);
  const radius = computeImageBorderRadius(element.meta);
  const border = element.meta?.imageBorderWidth ? `${element.meta.imageBorderWidth}px solid ${element.meta.imageBorderColor || '#1C1917'}` : undefined;
  const hasSrc = Boolean(element.content && (element.content.startsWith('http') || element.content.startsWith('data:image') || element.content.startsWith('blob:')));

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (isBanner) return;
    const img = e.currentTarget;
    if (img.naturalWidth && img.naturalHeight) {
      const patch = fitImageElementAspect(element, img.naturalWidth, img.naturalHeight);
      if (patch) onUpdateElement?.(patch);
    }
  };

  return (
    <div
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      onClick={(e) => { e.stopPropagation(); if (isAimsAnchor && onJumpToAims && (e.metaKey || e.ctrlKey)) { onJumpToAims(); return; } onSelect(e); }}
      onMouseDown={!isLocked && !isCropping && !isMaskEditing ? onStartDrag : undefined}
      style={{ left: `${element.x}%`, top: `${element.y}%`, width: `${element.width}%`, height: `${element.height}%`, opacity: (element.meta?.opacity ?? 100) / 100, filter: dropShadow !== 'none' ? dropShadow : undefined, ...animStyle }}
      className={`absolute group flex flex-col select-none bg-transparent ${isLocked || isCropping || isMaskEditing ? 'cursor-default' : 'cursor-move'} ${isSelected ? (isLocked ? 'ring-2 ring-blue-500/80 z-30' : 'z-30') : 'hover:outline hover:outline-1 hover:outline-blue-300 z-10'} ${animClass || ''}`}
    >
      {isCropping ? (
        <GoogleSlidesCropOverlay element={element} containerRect={containerRect || null} onUpdateCrop={(c) => onUpdateElement?.({ crop: c })} onDoneCrop={() => { if (element.crop) onUpdateElement?.(applyCropToElementBounds(element, element.crop)); onDoneCrop?.(); }} />
      ) : isMaskEditing ? (
        <MaskEditOverlay element={element} containerRect={containerRect || null} onUpdateMaskMeta={(m) => onUpdateElement?.({ meta: { ...(element.meta || {}), ...m } })} onDoneMasking={() => onUpdateElement?.({ meta: { ...(element.meta || {}), isMaskEditing: false } })} />
      ) : isSelected && (
        isLocked ? (
          <div className="absolute -top-6 right-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-xs pointer-events-none select-none z-50"><Lock className="w-3 h-3" /><span>Pinned</span></div>
        ) : (
          <GoogleSlidesBoundingBox onStartDrag={onStartDrag} onStartResize={onStartResize} onStartCurvatureDrag={isBanner ? startCurvatureDrag : undefined} />
        )
      )}

      {isAimsAnchor && onJumpToAims && <MediaLogoAimsBadge onJumpToAims={onJumpToAims} />}

      <div style={{ borderRadius: radius ? `${radius}px` : undefined, border }} className="relative w-full h-full flex items-center justify-center overflow-hidden bg-transparent">
        {hasSrc ? (
          <CanvasMediaContent element={element} clipPath={clipPath} imgFilter={imgFilter} radius={radius} isCropping={isCropping} onImageLoad={handleImageLoad} />
        ) : (
          <div className="text-center p-3 text-stone-400">
            {isVideo ? <Video className="w-6 h-6 mx-auto mb-1 text-amber-500/70" /> : <Image className="w-6 h-6 mx-auto mb-1 text-amber-500/70" />}
            <span className="text-xs font-medium">Select to attach media</span>
          </div>
        )}
      </div>

      {element.caption && !isVideo && element.meta?.captionPosition !== 'overlay' && (
        <div className="absolute -bottom-5 inset-x-0 flex items-center justify-center pointer-events-none select-none z-20">
          <span className="text-[10px] font-semibold text-stone-700 bg-white/95 px-2 py-0.5 rounded-md shadow-2xs border border-stone-200/80 max-w-[95%] truncate backdrop-blur-xs">{element.caption}</span>
        </div>
      )}
    </div>
  );
};

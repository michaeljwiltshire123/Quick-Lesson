import React from 'react';
import { SlideElement } from '../../types/slideTypes';
import { computeBlurStyle } from './imageBlurUtils';
import { MediaBlurOverlays } from './MediaBlurOverlays';
import { CanvasInteractiveVideoPlayer } from './video/CanvasInteractiveVideoPlayer';
import { Link2 } from 'lucide-react';

interface CanvasMediaContentProps {
  element: SlideElement;
  clipPath?: string;
  imgFilter?: string;
  radius?: number;
  isCropping?: boolean;
  onImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export const CanvasMediaContent: React.FC<CanvasMediaContentProps> = ({
  element, clipPath, imgFilter, radius, isCropping, onImageLoad,
}) => {
  const isVideo = element.type === 'video';
  const flip = `scaleX(${element.meta?.flipH ? -1 : 1}) scaleY(${element.meta?.flipV ? -1 : 1})`;
  const blurStyle = computeBlurStyle(element.meta);
  const isAspectFill = element.meta?.blurType === 'aspectFill';
  const combinedFilter = [imgFilter !== 'none' ? imgFilter : '', blurStyle.filter || ''].filter(Boolean).join(' ') || undefined;

  if (isVideo) {
    return <CanvasInteractiveVideoPlayer element={element} />;
  }

  return (
    <div className="relative w-full h-full bg-transparent flex items-center justify-center">
      <MediaBlurOverlays element={element} />
      {isCropping && <img src={element.content} alt="Bounds" className="absolute inset-0 w-full h-full object-fill opacity-35" />}
      <img
        src={element.content}
        alt={element.meta?.altText || element.caption || 'Slide diagram'}
        onLoad={onImageLoad}
        style={{ clipPath, filter: combinedFilter, borderRadius: radius ? `${radius}px` : undefined, transform: flip, maskImage: blurStyle.maskImage, WebkitMaskImage: blurStyle.WebkitMaskImage }}
        className={`w-full h-full transition-[filter] ${isAspectFill ? 'object-contain relative z-10' : 'object-fill'}`}
      />
      {element.meta?.linkUrl && (
        <a href={element.meta.linkUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="absolute bottom-1 right-1 bg-amber-900/90 hover:bg-amber-950 text-white p-1 rounded-md shadow-xs pointer-events-auto z-20" title={`Open: ${element.meta.linkUrl}`}>
          <Link2 className="w-3 h-3" />
        </a>
      )}
      {element.meta?.altText && (
        <div className="absolute top-1 left-1 bg-stone-900/80 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded tracking-wide shadow-2xs pointer-events-auto cursor-help z-20" title={`Alt Text: ${element.meta.altText}`}>
          ALT
        </div>
      )}
      {element.caption && element.meta?.captionPosition === 'overlay' && (
        <div className="absolute bottom-0 inset-x-0 bg-stone-900/85 text-white text-[10px] font-medium py-1 px-2 text-center truncate z-20 backdrop-blur-xs">
          {element.caption}
        </div>
      )}
    </div>
  );
};

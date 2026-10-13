import React from 'react';
import { SlideElement } from '../../types/slideTypes';

interface MediaBlurOverlaysProps {
  element: SlideElement;
}

export const MediaBlurOverlays: React.FC<MediaBlurOverlaysProps> = ({ element }) => {
  const type = element.meta?.blurType;
  const blurPx = element.meta?.blurAmount ?? 8;
  const src = element.content;

  if (type === 'aspectFill') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
        <img src={src} alt="" style={{ filter: `blur(${blurPx}px)`, transform: 'scale(1.2)' }} className="w-full h-full object-cover opacity-60" />
      </div>
    );
  }

  if (type === 'tiltshift' || type === 'vignette' || type === 'radial') {
    const mask =
      type === 'tiltshift'
        ? 'linear-gradient(to bottom, black 0%, transparent 35%, transparent 65%, black 100%)'
        : type === 'vignette'
        ? 'radial-gradient(circle at center, transparent 40%, black 85%)'
        : 'radial-gradient(circle at center, transparent 25%, black 70%)';

    return (
      <div
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: '100% 100%',
          filter: `blur(${blurPx}px)`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
        className="absolute inset-0 pointer-events-none rounded-[inherit] z-10"
      />
    );
  }

  return null;
};

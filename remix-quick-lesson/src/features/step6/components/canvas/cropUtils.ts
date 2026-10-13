import { SlideElement } from '../../types/slideTypes';

export function applyCropToElementBounds(
  element: SlideElement,
  crop: { top: number; right: number; bottom: number; left: number }
): Partial<SlideElement> {
  const top = crop.top || 0;
  const right = crop.right || 0;
  const bottom = crop.bottom || 0;
  const left = crop.left || 0;

  if (top === 0 && right === 0 && bottom === 0 && left === 0) {
    return { crop: undefined };
  }

  const visibleWidthFactor = Math.max(0.1, (100 - left - right) / 100);
  const visibleHeightFactor = Math.max(0.1, (100 - top - bottom) / 100);

  const newWidth = Math.max(4, Math.round(element.width * visibleWidthFactor * 10) / 10);
  const newHeight = Math.max(4, Math.round(element.height * visibleHeightFactor * 10) / 10);
  const newX = Math.round((element.x + (element.width * left) / 100) * 10) / 10;
  const newY = Math.round((element.y + (element.height * top) / 100) * 10) / 10;

  return {
    x: newX,
    y: newY,
    width: newWidth,
    height: newHeight,
    crop: undefined,
    meta: { ...(element.meta || {}), hasFittedAspect: true },
  };
}

export function fitImageElementAspect(
  element: SlideElement,
  naturalWidth: number,
  naturalHeight: number
): Partial<SlideElement> | null {
  if (!naturalWidth || !naturalHeight) return null;
  if (element.meta?.hasFittedAspect) return null;

  const imgAspect = naturalWidth / naturalHeight;
  const currentCanvasAspect = (element.width / Math.max(1, element.height)) * (16 / 9);

  if (Math.abs(currentCanvasAspect - imgAspect) / imgAspect > 0.03) {
    const targetWidth = Math.max(4, Math.min(92, Math.round(((element.height * imgAspect) / (16 / 9)) * 10) / 10));
    const targetX = Math.min(element.x, Math.max(2, 96 - targetWidth));

    return {
      x: targetX,
      width: targetWidth,
      meta: { ...(element.meta || {}), hasFittedAspect: true, naturalAspect: imgAspect },
    };
  }
  return { meta: { ...(element.meta || {}), hasFittedAspect: true, naturalAspect: imgAspect } };
}

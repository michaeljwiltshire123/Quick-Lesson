import { useState, useEffect, useCallback } from 'react';

export interface ElementRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function useSpotlightBounds(targetId: string, isOpen: boolean): ElementRect | null {
  const [rect, setRect] = useState<ElementRect | null>(null);

  const measure = useCallback(() => {
    if (!isOpen) return;
    const el = document.getElementById(targetId);
    if (!el) {
      setRect(null);
      return;
    }
    const b = el.getBoundingClientRect();
    setRect({ top: b.top, left: b.left, width: b.width, height: b.height });
  }, [targetId, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    const timer = setTimeout(measure, 100);
    const interval = setInterval(measure, 250);

    const onResize = () => requestAnimationFrame(measure);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, { passive: true });

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize);
    };
  }, [targetId, isOpen, measure]);

  return rect;
}

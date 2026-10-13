import { useState, useCallback, useRef } from 'react';
import { SlideElement, CanvasAspectRatio } from '../../types/slideTypes';
import { ResizeDirection, computeResizeBounds } from './resizeHandler';

export function useCanvasInteraction(
  elements: SlideElement[],
  onUpdateElements: (elements: SlideElement[]) => void,
  externalSelectedId?: string | null,
  onSelectId?: (id: string | null) => void,
  externalSelectedIds?: string[],
  onSelectIds?: (ids: string[]) => void,
) {
  const [internalIds, setInternalIds] = useState<string[]>([]);
  const isDragging = useRef(false);
  const selectedElementIds = externalSelectedIds ?? (externalSelectedId ? [externalSelectedId] : internalIds);
  const setSelectedElementIds = onSelectIds || (onSelectId ? (ids: string[]) => onSelectId(ids[0] || null) : setInternalIds);
  const selectedId = selectedElementIds[0] || null;
  const setSelectedId = (id: string | null) => setSelectedElementIds(id ? [id] : []);

  const [aspectRatio, setAspectRatio] = useState<CanvasAspectRatio>('16:9');
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [snapGuides, setSnapGuides] = useState({ v: false, h: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback((id: string, e?: React.MouseEvent) => {
    if (isDragging.current) {
      isDragging.current = false;
      return;
    }
    if (e && (e.shiftKey || e.ctrlKey || e.metaKey)) {
      setSelectedElementIds(selectedElementIds.includes(id) ? selectedElementIds.filter(i => i !== id) : [...selectedElementIds, id]);
    } else {
      setSelectedElementIds([id]);
    }
  }, [selectedElementIds, setSelectedElementIds]);

  const startDrag = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    const sel = selectedElementIds.includes(id) ? selectedElementIds : (e.shiftKey || e.ctrlKey || e.metaKey ? [...selectedElementIds, id] : [id]);
    setSelectedElementIds(sel);
    const container = containerRef.current;
    if (!container) return;
    isDragging.current = true;
    const rect = container.getBoundingClientRect();
    const startX = e.clientX, startY = e.clientY;
    const inits = new Map(elements.filter(it => sel.includes(it.id)).map(it => [it.id, { x: it.x, y: it.y, w: it.width, h: it.height }]));
    let finished = false;

    const onMouseMove = (me: MouseEvent) => {
      const dx = ((me.clientX - startX) / rect.width) * 100, dy = ((me.clientY - startY) / rect.height) * 100;
      let nx = false, ny = false;
      onUpdateElements(elements.map(it => {
        const init = inits.get(it.id);
        if (!init) return it;
        let x = Math.max(0, Math.min(100 - init.w, init.x + dx));
        let y = Math.max(0, Math.min(100 - init.h, init.y + dy));
        if (it.id === id) {
          nx = Math.abs(x + init.w / 2 - 50) < 1.5; ny = Math.abs(y + init.h / 2 - 50) < 1.5;
          if (nx) x = 50 - init.w / 2; if (ny) y = 50 - init.h / 2;
        }
        return { ...it, x, y };
      }));
      setSnapGuides({ v: nx, h: ny });
    };
    const finishDrag = () => {
      if (finished) return;
      finished = true;
      setSnapGuides({ v: false, h: false });
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', finishDrag);
      window.removeEventListener('pointerup', finishDrag);
      window.removeEventListener('pointercancel', finishDrag);
      window.removeEventListener('blur', finishDrag);
      setTimeout(() => { isDragging.current = false; }, 0);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', finishDrag);
    window.addEventListener('pointerup', finishDrag);
    window.addEventListener('pointercancel', finishDrag);
    window.addEventListener('blur', finishDrag);
  }, [elements, onUpdateElements, selectedElementIds, setSelectedElementIds]);

  const start8WayResize = useCallback((e: React.MouseEvent, id: string, dir: ResizeDirection) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const el = elements.find(it => it.id === id);
    if (!el) return;
    const startX = e.clientX, startY = e.clientY;
    const init = { x: el.x, y: el.y, width: el.width, height: el.height };
    let finished = false;

    const onMouseMove = (me: MouseEvent) => {
      const dx = ((me.clientX - startX) / rect.width) * 100, dy = ((me.clientY - startY) / rect.height) * 100;
      const bounds = computeResizeBounds(dir, init, dx, dy);
      onUpdateElements(elements.map(it => it.id === id ? { ...it, ...bounds } : it));
    };
    const finishResize = () => {
      if (finished) return;
      finished = true;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', finishResize);
      window.removeEventListener('pointerup', finishResize);
      window.removeEventListener('pointercancel', finishResize);
      window.removeEventListener('blur', finishResize);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', finishResize);
    window.addEventListener('pointerup', finishResize);
    window.addEventListener('pointercancel', finishResize);
    window.addEventListener('blur', finishResize);
  }, [elements, onUpdateElements]);

  const startResize = useCallback((e: React.MouseEvent, id: string) => start8WayResize(e, id, 'se'), [start8WayResize]);

  return { selectedId, setSelectedId, selectedElementIds, setSelectedElementIds, handleSelect, aspectRatio, setAspectRatio, isGridVisible, setIsGridVisible, snapGuides, containerRef, startDrag, startResize, start8WayResize };
}

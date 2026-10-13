import { useEffect } from 'react';
import { SlideElement } from '../types/slideTypes';
import { handleCanvasPasteClipboard } from '../components/canvas/CanvasPasteDropHandler';

let elementClipboard: SlideElement[] = [];

export function useCanvasClipboard(
  elements: SlideElement[],
  selectedIds: string[],
  onUpdate: (elements: SlideElement[]) => void,
  onSelect: (ids: string[]) => void,
) {
  useEffect(() => {
    const editable = (target: EventTarget | null) => {
      const node = target as HTMLElement | null;
      return Boolean(node?.closest('input, textarea, [contenteditable="true"]'));
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const mod = event.ctrlKey || event.metaKey;
      if (!mod || editable(event.target)) return;
      if (event.key.toLowerCase() === 'c' && selectedIds.length) {
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed) return;
        elementClipboard = elements.filter((element) => selectedIds.includes(element.id));
        event.preventDefault();
      }
      if (event.key.toLowerCase() === 'v' && elementClipboard.length) {
        event.preventDefault();
        const stamp = Date.now();
        const pasted = elementClipboard.map((element, index) => ({
          ...element, id: `${element.id}-paste-${stamp}-${index}`,
          x: Math.min(94, element.x + 3), y: Math.min(94, element.y + 3),
          meta: element.meta ? { ...element.meta } : undefined,
        }));
        onUpdate([...elements, ...pasted]);
        onSelect(pasted.map((element) => element.id));
      }
    };
    const onPaste = (event: ClipboardEvent) => {
      if (editable(event.target) || elementClipboard.length) return;
      handleCanvasPasteClipboard(event, (element) => onUpdate([...elements, element]));
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('paste', onPaste);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('paste', onPaste);
    };
  }, [elements, selectedIds, onUpdate, onSelect]);
}

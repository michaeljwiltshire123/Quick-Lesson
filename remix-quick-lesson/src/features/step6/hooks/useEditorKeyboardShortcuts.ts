import { useEffect } from 'react';

interface KeyboardShortcutHandlers {
  onUndo?: () => void;
  onRedo?: () => void;
  onDuplicate?: () => void;
  onDeleteSelected?: () => void;
  onNudge?: (dx: number, dy: number) => void;
  onNavigateSlide?: (direction: -1 | 1) => void;
  onDeselect?: () => void;
}

export function useEditorKeyboardShortcuts({
  onUndo, onRedo, onDuplicate, onDeleteSelected, onNudge, onNavigateSlide, onDeselect,
}: KeyboardShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable || target.closest?.('[contenteditable="true"]')) {
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        onUndo?.();
      } else if ((mod && e.key.toLowerCase() === 'y') || (mod && e.shiftKey && e.key.toLowerCase() === 'z')) {
        e.preventDefault();
        onRedo?.();
      } else if (mod && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        onDuplicate?.();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        onDeleteSelected?.();
      } else if (e.key === 'Escape') {
        onDeselect?.();
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        if (onNavigateSlide && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
          onNavigateSlide(e.key === 'ArrowUp' ? -1 : 1);
          return;
        }
        const step = e.shiftKey ? 5 : 1;
        const dx = e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0;
        const dy = e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0;
        onNudge?.(dx, dy);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUndo, onRedo, onDuplicate, onDeleteSelected, onNudge, onNavigateSlide, onDeselect]);
}

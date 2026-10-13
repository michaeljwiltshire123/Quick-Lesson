import { useEffect } from 'react';

interface UsePresenterKeyboardNavProps {
  isOpen: boolean;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

export function usePresenterKeyboardNav({
  isOpen, onNext, onPrev, onClose,
}: UsePresenterKeyboardNavProps): void {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onNext, onPrev, onClose]);
}

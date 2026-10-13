import React, { useState, useEffect } from 'react';
import { Sparkles, Flashlight, X } from 'lucide-react';

interface SpotlightAndDiscoModeProps {
  isSpotlightActive: boolean;
  isDiscoActive: boolean;
  onToggleSpotlight: () => void;
  onToggleDisco: () => void;
}

export const SpotlightAndDiscoMode: React.FC<SpotlightAndDiscoModeProps> = ({
  isSpotlightActive, isDiscoActive, onToggleSpotlight, onToggleDisco,
}) => {
  const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (isSpotlightActive) setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isSpotlightActive]);

  return (
    <>
      {isSpotlightActive && (
        <div
          className="fixed inset-0 pointer-events-none z-50 transition-opacity"
          style={{
            background: `radial-gradient(circle 140px at ${pos.x}px ${pos.y}px, transparent 0%, rgba(0, 0, 0, 0.78) 100%)`,
          }}
        >
          <div
            className="fixed top-4 right-4 pointer-events-auto bg-stone-900/90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 border border-stone-700 shadow-xl cursor-pointer"
            onClick={onToggleSpotlight}
          >
            <Flashlight className="w-3.5 h-3.5 text-yellow-400" />
            <span>Spotlight Active (Click to Exit)</span>
            <X className="w-3.5 h-3.5 text-stone-400" />
          </div>
        </div>
      )}

      {isDiscoActive && (
        <div className="fixed inset-0 pointer-events-none z-40 border-8 border-amber-500 animate-pulse transition-all">
          <div
            className="fixed top-4 left-4 pointer-events-auto bg-purple-900/90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 border border-purple-500 shadow-xl cursor-pointer"
            onClick={onToggleDisco}
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
            <span>Party Mode (Click to Stop)</span>
            <X className="w-3.5 h-3.5 text-stone-400" />
          </div>
        </div>
      )}
    </>
  );
};

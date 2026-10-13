import React from 'react';

interface StickyNoteOverlayProps {
  speed: number;
}

export const StickyNoteOverlay: React.FC<StickyNoteOverlayProps> = ({ speed }) => {
  const duration = Math.max(0.5, speed * 1.3);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-xl">
      <style>{`
        @keyframes notePeelCorner {
          0% { transform: rotate(0deg) translate(0, 0); opacity: 1; }
          40% { transform: rotate(15deg) translate(15%, -20%); opacity: 0.9; }
          100% { transform: rotate(45deg) translate(80%, -80%); opacity: 0; }
        }
      `}</style>
      {/* Peeling yellow sticky paper corner on top */}
      <div
        className="absolute inset-0 bg-amber-300 shadow-2xl z-20 origin-bottom-left"
        style={{ animation: `notePeelCorner ${duration}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
      />
    </div>
  );
};

import React from 'react';

interface TextbookFlipOverlayProps {
  speed: number;
}

export const TextbookFlipOverlay: React.FC<TextbookFlipOverlayProps> = ({ speed }) => {
  const duration = Math.max(0.5, speed * 1.3);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-xl">
      <style>{`
        @keyframes pageTurnLeft {
          0% { transform: perspective(1200px) rotateY(0deg); opacity: 1; }
          100% { transform: perspective(1200px) rotateY(-110deg); opacity: 0; }
        }
      `}</style>
      {/* Flipping textbook page leaf over current slide */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-amber-50 border-l border-amber-900/30 shadow-2xl z-20 origin-left"
        style={{ animation: `pageTurnLeft ${duration}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
      />
    </div>
  );
};

import React from 'react';

interface DissolveCinematicOverlayProps {
  speed: number;
}

export const DissolveCinematicOverlay: React.FC<DissolveCinematicOverlayProps> = ({ speed }) => {
  const duration = Math.max(0.4, speed);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-xl">
      <style>{`
        @keyframes lightLeakSweep {
          0% {
            opacity: 0;
            transform: scale(0.6);
            background: radial-gradient(circle, rgba(253, 224, 71, 0.8) 0%, rgba(249, 115, 22, 0.4) 40%, transparent 70%);
          }
          40% {
            opacity: 0.9;
            transform: scale(1.3);
            background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(249, 115, 22, 0.6) 45%, rgba(217, 70, 239, 0.25) 75%, transparent 100%);
          }
          100% {
            opacity: 0;
            transform: scale(2);
            background: none;
          }
        }
      `}</style>

      {/* Golden light leak burst across the slide without any dummy card text */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{ animation: `lightLeakSweep ${duration}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
      />
    </div>
  );
};

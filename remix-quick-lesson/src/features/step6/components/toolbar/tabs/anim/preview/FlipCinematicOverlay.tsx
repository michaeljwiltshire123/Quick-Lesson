import React from 'react';

interface FlipCinematicOverlayProps {
  speed: number;
}

export const FlipCinematicOverlay: React.FC<FlipCinematicOverlayProps> = ({ speed }) => {
  const duration = Math.max(0.4, speed);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-xl">
      <style>{`
        @keyframes flipGlintSweep {
          0% { transform: translateX(-150%) skewX(-30deg); opacity: 0; }
          40% { opacity: 0.8; }
          100% { transform: translateX(150%) skewX(-30deg); opacity: 0; }
        }
      `}</style>
      <div
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
        style={{ animation: `flipGlintSweep ${duration}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
      />
    </div>
  );
};

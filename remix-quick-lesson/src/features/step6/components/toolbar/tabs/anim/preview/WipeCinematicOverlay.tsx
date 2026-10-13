import React from 'react';

interface WipeCinematicOverlayProps {
  speed: number;
}

export const WipeCinematicOverlay: React.FC<WipeCinematicOverlayProps> = ({ speed }) => {
  const duration = Math.max(0.4, speed);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-xl">
      <style>{`
        @keyframes wipeSlidingGleam { 0% { left: -10%; opacity: 0; } 20% { opacity: 0.9; } 100% { left: 110%; opacity: 0; } }
      `}</style>
      <div
        className="absolute inset-y-0 w-16 z-20 border-r border-l border-white/40 shadow-2xl overflow-hidden"
        style={{
          animation: `wipeSlidingGleam ${duration}s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
          backdropFilter: 'blur(12px) brightness(120%)',
          WebkitBackdropFilter: 'blur(12px) brightness(120%)',
          boxShadow: '0 0 35px rgba(255, 255, 255, 0.4), inset 0 0 20px rgba(255,255,255,0.4)',
        }}
      />
    </div>
  );
};

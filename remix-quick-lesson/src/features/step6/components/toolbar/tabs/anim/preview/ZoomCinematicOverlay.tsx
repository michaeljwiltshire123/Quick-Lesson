import React from 'react';

interface ZoomCinematicOverlayProps {
  speed: number;
}

export const ZoomCinematicOverlay: React.FC<ZoomCinematicOverlayProps> = ({ speed }) => {
  const duration = Math.max(0.4, speed);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-xl">
      <style>{`
        @keyframes zoomGlowTunnel {
          0% { transform: scale(0.6); opacity: 0; }
          40% { opacity: 0.85; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(1.8); }
        }
      `}</style>
      <div
        className="absolute inset-0 rounded-full border-4 border-amber-400/30 blur-md pointer-events-none"
        style={{ animation: `zoomGlowTunnel ${duration}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
      />
    </div>
  );
};

import React from 'react';

export const VhsRewindOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.5, speed * 2.2);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-center">
      <style>{`
        @keyframes vhsFlicker {
          0%, 100% { opacity: 0.95; transform: scaleY(1); filter: contrast(100%); }
          33% { opacity: 0.8; transform: scaleY(1.02); filter: contrast(110%); }
          66% { opacity: 0.9; transform: scaleY(0.98); filter: contrast(95%); }
        }
        @keyframes vhsNoise {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }
        @keyframes scrollTracking {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes vhsOverlayContainer { 0%, 90% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>

      <div
        className="absolute inset-0 bg-stone-950/20"
        style={{ animation: `vhsFlicker 0.08s infinite alternate, vhsOverlayContainer ${d + 0.15}s ease-out forwards` }}
      >
        {/* Analog tracking skew band moving vertically */}
        <div
          style={{ animation: `scrollTracking ${d * 0.5}s linear infinite` }}
          className="absolute inset-x-0 h-4 bg-white/20 blur-[2px] z-20 pointer-events-none"
        />

        {/* Horizontal static noise pattern overlay */}
        <div
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)',
            backgroundSize: '100% 8px',
            animation: 'vhsNoise 0.15s steps(4) infinite',
          }}
          className="absolute inset-0 z-15 opacity-80 pointer-events-none"
        />

        {/* VHS OSD elements */}
        <div className="absolute inset-0 z-25 flex flex-col justify-between p-4 font-mono text-[9px] text-white">
          <div className="flex justify-between items-center opacity-75">
            <span>SP 0:12:44</span>
            <span className="animate-pulse">PLAY ▶</span>
          </div>
          <div className="w-full h-1 bg-white/25 my-auto animate-pulse" />
          <div className="flex justify-between items-center text-emerald-400 font-bold tracking-widest">
            <span>REW ◀◀ 16x</span>
            <span>OSD DECAY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

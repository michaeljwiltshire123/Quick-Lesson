import React from 'react';

interface HorizontalBlindsOverlayProps {
  speed?: number;
}

export const HorizontalBlindsOverlay: React.FC<HorizontalBlindsOverlayProps> = ({
  speed = 0.6,
}) => {
  const duration = Math.max(1.3, speed * 2.0);
  const slatCount = 12;
  const slats = Array.from({ length: slatCount }, (_, i) => i);

  return (
    <div
      style={{ animation: `horizontalBlindsRootFade ${duration + 0.18}s ease-out forwards` }}
      className="absolute inset-0 pointer-events-none overflow-hidden z-30 select-none"
    >
      <style>{`
        @keyframes horizontalBlindsRootFade { 0%, 85% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes horizontalSlatTilt {
          0% { transform: perspective(800px) rotateX(0deg); opacity: 1; }
          20% { transform: perspective(800px) rotateX(25deg); }
          55% { transform: perspective(800px) rotateX(84deg); opacity: 0.95; }
          75% { transform: perspective(800px) rotateX(88deg) translateY(-8px); opacity: 0.6; }
          100% { transform: perspective(800px) rotateX(90deg) translateY(-25px); opacity: 0; }
        }
        @keyframes daylightGlowThroughHorizontal {
          0% { opacity: 0; } 35% { opacity: 0.6; } 70% { opacity: 0.35; } 100% { opacity: 0; }
        }
        @keyframes blindsHeadrailFade { 0%, 75% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes ladderCordsRetract {
          0%, 35% { transform: scaleY(1); opacity: 0.45; }
          70% { transform: scaleY(0.4); opacity: 0.2; }
          100% { transform: scaleY(0); opacity: 0; }
        }
      `}</style>

      {/* Horizontal daylight shafts streaming between tilted slats */}
      <div
        style={{ animation: `daylightGlowThroughHorizontal ${duration}s ease-in-out forwards` }}
        className="absolute inset-0 bg-gradient-to-b from-amber-100/25 via-white/40 to-amber-50/20 pointer-events-none"
      />

      {/* Top Venetian metal headrail with cord mechanism */}
      <div
        style={{ animation: `blindsHeadrailFade ${duration}s ease-out forwards` }}
        className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-stone-400 via-stone-200 to-stone-400 border-b border-stone-400 shadow-sm z-40 flex items-center justify-between px-3"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-1.5 bg-stone-500 rounded-sm shadow-inner" />
          <div className="w-12 h-1 bg-stone-300 rounded" />
        </div>
        {/* Left acrylic tilt wand */}
        <div className="absolute left-6 top-2 flex flex-col items-center">
          <div className="w-0.5 h-10 bg-stone-300/90 shadow-sm" />
          <div className="w-1 h-3 rounded-full bg-amber-100/90 border border-stone-300 shadow" />
        </div>
        {/* Right double pull cord with wooden acorns */}
        <div className="flex gap-1 items-start -mt-0.5 mr-2">
          <div className="w-0.5 h-12 bg-stone-300 flex flex-col justify-end items-center"><div className="w-1.5 h-2 rounded-sm bg-amber-800 shadow" /></div>
          <div className="w-0.5 h-10 bg-stone-300 flex flex-col justify-end items-center"><div className="w-1.5 h-2 rounded-sm bg-amber-800 shadow" /></div>
        </div>
      </div>

      {/* Dual vertical ladder tapes (cords) retracting and disappearing cleanly */}
      <div
        style={{
          animation: `ladderCordsRetract ${duration}s ease-out forwards`,
          transformOrigin: 'top',
        }}
        className="absolute inset-0 pointer-events-none flex justify-around px-16 z-10"
      >
        <div className="w-0.5 h-full bg-stone-400 border-x border-stone-300" />
        <div className="w-0.5 h-full bg-stone-400 border-x border-stone-300" />
      </div>

      {/* Parallel horizontal Venetian slats */}
      <div className="absolute inset-0 top-3 flex flex-col">
        {slats.map((idx) => (
          <div
            key={idx}
            style={{
              height: `${100 / slatCount}%`,
              transformOrigin: '50% 50%',
              animation: `horizontalSlatTilt ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${(idx / slatCount) * 0.16}s forwards`,
            }}
            className="w-full relative border-b border-stone-300/80 shadow-[0_2px_4px_rgba(0,0,0,0.08)] bg-gradient-to-b from-stone-50 via-[#FAF9F5] to-stone-200 flex items-center justify-between px-16"
          >
            <div className="w-1 h-1.5 rounded-full bg-stone-400/40" />
            <div className="w-1 h-1.5 rounded-full bg-stone-400/40" />
          </div>
        ))}
      </div>
    </div>
  );
};

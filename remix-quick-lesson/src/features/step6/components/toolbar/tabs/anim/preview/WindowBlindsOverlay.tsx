import React from 'react';

interface WindowBlindsOverlayProps {
  speed?: number;
}

export const WindowBlindsOverlay: React.FC<WindowBlindsOverlayProps> = ({ speed = 0.6 }) => {
  const duration = Math.max(1.3, speed * 2.0);
  const slatCount = 12;
  const slats = Array.from({ length: slatCount }, (_, i) => i);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 select-none">
      <style>{`
        @keyframes verticalLouvreFlip {
          0% { transform: perspective(900px) rotateY(0deg); opacity: 1; }
          20% { transform: perspective(900px) rotateY(25deg); }
          55% { transform: perspective(900px) rotateY(84deg); opacity: 0.95; }
          75% { transform: perspective(900px) rotateY(88deg) translateX(15px); opacity: 0.6; }
          100% { transform: perspective(900px) rotateY(90deg) translateX(40px); opacity: 0; }
        }
        @keyframes daylightGlowThroughBlinds {
          0% { opacity: 0; }
          35% { opacity: 0.55; }
          70% { opacity: 0.3; }
          100% { opacity: 0; }
        }
        @keyframes blindsTrackFade {
          0% { opacity: 1; }
          75% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Warm daylight ray washing through the opening louvres */}
      <div
        style={{ animation: `daylightGlowThroughBlinds ${duration}s ease-in-out forwards` }}
        className="absolute inset-0 bg-gradient-to-r from-amber-100/30 via-white/40 to-amber-50/20 pointer-events-none"
      />

      {/* Realistic architectural top headrail track */}
      <div
        style={{ animation: `blindsTrackFade ${duration}s ease-out forwards` }}
        className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-stone-400 via-stone-200 to-stone-400 border-b border-stone-400 shadow-sm z-40 flex items-center justify-between px-2"
      >
        <div className="flex gap-2 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-500 shadow-inner" />
          <div className="w-16 h-1 bg-stone-300 rounded-sm" />
        </div>
        {/* Hanging pull cord & acrylic wand */}
        <div className="flex flex-col items-center -mt-1 mr-1">
          <div className="w-0.5 h-8 bg-stone-300 shadow-sm" />
          <div className="w-1 h-3 rounded-full bg-amber-200/90 border border-stone-300 shadow" />
        </div>
      </div>

      {/* Parallel vertical blind louvre slats */}
      <div className="absolute inset-x-0 top-3 bottom-0 flex">
        {slats.map((idx) => {
          const delay = (idx / slatCount) * 0.18;
          return (
            <div
              key={idx}
              style={{
                width: `${100 / slatCount}%`,
                transformOrigin: '50% 50%',
                animation: `verticalLouvreFlip ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s forwards`,
              }}
              className="h-full relative border-r border-stone-300/80 shadow-[2px_0_6px_rgba(0,0,0,0.12)] bg-gradient-to-r from-stone-100 via-[#FAF9F5] to-stone-200 flex flex-col justify-between"
            >
              {/* Slat top hanger clip */}
              <div className="w-full h-1 bg-stone-300/80 mx-auto" />

              {/* Subtle vertical linen texture grooves */}
              <div className="flex-1 w-full flex justify-center opacity-30">
                <div className="w-px h-full bg-stone-400/40" />
              </div>

              {/* Slat bottom weighted pocket & link bead */}
              <div className="w-full pb-1 px-0.5 flex flex-col items-center">
                <div className="w-full h-1 bg-stone-300/90 rounded-sm border-t border-stone-400/50" />
                <div className="w-1 h-1 rounded-full bg-stone-400/70 mt-0.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useMemo } from 'react';

export const PaperRipOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const duration = Math.max(1.3, speed * 2.0);

  // Jagged, realistic deckled torn-edge polygon coordinates
  const leftTornClip = 'polygon(0% 0%, 50% 0%, 51.5% 12%, 48.5% 24%, 52% 38%, 48% 52%, 52.5% 66%, 48.5% 80%, 51% 92%, 50% 100%, 0% 100%)';
  const rightTornClip = 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 51% 92%, 48.5% 80%, 52.5% 66%, 48% 52%, 52% 38%, 48.5% 24%, 51.5% 12%)';

  // Generate 12 falling paper dust particles
  const dust = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${45 + Math.random() * 10}%`,
      delay: `${Math.random() * 0.4}s`,
      size: `${1.5 + Math.random() * 3}px`,
      tx: `${-30 + Math.random() * 60}px`,
      dur: `${1 + Math.random() * 0.8}s`,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 select-none">
      <style>{`
        @keyframes leftHalfRip {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(-120%, 35px) rotate(-14deg); opacity: 0; }
        }
        @keyframes rightHalfRip {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(120%, -35px) rotate(14deg); opacity: 0; }
        }
        @keyframes tearShadow {
          0% { opacity: 0.1; width: 0px; }
          30% { opacity: 0.45; width: 60px; }
          100% { opacity: 0; width: 120px; }
        }
        @keyframes dustFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(220px) translateX(var(--tx)) rotate(360deg); opacity: 0; }
        }
        @keyframes tearSeamFibers {
          0% { opacity: 0; transform: scaleY(0.1); }
          20% { opacity: 1; transform: scaleY(1); }
          60% { opacity: 0.8; }
          100% { opacity: 0; }
        }
        @keyframes ripOverlayContainer { 0%, 90% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>

      <div
        className="absolute inset-0"
        style={{ animation: `ripOverlayContainer ${duration + 0.15}s ease-out forwards` }}
      >
        {/* Dynamic Shadow expanding between separating halves */}
        <div
          style={{ animation: `tearShadow ${duration}s ease-out forwards` }}
          className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10 blur-md pointer-events-none"
        />

        {/* Left Torn Paper Half */}
        <div
          style={{
            clipPath: leftTornClip,
            animation: `leftHalfRip ${duration}s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
            boxShadow: 'inset -12px 0 20px rgba(255,255,255,0.4), inset 0 0 40px rgba(0,0,0,0.03)',
          }}
          className="absolute inset-0 bg-[#F5F2EA] border-r-[3px] border-stone-300 p-4 flex flex-col justify-between shadow-2xl text-stone-800"
        >
          <div>
            <span className="text-[9px] font-bold uppercase text-stone-500">Slide 1 (Previous Page)</span>
            <h4 className="text-sm font-extrabold text-stone-900">Lesson Material • Handout</h4>
          </div>
          <div className="text-[8px] text-stone-400 font-mono">Curriculum Unit Paper Handout</div>
        </div>

        {/* Right Torn Paper Half */}
        <div
          style={{
            clipPath: rightTornClip,
            animation: `rightHalfRip ${duration}s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
            boxShadow: 'inset 12px 0 20px rgba(255,255,255,0.4), inset 0 0 40px rgba(0,0,0,0.03)',
          }}
          className="absolute inset-0 bg-[#F5F2EA] border-l-[3px] border-stone-300 p-4 flex flex-col justify-between shadow-2xl text-stone-800"
        >
          <div className="text-right">
            <span className="text-[9px] font-bold uppercase text-stone-500">Curriculum Stage 3</span>
            <h4 className="text-sm font-extrabold text-stone-900">Section B: Activity</h4>
          </div>
          <div className="text-[8px] text-stone-400 font-mono text-right">Page 1 of 2</div>
        </div>

        {/* White Deckled Paper Fibers along Seam */}
        <div
          style={{ animation: `tearSeamFibers ${duration}s ease-out forwards` }}
          className="absolute left-1/2 top-0 bottom-0 w-3 -translate-x-1/2 pointer-events-none flex flex-col justify-around items-center z-25"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
          <div className="w-2 h-1 rounded-sm bg-white/90 shadow-sm rotate-45" />
          <div className="w-1 h-2 rounded-sm bg-white/80 shadow-sm -rotate-12" />
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
        </div>

        {/* Falling Paper Dust Particles */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {dust.map((d) => (
            <div
              key={d.id}
              className="absolute bg-white/90 rounded-sm"
              style={{
                left: d.left,
                top: '30%',
                width: d.size,
                height: d.size,
                '--tx': d.tx,
                animation: `dustFall ${d.dur} ease-in-out ${d.delay} forwards`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

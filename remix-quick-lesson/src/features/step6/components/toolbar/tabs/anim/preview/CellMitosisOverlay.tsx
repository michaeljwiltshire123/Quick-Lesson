import React from 'react';

export const CellMitosisOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.8, speed * 2.4);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-center">
      <style>{`
        @keyframes mitL {
          0% { transform: translateX(0) scale(1); }
          25% { transform: translateX(0) scale(1.05); }
          55% { transform: translateX(-40px) scale(0.95); }
          80% { transform: translateX(-110px) scale(0.9); }
          100% { transform: translateX(-240px) scale(0); opacity: 0; }
        }
        @keyframes mitR {
          0% { transform: translateX(0) scale(1); }
          25% { transform: translateX(0) scale(1.05); }
          55% { transform: translateX(40px) scale(0.95); }
          80% { transform: translateX(110px) scale(0.9); }
          100% { transform: translateX(240px) scale(0); opacity: 0; }
        }
        @keyframes spinF {
          0% { opacity: 0; transform: scaleY(0.1); }
          15% { opacity: 0.45; transform: scaleY(1); }
          75% { opacity: 0.05; transform: scale(0.8); }
          100% { opacity: 0; transform: scale(0); }
        }
        @keyframes chL {
          0% { transform: translate(-50%, -50%) rotate(var(--r)) scale(0.4); opacity: 0; }
          12% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--r)) scale(1); }
          30% { transform: translate(-50%, -50%) rotate(var(--r)); }
          65% { transform: translate(-120px, -50%) rotate(calc(var(--r) - 15deg)) scale(0.8); opacity: 0.9; }
          90% { transform: translate(-200px, -50%) rotate(calc(var(--r) - 30deg)) scale(0.4); opacity: 0; }
        }
        @keyframes chR {
          0% { transform: translate(-50%, -50%) rotate(var(--r)) scale(0.4); opacity: 0; }
          12% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--r)) scale(1); }
          30% { transform: translate(-50%, -50%) rotate(var(--r)); }
          65% { transform: translate(120px, -50%) rotate(calc(var(--r) + 15deg)) scale(0.8); opacity: 0.9; }
          90% { transform: translate(200px, -50%) rotate(calc(var(--r) + 30deg)) scale(0.4); opacity: 0; }
        }
      `}</style>
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="mitosis-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div style={{ animation: `fadeOut ${d}s ease-in-out forwards` }} className="relative w-[500px] h-[320px] flex items-center justify-center">
        <div className="absolute w-72 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
        {/* Spindle Fibres */}
        {['-left-10', 'right-10'].map((pos, sIdx) => (
          <div key={pos} style={{ animation: `spinF ${d}s ease-in-out forwards` }} className={`absolute ${pos} w-4 h-4 rounded-full bg-emerald-300 shadow-[0_0_12px_#6ee7b7]`}>
            {[-20, -10, 0, 10, 20].map((angle, fIdx) => (
              <div key={fIdx} style={{ transform: `rotate(${sIdx === 0 ? angle : 180 - angle}deg)`, width: '180px', transformOrigin: 'left center' }} className="absolute left-2 h-px border-t border-dashed border-emerald-300/30" />
            ))}
          </div>
        ))}
        {/* Organic Cell Cytoplasm Division */}
        <div style={{ filter: 'url(#mitosis-goo)' }} className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          {['mitL', 'mitR'].map((anim) => (
            <div key={anim} style={{ animation: `${anim} ${d}s cubic-bezier(0.3, 0.8, 0.4, 0.95) forwards` }} className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-emerald-400/80 via-teal-500/70 to-cyan-600/80 border border-emerald-300/20 shadow-[0_0_24px_rgba(16,185,129,0.3)] flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100/40 border border-white/20 blur-[1px]" />
            </div>
          ))}
        </div>
        {/* Chromatids separating */}
        <div className="absolute inset-0 z-30">
          {/* Left chromatids */}
          <div style={{ animation: `chL ${d}s cubic-bezier(0.25, 0.8, 0.35, 1) forwards`, '--r': '35deg' } as React.CSSProperties} className="absolute top-1/2 left-1/2 w-5 h-10 border-2 border-amber-300 bg-amber-400/85 rounded-full shadow-[0_0_8px_#fbbf24]" />
          <div style={{ animation: `chL ${d}s cubic-bezier(0.25, 0.8, 0.35, 1) ${d * 0.05}s forwards`, '--r': '-25deg' } as React.CSSProperties} className="absolute top-1/2 left-1/2 w-5 h-10 border-2 border-emerald-300 bg-emerald-400/85 rounded-full shadow-[0_0_8px_#34d399]" />
          {/* Right chromatids */}
          <div style={{ animation: `chR ${d}s cubic-bezier(0.25, 0.8, 0.35, 1) forwards`, '--r': '-35deg' } as React.CSSProperties} className="absolute top-1/2 left-1/2 w-5 h-10 border-2 border-amber-300 bg-amber-400/85 rounded-full shadow-[0_0_8px_#fbbf24]" />
          <div style={{ animation: `chR ${d}s cubic-bezier(0.25, 0.8, 0.35, 1) ${d * 0.05}s forwards`, '--r': '25deg' } as React.CSSProperties} className="absolute top-1/2 left-1/2 w-5 h-10 border-2 border-emerald-300 bg-emerald-400/85 rounded-full shadow-[0_0_8px_#34d399]" />
        </div>
      </div>
    </div>
  );
};

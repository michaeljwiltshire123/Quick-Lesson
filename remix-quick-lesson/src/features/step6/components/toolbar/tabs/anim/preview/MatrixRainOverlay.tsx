import React, { useMemo } from 'react';

export const MatrixRainOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.6, speed * 2.3);

  // Programmatically generate 264 columns across background & foreground layers for 3x more code rain
  const columns = useMemo(() => {
    return Array.from({ length: 264 }).map((_, i) => {
      const isForeground = i % 3 === 0;
      const charCount = isForeground ? 12 : 7;
      const chars = Array.from({ length: charCount })
        .map(() => (Math.random() > 0.5 ? '1' : '0'))
        .join('');
      return {
        id: i,
        chars,
        left: `${(i * 99.5) / 264}%`,
        delay: `${Math.random() * 0.6}s`,
        dur: isForeground ? `${0.8 + Math.random() * 0.4}s` : `${1.3 + Math.random() * 0.6}s`,
        isForeground,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 select-none">
      <style>{`
        @keyframes streamFall {
          0% { transform: translateY(-105%); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(110%); opacity: 0; }
        }
        @keyframes glitchPulse {
          0%, 100% { transform: scaleY(1) skewX(0deg); opacity: 0; }
          12% { transform: scaleY(3) skewX(12deg); opacity: 0.65; }
          14% { transform: scaleY(1) skewX(-12deg); opacity: 0.2; }
          45% { opacity: 0; }
          46% { transform: translateY(60px) scaleY(2); opacity: 0.8; }
          48% { opacity: 0; }
        }
        @keyframes matrixContainer { 0%, 90% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>

      <div
        className="absolute inset-0 bg-stone-950/20"
        style={{ animation: `matrixContainer ${d + 0.15}s ease-out forwards` }}
      >
        {/* Layer 1: Background Columns (Small, translucent, slightly blurred) */}
        <div className="absolute inset-0 font-mono filter blur-[1px] opacity-40">
          {columns.filter(c => !c.isForeground).map(c => (
            <div
              key={c.id}
              style={{
                left: c.left,
                animation: `streamFall ${c.dur} linear ${c.delay} infinite`,
                fontSize: '4px',
                lineHeight: '5px',
              } as React.CSSProperties}
              className="absolute text-emerald-700 font-extrabold flex flex-col items-center top-0"
            >
              {c.chars.split('').map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </div>
          ))}
        </div>

        {/* Layer 2: Foreground Columns (Large, bright neon glow) */}
        <div className="absolute inset-0 font-mono">
          {columns.filter(c => c.isForeground).map(c => (
            <div
              key={c.id}
              style={{
                left: c.left,
                animation: `streamFall ${c.dur} linear ${c.delay} infinite`,
                fontSize: '6.5px',
                lineHeight: '7.5px',
              } as React.CSSProperties}
              className="absolute text-emerald-500 font-black flex flex-col items-center top-0 drop-shadow-[0_0_3px_rgba(16,185,129,0.4)]"
            >
              {c.chars.split('').slice(0, -1).map((char, index) => (
                <span key={index} className={index > c.chars.length - 4 ? 'text-emerald-200' : ''}>{char}</span>
              ))}
              <span className="text-white drop-shadow-[0_0_6px_#34d399] animate-pulse">
                {c.chars[c.chars.length - 1]}
              </span>
            </div>
          ))}
        </div>

        {/* Cinematic Glitch horizontal noise bar overlay */}
        <div
          style={{ animation: `glitchPulse ${d * 0.7}s ease-in-out infinite` }}
          className="absolute inset-x-0 top-1/3 h-1 bg-emerald-400 shadow-[0_0_15px_#34d399] opacity-0 pointer-events-none"
        />
      </div>
    </div>
  );
};

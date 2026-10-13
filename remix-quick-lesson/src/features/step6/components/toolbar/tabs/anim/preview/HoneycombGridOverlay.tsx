import React, { useMemo } from 'react';
import { generateHoneycombCells } from './honeycombCoords';

export const HoneycombGridOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const duration = Math.max(1.3, speed * 2.0);
  const cells = useMemo(() => generateHoneycombCells(duration), [duration]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 select-none">
      <style>{`
        @keyframes honeycombCellFlip {
          0% { transform: scale(1) rotateY(0deg); opacity: 1; }
          40% { transform: scale(1.15) rotateY(90deg); opacity: 1; filter: drop-shadow(0 0 15px #f59e0b) brightness(1.5); }
          100% { transform: scale(0) rotateY(180deg); opacity: 0; }
        }
        @keyframes honeycombGlow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.45; }
        }
      `}</style>

      {/* Repeating background grid glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-amber-600/5 to-transparent animate-pulse" />

      <svg viewBox="0 0 800 450" preserveAspectRatio="none" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="honeyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#D97706" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#92400E" stopOpacity="0.88" />
          </linearGradient>
          <linearGradient id="honeyInner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {cells.map((c) => (
          <g
            key={c.id}
            style={{
              transformOrigin: `${c.cx}px ${c.cy}px`,
              animation: `honeycombCellFlip ${duration * 0.75}s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${c.delay}s forwards`,
            }}
          >
            {/* Glowing borders tracking Newly locked tiles */}
            <polygon
              points={c.points}
              fill="url(#honeyGrad)"
              stroke="#FEF3C7"
              strokeWidth="2.8"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_8px_#f59e0b]"
            />
            <polygon
              points={c.innerPoints}
              fill="url(#honeyInner)"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

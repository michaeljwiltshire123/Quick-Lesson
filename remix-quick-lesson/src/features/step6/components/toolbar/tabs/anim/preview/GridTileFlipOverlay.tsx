import React, { useMemo } from 'react';
import { generateGridTiles } from './gridTileData';

interface GridTileFlipOverlayProps {
  speed?: number;
}

export const GridTileFlipOverlay: React.FC<GridTileFlipOverlayProps> = ({
  speed = 0.6,
}) => {
  const duration = Math.max(1.3, speed * 2.0);
  const rows = 4;
  const cols = 6;
  const tiles = useMemo(() => generateGridTiles(rows, cols, duration), [rows, cols, duration]);

  return (
    <div
      style={{ animation: `gridTileRootFade ${duration + 0.2}s ease-out forwards` }}
      className="absolute inset-0 pointer-events-none overflow-hidden z-30 select-none p-1.5"
    >
      <style>{`
        @keyframes gridTileRootFade { 0%, 85% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes gridTile3DFlip {
          0% {
            transform: perspective(700px) rotateY(0deg) scale(1);
            opacity: 1;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12);
          }
          35% {
            transform: perspective(700px) rotateY(55deg) translateZ(28px) scale(1.04);
            opacity: 0.95;
            box-shadow: -8px 12px 22px rgba(0,0,0,0.25);
          }
          70% {
            transform: perspective(700px) rotateY(90deg) translateZ(12px) scale(0.9);
            opacity: 0.8;
          }
          85% {
            transform: perspective(700px) rotateY(120deg) scale(0.7);
            opacity: 0.25;
          }
          100% {
            transform: perspective(700px) rotateY(180deg) scale(0.4);
            opacity: 0;
          }
        }
        @keyframes tileGlintSweep {
          0%, 15% { opacity: 0; transform: translateX(-100%) rotate(25deg); }
          50% { opacity: 0.9; transform: translateX(50%) rotate(25deg); }
          100% { opacity: 0; transform: translateX(200%) rotate(25deg); }
        }
      `}</style>

      {/* 24-Tile 3D Flipping Mosaic Grid */}
      <div
        className="w-full h-full grid gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {tiles.map((tile) => (
          <div
            key={tile.id}
            style={{
              animation: `gridTile3DFlip ${duration * 0.72}s cubic-bezier(0.25, 1, 0.5, 1) ${tile.delay}s forwards`,
              transformOrigin: 'center center',
            }}
            className="relative rounded-md overflow-hidden border border-stone-300/80 bg-gradient-to-br from-stone-100 via-[#FAF9F5] to-stone-200 flex flex-col items-center justify-between p-1 shadow-sm backdrop-blur-sm"
          >
            {/* Ambient specular diagonal glint sweep */}
            <div
              style={{
                animation: `tileGlintSweep ${duration * 0.72}s ease-in-out ${tile.delay}s forwards`,
              }}
              className="absolute inset-0 w-[200%] -left-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none"
            />
            {/* Header: registration corner dots & coordinate index */}
            <div className="w-full flex justify-between items-center opacity-40">
              <div className="w-1 h-1 rounded-full bg-stone-500 shadow-inner" />
              <span className="text-[7px] font-mono text-stone-600 font-bold">
                {tile.col + 1}:{tile.row + 1}
              </span>
              <div className="w-1 h-1 rounded-full bg-stone-500 shadow-inner" />
            </div>
            {/* Centre geometric crosshair accent */}
            <div className="w-2.5 h-2.5 rounded-full border border-stone-400/50 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-amber-600/70" />
            </div>
            {/* Bottom bevel seam */}
            <div className="w-full h-0.5 rounded-full bg-stone-300/80 shadow-inner" />
          </div>
        ))}
      </div>
    </div>
  );
};

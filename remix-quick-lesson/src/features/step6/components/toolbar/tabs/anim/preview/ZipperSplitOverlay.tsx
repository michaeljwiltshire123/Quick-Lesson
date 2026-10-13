import React from 'react';

interface ZipperSplitOverlayProps {
  speed: number;
}

export const ZipperSplitOverlay: React.FC<ZipperSplitOverlayProps> = ({ speed }) => {
  const duration = Math.max(0.5, speed * 1.3);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-xl">
      <style>{`
        @keyframes zipSliderPull {
          0% { top: -10%; opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes zipTeethSpreadLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-15%); opacity: 0; }
        }
        @keyframes zipTeethSpreadRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(15%); opacity: 0; }
        }
      `}</style>

      {/* Gold metallic zipper teeth track */}
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 flex justify-between z-20 pointer-events-none"
      >
        <div
          className="w-2.5 h-full border-r border-dashed border-amber-500 opacity-80"
          style={{ animation: `zipTeethSpreadLeft ${duration}s ease-out forwards` }}
        />
        <div
          className="w-2.5 h-full border-l border-dashed border-amber-500 opacity-80"
          style={{ animation: `zipTeethSpreadRight ${duration}s ease-out forwards` }}
        />
      </div>

      {/* Zipper Pull Head */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-8 h-10 bg-amber-400 rounded-md border-2 border-amber-600 shadow-xl z-30"
        style={{ animation: `zipSliderPull ${duration}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
      />
    </div>
  );
};

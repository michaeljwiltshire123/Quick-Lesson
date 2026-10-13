import React from 'react';

interface Props {
  className?: string;
}

export const GridlockBoundaryWalls: React.FC<Props> = () => {
  return (
    <>
      {/* Top Blue Goal Wall */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-blue-600 to-blue-700/90 border-b-2 border-blue-400/80 rounded-t-2xl flex items-center justify-center shadow-lg z-10">
        <div className="flex items-center gap-2 text-[11px] font-black text-white tracking-widest uppercase drop-shadow-sm">
          <span>▼</span>
          <span>BLUE TEAM GOAL LINE • TOP</span>
          <span>▼</span>
        </div>
      </div>

      {/* Bottom Blue Goal Wall */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-blue-600 to-blue-700/90 border-t-2 border-blue-400/80 rounded-b-2xl flex items-center justify-center shadow-lg z-10">
        <div className="flex items-center gap-2 text-[11px] font-black text-white tracking-widest uppercase drop-shadow-sm">
          <span>▲</span>
          <span>BLUE TEAM GOAL LINE • BOTTOM</span>
          <span>▲</span>
        </div>
      </div>

      {/* Left Red Goal Wall */}
      <div className="absolute top-6 bottom-6 left-0 w-6 bg-gradient-to-r from-red-600 to-red-700/90 border-r-2 border-red-400/80 flex flex-col items-center justify-center shadow-lg z-10">
        <div className="text-[10px] font-black text-white tracking-widest uppercase whitespace-nowrap -rotate-90 flex items-center gap-2 drop-shadow-sm">
          <span>▶</span>
          <span>RED GOAL • LEFT</span>
          <span>▶</span>
        </div>
      </div>

      {/* Right Red Goal Wall */}
      <div className="absolute top-6 bottom-6 right-0 w-6 bg-gradient-to-l from-red-600 to-red-700/90 border-l-2 border-red-400/80 flex flex-col items-center justify-center shadow-lg z-10">
        <div className="text-[10px] font-black text-white tracking-widest uppercase whitespace-nowrap rotate-90 flex items-center gap-2 drop-shadow-sm">
          <span>◀</span>
          <span>RED GOAL • RIGHT</span>
          <span>◀</span>
        </div>
      </div>
    </>
  );
};

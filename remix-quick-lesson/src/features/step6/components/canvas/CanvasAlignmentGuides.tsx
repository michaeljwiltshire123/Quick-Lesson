import React from 'react';

interface CanvasAlignmentGuidesProps {
  showVerticalCenter?: boolean;
  showHorizontalCenter?: boolean;
}

export const CanvasAlignmentGuides: React.FC<CanvasAlignmentGuidesProps> = ({
  showVerticalCenter = false,
  showHorizontalCenter = false,
}) => {
  return (
    <>
      {showVerticalCenter && (
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-rose-500/80 z-40 pointer-events-none shadow-sm animate-pulse"
        >
          <span className="absolute top-2 left-1 text-[9px] font-bold bg-rose-500 text-white px-1 rounded">Centre X</span>
        </div>
      )}
      {showHorizontalCenter && (
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-rose-500/80 z-40 pointer-events-none shadow-sm animate-pulse"
        >
          <span className="absolute left-2 top-1 text-[9px] font-bold bg-rose-500 text-white px-1 rounded">Centre Y</span>
        </div>
      )}
    </>
  );
};

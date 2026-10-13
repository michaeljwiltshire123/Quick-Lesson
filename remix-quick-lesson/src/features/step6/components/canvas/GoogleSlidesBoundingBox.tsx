import React from 'react';
import { ResizeDirection } from './resizeHandler';

interface GoogleSlidesBoundingBoxProps {
  onStartDrag: (e: React.MouseEvent) => void;
  onStartResize: (e: React.MouseEvent, dir: ResizeDirection) => void;
  onStartCurvatureDrag?: (e: React.MouseEvent) => void;
}

const HANDLES: { dir: ResizeDirection; pos: string; cursor: string }[] = [
  { dir: 'nw', pos: '-top-1.5 -left-1.5', cursor: 'cursor-nwse-resize' },
  { dir: 'n', pos: '-top-1.5 left-1/2 -translate-x-1/2', cursor: 'cursor-ns-resize' },
  { dir: 'ne', pos: '-top-1.5 -right-1.5', cursor: 'cursor-nesw-resize' },
  { dir: 'e', pos: 'top-1/2 -translate-y-1/2 -right-1.5', cursor: 'cursor-ew-resize' },
  { dir: 'se', pos: '-bottom-1.5 -right-1.5', cursor: 'cursor-nwse-resize' },
  { dir: 's', pos: '-bottom-1.5 left-1/2 -translate-x-1/2', cursor: 'cursor-ns-resize' },
  { dir: 'sw', pos: '-bottom-1.5 -left-1.5', cursor: 'cursor-nesw-resize' },
  { dir: 'w', pos: 'top-1/2 -translate-y-1/2 -left-1.5', cursor: 'cursor-ew-resize' },
];

export const GoogleSlidesBoundingBox: React.FC<GoogleSlidesBoundingBoxProps> = ({
  onStartDrag, onStartResize, onStartCurvatureDrag,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-40 select-none">
      <div onMouseDown={onStartDrag} className="absolute top-0 left-0 right-0 h-1 bg-[#1a73e8] cursor-move pointer-events-auto" title="Drag to move" />
      <div onMouseDown={onStartDrag} className="absolute bottom-0 left-0 right-0 h-1 bg-[#1a73e8] cursor-move pointer-events-auto" title="Drag to move" />
      <div onMouseDown={onStartDrag} className="absolute top-0 bottom-0 left-0 w-1 bg-[#1a73e8] cursor-move pointer-events-auto" title="Drag to move" />
      <div onMouseDown={onStartDrag} className="absolute top-0 bottom-0 right-0 w-1 bg-[#1a73e8] cursor-move pointer-events-auto" title="Drag to move" />

      {/* Direct Interactive Curvature Node (Option A - Yellow/Amber Diamond Node) */}
      {onStartCurvatureDrag && (
        <div className="absolute -top-4 left-1/3 -translate-x-1/2 flex flex-col items-center pointer-events-auto z-50">
          <div
            onMouseDown={onStartCurvatureDrag}
            className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-md cursor-ns-resize hover:bg-amber-600 hover:scale-125 transition-transform flex items-center justify-center animate-pulse"
            title="Drag up/down to bend and curve the text live on canvas"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>
      )}

      {/* Rotation Stem & Node */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
        <div onMouseDown={onStartDrag} className="w-2.5 h-2.5 rounded-full bg-white border-[1.5px] border-[#1a73e8] shadow-xs cursor-grab hover:bg-blue-50" title="Drag to reposition" />
        <div className="w-[1.5px] h-3 bg-[#1a73e8]" />
      </div>

      {/* 8 Google Slides Square Handles */}
      {HANDLES.map((h) => (
        <div
          key={h.dir} onMouseDown={(e) => onStartResize(e, h.dir)}
          className={`absolute ${h.pos} w-2.5 h-2.5 bg-white border-[1.5px] border-[#1a73e8] rounded-2xs shadow-xs pointer-events-auto hover:bg-blue-50 hover:scale-125 transition-transform ${h.cursor}`}
          title={`Resize (${h.dir.toUpperCase()})`}
        />
      ))}
    </div>
  );
};

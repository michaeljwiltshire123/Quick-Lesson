import React from 'react';
import { SlideElement } from '../../types/slideTypes';
import { GoogleSlidesBoundingBox } from './GoogleSlidesBoundingBox';
import { ResizeDirection } from './resizeHandler';

interface CanvasTableElementProps {
  element: SlideElement;
  isSelected: boolean;
  onSelect: () => void;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
  onStartDrag: (e: React.MouseEvent) => void;
  onStartResize?: (e: React.MouseEvent, dir: ResizeDirection) => void;
}

export const CanvasTableElement: React.FC<CanvasTableElementProps> = ({
  element, isSelected, onSelect, onUpdateElement, onStartDrag, onStartResize,
}) => {
  const table = element.tableData || {
    headers: ['Concept / Term', 'Definition / Application', 'Classroom Example'],
    rows: [
      ['Core Principle', 'Fundamental rule or scientific law', 'Gravity pulling objects to ground'],
      ['Key Misconception', 'Common student error to avoid', 'Confusing mass with weight'],
    ],
  };

  const updateCell = (rowIndex: number, colIndex: number, val: string, isHeader = false) => {
    if (isHeader) {
      const newHeaders = [...(table.headers || [])];
      newHeaders[colIndex] = val;
      onUpdateElement({ tableData: { ...table, headers: newHeaders } });
    } else {
      const newRows = table.rows.map((row, rIdx) =>
        rIdx === rowIndex ? row.map((cell, cIdx) => (cIdx === colIndex ? val : cell)) : row
      );
      onUpdateElement({ tableData: { ...table, rows: newRows } });
    }
  };

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      style={{ left: `${element.x}%`, top: `${element.y}%`, width: `${element.width}%`, height: `${element.height}%` }}
      className={`absolute bg-white rounded-lg border border-stone-300 p-2 shadow-xs transition-all ${
        isSelected ? 'z-30' : 'hover:outline hover:outline-1 hover:outline-blue-300 z-10'
      }`}
    >
      {isSelected && onStartResize && (
        <GoogleSlidesBoundingBox onStartDrag={onStartDrag} onStartResize={onStartResize} />
      )}

      <div className="overflow-x-auto w-full h-full p-0.5">
        <table className="w-full text-xs border-collapse">
          {table.headers && (
            <thead>
              <tr className="bg-amber-100/70 text-amber-950 font-bold border-b border-amber-300">
                {table.headers.map((head, hIdx) => (
                  <th key={hIdx} className="p-1.5 text-left border-r border-amber-200 last:border-none">
                    <input type="text" value={head} onChange={(e) => updateCell(0, hIdx, e.target.value, true)} className="w-full bg-transparent font-bold focus:outline-none" />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {table.rows.map((row, rIdx) => (
              <tr key={rIdx} className="border-b border-stone-200/60 hover:bg-stone-50">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-1.5 border-r border-stone-200/60 last:border-none text-stone-800">
                    <input type="text" value={cell} onChange={(e) => updateCell(rIdx, cIdx, e.target.value, false)} className="w-full bg-transparent focus:outline-none" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

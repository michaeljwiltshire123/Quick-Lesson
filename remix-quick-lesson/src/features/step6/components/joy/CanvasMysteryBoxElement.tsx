import React, { useState } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { GoogleSlidesBoundingBox } from '../canvas/GoogleSlidesBoundingBox';
import { ResizeDirection } from '../canvas/resizeHandler';
import { Gift, Sparkles, Lock, Unlock, Edit3 } from 'lucide-react';

interface CanvasMysteryBoxElementProps {
  element: SlideElement;
  isSelected: boolean;
  onSelect: () => void;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
  onStartDrag: (e: React.MouseEvent) => void;
  onStartResize: (e: React.MouseEvent, dir: ResizeDirection) => void;
}

export const CanvasMysteryBoxElement: React.FC<CanvasMysteryBoxElementProps> = ({
  element, isSelected, onSelect, onUpdateElement, onStartDrag, onStartResize,
}) => {
  const [isOpen, setIsOpen] = useState(Boolean(element.meta?.isOpen));
  const [isEditing, setIsEditing] = useState(false);
  const secretContent = (element.meta?.secretText as string) || element.content || '❓ Secret Question or Challenge';

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isOpen;
    setIsOpen(nextState);
    onUpdateElement({ meta: { ...(element.meta || {}), isOpen: nextState } });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateElement({
      content: e.target.value,
      meta: { ...(element.meta || {}), secretText: e.target.value },
    });
  };

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onMouseDown={onStartDrag}
      style={{ left: `${element.x}%`, top: `${element.y}%`, width: `${element.width}%`, height: `${element.height}%` }}
      className={`absolute flex flex-col items-center justify-between p-3 rounded-2xl shadow-xl select-none cursor-move transition-all ${
        isOpen ? 'bg-gradient-to-br from-purple-900 to-indigo-950 text-purple-50 border-2 border-amber-400' : 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white border-2 border-purple-300'
      } ${isSelected ? 'z-30 ring-2 ring-purple-400' : 'hover:outline hover:outline-1 hover:outline-blue-300 z-10'}`}
    >
      {isSelected && <GoogleSlidesBoundingBox onStartDrag={onStartDrag} onStartResize={onStartResize} />}

      {/* Header Badge */}
      <div className="flex items-center justify-between w-full text-[10px] font-black text-purple-200 px-0.5">
        <span className="flex items-center gap-1"><Gift className="w-3.5 h-3.5 text-amber-300 animate-bounce" />Mystery Box</span>
        <button type="button" onClick={toggleOpen} className="bg-purple-950/80 hover:bg-purple-900 border border-purple-400 px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer flex items-center gap-1 text-purple-200">
          {isOpen ? <Unlock className="w-2.5 h-2.5 text-emerald-400" /> : <Lock className="w-2.5 h-2.5 text-amber-300" />}
          <span>{isOpen ? 'Unboxed' : 'Locked'}</span>
        </button>
      </div>

      {/* Main Content Area */}
      {isOpen ? (
        <div className="w-full my-1.5 p-2 bg-purple-950/90 border border-purple-400/60 rounded-xl text-center space-y-1.5 animate-in zoom-in-95 pointer-events-auto">
          {isEditing ? (
            <textarea value={secretContent} onChange={handleTextChange} onBlur={() => setIsEditing(false)} autoFocus rows={3} className="w-full p-1.5 bg-purple-900 text-white text-[11px] font-bold rounded border border-purple-400 focus:outline-none resize-none" />
          ) : (
            <div className="text-[12px] font-black text-amber-200 leading-snug drop-shadow-xs flex flex-col items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>{secretContent}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full my-2 flex flex-col items-center justify-center space-y-1 text-center">
          <div className="text-3xl animate-pulse">🎁</div>
          <p className="text-[10px] font-extrabold text-purple-100 tracking-wide">Click to Unbox Secret!</p>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="flex items-center justify-between w-full pointer-events-auto text-[9.5px]">
        <button type="button" onClick={toggleOpen} className={`w-full py-1 px-2 rounded-lg font-black flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-sm ${isOpen ? 'bg-amber-400 hover:bg-amber-500 text-purple-950' : 'bg-white hover:bg-purple-50 text-purple-900'}`}>
          <span>{isOpen ? '🔒 Re-Hide Secret' : '🎁 Unbox Secret Content'}</span>
        </button>
        {isOpen && !isEditing && (
          <button type="button" onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} className="ml-1 p-1 rounded-lg bg-purple-800 hover:bg-purple-700 text-purple-200 cursor-pointer" title="Edit Secret Text">
            <Edit3 className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};

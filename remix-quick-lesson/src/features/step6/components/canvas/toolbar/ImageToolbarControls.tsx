import React, { useState } from 'react';
import { SlideElement } from '../../../types/slideTypes';
import { CustomMaskModal } from '../CustomMaskModal';
import { MessageSquarePlus, Crop, ChevronDown, RotateCcw, Shapes, RectangleHorizontal, Square, Circle, Shield, Sparkles, RefreshCw, Move, Pencil } from 'lucide-react';

interface ImageToolbarControlsProps {
  selectedElement?: SlideElement;
  onOpenCrop: () => void;
  onUpdateMask: (maskShape: string, isInverted?: boolean, customPath?: string, maskScale?: number, maskX?: number, maskY?: number, isMaskEditing?: boolean) => void;
  onResetOrReplaceImage: () => void;
  onAddComment: () => void;
}

export const ImageToolbarControls: React.FC<ImageToolbarControlsProps> = ({
  selectedElement, onOpenCrop, onUpdateMask, onResetOrReplaceImage, onAddComment,
}) => {
  const [showMaskMenu, setShowMaskMenu] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const isImage = selectedElement?.type === 'image' || selectedElement?.type === 'video';
  const isInverted = Boolean(selectedElement?.meta?.isInvertedMask);
  const currentShape = (selectedElement?.meta?.maskShape as string) || 'standard';
  const customPath = selectedElement?.meta?.customPath as string;
  const currentScale = selectedElement?.meta?.maskScale ?? 100;
  const currentX = selectedElement?.meta?.maskX ?? 50;
  const currentY = selectedElement?.meta?.maskY ?? 50;
  const isMaskEditing = Boolean(selectedElement?.meta?.isMaskEditing);

  const applyMask = (shape: string, inverted = isInverted, path = customPath, scale = currentScale, x = currentX, y = currentY, editing = true) => {
    onUpdateMask(shape, inverted, path, scale, x, y, editing);
  };

  return (
    <div className="flex items-center gap-1 relative">
      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onAddComment} className="w-7 h-7 flex items-center justify-center rounded hover:bg-stone-200/80 text-stone-700 cursor-pointer transition-colors" title="Add comment / note">
        <MessageSquarePlus className="w-3.5 h-3.5 text-stone-700" />
      </button>

      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onOpenCrop} disabled={!isImage} className={`px-2 h-7 flex items-center gap-1 rounded border border-stone-200/80 transition-all ${isImage ? 'bg-stone-50 hover:bg-amber-50 hover:border-amber-300 text-stone-800 font-bold cursor-pointer shadow-2xs' : 'opacity-40 cursor-not-allowed text-stone-400'}`} title="Crop Image">
        <Crop className="w-3.5 h-3.5 text-amber-700" />
        <span className="text-[10.5px] font-bold text-stone-800">Crop</span>
      </button>

      {/* Mask Dropdown */}
      <div className="relative">
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowMaskMenu(!showMaskMenu)} disabled={!isImage} className={`h-7 px-2 flex items-center gap-1 rounded border border-stone-200/80 transition-all ${isImage ? 'bg-stone-50 hover:bg-amber-50 hover:border-amber-300 text-stone-800 font-bold cursor-pointer shadow-2xs' : 'opacity-40 cursor-not-allowed text-stone-400'}`} title="Mask Image Shape">
          <Shapes className="w-3.5 h-3.5 text-amber-700" />
          <span className="text-[10.5px] font-bold text-stone-800">Mask</span>
          <ChevronDown className="w-3 h-3 text-stone-500" />
        </button>

        {showMaskMenu && isImage && (
          <div className="absolute top-full left-0 mt-1 w-56 p-2 bg-white rounded-xl shadow-2xl border border-stone-200 z-50 space-y-1.5 animate-in fade-in">
            <div className="px-1 text-[9px] font-extrabold text-stone-400 uppercase tracking-wider">Mask Shapes</div>
            <div className="space-y-0.5 max-h-48 overflow-y-auto pr-0.5">
              <button type="button" onClick={() => { applyMask('standard', isInverted, undefined, 100, 50, 50, false); setShowMaskMenu(false); }} className="w-full px-2 py-1 text-left text-xs font-bold rounded hover:bg-amber-50 text-stone-800 flex items-center gap-2 cursor-pointer"><RectangleHorizontal className="w-3.5 h-3.5 text-amber-700" /> Standard (No Mask)</button>
              <button type="button" onClick={() => { applyMask('circle'); setShowMaskMenu(false); }} className="w-full px-2 py-1 text-left text-xs font-bold rounded hover:bg-amber-50 text-stone-800 flex items-center gap-2 cursor-pointer"><Circle className="w-3.5 h-3.5 text-amber-700" /> Circular Avatar</button>
              <button type="button" onClick={() => { applyMask('square'); setShowMaskMenu(false); }} className="w-full px-2 py-1 text-left text-xs font-bold rounded hover:bg-amber-50 text-stone-800 flex items-center gap-2 cursor-pointer"><Square className="w-3.5 h-3.5 text-amber-700" /> Square 1:1</button>
              <button type="button" onClick={() => { applyMask('rounded'); setShowMaskMenu(false); }} className="w-full px-2 py-1 text-left text-xs font-bold rounded hover:bg-amber-50 text-stone-800 flex items-center gap-2 cursor-pointer"><Shield className="w-3.5 h-3.5 text-amber-700" /> Rounded Card</button>
              <button type="button" onClick={() => { applyMask('star'); setShowMaskMenu(false); }} className="w-full px-2 py-1 text-left text-xs font-bold rounded hover:bg-amber-50 text-stone-800 flex items-center gap-2 cursor-pointer"><Sparkles className="w-3.5 h-3.5 text-amber-700" /> Star Badge</button>
              <button type="button" onClick={() => { setShowMaskMenu(false); setIsCustomModalOpen(true); }} className="w-full px-2 py-1.5 text-left text-xs font-extrabold rounded bg-amber-50 hover:bg-amber-100 text-amber-950 flex items-center gap-2 cursor-pointer"><Pencil className="w-3.5 h-3.5 text-amber-800" /> Draw Freehand with Pencil...</button>
            </div>

            {currentShape !== 'standard' && (
              <div className="pt-1 border-t border-stone-100 px-0.5 space-y-1">
                <button type="button" onClick={() => { applyMask(currentShape, isInverted, customPath, currentScale, currentX, currentY, true); setShowMaskMenu(false); }} className="w-full py-1.5 px-2 bg-amber-800 hover:bg-amber-900 text-white rounded-lg font-bold text-[10.5px] flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs">
                  <Move className="w-3.5 h-3.5 text-amber-200" />
                  <span>Show On-Canvas Sizing Nodes</span>
                </button>
                <button type="button" onClick={() => applyMask(currentShape, !isInverted, customPath, currentScale, currentX, currentY, isMaskEditing)} className={`w-full py-1 px-2 rounded-lg font-bold text-[10px] flex items-center justify-between cursor-pointer border ${isInverted ? 'bg-purple-100 border-purple-400 text-purple-950' : 'bg-stone-50 border-stone-200 text-stone-700'}`}>
                  <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3 text-purple-700" /> Invert Mask</span>
                  <span className="text-[9px] font-black">{isInverted ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dedicated On-Canvas Mask Nodes Button */}
      {isImage && currentShape !== 'standard' && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onUpdateMask(currentShape, isInverted, customPath, currentScale, currentX, currentY, !isMaskEditing)}
          className={`px-2 h-7 flex items-center gap-1 rounded border transition-all cursor-pointer ${
            isMaskEditing
              ? 'bg-amber-800 text-white border-amber-900 font-bold shadow-xs'
              : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 font-bold shadow-2xs'
          }`}
          title="Toggle on-canvas mask sizing nodes"
        >
          <Move className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold">Mask Nodes</span>
        </button>
      )}

      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onResetOrReplaceImage} disabled={!isImage} className="w-7 h-7 flex items-center justify-center rounded hover:bg-stone-200/80 text-stone-700 cursor-pointer transition-colors" title="Reset Image">
        <RotateCcw className="w-3.5 h-3.5 text-stone-700" />
      </button>

      <CustomMaskModal isOpen={isCustomModalOpen} selectedElement={selectedElement} onClose={() => setIsCustomModalOpen(false)} onApplyCustomMask={(shape, path) => applyMask(shape, isInverted, path, currentScale, currentX, currentY, true)} />
    </div>
  );
};

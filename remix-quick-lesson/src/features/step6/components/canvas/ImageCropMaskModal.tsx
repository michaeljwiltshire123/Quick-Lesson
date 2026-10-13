import React from 'react';
import { X, Crop, Square, Circle, RectangleHorizontal } from 'lucide-react';
import { SlideElement } from '../../types/slideTypes';

interface ImageCropMaskModalProps {
  isOpen: boolean;
  element?: SlideElement;
  onClose: () => void;
  onUpdateMask: (maskShape: 'standard' | 'circle' | 'square' | 'rounded') => void;
}

export const ImageCropMaskModal: React.FC<ImageCropMaskModalProps> = ({
  isOpen, element, onClose, onUpdateMask,
}) => {
  if (!isOpen || !element) return null;
  const currentMask = element.meta?.maskShape || 'standard';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4 border border-stone-200 animate-in fade-in zoom-in duration-150 cursor-default"
      >
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Crop className="w-4 h-4 text-amber-700" />
            <h3 className="text-sm font-bold text-stone-800">Image Framing & Mask</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer" title="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => { onUpdateMask('standard'); onClose(); }}
            className={`p-3 rounded-xl border text-center space-y-1.5 cursor-pointer transition-colors ${
              currentMask === 'standard' ? 'bg-amber-50 border-amber-500 text-amber-900' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <RectangleHorizontal className="w-5 h-5 mx-auto text-amber-700" />
            <div className="text-xs font-bold">Standard 16:9</div>
          </button>

          <button
            type="button"
            onClick={() => { onUpdateMask('square'); onClose(); }}
            className={`p-3 rounded-xl border text-center space-y-1.5 cursor-pointer transition-colors ${
              currentMask === 'square' ? 'bg-amber-50 border-amber-500 text-amber-900' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <Square className="w-5 h-5 mx-auto text-amber-700" />
            <div className="text-xs font-bold">Square (1:1)</div>
          </button>

          <button
            type="button"
            onClick={() => { onUpdateMask('circle'); onClose(); }}
            className={`p-3 rounded-xl border text-center space-y-1.5 cursor-pointer transition-colors ${
              currentMask === 'circle' ? 'bg-amber-50 border-amber-500 text-amber-900' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <Circle className="w-5 h-5 mx-auto text-amber-700" />
            <div className="text-xs font-bold">Circular Avatar</div>
          </button>

          <button
            type="button"
            onClick={() => { onUpdateMask('rounded'); onClose(); }}
            className={`p-3 rounded-xl border text-center space-y-1.5 cursor-pointer transition-colors ${
              currentMask === 'rounded' ? 'bg-amber-50 border-amber-500 text-amber-900' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div className="w-5 h-5 mx-auto border-2 border-amber-700 rounded-lg" />
            <div className="text-xs font-bold">Card Rounded</div>
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs cursor-pointer transition-colors"
        >
          Done / Close
        </button>
      </div>
    </div>
  );
};

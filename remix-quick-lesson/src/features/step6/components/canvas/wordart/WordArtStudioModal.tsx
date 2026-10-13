import React, { useState } from 'react';
import { SlideElement } from '../../../types/slideTypes';
import { CurvedTextType } from '../../../types/visualAidEffectTypes';
import { Sparkles, Smile, Waves, Sliders, X, Image as ImageIcon, CornerDownLeft, ArrowUpDown } from 'lucide-react';
import { generateCurvedBannerPng } from './generateCurvedBannerPng';

interface WordArtStudioModalProps {
  isOpen: boolean;
  selectedElement?: SlideElement;
  onClose: () => void;
  onInsertOrReplaceBanner: (bannerElement: SlideElement, replaceOriginal: boolean) => void;
}

export const WordArtStudioModal: React.FC<WordArtStudioModalProps> = ({
  isOpen, selectedElement, onClose, onInsertOrReplaceBanner,
}) => {
  if (!isOpen) return null;

  const currentStyle = (selectedElement?.textStyle || {}) as any;
  const initialText = (selectedElement?.type === 'text' ? selectedElement.content : selectedElement?.caption || 'Prior Knowledge Retrieval')
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .trim();

  const [text, setText] = useState(initialText || 'Key Lesson Title');
  const [curveType, setCurveType] = useState<CurvedTextType>('arc-up');
  const [degree, setDegree] = useState<number>(55);
  const [verticalShift, setVerticalShift] = useState<number>(0);
  const [color] = useState<string>(currentStyle.color || '#92400E');

  const previewPng = generateCurvedBannerPng({
    text: text || 'Banner Title', curvedType: curveType, curvedDegree: degree, verticalShift, color, bold: true,
  });

  const handleApply = (replace: boolean) => {
    const bannerElement: SlideElement = {
      id: `el-banner-${Date.now()}`, type: 'image', content: previewPng, caption: text,
      x: selectedElement ? selectedElement.x : 15, y: selectedElement ? selectedElement.y : 20,
      width: selectedElement ? Math.max(50, selectedElement.width) : 70,
      height: selectedElement ? Math.max(25, selectedElement.height) : 35,
      fillColor: 'transparent',
      meta: { isBannerSticker: true, curvedType: curveType, curvedDegree: degree, verticalShift },
    };
    onInsertOrReplaceBanner(bannerElement, replace);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-lg p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800"><Sparkles className="w-5 h-5" /></div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">Curved Banner & Sticker Studio</h3>
              <p className="text-xs text-stone-500">Generate a high-res transparent banner sticker for your slide</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-stone-700">Headline Words</label>
              <span className="text-[10px] text-amber-800 font-semibold flex items-center gap-0.5"><CornerDownLeft className="w-2.5 h-2.5" />Press Enter for custom line breaks</span>
            </div>
            <textarea
              rows={2} value={text} onChange={(e) => setText(e.target.value)}
              placeholder="Type headline words..."
              className="w-full px-3 py-1.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-amber-600 font-medium resize-none shadow-inner"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button type="button" onClick={() => setCurveType('arc-up')} className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border cursor-pointer ${curveType === 'arc-up' ? 'bg-amber-800 text-white border-amber-900 shadow-xs' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'}`}><Sparkles className="w-4 h-4" /><span>Arc Up</span></button>
            <button type="button" onClick={() => setCurveType('arc-down')} className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border cursor-pointer ${curveType === 'arc-down' ? 'bg-amber-800 text-white border-amber-900 shadow-xs' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'}`}><Smile className="w-4 h-4" /><span>Arc Down</span></button>
            <button type="button" onClick={() => setCurveType('wave')} className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border cursor-pointer ${curveType === 'wave' ? 'bg-amber-800 text-white border-amber-900 shadow-xs' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'}`}><Waves className="w-4 h-4" /><span>Wave</span></button>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-stone-700">
                <span className="flex items-center gap-1"><Sliders className="w-3.5 h-3.5 text-amber-700" />Arching Degree</span>
                <span className="text-amber-800 font-extrabold">{degree}°</span>
              </div>
              <input type="range" min="15" max="95" step="5" value={degree} onChange={(e) => setDegree(Number(e.target.value))} className="w-full accent-amber-800 cursor-pointer" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-stone-700">
                <span className="flex items-center gap-1"><ArrowUpDown className="w-3.5 h-3.5 text-amber-700" />Vertical Position</span>
                <button type="button" onClick={() => setVerticalShift(0)} className="text-[10px] text-amber-800 underline font-bold cursor-pointer">Reset ({verticalShift > 0 ? `+${verticalShift}` : verticalShift}px)</button>
              </div>
              <input type="range" min="-45" max="45" step="5" value={verticalShift} onChange={(e) => setVerticalShift(Number(e.target.value))} className="w-full accent-amber-800 cursor-pointer" />
            </div>
          </div>

          <div className="h-36 bg-stone-100/90 rounded-xl border border-dashed border-stone-300 p-2 flex items-center justify-center overflow-hidden relative shadow-inner">
            {previewPng ? (
              <img src={previewPng} alt="Banner Preview" className="w-full h-full object-contain filter drop-shadow-xs" />
            ) : (
              <span className="text-xs text-stone-400">Type headline words above to preview</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1.5 border-t border-stone-200">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer">Cancel</button>
          <button type="button" onClick={() => handleApply(true)} className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-800 hover:bg-amber-900 text-white flex items-center gap-1.5 shadow-sm cursor-pointer">
            <ImageIcon className="w-4 h-4" /><span>Replace Text Box with Banner</span>
          </button>
        </div>
      </div>
    </div>
  );
};

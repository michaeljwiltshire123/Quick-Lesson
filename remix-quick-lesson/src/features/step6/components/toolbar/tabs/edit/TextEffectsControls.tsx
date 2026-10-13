import React, { useRef } from 'react';
import { ElementTextStyle } from '../../../../types/slideTypes';
import { RibbonGradientId } from '../../../../types/visualAidEffectTypes';
import { Box, Layers, Award, Palette, ImagePlus, Check } from 'lucide-react';

interface TextEffectsControlsProps {
  textStyle?: ElementTextStyle & Record<string, any>;
  onUpdateStyle: (patch: Record<string, any>) => void;
}

const RIBBONS: Array<{ id: RibbonGradientId; label: string; preview: string }> = [
  { id: 'union-jack', label: 'Union Jack', preview: 'bg-gradient-to-r from-blue-900 via-white via-red-600 to-blue-900' },
  { id: 'gold-medal', label: 'Gold Medal', preview: 'bg-gradient-to-r from-amber-600 via-yellow-200 to-amber-700' },
  { id: 'olympic', label: 'Olympic', preview: 'bg-gradient-to-r from-blue-500 via-yellow-400 to-green-600' },
  { id: 'royal-purple', label: 'Royal Purple', preview: 'bg-gradient-to-r from-purple-700 via-fuchsia-400 to-yellow-300' },
  { id: 'emerald', label: 'Emerald Crest', preview: 'bg-gradient-to-r from-emerald-800 via-emerald-400 to-amber-300' },
];

const PRESET_3D_COLORS = ['#D97706', '#DC2626', '#16A34A', '#2563EB', '#9333EA', '#1C1917', '#FFFFFF'];

export const TextEffectsControls: React.FC<TextEffectsControlsProps> = ({
  textStyle = {}, onUpdateStyle,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const is3D = Boolean(textStyle.is3DBlock);
  const activeSticker = textStyle.stickerOutline || 'none';
  const activeRibbon: RibbonGradientId = textStyle.ribbonGradient || 'none';
  const customRibbonUrl = textStyle.customRibbonUrl;

  const handleCustomRibbonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (result) onUpdateStyle({ ribbonGradient: 'custom', customRibbonUrl: result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="p-2 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-stone-800 flex items-center gap-1.5 text-[11px]"><Box className="w-3.5 h-3.5 text-amber-700" /><span>3D Block Extrusion</span></span>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onUpdateStyle({ is3DBlock: !is3D })} className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer transition-all border ${is3D ? 'bg-amber-800 text-white border-amber-900 shadow-2xs' : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-300'}`}>{is3D ? '3D Active' : 'Apply 3D'}</button>
        </div>

        {is3D && (
          <div className="border-t border-stone-200/80 pt-1.5 flex items-center justify-between">
            <span className="text-[10px] font-bold text-stone-600 flex items-center gap-1"><Palette className="w-3 h-3 text-amber-700" />3D Colour</span>
            <div className="flex items-center gap-1">
              {PRESET_3D_COLORS.map((col) => (
                <button key={col} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onUpdateStyle({ color: col })} style={{ backgroundColor: col }} className={`w-3.5 h-3.5 rounded-full border border-stone-300 shadow-2xs hover:scale-115 cursor-pointer ${textStyle.color === col ? 'ring-2 ring-amber-700' : ''}`} />
              ))}
              <input type="color" value={textStyle.color || '#D97706'} onChange={(e) => onUpdateStyle({ color: e.target.value })} className="w-4 h-4 rounded cursor-pointer border-0 p-0" title="Custom colour" />
            </div>
          </div>
        )}

        <div className="border-t border-stone-200/80 pt-1.5 flex items-center justify-between">
          <span className="font-bold text-stone-800 flex items-center gap-1.5 text-[11px]"><Layers className="w-3.5 h-3.5 text-amber-700" />Sticker Outline</span>
          <div className="flex items-center gap-1">
            {(['none', 'white', 'gold', 'slate'] as const).map((opt) => (
              <button key={opt} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onUpdateStyle({ stickerOutline: opt === activeSticker ? 'none' : opt })} className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer border ${activeSticker === opt ? 'bg-amber-800 text-white border-amber-900' : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-300'}`}>{opt === 'none' ? 'Off' : opt.charAt(0).toUpperCase() + opt.slice(1)}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-2 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5">
        <div className="font-bold text-stone-800 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-amber-700" />Ribbon & Image Mask</span>
          {activeRibbon !== 'none' && (
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onUpdateStyle({ ribbonGradient: 'none' })} className="text-[10px] text-amber-800 hover:underline cursor-pointer">Clear</button>
          )}
        </div>

        <div className="flex items-center gap-1">
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleCustomRibbonUpload} />
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => fileInputRef.current?.click()} className="flex-1 py-1 px-1.5 rounded-lg bg-amber-100/80 hover:bg-amber-200/80 border border-amber-300 text-amber-900 font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer">
            <ImagePlus className="w-3 h-3 text-amber-800" /><span>+ Add Ribbon (Upload Image)</span>
          </button>
          {customRibbonUrl && (
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onUpdateStyle({ ribbonGradient: 'custom' })} className={`w-6 h-6 rounded-md border overflow-hidden relative cursor-pointer ${activeRibbon === 'custom' ? 'ring-2 ring-amber-700' : 'opacity-70'}`} title="Use uploaded custom image ribbon">
              <img src={customRibbonUrl} alt="Custom ribbon preview" className="w-full h-full object-cover" />
              {activeRibbon === 'custom' && <Check className="w-3 h-3 text-white drop-shadow absolute inset-0 m-auto" />}
            </button>
          )}
        </div>

        <div className="grid grid-cols-5 gap-1 pt-0.5">
          {RIBBONS.map((r) => (
            <button key={r.id} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onUpdateStyle({ ribbonGradient: r.id === activeRibbon ? 'none' : r.id })} className={`h-4.5 rounded-md ${r.preview} border ${activeRibbon === r.id ? 'ring-2 ring-amber-700 ring-offset-1 shadow-xs' : 'border-stone-300 hover:opacity-90'} cursor-pointer`} title={r.label} />
          ))}
        </div>
      </div>
    </div>
  );
};

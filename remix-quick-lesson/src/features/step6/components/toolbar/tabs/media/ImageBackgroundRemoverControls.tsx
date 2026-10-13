import React, { useState } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { removeImageBackground, BgRemovalMode } from './imageBackgroundRemovalUtils';
import { Wand2, RotateCcw, Sparkles, Shield, Check } from 'lucide-react';

interface ImageBackgroundRemoverControlsProps {
  selectedElement?: SlideElement;
  onUpdateElement?: (patch: Partial<SlideElement>) => void;
}

const MODES: { id: BgRemovalMode; label: string }[] = [
  { id: 'auto', label: 'Auto Corner' },
  { id: 'white', label: 'White / Studio' },
  { id: 'black', label: 'Dark / Black' },
  { id: 'chroma', label: 'Chroma Green' },
];

export const ImageBackgroundRemoverControls: React.FC<ImageBackgroundRemoverControlsProps> = ({
  selectedElement, onUpdateElement,
}) => {
  const meta = selectedElement?.meta || {};
  const content = selectedElement?.content || '';
  const [tolerance, setTolerance] = useState<number>(meta.bgTolerance ?? 36);
  const [mode, setMode] = useState<BgRemovalMode>(meta.bgMode ?? 'auto');
  const [edgeOnly, setEdgeOnly] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const hasOriginal = Boolean(meta.originalContent);

  const handleRemove = async () => {
    if (!content) return;
    setIsProcessing(true);
    try {
      const original = meta.originalContent || content;
      const cutout = await removeImageBackground(original, { tolerance, feather: 2, mode, edgeOnly });
      onUpdateElement?.({
        content: cutout,
        meta: { ...meta, originalContent: original, hasRemovedBg: true, bgTolerance: tolerance, bgMode: mode },
      });
    } catch {
      /* ignore */
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestore = () => {
    if (!meta.originalContent) return;
    onUpdateElement?.({
      content: meta.originalContent,
      meta: { ...meta, originalContent: undefined, hasRemovedBg: false },
    });
  };

  return (
    <div className="space-y-2 pt-1 text-xs text-stone-700">
      <div className="space-y-1">
        <span className="text-[10px] text-stone-600 font-semibold">Background Target Color</span>
        <div className="grid grid-cols-2 gap-1">
          {MODES.map((m) => (
            <button
              key={m.id} type="button" onClick={() => setMode(m.id)}
              className={`py-1 px-1.5 rounded-lg border text-[10px] font-semibold text-center cursor-pointer transition-colors ${
                mode === m.id ? 'bg-amber-700 border-amber-800 text-white' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1 pt-1 border-t border-stone-200">
        <div className="flex items-center justify-between text-[10px] text-stone-600 font-medium">
          <span>Cut Sensitivity</span>
          <span className="font-extrabold text-amber-800">{tolerance}</span>
        </div>
        <input
          type="range" min={8} max={85} value={tolerance}
          onChange={(e) => setTolerance(Number(e.target.value))}
          className="w-full accent-amber-700 cursor-pointer"
        />
      </div>

      <button
        type="button" onClick={() => setEdgeOnly(!edgeOnly)}
        className={`w-full py-1 px-2 rounded-lg border text-[10px] font-semibold flex items-center justify-between cursor-pointer transition-colors ${
          edgeOnly ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-100'
        }`}
      >
        <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-amber-700" /><span>Protect Inner Subject (Edge-Inward)</span></span>
        {edgeOnly && <Check className="w-3 h-3 text-amber-700" />}
      </button>

      <div className="grid grid-cols-2 gap-1.5 pt-1">
        <button
          type="button" disabled={!content || isProcessing} onClick={handleRemove}
          className="py-1.5 px-2 rounded-lg bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white font-bold text-[10.5px] flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-all"
        >
          {isProcessing ? <Sparkles className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
          <span>{isProcessing ? 'Cutting...' : 'Cut Background'}</span>
        </button>

        <button
          type="button" disabled={!hasOriginal} onClick={handleRestore}
          className="py-1.5 px-2 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 disabled:opacity-40 text-stone-800 font-bold text-[10.5px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-stone-600" />
          <span>Restore Original</span>
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { getExportFallbackLabel } from '../../../../services/animationExportMapper';
import { Box, Sparkles, ArrowRightLeft, Check, RefreshCw } from 'lucide-react';

interface Interactive3DControlsProps {
  selectedElement?: SlideElement;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
}

export const Interactive3DControls: React.FC<Interactive3DControlsProps> = ({
  selectedElement, onUpdateElementMeta,
}) => {
  const meta = selectedElement?.meta || {};
  const is3DZoom = Boolean(meta.is3DZoom);
  const is3DCardFlip = Boolean(meta.is3DCardFlip);

  const zoomFallback = getExportFallbackLabel('3d_zoom');
  const flipFallback = getExportFallbackLabel('3d_flip');

  return (
    <div className="space-y-2 p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700">
      <div className="font-bold text-stone-800 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Box className="w-3.5 h-3.5 text-amber-700" />
          <span>Interactive 3D Motion Suite</span>
        </span>
        {(is3DZoom || is3DCardFlip) && (
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" /> 3D Active
          </span>
        )}
      </div>

      <div className="space-y-1.5 pt-0.5">
        <button
          type="button"
          onClick={() => onUpdateElementMeta({ is3DZoom: !is3DZoom, is3DCardFlip: false })}
          className={`w-full py-1.5 px-2.5 rounded-lg border text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
            is3DZoom
              ? 'bg-amber-800 text-white border-amber-900 shadow-2xs'
              : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>3D Focus Zoom & Pan (Prezi Style)</span>
          </span>
          {is3DZoom && <Check className="w-3.5 h-3.5 text-amber-200" />}
        </button>

        {is3DZoom && (
          <div className="p-1 bg-amber-50/80 border border-amber-200 rounded-lg flex items-center justify-between text-[10px]">
            <span className="text-stone-600 flex items-center gap-1">
              <ArrowRightLeft className="w-3 h-3 text-amber-700" />
              <span>Export Fallback:</span>
            </span>
            <span className="font-bold text-amber-900 bg-white px-1.5 py-0.5 rounded border border-amber-300">
              Export: {zoomFallback}
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={() => onUpdateElementMeta({ is3DCardFlip: !is3DCardFlip, is3DZoom: false })}
          className={`w-full py-1.5 px-2.5 rounded-lg border text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
            is3DCardFlip
              ? 'bg-amber-800 text-white border-amber-900 shadow-2xs'
              : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive 3D Card Flip</span>
          </span>
          {is3DCardFlip && <Check className="w-3.5 h-3.5 text-amber-200" />}
        </button>

        {is3DCardFlip && (
          <div className="p-1 bg-amber-50/80 border border-amber-200 rounded-lg flex items-center justify-between text-[10px]">
            <span className="text-stone-600 flex items-center gap-1">
              <ArrowRightLeft className="w-3 h-3 text-amber-700" />
              <span>Export Fallback:</span>
            </span>
            <span className="font-bold text-amber-900 bg-white px-1.5 py-0.5 rounded border border-amber-300">
              Export: {flipFallback}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

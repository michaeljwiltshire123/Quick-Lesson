import React from 'react';
import { Sparkles, Link2, ExternalLink, Eye, AlignCenter } from 'lucide-react';

interface ImageCaptionAndLinkControlsProps {
  caption?: string;
  meta?: Record<string, any>;
  slideTitle?: string;
  onUpdateCaption: (caption: string) => void;
  onUpdateMeta: (patch: Record<string, any>) => void;
}

export const ImageCaptionAndLinkControls: React.FC<ImageCaptionAndLinkControlsProps> = ({
  caption = '', meta = {}, slideTitle = 'Lesson Material', onUpdateCaption, onUpdateMeta,
}) => {
  const linkUrl = meta.linkUrl || '';
  const altText = meta.altText || '';
  const captionPos = meta.captionPosition || 'bottom';

  const generateAutoCaption = () => {
    onUpdateCaption(`Figure: Key visual breakdown for ${slideTitle}`);
    if (!altText) {
      onUpdateMeta({ altText: `Educational illustration supporting ${slideTitle}` });
    }
  };

  return (
    <div className="space-y-2 pt-1 text-xs text-stone-700">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-[10px] text-stone-600 font-semibold flex items-center gap-1">
            <AlignCenter className="w-3 h-3 text-amber-700" />
            <span>Image Caption (Visible on Slide)</span>
          </label>
          <button type="button" onClick={generateAutoCaption} className="text-[10px] text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 cursor-pointer">
            <Sparkles className="w-3 h-3 text-amber-700" /><span>Auto-Generate</span>
          </button>
        </div>
        <input
          type="text" value={caption} placeholder="e.g. Figure 1: Cellular respiration"
          onChange={(e) => onUpdateCaption(e.target.value)}
          className="w-full text-[11px] p-1.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600 font-medium"
        />
        {caption && (
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="text-[9.5px] text-stone-500">Placement:</span>
            <button type="button" onClick={() => onUpdateMeta({ captionPosition: 'bottom' })} className={`text-[9.5px] px-1.5 py-0.5 rounded border cursor-pointer ${captionPos === 'bottom' ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold' : 'bg-white border-stone-200 text-stone-600'}`}>Underneath</button>
            <button type="button" onClick={() => onUpdateMeta({ captionPosition: 'overlay' })} className={`text-[9.5px] px-1.5 py-0.5 rounded border cursor-pointer ${captionPos === 'overlay' ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold' : 'bg-white border-stone-200 text-stone-600'}`}>Bottom Overlay</button>
          </div>
        )}
      </div>

      <div className="space-y-1 pt-1 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <label className="text-[10px] text-stone-600 font-semibold flex items-center gap-1">
            <Eye className="w-3 h-3 text-amber-700" />
            <span>Alt Text ([ALT] Tag on Slide)</span>
          </label>
          {altText && <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1 rounded">Accessible</span>}
        </div>
        <input
          type="text" value={altText} placeholder="Describe for screen readers & visual accessibility"
          onChange={(e) => onUpdateMeta({ altText: e.target.value })}
          className="w-full text-[11px] p-1.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600 font-medium"
        />
      </div>

      <div className="space-y-1 pt-1 border-t border-stone-200">
        <label className="text-[10px] text-stone-600 font-semibold flex items-center gap-1">
          <Link2 className="w-3 h-3 text-amber-700" />
          <span>Clickable Hyperlink (Interactive Link)</span>
        </label>
        <div className="flex items-center gap-1">
          <input
            type="url" value={linkUrl} placeholder="https://example.com/worksheet"
            onChange={(e) => onUpdateMeta({ linkUrl: e.target.value })}
            className="flex-1 text-[11px] p-1.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600 font-medium"
          />
          {linkUrl && (
            <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg text-amber-900 cursor-pointer" title="Test Link">
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { MediaCollapsibleDrawer } from './MediaCollapsibleDrawer';
import { ImageInsertUrlControls } from './ImageInsertUrlControls';
import { ImageSearchPickerControls } from './ImageSearchPickerControls';
import { ImageTransformControls } from './ImageTransformControls';
import { ImageBackgroundRemoverControls } from './ImageBackgroundRemoverControls';
import { ImageCaptionAndLinkControls } from './ImageCaptionAndLinkControls';
import { ImageBlurControls } from './ImageBlurControls';
import { ImageShadowControls } from './ImageShadowControls';
import { ImageAdjustmentControls } from './ImageAdjustmentControls';
import { ImageBorderCornerControls } from './ImageBorderCornerControls';
import { Search, Wand2, Type, Sun, SlidersHorizontal, Square, Sliders, Move, Aperture } from 'lucide-react';

interface ImageSubTabProps {
  selectedElement?: SlideElement;
  slideTitle?: string;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
  onUpdateElementContent?: (content: string) => void;
  onUpdateElementCaption?: (caption: string) => void;
  onUpdateElement?: (patch: Partial<SlideElement>) => void;
  onInsertElement: (newElement: SlideElement) => void;
}

export const ImageSubTab: React.FC<ImageSubTabProps> = ({
  selectedElement, slideTitle, onUpdateElementMeta, onUpdateElementContent, onUpdateElementCaption, onUpdateElement, onInsertElement,
}) => {
  const [openDrawers, setOpenDrawers] = useState<Record<string, boolean>>({
    search: false, transform: false, bgRemover: false, caption: false, blur: false, shadow: false, adjustment: false, border: false,
  });

  const toggleDrawer = (key: string) => setOpenDrawers((prev) => ({ ...prev, [key]: !prev[key] }));
  const meta = selectedElement?.meta || {};
  const opacity = meta.opacity ?? 100;
  const blurBadge = meta.blurType && meta.blurType !== 'none' ? `${meta.blurType} (${meta.blurAmount ?? 8}px)` : undefined;

  return (
    <div className="space-y-2 text-xs text-stone-700 animate-in fade-in pt-1">
      <MediaCollapsibleDrawer title="Add & Search Media" icon={<Search className="w-3.5 h-3.5 text-amber-700" />} badge={openDrawers.search ? 'Open' : undefined} isOpen={Boolean(openDrawers.search)} onToggle={() => toggleDrawer('search')}>
        <div className="space-y-3">
          <ImageInsertUrlControls selectedElement={selectedElement} onInsertElement={onInsertElement} onReplaceContent={onUpdateElementContent} />
          <div className="pt-2 border-t border-stone-200"><span className="text-[10px] text-stone-500 font-bold block mb-1">Google Slides Library</span><ImageSearchPickerControls onInsertElement={onInsertElement} /></div>
        </div>
      </MediaCollapsibleDrawer>

      <MediaCollapsibleDrawer title="Transforms & Replace" icon={<Move className="w-3.5 h-3.5 text-amber-700" />} badge={meta.flipH || meta.flipV ? 'Flipped' : undefined} isOpen={Boolean(openDrawers.transform)} onToggle={() => toggleDrawer('transform')}>
        <ImageTransformControls meta={meta} onUpdateMeta={onUpdateElementMeta} onReplaceContent={onUpdateElementContent} />
      </MediaCollapsibleDrawer>

      <MediaCollapsibleDrawer title="1-Click Background Remover" icon={<Wand2 className="w-3.5 h-3.5 text-amber-700" />} badge={meta.hasRemovedBg ? 'Cut' : undefined} isOpen={Boolean(openDrawers.bgRemover)} onToggle={() => toggleDrawer('bgRemover')}>
        <ImageBackgroundRemoverControls selectedElement={selectedElement} onUpdateElement={onUpdateElement} />
      </MediaCollapsibleDrawer>

      <MediaCollapsibleDrawer title="Caption, Alt Text & Link" icon={<Type className="w-3.5 h-3.5 text-amber-700" />} badge={selectedElement?.caption || meta.linkUrl ? 'Linked' : undefined} isOpen={Boolean(openDrawers.caption)} onToggle={() => toggleDrawer('caption')}>
        <ImageCaptionAndLinkControls caption={selectedElement?.caption} meta={meta} slideTitle={slideTitle} onUpdateCaption={(c) => onUpdateElementCaption?.(c)} onUpdateMeta={onUpdateElementMeta} />
      </MediaCollapsibleDrawer>

      <MediaCollapsibleDrawer title="Creative Blur & Depth Effects" icon={<Aperture className="w-3.5 h-3.5 text-amber-700" />} badge={blurBadge} isOpen={Boolean(openDrawers.blur)} onToggle={() => toggleDrawer('blur')}>
        <ImageBlurControls meta={meta} onUpdateMeta={onUpdateElementMeta} />
      </MediaCollapsibleDrawer>

      <MediaCollapsibleDrawer title="Drop Shadow & Elevation" icon={<Sun className="w-3.5 h-3.5 text-amber-700" />} badge={meta.shadowStyle && meta.shadowStyle !== 'none' ? meta.shadowStyle : undefined} isOpen={Boolean(openDrawers.shadow)} onToggle={() => toggleDrawer('shadow')}>
        <ImageShadowControls meta={meta} onUpdateMeta={onUpdateElementMeta} />
      </MediaCollapsibleDrawer>

      <MediaCollapsibleDrawer title="Image Adjustments & Tone" icon={<SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />} badge={meta.brightness !== undefined && meta.brightness !== 100 ? 'Active' : undefined} isOpen={Boolean(openDrawers.adjustment)} onToggle={() => toggleDrawer('adjustment')}>
        <ImageAdjustmentControls meta={meta} onUpdateMeta={onUpdateElementMeta} />
      </MediaCollapsibleDrawer>

      <MediaCollapsibleDrawer title="Corners & Borders" icon={<Square className="w-3.5 h-3.5 text-amber-700" />} badge={meta.imageRadius ? `${meta.imageRadius}px` : undefined} isOpen={Boolean(openDrawers.border)} onToggle={() => toggleDrawer('border')}>
        <ImageBorderCornerControls meta={meta} onUpdateMeta={onUpdateElementMeta} />
      </MediaCollapsibleDrawer>

      <div className="space-y-1.5 p-2.5 bg-stone-50 border border-stone-200 rounded-xl">
        <div className="flex items-center justify-between font-bold text-stone-800 text-[11px]"><span className="flex items-center gap-1.5"><Sliders className="w-3.5 h-3.5 text-amber-700" /><span>Image Opacity</span></span><span className="text-amber-800 text-[11px] font-bold">{opacity}%</span></div>
        <input type="range" min={20} max={100} value={opacity} onChange={(e) => onUpdateElementMeta({ opacity: Number(e.target.value) || 100 })} className="w-full accent-amber-700 cursor-pointer" />
      </div>
    </div>
  );
};

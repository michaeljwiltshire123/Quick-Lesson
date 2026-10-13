import React, { useState } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { Sparkles, Image as ImageIcon } from 'lucide-react';
import { WordArtStudioModal } from '../../../canvas/wordart/WordArtStudioModal';

interface CurvedTextControlsProps {
  selectedElement?: SlideElement;
  onUpdateElement?: (patch: Partial<SlideElement>) => void;
  onReplaceElement?: (newElement: SlideElement) => void;
}

export const CurvedTextControls: React.FC<CurvedTextControlsProps> = ({
  selectedElement, onReplaceElement,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyBanner = (bannerElement: SlideElement, _replace: boolean) => {
    if (onReplaceElement) {
      onReplaceElement(bannerElement);
    }
  };

  return (
    <div className="space-y-1.5 p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl">
      <div className="font-bold text-stone-800 flex items-center justify-between text-[11px]">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Curved Banner Sticker</span>
        </span>
      </div>

      <p className="text-[11px] text-stone-600 leading-snug">
        Convert this text into a high-res arched banner sticker with custom curvature.
      </p>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-full py-2 px-3 rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-all"
      >
        <ImageIcon className="w-3.5 h-3.5 text-amber-200" />
        <span>Open Banner Studio...</span>
      </button>

      <WordArtStudioModal
        isOpen={isModalOpen}
        selectedElement={selectedElement}
        onClose={() => setIsModalOpen(false)}
        onInsertOrReplaceBanner={handleApplyBanner}
      />
    </div>
  );
};

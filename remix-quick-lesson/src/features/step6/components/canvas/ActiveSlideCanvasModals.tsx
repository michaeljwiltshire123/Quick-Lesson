import React from 'react';
import { SlideElement } from '../../types/slideTypes';
import { ImageCropMaskModal } from './ImageCropMaskModal';
import { SlideTextTranslatorModal } from './SlideTextTranslatorModal';

interface ActiveSlideCanvasModalsProps {
  cropElement?: SlideElement;
  onCloseCrop?: () => void;
  onUpdateMask?: (mask: string) => void;
  translateText?: string;
  onCloseTranslate: () => void;
  onApplyTranslation: (translation: string) => void;
}

export const ActiveSlideCanvasModals: React.FC<ActiveSlideCanvasModalsProps> = ({
  cropElement, onCloseCrop, onUpdateMask,
  translateText, onCloseTranslate, onApplyTranslation,
}) => {
  return (
    <>
      {cropElement && onCloseCrop && onUpdateMask && (
        <ImageCropMaskModal
          isOpen={Boolean(cropElement)}
          element={cropElement}
          onClose={onCloseCrop}
          onUpdateMask={onUpdateMask}
        />
      )}
      <SlideTextTranslatorModal
        isOpen={Boolean(translateText !== undefined)}
        sourceText={translateText || ''}
        onClose={onCloseTranslate}
        onApplyTranslation={onApplyTranslation}
      />
    </>
  );
};

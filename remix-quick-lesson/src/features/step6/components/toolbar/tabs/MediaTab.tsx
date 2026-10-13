import React, { useState, useEffect } from 'react';
import { SlideElement } from '../../../types/slideTypes';
import { MediaSubTabHeader, MediaSubTabType, ImageSubTab, VideoSubTab } from './media';

interface MediaTabProps {
  selectedElement?: SlideElement;
  slideTitle?: string;
  chunkId?: string;
  onOpenVideoModal?: () => void;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
  onUpdateElementContent?: (content: string) => void;
  onUpdateElementCaption?: (caption: string) => void;
  onUpdateElement?: (patch: Partial<SlideElement>) => void;
  onInsertElement: (newElement: SlideElement) => void;
}

export const MediaTab: React.FC<MediaTabProps> = ({
  selectedElement, slideTitle, chunkId, onOpenVideoModal, onUpdateElementMeta, onUpdateElementContent, onUpdateElementCaption, onUpdateElement, onInsertElement,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<MediaSubTabType>(
    selectedElement?.type === 'video' ? 'video' : 'image'
  );

  useEffect(() => {
    if (selectedElement?.type === 'video') {
      setActiveSubTab('video');
    }
  }, [selectedElement?.type]);

  return (
    <div className="space-y-1 text-xs text-stone-700 animate-in fade-in">
      <MediaSubTabHeader
        activeSubTab={activeSubTab}
        onChangeSubTab={setActiveSubTab}
      />

      <div className="pt-0.5">
        {activeSubTab === 'image' && (
          <ImageSubTab
            selectedElement={selectedElement}
            slideTitle={slideTitle}
            onUpdateElementMeta={onUpdateElementMeta}
            onUpdateElementContent={onUpdateElementContent}
            onUpdateElementCaption={onUpdateElementCaption}
            onUpdateElement={onUpdateElement}
            onInsertElement={onInsertElement}
          />
        )}

        {activeSubTab === 'video' && (
          <VideoSubTab
            selectedElement={selectedElement}
            chunkId={chunkId}
            slideTitle={slideTitle}
            onOpenVideoModal={onOpenVideoModal}
            onUpdateElementMeta={onUpdateElementMeta}
            onUpdateElementContent={onUpdateElementContent}
            onInsertElement={onInsertElement}
          />
        )}
      </div>
    </div>
  );
};

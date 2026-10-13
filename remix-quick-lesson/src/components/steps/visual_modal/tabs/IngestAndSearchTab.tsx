import React from 'react';
import { UploadZone } from '../UploadZone';
import { StylePresetGrid } from '../StylePresetGrid';

interface IngestAndSearchTabProps {
  onAttachVisual: (title: string, url: string, microThumbnail?: string) => void;
  slideTitle?: string;
}

export const IngestAndSearchTab: React.FC<IngestAndSearchTabProps> = ({ onAttachVisual, slideTitle }) => {
  return (
    <div className="space-y-4">
      <UploadZone onAttachVisual={onAttachVisual} />
      <StylePresetGrid slideTitle={slideTitle} />
    </div>
  );
};

import React from 'react';
import { UploadZone } from '../UploadZone';
import { PromptBuilder } from '../PromptBuilder';

interface PromptLabTabProps {
  onAttachVisual: (title: string, url: string, microThumbnail?: string) => void;
  slideTitle?: string;
  themeNotes?: string;
}

export const PromptLabTab: React.FC<PromptLabTabProps> = ({ onAttachVisual, slideTitle, themeNotes }) => {
  return (
    <div className="space-y-4">
      <UploadZone onAttachVisual={onAttachVisual} />
      <PromptBuilder slideTitle={slideTitle} themeNotes={themeNotes} />
    </div>
  );
};

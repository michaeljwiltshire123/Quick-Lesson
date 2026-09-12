import React from 'react';
import { ChunkAttachment } from '../../../../types';
import { VideoUploadZone } from '../VideoUploadZone';
import { AiVideoLabTab } from './AiVideoLabTab';

interface VideoAiLabTabContainerProps {
  onAttachVideo: (att: Partial<ChunkAttachment>) => void;
  slideTitle?: string;
  themeNotes?: string;
}

export const VideoAiLabTabContainer: React.FC<VideoAiLabTabContainerProps> = ({
  onAttachVideo, slideTitle = '', themeNotes,
}) => {
  return (
    <div className="space-y-4">
      <VideoUploadZone onAttachVideo={onAttachVideo} />
      <AiVideoLabTab slideTitle={slideTitle} themeNotes={themeNotes} />
    </div>
  );
};

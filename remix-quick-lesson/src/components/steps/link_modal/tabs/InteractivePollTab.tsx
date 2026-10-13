import React from 'react';
import { InteractivePollTabContainer } from './interactive_poll';
import { ChunkAttachment, LessonChunk } from '../../../../types';

interface Props {
  activeChunk?: LessonChunk;
  slideTitle?: string;
  subject?: string;
  gradeLevel?: string;
  onAddAttachment?: (att: Partial<ChunkAttachment>) => void;
  onUpdateChunk?: (updated: LessonChunk) => void;
}

export const InteractivePollTab: React.FC<Props> = ({
  activeChunk,
  slideTitle,
  subject,
  gradeLevel,
  onAddAttachment,
  onUpdateChunk,
}) => (
  <InteractivePollTabContainer
    activeChunk={activeChunk}
    slideTitle={slideTitle}
    subject={subject}
    gradeLevel={gradeLevel}
    onAddAttachment={onAddAttachment}
    onUpdateChunk={onUpdateChunk}
  />
);

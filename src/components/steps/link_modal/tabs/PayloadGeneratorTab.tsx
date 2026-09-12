import React from 'react';
import { PayloadTabContainer } from './payload/PayloadTabContainer';
import { ChunkAttachment } from '../../../../types';

interface PayloadGeneratorTabProps {
  chunkTitle: string;
  subject?: string;
  gradeLevel?: string;
  onAddAttachment?: (att: Partial<ChunkAttachment>) => void;
}

export const PayloadGeneratorTab: React.FC<PayloadGeneratorTabProps> = ({
  chunkTitle,
  subject,
  gradeLevel,
  onAddAttachment,
}) => {
  return (
    <PayloadTabContainer
      chunkTitle={chunkTitle}
      subject={subject}
      gradeLevel={gradeLevel}
      onAddAttachment={onAddAttachment}
    />
  );
};

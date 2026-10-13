import React from 'react';
import { SlideElement } from '../types/slideTypes';
import { ClassroomTimersModal } from './canvas/ClassroomTimersModal';
import { AddVideoResourceModal } from '../../../components/steps/AddVideoResourceModal';
import { ChunkAttachment } from '../../../types';

interface Step6EditorModalsProps {
  isTimersOpen: boolean;
  isVideoModalOpen: boolean;
  slideTitle?: string;
  onCloseTimers: () => void;
  onCloseVideoModal: () => void;
  onInsertTimer: (element: SlideElement) => void;
  onApplyVideoAttachment: (att: Partial<ChunkAttachment>) => void;
}

export const Step6EditorModals: React.FC<Step6EditorModalsProps> = ({
  isTimersOpen, isVideoModalOpen, slideTitle = '', onCloseTimers, onCloseVideoModal,
  onInsertTimer, onApplyVideoAttachment,
}) => {
  return (
    <>
      <ClassroomTimersModal
        isOpen={isTimersOpen}
        onClose={onCloseTimers}
        onInsertTimer={onInsertTimer}
      />
      <AddVideoResourceModal
        isOpen={isVideoModalOpen}
        onClose={onCloseVideoModal}
        onAddAttachment={onApplyVideoAttachment}
        slideTitle={slideTitle}
        mode="ai_lab_only"
      />
    </>
  );
};

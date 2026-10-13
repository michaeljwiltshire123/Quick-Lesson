import React from 'react';
import { LessonChunk, ChunkAttachment, ModuleScheme } from '../../types';
import { AddVisualResourceModal } from '../steps/AddVisualResourceModal';
import { AddVideoResourceModal } from '../steps/AddVideoResourceModal';
import { AddQuizResourceModal } from '../steps/AddQuizResourceModal';

interface Step3ResourceModalsProps {
  isVisualOpen: boolean;
  isVideoOpen: boolean;
  isQuizOpen: boolean;
  onCloseVisual: () => void;
  onCloseVideo: () => void;
  onCloseQuiz: () => void;
  activeChunk?: LessonChunk;
  lessonTitle?: string;
  subject?: string;
  gradeLevel?: string;
  themeNotes?: string;
  moduleScheme?: ModuleScheme;
  onAddAttachment: (partial: Partial<ChunkAttachment>) => void;
  onRemoveAttachment: (attId: string) => void;
  onUpdateSingleChunk?: (updated: LessonChunk) => void;
}

export const Step3ResourceModals: React.FC<Step3ResourceModalsProps> = ({
  isVisualOpen, isVideoOpen, isQuizOpen, onCloseVisual, onCloseVideo, onCloseQuiz,
  activeChunk, lessonTitle = '', subject = '', gradeLevel = '', themeNotes = '', moduleScheme,
  onAddAttachment, onRemoveAttachment, onUpdateSingleChunk,
}) => {
  const slideTitle = activeChunk?.title || lessonTitle;

  return (
    <>
      <AddVisualResourceModal
        isOpen={isVisualOpen}
        onClose={onCloseVisual}
        onAdd={(name, url, thumb) => onAddAttachment({ name, url, type: 'image', microThumbnail: thumb })}
        attachments={activeChunk?.attachments}
        slideTitle={slideTitle}
        themeNotes={themeNotes}
      />
      <AddVideoResourceModal
        isOpen={isVideoOpen}
        onClose={onCloseVideo}
        onAddAttachment={onAddAttachment}
        attachments={activeChunk?.attachments}
        slideTitle={slideTitle}
        lessonTitle={lessonTitle}
        subject={subject}
        gradeLevel={gradeLevel}
        themeNotes={themeNotes}
        requiredDeliverables={moduleScheme?.deliverables}
        assessedCriteria={moduleScheme?.assessedCriteria}
      />
      <AddQuizResourceModal
        isOpen={isQuizOpen}
        onClose={onCloseQuiz}
        onAddAttachment={onAddAttachment}
        onRemoveAttachment={onRemoveAttachment}
        attachments={activeChunk?.attachments}
        slideTitle={slideTitle}
        subject={subject}
        gradeLevel={gradeLevel}
        activeChunk={activeChunk}
        onUpdateChunk={onUpdateSingleChunk}
        themeNotes={themeNotes}
      />
    </>
  );
};

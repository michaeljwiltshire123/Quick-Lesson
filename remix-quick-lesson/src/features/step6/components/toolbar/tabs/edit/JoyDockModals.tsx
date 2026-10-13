import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { SpinWheelAndNoiseMeter } from '../../../joy/SpinWheelAndNoiseMeter';
import { ClassroomMemeModal } from '../../../joy/ClassroomMemeModal';
import { MysteryBoxModal } from '../../../joy/MysteryBoxModal';
import { SpotlightAndDiscoMode } from '../../../joy/SpotlightAndDiscoMode';

interface JoyDockModalsProps {
  modalType: 'wheel' | 'meter' | null;
  isMemeOpen: boolean;
  isMysteryOpen: boolean;
  isSpotlightActive: boolean;
  isDiscoActive: boolean;
  onCloseModal: () => void;
  onCloseMeme: () => void;
  onCloseMystery: () => void;
  onInsertMeme: (element: SlideElement) => void;
  onConfirmMystery: (secretText: string) => void;
  onToggleSpotlight: () => void;
  onToggleDisco: () => void;
}

export const JoyDockModals: React.FC<JoyDockModalsProps> = ({
  modalType, isMemeOpen, isMysteryOpen, isSpotlightActive, isDiscoActive,
  onCloseModal, onCloseMeme, onCloseMystery, onInsertMeme, onConfirmMystery,
  onToggleSpotlight, onToggleDisco,
}) => {
  return (
    <>
      <SpinWheelAndNoiseMeter isOpen={Boolean(modalType)} type={modalType || 'wheel'} onClose={onCloseModal} />
      <ClassroomMemeModal isOpen={isMemeOpen} onClose={onCloseMeme} onInsertMeme={onInsertMeme} />
      <MysteryBoxModal isOpen={isMysteryOpen} onClose={onCloseMystery} onConfirm={onConfirmMystery} />
      <SpotlightAndDiscoMode
        isSpotlightActive={isSpotlightActive} isDiscoActive={isDiscoActive}
        onToggleSpotlight={onToggleSpotlight} onToggleDisco={onToggleDisco}
      />
    </>
  );
};

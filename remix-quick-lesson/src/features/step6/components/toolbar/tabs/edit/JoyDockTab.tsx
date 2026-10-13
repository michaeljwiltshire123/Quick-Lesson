import React, { useState } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { JoyDockPupilPersonalisation } from './JoyDockPupilPersonalisation';
import { JoyDockStampsGroup } from './JoyDockStampsGroup';
import { JoyDockInteractiveModes } from './JoyDockInteractiveModes';
import { JoyDockModals } from './JoyDockModals';

interface JoyDockTabProps {
  selectedElement?: SlideElement;
  onUpdateElement?: (patch: Partial<SlideElement>) => void;
  onInsertElement: (element: SlideElement) => void;
}

export const JoyDockTab: React.FC<JoyDockTabProps> = ({
  selectedElement, onUpdateElement, onInsertElement,
}) => {
  const [modalType, setModalType] = useState<'wheel' | 'meter' | null>(null);
  const [isMemeOpen, setIsMemeOpen] = useState(false);
  const [isMysteryOpen, setIsMysteryOpen] = useState(false);
  const [isSpotlightActive, setIsSpotlightActive] = useState(false);
  const [isDiscoActive, setIsDiscoActive] = useState(false);

  const handleInsertMysteryBox = (secretText: string) => {
    onInsertElement({
      id: `el-mystery-${Date.now()}`,
      type: 'shape',
      x: 32, y: 28, width: 36, height: 42,
      content: secretText,
      fillColor: '#5B21B6', borderColor: '#F59E0B', borderWidth: 2,
      meta: { isMysteryBox: true, secretText, isOpen: false },
    });
  };

  return (
    <div className="space-y-2 text-xs text-stone-700 animate-in fade-in pt-1.5">
      <JoyDockPupilPersonalisation
        selectedElement={selectedElement}
        onUpdateElement={onUpdateElement}
        onInsertElement={onInsertElement}
      />
      <JoyDockStampsGroup
        onInsertElement={onInsertElement}
      />
      <JoyDockInteractiveModes
        isSpotlightActive={isSpotlightActive} isDiscoActive={isDiscoActive}
        onOpenWheel={() => setModalType('wheel')} onOpenNoiseMeter={() => setModalType('meter')}
        onOpenMeme={() => setIsMemeOpen(true)} onOpenMysteryBox={() => setIsMysteryOpen(true)}
        onToggleSpotlight={() => setIsSpotlightActive(!isSpotlightActive)}
        onToggleDisco={() => setIsDiscoActive(!isDiscoActive)}
        onInsertElement={onInsertElement}
      />
      <JoyDockModals
        modalType={modalType} isMemeOpen={isMemeOpen} isMysteryOpen={isMysteryOpen}
        isSpotlightActive={isSpotlightActive} isDiscoActive={isDiscoActive}
        onCloseModal={() => setModalType(null)} onCloseMeme={() => setIsMemeOpen(false)}
        onCloseMystery={() => setIsMysteryOpen(false)} onInsertMeme={onInsertElement}
        onConfirmMystery={handleInsertMysteryBox}
        onToggleSpotlight={() => setIsSpotlightActive(false)} onToggleDisco={() => setIsDiscoActive(false)}
      />
    </div>
  );
};

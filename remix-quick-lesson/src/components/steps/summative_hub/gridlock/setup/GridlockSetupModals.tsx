import React from 'react';
import { GridlockQuestion, HexTile, GridlockGameState } from '../types/gridlockTypes';
import { GridlockPreFlightInspectorModal } from '../inspector/GridlockPreFlightInspectorModal';
import { GridlockSimulatorModal } from '../preview/GridlockSimulatorModal';
import { GridlockProjectorModal } from '../projector/GridlockProjectorModal';
import { LessonChunk } from '../../../../../types';

interface Props {
  isPreFlightOpen: boolean;
  isSimulatorOpen: boolean;
  isProjectorOpen: boolean;
  questions: GridlockQuestion[];
  grid: HexTile[][];
  lessonTitle: string;
  chunks?: LessonChunk[];
  activeGameState: GridlockGameState;
  onClosePreFlight: () => void;
  onLaunchTournament: () => void;
  onCloseSimulator: () => void;
  onCloseProjector: () => void;
  onNotice?: (msg: string) => void;
}

export const GridlockSetupModals: React.FC<Props> = ({
  isPreFlightOpen,
  isSimulatorOpen,
  isProjectorOpen,
  questions,
  grid,
  lessonTitle,
  chunks,
  activeGameState,
  onClosePreFlight,
  onLaunchTournament,
  onCloseSimulator,
  onCloseProjector,
  onNotice,
}) => {
  return (
    <>
      <GridlockPreFlightInspectorModal
        isOpen={isPreFlightOpen}
        questions={questions}
        lessonTitle={lessonTitle}
        onClose={onClosePreFlight}
        onLaunchTournament={onLaunchTournament}
      />
      <GridlockSimulatorModal
        isOpen={isSimulatorOpen}
        initialGrid={grid}
        lessonTitle={lessonTitle}
        chunks={chunks}
        onClose={onCloseSimulator}
        onNotice={onNotice}
      />
      <GridlockProjectorModal
        isOpen={isProjectorOpen}
        gameState={activeGameState}
        onClose={onCloseProjector}
        onNotice={onNotice}
      />
    </>
  );
};

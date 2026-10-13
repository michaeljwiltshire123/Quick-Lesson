import React from 'react';
import { TournamentScore } from '../../types/gridlockTypes';
import { ProjectorBoardPreview } from '../ProjectorBoardPreview';
import { TeamInputPhonePreview } from '../TeamInputPhonePreview';
import { TurnStatusBanner } from '../../live/TurnStatusBanner';

interface Props {
  turnEngine: any;
  scores: TournamentScore;
  winningPathIds: string[];
  onSubmitAnswer: (ans: string) => { isCorrect: boolean };
}

export const SimulatorLiveView: React.FC<Props> = ({
  turnEngine,
  scores,
  winningPathIds,
  onSubmitAnswer,
}) => {
  return (
    <>
      <TurnStatusBanner
        turnTeam={turnEngine.turnTeam}
        answeringTeam={turnEngine.answeringTeam}
        phase={turnEngine.phase}
        timeLeft={turnEngine.timeLeft}
        feedback={turnEngine.feedback}
        letter={turnEngine.activeTile?.letter}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7">
          <ProjectorBoardPreview
            grid={turnEngine.grid}
            activeTile={turnEngine.activeTile}
            scores={scores}
            winningPathIds={winningPathIds}
            onSelectTile={(t) => turnEngine.selectTile(t)}
          />
        </div>
        <div className="lg:col-span-5 space-y-3">
          <TeamInputPhonePreview
            grid={turnEngine.grid}
            turnTeam={turnEngine.turnTeam}
            phase={turnEngine.phase}
            activeTile={turnEngine.activeTile}
            activeTeam={turnEngine.answeringTeam}
            onSwitchTeam={turnEngine.setTurnTeam}
            onSelectTile={(t) => turnEngine.selectTile(t)}
            onSubmitAnswer={onSubmitAnswer}
            onAwardTileToTeam={() => turnEngine.submitAnswer(turnEngine.activeTile?.activeQuestion?.targetAnswer || '')}
          />
        </div>
      </div>
    </>
  );
};

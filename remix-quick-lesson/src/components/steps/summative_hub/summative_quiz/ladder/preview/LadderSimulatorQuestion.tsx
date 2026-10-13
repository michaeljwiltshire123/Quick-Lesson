import React, { useEffect, useState } from 'react';
import { LadderRungQuestion, LifelineType } from '../typesLadder';
import { LadderPresenterBoard } from './LadderPresenterBoard';
import { LadderPhoneMockupFrame } from './LadderPhoneMockupFrame';

interface Props {
  rung: LadderRungQuestion; onSelect: (idx: number) => void; selectedAnswer: number | null;
  revealed: boolean; lifelines: LifelineType[]; onTriggerLifeline: (type: LifelineType) => void;
  usedLifelines: LifelineType[]; activeQuestionLifelines: LifelineType[]; eliminatedChoices: number[];
  isSpeaking: boolean; simStep?: string; maxLifelinesAllowed?: number;
  pollStatsRevealed: boolean; setPollStatsRevealed: (v: boolean) => void;
  pollGraceTime: number; setPollGraceTime: React.Dispatch<React.SetStateAction<number>>;
  peerSelected: string | null; setPeerSelected: (v: string | null) => void;
  peerGraceTime: number; setPeerGraceTime: React.Dispatch<React.SetStateAction<number>>;
  peerState: 'none' | 'waiting' | 'advice'; setPeerState: (v: 'none' | 'waiting' | 'advice') => void;
}

export const LadderSimulatorQuestion: React.FC<Props> = ({
  rung, onSelect, selectedAnswer, revealed, lifelines, onTriggerLifeline, usedLifelines, activeQuestionLifelines,
  eliminatedChoices, isSpeaking, simStep = 'question', maxLifelinesAllowed = 3, pollStatsRevealed, setPollStatsRevealed,
  pollGraceTime, setPollGraceTime, peerSelected, setPeerSelected, peerGraceTime, setPeerGraceTime, peerState, setPeerState,
}) => {
  const [timeLeft, setTimeLeft] = useState(rung.timerSeconds || 20);

  useEffect(() => { setTimeLeft(rung.timerSeconds || 20); }, [rung]);
  useEffect(() => {
    if (revealed || isSpeaking || timeLeft <= 0 || pollStatsRevealed) return;
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, revealed, isSpeaking, pollStatsRevealed]);

  useEffect(() => {
    if (!pollStatsRevealed || revealed) return;
    const t = setInterval(() => {
      setPollGraceTime((p) => { if (p <= 1) { clearInterval(t); onSelect(-1); return 0; } return p - 1; });
    }, 1000);
    return () => clearInterval(t);
  }, [pollStatsRevealed, revealed]);

  useEffect(() => {
    if (timeLeft === 0 && !revealed && !pollStatsRevealed) {
      if (activeQuestionLifelines.includes('ask_room')) {
        setPollStatsRevealed(true); setPollGraceTime(10);
      } else if (activeQuestionLifelines.includes('ask_player') && peerState === 'advice' && peerGraceTime > 0) {
        // Hold for nominee advice
      } else {
        onSelect(-1);
      }
    }
  }, [timeLeft, revealed, pollStatsRevealed, activeQuestionLifelines, peerState, peerGraceTime]);

  const showPollOverlay = pollStatsRevealed && !revealed;
  const showPeerWait = timeLeft <= 0 && activeQuestionLifelines.includes('ask_player') && peerState === 'advice' && peerGraceTime > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start text-white font-sans animate-in fade-in">
      <div className="lg:col-span-7">
        <LadderPresenterBoard
          rung={rung} revealed={revealed} selectedAnswer={selectedAnswer} timeLeft={timeLeft}
          showPollOverlay={showPollOverlay} pollGraceTime={pollGraceTime} showPeerWait={showPeerWait}
        />
      </div>
      <div className="lg:col-span-5">
        <LadderPhoneMockupFrame
          rung={rung} onSelect={onSelect} selectedAnswer={selectedAnswer} revealed={revealed}
          lifelines={lifelines} onTriggerLifeline={onTriggerLifeline} usedLifelines={usedLifelines}
          activeQuestionLifelines={activeQuestionLifelines} eliminatedChoices={eliminatedChoices}
          simStep={simStep} maxLifelinesAllowed={maxLifelinesAllowed} timeLeft={timeLeft}
          pollStatsRevealed={pollStatsRevealed} pollGraceTime={pollGraceTime} peerSelected={peerSelected}
          setPeerSelected={setPeerSelected} peerGraceTime={peerGraceTime} setPeerGraceTime={setPeerGraceTime}
          peerState={peerState} setPeerState={setPeerState}
        />
      </div>
    </div>
  );
};
export default LadderSimulatorQuestion;

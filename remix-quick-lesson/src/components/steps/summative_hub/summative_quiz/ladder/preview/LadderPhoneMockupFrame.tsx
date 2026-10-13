import React, { useState } from 'react';
import { LadderRungQuestion, LifelineType } from '../typesLadder';
import { LadderStudentDeviceWelcome } from './LadderStudentDeviceWelcome';
import { LadderStudentDeviceClimber } from './LadderStudentDeviceClimber';
import { LadderStudentDeviceVoter } from './LadderStudentDeviceVoter';

interface Props {
  rung: LadderRungQuestion;
  onSelect: (idx: number) => void;
  selectedAnswer: number | null;
  revealed: boolean;
  lifelines: LifelineType[];
  onTriggerLifeline: (type: LifelineType) => void;
  usedLifelines: LifelineType[];
  activeQuestionLifelines: LifelineType[];
  eliminatedChoices: number[];
  simStep?: string;
  maxLifelinesAllowed?: number;
  timeLeft: number;
  pollStatsRevealed: boolean;
  pollGraceTime: number;
  peerSelected: string | null;
  setPeerSelected: (v: string | null) => void;
  peerGraceTime: number;
  setPeerGraceTime: React.Dispatch<React.SetStateAction<number>>;
  peerState: 'none' | 'waiting' | 'advice';
  setPeerState: (v: 'none' | 'waiting' | 'advice') => void;
}

export const LadderPhoneMockupFrame: React.FC<Props> = ({
  rung, onSelect, selectedAnswer, revealed, lifelines, onTriggerLifeline, usedLifelines, activeQuestionLifelines,
  eliminatedChoices, simStep = 'question', maxLifelinesAllowed = 3, timeLeft, pollStatsRevealed, pollGraceTime,
  peerSelected, setPeerSelected, peerGraceTime, setPeerGraceTime, peerState, setPeerState,
}) => {
  const [deviceTab, setDeviceTab] = useState<'climber' | 'helper' | 'voter'>('climber');
  const isLobby = simStep === 'welcome' || simStep === 'rules';

  return (
    <div className="flex flex-col items-center space-y-3 font-sans">
      {!isLobby && (
        <div className="flex bg-white/10 p-1 rounded-xl gap-1 border border-white/5 w-full max-w-[240px]">
          {(['climber', 'helper', 'voter'] as const).map((t) => (
            <button key={t} onClick={() => setDeviceTab(t)} className={`flex-1 py-1 text-[9px] font-bold rounded-lg cursor-pointer font-sans uppercase tracking-wider ${deviceTab === t ? 'bg-amber-500 text-slate-950 font-black' : 'text-gray-400 hover:text-white'}`}>
              {t === 'climber' ? 'Climber 🙋' : t === 'helper' ? 'Expert 🤝' : 'Voter 👥'}
            </button>
          ))}
        </div>
      )}

      <div className="bg-[#1C1A17] border border-white/10 rounded-2xl p-4 flex flex-col justify-center items-center text-center space-y-4 shadow-xl w-full animate-in fade-in">
        <div className="bg-[#12110F] border-4 border-slate-700 rounded-3xl p-4 aspect-[9/16] max-w-[240px] w-full flex flex-col justify-between min-h-[380px]">
          <div className="border-b border-white/5 pb-1 flex justify-between items-center text-[9px] text-gray-400 font-mono">
            <span>{isLobby ? 'Rules Explainer Panel' : `${deviceTab.toUpperCase()} View`}</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          {isLobby ? (
            <LadderStudentDeviceWelcome lifelines={lifelines} maxAllowed={maxLifelinesAllowed} />
          ) : deviceTab === 'climber' ? (
            <LadderStudentDeviceClimber
              rung={rung} onSelect={onSelect} selectedAnswer={selectedAnswer} usedLifelines={usedLifelines}
              activeQuestionLifelines={activeQuestionLifelines} eliminatedChoices={eliminatedChoices}
              onTriggerLifeline={onTriggerLifeline} maxAllowed={maxLifelinesAllowed} revealed={revealed} timeLeft={timeLeft}
              pollStatsRevealed={pollStatsRevealed} pollGraceTime={pollGraceTime} peerSelected={peerSelected}
              setPeerSelected={setPeerSelected} peerGraceTime={peerGraceTime} setPeerGraceTime={setPeerGraceTime}
              peerState={peerState} setPeerState={setPeerState}
            />
          ) : (
            <LadderStudentDeviceVoter choices={rung.choices} mode={deviceTab} />
          )}
        </div>
      </div>
    </div>
  );
};

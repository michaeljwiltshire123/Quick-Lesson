import React, { useEffect } from 'react';
import { LadderRungQuestion, LifelineType } from '../typesLadder';
import { Shield, Users } from 'lucide-react';
import { LadderStudentDeviceFeedback } from './LadderStudentDeviceFeedback';
import { LadderLifelineButtonRow } from './LadderLifelineButtonRow';
import { LadderClimberChoiceButtons } from './LadderClimberChoiceButtons';
import { LadderPeerConsultView } from './LadderPeerConsultView';

interface Props {
  rung: LadderRungQuestion; onSelect: (idx: number) => void; selectedAnswer: number | null;
  usedLifelines: LifelineType[]; activeQuestionLifelines: LifelineType[]; eliminatedChoices: number[];
  onTriggerLifeline: (type: LifelineType) => void; maxAllowed?: number; revealed?: boolean; timeLeft?: number;
  pollStatsRevealed: boolean; pollGraceTime: number; peerSelected: string | null;
  setPeerSelected: (v: string | null) => void; peerGraceTime: number;
  setPeerGraceTime: React.Dispatch<React.SetStateAction<number>>;
  peerState: 'none' | 'waiting' | 'advice'; setPeerState: (v: 'none' | 'waiting' | 'advice') => void;
}

export const LadderStudentDeviceClimber: React.FC<Props> = ({
  rung, onSelect, selectedAnswer, usedLifelines, activeQuestionLifelines, eliminatedChoices, onTriggerLifeline,
  maxAllowed = 3, revealed = false, timeLeft = 20, pollStatsRevealed, pollGraceTime, peerSelected, setPeerSelected,
  peerGraceTime, setPeerGraceTime, peerState, setPeerState,
}) => {
  useEffect(() => {
    if (peerSelected && peerState === 'none') {
      setPeerState('waiting');
      const t = setTimeout(() => { setPeerState('advice'); setPeerGraceTime(15); }, 2000);
      return () => clearTimeout(t);
    }
  }, [peerSelected]);

  useEffect(() => {
    if (peerState !== 'advice' || revealed) return;
    const t = setInterval(() => {
      setPeerGraceTime((p) => { if (p <= 1) { clearInterval(t); onSelect(-1); return 0; } return p - 1; });
    }, 1000);
    return () => clearInterval(t);
  }, [peerState, revealed]);

  if (revealed) return <LadderStudentDeviceFeedback rung={rung} selectedAnswer={selectedAnswer} />;

  const tokensLeft = Math.max(0, maxAllowed - usedLifelines.length);
  const isShielded = activeQuestionLifelines.includes('safety_shield') || usedLifelines.includes('safety_shield');
  const isWaitingOnPoll = activeQuestionLifelines.includes('ask_room') && !pollStatsRevealed && !selectedAnswer && timeLeft > 0;
  const isChoosingPeer = activeQuestionLifelines.includes('ask_player') && !peerSelected;

  return (
    <div className="flex-1 flex flex-col justify-between text-left space-y-2 font-sans text-white text-[10px] h-full overflow-hidden animate-in fade-in">
      <div className="bg-gradient-to-r from-amber-600/20 to-purple-600/20 border border-white/10 rounded-xl p-2.5 shrink-0">
        <div className="flex justify-between items-center text-[8px] font-black text-amber-400">
          <span>STAGE {rung.rungNumber}</span><span>{tokensLeft} TOKENS LEFT</span>
        </div>
        <p className="text-[10px] font-bold text-gray-100 leading-snug whitespace-normal break-words">{rung.prompt}</p>
      </div>

      {isShielded && (
        <div className="bg-emerald-950/40 border border-emerald-500/30 py-1 rounded-lg text-center text-emerald-300 flex items-center justify-center gap-1 text-[8px] font-bold shrink-0">
          <Shield className="w-2.5 h-2.5 text-emerald-400" /> EXCLUSIVE SAFETY SHIELD LOCKED
        </div>
      )}

      {isWaitingOnPoll ? (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-4 bg-blue-950/20 border border-blue-500/20 rounded-xl space-y-2 shrink-0 animate-pulse">
          <Users className="w-6 h-6 text-blue-400" /><span className="text-[9px] font-bold text-blue-300">WAITING FOR CLASSROOM VOTERS... 👥</span>
          <span className="text-[8px] text-gray-400">Stats will reveal instantly on your handset at 0s.</span>
        </div>
      ) : isChoosingPeer || peerState === 'waiting' ? (
        <LadderPeerConsultView isChoosingPeer={isChoosingPeer} peerState={peerState} peerSelected={peerSelected} setPeerSelected={setPeerSelected} peerGraceTime={peerGraceTime} />
      ) : (
        <div className="flex-1 flex flex-col justify-around gap-1 py-1">
          {peerState === 'advice' && (
            <div className="bg-purple-950/40 border border-purple-500/30 p-2 rounded-xl text-center mb-1 shrink-0">
              <span className="text-purple-300 font-black">{peerSelected} suggests: Option A</span>
              <span className="block text-[8px] text-amber-400 font-bold mt-0.5">GRACE SECONDS: {peerGraceTime}s left</span>
            </div>
          )}
          {pollStatsRevealed && (
            <div className="bg-blue-950/40 border border-blue-500/30 p-2 rounded-xl space-y-1 mb-1 shrink-0 font-sans">
              <span className="text-blue-300 font-black text-[9px]">Live Opinion Poll Results:</span>
              <div className="grid grid-cols-4 gap-1 text-[8px] font-mono text-center text-emerald-300 font-black">
                <div>A: 70%</div><div>B: 15%</div><div>C: 10%</div><div>D: 5%</div>
              </div>
              <span className="block text-[7px] text-amber-400 font-bold text-center">Grace Period: {pollGraceTime}s remaining to answer</span>
            </div>
          )}
          <LadderClimberChoiceButtons choices={rung.choices} selectedAnswer={selectedAnswer} eliminatedChoices={eliminatedChoices} onSelect={onSelect} />
        </div>
      )}

      <LadderLifelineButtonRow usedLifelines={usedLifelines} tokensLeft={tokensLeft} selectedAnswer={selectedAnswer} onTriggerLifeline={onTriggerLifeline} />
    </div>
  );
};
export default LadderStudentDeviceClimber;

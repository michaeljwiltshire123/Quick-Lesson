import React, { useState } from 'react';
import { LadderQuizConfig, LifelineType } from '../typesLadder';
import { StudentLadderHeader } from './StudentLadderHeader';
import { StudentLadderInputRenderers } from './StudentLadderInputRenderers';
import { StudentLifelineModals } from './StudentLifelineModals';
import { ActiveLifelineState, TeamVoteConsensus } from './typesStudentLadder';
import { RefreshCw, Send, CheckCircle2, Clock } from 'lucide-react';

interface Props {
  config: LadderQuizConfig;
  onNotice?: (msg: string) => void;
}

export const StudentLadderViewContainer: React.FC<Props> = ({ config, onNotice }) => {
  const [currentRungIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [eliminatedChoices, setEliminatedChoices] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeModal, setActiveModal] = useState<LifelineType | null>(null);
  const [isSwapQueued, setIsSwapQueued] = useState(false);
  
  const maxAllowed = config.maxStudentLifelines || 3;
  const [lifelines, setLifelines] = useState<ActiveLifelineState[]>(() =>
    config.activeLifelines.slice(0, maxAllowed).map((l) => ({ type: l, used: false }))
  );

  const activeRung = config.rungs[currentRungIndex] || config.rungs[0];
  const [teamVotes] = useState<TeamVoteConsensus[]>([
    { choiceIndex: 0, percentage: 65, voterCount: 13 },
    { choiceIndex: 1, percentage: 20, voterCount: 4 },
  ]);

  const handleUseLifeline = (type: LifelineType) => {
    const lifeline = lifelines.find((l) => l.type === type);
    if (!lifeline || lifeline.used) return;

    if (type === 'fifty_fifty') {
      const wrongChoices = [0, 1, 2, 3].filter((c) => c !== activeRung.correctChoiceIndex);
      setEliminatedChoices(wrongChoices.slice(0, 2));
    } else if (type === 'question_swap') {
      setIsSwapQueued(true);
      onNotice?.('Question Swap Queued for Class. Will synchronize at turn end.');
    }

    setLifelines(lifelines.map((l) => (l.type === type ? { ...l, used: true } : l)));
    setActiveModal(type);
  };

  const handleSubmit = () => {
    if (selectedChoice === null) return;
    setIsSubmitted(true);
    onNotice?.(`Rung ${activeRung.rungNumber} answer submitted to live whiteboard.`);
  };

  return (
    <div className="max-w-md mx-auto space-y-3.5 bg-[#F8F6F0] p-3 sm:p-4 rounded-3xl border border-[#2D2A26]/15">
      <StudentLadderHeader
        currentRung={activeRung.rungNumber} totalRungs={config.totalRungs}
        currentPoints={activeRung.pointValue} safetyNetPoints={config.rungs[2]?.pointValue || 0}
        lifelines={lifelines} maxStudentLifelines={maxAllowed} onUseLifeline={handleUseLifeline}
      />
      {isSwapQueued && (
        <div className="bg-amber-100 border border-amber-300 rounded-2xl p-2.5 flex items-center gap-2 text-xs font-bold text-amber-900">
          <RefreshCw className="w-4 h-4 animate-spin text-amber-700" />
          <span>Question Swap Queued for Class — Pending turn sync...</span>
        </div>
      )}
      <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#2D2A26]">
          <span className="uppercase text-[#D97706]">Challenge Prompt</span>
          <span className="flex items-center gap-1 text-[#2D2A26]/70"><Clock className="w-3.5 h-3.5 text-amber-600" /> {activeRung.timerSeconds}s</span>
        </div>
        <div className="text-xs font-bold text-[#2D2A26] bg-[#F8F6F0] p-3 rounded-xl border border-[#2D2A26]/10">
          {activeRung.prompt}
        </div>
        <StudentLadderInputRenderers
          choices={activeRung.choices} selectedChoice={selectedChoice}
          eliminatedChoices={eliminatedChoices} teamVotes={teamVotes}
          isSubmitted={isSubmitted} onSelectChoice={(idx) => !isSubmitted && setSelectedChoice(idx)}
        />
        <button type="button" disabled={selectedChoice === null || isSubmitted} onClick={handleSubmit}
          className={`w-full py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
            isSubmitted ? 'bg-emerald-600 text-white' : selectedChoice !== null ? 'bg-[#2D2A26] text-white hover:bg-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}>
          {isSubmitted ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4 text-amber-400" />}
          <span>{isSubmitted ? 'Answer Locked In!' : 'Submit Answer'}</span>
        </button>
      </div>
      <StudentLifelineModals activeModal={activeModal} onClose={() => setActiveModal(null)} onConfirmAction={(data) => typeof data === 'number' && setSelectedChoice(data)} />
    </div>
  );
};

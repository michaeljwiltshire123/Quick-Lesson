import React, { useState } from 'react';
import { Sparkles, ShieldAlert } from 'lucide-react';
import { ImposterQuestion } from '../types/imposterTypes';
import { ProjectorSubmissionTracker, MockPupil } from './ProjectorSubmissionTracker';
import { ProjectorDiscussionBoard } from './ProjectorDiscussionBoard';
import { ProjectorVotingBoard } from './ProjectorVotingBoard';
import { ProjectorEliminationBoard } from './ProjectorEliminationBoard';
import { ProjectorHeaderNav, BoardPhase } from './ProjectorHeaderNav';

interface Props {
  question?: ImposterQuestion;
  currentIndex: number;
  totalQuestions: number;
  roomCode: string;
  timerSeconds: number;
  boardPhase?: BoardPhase;
  onPhaseChange?: (phase: BoardPhase) => void;
  isShadowVote?: boolean;
}

const MOCK_PUPILS: MockPupil[] = [
  { name: 'Oliver', avatar: '🦉', submitted: true, sampleAns: 'Lactic acid' },
  { name: 'Amelia', avatar: '🦊', submitted: true, sampleAns: 'Sunlight traps light energy' },
  { name: 'Harry', avatar: '🦁', submitted: true, sampleAns: 'Fermentation' },
  { name: 'Isla', avatar: '🐼', submitted: true, sampleAns: 'Lactic acid build-up' },
  { name: 'George', avatar: '🐻', submitted: false, sampleAns: 'Mitochondria' },
  { name: 'Ava', avatar: '🐨', submitted: true, sampleAns: 'Energy transfer' },
];

export const ProjectorImposterPreview: React.FC<Props> = ({
  currentIndex, totalQuestions, roomCode, timerSeconds,
  boardPhase: parentPhase, onPhaseChange, isShadowVote = false,
}) => {
  const [internalPhase, setInternalPhase] = useState<BoardPhase>('task');
  const activePhase = parentPhase || internalPhase;
  const setPhase = onPhaseChange || setInternalPhase;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 text-white flex flex-col justify-between h-[490px] shadow-xl relative overflow-hidden">
      <ProjectorHeaderNav
        roomCode={roomCode} currentIndex={currentIndex} totalQuestions={totalQuestions}
        timerSeconds={timerSeconds} boardPhase={activePhase} onSelectPhase={setPhase}
      />

      <div className="my-auto py-1">
        {activePhase === 'task' && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Secret Knowledge Task In Progress
              </div>
              <h3 className="text-xl font-black text-white">Classroom Devices Active</h3>
              <p className="text-xs text-white/60">Pupils are answering on their phones. Keep screens hidden!</p>
            </div>
            <ProjectorSubmissionTracker pupils={MOCK_PUPILS} />
          </div>
        )}

        {activePhase === 'discussion' && <ProjectorDiscussionBoard pupils={MOCK_PUPILS} />}
        {activePhase === 'voting' && <ProjectorVotingBoard pupils={MOCK_PUPILS} isShadowVoteActive={isShadowVote} />}
        {activePhase === 'elimination' && (
          <ProjectorEliminationBoard
            votedOutName="Amelia"
            isVotedImposter={true}
            secretKilledName="Oliver"
            ghostMasterName="Oliver"
          />
        )}
      </div>

      <div className="text-center pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-white/50 font-mono">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Room {roomCode}
        </span>
        <span>{MOCK_PUPILS.filter((p) => p.submitted).length} / {MOCK_PUPILS.length} Answers In</span>
      </div>
    </div>
  );
};

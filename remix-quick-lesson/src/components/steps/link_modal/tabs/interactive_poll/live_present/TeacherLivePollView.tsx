import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { LessonChunk, ChunkAttachment } from '../../../../../../types';
import { PollFormState } from '../types';
import { LivePollState } from './typesLive';
import { LivePollChartCanvas } from './LivePollChartCanvas';
import { MisconceptionAndReflectionBanner } from './MisconceptionAndReflectionBanner';
import { exportPollResultsAsImage, savePollToSlideAndReset } from './PollExportService';
import { TeacherLivePollActions } from './TeacherLivePollActions';

interface Props {
  pollConfig: PollFormState;
  onClose: () => void;
  activeChunk?: LessonChunk;
  onAddAttachment?: (att: Partial<ChunkAttachment>) => void;
  onUpdateChunk?: (updated: LessonChunk) => void;
}

export const TeacherLivePollView: React.FC<Props> = ({
  pollConfig, onClose, activeChunk, onAddAttachment, onUpdateChunk,
}) => {
  const [liveState, setLiveState] = useState<LivePollState>(() => ({
    pollConfig, voteCounts: {}, totalVotes: 0,
    remainingSeconds: pollConfig.timerSeconds,
    isTimerRunning: true, isRevealed: !pollConfig.isBlindVoting,
    wordCloudEntries: [
      { text: 'Equilibrium', count: 4 }, { text: 'Catalyst', count: 2 }, { text: 'Hypothesis', count: 1 },
    ],
  }));

  useEffect(() => {
    if (!liveState.isTimerRunning || liveState.remainingSeconds === null || liveState.remainingSeconds <= 0) return;
    const timer = setInterval(() => {
      setLiveState((prev) => {
        if (prev.remainingSeconds === null || prev.remainingSeconds <= 1) {
          return { ...prev, remainingSeconds: 0, isTimerRunning: false };
        }
        return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [liveState.isTimerRunning, liveState.remainingSeconds]);

  const handleSimulateVote = () => {
    if (pollConfig.options.length === 0) return;
    const randomIdx = Math.floor(Math.random() * pollConfig.options.length);
    const optId = pollConfig.options[randomIdx].id;
    setLiveState((prev) => ({
      ...prev,
      voteCounts: { ...prev.voteCounts, [optId]: (prev.voteCounts[optId] || 0) + 1 },
      totalVotes: prev.totalVotes + 1,
    }));
  };

  const handleReset = () => {
    setLiveState((p) => ({ ...p, voteCounts: {}, totalVotes: 0, remainingSeconds: pollConfig.timerSeconds }));
  };

  return (
    <div className="space-y-3.5 bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-2xl p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
            Live Teacher Display Mode
          </span>
          <h4 className="text-sm font-bold text-[#2D2A26] mt-1">{pollConfig.question}</h4>
        </div>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-[#2D2A26]/60 hover:text-[#2D2A26] hover:bg-black/5 cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      <LivePollChartCanvas liveState={liveState} onToggleReveal={() => setLiveState((p) => ({ ...p, isRevealed: !p.isRevealed }))} />
      <MisconceptionAndReflectionBanner explainer={pollConfig.misconceptionExplainer} totalVotes={liveState.totalVotes} />

      <TeacherLivePollActions
        onSimulateVote={handleSimulateVote}
        onExportImage={() => exportPollResultsAsImage(liveState)}
        onSaveToSlide={() => { savePollToSlideAndReset(liveState, activeChunk, onAddAttachment, onUpdateChunk); handleReset(); }}
        onReset={handleReset}
      />
    </div>
  );
};

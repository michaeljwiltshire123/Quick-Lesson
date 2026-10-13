import React, { useState } from 'react';
import { Send, User, X } from 'lucide-react';
import { PollFormState } from '../types';
import { StudentPollResponse, StudentViewState } from './typesStudent';
import { StudentPollInputRenderers } from './StudentPollInputRenderers';
import { StudentConfidenceSlider } from './StudentConfidenceSlider';
import { StudentTimerClock } from './StudentTimerClock';
import { StudentSubmittedFeedback } from './StudentSubmittedFeedback';

interface Props {
  pollConfig: PollFormState;
  onClose?: () => void;
  onSubmitResponse?: (res: StudentPollResponse) => void;
}

export const StudentPollViewContainer: React.FC<Props> = ({ pollConfig, onClose, onSubmitResponse }) => {
  const [state, setState] = useState<StudentViewState>({
    studentName: '', selectedOptionIds: [], rankingOrder: pollConfig.options.map((o) => o.id),
    openText: '', wordCloudKeyword: '', confidenceRating: 2, submissionState: 'idle',
  });

  const showConfidence = Boolean(pollConfig.enableConfidenceMeter);
  const isExpired = state.submissionState === 'timed_out';
  const isSubmitted = state.submissionState === 'submitted' || isExpired;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: StudentPollResponse = {
      studentName: pollConfig.isAnonymous ? undefined : state.studentName.trim() || 'Anonymous Pupil',
      selectedOptionIds: state.selectedOptionIds, rankingOrder: state.rankingOrder,
      openText: state.openText, wordCloudKeyword: state.wordCloudKeyword,
      confidenceRating: showConfidence ? state.confidenceRating : undefined,
      submittedAt: new Date().toISOString(),
    };
    onSubmitResponse?.(payload);
    setState((p) => ({ ...p, submissionState: 'submitted' }));
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto p-4">
        <StudentSubmittedFeedback studentName={state.studentName} isTimedOut={isExpired} onRevise={() => setState((p) => ({ ...p, submissionState: 'idle' }))} onClose={onClose} />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-2xl p-4 shadow-md space-y-3.5">
      <div className="flex items-center justify-between pb-2 border-b border-[#2D2A26]/10">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
          Pupil Response View
        </span>
        <div className="flex items-center gap-2">
          <StudentTimerClock initialSeconds={pollConfig.timerSeconds} onTimeUp={() => setState((p) => ({ ...p, submissionState: 'timed_out' }))} />
          {onClose && <button type="button" onClick={onClose} className="p-1 rounded-lg text-[#2D2A26]/50 hover:text-[#2D2A26] cursor-pointer"><X className="w-4 h-4" /></button>}
        </div>
      </div>

      {!pollConfig.isAnonymous && (
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#2D2A26]/15">
          <User className="w-4 h-4 text-amber-600 shrink-0" />
          <input type="text" value={state.studentName} onChange={(e) => setState((p) => ({ ...p, studentName: e.target.value }))} placeholder="Your name or desk number..." className="w-full text-xs text-[#2D2A26] outline-hidden" />
        </div>
      )}

      <div className="bg-white p-3.5 rounded-xl border border-[#2D2A26]/10 shadow-2xs">
        <h3 className="text-sm font-bold text-[#2D2A26]">{pollConfig.question}</h3>
      </div>

      <StudentPollInputRenderers pollType={pollConfig.pollType} options={pollConfig.options} state={state} onChange={(patch) => setState((p) => ({ ...p, ...patch }))} disabled={false} />

      {showConfidence && (
        <StudentConfidenceSlider rating={state.confidenceRating} onChangeRating={(confidenceRating) => setState((p) => ({ ...p, confidenceRating }))} />
      )}

      <button type="button" onClick={handleSubmit} className="w-full py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors">
        <Send className="w-3.5 h-3.5" /> Submit Response
      </button>
    </div>
  );
};

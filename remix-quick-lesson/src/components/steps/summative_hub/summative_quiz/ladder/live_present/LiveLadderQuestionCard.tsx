import React, { useState } from 'react';
import { LadderRungQuestion } from '../typesLadder';
import { Play, Pause } from 'lucide-react';
import { VoiceReaderControls } from './VoiceReaderControls';
import { LiveLadderTimerSync } from './LiveLadderTimerSync';

interface Props {
  activeRung: LadderRungQuestion;
  totalRungs: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onQueueSwap: () => void;
}

export const LiveLadderQuestionCard: React.FC<Props> = ({
  activeRung, totalRungs, isPaused, onTogglePause, onQueueSwap,
}) => {
  const [isTTSSpeaking, setIsTTSSpeaking] = useState(false);
  const spokenText = `${activeRung.presenterIntro ? activeRung.presenterIntro + ' ' : ''}${activeRung.prompt}`;

  return (
    <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#2D2A26] text-white rounded-xl text-xs font-bold">
            Rung {activeRung.rungNumber} of {totalRungs}
          </span>
          <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-xl text-xs font-extrabold">
            {activeRung.pointValue.toLocaleString()} pts
          </span>
        </div>
        <div className="flex items-center gap-2">
          <VoiceReaderControls
            textToRead={spokenText}
            onSpeechStart={() => setIsTTSSpeaking(true)}
            onSpeechComplete={() => setIsTTSSpeaking(false)}
          />
          <button type="button" onClick={onQueueSwap}
            className="px-3 py-1.5 bg-amber-100 text-amber-900 rounded-xl text-xs font-bold border border-amber-300 hover:bg-amber-200 cursor-pointer">
            Queue Swap
          </button>
        </div>
      </div>

      <div className="text-sm font-bold text-[#2D2A26] bg-[#F8F6F0] p-4 rounded-xl border border-[#2D2A26]/10">
        {activeRung.prompt}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {activeRung.choices.map((choice, cIdx) => (
          <div key={cIdx} className={`p-3 rounded-xl border text-xs font-bold ${cIdx === activeRung.correctChoiceIndex ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-[#F8F6F0] text-[#2D2A26] border-[#2D2A26]/15'}`}>
            {String.fromCharCode(65 + cIdx)}: {choice}
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-[#2D2A26]/10 space-y-2">
        <div className="flex items-center justify-between">
          <button type="button" onClick={onTogglePause}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 text-white rounded-xl text-xs font-bold cursor-pointer">
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isPaused ? 'Resume Timer' : 'Pause Timer'}</span>
          </button>
        </div>
        <LiveLadderTimerSync
          initialSeconds={activeRung.timerSeconds}
          isTTSSpeaking={isTTSSpeaking}
          isManualPaused={isPaused}
        />
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { LociScriptStationItem } from './types';
import { Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';
import { LociRecallQuestionsList } from './LociRecallQuestionsList';

interface Props {
  station: LociScriptStationItem;
  index: number;
  showRhythmCues: boolean;
}

export const LociScriptStationCard: React.FC<Props> = ({ station, index, showRhythmCues }) => {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>(station.recallQuestions || []);

  const toggleQuestion = (q: string) => {
    if (selectedQuestions.includes(q)) {
      setSelectedQuestions(selectedQuestions.filter((item) => item !== q));
    } else {
      setSelectedQuestions([...selectedQuestions, q]);
    }
  };

  const recallList = station.recallQuestions && station.recallQuestions.length > 0
    ? station.recallQuestions
    : [station.activeRecallQuestion];

  const rawScript = station.teacherScript || station.explicitScene || station.association;
  const formattedScript = showRhythmCues ? rawScript.replace(/([.!?])\s+/g, '$1 / / ') : rawScript;

  return (
    <div className="bg-[#F8F6F0]/90 rounded-xl p-3 border border-[#2D2A26]/15 space-y-2.5 text-xs shadow-xs">
      <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-[#D97706] text-white flex items-center justify-center font-bold text-[10px]">
            {index + 1}
          </span>
          <span className="font-black text-[#2D2A26] uppercase tracking-wide text-xs">{station.station}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 bg-amber-100 text-[#D97706] rounded font-black uppercase text-[10px] flex items-center gap-1">
            <span>{station.term}</span>
            {station.phoneticBreakdown && (
              <span className="font-normal text-[9px] text-[#2D2A26]/80 bg-amber-200/50 px-1 rounded">
                ({station.phoneticBreakdown})
              </span>
            )}
          </span>
        </div>
      </div>

      <div className="space-y-2 bg-white p-3 rounded-lg border border-[#2D2A26]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#D97706] font-bold text-[11px] uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Spoken Script &amp; Dual-Coding
          </div>
          {showRhythmCues && (
            <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              Rhythm Cues (/ /)
            </span>
          )}
        </div>

        <div className="space-y-1 bg-amber-50/50 p-2 rounded-lg border border-amber-200/50">
          <div className="text-[#2D2A26] font-medium leading-relaxed text-xs [&_strong]:font-black [&_strong]:text-[#D97706] [&_strong]:bg-amber-100/70 [&_strong]:px-1 [&_strong]:rounded">
            <Markdown>{`&ldquo;${formattedScript}&rdquo;`}</Markdown>
          </div>
        </div>
      </div>

      <LociRecallQuestionsList
        recallList={recallList}
        selectedQuestions={selectedQuestions}
        onToggleQuestion={toggleQuestion}
      />
    </div>
  );
};

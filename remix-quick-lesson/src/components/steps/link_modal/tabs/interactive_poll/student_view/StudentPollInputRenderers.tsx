import React from 'react';
import { PollType } from '../types';
import { StudentInputRendererProps } from './typesStudent';
import { StudentRankingRenderer } from './StudentRankingRenderer';
import { StudentChoiceListRenderer } from './StudentChoiceListRenderer';

export const StudentPollInputRenderers: React.FC<StudentInputRendererProps> = ({
  pollType, options, state, onChange, disabled,
}) => {
  if (pollType === PollType.Open) {
    return (
      <textarea
        disabled={disabled}
        rows={4}
        value={state.openText}
        onChange={(e) => onChange({ openText: e.target.value })}
        placeholder="Type your explanation or thoughts here..."
        className="w-full p-3 rounded-xl border border-[#2D2A26]/20 bg-white text-xs text-[#2D2A26] focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-hidden resize-none"
      />
    );
  }

  if (pollType === PollType.Wordcloud) {
    return (
      <input
        type="text"
        disabled={disabled}
        maxLength={30}
        value={state.wordCloudKeyword}
        onChange={(e) => onChange({ wordCloudKeyword: e.target.value.replace(/\s+/g, '') })}
        placeholder="Enter a single key word..."
        className="w-full p-3 rounded-xl border border-[#2D2A26]/20 bg-white text-xs font-semibold text-[#2D2A26] focus:border-[#F59E0B] outline-hidden"
      />
    );
  }

  if (pollType === PollType.Likert) {
    const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
    return (
      <div className="grid grid-cols-5 gap-1.5">
        {[1, 2, 3, 4, 5].map((val, idx) => {
          const isSel = state.selectedOptionIds.includes(String(val));
          return (
            <button
              key={val}
              type="button"
              disabled={disabled}
              onClick={() => onChange({ selectedOptionIds: [String(val)] })}
              className={`p-2 rounded-xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                isSel ? 'bg-amber-500 text-white border-amber-600 font-bold shadow-xs' : 'bg-white text-[#2D2A26] border-[#2D2A26]/15 hover:bg-[#F8F6F0]'
              }`}
            >
              <span className="text-sm font-bold">{val}</span>
              <span className="text-[9px] leading-tight text-center hidden sm:block">{labels[idx]}</span>
            </button>
          );
        })}
      </div>
    );
  }

  if (pollType === PollType.Ranking) {
    return (
      <StudentRankingRenderer
        options={options}
        rankingOrder={state.rankingOrder}
        onChangeOrder={(rankingOrder) => onChange({ rankingOrder })}
        disabled={disabled}
      />
    );
  }

  return (
    <StudentChoiceListRenderer
      pollType={pollType}
      options={options}
      selectedOptionIds={state.selectedOptionIds}
      onChangeSelection={(selectedOptionIds) => onChange({ selectedOptionIds })}
      disabled={disabled}
    />
  );
};

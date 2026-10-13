import React from 'react';
import { BarChart3, TrendingUp, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ClassPsychometrics } from './teacherReportTypes';

interface Props {
  data: ClassPsychometrics;
}

export const TeacherClassPsychometricsTab: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-4">
      {/* 4 Key Psychometric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-2xl border border-[#2D2A26]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">Class Mean</span>
          <span className="text-xl font-black text-[#2D2A26]">{data.meanScore}%</span>
          <span className="text-[10px] text-emerald-600 block mt-0.5 font-semibold">Median: {data.medianScore}%</span>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-[#2D2A26]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">Score Range</span>
          <span className="text-xl font-black text-[#2D2A26]">{data.lowestScore}% - {data.highestScore}%</span>
          <span className="text-[10px] text-gray-500 block mt-0.5">Spread: {data.highestScore - data.lowestScore} pts</span>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-[#2D2A26]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">Avg Time / Response</span>
          <span className="text-xl font-black text-[#2D2A26]">{data.averageTimeSeconds}s</span>
          <span className="text-[10px] text-indigo-600 block mt-0.5 font-semibold">100% Completion</span>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-rose-200 bg-rose-50/30 shadow-2xs">
          <span className="text-[10px] font-bold text-rose-700 uppercase block">Critical Trap Topic</span>
          <span className="text-xs font-black text-rose-950 truncate block mt-1">{data.mostMissedTopic}</span>
          <span className="text-[10px] text-rose-600 font-bold block mt-0.5">{data.mostMissedRate}% class error rate</span>
        </div>
      </div>

      {/* Bell Curve / Score Distribution */}
      <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#2D2A26]/15 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase text-[#2D2A26] flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            Class Score Distribution (Quartile Bell Curve)
          </h4>
          <span className="text-[10px] text-gray-500 font-bold">27 Pupils Evaluated</span>
        </div>

        <div className="space-y-2">
          {data.bellCurve.map((seg, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-[#2D2A26]">
                <span>{seg.range}</span>
                <span className="font-mono text-[11px] text-gray-600">{seg.count} pupils ({seg.percentage}%)</span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-[#2D2A26]/10 flex">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    idx === 0 ? 'bg-rose-500' : idx === 1 ? 'bg-amber-500' : idx === 2 ? 'bg-indigo-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.max(5, seg.percentage)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostic Action Prompt */}
      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-900">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold block">Automated Reteach Recommendation</span>
          <p className="text-[11px] text-emerald-800 leading-snug">
            81% of pupils demonstrated secure mastery on core definitions. Prioritise a 3-minute starter tomorrow exclusively contrasting <span className="font-bold">{data.mostMissedTopic}</span> before introducing new content.
          </p>
        </div>
      </div>
    </div>
  );
};

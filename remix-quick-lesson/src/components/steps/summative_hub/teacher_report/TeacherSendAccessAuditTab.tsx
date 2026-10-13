import React from 'react';
import { HeartHandshake, Clock, ShieldAlert, Award, FileCheck } from 'lucide-react';
import { PupilAuditRecord } from './teacherReportTypes';

interface Props {
  pupils: PupilAuditRecord[];
}

export const TeacherSendAccessAuditTab: React.FC<Props> = ({ pupils }) => {
  const sendCandidates = pupils.filter((p) => p.extraTimeJustified || (p.unTimedAccuracy && p.unTimedAccuracy - p.scorePercentage >= 20));

  return (
    <div className="space-y-4">
      {/* Overview Context Banner */}
      <div className="p-3.5 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl flex items-start gap-3">
        <HeartHandshake className="w-5 h-5 text-indigo-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <span className="font-black text-indigo-950 uppercase tracking-wide block">
            SEND, EHCP &amp; Access Arrangement Justification Audit
          </span>
          <p className="text-indigo-900 leading-relaxed text-[11px]">
            This audit isolates <span className="font-bold">processing speed deficits</span> from genuine conceptual gaps by comparing timed match scores with untimed conceptual checks. Use this concrete data to evidence Form 8 Access Arrangements (e.g. 25% Extra Time).
          </p>
        </div>
      </div>

      {/* Candidate Case Studies */}
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase text-[#2D2A26] flex items-center justify-between">
          <span>Identified Access Arrangement Evidence Cases</span>
          <span className="text-indigo-600 font-bold font-mono">{sendCandidates.length} Pupils Flagged</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {sendCandidates.map((p) => {
            const gap = (p.unTimedAccuracy || 0) - p.scorePercentage;
            return (
              <div key={p.id} className="p-4 bg-white rounded-2xl border border-[#2D2A26]/15 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2">
                  <div>
                    <span className="font-black text-sm text-[#2D2A26] block">{p.name}</span>
                    <span className="text-[10px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 inline-block mt-0.5">
                      {p.sendFlag || 'Processing Speed Divergence'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Divergence</span>
                    <span className="text-sm font-black font-mono text-purple-600">+{gap}% Untimed</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-gray-50 rounded-xl">
                    <span className="text-[10px] text-gray-500 font-bold block">Timed Test Score</span>
                    <span className="text-lg font-black text-rose-600 font-mono">{p.scorePercentage}%</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">Avg: {p.timeSeconds}s/question</span>
                  </div>
                  <div className="p-2.5 bg-emerald-50 rounded-xl">
                    <span className="text-[10px] text-emerald-800 font-bold block">Untimed Accuracy</span>
                    <span className="text-lg font-black text-emerald-700 font-mono">{p.unTimedAccuracy}%</span>
                    <span className="text-[10px] text-emerald-600 block mt-0.5">Secure understanding</span>
                  </div>
                </div>

                <div className="p-2.5 bg-amber-50/60 border border-amber-200/70 rounded-xl text-[11px] text-amber-950 space-y-1">
                  <span className="font-bold flex items-center gap-1 text-[10px] text-amber-900 uppercase">
                    <FileCheck className="w-3.5 h-3.5 text-amber-700" /> SENCO Evidence Summary:
                  </span>
                  <p className="leading-snug">
                    Pupil achieves {p.unTimedAccuracy}% mastery when freed from time pressure. A standard-timed test misrepresents pupil capability as failing ({p.scorePercentage}%). Concrete evidence for 25% Extra Time arrangement.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Users, ShieldCheck, AlertCircle, Search, ChevronRight } from 'lucide-react';
import { PupilAuditRecord } from './teacherReportTypes';

interface Props {
  pupils: PupilAuditRecord[];
}

export const TeacherPupilForensicTab: React.FC<Props> = ({ pupils }) => {
  const [selectedPupilId, setSelectedPupilId] = useState<string>(pupils[0]?.id || '');
  const [filter, setFilter] = useState<'all' | 'reteach' | 'mastery'>('all');

  const filtered = pupils.filter((p) => {
    if (filter === 'reteach') return p.interventionTag === 'Immediate Reteach';
    if (filter === 'mastery') return p.interventionTag === 'Secure Mastery';
    return true;
  });

  const active = pupils.find((p) => p.id === selectedPupilId) || pupils[0];

  return (
    <div className="space-y-4">
      {/* Triage filter pills */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex gap-1.5">
          {(['all', 'reteach', 'mastery'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded-lg font-bold capitalize cursor-pointer transition-all ${
                filter === f ? 'bg-[#2D2A26] text-white shadow-2xs' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'All Pupils' : f === 'reteach' ? 'Needs Reteach (Table 1)' : 'Secure (Table 3)'}
            </button>
          ))}
        </div>
        <span className="text-[10px] text-gray-500 font-semibold">{filtered.length} Pupils</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start">
        {/* Ranked Pupil Table */}
        <div className="md:col-span-6 bg-white rounded-2xl border border-[#2D2A26]/15 overflow-hidden max-h-80 overflow-y-auto">
          <div className="divide-y divide-gray-100">
            {filtered.map((p, idx) => {
              const isSelected = p.id === active.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPupilId(p.id)}
                  className={`w-full p-2.5 text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    isSelected ? 'bg-indigo-50/80 border-l-4 border-indigo-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-300 font-mono font-bold text-[10px] flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <span className="font-bold text-[#2D2A26] block leading-tight">{p.name}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{p.timeSeconds}s avg</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      p.scorePercentage >= 80 ? 'bg-emerald-100 text-emerald-800' :
                      p.scorePercentage >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {p.scorePercentage}%
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Pupil Forensic Dossier */}
        <div className="md:col-span-6 bg-[#F8F6F0] p-4 rounded-2xl border border-[#2D2A26]/15 space-y-3">
          <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2">
            <div>
              <h5 className="text-sm font-black text-[#2D2A26] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                {active.name} — Assessment Audit File
              </h5>
              <span className="text-[10px] text-gray-500 font-bold">Live Formative Retrieval Evidence</span>
            </div>
            <span className="text-base font-black font-mono text-indigo-600">{active.scorePercentage}%</span>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-gray-600 uppercase block">Specific Misconceptions Identified</span>
            <ul className="text-xs text-[#2D2A26] list-disc list-inside space-y-0.5 bg-white p-2.5 rounded-xl border border-[#2D2A26]/10">
              {active.misconceptions.map((m, i) => (
                <li key={i} className="text-rose-700 font-medium">{m}</li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-white rounded-xl border border-indigo-200/80 space-y-1">
            <span className="text-[10px] font-black uppercase text-indigo-900 block flex items-center gap-1">
              Coursework &amp; Exam Dispute Defense Note
            </span>
            <p className="text-[11px] text-[#2D2A26]/90 leading-relaxed font-normal">
              {active.courseworkDefenseNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

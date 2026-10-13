import React from 'react';
import { Eye, ShieldAlert, Award, UserCheck } from 'lucide-react';

export const ImposterBluffDeepDive: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-black uppercase text-[#2D2A26] flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-purple-600" />
            Bluff Vulnerability Index &amp; Peer Scrutiny Audit
          </h4>
          <p className="text-[11px] text-gray-500">Evaluating whether honest students articulate concepts with enough precision to expose bluffers</p>
        </div>
        <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
          Oral Precision Metrics
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-white rounded-2xl border border-[#2D2A26]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">Imposter Detection Rate</span>
          <span className="text-xl font-black text-purple-600 font-mono">67% Accuracy</span>
          <span className="text-[10px] text-gray-500 block mt-0.5">2 of 3 Imposters caught</span>
        </div>
        <div className="p-3 bg-white rounded-2xl border border-[#2D2A26]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">Peer Scrutiny Precision</span>
          <span className="text-xl font-black text-[#2D2A26] font-mono">74% Specific</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Used formal terminology</span>
        </div>
        <div className="p-3 bg-white rounded-2xl border border-rose-200 bg-rose-50/30 shadow-2xs">
          <span className="text-[10px] font-bold text-rose-700 uppercase block">Vagueness Vulnerability</span>
          <span className="text-xl font-black text-rose-950 font-mono">33% Bluffed</span>
          <span className="text-[10px] text-rose-600 font-bold block mt-0.5">Pupils accepted non-answers</span>
        </div>
      </div>

      <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#2D2A26]/15 space-y-2.5">
        <span className="text-xs font-black uppercase text-[#2D2A26] block">Round 2 Bluff Failure Autopsy</span>
        <div className="p-3 bg-white rounded-xl border border-purple-200 space-y-1.5 text-xs">
          <div className="flex justify-between font-bold text-[#2D2A26]">
            <span>Prompt: "Identify the membrane barrier controlling entry into cells"</span>
            <span className="text-rose-600">Imposter Escaped Unvoted</span>
          </div>
          <p className="text-[11px] text-gray-600 leading-snug">
            Honest pupils wrote generic responses like &ldquo;it keeps things inside&rdquo; rather than naming the <span className="font-bold text-emerald-700">phospholipid bilayer</span>. Because honest answers lacked technical precision, the imposter's vague bluff blended in seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

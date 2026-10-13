import React from 'react';
import { BriefAuditResult } from '../services/exporters/unitBriefAuditEngine';

export const BriefAudit: React.FC<{ title: string; source: string; results: BriefAuditResult[] }> = ({ title, source, results }) => (
  <section className="mt-6 rounded-xl border border-[#2D2A26]/10 bg-[#F8F6F0] p-4">
    <h3 className="font-bold">Unit brief coverage</h3>
    <p className="mb-3 text-xs text-[#2D2A26]/65">{title} · criteria from {source}; phrase matching is evidence screening, not certification.</p>
    {!results.length && <p className="text-sm">No parsed assessment criteria are saved for this unit brief yet.</p>}
    {results.map((item) => <div key={item.criterion} className="border-t border-[#2D2A26]/10 py-2 text-sm">
      <p className="font-semibold">{item.code ? `${item.code} · ` : ''}{item.criterion}</p>
      <p className={item.coveredBy.length ? 'text-green-800' : 'text-[#9A4B2A]'}>
        {item.coveredBy.length ? `Evidence on: ${item.coveredBy.join(', ')}` : 'No matching slide evidence found'}
      </p>
    </div>)}
  </section>
);

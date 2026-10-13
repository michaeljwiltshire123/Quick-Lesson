import React from 'react';
import { Users, AlertTriangle, Lightbulb } from 'lucide-react';
import { FlaggedPupilRecord } from './analyticsTypes';

interface Props {
  flaggedPupils: FlaggedPupilRecord[];
}

export const PupilAlertsCard: React.FC<Props> = ({ flaggedPupils }) => {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 text-white space-y-3 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-rose-400" />
          <h4 className="text-xs font-black uppercase tracking-wider">Targeted Pupil Support</h4>
        </div>
        <span className="text-[10px] text-gray-400">{flaggedPupils.length} Flagged</span>
      </div>

      {flaggedPupils.length === 0 ? (
        <div className="p-4 text-center text-xs text-gray-400 bg-white/5 rounded-xl">
          All pupils demonstrated high concept mastery across this round!
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
          {flaggedPupils.map((pupil) => (
            <div
              key={pupil.pupilId}
              className="p-3 bg-rose-950/20 border border-rose-500/30 rounded-xl space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-rose-200">{pupil.pupilName}</span>
                <span className="px-2 py-0.5 rounded-md bg-rose-500/30 text-rose-300 font-mono font-bold text-[10px] border border-rose-500/40">
                  {pupil.accuracyPercentage}% Accuracy
                </span>
              </div>

              <div className="flex items-start gap-2 text-[11px] text-gray-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Needs consolidation in: <strong className="text-white">{pupil.struggleConcept}</strong>
                </span>
              </div>

              <div className="flex items-start gap-2 text-[11px] text-emerald-300 bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/20">
                <Lightbulb className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{pupil.suggestedAction}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { CheckSquare, Swords, RefreshCw } from 'lucide-react';

interface StudentQuestToggleProps {
  questSteps: string[]; onQuestStepsChange: (steps: string[]) => void;
  chunkTitle?: string; subject?: string; gradeLevel?: string; platform?: string; linkTitle?: string;
}

export const StudentQuestToggle: React.FC<StudentQuestToggleProps> = ({
  questSteps, onQuestStepsChange, chunkTitle, subject, gradeLevel, platform, linkTitle,
}) => {
  const [isEnabled, setIsEnabled] = useState(questSteps.length > 0);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch('/api/generate-lesson-section', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'student_quest_checklist', chunkTitle, subject, gradeLevel, platform, linkTitle }),
      });
      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data.steps) && data.steps.length > 0) { onQuestStepsChange(data.steps); setIsEnabled(true); }
      }
    } catch {
      onQuestStepsChange(['Open link and launch student quest', 'Complete key challenge questions', 'Record final score on worksheet']);
      setIsEnabled(true);
    } finally { setIsLoading(false); }
  };

  const handleToggle = () => {
    if (isEnabled) { setIsEnabled(false); onQuestStepsChange([]); }
    else { setIsEnabled(true); if (questSteps.length === 0) handleGenerate(); }
  };

  const handleUpdateStep = (idx: number, val: string) => {
    const updated = [...questSteps];
    updated[idx] = val;
    onQuestStepsChange(updated);
  };

  return (
    <div className="p-3 bg-gradient-to-r from-amber-50/70 to-amber-100/40 rounded-xl border border-[#D97706]/20 space-y-2">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Swords className="w-3.5 h-3.5 text-[#D97706]" />
          <span className="text-xs font-bold text-[#2D2A26]">Student Quest Checklist</span>
          <span className="text-[10px] font-bold text-[#D97706] bg-white px-1.5 py-0.2 rounded-full border border-amber-300">d = 0.94 Impact</span>
        </div>
        <div className="flex items-center gap-2">
          {isEnabled && (
            <button type="button" onClick={handleGenerate} disabled={isLoading} className="text-[10px] font-bold text-[#D97706] hover:text-amber-800 flex items-center gap-1 cursor-pointer">
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} /> Regenerate
            </button>
          )}
          <button type="button" onClick={handleToggle} className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${isEnabled ? 'bg-[#D97706] text-white' : 'bg-white text-[#2D2A26] border border-[#2D2A26]/15'}`}>
            {isEnabled ? 'Enabled ✓' : '+ Enable Quest'}
          </button>
        </div>
      </div>
      {isEnabled && questSteps.length > 0 && (
        <div className="space-y-1 pt-0.5">
          {questSteps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-[#2D2A26]/10">
              <CheckSquare className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
              <input type="text" value={step} onChange={(e) => handleUpdateStep(idx, e.target.value)} className="w-full text-xs text-[#2D2A26] bg-transparent focus:outline-none" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

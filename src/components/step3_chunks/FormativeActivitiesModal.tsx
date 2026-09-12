import React, { useState, useEffect, useCallback } from 'react';
import { X, Loader2, RotateCw } from 'lucide-react';
import { ModuleScheme } from '../../types';
import { FormativeTaskItem, getBadgeStyle, getIntelligenceBadgeStyle, getCriteriaList, getFallbackTasks } from './helpers/formativeModalHelpers';

interface FormativeActivitiesModalProps {
  isOpen: boolean; onClose: () => void; conceptTitle: string;
  subject?: string; gradeLevel?: string; themeNotes?: string; moduleScheme?: ModuleScheme;
  onSelectTask: (taskTitle: string, taskDetails: string, taskBadge: string, grouping: string) => void;
}

export const FormativeActivitiesModal: React.FC<FormativeActivitiesModalProps> = ({
  isOpen, onClose, conceptTitle, subject, gradeLevel, themeNotes, moduleScheme, onSelectTask,
}) => {
  const [grouping, setGrouping] = useState('Pairs');
  const [tasks, setTasks] = useState<FormativeTaskItem[]>([]);
  const [loading, setLoading] = useState(false);

  const hasAssessedCriteria = Boolean(moduleScheme?.assessedCriteria && Array.isArray(moduleScheme.assessedCriteria) && moduleScheme.assessedCriteria.length > 0);

  const fetchTasks = useCallback((targetGrouping: string, isRefresh = false) => {
    setLoading(true);
    fetch('/api/generate-lesson-section', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'chunk_formative_task', chunkTitle: conceptTitle, subject, gradeLevel, themeNotes,
        grouping: targetGrouping, refreshSeed: isRefresh ? Date.now() : undefined,
        requiredDeliverables: moduleScheme?.deliverables, assessedCriteria: moduleScheme?.assessedCriteria,
      }),
    })
      .then((res) => res.json())
      .then((d) => setTasks(Array.isArray(d?.activities) && d.activities.length > 0 ? d.activities.slice(0, 9) : getFallbackTasks(conceptTitle, targetGrouping, hasAssessedCriteria)))
      .catch(() => setTasks(getFallbackTasks(conceptTitle, targetGrouping, hasAssessedCriteria)))
      .finally(() => setLoading(false));
  }, [conceptTitle, subject, gradeLevel, themeNotes, moduleScheme, hasAssessedCriteria]);

  useEffect(() => { if (isOpen) fetchTasks(grouping); }, [isOpen, conceptTitle, grouping]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2A26]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-2xl w-full max-w-4xl p-6 shadow-2xl space-y-4 text-[#2D2A26] max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#D97706] bg-amber-100 px-2.5 py-1 rounded-md border border-[#2D2A26]/10">Howard Gardner Formative Tasks</span>
            <h3 className="text-base sm:text-lg font-bold text-[#2D2A26] mt-1">3-8 Min Active Tasks: {conceptTitle}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => fetchTasks(grouping, true)} disabled={loading} className="px-3 py-1.5 bg-white hover:bg-amber-100 border border-[#2D2A26]/15 rounded-xl text-xs sm:text-sm font-bold text-[#2D2A26] flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50 shadow-2xs">
              <RotateCw className={`w-4 h-4 text-[#D97706] ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button type="button" onClick={onClose} className="p-1.5 hover:bg-[#2D2A26]/10 rounded-lg cursor-pointer"><X className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-[#2D2A26]/10">
          <span className="text-xs sm:text-sm font-bold text-[#2D2A26]">Grouping:</span>
          {['Solo', 'Pairs', 'Trios', 'Small Groups', 'Whole Class'].map((opt) => (
            <button key={opt} type="button" onClick={() => setGrouping(opt)} className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${grouping === opt ? 'bg-[#2D2A26] text-white' : 'bg-white border border-[#2D2A26]/15 text-[#2D2A26]'}`}>{opt}</button>
          ))}
        </div>

        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-sm font-semibold text-[#2D2A26]/60">
            <Loader2 className="w-8 h-8 animate-spin text-[#D97706]" /><span>Generating {grouping} tasks...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 overflow-y-auto pr-1">
            {tasks.map((act) => {
              const critList = getCriteriaList(act, hasAssessedCriteria);
              const mainBadge = critList.length > 0 ? critList.join(', ') : 'A1';
              return (
                <button key={act.id} type="button" onClick={() => { onSelectTask(act.title, act.task || act.rules || '', mainBadge, grouping); onClose(); }} className="text-left p-3.5 sm:p-4 bg-white hover:border-[#D97706] border border-[#2D2A26]/15 rounded-2xl shadow-2xs cursor-pointer flex flex-col justify-between transition-all hover:scale-[1.01]">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className={`text-xs font-extrabold uppercase px-2 py-0.5 rounded-md border truncate max-w-[180px] ${getIntelligenceBadgeStyle(act.intelligence)}`}>{act.intelligence}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#2D2A26] leading-tight">{act.title}</h4>
                    <p className="text-xs sm:text-sm text-[#2D2A26]/85 font-medium leading-relaxed">{act.task}</p>
                  </div>
                  {critList.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap pt-2 mt-2 border-t border-[#2D2A26]/10">
                      {critList.map((c, idx) => (
                        <span key={idx} className={`text-[9px] font-extrabold uppercase px-1.5 py-0.25 rounded border shadow-2xs ${getBadgeStyle(c)}`}>{c}</span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

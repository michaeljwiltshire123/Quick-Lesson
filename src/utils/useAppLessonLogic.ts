import { useState, useEffect, useCallback } from 'react';
import { ModuleScheme } from '../types';
import { loadStoredState, saveStateToStorage, DEFAULT_APP_STATE } from './storage';
import { requestParsedModuleBrief, requestReparseBrief } from './aiBriefParser';
import { requestLessonSequence } from './aiSequenceGenerator';

export function useAppLessonLogic() {
  const [initLoaded, setInitLoaded] = useState(false);
  const [state, setState] = useState(DEFAULT_APP_STATE);
  const [libraryMessage, setLibraryMessage] = useState(false);
  const [isAmberPulse, setIsAmberPulse] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isGeneratingSequence, setIsGeneratingSequence] = useState(false);
  const [isAnalyzingBrief, setIsAnalyzingBrief] = useState(false);
  const [wizardInitialStep, setWizardInitialStep] = useState<number>(1);

  useEffect(() => { setState(loadStoredState()); setInitLoaded(true); }, []);
  useEffect(() => { if (initLoaded) saveStateToStorage(state); }, [initLoaded, state]);

  const update = <K extends keyof typeof state>(k: K, val: typeof state[K]) =>
    setState((p) => ({ ...p, [k]: val }));

  const updateModule = <K extends keyof ModuleScheme>(k: K, val: ModuleScheme[K]) =>
    setState((p) => ({ ...p, moduleScheme: { ...p.moduleScheme, [k]: val } }));

  const handleParsedDoc = async (name: string, content: string, fileBase64?: string, mimeType?: string) => {
    setIsAnalyzingBrief(true);
    setState((prev) => ({
      ...prev,
      moduleBriefFile: { name, content, fileBase64, mimeType } as any,
      moduleScheme: { ...prev.moduleScheme, hasBrief: true },
    }));
    try {
      const ok = await requestParsedModuleBrief(name, content, state, (p) => setState((prev) => ({
        ...prev, ...p,
        lessonTitle: prev.lessonTitle.trim() || (p.lessonTitle || ''),
        subject: prev.subject.trim() || (p.subject || ''),
        gradeLevel: prev.gradeLevel && prev.gradeLevel !== 'Key Stage 3 (Years 7-9)' ? prev.gradeLevel : (p.gradeLevel || prev.gradeLevel),
        moduleScheme: { ...prev.moduleScheme, ...(p.moduleScheme || {}), hasBrief: true },
      })), fileBase64, mimeType);
      if (ok) { setIsAmberPulse(true); setTimeout(() => setIsAmberPulse(false), 2000); }
    } finally { setIsAnalyzingBrief(false); }
  };

  const handleLoadSavedBrief = (b: any) => {
    const p = b?.parsed || b || {}, w = Math.max(1, Number(b?.unitDurationWeeks || p?.unitDurationWeeks || p?.planningWeek) || 1);
    const title = p.lessonTitle || p.unitName || p.courseTitle || p.assignmentTitle || b?.title || b?.name || 'Syllabus';
    setWizardInitialStep(2);
    setState((prev) => ({
      ...prev, lessonTitle: title, subject: p.subject || b?.subject || prev.subject, gradeLevel: p.gradeLevel || prev.gradeLevel,
      moduleBriefFile: { name: b?.name || title, content: b?.cleanContent || p.rawText || '' },
      moduleScheme: {
        hasBrief: true, courseTitle: p.courseTitle || p.unitTitle || title, unitName: p.unitName || p.unitTitle || title,
        vocationalScenario: p.vocationalScenario || '', planningWeek: w, unitDurationWeeks: w,
        deliverables: Array.isArray(p.deliverables || p.requiredDeliverables) ? (p.deliverables || p.requiredDeliverables) : [],
        assessedCriteria: Array.isArray(p.assessedCriteria) ? p.assessedCriteria : [], weeklyMilestones: Array.isArray(p.weeklyMilestones) ? p.weeklyMilestones : [],
      }, currentStepKey: 'intro', isWizardActive: true,
    }));
  };

  const handleGenerateSequence = useCallback(async () => {
    setIsGeneratingSequence(true);
    const combinedNotes = state.draftFile ? `${state.rawNotes}\n\nDraft Lesson Material:\n${state.draftFile.content}` : state.rawNotes;
    const steps = await requestLessonSequence(state.lessonTitle, state.subject, state.gradeLevel, combinedNotes);
    if (steps.length > 0) setState((prev) => ({ ...prev, learningObjectives: steps }));
    setIsGeneratingSequence(false);
  }, [state.lessonTitle, state.subject, state.gradeLevel, state.rawNotes, state.draftFile]);

  const handleLookAgain = async () => {
    if (!state.moduleBriefFile) return;
    setIsAnalyzingBrief(true);
    try {
      const newCrit = await requestReparseBrief(state.moduleBriefFile as any, state.moduleScheme.assessedCriteria);
      if (newCrit.length > 0) updateModule('assessedCriteria', Array.from(new Set([...state.moduleScheme.assessedCriteria, ...newCrit])));
    } finally { setIsAnalyzingBrief(false); }
  };

  return {
    state, setState, update, updateModule, libraryMessage, setLibraryMessage,
    isAmberPulse, isTourOpen, setIsTourOpen, isGeneratingSequence, isAnalyzingBrief,
    wizardInitialStep, setWizardInitialStep, handleParsedDoc, handleLoadSavedBrief,
    handleGenerateSequence, handleLookAgain,
  };
}

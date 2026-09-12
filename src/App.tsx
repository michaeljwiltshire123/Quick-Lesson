import { clearStoredState, DEFAULT_APP_STATE } from './utils/storage';
import { WizardLayout } from './components/layout/WizardLayout';
import { Step1Container } from './components/step1_ingestion';
import { Step2Workspace } from './components/step2_parameters';
import { Step3Workspace, reconcileMilestonesToChunks } from './components/step3_chunks';
import { useAppLessonLogic } from './utils/useAppLessonLogic';

export default function App() {
  const {
    state, setState, update, updateModule, libraryMessage, setLibraryMessage,
    isAmberPulse, isTourOpen, setIsTourOpen, isGeneratingSequence, isAnalyzingBrief,
    wizardInitialStep, setWizardInitialStep, handleParsedDoc, handleLoadSavedBrief,
    handleGenerateSequence, handleLookAgain,
  } = useAppLessonLogic();

  return (
    <WizardLayout
      onRestartLesson={() => { clearStoredState(); setState(DEFAULT_APP_STATE); }}
      onWalkthrough={state.currentStepKey === 'parameters' ? () => setIsTourOpen(true) : undefined}
      lessonTitle={state.lessonTitle} subject={state.subject} gradeLevel={state.gradeLevel}
      chunks={state.chunks} moduleScheme={state.moduleScheme}
      onFilePicked={(doc) => handleParsedDoc(doc.name, doc.description || doc.name)}
    >
      {state.currentStepKey === 'intro' ? (
        <Step1Container
          state={state} wizardInitialStep={wizardInitialStep} libraryMessage={libraryMessage} onSetLibraryMessage={setLibraryMessage}
          onStartWizard={() => { setWizardInitialStep(1); update('isWizardActive', true); }} onBackToOnboarding={() => update('isWizardActive', false)}
          onCompleteWizard={() => update('currentStepKey', 'parameters')} onFileParsed={handleParsedDoc} onLoadSavedBrief={handleLoadSavedBrief}
          onUploadModuleBrief={(f) => f ? handleParsedDoc(f.name, f.content, (f as any).fileBase64, (f as any).mimeType) : update('moduleBriefFile', null)}
          onRawNotesChange={(v) => update('rawNotes', v)} onAddVideoLink={(l) => update('videoLinks', [...state.videoLinks, l])} onRemoveVideoLink={(i) => update('videoLinks', state.videoLinks.filter((_, idx) => idx !== i))}
          onUploadDraftFile={(f) => update('draftFile', f)} onThemeNotesChange={(v) => update('themeNotes', v)} onLessonTitleChange={(v) => update('lessonTitle', v)}
        />
      ) : state.currentStepKey === 'parameters' ? (
        <Step2Workspace
          isAnalyzingBrief={isAnalyzingBrief} isTourOpen={isTourOpen} onCloseTour={() => setIsTourOpen(false)} subject={state.subject} onSubjectChange={(v) => update('subject', v)}
          gradeLevel={state.gradeLevel} onGradeLevelChange={(v) => update('gradeLevel', v)} lessonTitle={state.lessonTitle} onLessonTitleChange={(v) => update('lessonTitle', v)}
          lessonDuration={state.lessonDuration} onLessonDurationChange={(v) => update('lessonDuration', Math.max(1, v))} rawNotes={state.rawNotes} onRawNotesChange={(v) => update('rawNotes', v)}
          videoLinks={state.videoLinks} onAddVideoLink={(l) => update('videoLinks', [...state.videoLinks, l])} onRemoveVideoLink={(i) => update('videoLinks', state.videoLinks.filter((_, idx) => idx !== i))}
          draftFileName={state.draftFile?.name} onRemoveDraftFile={() => update('draftFile', null)} moduleBriefFileName={state.moduleBriefFile?.name} onRemoveModuleBriefFile={() => update('moduleBriefFile', null)}
          learningObjectives={state.learningObjectives} onUpdateObjective={(idx, val) => update('learningObjectives', state.learningObjectives.map((it, i) => i === idx ? val : it))} onAddObjective={(val) => update('learningObjectives', [...state.learningObjectives, val || 'New Progression Step'])}
          onRemoveObjective={(idx) => update('learningObjectives', state.learningObjectives.filter((_, i) => i !== idx))} onClearObjectives={() => update('learningObjectives', [])}
          onGenerateSequence={handleGenerateSequence} isGeneratingSequence={isGeneratingSequence} moduleScheme={state.moduleScheme} onUpdateUnitDurationWeeks={(w) => updateModule('unitDurationWeeks', w)} onUpdateScenario={(s) => updateModule('vocationalScenario', s)}
          onAddDeliverable={(d) => updateModule('deliverables', [...state.moduleScheme.deliverables, d])} onRemoveDeliverable={(i) => updateModule('deliverables', state.moduleScheme.deliverables.filter((_, idx) => idx !== i))} onAddCriterion={(c) => updateModule('assessedCriteria', [...state.moduleScheme.assessedCriteria, c])} onRemoveCriterion={(i) => updateModule('assessedCriteria', state.moduleScheme.assessedCriteria.filter((_, idx) => idx !== i))}
          onAddAssignmentBrief={() => { update('currentStepKey', 'intro'); setWizardInitialStep(1); update('isWizardActive', true); }} onLookAgain={handleLookAgain} onBack={() => { update('currentStepKey', 'intro'); update('isWizardActive', false); }} onContinue={() => { setState((prev) => ({ ...prev, currentStepKey: 'chunks_workspace', chunks: reconcileMilestonesToChunks(prev.learningObjectives, prev.chunks) })); }} isAmberPulse={isAmberPulse}
        />
      ) : (
        <Step3Workspace onBack={() => update('currentStepKey', 'parameters')} lessonTitle={state.lessonTitle} chunks={state.chunks} onUpdateChunks={(c) => update('chunks', c)} subject={state.subject} gradeLevel={state.gradeLevel} themeNotes={state.themeNotes} moduleScheme={state.moduleScheme} />
      )}
    </WizardLayout>
  );
}

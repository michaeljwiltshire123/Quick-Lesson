import React from 'react';
import { ChunkAttachment, LessonChunk } from '../../../types';
import { LinkDetailsForm } from './LinkDetailsForm';
import { PayloadGeneratorTab } from './tabs/PayloadGeneratorTab';
import { ConceptBreakdownModalTab } from './tabs/ConceptBreakdownModalTab';
import { LociGeneratorTab } from './tabs/LociGeneratorTab';
import { WordBreakdownTab } from './tabs/WordBreakdownTab';
import { LimerickTab } from './tabs/LimerickTab';
import { AcronymTab } from './tabs/AcronymTab';
import { InteractivePollTab } from './tabs/InteractivePollTab';
import { LociWizardStep } from './tabs/loci/types';
import { QuizModalTab } from './QuizModalTabsBar';
import { AcronymItem } from './tabs/acronym/types';
import { LimerickFormState } from './tabs/limerick/types';

interface Props {
  activeTab: QuizModalTab;
  activeChunk?: LessonChunk;
  slideTitle?: string;
  subject?: string;
  gradeLevel?: string;
  themeNotes?: string;
  currentUrl: string;
  currentTitle: string;
  onUrlChange: (u: string) => void;
  onTitleChange: (t: string) => void;
  onAttach: (att: Partial<ChunkAttachment>) => void;
  onUpdateChunk?: (updated: LessonChunk) => void;
  onSetLociStep: (step: LociWizardStep) => void;
  onSuccessfulLociAttach: () => void;
  onSendToQr: (url: string, title: string) => void;
  onSendAcronymToLimerick: (item: AcronymItem, workflow?: string) => void;
  limerickPrefill: Partial<LimerickFormState> | null;
}

export const ModalTabContent: React.FC<Props> = ({
  activeTab, activeChunk, slideTitle, subject, gradeLevel, themeNotes,
  currentUrl, currentTitle, onUrlChange, onTitleChange, onAttach,
  onUpdateChunk, onSetLociStep, onSuccessfulLociAttach, onSendToQr,
  onSendAcronymToLimerick, limerickPrefill,
}) => (
  <div className={`overflow-y-auto flex-1 min-h-0 ${activeTab === 'loci' ? 'px-4 sm:px-5 pb-4 sm:pb-5 pt-0' : 'p-4 sm:p-5'}`}>
    {activeTab === 'setup' && <LinkDetailsForm onAttachLink={onAttach} initialUrl={currentUrl} initialTitle={currentTitle} onUrlChange={onUrlChange} onTitleChange={onTitleChange} chunkTitle={slideTitle} subject={subject} gradeLevel={gradeLevel} />}
    {activeTab === 'breakdown' && <ConceptBreakdownModalTab chunk={activeChunk} onUpdateChunk={onUpdateChunk} slideTitle={slideTitle} subject={subject} gradeLevel={gradeLevel} themeNotes={themeNotes} />}
    {activeTab === 'words' && <WordBreakdownTab activeChunk={activeChunk} onUpdateChunk={onUpdateChunk} slideTitle={slideTitle} subject={subject} onAddAttachment={onAttach} />}
    {activeTab === 'acronym' && <AcronymTab activeChunk={activeChunk} slideTitle={slideTitle} subject={subject} gradeLevel={gradeLevel} onAddAttachment={onAttach} onUpdateChunk={onUpdateChunk} onSendToLimerick={onSendAcronymToLimerick} />}
    {activeTab === 'limerick' && <LimerickTab activeChunk={activeChunk} slideTitle={slideTitle} subject={subject} gradeLevel={gradeLevel} onAddAttachment={onAttach} prefill={limerickPrefill} />}
    {activeTab === 'loci' && <LociGeneratorTab chunk={activeChunk} chunkTitle={slideTitle} subject={subject} gradeLevel={gradeLevel} onAddAttachment={onAttach} onStepChange={onSetLociStep} onSuccessfulAttach={onSuccessfulLociAttach} onSendToQr={onSendToQr} />}
    {activeTab === 'payloads' && <PayloadGeneratorTab chunkTitle={slideTitle} subject={subject} gradeLevel={gradeLevel} onAddAttachment={onAttach} />}
    {activeTab === 'poll' && <InteractivePollTab activeChunk={activeChunk} slideTitle={slideTitle} subject={subject} gradeLevel={gradeLevel} onAddAttachment={onAttach} onUpdateChunk={onUpdateChunk} />}
  </div>
);

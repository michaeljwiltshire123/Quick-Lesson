import React, { useState } from 'react';
import { X, Link as LinkIcon } from 'lucide-react';
import { ChunkAttachment, LessonChunk } from '../../types';
import { LinkDetailsForm } from './link_modal/LinkDetailsForm';
import { PayloadGeneratorTab } from './link_modal/tabs/PayloadGeneratorTab';
import { ConceptBreakdownModalTab } from './link_modal/tabs/ConceptBreakdownModalTab';
import { LociGeneratorTab } from './link_modal/tabs/LociGeneratorTab';
import { WordBreakdownTab } from './link_modal/tabs/WordBreakdownTab';
import { LimerickTab } from './link_modal/tabs/LimerickTab';
import { AttachedResourcesTray } from './link_modal/components/AttachedResourcesTray';
import { LociWizardStep } from './link_modal/tabs/loci/types';
import { LociExitWarningModal } from './link_modal/LociExitWarningModal';
import { QuizModalTabsBar, QuizModalTab } from './link_modal/QuizModalTabsBar';
import { QuizModalFooter } from './link_modal/QuizModalFooter';

export interface AddQuizResourceModalProps {
  isOpen: boolean; onClose: () => void;
  onAddAttachment: (att: Partial<ChunkAttachment>) => void;
  onRemoveAttachment?: (attId: string) => void;
  attachments?: ChunkAttachment[]; slideTitle?: string; subject?: string; gradeLevel?: string;
  activeChunk?: LessonChunk; onUpdateChunk?: (updated: LessonChunk) => void; themeNotes?: string;
}

export const AddQuizResourceModal: React.FC<AddQuizResourceModalProps> = ({
  isOpen, onClose, onAddAttachment, onRemoveAttachment, attachments = [], slideTitle = '',
  subject, gradeLevel, activeChunk, onUpdateChunk, themeNotes,
}) => {
  const [activeTab, setActiveTab] = useState<QuizModalTab>('setup');
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [lociStep, setLociStep] = useState<LociWizardStep>('words');
  const [lociAttached, setLociAttached] = useState(() => !!activeChunk?.lociAttached);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [returnToLociOnDone, setReturnToLociOnDone] = useState(false);

  if (!isOpen) return null;

  const handleAttach = (att: Partial<ChunkAttachment>) => {
    onAddAttachment(att);
    if (att.url) setCurrentUrl(att.url);
    if (att.name) setCurrentTitle(att.name);
  };

  const handleSuccessfulLociAttach = () => {
    setLociAttached(true);
    if (activeChunk && onUpdateChunk) {
      onUpdateChunk({ ...activeChunk, lociAttached: true, lociRouteName: slideTitle || 'Memory Palace' });
    }
  };

  const handleSendToQr = (url: string, title: string) => {
    setCurrentUrl(url);
    setCurrentTitle(title);
    setActiveTab('setup');
    setReturnToLociOnDone(true);
  };

  const handleAttemptClose = () => {
    if (returnToLociOnDone) { setActiveTab('loci'); setReturnToLociOnDone(false); return; }
    if (activeTab === 'loci' && lociStep === 'script' && !lociAttached) { setShowExitWarning(true); return; }
    onClose();
  };

  const isAtEnd = activeTab !== 'loci' || lociStep === 'script';

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2A26]/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-2xl w-full max-w-3xl overflow-hidden shadow-xl flex flex-col my-auto max-h-[92vh] relative">
        <LociExitWarningModal isOpen={showExitWarning} onCancel={() => setShowExitWarning(false)} onConfirmExit={() => { setShowExitWarning(false); onClose(); }} />
        <div className="p-4 border-b border-[#2D2A26]/10 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <LinkIcon className="w-5 h-5 text-[#D97706]" />
            <h3 className="text-base sm:text-lg font-bold text-[#2D2A26]">Add Link &amp; Resource Studio</h3>
          </div>
          <button type="button" onClick={handleAttemptClose} className="p-1.5 rounded-lg text-[#2D2A26]/60 hover:text-[#2D2A26] hover:bg-black/5 cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <AttachedResourcesTray attachments={attachments} onRemoveAttachment={onRemoveAttachment} />
        <QuizModalTabsBar activeTab={activeTab} onChangeTab={(tab) => { setActiveTab(tab); if (tab === 'loci') setReturnToLociOnDone(false); }} />

        <div className={`overflow-y-auto flex-1 min-h-0 ${activeTab === 'loci' ? 'px-4 sm:px-5 pb-4 sm:pb-5 pt-0' : 'p-4 sm:p-5'}`}>
          {activeTab === 'setup' && <LinkDetailsForm onAttachLink={handleAttach} initialUrl={currentUrl} initialTitle={currentTitle} onUrlChange={setCurrentUrl} onTitleChange={setCurrentTitle} chunkTitle={slideTitle} subject={subject} gradeLevel={gradeLevel} />}
          {activeTab === 'breakdown' && <ConceptBreakdownModalTab chunk={activeChunk} onUpdateChunk={onUpdateChunk} slideTitle={slideTitle} subject={subject} gradeLevel={gradeLevel} themeNotes={themeNotes} />}
          {activeTab === 'words' && <WordBreakdownTab activeChunk={activeChunk} onUpdateChunk={onUpdateChunk} slideTitle={slideTitle} subject={subject} onAddAttachment={handleAttach} />}
          {activeTab === 'limerick' && <LimerickTab activeChunk={activeChunk} slideTitle={slideTitle} subject={subject} gradeLevel={gradeLevel} onAddAttachment={handleAttach} />}
          {activeTab === 'loci' && <LociGeneratorTab chunk={activeChunk} chunkTitle={slideTitle} subject={subject} gradeLevel={gradeLevel} onAddAttachment={handleAttach} onStepChange={setLociStep} onSuccessfulAttach={handleSuccessfulLociAttach} onSendToQr={handleSendToQr} />}
          {activeTab === 'payloads' && <PayloadGeneratorTab chunkTitle={slideTitle} subject={subject} gradeLevel={gradeLevel} onAddAttachment={handleAttach} />}
        </div>

        <QuizModalFooter isAtEnd={isAtEnd} activeTab={activeTab} lociStep={lociStep} lociAttached={lociAttached} onDone={handleAttemptClose} />
      </div>
    </div>
  );
};

import React from 'react';
import { LessonChunk, ChunkAttachment } from '../../../../../types';
import { LociWizardStep } from './types';
import { useLociWizardState } from './useLociWizardState';
import { LociWizardHeader } from './LociWizardHeader';
import { LociRouteChainVisualizer } from './LociRouteChainVisualizer';
import { LociWordSelector } from './LociWordSelector';
import { LociRouteAndImageMapper } from './LociRouteAndImageMapper';
import { LociScriptAndFlashcards } from './LociScriptAndFlashcards';

interface Props {
  chunk?: LessonChunk;
  chunkTitle?: string;
  subject?: string;
  gradeLevel?: string;
  onAddAttachment?: (att: Partial<ChunkAttachment>) => void;
  onStepChange?: (step: LociWizardStep) => void;
  onSuccessfulAttach?: () => void;
  onSendToQr?: (url: string, title: string) => void;
}

export const LociGeneratorTab: React.FC<Props> = ({
  chunk, subject, onAddAttachment, onStepChange, onSuccessfulAttach, onSendToQr,
}) => {
  const {
    step, setStep, terms, setTerms, associations, setAssociations,
    routeName, setRouteName, stationSuggestions, setStationSuggestions,
    scriptData, isLoadingScript, handleMapperNext,
  } = useLociWizardState(chunk?.id, subject, onStepChange);

  return (
    <div className={`space-y-2.5 ${step === 'mapper' ? 'pt-0' : 'pt-3 sm:pt-4'}`}>
      {step === 'mapper' && (
        <div className="sticky top-0 z-30 bg-[#F8F6F0] -mx-4 sm:-mx-5 px-4 sm:px-5 py-2 border-b border-[#2D2A26]/10 shadow-2xs">
          <LociRouteChainVisualizer stations={associations.map((a) => a.station)} />
        </div>
      )}

      <LociWizardHeader step={step} />

      {step === 'words' && (
        <LociWordSelector
          terms={terms}
          onChangeTerms={setTerms}
          routeName={routeName}
          onChangeRouteName={setRouteName}
          onStationsGenerated={setStationSuggestions}
          onNext={() => setStep('mapper')}
          chunk={chunk}
          subject={subject}
        />
      )}
      {step === 'mapper' && (
        <LociRouteAndImageMapper
          terms={terms}
          selectedRouteName={routeName}
          onChangeRouteName={setRouteName}
          initialStationSuggestions={stationSuggestions}
          associations={associations}
          onChangeAssociations={setAssociations}
          onNext={handleMapperNext}
          onBack={() => setStep('words')}
          subject={subject}
        />
      )}
      {step === 'script' && (
        <LociScriptAndFlashcards
          scriptData={scriptData}
          isLoading={isLoadingScript}
          onBack={() => setStep('mapper')}
          onAddAttachment={onAddAttachment}
          routeName={routeName}
          onSuccessfulAttach={onSuccessfulAttach}
          onSendToQr={onSendToQr}
        />
      )}
    </div>
  );
};

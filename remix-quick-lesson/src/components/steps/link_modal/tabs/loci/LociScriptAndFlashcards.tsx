import React, { useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { LociScriptOutput } from './types';
import { LociFlashcardsView } from './LociFlashcardsView';
import { LociReviewEnding } from './LociReviewEnding';
import { LociScriptStationCard } from './LociScriptStationCard';
import { LociActionButtons } from './LociActionButtons';
import { LociRhythmCuesToggle } from './LociRhythmCuesToggle';
import { generateLociDocumentData } from './lociDocExporter';
import { ChunkAttachment } from '../../../../../types';
import { recordRouteInVault, autoSaveRouteToLibrary } from './lociVaultStorage';

interface Props {
  scriptData: LociScriptOutput | null; isLoading: boolean; onBack: () => void;
  onAddAttachment?: (att: Partial<ChunkAttachment>) => void;
  routeName: string; onSuccessfulAttach?: () => void; onSendToQr?: (url: string, title: string) => void;
}

export const LociScriptAndFlashcards: React.FC<Props> = ({
  scriptData, isLoading, onBack, onAddAttachment, routeName, onSuccessfulAttach, onSendToQr,
}) => {
  const [attached, setAttached] = useState(false);
  const [showRhythmCues, setShowRhythmCues] = useState(false);

  const handleAttach = () => {
    if (!scriptData) return;
    const name = routeName || scriptData.title;
    recordRouteInVault(name);
    autoSaveRouteToLibrary(name, scriptData.stations.map((s) => s.station));
    const doc = generateLociDocumentData(scriptData, 'journey', name);
    onAddAttachment?.({
      type: 'document',
      name: `Loci Palace: ${name}`,
      url: doc.url,
      qrDesign: { enabled: true, fgColor: '#D97706', bgColor: '#FEF3C7', dotShape: 'rounded', centerIcon: '🏛️' },
    });
    setAttached(true);
    onSuccessfulAttach?.();
  };

  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#D97706] animate-spin" />
        <p className="text-xs font-bold text-[#2D2A26]">Weaving memory palace architectural walkthrough story...</p>
      </div>
    );
  }
  if (!scriptData) return null;

  return (
    <div className="space-y-3">
      <div className="bg-white border border-[#2D2A26]/15 rounded-xl p-3.5 space-y-3">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2.5 flex-wrap gap-2">
          <div>
            <h4 className="text-xs font-black text-[#2D2A26]">{scriptData.title}</h4>
            <p className="text-[11px] text-[#2D2A26]/70">{scriptData.introduction}</p>
          </div>
          <LociActionButtons
            scriptData={scriptData}
            routeName={routeName}
            attached={attached}
            onAttach={handleAttach}
            onAddAttachment={onAddAttachment}
            onSendToQr={onSendToQr}
          />
        </div>

        <LociRhythmCuesToggle
          enabled={showRhythmCues}
          onToggle={() => setShowRhythmCues(!showRhythmCues)}
        />

        <div className="max-h-[360px] overflow-y-auto space-y-3 pr-1">
          {scriptData.stations.map((st, idx) => (
            <LociScriptStationCard key={st.term + idx} station={st} index={idx} showRhythmCues={showRhythmCues} />
          ))}
        </div>
        <LociReviewEnding peerTeachingPrompt={scriptData.peerTeachingPrompt} spacedRetrievalSchedule={scriptData.spacedRetrievalSchedule} />
      </div>

      <LociFlashcardsView stations={scriptData.stations} />

      <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
        <button type="button" onClick={onBack} className="px-4 py-2 border border-[#2D2A26]/20 text-[#2D2A26] text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-black/5">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Route
        </button>
        <LociActionButtons
          scriptData={scriptData}
          routeName={routeName}
          attached={attached}
          onAttach={handleAttach}
          onAddAttachment={onAddAttachment}
          onSendToQr={onSendToQr}
        />
      </div>
    </div>
  );
};
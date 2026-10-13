import React, { useState } from 'react';
import { LadderQuizConfig, LadderRungQuestion, LifelineType, LadderSkin } from './typesLadder';
import { createDefaultLadderConfig, generateDefaultLadderRungs } from './ladderDefaults';
import { generateEscalatedQuestions } from './factories/ladderFactoryRouter';
import { LadderConfigToolbar } from './LadderConfigToolbar';
import { LadderRungEditorCard } from './LadderRungEditorCard';
import { LessonChunk } from '../../../../../types';
import { Plus } from 'lucide-react';
import { LadderSimulatorModal } from './preview/LadderSimulatorModal';
import { LadderQualityInspectorModal } from './inspector/LadderQualityInspectorModal';
import { LadderExportModal } from './exporters/LadderExportModal';
import { LadderQuizHeaderCard } from './LadderQuizHeaderCard';
import { LadderInsightsCard } from './LadderInsightsCard';
import { VoiceReaderControls, useTextToSpeech } from '../../plain_quiz/audio';

interface Props {
  lessonTitle: string; chunks: LessonChunk[]; gradeLevel?: string; onNotice?: (msg: string) => void;
}

export const LadderQuizBuilderContainer: React.FC<Props> = ({
  lessonTitle, chunks, gradeLevel = 'Secondary School', onNotice,
}) => {
  const [config, setConfig] = useState<LadderQuizConfig>(() => createDefaultLadderConfig(lessonTitle, chunks));
  const [isAttached, setIsAttached] = useState(() => Boolean(sessionStorage.getItem('attached_ladder_quiz')));
  const [isGenerating, setIsGenerating] = useState(false);
  const [preview, setPreview] = useState(false);
  const [inspector, setInspector] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [insights, setInsights] = useState(false);
  const [persona, setPersona] = useState('scenarios');
  const [globalTimer, setGlobalTimer] = useState(20);

  const tts = useTextToSpeech();

  const handleAIRungs = async () => {
    setIsGenerating(true);
    try {
      const generated = await generateEscalatedQuestions({
        lessonTitle, chunks, personaKey: persona, gradeLevel, totalRungs: config.totalRungs,
      });
      const tuned = generated.map(r => ({ ...r, timerSeconds: globalTimer }));
      setConfig({ ...config, rungs: tuned });
      onNotice?.(`Synthesised progressive ${gradeLevel} rungs successfully!`);
    } catch { onNotice?.('AI synthesis failed. Loaded fallback rungs.'); }
    finally { setIsGenerating(false); }
  };

  const handleAddRung = () => {
    if (config.totalRungs >= 25) return;
    const n = config.totalRungs + 1;
    const newR: LadderRungQuestion = {
      id: `r-${n}-${Date.now()}`, rungNumber: n, pointValue: n * 25000,
      prompt: `New rung ${n} challenge...`, choices: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctChoiceIndex: 0, explanation: 'Explanation.', timerSeconds: globalTimer, isSafetyNet: false,
    };
    setConfig({ ...config, totalRungs: n, rungs: [...config.rungs, newR] });
  };

  const handleGlobalTimer = (seconds: number) => {
    setGlobalTimer(seconds);
    setConfig(prev => ({ ...prev, rungs: prev.rungs.map(r => ({ ...r, timerSeconds: seconds })) }));
  };

  return (
    <div className="space-y-4 text-[#2D2A26]">
      <LadderQuizHeaderCard title={config.title} isAttached={isAttached} isGenerating={isGenerating} personaKey={persona} setPersonaKey={setPersona} onPreview={() => setPreview(true)} onInspector={() => setInspector(true)} onExport={() => setExportModal(true)} onAttach={() => { sessionStorage.setItem('attached_ladder_quiz', JSON.stringify(config)); setIsAttached(true); onNotice?.('Attached Escalation Ladder Quiz.'); }} onGenerate={handleAIRungs} />

      <VoiceReaderControls config={tts.config} onChangeConfig={tts.setConfig} voices={tts.voices} isSpeaking={tts.isSpeaking} onTestSpeak={() => tts.speak(`Welcome to ${config.title}. Let's begin.`)} onStopSpeak={tts.stop} />

      <LadderConfigToolbar totalRungs={config.totalRungs} onChangeRungs={(n) => setConfig({ ...config, totalRungs: n, rungs: generateDefaultLadderRungs(n, lessonTitle, chunks).map(r => ({ ...r, timerSeconds: globalTimer })) })} skin={config.skin} onChangeSkin={(s: LadderSkin) => setConfig({ ...config, skin: s })} activeLifelines={config.activeLifelines} onChangeLifelines={(l: LifelineType[]) => setConfig({ ...config, activeLifelines: l })} maxStudentLifelines={config.maxStudentLifelines || 3} onChangeMaxStudentLifelines={(num) => setConfig({ ...config, maxStudentLifelines: num })} globalTimer={globalTimer} onChangeGlobalTimer={handleGlobalTimer} />

      <LadderInsightsCard insights={insights} setInsights={setInsights} rungs={config.rungs} />

      <div className="space-y-4">
        {config.rungs.map((rung, idx) => (
          <LadderRungEditorCard key={rung.id} rung={rung} index={idx} totalRungs={config.totalRungs} onChange={(upd) => { const n = [...config.rungs]; n[idx] = upd; setConfig({ ...config, rungs: n }); }} onDelete={() => { if (config.rungs.length <= 5) return; const f = config.rungs.filter((_, i) => i !== idx).map((r, i) => ({ ...r, rungNumber: i + 1 })); setConfig({ ...config, totalRungs: f.length, rungs: f }); }} />
        ))}
        {config.rungs.length < 25 && (
          <button type="button" onClick={handleAddRung} className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-[#F8F6F0] border-2 border-dashed border-[#2D2A26]/20 rounded-2xl text-xs font-bold shadow-xs cursor-pointer transition-all">
            <Plus className="w-4 h-4 text-[#F59E0B]" /><span>+ Add Higher Rung</span>
          </button>
        )}
      </div>

      <LadderSimulatorModal isOpen={preview} onClose={() => setPreview(false)} config={config} tts={tts} />
      <LadderQualityInspectorModal isOpen={inspector} onClose={() => setInspector(false)} rungs={config.rungs} gradeLevel={gradeLevel} />
      <LadderExportModal isOpen={exportModal} onClose={() => setExportModal(false)} rungs={config.rungs} title={config.title} />
    </div>
  );
};

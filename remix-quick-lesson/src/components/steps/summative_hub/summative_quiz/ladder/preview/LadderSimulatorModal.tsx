import React, { useEffect } from 'react';
import { X, Play } from 'lucide-react';
import { LadderQuizConfig } from '../typesLadder';
import { useTextToSpeech } from '../../../plain_quiz/audio';
import { LadderSimulatorLobby } from './LadderSimulatorLobby';
import { LadderSimulatorRules } from './LadderSimulatorRules';
import { LadderSimulatorQuestion } from './LadderSimulatorQuestion';
import { LadderSimulatorClimb } from './LadderSimulatorClimb';
import { LadderSimulatorCeremony } from './LadderSimulatorCeremony';
import { LadderLifelineInterrupt } from './LadderLifelineInterrupt';
import { useLadderSimulatorState, SimStep } from './useLadderSimulatorState';

interface Props { isOpen: boolean; onClose: () => void; config: LadderQuizConfig; tts: ReturnType<typeof useTextToSpeech>; }

export const LadderSimulatorModal: React.FC<Props> = ({ isOpen, onClose, config, tts }) => {
  const state = useLadderSimulatorState(config, tts);
  const { step, setStep, currentRung, setCurrentRung, score, currentQ, maxScore, activeInterrupt, setActiveInterrupt } = state;

  useEffect(() => {
    if (!isOpen) { tts.stop(); return; }
    if (activeInterrupt === 'question_swap') {
      tts.speak("A question swap has been requested! Swapping this question to a fresh alternative challenge!");
    } else if (step === 'welcome') {
      tts.speak(`Welcome to the Escalation Ladder challenge on ${config.title}! Tap lifelines on your screen to learn how they work.`);
    } else if (step === 'rules') {
      tts.speak("Here are the rules: two safety nets lock in scores at stages 3 and 7. Wrong answers won't drop you lower!");
    } else if (step === 'question' && currentQ) {
      tts.speak(`Question ${currentQ.rungNumber} is: ${currentQ.prompt}. Look at the options on your screens!`);
    } else if (step === 'ceremony') {
      tts.speak(`Superb effort! You scored ${score} points on the Escalation Ladder tower! Give yourselves a massive round of applause!`);
    }
  }, [step, currentRung, isOpen, activeInterrupt]);

  if (!isOpen) return null;

  const handleNavClick = (t: SimStep) => {
    tts.stop(); state.resetStageLifelineFlags(); setStep(t);
    if (t === 'reveal') state.handleSelectAnswer(currentQ.correctChoiceIndex);
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in font-sans">
      <div className="bg-[#181614] text-white rounded-3xl border border-white/20 shadow-2xl max-w-5xl w-full p-6 flex flex-col space-y-4 overflow-y-auto max-h-[92vh]">
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
          <div className="flex items-center gap-2"><Play className="w-4 h-4 text-amber-400" /><span className="text-xs font-bold uppercase tracking-wider text-gray-200">Presentation Loop Simulator</span></div>
          <div className="flex flex-wrap gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
            {(['welcome', 'rules', 'question', 'reveal', 'climb', 'ceremony'] as SimStep[]).map((t) => (
              <button key={t} onClick={() => handleNavClick(t)} className={`px-2 py-0.5 text-[9px] font-bold rounded-lg cursor-pointer transition-colors ${step === t ? 'bg-amber-500 text-slate-950 font-black' : 'text-gray-400 hover:text-white'}`}>{t.toUpperCase()}</button>
            ))}
          </div>
          <button type="button" onClick={() => { tts.stop(); onClose(); }} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer ml-auto"><X className="w-4 h-4" /></button>
        </div>
        <div className="flex-1 flex items-center justify-center min-h-[360px]">
          {activeInterrupt ? <LadderLifelineInterrupt type={activeInterrupt} onComplete={() => setActiveInterrupt(null)} isSpeaking={tts.isSpeaking} /> : (
            <>
              {step === 'welcome' && <LadderSimulatorLobby title={config.title} onStart={() => { state.resetStageLifelineFlags(); setStep('rules'); }} lifelines={config.activeLifelines} />}
              {step === 'rules' && <LadderSimulatorRules lifelines={config.activeLifelines} safetyNets={[3, 7]} onNext={() => { state.resetStageLifelineFlags(); setStep('question'); }} />}
              {step === 'question' && <LadderSimulatorQuestion rung={currentQ} onSelect={state.handleSelectAnswer} selectedAnswer={state.selectedAnswer} revealed={false} lifelines={config.activeLifelines} onTriggerLifeline={state.handleTriggerLifeline} usedLifelines={state.usedLifelines} activeQuestionLifelines={state.activeQuestionLifelines} eliminatedChoices={state.eliminatedChoices} isSpeaking={tts.isSpeaking} simStep={step} maxLifelinesAllowed={config.maxStudentLifelines} pollStatsRevealed={state.pollStatsRevealed} setPollStatsRevealed={state.setPollStatsRevealed} pollGraceTime={state.pollGraceTime} setPollGraceTime={state.setPollGraceTime} peerSelected={state.peerSelected} setPeerSelected={state.setPeerSelected} peerGraceTime={state.peerGraceTime} setPeerGraceTime={state.setPeerGraceTime} peerState={state.peerState} setPeerState={state.setPeerState} />}
              {step === 'reveal' && <LadderSimulatorQuestion rung={currentQ} onSelect={() => {}} selectedAnswer={state.selectedAnswer} revealed={true} lifelines={config.activeLifelines} onTriggerLifeline={() => {}} usedLifelines={state.usedLifelines} activeQuestionLifelines={[]} eliminatedChoices={state.eliminatedChoices} isSpeaking={tts.isSpeaking} simStep={step} maxLifelinesAllowed={config.maxStudentLifelines} pollStatsRevealed={false} setPollStatsRevealed={() => {}} pollGraceTime={10} setPollGraceTime={() => {}} peerSelected={null} setPeerSelected={() => {}} peerGraceTime={15} setPeerGraceTime={() => {}} peerState="none" setPeerState={() => {}} />}
              {step === 'climb' && <LadderSimulatorClimb currentRung={currentRung} totalRungs={config.totalRungs} safetyNets={[3, 7]} score={score} skin={config.skin} onNext={() => { setCurrentRung((r) => r + 1); state.resetStageLifelineFlags(); setStep('question'); }} />}
              {step === 'ceremony' && <LadderSimulatorCeremony score={score} maxScore={maxScore} onRestart={state.handleRestart} success={score === maxScore} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default LadderSimulatorModal;

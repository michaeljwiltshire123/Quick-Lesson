import React, { useState } from 'react';
import { ArrowLeft, MessageSquareText } from 'lucide-react';
import { EchoPromptModeToggle } from './EchoPromptModeToggle';
import { EchoPromptGhostList } from './EchoPromptGhostList';
import { EchoPromptCustomInput } from './EchoPromptCustomInput';
import { EchoPromptTargetSelector } from './EchoPromptTargetSelector';

interface Props {
  energyPoints: number;
  cost: number;
  onSendDecoy: (decoyPrompt: string, category: string, targets: string[]) => void;
  onBack: () => void;
}

const CATEGORIES = ['Key Detail', 'Real Life', 'Comparison', 'Action'];
const FALLBACK_GHOSTS: Record<string, string[]> = {
  'Key Detail': ['Identify the gas required for complete glucose breakdown.'],
  'Real Life': ['Why does a sprinter experience muscle fatigue after a 100m race?'],
  Comparison: ['Compare the energy yield of aerobic versus anaerobic respiration.'],
  Action: ['Name the sequence of muscular contractions during breathing.'],
};

const MOCK_ACTIVE_PUPILS = ['Oliver 🦉', 'Harry 🦁', 'Isla 🐼', 'George 🐻', 'Ava 🐨'];

export const EchoPromptWriterView: React.FC<Props> = ({ energyPoints, cost, onSendDecoy, onBack }) => {
  const [category, setCategory] = useState('Key Detail');
  const [inputMode, setInputMode] = useState<'bank' | 'custom'>('bank');

  // Prioritise real pupil ghost-written decoys over generic fallbacks
  const pupilDecoys: string[] = (() => {
    try {
      const raw = sessionStorage.getItem('imposter_pupil_ghost_decoys');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  })();

  const availableQuestions = pupilDecoys.length > 0 ? pupilDecoys : (FALLBACK_GHOSTS[category] || []);
  const [selectedGhost, setSelectedGhost] = useState(availableQuestions[0] || '');
  const [customText, setCustomText] = useState('');
  const [selectedTargets, setSelectedTargets] = useState<string[]>(['Oliver 🦉']);
  const [step, setStep] = useState<'question' | 'target'>('question');

  const activeQuestion = inputMode === 'custom' ? customText.trim() : (selectedGhost || availableQuestions[0] || '');
  const canAfford = energyPoints >= cost;

  const toggleTarget = (target: string) => {
    if (selectedTargets.includes(target)) setSelectedTargets(selectedTargets.filter((t) => t !== target));
    else if (selectedTargets.length < 2) setSelectedTargets([...selectedTargets, target]);
  };

  return (
    <div className="space-y-2 text-white flex-1 flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
        <button type="button" onClick={step === 'target' ? () => setStep('question') : onBack} className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-white cursor-pointer">
          <ArrowLeft className="w-3 h-3" /> {step === 'target' ? 'Back to Question' : 'Back'}
        </button>
        <span className="text-[11px] font-black uppercase text-amber-300 flex items-center gap-1">
          <MessageSquareText className="w-3 h-3 text-indigo-400" /> Echo Prompt ({cost} pts)
        </span>
      </div>

      {step === 'question' ? (
        <div className="space-y-2 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex gap-1 overflow-x-auto pb-0.5">
              {CATEGORIES.map((cat) => (
                <button key={cat} type="button" onClick={() => { setCategory(cat); setSelectedGhost((FALLBACK_GHOSTS[cat] || [])[0] || ''); }} className={`px-2 py-0.5 rounded-lg text-[9px] font-bold whitespace-nowrap cursor-pointer transition-all ${category === cat ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-900 text-white/60 hover:text-white'}`}>
                  {cat}
                </button>
              ))}
            </div>

            <EchoPromptModeToggle mode={inputMode} onSelectMode={setInputMode} bankCount={availableQuestions.length} />

            {inputMode === 'bank' ? (
              <EchoPromptGhostList questions={availableQuestions} selectedQuestion={selectedGhost || availableQuestions[0] || ''} onSelectQuestion={setSelectedGhost} category={category} />
            ) : (
              <EchoPromptCustomInput value={customText} onChange={setCustomText} topicCategory={category} />
            )}
          </div>

          <button type="button" disabled={!activeQuestion || !canAfford} onClick={() => setStep('target')} className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md transition-all mt-1">
            Next: Choose 1 or 2 Victims →
          </button>
        </div>
      ) : (
        <EchoPromptTargetSelector activePupils={MOCK_ACTIVE_PUPILS} selectedTargets={selectedTargets} onToggleTarget={toggleTarget} onConfirmSend={() => onSendDecoy(activeQuestion, category, selectedTargets)} canSend={canAfford && selectedTargets.length > 0} cost={cost} />
      )}
    </div>
  );
};

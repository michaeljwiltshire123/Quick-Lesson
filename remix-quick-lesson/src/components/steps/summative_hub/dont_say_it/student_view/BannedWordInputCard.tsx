import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, UserCheck } from 'lucide-react';
import { BannedWordFormSection } from './BannedWordFormSection';

interface Props {
  targetWord: string;
  maxWords?: number;
  onSubmitBannedWords: (words: string[]) => void;
  isLocked?: boolean;
}

export const BannedWordInputCard: React.FC<Props> = ({
  targetWord,
  maxWords = 2,
  onSubmitBannedWords,
  isLocked = false,
}) => {
  const [currentInput, setCurrentInput] = useState('');
  const [bannedList, setBannedList] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = currentInput.trim();
    if (!clean || bannedList.length >= maxWords || bannedList.includes(clean)) return;
    setBannedList([...bannedList, clean]);
    setCurrentInput('');
  };

  const handleFinalSubmit = () => {
    if (bannedList.length === 0) return;
    setSubmitted(true);
    onSubmitBannedWords(bannedList);
  };

  return (
    <div className="bg-white p-5 rounded-3xl border border-[#2D2A26]/15 shadow-md space-y-4">
      <div className="flex items-center justify-between border-b border-black/10 pb-2.5">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          <h4 className="text-xs font-black uppercase tracking-wider text-[#2D2A26]">
            Opposing Sabotage: Set Forbidden Words
          </h4>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-200">
          {bannedList.length}/{maxWords} Words
        </span>
      </div>

      <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-0.5">
        <div className="text-[10px] uppercase font-bold text-amber-800 flex items-center justify-center gap-1">
          <UserCheck className="w-3.5 h-3.5 text-amber-700" /> Target Word to Sabotage
        </div>
        <div className="text-2xl font-black text-[#2D2A26] font-mono uppercase">{targetWord}</div>
        <div className="text-[10px] font-medium text-amber-900">
          Type {maxWords} words the clue givers must NOT say!
        </div>
      </div>

      {!submitted && !isLocked ? (
        <BannedWordFormSection
          currentInput={currentInput}
          bannedList={bannedList}
          maxWords={maxWords}
          onInputChange={setCurrentInput}
          onAddWord={handleAddWord}
          onRemoveWord={(idx) => setBannedList(bannedList.filter((_, i) => i !== idx))}
          onSubmit={handleFinalSubmit}
        />
      ) : (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-emerald-950">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-xs font-bold">Your forbidden words are locked in & sent to the match projector!</div>
        </div>
      )}
    </div>
  );
};

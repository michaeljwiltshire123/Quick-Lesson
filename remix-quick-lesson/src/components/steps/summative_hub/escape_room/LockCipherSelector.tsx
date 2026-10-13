import React from 'react';
import { Type, Palette, Sparkles, Route, AlertCircle } from 'lucide-react';
import { CipherType } from './typesEscape';

interface Props {
  cipherType: CipherType;
  onChangeCipher: (type: CipherType) => void;
  solutionCode: string;
  onChangeSolution: (code: string) => void;
}

const CIPHER_CONFIGS: { type: CipherType; label: string; icon: React.ComponentType<{ className?: string }>; hint: string }[] = [
  { type: 'word_cipher', label: 'Word Cipher', icon: Type, hint: 'e.g. PROTAGONIST or METAPHOR' },
  { type: 'color_keycard', label: 'Colour Keycard', icon: Palette, hint: 'e.g. EMERALD-AMBER-SAPPHIRE' },
  { type: 'icon_sequence', label: 'Icon Sequence', icon: Sparkles, hint: 'e.g. SHIELD-KEY-FLAME' },
  { type: 'concept_pathway', label: 'Concept Pathway', icon: Route, hint: 'e.g. HOOK-CLIMAX-RESOLUTION' },
];

export const LockCipherSelector: React.FC<Props> = ({
  cipherType, onChangeCipher, solutionCode, onChangeSolution,
}) => {
  const currentConfig = CIPHER_CONFIGS.find((c) => c.type === cipherType) || CIPHER_CONFIGS[0];
  const hasNumericViolation = /[0-9]/.test(solutionCode);

  const handleSolutionChange = (raw: string) => {
    // Strictly strip or warn on numbers
    const clean = raw.toUpperCase().replace(/[0-9]/g, '');
    onChangeSolution(clean);
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-[#2D2A26]/70 block mb-1.5">
          Non-Numeric Cipher Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CIPHER_CONFIGS.map((c) => {
            const Icon = c.icon;
            const isSelected = c.type === cipherType;
            return (
              <button
                key={c.type}
                type="button"
                onClick={() => onChangeCipher(c.type)}
                className={`flex items-center gap-1.5 p-2 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                    : 'bg-white text-[#2D2A26] border-[#2D2A26]/15 hover:bg-[#F8F6F0]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-[#D97706]'}`} />
                <span className="truncate">{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#2D2A26]/70">
            Solution Key (No Numbers Permitted)
          </label>
          <span className="text-[10px] text-[#2D2A26]/50">{currentConfig.hint}</span>
        </div>
        <input
          type="text"
          value={solutionCode}
          onChange={(e) => handleSolutionChange(e.target.value)}
          placeholder={currentConfig.hint}
          className="w-full px-3 py-2 text-xs font-mono font-bold uppercase rounded-xl border border-[#2D2A26]/20 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {hasNumericViolation && (
          <p className="flex items-center gap-1 text-[10px] text-red-600 font-semibold mt-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>Math and numeric codes are strictly forbidden. Digits have been converted.</span>
          </p>
        )}
      </div>
    </div>
  );
};

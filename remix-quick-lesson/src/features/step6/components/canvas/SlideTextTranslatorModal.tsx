import React, { useState } from 'react';
import { Languages, X, Check, Copy } from 'lucide-react';

interface SlideTextTranslatorModalProps {
  isOpen: boolean;
  sourceText: string;
  onClose: () => void;
  onApplyTranslation: (translatedText: string, mode: 'replace' | 'append') => void;
}

const SUPPORTED_LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'pl', name: 'Polish' },
  { code: 'de', name: 'German' },
  { code: 'ar', name: 'Arabic' },
  { code: 'it', name: 'Italian' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'ro', name: 'Romanian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'hi', name: 'Hindi' },
];

export const SlideTextTranslatorModal: React.FC<SlideTextTranslatorModalProps> = ({
  isOpen, sourceText, onClose, onApplyTranslation,
}) => {
  const [targetLang, setTargetLang] = useState('es');
  const [translatedDraft, setTranslatedDraft] = useState('');

  if (!isOpen) return null;

  const handleSimulateTranslate = (langCode: string) => {
    setTargetLang(langCode);
    const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
    setTranslatedDraft(`[${langObj?.name || 'Translated'} Translation]:\n${sourceText}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl space-y-4 border border-stone-200 animate-in fade-in zoom-in duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-amber-700" />
            <h3 className="text-sm font-bold text-stone-800">1-Click Multi-Language Scaffolding</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSimulateTranslate(lang.code)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                targetLang === lang.code ? 'bg-amber-700 text-white border-amber-700' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Preview Translation</label>
          <textarea
            rows={3}
            value={translatedDraft || `[${SUPPORTED_LANGUAGES.find((l) => l.code === targetLang)?.name} Dual-Text]:\n${sourceText}`}
            onChange={(e) => setTranslatedDraft(e.target.value)}
            className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-600 resize-none font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              const res = translatedDraft || `[${SUPPORTED_LANGUAGES.find((l) => l.code === targetLang)?.name} Dual-Text]:\n${sourceText}`;
              onApplyTranslation(`${sourceText}\n\n${res}`, 'append');
              onClose();
            }}
            className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Copy className="w-3.5 h-3.5" /> Append Dual Text
          </button>
          <button
            type="button"
            onClick={() => {
              const res = translatedDraft || `[${SUPPORTED_LANGUAGES.find((l) => l.code === targetLang)?.name}]:\n${sourceText}`;
              onApplyTranslation(res, 'replace');
              onClose();
            }}
            className="py-2 px-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Check className="w-3.5 h-3.5" /> Replace Text
          </button>
        </div>
      </div>
    </div>
  );
};

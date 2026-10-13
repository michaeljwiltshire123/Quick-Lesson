import React, { useState } from 'react';
import { SlideItem } from '../../types/slideTypes';
import { Languages, Check, Loader2 } from 'lucide-react';
import { translateFullDeckToTargetLanguage } from './deckTranslationHelper';

interface DeckTranslatorControlProps {
  slides: SlideItem[];
  onUpdateAllSlides: (newSlides: SlideItem[]) => void;
}

const SUPPORTED_LANGUAGES = [
  { code: 'es', label: 'Spanish (Español)' },
  { code: 'fr', label: 'French (Français)' },
  { code: 'pl', label: 'Polish (Polski)' },
  { code: 'de', label: 'German (Deutsch)' },
  { code: 'ur', label: 'Urdu (اردو)' },
  { code: 'ar', label: 'Arabic (العربية)' },
  { code: 'zh', label: 'Mandarin (中文)' },
  { code: 'cy', label: 'Welsh (Cymraeg)' },
];

export const DeckTranslatorControl: React.FC<DeckTranslatorControlProps> = ({
  slides, onUpdateAllSlides,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleTranslateDeck = async () => {
    setIsTranslating(true);
    await new Promise((r) => setTimeout(r, 400));
    const translated = translateFullDeckToTargetLanguage(slides, selectedLang);
    onUpdateAllSlides(translated);
    setIsTranslating(false);
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setIsOpen(false); }, 1200);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
        title="Translate entire slide deck into another language"
      >
        <Languages className="w-3.5 h-3.5 text-amber-700" />
        <span>Translate Deck</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-64 p-3 bg-white rounded-2xl shadow-xl border border-stone-200 z-50 space-y-2.5 animate-in fade-in">
          <div className="flex items-center justify-between pb-1 border-b border-stone-100">
            <span className="text-xs font-bold text-stone-800">Whole-Deck Scaffolding</span>
            <span className="text-[10px] text-stone-400">{slides.length} slides</span>
          </div>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="w-full text-xs font-semibold bg-stone-50 border border-stone-300 rounded-lg p-1.5 focus:outline-none focus:border-amber-600"
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
          <button
            type="button"
            disabled={isTranslating}
            onClick={handleTranslateDeck}
            className="w-full py-1.5 px-2 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isTranslating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : success ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : null}
            <span>{success ? 'Deck Translated!' : isTranslating ? 'Translating...' : 'Translate All Slides & Notes'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

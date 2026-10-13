import React, { useState } from 'react';
import { Languages, Globe } from 'lucide-react';

interface EalTranslationHelperProps {
  terms: string[];
}

const COMMON_LANGUAGES = [
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'pl', label: 'Polish' },
  { code: 'de', label: 'German' },
  { code: 'ar', label: 'Arabic' },
  { code: 'it', label: 'Italian' },
];

const SIMPLE_SAMPLE_GLOSSARY: Record<string, Record<string, string>> = {
  photosynthesis: { es: 'fotosíntesis', fr: 'photosynthèse', pl: 'fotosynteza', de: 'Photosynthese', ar: 'التركيب الضوئي', it: 'fotosintesi' },
  velocity: { es: 'velocidad', fr: 'vélocité', pl: 'prędkość', de: 'Geschwindigkeit', ar: 'سرعة', it: 'velocità' },
  fraction: { es: 'fracción', fr: 'fraction', pl: 'ułamek', de: 'Bruch', ar: 'كسر', it: 'frazione' },
  metaphor: { es: 'metáfora', fr: 'métaphore', pl: 'metafora', de: 'Metapher', ar: 'استعارة', it: 'metafora' },
  algorithm: { es: 'algoritmo', fr: 'algorithme', pl: 'algorytm', de: 'Algorithmus', ar: 'خوارزمية', it: 'algoritmo' },
};

export const EalTranslationHelper: React.FC<EalTranslationHelperProps> = ({ terms }) => {
  const [selectedLang, setSelectedLang] = useState('es');

  const filteredTerms = terms.filter(Boolean);
  if (filteredTerms.length === 0) return null;

  return (
    <div className="space-y-2.5 p-3.5 bg-sky-50/60 border border-sky-200 rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-sky-950">
          <Languages className="w-4 h-4 text-sky-700" />
          <span>EAL / Multilingual Classroom Gloss</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-sky-700 font-semibold">
          <Globe className="w-3 h-3" /> Quick Dual-Language
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {COMMON_LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setSelectedLang(lang.code)}
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${
              selectedLang === lang.code ? 'bg-sky-700 text-white border-sky-700' : 'bg-white text-sky-900 border-sky-200 hover:bg-sky-100'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {filteredTerms.slice(0, 6).map((term, i) => {
          const cleanKey = term.toLowerCase().trim();
          const translated = SIMPLE_SAMPLE_GLOSSARY[cleanKey]?.[selectedLang] || `[${term} in ${selectedLang.toUpperCase()}]`;
          return (
            <div key={i} className="bg-white px-2 py-1 rounded-lg border border-sky-100 text-[11px] flex items-center justify-between">
              <span className="font-semibold text-stone-800">{term}</span>
              <span className="text-sky-800 font-bold italic">{translated}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

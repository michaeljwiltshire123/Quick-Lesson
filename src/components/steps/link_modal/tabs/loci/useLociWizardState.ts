import { useState, useEffect } from 'react';
import { LociWizardStep, LociAssociationOption, LociScriptOutput } from './types';
import { autoSaveRouteToLibrary } from './lociVaultStorage';

export const useLociWizardState = (
  chunkId?: string,
  subject?: string,
  onStepChange?: (step: LociWizardStep) => void,
) => {
  const storageKey = `loci_draft_${chunkId || 'default'}`;

  const [step, setStep] = useState<LociWizardStep>(() => {
    try {
      return (sessionStorage.getItem(storageKey + '_step') as LociWizardStep) || 'words';
    } catch { return 'words'; }
  });
  const [terms, setTerms] = useState<string[]>(() => {
    try {
      const saved = sessionStorage.getItem(storageKey + '_terms');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [associations, setAssociations] = useState<LociAssociationOption[]>(() => {
    try {
      const saved = sessionStorage.getItem(storageKey + '_associations');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [routeName, setRouteName] = useState(() => {
    try {
      return sessionStorage.getItem(storageKey + '_route') || '';
    } catch { return ''; }
  });
  const [stationSuggestions, setStationSuggestions] = useState<string[]>(() => {
    try {
      const saved = sessionStorage.getItem(storageKey + '_stations');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [scriptData, setScriptData] = useState<LociScriptOutput | null>(() => {
    try {
      const saved = sessionStorage.getItem(storageKey + '_script');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [isLoadingScript, setIsLoadingScript] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey + '_step', step);
      sessionStorage.setItem(storageKey + '_terms', JSON.stringify(terms));
      sessionStorage.setItem(storageKey + '_associations', JSON.stringify(associations));
      sessionStorage.setItem(storageKey + '_route', routeName);
      sessionStorage.setItem(storageKey + '_stations', JSON.stringify(stationSuggestions));
      if (scriptData) sessionStorage.setItem(storageKey + '_script', JSON.stringify(scriptData));
    } catch {}
    onStepChange?.(step);
  }, [step, terms, associations, routeName, stationSuggestions, scriptData, storageKey, onStepChange]);

  const handleMapperNext = async () => {
    setStep('script');
    setIsLoadingScript(true);
    const validStations = associations.map((a) => a.station.trim()).filter(Boolean);
    if (routeName.trim() && validStations.length > 0) {
      autoSaveRouteToLibrary(routeName.trim(), validStations);
    }
    const items = associations.map((a) => ({
      term: a.term,
      station: a.station,
      association: a.customText || a.selected || a.term,
    }));
    try {
      const res = await fetch('/api/generate-loci-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, routeName, subject }),
      });
      const data = await res.json();
      setScriptData(data);
    } catch {} finally { setIsLoadingScript(false); }
  };

  return {
    step, setStep, terms, setTerms, associations, setAssociations,
    routeName, setRouteName, stationSuggestions, setStationSuggestions,
    scriptData, isLoadingScript, handleMapperNext,
  };
};

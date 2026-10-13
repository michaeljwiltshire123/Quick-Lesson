import { useState, useEffect, useRef } from 'react';
import { speakPresenterNarration, cancelPresenterNarration } from '../preview/imposterPresenterVoice';
import { ImposterVoiceConfig } from './ImposterVoiceSettingsCard';

export function useImposterVoiceLoader(config: ImposterVoiceConfig) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isPlayingSample, setIsPlayingSample] = useState(false);
  
  // Use a ref so handleToggleSample always accesses the latest live speed & voice values
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices();
      const ukOrEn = all.filter((v) => v.lang.startsWith('en'));
      setVoices(ukOrEn.length > 0 ? ukOrEn : all);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const handleToggleSample = () => {
    if (isPlayingSample) {
      cancelPresenterNarration();
      setIsPlayingSample(false);
    } else {
      setIsPlayingSample(true);
      const currentConfig = configRef.current;
      speakPresenterNarration(
        "Welcome to Classroom Imposter! Compare your classmate's answers and spot the bluff.",
        false,
        currentConfig.voiceURI,
        currentConfig.speed,
        () => setIsPlayingSample(false)
      );
    }
  };

  return { voices, isPlayingSample, handleToggleSample };
}

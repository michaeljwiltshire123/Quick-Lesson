import { useState, useEffect, useCallback, useRef } from 'react';

export interface TTSConfig {
  voiceURI: string;
  rate: number;
  pitch: number;
  autoRead: boolean;
}

export const DEFAULT_TTS_CONFIG: TTSConfig = {
  voiceURI: 'default-uk',
  rate: 1.0,
  pitch: 1.0,
  autoRead: false,
};

let activeUtterance: SpeechSynthesisUtterance | null = null;

export function useTextToSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [config, setConfig] = useState<TTSConfig>(DEFAULT_TTS_CONFIG);
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const updateVoices = () => {
      const all = window.speechSynthesis.getVoices();
      const ukOrEn = all.filter((v) => v.lang.startsWith('en'));
      setVoices(ukOrEn.length > 0 ? ukOrEn : all);
    };
    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const speak = useCallback((text: string, onComplete?: () => void) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance;
    utterance.rate = configRef.current.rate;
    utterance.pitch = configRef.current.pitch;

    const currentVoices = window.speechSynthesis.getVoices();
    if (configRef.current.voiceURI && configRef.current.voiceURI !== 'default-uk') {
      const selected = currentVoices.find((v) => v.voiceURI === configRef.current.voiceURI);
      if (selected) utterance.voice = selected;
    } else {
      const ukVoice = currentVoices.find((v) => v.lang === 'en-GB' || v.lang === 'en_GB') ||
                      currentVoices.find((v) => v.lang.startsWith('en'));
      if (ukVoice) utterance.voice = ukVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      activeUtterance = null;
      onComplete?.();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      activeUtterance = null;
    };

    setTimeout(() => {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);
    }, 10);
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      activeUtterance = null;
      setIsSpeaking(false);
    }
  }, []);

  return { voices, isSpeaking, config, setConfig, speak, stop };
}

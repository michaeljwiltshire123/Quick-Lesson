import { TTSVoicePreset } from '../types/competitiveQuizTypes';

export const DEFAULT_VOICE_PRESET: TTSVoicePreset = {
  voiceURI: 'default-uk-presenter',
  name: 'British Quiz Presenter',
  lang: 'en-GB',
  pitch: 1.05,
  rate: 1.02,
  volume: 1.0,
  gender: 'female',
};

export const isSpeechSynthesisSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if (!isSpeechSynthesisSupported()) return [];
  return window.speechSynthesis.getVoices();
};

export const cancelSpeech = (): void => {
  if (!isSpeechSynthesisSupported()) return;
  window.speechSynthesis.cancel();
};

export const speakPrompt = (
  text: string,
  preset: TTSVoicePreset = DEFAULT_VOICE_PRESET,
  onEnd?: () => void
): void => {
  if (!isSpeechSynthesisSupported()) {
    onEnd?.();
    return;
  }

  cancelSpeech();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = Math.max(0.5, Math.min(2.0, preset.pitch));
  utterance.rate = Math.max(0.5, Math.min(2.0, preset.rate));
  utterance.volume = Math.max(0, Math.min(1.0, preset.volume));

  const voices = getAvailableVoices();
  const matchedVoice =
    voices.find((v) => v.voiceURI === preset.voiceURI) ||
    voices.find((v) => v.lang.startsWith('en-GB')) ||
    voices.find((v) => v.lang.startsWith('en')) ||
    voices[0];

  if (matchedVoice) {
    utterance.voice = matchedVoice;
    utterance.lang = matchedVoice.lang;
  }

  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();

  window.speechSynthesis.speak(utterance);
};

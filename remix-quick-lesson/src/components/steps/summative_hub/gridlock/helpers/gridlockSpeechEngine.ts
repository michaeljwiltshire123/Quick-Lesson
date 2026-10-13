import { TTSVoicePreset } from '../../competitive_quiz/types/competitiveQuizTypes';
import {
  speakPrompt as compSpeakPrompt,
  cancelSpeech,
  getAvailableVoices,
  isSpeechSynthesisSupported,
} from '../../competitive_quiz/services/ttsPresenterService';

export interface GridlockVoiceConfig extends TTSVoicePreset {
  autoRead: boolean;
}

export const DEFAULT_GRIDLOCK_VOICE: GridlockVoiceConfig = {
  voiceURI: 'default-uk-presenter',
  name: 'British Quiz Presenter',
  lang: 'en-GB',
  pitch: 1.05,
  rate: 1.02,
  volume: 1.0,
  gender: 'female',
  autoRead: true,
};

export { getAvailableVoices, isSpeechSynthesisSupported, cancelSpeech };

export function speakCurriculumPrompt(
  text: string,
  config: GridlockVoiceConfig = DEFAULT_GRIDLOCK_VOICE,
  onEnd?: () => void
): void {
  compSpeakPrompt(text, config, onEnd);
}

export function speakWrongAnswer(
  targetAnswer: string,
  config: GridlockVoiceConfig = DEFAULT_GRIDLOCK_VOICE,
  onEnd?: () => void
): void {
  compSpeakPrompt(`Wrong! The correct answer was ${targetAnswer}.`, config, onEnd);
}

export function stopSpeaking(): void {
  cancelSpeech();
}

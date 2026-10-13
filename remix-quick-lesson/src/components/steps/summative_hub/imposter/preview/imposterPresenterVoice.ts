// 100% Free browser-native SpeechSynthesis Presenter commentary engine
// No network API keys, zero memory bloat, strictly under 100 lines.

import { BoardPhase } from './ProjectorHeaderNav';

export const PRESENTER_PHASE_SCRIPTS: Record<BoardPhase, string> = {
  task: 'Secret Knowledge Task started. Check your individual screens and keep your devices hidden!',
  discussion: 'Class discussion phase! Look at the front board and compare everyone\'s answers. Who missed the specific question?',
  voting: 'Accusation time! Cast your vote on your device for who you believe gave the bluffed answer.',
  elimination: 'The votes are in! Let us reveal who was voted out, and who the Imposter targeted!',
};

let activeUtterance: SpeechSynthesisUtterance | null = null;

export const speakPresenterNarration = (
  text: string,
  isMuted: boolean = false,
  voiceURI?: string,
  speed: number = 1.0,
  onComplete?: () => void
) => {
  if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window) || !text) return;
  
  try {
    window.speechSynthesis.cancel();
    
    // Ensure clean non-zero rate between 0.5 and 2.0
    const rawRate = Number(speed);
    const validRate = !isNaN(rawRate) && rawRate > 0 ? rawRate : 1.0;

    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance;
    utterance.rate = validRate;
    utterance.pitch = 1.0;

    const currentVoices = window.speechSynthesis.getVoices();
    if (voiceURI && voiceURI !== 'default-uk') {
      const matched = currentVoices.find((v) => v.voiceURI === voiceURI);
      if (matched) utterance.voice = matched;
    } else {
      const ukVoice = currentVoices.find((v) => v.lang === 'en-GB' || v.lang === 'en_GB') ||
                      currentVoices.find((v) => v.lang.startsWith('en'));
      if (ukVoice) utterance.voice = ukVoice;
    }

    utterance.onend = () => {
      activeUtterance = null;
      onComplete?.();
    };
    utterance.onerror = () => {
      activeUtterance = null;
      onComplete?.();
    };

    // Chromium/Safari reliable dispatch
    setTimeout(() => {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);
    }, 15);
  } catch (e) {
    activeUtterance = null;
  }
};

export const cancelPresenterNarration = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
};

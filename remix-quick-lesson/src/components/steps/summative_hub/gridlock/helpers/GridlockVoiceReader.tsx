import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakCurriculumPrompt, stopSpeaking, GridlockVoiceConfig, DEFAULT_GRIDLOCK_VOICE } from './gridlockSpeechEngine';

interface Props {
  textToRead: string;
  label?: string;
  size?: 'sm' | 'md';
  voiceConfig?: GridlockVoiceConfig;
}

export const GridlockVoiceReader: React.FC<Props> = ({
  textToRead,
  label = 'Read Clue',
  size = 'sm',
  voiceConfig = DEFAULT_GRIDLOCK_VOICE,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  const handleToggleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    speakCurriculumPrompt(textToRead, voiceConfig, () => setIsSpeaking(false));
  };

  const isSmall = size === 'sm';

  return (
    <button
      type="button"
      onClick={handleToggleSpeak}
      className={`rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
        isSmall ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5 text-xs'
      } ${
        isSpeaking
          ? 'bg-amber-500 text-white border-amber-600 shadow-xs animate-pulse'
          : 'bg-white/10 text-amber-400 border-white/15 hover:bg-white/20'
      }`}
      title="Read question clue aloud"
    >
      {isSpeaking ? <VolumeX className={isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} /> : <Volume2 className={isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      {label && <span>{isSpeaking ? 'Mute' : label}</span>}
    </button>
  );
};

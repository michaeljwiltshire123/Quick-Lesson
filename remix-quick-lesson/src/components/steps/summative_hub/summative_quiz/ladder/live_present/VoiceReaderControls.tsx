import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface Props {
  textToRead: string;
  onSpeechStart?: () => void;
  onSpeechComplete?: () => void;
}

export const VoiceReaderControls: React.FC<Props> = ({
  textToRead, onSpeechStart, onSpeechComplete,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      onSpeechComplete?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9;
    utterance.onstart = () => {
      setIsSpeaking(true);
      onSpeechStart?.();
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      onSpeechComplete?.();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      onSpeechComplete?.();
    };
    
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
        isSpeaking
          ? 'bg-amber-500 text-white border-amber-600 shadow-sm animate-pulse'
          : 'bg-[#F8F6F0] text-[#2D2A26] border-[#2D2A26]/15 hover:bg-white'
      }`}
      title="Read question out loud for class"
    >
      {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#D97706]" />}
      <span>{isSpeaking ? 'Stop Reading' : 'Voice Reader'}</span>
    </button>
  );
};

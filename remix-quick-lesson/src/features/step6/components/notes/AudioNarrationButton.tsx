import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

interface AudioNarrationButtonProps {
  scriptText: string;
}

export const AudioNarrationButton: React.FC<AudioNarrationButtonProps> = ({ scriptText }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  const handleToggleSpeech = () => {
    if (!isSupported || !scriptText.trim()) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(scriptText);
    utterance.lang = 'en-GB';
    utterance.rate = 0.95; // Clear teacher pacing

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={handleToggleSpeech}
      disabled={!scriptText.trim()}
      className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
        isPlaying
          ? 'bg-amber-700 text-white animate-pulse'
          : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
      }`}
      title={isPlaying ? 'Stop voiceover' : 'Listen to spoken teacher script (Browser Voice)'}
    >
      {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-700" />}
      <span>{isPlaying ? 'Stop Voice' : 'Listen to Script'}</span>
    </button>
  );
};

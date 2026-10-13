import React, { useRef, useState } from 'react';

interface Props { onCaption: (text: string) => void }
type SpeechRecognition = { lang: string; continuous: boolean; onresult: ((event: any) => void) | null; onerror: (() => void) | null; start: () => void; stop: () => void };

export const LiveTranslationService: React.FC<Props> = ({ onCaption }) => {
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState('');
  const recognition = useRef<SpeechRecognition | null>(null);
  const toggle = () => {
    if (enabled) { recognition.current?.stop(); recognition.current = null; setEnabled(false); return; }
    const api = (window as Window & { SpeechRecognition?: new () => SpeechRecognition; webkitSpeechRecognition?: new () => SpeechRecognition });
    const Engine = api.SpeechRecognition || api.webkitSpeechRecognition;
    if (!Engine) { setError('Live captions are not supported by this browser.'); return; }
    const instance = new Engine();
    instance.lang = navigator.language;
    instance.continuous = true;
    instance.onresult = (event) => onCaption(event.results[event.results.length - 1][0].transcript);
    instance.onerror = () => setError('Microphone or speech recognition failed.');
    instance.start();
    recognition.current = instance;
    setEnabled(true);
  };
  return <section className="rounded-xl border border-[#2D2A26]/15 bg-white p-3"><button onClick={toggle} className="rounded-lg bg-[#B85C38] px-3 py-2 text-white">{enabled ? 'Stop teacher captions' : 'Start teacher captions'}</button><p className="mt-2 text-xs text-[#2D2A26]/70">{error || 'Teacher microphone only. Speech is captioned in the recognised language; translation needs a configured provider.'}</p></section>;
};

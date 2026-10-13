import { useEffect, useState } from 'react';
import { globalAudio } from '../services/globalAudioManager';

export function useMicrophoneGuard(isActiveLiveApplauseMeter: boolean) {
  const [isConnected, setConnected] = useState(globalAudio.isConnected);
  const [isBlocked, setBlocked] = useState(globalAudio.isBlocked);

  useEffect(() => {
    if (!isActiveLiveApplauseMeter) {
      globalAudio.shutdown();
      setConnected(false);
      setBlocked(false);
      return;
    }
    const unsubscribe = globalAudio.subscribeStatus((connected, blocked) => {
      setConnected(connected);
      setBlocked(blocked);
    });
    void globalAudio.initialize();
    return () => {
      unsubscribe();
      globalAudio.shutdown();
    };
  }, [isActiveLiveApplauseMeter]);

  return { isConnected, isBlocked };
}

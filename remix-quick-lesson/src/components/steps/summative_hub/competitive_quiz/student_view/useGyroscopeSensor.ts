import { useState, useEffect, useCallback, useRef } from 'react';

export interface GyroscopeSensorState {
  beta: number;
  gamma: number;
  isFlippedUpsideDown: boolean;
  hasSensorSupport: boolean;
  simulateFlipToggle: () => void;
}

export const useGyroscopeSensor = (
  onFlipAttempt?: (isUpsideDown: boolean) => void
): GyroscopeSensorState => {
  const [beta, setBeta] = useState(0);
  const [gamma, setGamma] = useState(0);
  const [isSimulatedFlipped, setIsSimulatedFlipped] = useState(false);
  const [isSensorFlipped, setIsSensorFlipped] = useState(false);
  const [hasSensorSupport, setHasSensorSupport] = useState(false);
  const onFlipRef = useRef(onFlipAttempt);
  onFlipRef.current = onFlipAttempt;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.DeviceOrientationEvent) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const b = e.beta ?? 0;
      const g = e.gamma ?? 0;
      setBeta(b);
      setGamma(g);
      if (e.beta !== null && e.beta !== 0) setHasSensorSupport(true);

      const flipped = b < -40 || b > 140;
      setIsSensorFlipped((prev) => {
        if (prev !== flipped) onFlipRef.current?.(flipped);
        return flipped;
      });
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  const simulateFlipToggle = useCallback(() => {
    setIsSimulatedFlipped((prev) => {
      const next = !prev;
      onFlipRef.current?.(next);
      return next;
    });
  }, []);

  const isFlippedUpsideDown = isSimulatedFlipped || isSensorFlipped;

  return { beta, gamma, isFlippedUpsideDown, hasSensorSupport, simulateFlipToggle };
};

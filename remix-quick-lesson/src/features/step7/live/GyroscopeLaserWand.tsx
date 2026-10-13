import React, { useEffect, useState } from 'react';

export const GyroscopeLaserWand: React.FC<{ onPoint: (x: number, y: number) => void }> = ({ onPoint }) => {
  const [active, setActive] = useState(false);
  const [error, setError] = useState('');
  const start = async () => {
    try {
      const sensor = DeviceOrientationEvent as typeof DeviceOrientationEvent & { requestPermission?: () => Promise<string> };
      if (sensor.requestPermission && await sensor.requestPermission() !== 'granted') {
        setError('Motion access was not granted.'); return;
      }
      setError('');
      setActive(true);
    } catch {
      setError('Motion access could not be enabled.');
    }
  };
  useEffect(() => {
    if (!active) return;
    const move = (event: DeviceOrientationEvent) => {
      onPoint(Math.max(0, Math.min(100, 50 + (event.gamma || 0))), Math.max(0, Math.min(100, 50 + (event.beta || 0) - 45)));
    };
    window.addEventListener('deviceorientation', move);
    return () => window.removeEventListener('deviceorientation', move);
  }, [active, onPoint]);
  return <div><button onPointerDown={() => void start()} onPointerUp={() => setActive(false)} onPointerCancel={() => setActive(false)}
    className="rounded bg-red-700 px-4 py-3 text-white">Hold laser</button>{error && <p>{error}</p>}</div>;
};

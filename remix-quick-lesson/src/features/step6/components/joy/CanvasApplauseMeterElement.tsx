import React, { useEffect, useRef, useState } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { GoogleSlidesBoundingBox } from '../canvas/GoogleSlidesBoundingBox';
import { ResizeDirection } from '../canvas/resizeHandler';
import { globalAudio } from '../../services/globalAudioManager';
import { useMicrophoneGuard } from '../../hooks/useMicrophoneGuard';
import { ApplauseMeterVisual } from './ApplauseMeterVisual';

interface CanvasApplauseMeterElementProps {
  element: SlideElement;
  isSelected: boolean;
  isLivePresentation?: boolean;
  onSelect: () => void;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
  onStartDrag: (e: React.MouseEvent) => void;
  onStartResize: (e: React.MouseEvent, dir: ResizeDirection) => void;
}

export const CanvasApplauseMeterElement: React.FC<CanvasApplauseMeterElementProps> = ({
  element, isSelected, isLivePresentation = false, onSelect, onStartDrag, onStartResize,
}) => {
  const [liveVolume, setLiveVolume] = useState(0);
  const [peakVolume, setPeakVolume] = useState(0);
  const [quietTimerSeconds, setQuietTimerSeconds] = useState(0);
  const quietStart = useRef<number | null>(null);
  const peakRef = useRef(0);
  const { isConnected, isBlocked } = useMicrophoneGuard(isLivePresentation);

  useEffect(() => {
    if (!isLivePresentation) return;
    return globalAudio.subscribe((volume) => {
      setLiveVolume((previous) => Math.round(previous * 0.4 + volume * 0.6));
      if (volume > peakRef.current) {
        peakRef.current = volume;
        setPeakVolume(volume);
        quietStart.current = null;
      } else if (volume < 10 && peakRef.current > 15) {
        const now = Date.now();
        if (!quietStart.current) quietStart.current = now;
        const seconds = Math.floor((now - quietStart.current) / 1000);
        setQuietTimerSeconds(seconds);
        if (seconds > 3) {
          peakRef.current = 0;
          setPeakVolume(0);
          quietStart.current = null;
          setQuietTimerSeconds(0);
        }
      }
    });
  }, [isLivePresentation]);

  return (
    <div onClick={(event) => { event.stopPropagation(); onSelect(); }}
      onMouseDown={onStartDrag}
      style={{ left: `${element.x}%`, top: `${element.y}%`, width: `${element.width}%`, height: `${element.height}%` }}
      className={`absolute flex flex-col items-center justify-between rounded-2xl border-2 border-amber-500 bg-stone-950 p-2.5 text-amber-100 ${isSelected ? 'z-30 ring-2 ring-amber-400' : 'z-10'}`}>
      {isSelected && <GoogleSlidesBoundingBox onStartDrag={onStartDrag} onStartResize={onStartResize} />}
      <ApplauseMeterVisual liveVolume={liveVolume} peakVolume={peakVolume} isConnected={isConnected}
        isBlocked={isBlocked} quietTimerSeconds={quietTimerSeconds} />
    </div>
  );
};

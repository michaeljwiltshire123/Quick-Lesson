import React, { useState } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { GoogleSlidesBoundingBox } from '../canvas/GoogleSlidesBoundingBox';
import { ResizeDirection } from '../canvas/resizeHandler';
import { Disc3, Users, Sparkles } from 'lucide-react';

interface CanvasPupilWheelElementProps {
  element: SlideElement;
  isSelected: boolean;
  onSelect: () => void;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
  onStartDrag: (e: React.MouseEvent) => void;
  onStartResize: (e: React.MouseEvent, dir: ResizeDirection) => void;
}

const DEFAULT_PUPILS = ['Alex M.', 'Charlie S.', 'Elliot K.', 'Harper B.', 'Jordan L.', 'Morgan P.', 'Riley T.', 'Sam W.'];
const SLICE_COLORS = ['#FEF3C7', '#FDE68A', '#FCA5A5', '#FECACA', '#FED7AA', '#E9D5FF', '#C7D2FE', '#A7F3D0'];

export const CanvasPupilWheelElement: React.FC<CanvasPupilWheelElementProps> = ({
  element, isSelected, onSelect, onUpdateElement, onStartDrag, onStartResize,
}) => {
  const pupils = (element.meta?.pupilList as string[]) || DEFAULT_PUPILS;
  const [rotation, setRotation] = useState<number>(element.meta?.rotation || 0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPupil, setSelectedPupil] = useState<string | null>(element.meta?.selectedPupil || null);

  const handleSpin = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedPupil(null);

    const randomRot = Math.floor(1440 + Math.random() * 1800);
    const newRot = rotation + randomRot;
    setRotation(newRot);

    setTimeout(() => {
      setIsSpinning(false);
      const sliceAngle = 360 / pupils.length;
      const normalizedRot = (360 - (newRot % 360)) % 360;
      const winnerIndex = Math.floor(normalizedRot / sliceAngle) % pupils.length;
      const winner = pupils[winnerIndex];
      setSelectedPupil(winner);
      onUpdateElement({ meta: { ...(element.meta || {}), rotation: newRot, selectedPupil: winner } });
    }, 2800);
  };

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onMouseDown={onStartDrag}
      style={{ left: `${element.x}%`, top: `${element.y}%`, width: `${element.width}%`, height: `${element.height}%` }}
      className={`absolute flex flex-col items-center justify-between p-2.5 bg-amber-50/95 border-2 border-amber-500 rounded-2xl shadow-xl select-none cursor-move transition-all ${
        isSelected ? 'z-30 ring-2 ring-amber-600' : 'hover:outline hover:outline-1 hover:outline-blue-300 z-10'
      }`}
    >
      {isSelected && <GoogleSlidesBoundingBox onStartDrag={onStartDrag} onStartResize={onStartResize} />}

      {/* Header Badge */}
      <div className="flex items-center justify-between w-full text-[11px] font-black text-amber-950 px-1">
        <span className="flex items-center gap-1"><Disc3 className="w-3.5 h-3.5 text-amber-700 animate-spin-slow" />Pupil Spin Wheel</span>
        <span className="flex items-center gap-1 bg-amber-200/80 px-1.5 py-0.5 rounded text-[9px]"><Users className="w-3 h-3 text-amber-900" />{pupils.length} In Class</span>
      </div>

      {/* Live Spinning Wheel SVG Canvas */}
      <div className="relative w-28 h-28 my-1 flex items-center justify-center pointer-events-auto">
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-rose-600 text-lg font-black z-30 drop-shadow-xs">▼</div>
        <div style={{ transform: `rotate(${rotation}deg)`, transition: isSpinning ? 'transform 2.8s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none' }} className="w-full h-full rounded-full border-4 border-amber-700 shadow-md overflow-hidden relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {pupils.map((name, i) => {
              const angle = 360 / pupils.length;
              const startA = (i * angle * Math.PI) / 180;
              const endA = ((i + 1) * angle * Math.PI) / 180;
              const x1 = 50 + 50 * Math.cos(startA);
              const y1 = 50 + 50 * Math.sin(startA);
              const x2 = 50 + 50 * Math.cos(endA);
              const y2 = 50 + 50 * Math.sin(endA);
              const path = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
              return <path key={i} d={path} fill={SLICE_COLORS[i % SLICE_COLORS.length]} stroke="#78350F" strokeWidth="0.8" />;
            })}
          </svg>
        </div>
        <button type="button" onClick={handleSpin} disabled={isSpinning} className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-black text-[9px] shadow-lg border-2 border-white flex flex-col items-center justify-center cursor-pointer z-20 active:scale-95 transition-transform">
          <span>{isSpinning ? '...' : 'SPIN'}</span>
        </button>
      </div>

      {/* Winner Announcement or Print Export Message */}
      {selectedPupil ? (
        <div className="bg-amber-200 border border-amber-400 text-amber-950 rounded-lg px-2 py-1 text-[10px] font-extrabold text-center w-full flex items-center justify-center gap-1 animate-in zoom-in-90">
          <Sparkles className="w-3 h-3 text-amber-700" /><span>Selected: {selectedPupil}!</span>
        </div>
      ) : (
        <div className="bg-white/90 border border-amber-200 text-amber-900 rounded-lg p-1.5 text-[9.5px] font-semibold text-center w-full leading-tight">
          <span className="font-bold block text-amber-950">📋 Live Lesson & Export Note:</span>
          Teacher will assign pupil randomly or use live interactive spinner.
        </div>
      )}
    </div>
  );
};

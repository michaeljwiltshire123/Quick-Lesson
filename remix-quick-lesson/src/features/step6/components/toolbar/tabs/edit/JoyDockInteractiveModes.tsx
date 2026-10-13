import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { Disc3, Volume2, Laugh, Flashlight, Sparkles, Gift, Smile } from 'lucide-react';

interface JoyDockInteractiveModesProps {
  isSpotlightActive: boolean;
  isDiscoActive: boolean;
  onOpenWheel?: () => void;
  onOpenNoiseMeter?: () => void;
  onOpenMeme: () => void;
  onOpenMysteryBox: () => void;
  onToggleSpotlight?: () => void;
  onToggleDisco: () => void;
  onInsertElement?: (element: SlideElement) => void;
}

export const JoyDockInteractiveModes: React.FC<JoyDockInteractiveModesProps> = ({
  isDiscoActive, onOpenMeme, onOpenMysteryBox,
  onToggleDisco, onInsertElement,
}) => {
  const insertPupilWheel = () => {
    if (!onInsertElement) return;
    onInsertElement({
      id: `el-wheel-${Date.now()}`,
      type: 'shape',
      x: 32, y: 18, width: 36, height: 60,
      content: '🎯 Pupil Selection Wheel',
      fillColor: '#FFFBEB', borderColor: '#D97706', borderWidth: 2,
      meta: {
        isPupilWheel: true,
        pupilList: ['Alex M.', 'Charlie S.', 'Elliot K.', 'Harper B.', 'Jordan L.', 'Morgan P.', 'Riley T.', 'Sam W.'],
      },
    });
  };

  const insertApplauseMeter = () => {
    if (!onInsertElement) return;
    onInsertElement({
      id: `el-applause-${Date.now()}`,
      type: 'shape',
      x: 32, y: 20, width: 36, height: 52,
      content: '👏 Applause-O-Meter',
      fillColor: '#18181B', borderColor: '#F59E0B', borderWidth: 2,
      meta: { isApplauseMeter: true },
    });
  };

  const insertSpotlightBeam = () => {
    if (!onInsertElement) return;
    onInsertElement({
      id: `el-spotlight-${Date.now()}`,
      type: 'shape',
      x: 0, y: 0, width: 100, height: 100,
      content: '🔦 Spotlight Beam',
      fillColor: 'transparent', borderColor: 'transparent', borderWidth: 0,
      meta: {
        isSpotlightBeam: true,
        beamRadius: 90,
        spotlightX: 50,
        spotlightY: 50,
      },
    });
  };

  const insertMascot = (type: 'thumb' | 'tf') => {
    if (!onInsertElement) return;
    onInsertElement({
      id: `el-mascot-${Date.now()}`,
      type: 'shape', shapeType: 'rounded',
      x: 70, y: 30, width: 26, height: 20,
      content: type === 'thumb' ? '🦉 👍 Thumbs Up!' : '🦉 ❓ True or False?',
      fillColor: '#FEF3C7', borderColor: '#D97706', borderWidth: 2,
      textStyle: { bold: true, align: 'center', fontSize: 13, color: '#78350F' },
    });
  };

  return (
    <div className="space-y-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl">
      <div className="text-[11px] font-bold text-stone-800">Classroom Interactive Modes</div>
      <div className="grid grid-cols-2 gap-1 pt-0.5">
        <button type="button" onClick={insertPupilWheel} className="p-1.5 bg-white hover:bg-amber-50 border border-stone-200 rounded-lg text-left text-[10px] font-semibold text-stone-800 flex items-center gap-1.5 cursor-pointer">
          <Disc3 className="w-3.5 h-3.5 text-amber-600" /><span>Attach Pupil Wheel</span>
        </button>
        <button type="button" onClick={insertApplauseMeter} className="p-1.5 bg-white hover:bg-emerald-50 border border-stone-200 rounded-lg text-left text-[10px] font-semibold text-stone-800 flex items-center gap-1.5 cursor-pointer">
          <Volume2 className="w-3.5 h-3.5 text-emerald-600" /><span>Applause-O-Meter</span>
        </button>
        <button type="button" onClick={onOpenMeme} className="p-1.5 bg-white hover:bg-yellow-50 border border-stone-200 rounded-lg text-left text-[10px] font-semibold text-stone-800 flex items-center gap-1.5 cursor-pointer">
          <Laugh className="w-3.5 h-3.5 text-yellow-600" /><span>Meme Generator</span>
        </button>
        <button type="button" onClick={onOpenMysteryBox} className="p-1.5 bg-white hover:bg-purple-50 border border-stone-200 rounded-lg text-left text-[10px] font-semibold text-stone-800 flex items-center gap-1.5 cursor-pointer">
          <Gift className="w-3.5 h-3.5 text-purple-600" /><span>Mystery Box</span>
        </button>
        <button type="button" onClick={() => insertMascot('thumb')} className="p-1.5 bg-white hover:bg-amber-50 border border-stone-200 rounded-lg text-left text-[10px] font-semibold text-stone-800 flex items-center gap-1.5 cursor-pointer">
          <Smile className="w-3.5 h-3.5 text-amber-600" /><span>Mascot Avatar</span>
        </button>
        <button type="button" onClick={insertSpotlightBeam} className="p-1.5 bg-white hover:bg-yellow-50 border border-stone-200 rounded-lg text-left text-[10px] font-semibold text-stone-800 flex items-center gap-1.5 cursor-pointer">
          <Flashlight className="w-3.5 h-3.5 text-yellow-500" /><span>Attach Spotlight Beam</span>
        </button>
        <button type="button" onClick={onToggleDisco} className={`col-span-2 p-1.5 border rounded-lg text-center text-[10px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${isDiscoActive ? 'bg-purple-100 border-purple-400 text-purple-900 font-bold' : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'}`}>
          <Sparkles className="w-3.5 h-3.5 text-purple-600" /><span>Disco Celebration Mode</span>
        </button>
      </div>
    </div>
  );
};

import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Trash2, Send, Palette } from 'lucide-react';

interface Props {
  prompt: string;
  onSubmitDrawing: (dataUrl: string) => void;
  isSubmitted?: boolean;
}

const COLORS = ['#FFFFFF', '#3B82F6', '#EF4444', '#10B981', '#F59E0B'];

export const DrawCanvasPupilCard: React.FC<Props> = ({ prompt, onSubmitDrawing, isSubmitted }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const [isDrawing, setIsDrawing] = useState(false);

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || isSubmitted) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setIsDrawing(true);
    const { x, y } = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPos(e, canvas);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentColor === '#0F172A' ? 14 : 4;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => { clearCanvas(); }, []);

  return (
    <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-4 text-white space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
          Draw Duel Prompt
        </span>
        <strong className="text-xs truncate max-w-[200px] text-gray-200">{prompt}</strong>
      </div>

      <div className="rounded-2xl border border-white/20 overflow-hidden bg-[#0F172A]">
        <canvas
          ref={canvasRef}
          width={320}
          height={220}
          className="w-full touch-none cursor-crosshair"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={() => setIsDrawing(false)}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={() => setIsDrawing(false)}
        />
      </div>

      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1.5">
          {COLORS.map((c) => (
            <button key={c} type="button" onClick={() => setCurrentColor(c)} className={`w-6 h-6 rounded-full border-2 transition-all ${currentColor === c ? 'scale-110 border-white' : 'border-transparent'}`} style={{ backgroundColor: c }} />
          ))}
          <button type="button" onClick={() => setCurrentColor('#0F172A')} title="Eraser" className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300">
            <Eraser className="w-3.5 h-3.5" />
          </button>
          <button type="button" onClick={clearCanvas} title="Clear" className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <button type="button" onClick={() => { if (canvasRef.current) onSubmitDrawing(canvasRef.current.toDataURL()); }} disabled={isSubmitted} className="px-3 py-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase rounded-xl flex items-center gap-1">
          <Send className="w-3 h-3" />
          <span>{isSubmitted ? 'Sent' : 'Submit'}</span>
        </button>
      </div>
    </div>
  );
};

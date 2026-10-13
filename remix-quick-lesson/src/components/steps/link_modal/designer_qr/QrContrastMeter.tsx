import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

function getLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  if (clean.length < 6) return 0.5;
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

export function getContrastRatio(fg: string, bg: string): number {
  const l1 = getLuminance(fg), l2 = getLuminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

interface QrContrastMeterProps {
  fgColor: string;
  bgColor: string;
}

export const QrContrastMeter: React.FC<QrContrastMeterProps> = ({ fgColor, bgColor }) => {
  const ratio = getContrastRatio(fgColor, bgColor);
  const roundedRatio = Math.round(ratio * 10) / 10;
  const clamped = Math.min(12, Math.max(1, ratio));
  const angle = -180 + ((clamped - 1) / 11) * 180;

  const isLow = ratio < 3.2;
  const isModerate = ratio >= 3.2 && ratio < 6.0;
  const isHigh = ratio >= 6.0;

  const statusLabel = isLow ? 'Low Contrast' : isModerate ? 'Moderate' : 'Optimal Scan';
  const statusColor = isLow ? 'text-red-700 bg-red-50 border-red-200' : isModerate ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200';

  return (
    <div className="p-2 bg-[#F8F6F0]/80 rounded-xl border border-[#2D2A26]/10 space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="relative w-9 h-5 overflow-hidden flex items-end justify-center">
            <svg viewBox="0 0 36 20" className="w-9 h-5">
              <path d="M 4 18 A 14 14 0 0 1 12 6" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
              <path d="M 13 5.5 A 14 14 0 0 1 23 5.5" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
              <path d="M 24 6 A 14 14 0 0 1 32 18" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
              <circle cx="18" cy="18" r="2.5" fill="#2D2A26" />
              <line x1="18" y1="18" x2="18" y2="7" stroke="#2D2A26" strokeWidth="1.75" strokeLinecap="round" transform={`rotate(${angle + 90} 18 18)`} className="transition-transform duration-300 ease-out" />
            </svg>
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#2D2A26] flex items-center gap-1">
              Readability: <span className="font-mono font-black">{roundedRatio}:1</span>
            </div>
            <span className={`inline-block px-1.5 py-0.2 text-[9px] font-bold rounded-md border ${statusColor}`}>
              {statusLabel}
            </span>
          </div>
        </div>

        {isHigh && (
          <div className="flex items-center gap-1 text-[9px] font-semibold text-emerald-700">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Fast Camera Scan</span>
          </div>
        )}
      </div>

      {isLow && (
        <div className="flex items-start gap-1.5 px-2 py-1 bg-red-50/90 border border-red-200/80 rounded-lg text-red-800 text-[9.5px] leading-tight animate-in fade-in duration-200">
          <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
          <span><strong>Warning:</strong> Pattern and background colours are too close. Phone cameras may struggle to recognise this QR code.</span>
        </div>
      )}
    </div>
  );
};

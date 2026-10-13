import React, { useEffect, useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface Props {
  initialSeconds: number | null;
  onTimeUp?: () => void;
  disabled?: boolean;
}

export const StudentTimerClock: React.FC<Props> = ({ initialSeconds, onTimeUp, disabled = false }) => {
  const [remaining, setRemaining] = useState<number | null>(initialSeconds);

  useEffect(() => {
    if (initialSeconds === null || disabled) return;
    setRemaining(initialSeconds);
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev === null) return null;
        if (prev <= 1) { clearInterval(timer); onTimeUp?.(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [initialSeconds, disabled, onTimeUp]);

  if (remaining === null) return null;
  const isLow = remaining > 0 && remaining <= 10;
  const isExpired = remaining === 0;

  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
        isExpired ? 'bg-red-50 text-red-700 border-red-200' : isLow ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse' : 'bg-[#F8F6F0] text-[#2D2A26] border-[#2D2A26]/15'
      }`}
    >
      {isExpired ? <AlertCircle className="w-3.5 h-3.5 text-red-600" /> : <Clock className={`w-3.5 h-3.5 ${isLow ? 'text-amber-700' : 'text-[#D97706]'}`} />}
      <span>{isExpired ? 'Time Expired' : `${remaining}s remaining`}</span>
    </div>
  );
};

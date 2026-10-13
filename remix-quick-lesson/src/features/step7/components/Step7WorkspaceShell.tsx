import React from 'react';
import { Step3Stepper } from '../../../components/step3_chunks/Step3Stepper';

interface Props { title: string; subject: string; slideCount: number; onBack: () => void; children: React.ReactNode }
export const Step7WorkspaceShell: React.FC<Props> = ({ title, subject, slideCount, onBack, children }) => (
  <main className="min-h-screen bg-gradient-to-br from-amber-50 via-[#F8F6F0] to-orange-50 px-4 py-7 text-[#2D2A26]">
    <div className="mx-auto max-w-6xl space-y-5">
      <Step3Stepper currentStep={7} />
      <header className="overflow-hidden rounded-3xl bg-[#3A281D] text-white shadow-xl">
        <div className="border-b border-white/10 bg-amber-700/30 px-6 py-3 text-xs font-bold uppercase tracking-[.2em] text-amber-100">Quick Lesson · Step 7</div>
        <div className="flex flex-wrap items-end justify-between gap-5 p-6 sm:p-8">
          <div><button onClick={onBack} className="text-sm text-amber-200 hover:text-white">← Back to slide editor</button>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{title || 'Lesson workspace'}</h1>
            <p className="mt-2 text-amber-100/80">{subject} · {slideCount} saved slides</p></div>
          <div className="rounded-2xl border border-amber-100/15 bg-white/10 px-5 py-4 text-sm text-amber-50">Prepare · Teach · Follow up</div>
        </div>
      </header>
      {children}
    </div>
  </main>
);

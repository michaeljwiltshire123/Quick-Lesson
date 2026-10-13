import React from 'react';

interface Props { teacherQr: string; teacherUrl: string; studentQr: string; studentUrl: string; error?: string }
const card = 'rounded-xl border border-amber-200 bg-white p-4 shadow-sm';
const QRCard: React.FC<{ title: string; description: string; image: string; url: string }> = ({ title, description, image, url }) =>
  <article className={card}><h3 className="font-bold text-stone-900">{title}</h3><p className="mt-1 text-sm text-stone-600">{description}</p>
    {image && <img src={image} alt={`${title} QR code`} className="mx-auto mt-3 h-36 w-36 rounded-lg border p-1" />}
    <p className="mt-2 break-all text-xs text-stone-600">{url}</p></article>;

export const DualQRLaunchHub: React.FC<Props> = ({ teacherQr, teacherUrl, studentQr, studentUrl, error }) => (
  <section className="rounded-2xl bg-amber-100/70 p-4">
    <h2 className="font-bold text-amber-950">Join this live lesson</h2>
    {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
    <div className="mt-3 grid gap-3 md:grid-cols-2">
      <QRCard title="Teacher Remote" description="Slide controls, timers and private speaker notes." image={teacherQr} url={teacherUrl} />
      <QRCard title="Student Join" description="Follow activities, ask questions and submit exit-ticket responses." image={studentQr} url={studentUrl} />
    </div>
  </section>
);

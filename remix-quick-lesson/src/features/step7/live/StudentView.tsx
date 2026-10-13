import React, { useState } from 'react';
import { StudentScreenMaskingStage } from './StudentScreenMaskingStage';
import { SlideItem } from '../../step6/types/slideTypes';

export const StudentView: React.FC<{ slide?: SlideItem; caption?: string; send: (data: object) => void; connectionError: string; exitTicketMode?: boolean }> = ({ slide, caption, send, connectionError, exitTicketMode }) => {
  const [lowBandwidth, setLowBandwidth] = useState(false);
  return <><StudentScreenMaskingStage slide={slide} caption={caption} lowBandwidth={lowBandwidth} exitTicketMode={exitTicketMode}
    onBandwidthChange={() => setLowBandwidth((value) => !value)}
    onSubmit={(text, category) => send({ type: 'response', text, category })}
    onAsk={(text) => send({ type: 'question', text })} />
    {connectionError && <p role="alert" className="p-3 text-center text-red-700">{connectionError}</p>}
  </>;
};

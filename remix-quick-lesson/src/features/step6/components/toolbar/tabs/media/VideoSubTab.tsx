import React, { useState } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { MediaCollapsibleDrawer } from './MediaCollapsibleDrawer';
import { VideoPlaybackMiniInspector } from './video/VideoPlaybackMiniInspector';
import { VideoInsertCard } from './video/VideoInsertCard';
import { VideoSourceAndSuggestions } from './video/VideoSourceAndSuggestions';
import { VideoCheckpointsControls } from './video/VideoCheckpointsControls';
import { VideoAspectAndSpeedControls } from './video/VideoAspectAndSpeedControls';
import { VideoStageAndLoopControls } from './video/VideoStageAndLoopControls';
import { VideoPosterAndPrivacyControls } from './video/VideoPosterAndPrivacyControls';
import { VideoFrameControls } from './VideoFrameControls';
import { PlusCircle, PlaySquare, HelpCircle, Monitor, Sparkles, Image, Tv, Sliders } from 'lucide-react';

interface VideoSubTabProps {
  selectedElement?: SlideElement;
  chunkId?: string;
  slideTitle?: string;
  onOpenVideoModal?: () => void;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
  onUpdateElementContent?: (content: string) => void;
  onInsertElement: (newElement: SlideElement) => void;
}

export const VideoSubTab: React.FC<VideoSubTabProps> = ({
  selectedElement, chunkId, slideTitle, onOpenVideoModal, onUpdateElementMeta, onUpdateElementContent, onInsertElement,
}) => {
  const [openDrawers, setOpenDrawers] = useState<Record<string, boolean>>({
    insert: false, source: false, checkpoints: false, format: false, stage: false, poster: false, frame: false,
  });

  const toggle = (k: string) => setOpenDrawers((prev) => ({ ...prev, [k]: !prev[k] }));
  const meta = selectedElement?.meta || {};
  const opacity = meta.opacity ?? 100;
  const cpCount = (meta.checkpoints || []).length;

  return (
    <div className="space-y-2 text-xs text-stone-700 animate-in fade-in pt-1">
      {selectedElement?.content && (
        <VideoPlaybackMiniInspector
          content={selectedElement.content}
          meta={meta}
          onUpdateMeta={onUpdateElementMeta}
        />
      )}

      <MediaCollapsibleDrawer
        title="Add Video (YouTube & Google Drive)"
        icon={<PlusCircle className="w-3.5 h-3.5 text-amber-700" />}
        badge={openDrawers.insert ? 'Open' : undefined}
        isOpen={Boolean(openDrawers.insert)}
        onToggle={() => toggle('insert')}
      >
        <VideoInsertCard onInsertElement={onInsertElement} />
      </MediaCollapsibleDrawer>

      <MediaCollapsibleDrawer title="Video Link & Scene Library" icon={<PlaySquare className="w-3.5 h-3.5 text-amber-700" />} badge={selectedElement?.content ? 'Linked' : undefined} isOpen={Boolean(openDrawers.source)} onToggle={() => toggle('source')}>
        <VideoSourceAndSuggestions content={selectedElement?.content} chunkId={chunkId} slideTitle={slideTitle} onOpenVideoModal={onOpenVideoModal} onUpdateContent={onUpdateElementContent} onUpdateMeta={onUpdateElementMeta} />
      </MediaCollapsibleDrawer>

      <MediaCollapsibleDrawer title="Auto-Pause Question Checkpoints" icon={<HelpCircle className="w-3.5 h-3.5 text-amber-700" />} badge={cpCount > 0 ? `${cpCount} Markers` : undefined} isOpen={Boolean(openDrawers.checkpoints)} onToggle={() => toggle('checkpoints')}>
        <VideoCheckpointsControls checkpoints={meta.checkpoints} meta={meta} onUpdateMeta={onUpdateElementMeta} />
      </MediaCollapsibleDrawer>

      <MediaCollapsibleDrawer title="Shorts Frame (9:16) & Speed" icon={<Monitor className="w-3.5 h-3.5 text-amber-700" />} badge={meta.aspectRatio === '9:16' ? 'Shorts' : `${meta.playbackSpeed ?? 1}×`} isOpen={Boolean(openDrawers.format)} onToggle={() => toggle('format')}>
        <VideoAspectAndSpeedControls aspectRatio={meta.aspectRatio} playbackSpeed={meta.playbackSpeed} onUpdateMeta={onUpdateElementMeta} />
      </MediaCollapsibleDrawer>

      <MediaCollapsibleDrawer title="Stage Dimmer & Micro-Loop" icon={<Sparkles className="w-3.5 h-3.5 text-amber-700" />} badge={meta.isStageMode ? 'Stage' : meta.isLoopSegment ? 'Loop' : undefined} isOpen={Boolean(openDrawers.stage)} onToggle={() => toggle('stage')}>
        <VideoStageAndLoopControls meta={meta} onUpdateMeta={onUpdateElementMeta} />
      </MediaCollapsibleDrawer>

      <MediaCollapsibleDrawer title="Poster Frame & Privacy Shield" icon={<Image className="w-3.5 h-3.5 text-amber-700" />} badge={meta.posterChoice ? meta.posterChoice : undefined} isOpen={Boolean(openDrawers.poster)} onToggle={() => toggle('poster')}>
        <VideoPosterAndPrivacyControls content={selectedElement?.content} meta={meta} onUpdateMeta={onUpdateElementMeta} />
      </MediaCollapsibleDrawer>

      <MediaCollapsibleDrawer title="Screen Framing & Elevation" icon={<Tv className="w-3.5 h-3.5 text-amber-700" />} badge={meta.shadowStyle ? meta.shadowStyle : undefined} isOpen={Boolean(openDrawers.frame)} onToggle={() => toggle('frame')}>
        <VideoFrameControls meta={meta} onUpdateMeta={onUpdateElementMeta} />
      </MediaCollapsibleDrawer>

      <div className="space-y-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl">
        <div className="flex items-center justify-between font-bold text-stone-800 text-[11px]"><span className="flex items-center gap-1.5"><Sliders className="w-3.5 h-3.5 text-amber-700" /><span>Video Dimmer / Opacity</span></span><span className="text-amber-800 text-[11px] font-bold">{opacity}%</span></div>
        <input type="range" min={20} max={100} value={opacity} onChange={(e) => onUpdateElementMeta({ opacity: Number(e.target.value) || 100 })} className="w-full accent-amber-700 cursor-pointer" />
      </div>
    </div>
  );
};

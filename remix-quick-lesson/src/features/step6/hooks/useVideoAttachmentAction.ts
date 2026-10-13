import { SlideItem, SlideElement } from '../types/slideTypes';
import { parseTimestampToSeconds } from '../utils/videoLinkValidator';

interface UseVideoAttachmentActionProps {
  activeSlide?: SlideItem;
  elements: SlideElement[];
  onUpdateActiveSlide: (patch: Partial<SlideItem>) => void;
}

export function useVideoAttachmentAction({
  activeSlide, elements, onUpdateActiveSlide,
}: UseVideoAttachmentActionProps) {
  const handleApplyVideoAttachment = (att: any) => {
    if (!att.url || !activeSlide) return;
    const startSec = att.startTime ? parseTimestampToSeconds(att.startTime) : 0;
    const endSec = att.endTime ? parseTimestampToSeconds(att.endTime) : 0;
    const newEl: SlideElement = {
      id: `el-vid-${Date.now()}`,
      type: 'video',
      x: 20, y: 20, width: 60, height: 50,
      content: att.url,
      caption: att.name || 'Classroom Video',
      fillColor: '#1C1917',
      meta: {
        isAutoplay: false, isMuted: true, shadowStyle: 'soft', imageRadius: 12, aspectRatio: '16:9', isClassroomClean: true,
        startSec, endSec, isStageMode: true,
        checkpoints: att.pauseCue ? [{ id: `cp-${Date.now()}`, timeSec: startSec || 45, timeStr: att.startTime || '00:45', question: att.pauseCue }] : [],
      },
    };
    onUpdateActiveSlide({ elements: [...elements, newEl] });
  };

  return { handleApplyVideoAttachment };
}

import { ChunkAttachment, LessonChunk } from '../../../../../../types';
import { LivePollState } from './typesLive';

export function exportPollResultsAsImage(liveState: LivePollState): void {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 500;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background
  ctx.fillStyle = '#F8F6F0';
  ctx.fillRect(0, 0, 800, 500);

  // Title & Header
  ctx.fillStyle = '#2D2A26';
  ctx.font = 'bold 22px system-ui, sans-serif';
  ctx.fillText(liveState.pollConfig.question.slice(0, 55), 40, 60);

  ctx.fillStyle = '#D97706';
  ctx.font = 'bold 13px system-ui, sans-serif';
  ctx.fillText(`TOTAL RESPONSES: ${liveState.totalVotes} PUPILS`, 40, 95);

  // Draw Bars
  let y = 140;
  liveState.pollConfig.options.forEach((opt, idx) => {
    const votes = liveState.voteCounts[opt.id] || 0;
    const pct = liveState.totalVotes > 0 ? votes / liveState.totalVotes : 0;

    ctx.fillStyle = '#2D2A26';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText(`${idx + 1}. ${opt.text.slice(0, 40)}`, 40, y);

    // Track
    ctx.fillStyle = '#E5E0D8';
    ctx.fillRect(40, y + 8, 720, 20);

    // Fill
    ctx.fillStyle = '#F59E0B';
    ctx.fillRect(40, y + 8, 720 * pct, 20);

    // Percentage
    ctx.fillStyle = '#2D2A26';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(`${votes} (${Math.round(pct * 100)}%)`, 670, y);

    y += 55;
  });

  const a = document.createElement('a');
  a.download = `live-poll-results-${Date.now()}.png`;
  a.href = canvas.toDataURL('image/png');
  a.click();
}

export function savePollToSlideAndReset(
  liveState: LivePollState,
  activeChunk?: LessonChunk,
  onAddAttachment?: (att: Partial<ChunkAttachment>) => void,
  onUpdateChunk?: (updated: LessonChunk) => void
): void {
  const summary = liveState.pollConfig.options
    .map((o) => `${o.text}: ${liveState.voteCounts[o.id] || 0} votes`)
    .join(' | ');

  onAddAttachment?.({
    id: `att-poll-results-${Date.now()}`,
    name: `Poll Archive: ${liveState.pollConfig.question.slice(0, 30)}`,
    type: 'document',
    platform: 'other',
    udlPathway: 'all',
    cfuPrompt: `Classroom Poll Outcomes: ${summary}`,
  });

  if (activeChunk && onUpdateChunk) {
    onUpdateChunk({
      ...activeChunk,
      formativeTaskDetails: `${activeChunk.formativeTaskDetails || ''} [Last Archived: ${liveState.totalVotes} votes]`,
    });
  }
}

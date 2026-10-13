export interface ExitTicketResponse {
  id: number;
  text: string;
  category?: string;
}

const keyFor = (sessionId: string) => `quick-lesson:exit-ticket:${sessionId}`;

export function loadExitTicketResponses(sessionId: string): ExitTicketResponse[] {
  try {
    const saved = localStorage.getItem(keyFor(sessionId));
    if (!saved) return [];
    const responses: unknown = JSON.parse(saved);
    if (!Array.isArray(responses)) return [];
    return responses.filter((item): item is ExitTicketResponse => item && typeof item.id === 'number'
      && typeof item.text === 'string' && (item.category === undefined || typeof item.category === 'string'));
  } catch (error) {
    console.warn('Could not read saved exit-ticket responses.', error);
    return [];
  }
}

export function saveExitTicketResponses(sessionId: string, responses: ExitTicketResponse[]) {
  localStorage.setItem(keyFor(sessionId), JSON.stringify(responses));
}

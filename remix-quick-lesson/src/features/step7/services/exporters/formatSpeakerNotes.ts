import { SpeakerNotesData } from '../../../step6/types/slideTypes';

export function formatSpeakerNotes(notes: SpeakerNotesData): string {
  const sections = [
    ['Teacher guidance', notes.teacherScript],
    ['Step-by-step instructions', notes.stepInstructions],
    ['Glossary of key terms', notes.glossary?.map((item) => `${item.term}: ${item.definition}`).join('\n')],
    ['Study suggestions', notes.studySuggestions?.join('\n')],
    ['Recommended reading and authors', notes.furtherReading?.join('\n')],
    ['Retrieval cues', notes.retrievalCues],
    ['Common misconceptions and pitfalls', notes.misconceptionsWarning],
  ];
  return sections.filter(([, value]) => value?.trim()).map(([heading, value]) => `${heading}\n${value}`).join('\n\n');
}

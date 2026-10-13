import { SlideItem } from '../../types/slideTypes';

const SIMPLE_GLOSSARY_TRANSLATIONS: Record<string, Record<string, string>> = {
  es: { Lesson: 'Lección', Objective: 'Objetivo', Task: 'Tarea', Question: 'Pregunta', Recall: 'Recordar', Concept: 'Concepto' },
  fr: { Lesson: 'Leçon', Objective: 'Objectif', Task: 'Tâche', Question: 'Question', Recall: 'Rappel', Concept: 'Concept' },
  de: { Lesson: 'Lektion', Objective: 'Lernziel', Task: 'Aufgabe', Question: 'Frage', Recall: 'Wiederholung', Concept: 'Konzept' },
  pl: { Lesson: 'Lekcja', Objective: 'Cel lekcji', Task: 'Zadanie', Question: 'Pytanie', Recall: 'Powtórzenie', Concept: 'Pojęcie' },
  ur: { Lesson: 'سبق', Objective: 'مقصد', Task: 'کام', Question: 'سوال', Recall: 'دہرائی', Concept: 'تصور' },
  ar: { Lesson: 'درس', Objective: 'هدف', Task: 'مهمة', Question: 'سؤال', Recall: 'تذكر', Concept: 'مفهوم' },
  zh: { Lesson: '课程', Objective: '学习目标', Task: '任务', Question: '问题', Recall: '回顾', Concept: '概念' },
  cy: { Lesson: 'Gwers', Objective: 'Amcan', Task: 'Tasg', Question: 'Cwestiwn', Recall: 'Dwyn i gof', Concept: 'Cysyniad' },
};

export function translateFullDeckToTargetLanguage(slides: SlideItem[], langCode: string): SlideItem[] {
  const dictionary = SIMPLE_GLOSSARY_TRANSLATIONS[langCode] || {};

  return slides.map((s) => {
    let newTitle = s.title;
    Object.entries(dictionary).forEach(([en, tr]) => {
      newTitle = newTitle.replace(new RegExp(en, 'gi'), tr);
    });

    const translatedElements = s.elements.map((el) => {
      let content = el.content;
      Object.entries(dictionary).forEach(([en, tr]) => {
        content = content.replace(new RegExp(en, 'gi'), tr);
      });
      return { ...el, content };
    });

    const newScript = s.speakerNotes?.teacherScript
      ? `[${langCode.toUpperCase()}] ${s.speakerNotes.teacherScript}`
      : s.speakerNotes?.teacherScript;

    return {
      ...s,
      title: newTitle,
      elements: translatedElements,
      speakerNotes: {
        ...s.speakerNotes,
        teacherScript: newScript || '',
      },
    };
  });
}

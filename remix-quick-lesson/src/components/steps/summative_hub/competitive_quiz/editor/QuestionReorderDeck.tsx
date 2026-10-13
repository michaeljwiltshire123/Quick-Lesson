import React from 'react';
import { QuestionCard } from '../types/competitiveQuizTypes';
import { QuestionCardRow } from './QuestionCardRow';

interface Props {
  questions: QuestionCard[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onEdit: (question: QuestionCard) => void;
  onInspect: (question: QuestionCard) => void;
  onDelete: (index: number) => void;
}

export const QuestionReorderDeck: React.FC<Props> = ({
  questions,
  onMoveUp,
  onMoveDown,
  onEdit,
  onInspect,
  onDelete,
}) => {
  return (
    <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
      {questions.map((card, idx) => (
        <QuestionCardRow
          key={card.id || idx}
          card={card}
          index={idx}
          total={questions.length}
          onMoveUp={() => onMoveUp(idx)}
          onMoveDown={() => onMoveDown(idx)}
          onInspect={() => onInspect(card)}
          onEdit={() => onEdit(card)}
          onDelete={() => onDelete(idx)}
        />
      ))}
    </div>
  );
};

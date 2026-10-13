import React from 'react';
import { ImposterQuestion } from '../types/imposterTypes';
import { ComponentNameDropInput } from './question_types/ComponentNameDropInput';
import { RealWorldAppInput } from './question_types/RealWorldAppInput';
import { AnalogyLinkInput } from './question_types/AnalogyLinkInput';
import { ActionVerbInput } from './question_types/ActionVerbInput';

interface Props {
  question: ImposterQuestion;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export const QuestionRendererSwitch: React.FC<Props> = ({
  question,
  value,
  onChange,
  disabled,
}) => {
  switch (question.type) {
    case 'component_name_drop':
      return <ComponentNameDropInput question={question} value={value} onChange={onChange} disabled={disabled} />;
    case 'real_world_app':
      return <RealWorldAppInput question={question} value={value} onChange={onChange} disabled={disabled} />;
    case 'analogy_link':
      return <AnalogyLinkInput question={question} value={value} onChange={onChange} disabled={disabled} />;
    case 'action_verb':
      return <ActionVerbInput question={question} value={value} onChange={onChange} disabled={disabled} />;
    default:
      return null;
  }
};

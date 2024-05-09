import type { Question, QuestionResponse } from 'features/sessions/types';

export type RadioOptionsProps = {
  question: Question;
  value: QuestionResponse['value'];
  onChange: (value: QuestionResponse['value']) => void;
};

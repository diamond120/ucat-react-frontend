import type { Question, QuestionResponse } from 'features/sessions/types';

export type DragAndDropOptionsProps = {
  question: Question;
  value: QuestionResponse['value'];
  onChange: (value: QuestionResponse['value']) => void;
};

export type DragItem = {
  id?: number;
  text: string;
};

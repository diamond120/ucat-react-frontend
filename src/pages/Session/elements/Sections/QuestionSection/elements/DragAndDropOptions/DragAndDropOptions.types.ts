import type { Question, QuestionResponse } from 'features/sessions/types';

export type DragAndDropOptionsProps = {
  question: Question;
  value: QuestionResponse['value'];
  onChange: (value: QuestionResponse['value']) => void;
  isSessionCompleted: boolean;
};

export type DragItem = {
  id?: number;
  text: string;
};

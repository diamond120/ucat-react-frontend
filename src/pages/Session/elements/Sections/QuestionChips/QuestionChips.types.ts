import type { Question } from 'features/sessions/types';

export type QuestionChipsProps = {
  onQuestionChange: (questionId: Question['id'] | null) => void;
};

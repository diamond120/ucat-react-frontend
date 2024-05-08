import type { Question } from 'features/sessions/types';

export type FooterProps = {
  onQuestionChange: (questionId: Question['id'] | null) => () => void;
};

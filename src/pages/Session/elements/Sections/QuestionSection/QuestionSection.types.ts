import type { Question } from 'features/sessions/types';

export type QuestionSectionProps = {
  sessionId: string;
  questionId: Question['id'] | null;
};

import type { Question } from 'features/sessions/types';

export type OverviewSectionProps = {
  onQuestionChange: (questionId: Question['id'] | null) => void;
};

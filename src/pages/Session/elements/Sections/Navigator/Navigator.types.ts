import type { Question } from 'features/sessions/types';

export type NavigatorProps = {
  navigateTo: (questionId: Question['id'] | null) => void;
  onEnd?: () => void;
};

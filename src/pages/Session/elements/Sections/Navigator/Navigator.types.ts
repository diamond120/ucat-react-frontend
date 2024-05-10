import type { Question, Section } from 'features/sessions/types';

export type NavigatorProps = {
  navigateTo: (questionId: Question['id'] | null, sectionId: Section['id'] | null) => void;
  onEnd?: () => void;
};

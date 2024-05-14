import type { Section } from 'features/sessions/types';

export type HeaderProps = {
  onSectionChange: (sectionId: Section['id'] | null) => void;
  isSessionCompleted: boolean;
};

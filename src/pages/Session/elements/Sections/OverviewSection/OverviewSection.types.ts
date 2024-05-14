import type { Section } from 'features/sessions/types';

export type OverviewSectionProps = {
  onSectionChange: (sectionId: Section['id'] | null) => void;
};

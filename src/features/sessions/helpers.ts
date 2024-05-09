import type { Session } from './types';

export const findCurrentSectionIndex = (session: Session): number => {
  if (!session.section_id) return -1;
  return session.sections.findIndex((section) => section.id === session.section_id);
};

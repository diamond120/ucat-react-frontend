import type { Question, Section } from 'features/sessions/types';

import { SessionSectionType } from '../../Session.constants';

export type FooterProps = {
  sectionType: SessionSectionType;
  onSectionChange: (sectionId: Section['id'] | null) => void;
  onQuestionChange: (questionId: Question['id'] | null) => void;
};

import type { Question, Section } from 'features/sessions/types';

import { SessionSectionType } from '../../Session.constants';

export type FooterProps = {
  sectionType: SessionSectionType;
  onSectionQuestionChange: (questionId: Question['id'] | null, sectionId: Section['id'] | null) => void;
};

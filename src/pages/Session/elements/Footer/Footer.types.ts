import type { Question, Section } from 'features/sessions/types';

import { SessionSectionType } from '../../Session.constants';

export type FooterProps = {
  sectionType: SessionSectionType;
  isSessionCompleted: boolean;
  isHotkeyDisabled: boolean;
  onSectionChange: (sectionId: Section['id'] | null) => void;
  onQuestionChange: (questionId: Question['id'] | null) => void;
  onBeginExamModalToggle: (isOpen: boolean) => () => void;
  onEndExamModalToggle: (isOpen: boolean) => () => void;
  onEndSectionModalToggle: (isOpen: boolean) => () => void;
  onNavigatorModalToggle: (isOpen: boolean) => () => void;
};

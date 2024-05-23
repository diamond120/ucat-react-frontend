import { SessionSectionType } from '../../Session.constants';

export type FooterProps = {
  sectionType: SessionSectionType;
  isSessionCompleted: boolean;
  isHotkeyDisabled: boolean;
  onNavigatePrev: () => void;
  onNavigateNext: () => void;
  onReturnToOverview: () => void;
  onEndExamModalToggle: (isOpen: boolean) => () => void;
  onEndSectionModalToggle: (isOpen: boolean) => () => void;
  onNavigatorModalToggle: (isOpen: boolean) => () => void;
};

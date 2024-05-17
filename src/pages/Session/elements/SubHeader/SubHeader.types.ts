import { SessionSectionType } from '../../Session.constants';

export type SubHeaderProps = {
  sectionType: SessionSectionType;
  isSessionCompleted: boolean;
  isHotkeyDisabled: boolean;
  onExplainModalToggle: (isOpen: boolean) => () => void;
  onCalculatorModalToggle: (isOpen: boolean) => () => void;
};

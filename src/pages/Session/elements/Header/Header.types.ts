import { SessionSectionType } from '../../Session.constants';

export type HeaderProps = {
  onTimeExpired: () => void;
  isSessionCompleted: boolean;
  sectionType: SessionSectionType;
  packageInstructionIndex: number;
};

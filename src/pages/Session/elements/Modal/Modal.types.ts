import * as modals from 'constants/modals';

export type ModalProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClose: () => void;
  primaryButtonText?: modals.MODAL_BUTTON_TYPES;
  secondaryButtonText?: modals.MODAL_BUTTON_TYPES;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
};

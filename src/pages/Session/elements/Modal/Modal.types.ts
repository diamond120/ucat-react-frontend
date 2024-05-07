export type ModalProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClose: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
};

export type FooterButtonTypes = 'prev' | 'next' | 'navigator' | 'end_exam' | 'end_section' | 'return_overview';

export type FooterButtonProps = {
  type: FooterButtonTypes;
  onClick?: () => void;
  isDisabled?: boolean;
  isHotkeyDisabled: boolean;
};

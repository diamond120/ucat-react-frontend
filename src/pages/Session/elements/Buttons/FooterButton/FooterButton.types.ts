export type FooterButtonTypes = 'prev' | 'next' | 'navigator' | 'end_exam' | 'end_section';

export type FooterButtonProps = {
  type: FooterButtonTypes;
  onClick?: () => void;
};

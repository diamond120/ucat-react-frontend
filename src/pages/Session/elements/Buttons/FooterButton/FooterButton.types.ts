export type FooterButtonTypes = 'prev' | 'next' | 'navigator' | 'end';

export type FooterButtonProps = {
  type: FooterButtonTypes;
  onClick?: () => void;
};

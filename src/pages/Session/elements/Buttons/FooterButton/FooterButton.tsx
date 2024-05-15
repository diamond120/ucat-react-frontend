import type { FooterButtonProps } from './FooterButton.types';

import React from 'react';
import classNames from 'classnames';
import * as constants from './FooterButton.constants';
import './_footer-button.scss';

export const FooterButton = ({ type, onClick, isDisabled }: FooterButtonProps) => {
  return (
    <button
      className={classNames({
        'footer-button': true,
        'footer-button__prev': type === 'prev',
        'footer-button__next': type === 'next',
        'footer-button__navigator': type === 'navigator',
        'footer-button__end': type === 'end_exam' || type === 'end_section' || type === 'return_overview',
      })}
      onClick={onClick}
      disabled={isDisabled}
    >
      {constants.FOOTER_BUTTON_LABELS[type]}
    </button>
  );
};

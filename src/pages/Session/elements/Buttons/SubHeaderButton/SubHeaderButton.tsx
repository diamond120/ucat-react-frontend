import type { SubHeaderButtonProps } from './SubHeaderButton.types';

import React from 'react';
import classNames from 'classnames';
import * as constants from './SubHeaderButton.constants';
import './_sub-header-button.scss';

export const SubHeaderButton = ({ type, onClick }: SubHeaderButtonProps) => {
  return (
    <button
      className={classNames({
        'sub-header-button': true,
        'sub-header-button__answer': type === 'answer',
        'sub-header-button__calculator': type === 'calculator',
        'sub-header-button__flag': type === 'flag',
      })}
      onClick={onClick}
    >
      {constants.SUB_HEADER_BUTTON_LABELS[type]}
    </button>
  );
};

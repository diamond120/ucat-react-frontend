import type { SubHeaderButtonProps } from './SubHeaderButton.types';

import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import classNames from 'classnames';
import * as constants from './SubHeaderButton.constants';
import './_sub-header-button.scss';

export const SubHeaderButton = ({ type, flagged, isHotkeyDisabled, onClick }: SubHeaderButtonProps) => {
  useHotkeys(
    constants.SUB_HEADER_BUTTON_HOTKEYS[type],
    () => onClick?.(),
    {
      preventDefault: true,
      enabled: !isHotkeyDisabled,
    },
    [onClick],
  );

  return (
    <button
      className={classNames({
        'sub-header-button': true,
        'sub-header-button__answer': type === 'answer',
        'sub-header-button__calculator': type === 'calculator',
        'sub-header-button__flag': type === 'flag',
        'sub-header-button__flag--is-flagged': type === 'flag' && flagged,
      })}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: constants.SUB_HEADER_BUTTON_HTMLS[type] }}
    ></button>
  );
};

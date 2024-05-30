import type { ModalProps } from './Modal.types';

import React from 'react';
import Reactmodal from 'react-modal';
import Draggable from 'react-draggable';
import { useHotkeys } from 'react-hotkeys-hook';
import * as modals from 'constants/modals';
import classNames from 'classnames';
import './_modal.scss';

Reactmodal.setAppElement('#root');

export const Modal = ({
  title,
  className,
  onClose,
  children,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}: ModalProps) => {
  useHotkeys(
    modals.MODAL_BUTTON_HOTKEYS[primaryButtonText ?? modals.MODAL_BUTTON_TYPES.Close],
    () => onPrimaryButtonClick?.(),
    {
      preventDefault: true,
      enabled: Boolean(primaryButtonText) && Boolean(onPrimaryButtonClick),
      enableOnFormTags: true,
    },
    [onPrimaryButtonClick],
  );
  useHotkeys(
    modals.MODAL_BUTTON_HOTKEYS[secondaryButtonText ?? modals.MODAL_BUTTON_TYPES.Close],
    () => onSecondaryButtonClick?.(),
    {
      preventDefault: true,
      enabled: Boolean(secondaryButtonText) && Boolean(onSecondaryButtonClick),
      enableOnFormTags: true,
    },
    [onSecondaryButtonClick],
  );

  return (
    <Reactmodal isOpen onRequestClose={onClose}>
      <Draggable handle=".modal__container" bounds="body">
        <div className={classNames(className, 'modal__container')}>
          <div className="modal__header">
            <h5 className="modal__title">{title}</h5>
            <button className="modal__close-button" onClick={onClose}></button>
          </div>

          <div className="modal__content">{children}</div>

          <div className="modal__footer">
            {primaryButtonText && (
              <button
                onClick={onPrimaryButtonClick}
                dangerouslySetInnerHTML={{ __html: modals.MODAL_BUTTON_HTMLS[primaryButtonText] }}
              ></button>
            )}
            {secondaryButtonText && (
              <button
                onClick={onSecondaryButtonClick}
                dangerouslySetInnerHTML={{ __html: modals.MODAL_BUTTON_HTMLS[secondaryButtonText] }}
              ></button>
            )}
          </div>
        </div>
      </Draggable>
    </Reactmodal>
  );
};

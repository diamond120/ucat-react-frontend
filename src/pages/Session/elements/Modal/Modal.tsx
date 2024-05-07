import type { ModalProps } from './Modal.types';

import React from 'react';
import Reactmodal from 'react-modal';
import Draggable from 'react-draggable';
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
  return (
    <Reactmodal isOpen>
      <Draggable handle=".modal__container" bounds="body">
        <div className={classNames(className, 'modal__container')}>
          <div className="modal__header">
            <h5 className="modal__title">{title}</h5>
            <button className="modal__close-button" onClick={onClose}></button>
          </div>

          <div className="modal__content">{children}</div>

          <div className="modal__footer">
            {primaryButtonText && <button onClick={onPrimaryButtonClick}>{primaryButtonText}</button>}
            {secondaryButtonText && <button onClick={onSecondaryButtonClick}>{secondaryButtonText}</button>}
          </div>
        </div>
      </Draggable>
    </Reactmodal>
  );
};

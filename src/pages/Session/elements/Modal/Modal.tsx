import type { ModalProps } from './Modal.types';

import React from 'react';
import Reactmodal from 'react-modal';
import Draggable from "react-draggable";
import './_modal.scss';

Reactmodal.setAppElement('#root');

export const Modal = ({ title, onClose, children }: ModalProps) => {
  return (
    <Reactmodal isOpen>
      <Draggable handle=".modal__container" bounds="body">
        <div className="modal__container">
          <div className="modal__header">
            <h5 className="modal__title">{title}</h5>
            <button className="modal__close-button" onClick={onClose}></button>
          </div>
          <div className="modal__content">{children}</div>
          <div className="modal__footer">
            <button>Yes</button>
            <button>No</button>
          </div>
        </div>
      </Draggable>
    </Reactmodal>
  );
};

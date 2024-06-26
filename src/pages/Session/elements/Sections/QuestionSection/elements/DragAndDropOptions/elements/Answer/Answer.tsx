import type { AnswerProps } from './Answer.types';
import type { DragItem } from '../../DragAndDropOptions.types';

import React from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';
import * as constants from '../../DragAndDrop.constants';
import './_answer.scss';

export const Answer = ({ id, text, hidden, disableDrag, onEnd }: AnswerProps) => {
  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>(
    () => ({
      type: constants.DragDropTypes.ANSWER,
      item: { id, text },
      canDrag: () => !disableDrag,
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (!dropResult) {
          onEnd?.(item);
        }
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [text],
  );

  return (
    <div
      className={classNames('answer', { 'answer__is-dragging': isDragging, 'answer__is-hidden': hidden })}
      ref={drag}
    >
      {text}
    </div>
  );
};

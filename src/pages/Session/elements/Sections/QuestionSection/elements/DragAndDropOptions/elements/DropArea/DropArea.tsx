import type { DropAreaProps } from './DropArea.types';
import type { DragItem } from '../../DragAndDropOptions.types';

import React from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import * as constants from '../../DragAndDrop.constants';
import './_drop-area.scss';

export const DropArea = ({ onDrop, children, id }: DropAreaProps) => {
  const [{ isOver }, drop] = useDrop<DragItem, { dropped: boolean }, { isOver: boolean }>(
    () => ({
      accept: constants.DragDropTypes.ANSWER,
      drop: (item) => {
        onDrop(item, id);
        return { dropped: true };
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [onDrop, id],
  );

  return (
    <div
      className={classNames('drop-area', { 'drop-area__is-over': isOver, 'drop-area__is-dropped': Boolean(children) })}
      ref={drop}
    >
      {children}
    </div>
  );
};

export const ResetArea = ({ onReset }: { onReset: () => void }) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: constants.DragDropTypes.ANSWER,
      drop: () => onReset(),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [onReset],
  );

  return (
    <div ref={drop} style={{ minHeight: '50px', backgroundColor: isOver ? 'red' : 'lightcoral', padding: '10px' }}>
      Drag here to cancel the answer
    </div>
  );
};

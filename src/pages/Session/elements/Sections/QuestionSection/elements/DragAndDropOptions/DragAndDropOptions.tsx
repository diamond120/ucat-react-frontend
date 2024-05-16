import type { DragAndDropOptionsProps, DragItem } from './DragAndDropOptions.types';

import React, { useMemo, useCallback } from 'react';
import classNames from 'classnames';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Answer, DropArea } from './elements';
import './_drag-and-drop-options.scss';

export const DragAndDropOptions = ({
  question,
  value: selectedValue,
  shouldHideSelectedOption,
  onChange,
}: DragAndDropOptionsProps) => {
  const dragAndDropOptions = useMemo(() => {
    try {
      const optionLabels = JSON.parse(question.options || '[]') as string[];
      const values = JSON.parse(selectedValue || '[]') as (string | null)[];

      return optionLabels.map((optionLabel, index) => ({
        label: optionLabel,
        value: values[index] ?? null,
      }));
    } catch (error) {
      return [];
    }
  }, [question.options, selectedValue]);

  const dragAndDropValues = useMemo(() => {
    try {
      return JSON.parse(question.actions || '["Yes", "No"]') as string[];
    } catch (error) {
      return [];
    }
  }, [question.actions]);

  const handleDrop = useCallback(
    (item: DragItem, index: number) => {
      const newAnswers = dragAndDropOptions.map(({ value }) => value);
      newAnswers[index] = item.text;
      if (item.id !== undefined && item.id >= 0) {
        newAnswers[item.id] = null;
      }
      onChange(JSON.stringify(newAnswers));
    },
    [dragAndDropOptions, onChange],
  );

  const handleDropOut = useCallback(
    (item: DragItem) => {
      const newAnswers = dragAndDropOptions.map(({ value }) => value);
      if (item.id !== undefined) {
        newAnswers[item.id] = null;
      }
      onChange(JSON.stringify(newAnswers));
    },
    [dragAndDropOptions, onChange],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={classNames({
          drag_and_drop_options__container: true,
          'drag_and_drop_options__container-is--long': Boolean(question.actions?.length),
        })}
      >
        <div className="drag_and_drop_options__questions">
          {dragAndDropOptions.map((option, index) => (
            <div className="drag_and_drop_options__questions-item" key={index}>
              <div className="drag_and_drop_options__questions-item--label">{option.label}</div>
              <div className="drag_and_drop_options__questions-item--value">
                <DropArea id={index} onDrop={handleDrop}>
                  {option.value && <Answer id={index} text={option.value} onEnd={handleDropOut} />}
                </DropArea>
              </div>
            </div>
          ))}
        </div>

        <div className="drag_and_drop_options__answers">
          {dragAndDropValues.map((text) => (
            <Answer
              key={text}
              text={text}
              hidden={shouldHideSelectedOption && dragAndDropOptions.some(({ value }) => value === text)}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

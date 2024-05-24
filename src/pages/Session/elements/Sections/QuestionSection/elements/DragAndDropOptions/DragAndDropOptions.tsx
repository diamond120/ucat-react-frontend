import type { DragAndDropOptionsProps, DragItem } from './DragAndDropOptions.types';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Answer, DropArea } from './elements';
import './_drag-and-drop-options.scss';

export const DragAndDropOptions = ({
  question,
  value: selectedValue,
  isSessionCompleted,
  onChange,
}: DragAndDropOptionsProps) => {
  const [currentValue, setCurrentValue] = useState<string>(selectedValue);

  useEffect(() => {
    setCurrentValue(selectedValue);
  }, [question, selectedValue]);

  const dragAndDropOptions = useMemo(() => {
    try {
      const optionLabels = JSON.parse(question.options || '[]') as string[];
      const answers = JSON.parse(question.answer || '[]') as string[];
      const values = JSON.parse(currentValue || '[]') as (string | null)[];

      return optionLabels.map((optionLabel, index) => ({
        label: optionLabel,
        answer: answers[index] ?? null,
        value: values[index] ?? null,
      }));
    } catch (error) {
      return [];
    }
  }, [question.options, currentValue]);

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
      setCurrentValue(JSON.stringify(newAnswers));
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
      setCurrentValue(JSON.stringify(newAnswers));
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
                  {option.value && (
                    <Answer id={index} text={option.value} disableDrag={isSessionCompleted} onEnd={handleDropOut} />
                  )}
                </DropArea>
              </div>
              {isSessionCompleted && (
                <span
                  className={classNames({
                    'drag_and_drop_options__questions-item--feedback': true,
                    'drag_and_drop_options__questions-item--feedback-correct': option.answer === option.value,
                  })}
                >
                  {option.answer === option.value ? 'Correct answer' : 'Incorrect answer'}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="drag_and_drop_options__answers">
          {dragAndDropValues.map((text) => (
            <Answer
              key={text}
              text={text}
              hidden={Boolean(question.actions?.length) && dragAndDropOptions.some(({ value }) => value === text)}
              disableDrag={isSessionCompleted}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

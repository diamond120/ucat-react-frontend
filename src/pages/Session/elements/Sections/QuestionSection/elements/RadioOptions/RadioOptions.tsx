import type { RadioOptionsProps } from './RadioOptions.types';

import React, { useState, useMemo, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import './_radio-options.scss';

export const RadioOptions = ({ question, value: selectedValue, isSessionCompleted, onChange }: RadioOptionsProps) => {
  const [currentValue, setCurrentValue] = useState<string | null>(selectedValue);

  useEffect(() => {
    setCurrentValue(selectedValue);
  }, [question, selectedValue]);

  const handleChange = (value: string) => () => {
    if (!isSessionCompleted) {
      const formattedValue = JSON.stringify(value);
      const checkedValue = formattedValue === currentValue ? null : formattedValue;
      setCurrentValue(checkedValue);
      onChange(checkedValue);
    }
  };

  const radioOptions = useMemo(() => {
    try {
      const optionLabels = JSON.parse(question.options || '[]') as string[];
      const optionImages = JSON.parse(question.option_image_urls || '[]') as string[];

      return optionLabels.map((optionLabel, index) => ({
        value: String.fromCharCode(65 + index),
        label: optionLabel,
        image: optionImages?.[index] || '',
      }));
    } catch (error) {
      return [];
    }
  }, [question.options, question.option_image_urls]);

  useHotkeys(
    radioOptions.map((option) => option.value).join(','),
    (_, handler) => {
      const key = handler.keys?.[0].toUpperCase();
      if (key) {
        handleChange(key)();
      }
    },
    { preventDefault: true, enableOnFormTags: true },
  );

  return (
    <div className="radio_options__container" role="radiogroup" aria-labelledby="questionLabel">
      {radioOptions.map(({ label, value, image }, index) => (
        <div className="radio_options__item" key={value}>
          <label>
            <input
              type="radio"
              name="options"
              value={value}
              checked={currentValue !== null && value === JSON.parse(currentValue)}
              onClick={handleChange(value)}
              aria-labelledby={`optionLabel${index}`}
              readOnly
            />
            {value}.{' '}
            <span className="radio_options__item--label" aria-hidden="true">
              {label}
            </span>
            {image && <img src={image} alt="" aria-hidden="true" />}
            {isSessionCompleted && (
              <div className="radio_options__item-feedback">
                {JSON.parse(question.answer) === value && (
                  <span className="radio_options__item-feedback--correct">Correct answer</span>
                )}
                {selectedValue !== null && JSON.parse(selectedValue) === value && (
                  <span className="radio_options__item-feedback--yours">Your answer</span>
                )}
              </div>
            )}
          </label>
        </div>
      ))}
    </div>
  );
};

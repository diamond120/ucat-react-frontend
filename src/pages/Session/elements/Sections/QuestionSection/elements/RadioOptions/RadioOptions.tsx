import type { RadioOptionsProps } from './RadioOptions.types';

import React, { useMemo } from 'react';
import './_radio-options.scss';

export const RadioOptions = ({ question, value: selectedValue, onChange }: RadioOptionsProps) => {
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

  return (
    <div className="radio_options__container" role="radiogroup" aria-labelledby="questionLabel">
      {radioOptions.map(({ label, value, image }, index) => (
        <div className="radio_options__item" key={value}>
          <label>
            <input
              type="radio"
              name="options"
              value={value}
              checked={value === selectedValue}
              onChange={() => onChange(value)}
              aria-labelledby={`optionLabel${index}`}
            />
            {value}.{' '}
            <span className="radio_options__item--label" aria-hidden="true">
              {label}
            </span>
            {image && <img src={image} alt="" aria-hidden="true" />}
          </label>
        </div>
      ))}
    </div>
  );
};

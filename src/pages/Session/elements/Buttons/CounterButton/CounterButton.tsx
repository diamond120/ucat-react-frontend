import type { CounterButtonProps } from './CounterButton.types';

import React, { useMemo, useState } from 'react';
import './_counter-button.scss';

export const CounterButton = ({ currentIndex, totalCount }: CounterButtonProps) => {
  const [isVisibleContent, setIsVisibleContent] = useState<boolean>(true);

  const buttonContent = useMemo(() => {
    if (isVisibleContent) {
      return `${currentIndex} of ${totalCount}`;
    }

    return null;
  }, [isVisibleContent, currentIndex, totalCount]);

  const handleButtonClick = () => setIsVisibleContent(!isVisibleContent);

  return (
    <button className="counter-button" onClick={handleButtonClick}>
      {buttonContent}
    </button>
  );
};

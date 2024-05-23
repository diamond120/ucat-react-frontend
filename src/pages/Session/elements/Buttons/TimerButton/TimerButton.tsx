import type { TimerButtonProps } from './TimerButton.types';

import React, { useState, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import * as constants from './TimerButton.constants';
import './_timer-button.scss';

export const TimerButton = ({ id, duration, warning = constants.WARNING_SECONDS, onTimeExpired }: TimerButtonProps) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(duration > 0 ? duration : 0);
  const [isVisibleContent, setIsVisibleContent] = useState<boolean>(true);

  useEffect(() => {
    if (timeRemaining > 0) {
      const intervalId = setInterval(() => {
        setTimeRemaining((timeRemaining) => timeRemaining - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeRemaining]);

  useEffect(() => {
    setTimeRemaining(duration);
  }, [id]);

  const buttonContent = useMemo(() => {
    if (isVisibleContent) {
      const minutes = Math.floor(timeRemaining / 60);
      const remainingSeconds = timeRemaining % 60;
      return timeRemaining
        ? `Time Remaining ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
        : 'Time Expired';
    }

    return null;
  }, [isVisibleContent, timeRemaining]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeExpired?.();
    }
  }, [timeRemaining]);

  const handleButtonClick = () => setIsVisibleContent(!isVisibleContent);

  return (
    <button
      className={classNames({ 'timer-button': true, 'timer-button--warning': timeRemaining <= warning })}
      onClick={handleButtonClick}
    >
      {buttonContent}
    </button>
  );
};

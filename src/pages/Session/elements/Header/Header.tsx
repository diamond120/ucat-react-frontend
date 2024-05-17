import type { HeaderProps } from './Header.types';

import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from 'features/sessions/selectors';
import { TimerButton, CounterButton } from '../Buttons';
import './_header.scss';

export const Header = ({ onTimeExpired, isSessionCompleted }: HeaderProps) => {
  const currentPackage = useSelector(selectors.selectCurrentPackage);
  const currentSession = useSelector(selectors.selectCurrentSession);
  const currentQuesstionIndex = useSelector(selectors.selectCurrentQuestionIndex);

  return (
    <>
      <div className="header__container">
        <h3 className="header__title">{currentPackage?.name}</h3>

        {currentSession.section_id && currentQuesstionIndex && (
          <div className="header__buttons">
            {!isSessionCompleted && (
              <TimerButton duration={currentSession.remaining_time} onTimeExpired={onTimeExpired} />
            )}
            <CounterButton currentIndex={currentQuesstionIndex.current + 1} totalCount={currentQuesstionIndex.total} />
          </div>
        )}
      </div>
    </>
  );
};

import type { HeaderProps } from './Header.types';

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import * as selectors from 'features/sessions/selectors';
import { SessionSectionType } from '../../Session.constants';
import { TimerButton, CounterButton } from '../Buttons';
import './_header.scss';

export const Header = ({ onTimeExpired, isSessionCompleted, sectionType, packageInstructionIndex }: HeaderProps) => {
  const currentPackage = useSelector(selectors.selectCurrentPackage);
  const currentSession = useSelector(selectors.selectCurrentSession);
  const currentQuestionIndex = useSelector(selectors.selectCurrentQuestionIndex);

  const timerButton = useMemo(() => {
    if (isSessionCompleted) {
      return null;
    }

    if (sectionType === SessionSectionType.PACKAGE_INSTRUCTION) {
      return packageInstructionIndex > 1 ? (
        <TimerButton id={uuid()} duration={120} warning={120} onTimeExpired={onTimeExpired} />
      ) : null;
    }

    if (sectionType === SessionSectionType.SECTION_INSTRUCTION) {
      return <TimerButton id={uuid()} duration={60} warning={60} onTimeExpired={onTimeExpired} />;
    }

    if (sectionType === SessionSectionType.QUESTION) {
      return <TimerButton duration={currentSession.remaining_time} onTimeExpired={onTimeExpired} />;
    }

    return null;
  }, [isSessionCompleted, sectionType, packageInstructionIndex, currentSession.remaining_time, onTimeExpired]);

  const counterButton = useMemo(() => {
    if (isSessionCompleted) {
      return null;
    }

    if (sectionType === SessionSectionType.QUESTION && currentQuestionIndex) {
      return <CounterButton currentIndex={currentQuestionIndex.current + 1} totalCount={currentQuestionIndex.total} />;
    }

    return null;
  }, [isSessionCompleted, sectionType, currentQuestionIndex]);

  return (
    <>
      <div className="header__container">
        <h3 className="header__title">{currentPackage?.name}</h3>

        <div className="header__buttons">
          {timerButton}
          {counterButton}
        </div>
      </div>
    </>
  );
};

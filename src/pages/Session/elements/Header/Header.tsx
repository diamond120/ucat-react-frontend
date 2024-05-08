import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from 'features/sessions/selectors';
import { CounterButton } from '../Buttons';
import './_header.scss';

export const Header = () => {
  const currentPackage = useSelector(selectors.selectCurrentPackage);
  const currentQuesstionIndex = useSelector(selectors.selectCurrentQuestionIndex);

  return (
    <div className="header__container">
      <h3 className="header__title">{currentPackage?.name}</h3>

      {currentQuesstionIndex && (
        <div className="header__buttons">
          <CounterButton currentIndex={currentQuesstionIndex.current + 1} totalCount={currentQuesstionIndex.total} />
        </div>
      )}
    </div>
  );
};

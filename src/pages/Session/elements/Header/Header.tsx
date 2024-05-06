import React from 'react';
import { CounterButton } from '../Buttons';
import './_header.scss';

export const Header = () => {
  return (
    <div className="header__container">
      <h3 className="header__title">Verbal Reasoning</h3>
      <div className="header__buttons">
        <CounterButton currentIndex={1} totalCount={44} />
      </div>
    </div>
  );
};

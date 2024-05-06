import React from 'react';
import { SubHeaderButton } from '../Buttons';
import './_sub-header.scss';

export const SubHeader = () => {
  return (
    <div className="sub-header__container">
      <div className="sub-header__buttons">
        <SubHeaderButton type="answer" />
        <SubHeaderButton type="calculator" />
      </div>
      <div className="sub-header__buttons">
        <SubHeaderButton type="flag" />
      </div>
    </div>
  );
};

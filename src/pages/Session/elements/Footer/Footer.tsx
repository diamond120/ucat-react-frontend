import type { FooterProps } from './Footer.types';

import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from 'features/sessions/selectors';
import { FooterButton } from '../Buttons';
import './_footer.scss';

export const Footer = ({ onQuestionChange }: FooterProps) => {
  const currentSection = useSelector(selectors.selectCurrentSection);
  const prevQuestionId = useSelector(selectors.selectPrevQuestionId);
  const nextQuestionId = useSelector(selectors.selectNextQuestionId);

  return (
    <div className="footer__container">
      <div className="footer__buttons">
        <div className="footer__button-right">
          <FooterButton type="end" />
        </div>
      </div>
      <div className="footer__buttons">
        {prevQuestionId && (
          <div className="footer__button-left">
            <FooterButton type="prev" onClick={onQuestionChange(prevQuestionId)} />
          </div>
        )}
        {currentSection && (
          <div className="footer__button-left">
            <FooterButton type="navigator" />
          </div>
        )}
        <div className="footer__button-left">
          <FooterButton type="next" onClick={onQuestionChange(nextQuestionId)} />
        </div>
      </div>
    </div>
  );
};

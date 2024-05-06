import React from 'react';
import { FooterButton } from '../Buttons';
import './_footer.scss';

export const Footer = () => {
  return (
    <div className="footer__container">
      <div className="footer__buttons">
        <div className="footer__button-right">
          <FooterButton type="end" />
        </div>
      </div>
      <div className="footer__buttons">
        <div className="footer__button-left">
          <FooterButton type="prev" />
        </div>
        <div className="footer__button-left">
          <FooterButton type="navigator" />
        </div>
        <div className="footer__button-left">
          <FooterButton type="next" />
        </div>
      </div>
    </div>
  );
};

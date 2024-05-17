import type { FooterProps } from './Footer.types';

import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from 'features/sessions/selectors';
import { FooterButton } from '../Buttons';
import { SessionSectionType } from '../../Session.constants';
import './_footer.scss';

export const Footer = ({
  sectionType,
  isSessionCompleted,
  isHotkeyDisabled,
  onSectionChange,
  onQuestionChange,
  onBeginExamModalToggle,
  onEndExamModalToggle,
  onEndSectionModalToggle,
  onNavigatorModalToggle,
}: FooterProps) => {
  const currentSection = useSelector(selectors.selectCurrentSection);
  const prevQuestionId = useSelector(selectors.selectPrevQuestionId);
  const nextQuestionId = useSelector(selectors.selectNextQuestionId);
  const isQuestionResponseLoading = useSelector(selectors.selectIsQuestionResponseLoading);

  const navigatePrev = () => {
    if (prevQuestionId) {
      onQuestionChange(prevQuestionId);
    }
  };

  const navigateNext = () => {
    if (sectionType === SessionSectionType.PACKAGE_INSTRUCTION) {
      onBeginExamModalToggle(true)();
    } else if (nextQuestionId) {
      onQuestionChange(nextQuestionId);
    } else {
      onQuestionChange(currentSection?.questions[0].id ?? null);
    }
  };

  const returnToOverview = () => {
    onSectionChange(null);
  };

  if (sectionType === SessionSectionType.OVERVIEW) return null;

  return (
    <>
      <div className="footer__container">
        <div className="footer__buttons">
          {sectionType === SessionSectionType.PACKAGE_INSTRUCTION && (
            <div className="footer__button-right">
              <FooterButton type="end_exam" onClick={onEndExamModalToggle(true)} isHotkeyDisabled={isHotkeyDisabled} />
            </div>
          )}
          {sectionType === SessionSectionType.QUESTION && (
            <div className="footer__button-right">
              {isSessionCompleted ? (
                <FooterButton type="return_overview" onClick={returnToOverview} isHotkeyDisabled={isHotkeyDisabled} />
              ) : (
                <FooterButton
                  type="end_section"
                  onClick={onEndSectionModalToggle(true)}
                  isHotkeyDisabled={isHotkeyDisabled}
                />
              )}
            </div>
          )}
        </div>

        <div className="footer__buttons">
          {prevQuestionId && (
            <div className="footer__button-left">
              <FooterButton
                type="prev"
                onClick={navigatePrev}
                isDisabled={isQuestionResponseLoading}
                isHotkeyDisabled={isHotkeyDisabled}
              />
            </div>
          )}
          {sectionType === SessionSectionType.QUESTION && currentSection && !isSessionCompleted && (
            <div className="footer__button-left">
              <FooterButton
                type="navigator"
                onClick={onNavigatorModalToggle(true)}
                isDisabled={isQuestionResponseLoading}
                isHotkeyDisabled={isHotkeyDisabled}
              />
            </div>
          )}
          {(sectionType === SessionSectionType.PACKAGE_INSTRUCTION || nextQuestionId) && (
            <div className="footer__button-left">
              <FooterButton
                type="next"
                onClick={navigateNext}
                isDisabled={isQuestionResponseLoading}
                isHotkeyDisabled={isHotkeyDisabled}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

import type { FooterProps } from './Footer.types';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as selectors from 'features/sessions/selectors';
import { FooterButton } from '../Buttons';
import { Modal } from '../Modal';
import { Navigator } from '../Sections';
import { SessionSectionType } from '../../Session.constants';
import * as routes from 'constants/routes';
import './_footer.scss';

export const Footer = ({ sectionType, onSectionQuestionChange }: FooterProps) => {
  const navigate = useNavigate();
  const currentSection = useSelector(selectors.selectCurrentSection);
  const prevSection = useSelector(selectors.selectPrevSection);
  const nextSection = useSelector(selectors.selectNextSection);
  const prevQuestionId = useSelector(selectors.selectPrevQuestionId);
  const nextQuestionId = useSelector(selectors.selectNextQuestionId);

  const [isBeginExamModalOpen, setIsBeginExamModalOpen] = useState<boolean>(false);
  const [isEndExamModalOpen, setIsEndExamModalOpen] = useState<boolean>(false);
  const [isNavigatorModalOpen, setIsNavigatorModalOpen] = useState<boolean>(false);

  const toggleBeginExamModal = (isOpen: boolean) => () => setIsBeginExamModalOpen(isOpen);
  const toggleEndExamModal = (isOpen: boolean) => () => setIsEndExamModalOpen(isOpen);
  const toggleNavigatorModal = (isOpen: boolean) => () => setIsNavigatorModalOpen(isOpen);

  const confirmBeginExam = () => {
    toggleBeginExamModal(false)();
    onSectionQuestionChange(null, nextSection?.id ?? null);
  };

  const confirmEndExam = () => {
    toggleEndExamModal(false)();
    navigate(routes.HOME);
  };

  const navigatePrev = () => {
    if (prevQuestionId) {
      onSectionQuestionChange(prevQuestionId, null);
      return;
    }

    if (!prevSection) {
      return;
    }

    if (sectionType === SessionSectionType.QUESTION) {
      onSectionQuestionChange(null, currentSection?.id ?? null);
      return;
    }

    const lastQuestionId = prevSection.questions[prevSection.questions.length - 1]?.id;
    onSectionQuestionChange(lastQuestionId, prevSection.id);
  };

  const navigateNext = () => {
    if (sectionType === SessionSectionType.PACKAGE_INSTRUCTION) {
      setIsBeginExamModalOpen(true);
    } else if (nextQuestionId) {
      onSectionQuestionChange(nextQuestionId, null);
    } else if (nextSection) {
      onSectionQuestionChange(null, nextSection.id);
    }
  };

  return (
    <>
      <div className="footer__container">
        <div className="footer__buttons">
          <div className="footer__button-right">
            <FooterButton type="end" onClick={toggleEndExamModal(true)} />
          </div>
        </div>
        <div className="footer__buttons">
          {(prevQuestionId || prevSection?.questions.length) && (
            <div className="footer__button-left">
              <FooterButton type="prev" onClick={navigatePrev} />
            </div>
          )}
          {currentSection && (
            <div className="footer__button-left">
              <FooterButton type="navigator" onClick={toggleNavigatorModal(true)} />
            </div>
          )}
          <div className="footer__button-left">
            <FooterButton type="next" onClick={navigateNext} />
          </div>
        </div>
      </div>

      {isBeginExamModalOpen && (
        <Modal
          title="Ready to Begin Exam"
          primaryButtonText="Yes"
          secondaryButtonText="No"
          onPrimaryButtonClick={confirmBeginExam}
          onSecondaryButtonClick={toggleBeginExamModal(false)}
          onClose={toggleBeginExamModal(false)}
        >
          If you are ready to begin the exam, select the Yes button. Otherwise, select the No button to return to the
          previous screen.
        </Modal>
      )}

      {isEndExamModalOpen && (
        <Modal
          title="End Exam"
          primaryButtonText="Yes"
          secondaryButtonText="No"
          onPrimaryButtonClick={confirmEndExam}
          onSecondaryButtonClick={toggleEndExamModal(false)}
          onClose={toggleEndExamModal(false)}
        >
          You have chosen to end this exam. Are you sure you want to end this exam?
        </Modal>
      )}

      {isNavigatorModalOpen && (
        <Modal
          className="navigator__modal"
          title="Navigator - select a qusetion to go to it"
          primaryButtonText="Close"
          onPrimaryButtonClick={toggleNavigatorModal(false)}
          onClose={toggleNavigatorModal(false)}
        >
          <Navigator navigateTo={onSectionQuestionChange} onEnd={toggleNavigatorModal(false)} />
        </Modal>
      )}
    </>
  );
};

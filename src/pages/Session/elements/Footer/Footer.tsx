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

export const Footer = ({ sectionType, isSessionCompleted, onSectionChange, onQuestionChange }: FooterProps) => {
  const navigate = useNavigate();
  const currentSection = useSelector(selectors.selectCurrentSection);
  const nextSection = useSelector(selectors.selectNextSection);
  const prevQuestionId = useSelector(selectors.selectPrevQuestionId);
  const nextQuestionId = useSelector(selectors.selectNextQuestionId);

  const [isBeginExamModalOpen, setIsBeginExamModalOpen] = useState<boolean>(false);
  const [isEndExamModalOpen, setIsEndExamModalOpen] = useState<boolean>(false);
  const [isEndSectionModalOpen, setIsEndSectionModalOpen] = useState<boolean>(false);
  const [isNavigatorModalOpen, setIsNavigatorModalOpen] = useState<boolean>(false);

  const toggleBeginExamModal = (isOpen: boolean) => () => setIsBeginExamModalOpen(isOpen);
  const toggleEndExamModal = (isOpen: boolean) => () => setIsEndExamModalOpen(isOpen);
  const toggleEndSectionModal = (isOpen: boolean) => () => setIsEndSectionModalOpen(isOpen);
  const toggleNavigatorModal = (isOpen: boolean) => () => setIsNavigatorModalOpen(isOpen);

  const confirmBeginExam = () => {
    toggleBeginExamModal(false)();
    onSectionChange(nextSection?.id ?? null);
  };

  const confirmEndExam = () => {
    toggleEndExamModal(false)();
    navigate(routes.HOME);
  };

  const confirmEndSection = () => {
    toggleEndSectionModal(false)();
    onSectionChange(nextSection?.id ?? null);
  };

  const navigatePrev = () => {
    if (prevQuestionId) {
      onQuestionChange(prevQuestionId);
    }
  };

  const navigateNext = () => {
    if (sectionType === SessionSectionType.PACKAGE_INSTRUCTION) {
      setIsBeginExamModalOpen(true);
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
              <FooterButton type="end_exam" onClick={toggleEndExamModal(true)} />
            </div>
          )}
          {sectionType === SessionSectionType.QUESTION && (
            <div className="footer__button-right">
              {isSessionCompleted ? (
                <FooterButton type="return_overview" onClick={returnToOverview} />
              ) : (
                <FooterButton type="end_section" onClick={toggleEndSectionModal(true)} />
              )}
            </div>
          )}
        </div>

        <div className="footer__buttons">
          {prevQuestionId && (
            <div className="footer__button-left">
              <FooterButton type="prev" onClick={navigatePrev} />
            </div>
          )}
          {sectionType === SessionSectionType.QUESTION && currentSection && (
            <div className="footer__button-left">
              <FooterButton type="navigator" onClick={toggleNavigatorModal(true)} />
            </div>
          )}
          {(sectionType === SessionSectionType.PACKAGE_INSTRUCTION || nextQuestionId) && (
            <div className="footer__button-left">
              <FooterButton type="next" onClick={navigateNext} />
            </div>
          )}
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

      {isEndSectionModalOpen && (
        <Modal
          title="End Section"
          primaryButtonText="Yes"
          secondaryButtonText="No"
          onPrimaryButtonClick={confirmEndSection}
          onSecondaryButtonClick={toggleEndSectionModal(false)}
          onClose={toggleEndSectionModal(false)}
        >
          You have chosen to end the current section. If you click Yes, you will NOT be able to return to this section.{' '}
          <br />
          <br />
          Are you sure you want to end this section?
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
          <Navigator navigateTo={onQuestionChange} onEnd={toggleNavigatorModal(false)} />
        </Modal>
      )}
    </>
  );
};

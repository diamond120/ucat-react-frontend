import { Question, Section } from 'features/sessions/types';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { useGetSessionQuery, useEndSessionMutation, usePutSelectionMutation } from 'features/sessions/api';
import { updateQuestionId } from 'features/sessions/reducers';
import * as selectors from 'features/sessions/selectors';
import { Loading } from 'components';
import { SessionSectionType } from './Session.constants';
import * as modals from 'constants/modals';
import {
  Header,
  SubHeader,
  Footer,
  QuestionSection,
  QuestionChips,
  PackageInstruction,
  SectionInstruction,
  OverviewSection,
  Modal,
  Calculator,
  Navigator,
  SubHeaderButton,
} from './elements';
import * as routes from 'constants/routes';
import './_session.scss';

export const Session = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { session_id = '' } = useParams<{ session_id: string }>();

  const { isLoading, isError, refetch: refetchSession } = useGetSessionQuery({ session_id });
  const [endSession, { isLoading: isEndingSession }] = useEndSessionMutation();
  const [navigateToSection, { isLoading: isNavigatingSection }] = usePutSelectionMutation();

  const currentSession = useSelector(selectors.selectCurrentSession);
  const currentQuestionResponse = useSelector(selectors.selectCurrentQuestionResponse);
  const nextSection = useSelector(selectors.selectNextSection);

  /*************************
   * Modal States
   *************************/
  const [isExplainModalOpen, setIsExplainModalOpen] = useState<boolean>(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState<boolean>(false);
  const [isBeginExamModalOpen, setIsBeginExamModalOpen] = useState<boolean>(false);
  const [isEndExamModalOpen, setIsEndExamModalOpen] = useState<boolean>(false);
  const [isEndSectionModalOpen, setIsEndSectionModalOpen] = useState<boolean>(false);
  const [isNavigatorModalOpen, setIsNavigatorModalOpen] = useState<boolean>(false);
  const [isTimeExpiredModalOpen, setIsTimeExpiredModalOpen] = useState<boolean>(false);

  const isHotkeyDisabled =
    isExplainModalOpen ||
    isCalculatorModalOpen ||
    isBeginExamModalOpen ||
    isEndExamModalOpen ||
    isEndSectionModalOpen ||
    isNavigatorModalOpen ||
    isTimeExpiredModalOpen;

  const handleExplainModalToggle = (isOpen: boolean) => () => setIsExplainModalOpen(isOpen);
  const handleCalculatorModalToggle = (isOpen: boolean) => () => setIsCalculatorModalOpen(isOpen);
  const handleBeginExamModalToggle = (isOpen: boolean) => () => setIsBeginExamModalOpen(isOpen);
  const handleEndExamModalToggle = (isOpen: boolean) => () => setIsEndExamModalOpen(isOpen);
  const handleEndSectionModalToggle = (isOpen: boolean) => () => setIsEndSectionModalOpen(isOpen);
  const handleNavigatorModalToggle = (isOpen: boolean) => () => setIsNavigatorModalOpen(isOpen);
  const handleTimeExpiredModalToggle = (isOpen: boolean) => () => setIsTimeExpiredModalOpen(isOpen);

  const handleBeginExamConfirm = () => {
    handleBeginExamModalToggle(false)();
    handleSectionChange(nextSection?.id ?? null);
  };

  const handleEndExamConfirm = () => {
    handleEndExamModalToggle(false)();
    navigate(routes.HOME);
  };

  const handleEndSectionConfirm = () => {
    handleEndSectionModalToggle(false)();
    handleSectionChange(nextSection?.id ?? null);
  };

  const handleTimeExpiredConfirm = () => {
    handleTimeExpiredModalToggle(false)();
    handleSectionChange(nextSection?.id ?? null);
  };

  useEffect(() => {
    isError && !currentSession.id && navigate(routes.RESTRICTED);
  }, [isError, currentSession.id, navigate]);

  const handleQuestionChange = useCallback(
    (questionId: Question['id'] | null) => {
      if (questionId) {
        dispatch(updateQuestionId(questionId));
      }
    },
    [dispatch],
  );

  const handleSectionChange = useCallback(
    async (sectionId: Section['id'] | null) => {
      try {
        if (sectionId) {
          await navigateToSection({ session_id, section_id: sectionId }).unwrap();
        } else {
          await endSession({ session_id }).unwrap();
        }

        refetchSession();
      } catch (error) {
        console.error('Error handling section change:', error);
        // Handle error appropriately
      }
    },
    [session_id, navigateToSection, endSession, refetchSession],
  );

  const sectionType = useMemo(() => {
    const { completed, section_id, question_id } = currentSession;

    if (completed) {
      if (question_id) {
        return SessionSectionType.QUESTION;
      }

      if (section_id) {
        return SessionSectionType.SECTION_INSTRUCTION;
      }

      return SessionSectionType.OVERVIEW;
    }

    if (question_id) {
      return SessionSectionType.QUESTION;
    }

    if (section_id) {
      return SessionSectionType.SECTION_INSTRUCTION;
    }

    return SessionSectionType.PACKAGE_INSTRUCTION;
  }, [currentSession.completed, currentSession.section_id, currentSession.question_id]);

  const sessionContent = useMemo(() => {
    switch (sectionType) {
      case SessionSectionType.PACKAGE_INSTRUCTION:
        return <PackageInstruction />;
      case SessionSectionType.SECTION_INSTRUCTION:
        return currentSession.section_id ? <SectionInstruction sectionId={currentSession.section_id} /> : null;
      case SessionSectionType.QUESTION:
        return currentSession.question_id ? (
          <>
            <QuestionSection
              sessionId={session_id}
              questionId={currentSession.question_id}
              isSessionCompleted={Boolean(currentSession.completed)}
            />
            {Boolean(currentSession.completed) && <QuestionChips onQuestionChange={handleQuestionChange} />}
          </>
        ) : null;
      case SessionSectionType.OVERVIEW:
        return <OverviewSection onQuestionChange={handleQuestionChange} />;
      default:
        return null;
    }
  }, [sectionType, currentSession.section_id, currentSession.question_id, session_id]);

  if (isLoading || !currentSession.id) {
    return <Loading />;
  }

  return (
    <>
      <div className="session__container">
        <Header
          onTimeExpired={handleTimeExpiredModalToggle(true)}
          isSessionCompleted={Boolean(currentSession.completed)}
        />
        <SubHeader
          sectionType={sectionType}
          isSessionCompleted={Boolean(currentSession.completed)}
          isHotkeyDisabled={isHotkeyDisabled}
          onExplainModalToggle={handleExplainModalToggle}
          onCalculatorModalToggle={handleCalculatorModalToggle}
        />
        <div className="session__content">{sessionContent}</div>
        <Footer
          sectionType={sectionType}
          isSessionCompleted={Boolean(currentSession.completed)}
          isHotkeyDisabled={isHotkeyDisabled}
          onSectionChange={handleSectionChange}
          onQuestionChange={handleQuestionChange}
          onBeginExamModalToggle={handleBeginExamModalToggle}
          onEndExamModalToggle={handleEndExamModalToggle}
          onEndSectionModalToggle={handleEndSectionModalToggle}
          onNavigatorModalToggle={handleNavigatorModalToggle}
        />
        {(isNavigatingSection || isEndingSession) && <Loading />}
      </div>

      {/* Modals */}
      {isCalculatorModalOpen && (
        <Modal
          className="calculator__modal"
          title={<SubHeaderButton type="calculator" isHotkeyDisabled={isHotkeyDisabled} />}
          onClose={handleCalculatorModalToggle(false)}
        >
          <Calculator />
        </Modal>
      )}

      {isExplainModalOpen && (
        <Modal
          className="explain__modal"
          title={<SubHeaderButton type="answer" isHotkeyDisabled={isHotkeyDisabled} />}
          onClose={handleExplainModalToggle(false)}
        >
          <div dangerouslySetInnerHTML={{ __html: currentQuestionResponse?.question.explanation ?? '' }} />
        </Modal>
      )}

      {isBeginExamModalOpen && (
        <Modal
          title="Ready to Begin Exam"
          primaryButtonText={modals.MODAL_BUTTON_TYPES.Yes}
          secondaryButtonText={modals.MODAL_BUTTON_TYPES.No}
          onPrimaryButtonClick={handleBeginExamConfirm}
          onSecondaryButtonClick={handleBeginExamModalToggle(false)}
          onClose={handleBeginExamModalToggle(false)}
        >
          If you are ready to begin the exam, select the Yes button. Otherwise, select the No button to return to the
          previous screen.
        </Modal>
      )}

      {isEndExamModalOpen && (
        <Modal
          title="End Exam"
          primaryButtonText={modals.MODAL_BUTTON_TYPES.Yes}
          secondaryButtonText={modals.MODAL_BUTTON_TYPES.No}
          onPrimaryButtonClick={handleEndExamConfirm}
          onSecondaryButtonClick={handleEndExamModalToggle(false)}
          onClose={handleEndExamModalToggle(false)}
        >
          You have chosen to end this exam. Are you sure you want to end this exam?
        </Modal>
      )}

      {isEndSectionModalOpen && (
        <Modal
          title="End Section"
          primaryButtonText={modals.MODAL_BUTTON_TYPES.Yes}
          secondaryButtonText={modals.MODAL_BUTTON_TYPES.No}
          onPrimaryButtonClick={handleEndSectionConfirm}
          onSecondaryButtonClick={handleEndSectionModalToggle(false)}
          onClose={handleEndSectionModalToggle(false)}
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
          primaryButtonText={modals.MODAL_BUTTON_TYPES.Close}
          onPrimaryButtonClick={handleNavigatorModalToggle(false)}
          onClose={handleNavigatorModalToggle(false)}
        >
          <Navigator navigateTo={handleQuestionChange} onEnd={handleNavigatorModalToggle(false)} />
        </Modal>
      )}

      {isTimeExpiredModalOpen && (
        <Modal
          title="Time Expired"
          primaryButtonText={modals.MODAL_BUTTON_TYPES.Ok}
          onPrimaryButtonClick={handleTimeExpiredConfirm}
          onClose={handleTimeExpiredConfirm}
        >
          Your time on this section has expired. Timing has begun on the next section. Click OK to continue.
        </Modal>
      )}
    </>
  );
};

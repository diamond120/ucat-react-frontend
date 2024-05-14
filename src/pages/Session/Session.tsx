import { Question, Section } from 'features/sessions/types';

import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { useGetSessionQuery, useEndSessionMutation, usePutSelectionMutation } from 'features/sessions/api';
import { updateQuestionId } from 'features/sessions/reducers';
import * as selectors from 'features/sessions/selectors';
import { Loading } from 'components';
import { SessionSectionType } from './Session.constants';
import {
  Header,
  SubHeader,
  Footer,
  QuestionSection,
  PackageInstruction,
  SectionInstruction,
  OverviewSection,
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
          <QuestionSection
            sessionId={session_id}
            questionId={currentSession.question_id}
            isSessionCompleted={Boolean(currentSession.completed)}
          />
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
    <div className="session__container">
      <Header onSectionChange={handleSectionChange} isSessionCompleted={Boolean(currentSession.completed)} />
      <SubHeader sectionType={sectionType} isSessionCompleted={Boolean(currentSession.completed)} />
      <div className="session__content">{sessionContent}</div>
      <Footer
        sectionType={sectionType}
        isSessionCompleted={Boolean(currentSession.completed)}
        onSectionChange={handleSectionChange}
        onQuestionChange={handleQuestionChange}
      />
      {(isNavigatingSection || isEndingSession) && <Loading />}
    </div>
  );
};

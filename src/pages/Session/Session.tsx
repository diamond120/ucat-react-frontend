import { Question, Section } from 'features/sessions/types';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSessionQuery, useEndSessionMutation, usePutSelectionMutation } from 'features/sessions/api';
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
  const { session_id = '' } = useParams<{ session_id: string }>();
  const { isLoading, isError, refetch: refetchSession } = useGetSessionQuery({ session_id });
  const [endSession, { isLoading: isEndingSession }] = useEndSessionMutation();
  const [navigateToSection, { isLoading: isNavigatingSection }] = usePutSelectionMutation();
  const currentSession = useSelector(selectors.selectCurrentSession);
  const [currentQuestionId, setCurrentQuestionId] = useState<Question['id'] | null>(currentSession.question_id);

  useEffect(() => {
    isError && !currentSession.id && navigate(routes.RESTRICTED);
  }, [isError, currentSession.id, navigate]);

  useEffect(() => {
    currentSession.question_id !== currentQuestionId && setCurrentQuestionId(currentSession.question_id);
  }, [currentSession.question_id]);

  const handleQuestionChange = useCallback(
    (questionId: Question['id'] | null) => {
      if (questionId) {
        setCurrentQuestionId(questionId);
      }
    },
    [session_id],
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
    const { completed, section_id } = currentSession;

    if (completed) {
      if (section_id && currentQuestionId) {
        return SessionSectionType.QUESTION;
      }

      if (section_id) {
        return SessionSectionType.SECTION_INSTRUCTION;
      }

      return SessionSectionType.OVERVIEW;
    }

    if (section_id && currentQuestionId) {
      return SessionSectionType.QUESTION;
    }

    if (section_id) {
      return SessionSectionType.SECTION_INSTRUCTION;
    }

    return SessionSectionType.PACKAGE_INSTRUCTION;
  }, [currentSession.completed, currentSession.section_id, currentQuestionId]);

  const sessionContent = useMemo(() => {
    switch (sectionType) {
      case SessionSectionType.PACKAGE_INSTRUCTION:
        return <PackageInstruction />;
      case SessionSectionType.SECTION_INSTRUCTION:
        return currentSession.section_id ? <SectionInstruction sectionId={currentSession.section_id} /> : null;
      case SessionSectionType.QUESTION:
        return currentQuestionId ? <QuestionSection sessionId={session_id} questionId={currentQuestionId} /> : null;
      case SessionSectionType.OVERVIEW:
        return <OverviewSection onSectionChange={handleSectionChange} />;
      default:
        return null;
    }
  }, [sectionType, currentSession.section_id, currentQuestionId, session_id]);

  if (isLoading || !currentSession.id) {
    return <Loading />;
  }

  return (
    <div className="session__container">
      <Header onSectionChange={handleSectionChange} isSessionCompleted={Boolean(currentSession.completed)} />
      <SubHeader sectionType={sectionType} isSessionCompleted={Boolean(currentSession.completed)} />
      <div className="session__content">{sessionContent}</div>
      <Footer sectionType={sectionType} onSectionChange={handleSectionChange} onQuestionChange={handleQuestionChange} />
      {(isNavigatingSection || isEndingSession) && <Loading />}
    </div>
  );
};

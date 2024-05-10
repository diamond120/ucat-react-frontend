import { Question, Section } from 'features/sessions/types';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSessionQuery, usePutSelectionMutation } from 'features/sessions/api';
import * as selectors from 'features/sessions/selectors';
import { Loading } from 'components';
import { SessionSectionType } from './Session.constants';
import { Header, SubHeader, Footer, QuestionSection, PackageInstruction, SectionInstruction } from './elements';
import * as routes from 'constants/routes';
import './_session.scss';

export const Session = () => {
  const navigate = useNavigate();
  const { session_id = '' } = useParams<{ session_id: string }>();
  const { isLoading, isError, refetch: refetchSession } = useGetSessionQuery({ session_id });
  const [navigateToSection, { isLoading: isNavigatingSection }] = usePutSelectionMutation();
  const currentSession = useSelector(selectors.selectCurrentSession);
  const [currentQuestionId, setCurrentQuestionId] = useState<Question['id'] | null>(currentSession?.question_id);

  const sectionType = useMemo(
    () =>
      currentSession?.section_id && currentQuestionId
        ? SessionSectionType.QUESTION
        : currentSession?.section_id
          ? SessionSectionType.SECTION_INSTRUCTION
          : SessionSectionType.PACKAGE_INSTRUCTION,
    [currentSession?.section_id, currentQuestionId],
  );

  useEffect(() => {
    isError && !currentSession?.id && navigate(routes.RESTRICTED);
  }, [isError, currentSession?.id, navigate]);

  useEffect(() => {
    currentSession?.question_id !== currentQuestionId && setCurrentQuestionId(currentSession.question_id);
  }, [currentSession?.question_id]);

  const handleSectionQuestionChange = useCallback(
    (questionId: Question['id'] | null, sectionId: Section['id'] | null) => {
      if (sectionId) {
        navigateToSection({ session_id, section_id: sectionId })
          .unwrap()
          .then(() => {
            refetchSession();
            questionId && setCurrentQuestionId(questionId);
          });
      } else {
        questionId && setCurrentQuestionId(questionId);
      }
    },
    [session_id],
  );

  if (isLoading || !currentSession?.id) {
    return <Loading />;
  }

  return (
    <div className="session__container">
      <Header />
      <SubHeader sectionType={sectionType} />
      <div className="session__content">
        {sectionType === SessionSectionType.PACKAGE_INSTRUCTION && <PackageInstruction />}
        {sectionType === SessionSectionType.SECTION_INSTRUCTION && (
          <SectionInstruction sectionId={currentSession.section_id!} />
        )}
        {sectionType === SessionSectionType.QUESTION && currentQuestionId && (
          <QuestionSection sessionId={session_id} questionId={currentQuestionId} />
        )}
      </div>
      <Footer sectionType={sectionType} onSectionQuestionChange={handleSectionQuestionChange} />
      {isNavigatingSection && <Loading />}
    </div>
  );
};

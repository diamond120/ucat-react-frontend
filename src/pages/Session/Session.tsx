import { Question } from 'features/sessions/types';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSessionQuery, useGetQuestionResponseQuery } from 'features/sessions/api';
import * as selectors from 'features/sessions/selectors';
import { Loading } from 'components';
import { Header, SubHeader, Footer } from './elements';
import * as routes from 'constants/routes';
import './_session.scss';

export const Session = () => {
  const navigate = useNavigate();

  const { session_id = '' } = useParams();

  const { isLoading, isError } = useGetSessionQuery({ session_id });

  const currentSession = useSelector(selectors.selectCurrentSession);

  const [currentQuestionId, setCurrentQuestionId] = useState<Question['id'] | null>(currentSession.question_id);

  const { data: questionResponse, isLoading: isQuestionLoading } = useGetQuestionResponseQuery(
    {
      session_id,
      question_id: currentQuestionId ?? 0,
    },
    {
      skip: !currentQuestionId,
      refetchOnMountOrArgChange: true,
    },
  );

  const handleQuestionChange = (questionId: Question['id'] | null) => () => {
    setCurrentQuestionId(questionId);
  };

  useEffect(() => {
    if (isError && !currentSession?.id) {
      navigate(routes.RESTRICTED);
    }
  }, [isError, currentSession.id]);

  useEffect(() => {
    if (currentSession.question_id !== currentQuestionId) {
      setCurrentQuestionId(currentSession.question_id);
    }
  }, [currentSession.question_id]);

  if (isLoading || !currentSession.id) {
    return <Loading />;
  }

  return (
    <div className="session__container">
      <Header />
      <SubHeader />
      <div className="session__content">{questionResponse?.question_id}</div>
      <Footer onQuestionChange={handleQuestionChange} />

      {isQuestionLoading && <Loading />}
    </div>
  );
};

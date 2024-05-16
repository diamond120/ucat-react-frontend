import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useGetQuestionResponseQuery } from 'features/sessions/api';
import * as routes from 'constants/routes';
import { Loading } from 'components';

export const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id') ?? '';
  const questionId = Number(searchParams.get('question_id'));

  const { isLoading: isLoadingQuestionResponse, isSuccess } = useGetQuestionResponseQuery(
    {
      session_id: sessionId,
      question_id: questionId,
    },
    {
      skip: !questionId,
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (sessionId && !questionId) {
      navigate(`${routes.SESSION}/${sessionId}`);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate(`${routes.SESSION}/${sessionId}`);
    }
  }, [isSuccess]);

  if (isLoadingQuestionResponse) {
    return <Loading />;
  }

  return null;
};

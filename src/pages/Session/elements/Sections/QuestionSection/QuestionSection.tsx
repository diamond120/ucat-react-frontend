import type { QuestionSectionProps } from './QuestionSection.types';

import React from 'react';
import { useGetQuestionResponseQuery } from 'features/sessions/api';
import { Loading } from 'components';
import './_question-section.scss';

export const QuestionSection = ({ sessionId, questionId }: QuestionSectionProps) => {
  const { data: question, isLoading } = useGetQuestionResponseQuery(
    {
      session_id: sessionId,
      question_id: questionId ?? 0,
    },
    {
      skip: !questionId,
      refetchOnMountOrArgChange: true,
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="question-section__container">
      <div className="question-section__header">
        <p>{question?.question.situation.text}</p>
      </div>

      <div className="question-section__content">
        {question?.question.text}
        {question?.question.options}
      </div>
    </div>
  );
};

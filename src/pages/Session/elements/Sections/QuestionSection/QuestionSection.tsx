import type { QuestionResponse } from 'features/sessions/types';
import type { QuestionSectionProps } from './QuestionSection.types';

import React from 'react';
import classNames from 'classnames';
import { useGetQuestionResponseQuery, usePutQuestionResponseMutation } from 'features/sessions/api';
import { Loading } from 'components';
import { RadioOptions } from './elements';
import './_question-section.scss';

export const QuestionSection = ({ sessionId, questionId }: QuestionSectionProps) => {
  const {
    data,
    isLoading,
    refetch: refetchQuestion,
  } = useGetQuestionResponseQuery(
    {
      session_id: sessionId,
      question_id: questionId,
    },
    {
      skip: !questionId,
      refetchOnMountOrArgChange: true,
    },
  );

  const [answerToQuestion, { isLoading: isAnsweringQuestion }] = usePutQuestionResponseMutation();

  const submitResponse = (value: QuestionResponse['value']) => {
    answerToQuestion({ session_id: sessionId, question_id: questionId, value, flagged: false })
      .unwrap()
      .then(() => {
        refetchQuestion();
      });
  };

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div className="question-section__container">
      <div
        className={classNames('question-section__content', {
          'question-section__content--split': data.question.situation.split,
        })}
      >
        <div className="question-section__situation">
          <div
            className="question-section__situation--text"
            dangerouslySetInnerHTML={{ __html: data.question.situation.text ?? '' }}
          />
          {data.question.situation.image_url && (
            <img className="question-section__situation--img" src={data.question.situation.image_url} />
          )}
        </div>

        <div className="question-section__question">
          <div
            className="question-section__question--text"
            dangerouslySetInnerHTML={{ __html: data.question.text ?? '' }}
          />
          {data.question.image_url && (
            <img className="question-section__situation--img" src={data.question.image_url} />
          )}

          <RadioOptions question={data.question} value={data.value} onChange={submitResponse} />
        </div>
      </div>
      {isAnsweringQuestion && <Loading />}
    </div>
  );
};

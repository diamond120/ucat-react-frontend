import type { QuestionResponse } from 'features/sessions/types';
import type { QuestionSectionProps } from './QuestionSection.types';

import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import * as selectors from 'features/sessions/selectors';
import { useGetQuestionResponseQuery, usePutQuestionResponseMutation } from 'features/sessions/api';
import { Loading } from 'components';
import { RadioOptions, DragAndDropOptions } from './elements';
import './_question-section.scss';

export const QuestionSection = ({ sessionId, questionId, isSessionCompleted }: QuestionSectionProps) => {
  const currentQuestionResponse = useSelector(selectors.selectCurrentQuestionResponse);
  const { isLoading: isLoadingQuestionResponse } = useGetQuestionResponseQuery(
    {
      session_id: sessionId,
      question_id: questionId,
    },
    {
      skip: !questionId,
      refetchOnMountOrArgChange: true,
    },
  );

  const [answerToQuestion] = usePutQuestionResponseMutation();

  const submitResponse = (value: QuestionResponse['value']) => {
    if (isSessionCompleted) {
      return;
    }

    answerToQuestion({
      session_id: sessionId,
      question_id: questionId,
      value,
      flagged: Boolean(currentQuestionResponse?.flagged),
    });
  };

  if (isLoadingQuestionResponse || !currentQuestionResponse) {
    return <Loading />;
  }

  return (
    <div className="question-section__container">
      <div
        className={classNames('question-section__content', {
          'question-section__content--split':
            currentQuestionResponse.question.situation.split && currentQuestionResponse.question.type !== 'DD',
        })}
      >
        <div className="question-section__situation">
          <div
            className="question-section__situation--text"
            dangerouslySetInnerHTML={{ __html: currentQuestionResponse.question.situation.text ?? '' }}
          />
          {currentQuestionResponse.question.situation.image_url && (
            <img
              className="question-section__situation--img"
              src={currentQuestionResponse.question.situation.image_url}
            />
          )}
        </div>

        <div className="question-section__question">
          <div
            className="question-section__question--text"
            dangerouslySetInnerHTML={{ __html: currentQuestionResponse.question.text ?? '' }}
          />
          {currentQuestionResponse.question.image_url && (
            <img className="question-section__situation--img" src={currentQuestionResponse.question.image_url} />
          )}

          {currentQuestionResponse.question.type === 'MC' && (
            <RadioOptions
              question={currentQuestionResponse.question}
              value={currentQuestionResponse.value}
              onChange={submitResponse}
            />
          )}

          {currentQuestionResponse.question.type === 'DD' && (
            <DragAndDropOptions
              question={currentQuestionResponse.question}
              value={currentQuestionResponse.value}
              onChange={submitResponse}
            />
          )}
        </div>
      </div>
    </div>
  );
};

import type { QuestionChipsProps } from './QuestionChips.types';

import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import * as selectors from 'features/sessions/selectors';
import './_question-chips.scss';
import { Question } from 'features/sessions/types';

export const QuestionChips = ({ onQuestionChange }: QuestionChipsProps) => {
  const currentSection = useSelector(selectors.selectCurrentSection);
  const currentQuestionResponse = useSelector(selectors.selectCurrentQuestionResponse);

  const handleQuestionNavigate = (questionId: Question['id']) => () => {
    if (questionId === currentQuestionResponse?.question_id) {
      return;
    }

    onQuestionChange(questionId);
  };

  if (!currentSection?.questions || !currentQuestionResponse) {
    return null;
  }

  return (
    <div className="question-chips__container">
      <h5>Abstract Reasoning</h5>
      <div className="question-chips__content">
        {currentSection.questions.map((question) => (
          <button
            key={question.id}
            className={classNames({
              'question-chips__chip': true,
              'question-chips__chip--current': question.id === currentQuestionResponse.question_id,
              'question-chips__chip--correct': question.score === 1 || question.score === 3,
              'question-chips__chip--incorrect': question.score === 0,
              'question-chips__chip--partially-correct': question.score === 2,
            })}
            onClick={handleQuestionNavigate(question.id)}
            disabled={question.id === currentQuestionResponse.question_id}
          >
            {question.duration}s
          </button>
        ))}
      </div>
    </div>
  );
};

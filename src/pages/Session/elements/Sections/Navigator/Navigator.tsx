import type { NavigatorProps } from './Navigator.types';
import type { Question } from 'features/sessions/types';

import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import * as selectors from 'features/sessions/selectors';
import { useGetSessionQuery } from 'features/sessions/api';
import './_navigator.scss';

export const Navigator = ({ navigateTo, onEnd }: NavigatorProps) => {
  const currentSession = useSelector(selectors.selectCurrentSession);
  const currentSection = useSelector(selectors.selectCurrentSection);
  const currentQuestionResponse = useSelector(selectors.selectCurrentQuestionResponse);
  const { isLoading } = useGetSessionQuery(
    { session_id: currentSession.id ?? '' },
    { skip: !currentSession.id, refetchOnMountOrArgChange: true },
  );

  const incompleteCount = useMemo(
    () =>
      currentSection?.questions.filter((question) => question.status === 'InComplete' || question.status === 'UnSeen')
        .length,
    [currentSection],
  );

  const navigateToQuestion = (questionId: Question['id'] | null) => () => {
    onEnd?.();
    navigateTo(questionId);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="navigator__container">
      <div className="navigator__content">
        <table className="navigator__table" border={1}>
          <thead>
            <tr>
              <th>Question #</th>
              <th>Status</th>
              <th>Flagged</th>
            </tr>
          </thead>
          <tbody>
            {currentSection &&
              currentSection.questions.map((question, questionIndex) => (
                <tr
                  key={questionIndex}
                  className={classNames({
                    'navigator__item-row': true,
                    'navigator__item-row--current': currentQuestionResponse?.question_id === question.id,
                  })}
                >
                  <td>
                    <a className="navigator__item-link" onClick={navigateToQuestion(question.id)}>
                      {`Question ${questionIndex + 1}`}
                    </a>
                  </td>
                  <td
                    className={classNames({
                      'navigator__item-status': true,
                      'navigator__item-status--incomplete': question.status === 'InComplete',
                      'navigator__item-status--unseen': question.status === 'UnSeen',
                    })}
                  >
                    {(question.status === 'InComplete' || question.status === 'UnSeen') && question.status}
                  </td>
                  <td>{Boolean(question.flagged) && <span className="navigator__item-flagged"></span>}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="navigator__footer">{incompleteCount} Unseen/Incomplete</div>
    </div>
  );
};

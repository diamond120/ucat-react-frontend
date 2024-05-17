import type { SubHeaderProps } from './SubHeader.types';

import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from 'features/sessions/selectors';
import { usePutQuestionResponseMutation } from 'features/sessions/api';
import { SubHeaderButton } from '../Buttons';
import { SessionSectionType } from '../../Session.constants';
import './_sub-header.scss';

export const SubHeader = ({
  sectionType,
  isSessionCompleted,
  isHotkeyDisabled,
  onExplainModalToggle,
  onCalculatorModalToggle,
}: SubHeaderProps) => {
  const currentQuestionResponse = useSelector(selectors.selectCurrentQuestionResponse);
  const currentSection = useSelector(selectors.selectCurrentSection);

  const [answerToQuestion] = usePutQuestionResponseMutation();

  const handleQuestionFlagging = () => {
    if (currentQuestionResponse) {
      const { session_id, question_id, flagged, value } = currentQuestionResponse;
      answerToQuestion({ session_id, question_id, value, flagged: !flagged });
    }
  };

  return (
    <React.Fragment>
      <div className="sub-header__container">
        {!isSessionCompleted && (
          <React.Fragment>
            <div className="sub-header__buttons">
              {isSessionCompleted && sectionType === SessionSectionType.QUESTION && (
                <SubHeaderButton type="answer" onClick={onExplainModalToggle(true)} />
              )}

              {currentSection && (
                <SubHeaderButton
                  type="calculator"
                  onClick={onCalculatorModalToggle(true)}
                  isHotkeyDisabled={isHotkeyDisabled}
                />
              )}
            </div>

            {sectionType === SessionSectionType.QUESTION && currentQuestionResponse && (
              <div className="sub-header__buttons">
                <SubHeaderButton
                  type="flag"
                  flagged={Boolean(currentQuestionResponse?.flagged)}
                  isHotkeyDisabled={isHotkeyDisabled}
                  onClick={handleQuestionFlagging}
                />
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

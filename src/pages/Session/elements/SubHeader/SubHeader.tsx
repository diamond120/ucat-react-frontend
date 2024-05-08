import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as selectors from 'features/sessions/selectors';
import { SubHeaderButton } from '../Buttons';
import { Calculator } from '../Calculator';
import { Modal } from '../Modal';
import './_sub-header.scss';

export const SubHeader = () => {
  const currentQuestionResponse = useSelector(selectors.selectCurrentQuestionResponse);

  const [isExplainModalOpen, setIsExplainModalOpen] = useState<boolean>(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState<boolean>(false);

  const handleExplainModalToggle = (isOpen: boolean) => () => setIsExplainModalOpen(isOpen);
  const handleCalculatorModalModalToggle = (isOpen: boolean) => () => setIsCalculatorModalOpen(isOpen);

  return (
    <React.Fragment>
      <div className="sub-header__container">
        <div className="sub-header__buttons">
          {currentQuestionResponse?.question.explanation && (
            <SubHeaderButton type="answer" onClick={handleExplainModalToggle(true)} />
          )}
          <SubHeaderButton type="calculator" onClick={handleCalculatorModalModalToggle(true)} />
        </div>
        {currentQuestionResponse && (
          <div className="sub-header__buttons">
            <SubHeaderButton type="flag" flagged={Boolean(currentQuestionResponse.flagged)} />
          </div>
        )}
      </div>

      {isCalculatorModalOpen && (
        <Modal
          className="calculator__modal"
          title={<SubHeaderButton type="calculator" />}
          onClose={handleCalculatorModalModalToggle(false)}
        >
          <Calculator />
        </Modal>
      )}

      {isExplainModalOpen && (
        <Modal
          className="explain__modal"
          title={<SubHeaderButton type="answer" />}
          onClose={handleExplainModalToggle(false)}
        >
          <div dangerouslySetInnerHTML={{ __html: currentQuestionResponse?.question.explanation ?? '' }} />
        </Modal>
      )}
    </React.Fragment>
  );
};

import React, { useState } from 'react';
import { SubHeaderButton } from '../Buttons';
import { Calculator } from '../Calculator';
import { Modal } from '../Modal';
import './_sub-header.scss';

export const SubHeader = () => {
  const [isExplainModalOpen, setIsExplainModalOpen] = useState<boolean>(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState<boolean>(false);

  const handleExplainModalToggle = (isOpen: boolean) => () => setIsExplainModalOpen(isOpen);
  const handleCalculatorModalModalToggle = (isOpen: boolean) => () => setIsCalculatorModalOpen(isOpen);

  return (
    <React.Fragment>
      <div className="sub-header__container">
        <div className="sub-header__buttons">
          <SubHeaderButton type="answer" onClick={handleExplainModalToggle(true)} />
          <SubHeaderButton type="calculator" onClick={handleCalculatorModalModalToggle(true)} />
        </div>
        <div className="sub-header__buttons">
          <SubHeaderButton type="flag" />
        </div>
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
          Correct response: A If the clinical guidelines state that an identification badge must be worn for patient
          contact, then this is clearly of great importance. Clinical guidelines are in place to protect the patients
          and public and ensure a standardised approach to effective and safe patient care. This consideration is
          therefore very important.
        </Modal>
      )}
    </React.Fragment>
  );
};

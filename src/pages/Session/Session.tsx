import React, { useState } from 'react';
import { Header, SubHeader, Footer, Modal, Calculator, SubHeaderButton } from './elements';
import './_session.scss';

export const Session = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleCalculatorOpen = () => setIsCalculatorOpen(true);
  const handleCalculatorClose = () => setIsCalculatorOpen(false);

  return (
    <div className="session__container">
      <Header />
      <SubHeader />
      <div className="session__content">
        <button onClick={handleCalculatorOpen}>Open Calculator</button>
        <button onClick={handleModalOpen}>Open Modal</button>
        {isCalculatorOpen && (
          <Modal title={<SubHeaderButton type="calculator" />} onClose={handleCalculatorClose}>
            <Calculator />
          </Modal>
        )}
        {isModalOpen && (
          <Modal title="Verbal Reasoning" onClose={handleModalClose}>
            If you are ready to begin the exam, select the Yes button. Otherwise, select the No button to return to the
            previous screen.
          </Modal>
        )}
      </div>
      <Footer />
    </div>
  );
};

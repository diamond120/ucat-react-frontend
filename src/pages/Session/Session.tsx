import React, { useState } from 'react';
import { Header, SubHeader, Footer, Modal } from './elements';
import './_session.scss';

export const Session = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="session__container">
      <Header />
      <SubHeader />
      <div className="session__content">
        <button onClick={handleModalOpen}>Open</button>
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

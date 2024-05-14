import type { HeaderProps } from './Header.types';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as selectors from 'features/sessions/selectors';
import { TimerButton, CounterButton } from '../Buttons';
import { Modal } from '../Modal';
import './_header.scss';

export const Header = ({ onSectionChange, isSessionCompleted }: HeaderProps) => {
  const currentPackage = useSelector(selectors.selectCurrentPackage);
  const currentSession = useSelector(selectors.selectCurrentSession);
  const nextSection = useSelector(selectors.selectNextSection);
  const currentQuesstionIndex = useSelector(selectors.selectCurrentQuestionIndex);

  const [isTimeExpiredModalOpen, setIsTimeExpiredModalOpen] = useState<boolean>(false);

  const onTimeExpired = () => setIsTimeExpiredModalOpen(true);

  const confirmTimeExpiredSection = () => {
    setIsTimeExpiredModalOpen(false);
    onSectionChange(nextSection?.id ?? null);
  };

  return (
    <>
      <div className="header__container">
        <h3 className="header__title">{currentPackage?.name}</h3>

        {currentSession.section_id && currentQuesstionIndex && (
          <div className="header__buttons">
            {!isSessionCompleted && (
              <TimerButton duration={currentSession.remaining_time} onTimeExpired={onTimeExpired} />
            )}
            <CounterButton currentIndex={currentQuesstionIndex.current + 1} totalCount={currentQuesstionIndex.total} />
          </div>
        )}
      </div>

      {isTimeExpiredModalOpen && (
        <Modal
          title="Time Expired"
          primaryButtonText="Ok"
          onPrimaryButtonClick={confirmTimeExpiredSection}
          onClose={confirmTimeExpiredSection}
        >
          Your time on this section has expired. Timing has begun on the next section. Click OK to continue.
        </Modal>
      )}
    </>
  );
};

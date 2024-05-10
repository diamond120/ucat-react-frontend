import type { NavigatorProps } from './Navigator.types';
import type { Question, Section } from 'features/sessions/types';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import * as selectors from 'features/sessions/selectors';
import { useGetSessionQuery } from 'features/sessions/api';
import './_navigator.scss';

type OpenSections = {
  [key: number]: boolean;
};

export const Navigator = ({ navigateTo, onEnd }: NavigatorProps) => {
  const currentSession = useSelector(selectors.selectCurrentSession);
  const { isLoading } = useGetSessionQuery(
    { session_id: currentSession.id ?? '' },
    { skip: !currentSession.id, refetchOnMountOrArgChange: true },
  );

  const [openSections, setOpenSections] = useState<OpenSections>({});

  useEffect(() => {
    const allOpen = currentSession.sections.reduce((sections, _, index) => ({ ...sections, [index]: true }), {});
    setOpenSections(allOpen);
  }, [currentSession.sections]);

  const toggleSection = (index: number) => () => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const navigateToSectionQuestion = (questionId: Question['id'] | null, sectionId: Section['id'] | null) => () => {
    onEnd?.();
    navigateTo(questionId, sectionId);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="navigator__container">
      <table className="navigator__table" border={1}>
        <thead>
          <tr>
            <th>Question #</th>
            <th>Status</th>
            <th>Flagged</th>
          </tr>
        </thead>
        <tbody>
          {currentSession.sections.map((section, index) => (
            <React.Fragment key={index}>
              <tr onClick={toggleSection(index)} className="navigator__toggle">
                <td colSpan={3}>
                  <h3
                    className={classNames('navigator__toggle-title', {
                      'navigator__toggle-title-is--opened': openSections[index],
                    })}
                  >
                    {`${currentSession.package?.type} ${currentSession.package?.id} - ${currentSession.package?.name} - ${section.name}`}
                  </h3>
                </td>
              </tr>
              {openSections[index] &&
                section.questions.map((question, questionIndex) => (
                  <tr key={questionIndex} className="navigator__item">
                    <td>
                      <a className="navigator__item-link" onClick={navigateToSectionQuestion(question.id, section.id)}>
                        {`Question ${questionIndex + 1}`}
                      </a>
                    </td>
                    <td>{question.status}</td>
                    <td></td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

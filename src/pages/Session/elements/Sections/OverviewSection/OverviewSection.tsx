import type { OverviewSectionProps } from './OverviewSection.types';
import type { Section } from 'features/sessions/types';

import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { updateSectionId } from 'features/sessions/reducers';
import * as selectors from 'features/sessions/selectors';
import './_overview-section.scss';

export const OverviewSection = ({ onQuestionChange }: OverviewSectionProps) => {
  const dispatch = useAppDispatch();
  const { sections } = useSelector(selectors.selectCurrentSession);

  const navigateToSection = (section: Section) => () => {
    dispatch(updateSectionId(section.id));
    onQuestionChange(section.questions[0].id);
  };

  return (
    <div className="overview-section__container">
      <div className="overview-section__header">
        <img src="/img/ucat.png" />
        <h5>UCAT Practice Test</h5>
      </div>

      <div className="overview-section__content">
        <h6>Summary Score Screen</h6>
        <p>You will not see this screen in the live exam.</p>
        <p>
          This screen is provided to help you understand how well you have done in the practice test. Some questions in
          Decision Making and the Situational Judgement Test use partial marking. Please note this screen only reports
          those questions you have answered fully correctly.
        </p>
        <h6>Number of correctly answered questions for each of the five subtests:</h6>
        <table className="overview-section__table">
          <thead>
            <tr>
              <th>Section</th>
              <th>
                Correct <br /> Answers
              </th>
              <th>
                Number of <br /> Questions
              </th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <tr key={section.id} className="overview-section__table-row">
                <td>
                  <a onClick={navigateToSection(section)} className="overview-section__table-row--link">
                    {section.name}
                  </a>
                </td>
                <td>0</td>
                <td>{section.questions.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Click the <strong>section</strong> to review the test.
        </p>
      </div>
    </div>
  );
};

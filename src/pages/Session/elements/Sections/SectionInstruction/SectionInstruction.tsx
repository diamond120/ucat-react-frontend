import type { SectionInstructionProps } from './SectionInstruction.types';

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as selectors from 'features/sessions/selectors';
import './_section-instruction.scss';

export const SectionInstruction = ({ sectionId }: SectionInstructionProps) => {
  const { sections } = useSelector(selectors.selectCurrentSession);

  const { currentSectionIndex, currentSection } = useMemo(() => {
    const currentSectionIndex = sections.findIndex((section) => section.id === sectionId);
    const currentSection = sections[currentSectionIndex];

    return { currentSectionIndex, currentSection };
  }, [sections]);

  return (
    <div className="section-instruction__container">
      <div className="section-instruction__header">
        <p>
          Section {currentSectionIndex + 1} - {currentSection.name}
        </p>
      </div>

      <div className="section-instruction__content">
        <h6>INSTRUCTIONS</h6>
        <p>You are presented with passages of text, each associated with four questions.</p>
        <p>You are presented with passages of text, each associated with four questions.</p>
        <ul>
          <li>
            a question or incomplete statement with four response options where you are required to pick the most
            suitable response.
          </li>
          <li>
            a question where you must determine, on the basis of the information in the passage, whether a statement is
            true, false or you can’t tell.
          </li>
        </ul>
        <p>
          Click the <strong>Next (N)</strong> button when you are ready to begin.
        </p>
      </div>
    </div>
  );
};

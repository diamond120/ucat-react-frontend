import type { SectionInstructionProps } from './SectionInstruction.types';

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as selectors from 'features/sessions/selectors';
import {
  VerbalReasoning,
  DecisionMaking,
  QuantitativeReasoning,
  AbstractReasoning,
  SituationalJudgement,
} from './elements';
import './_section-instruction.scss';

export const SectionInstruction = ({ sectionId }: SectionInstructionProps) => {
  const { sections } = useSelector(selectors.selectCurrentSession);

  const currentSection = useMemo(() => {
    const currentSectionIndex = sections.findIndex((section) => section.id === sectionId);
    return sections[currentSectionIndex];
  }, [sections]);

  const content = useMemo(() => {
    switch (currentSection.type) {
      case 'VR':
        return <VerbalReasoning section={currentSection} />;
      case 'DM':
        return <DecisionMaking section={currentSection} />;
      case 'QR':
        return <QuantitativeReasoning section={currentSection} />;
      case 'AR':
        return <AbstractReasoning section={currentSection} />;
      case 'SJ':
        return <SituationalJudgement section={currentSection} />;
      default:
        return null;
    }
  }, [currentSection]);

  return (
    <div className="section-instruction__container">
      <div className="section-instruction__content">{content}</div>
    </div>
  );
};

import type { PackageInstructionProps } from './PackageInstruction.types';

import React, { useMemo } from 'react';
import { Instruction1, Instruction2, Instruction3, Instruction4, Instruction5 } from './elements';
import './_package-instruction.scss';

export const PackageInstruction = ({ index }: PackageInstructionProps) => {
  const content = useMemo(() => {
    switch (index) {
      case 0:
        return <Instruction1 />;
      case 1:
        return <Instruction2 />;
      case 2:
        return <Instruction3 />;
      case 3:
        return <Instruction4 />;
      case 4:
        return <Instruction5 />;
      default:
        return null;
    }
  }, [index]);

  return (
    <div className="package-instruction__container">
      <div className="package-instruction__header">{index < 2 && <img src="/img/ucat.png" />}</div>
      {content}
    </div>
  );
};

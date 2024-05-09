import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from 'features/sessions/selectors';
import './_package-instruction.scss';

export const PackageInstruction = () => {
  const { package: currentPackage } = useSelector(selectors.selectCurrentSession);

  return (
    <div className="package-instruction__container">
      <div className="package-instruction__header">
        <img src="/img/ucat.png" />
        <h5>Welcome to the UCAT Practice Questions</h5>
      </div>

      <div className="package-instruction__content">
        <h6>{currentPackage?.name}</h6>
        <p>Use this question bank to familiarise yourself with the types of questions in this subtest.</p>
        <p>
          Before using this question bank, we recommend you work through the relevant question tutorial as it includes
          in-depth tips and strategies on how to approach and answer each of the different question types within this
          subtest. Question Tutorials are available on the Preparation Resources section of the website.
        </p>
        <p>
          Each question bank contains a large number of questions (split into sections) that you may wish to attempt
          over several practice sessions.
        </p>
        <p>
          The 'Navigator' function at the bottom right of the screen allows you to navigate between questions and
          sections within the bank.
        </p>
        <p>
          Your progress through the question bank is not retained for future visits. It is therefore advisable to make a
          note of which questions you have attempted.
        </p>
        <p>
          As you progress through each question, you can click 'Explain Answer' at the top left of the screen to check
          the correct answer and read the answer rationale.
        </p>
        <p>
          An alternative way to check your answers is to use the 'Navigator' to skip to the final question, then click{' '}
          <strong>Next (N)</strong> to proceed to the Review Screen. The Review Screen will show which questions are
          answered incorrectly. You may click on a question number to return directly to its location in the bank, where
          you can check the correct answer and rationale by clicking ‘Explain Answer’ at the top of the screen.
        </p>
        <p>
          Click the <strong>Next (N)</strong> button when you are ready to begin.
        </p>
      </div>
    </div>
  );
};

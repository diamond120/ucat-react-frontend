import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from 'features/sessions/selectors';
import * as helpers from '../../SectionInstruction/SectionInstruction.helpers';

export const Instruction5 = () => {
  const currentSession = useSelector(selectors.selectCurrentSession);

  return (
    <div className="package-instruction__content">
      <p>
        <strong>You have 2 minutes to read these instructions.</strong>
      </p>
      <p>This exam consists of five subtests:</p>

      <table border={1} cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td rowSpan={2}>
              <p>
                <strong>Subtest</strong>
              </p>
            </td>
            <td rowSpan={2}>
              <p>
                <strong>Number of Questions</strong>
              </p>
            </td>
            <td colSpan={2}>
              <p>
                <strong>Subtest Time</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <strong>UCAT or UCAT_ANZ</strong>
              </p>
            </td>
            <td>
              <p>
                <strong>UCATSEN or UCAT_ANZ_SEN</strong>
              </p>
            </td>
          </tr>
          {currentSession.sections.map((section) => (
            <tr key={section.id}>
              <td>
                <p>{section.name}</p>
              </td>
              <td>
                <p>{section.questions.length}</p>
              </td>
              <td>
                <p>{helpers.humanizeDuration(section.time)}</p>
              </td>
              <td>
                <p>{helpers.humanizeDuration(section.time)}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Please click the&nbsp;<strong>Next (N)</strong>&nbsp;button to proceed before the time on this screen expires.
      </p>
    </div>
  );
};

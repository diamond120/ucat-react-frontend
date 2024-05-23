import type { Section } from 'features/sessions/types';

import React from 'react';
import * as helpers from '../SectionInstruction.helpers';

export const DecisionMaking = ({ section }: { section: Section }) => {
  return (
    <div className="section-instruction__content-dm">
      <p>
        <strong>
          The time allocated for reading these instructions is in the top right of the screen. When the time expires the
          subtest will begin.
        </strong>
      </p>

      <h6>DECISION MAKING INSTRUCTIONS</h6>

      <table border={1} cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
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
          <tr>
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
        </tbody>
      </table>

      <p>
        In this subtest you will be presented with questions that may refer to text, charts, tables, graphs or diagrams.
        Additional information may be presented within the question itself. All questions are standalone and do not
        share data.
      </p>
      <p>Some questions have four answer options, but you may only select one response.</p>
      <p>
        Other questions require you to respond to five statements by placing a 'yes' or 'no' answer next to each
        statement.
      </p>
      <p>
        An onscreen calculator is available to assist you in this subtest &ndash; you can access this by clicking on the
        icon at the top left of the screen. The calculator can be operated by using the mouse or the number pad on the
        keyboard.
      </p>
      <p>Troubleshooting tips:</p>
      <ul>
        <li>Ensure that 'Num Lock' is on for the number pad to work.</li>
        <li>
          Most calculator issues can be resolved by clicking the ON/C button or closing the calculator and relaunching.
        </li>
      </ul>
      <p>You may also need to use your notebook and pen in this subtest.</p>
      <p>
        It is in your best interest to answer all questions as there is no penalty for guessing. All unanswered
        questions will be scored as incorrect.
      </p>
      <p>
        The 'Navigator' function at the bottom right of the screen allows you to navigate to questions within the
        subtest.
      </p>
      <p>
        Please click the&nbsp;<strong>Next (N)</strong>&nbsp;button to proceed before the time on this screen expires.
      </p>
    </div>
  );
};

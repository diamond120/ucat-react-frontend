import type { Section } from 'features/sessions/types';

import React from 'react';
import * as helpers from '../SectionInstruction.helpers';

export const VerbalReasoning = ({ section }: { section: Section }) => {
  return (
    <div className="section-instruction__content-vr">
      <p>
        <strong>
          The time allocated for reading these instructions is in the top right of the screen. When the time expires the
          subtest will begin.
        </strong>
      </p>

      <h6>VERBAL REASONING INSTRUCTIONS</h6>

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
        In this subtest you will be presented with 11 passages of text to read, each associated with four questions.
      </p>
      <p>Each question has three or four answer options. You may only select one response.</p>
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

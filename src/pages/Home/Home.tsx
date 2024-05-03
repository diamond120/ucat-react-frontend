import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from 'constants/routes';
import './_home.scss';

const MOCK_SESSION_ID = 1234;

export const Home = () => {
  // TODO:: Fetch all packages and list here

  return (
    <div className="home__container">
      <div className="home__qb-content">
        <div className="home__session-link--container">
          <Link to={`${routes.SESSION}/${MOCK_SESSION_ID}`}>Verbal Reasoning Question Bank</Link>
          <Link to={`${routes.SESSION}/${MOCK_SESSION_ID}`}>Decision Making Questions Bank</Link>
          <Link to={`${routes.SESSION}/${MOCK_SESSION_ID}`}>Quantitative Reasoning Question Bank</Link>
          <Link to={`${routes.SESSION}/${MOCK_SESSION_ID}`}>Abstract Reasoning Question Bank</Link>
          <Link to={`${routes.SESSION}/${MOCK_SESSION_ID}`}>Situational Judgement Question Bank</Link>
        </div>
        <div className="home__qb-comment">
          <h3>Question Banks</h3>
          <p>
            Use&nbsp;
            <span>
              these five question banks to familiarise yourself with the type of questions you will see in your
              test.&nbsp;&nbsp;
            </span>
            Each subtest bank contains a large number of questions which you may wish to attempt over several practice
            sessions.
          </p>
          <p>
            Your progress through the question bank is not retained for future visits. &nbsp;It is therefore advisable
            to make a note of which questions you have attempted.
          </p>
          <p>
            <span>These questions are intended to be&nbsp;</span>
            <span>viewed</span>
            <span>
              &nbsp;on desktop rather than mobile devices, so as to accurately reflect the live test experience
            </span>
            <span>.</span>
          </p>
        </div>
      </div>
      <div className="home__pt-content">
        <div className="home__pt-comment">
          <h3>Practice Tests</h3>
          <p>
            <span>
              An essential part of preparation as you near your test date should be using the four official UCAT
              practice tests under timed conditions.&nbsp; These are&nbsp;
              <span>
                available in the standard UCAT ANZ and extended UCATANZ SEN timings. We cannot offer practice tests with
                the timings in the UCATANZ SA, UCATANZ SEN10 or UCATSENSA but there are untimed versions you can
                utilise.
              </span>
            </span>
          </p>
          <p>
            <span>
              The practice tests are not set up to save your result or provide a score. The final review screen shows
              which of your answers are correct / incorrect.&nbsp; From this screen, you can return to each question to
              see the correct answer and display the answer rationale (by clicking the ‘Explain Answer’ button).&nbsp;
              <em>
                Please note that when you take the live test your correct and incorrect answers will not be reported.
              </em>
            </span>
          </p>
          <p>
            <span>
              These are intended to be&nbsp;viewed&nbsp;on desktop rather than mobile devices, so as to accurately
              reflect the live test experience.
            </span>
          </p>
        </div>
        <div className="home__session-link--container">
          <Link to={`${routes.SESSION}/${MOCK_SESSION_ID}`}>Practice Test A (UCAT)</Link>
          <Link to={`${routes.SESSION}/${MOCK_SESSION_ID}`}>Practice Test A (UCATSEN)</Link>
          <Link to={`${routes.SESSION}/${MOCK_SESSION_ID}`}>Practice Test A (Untimed)</Link>
        </div>
      </div>
    </div>
  );
};

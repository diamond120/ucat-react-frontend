import type { Package } from 'features/packages/types';
import type { StartSessionParams } from 'features/sessions/types';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPackagesQuery } from 'features/packages/api';
import { useStartSessionMutation } from 'features/sessions/api';
import * as variables from 'constants/variables';
import { Loading } from 'components';
import { PTComment } from './elements';
import * as routes from 'constants/routes';
import './_packages.scss';

export const Packages = () => {
  const navigate = useNavigate();

  const { data: packages = [], isLoading: isFetchingPackages } = useGetPackagesQuery();

  const [startSession, { data: sessionData, isLoading: isStartingSession, isSuccess: isSuccessSession }] =
    useStartSessionMutation();

  useEffect(() => {
    if (isSuccessSession && sessionData?.id) {
      navigate(`${routes.HOME}?session_id=${sessionData?.id}`);
    }
  }, [isSuccessSession, sessionData?.id]);

  const handleStartSession =
    (packageId: Package['id'], isOfficialSession: boolean = false) =>
    () => {
      const params: StartSessionParams = {
        user_id: variables.TEST_USER_ID,
        package_id: packageId,
        exam_code: variables.TEST_EXAM_CODE,
      };

      if (isOfficialSession) {
        params.redirect_url = variables.TEST_REDIRECT_URL;
      }

      startSession(params);
    };

  if (isFetchingPackages) {
    return <Loading />;
  }

  return (
    <div className="packages__container">
      <div className="packages__pt-content">
        <div className="packages__pt-comment">
          <PTComment />
        </div>
        <div className="packages__session-links">
          <div className="packages__session-links--content">
            <h3>Official</h3>
            {packages
              .filter(({ type }) => type === 'Practice Test')
              .map(({ id, name }) => (
                <a key={id} onClick={handleStartSession(id, true)}>
                  {name}
                </a>
              ))}
          </div>
          <div className="packages__session-links--content">
            <h3>Self</h3>
            {packages
              .filter(({ type }) => type === 'Practice Test')
              .map(({ id, name }) => (
                <a key={id} onClick={handleStartSession(id)}>
                  {name}
                </a>
              ))}
          </div>
        </div>
      </div>

      {isStartingSession && <Loading />}
    </div>
  );
};

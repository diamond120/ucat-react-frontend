import type { Package } from 'features/packages/types';

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

  const handleStartSession = (packageId: Package['id']) => () => {
    startSession({ user_id: variables.USER_ID, package_id: packageId });
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
        <div className="packages__session-link--container">
          {packages
            .filter(({ type }) => type === 'Practice Test')
            .map(({ id, name }) => (
              <a key={id} onClick={handleStartSession(id)}>
                {name}
              </a>
            ))}
        </div>
      </div>

      {isStartingSession && <Loading />}
    </div>
  );
};

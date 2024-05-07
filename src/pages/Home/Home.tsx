import type { Package } from 'features/packages/types';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPackagesQuery } from 'features/packages/api';
import { useStartSessionMutation } from 'features/sessions/api';
import * as variables from 'constants/variables';
import { Loading } from 'components';
import { QBComment, PTComment } from './elements';
import * as routes from 'constants/routes';
import './_home.scss';

export const Home = () => {
  const navigate = useNavigate();

  const { data: packages = [], isLoading: isFetchingPackages } = useGetPackagesQuery();

  const [startSession, { data: sessionData, isLoading: isStartingSession, isSuccess: isSuccessSession }] =
    useStartSessionMutation();

  useEffect(() => {
    if (isSuccessSession && sessionData?.id) {
      navigate(`${routes.SESSION}/${sessionData?.id}`);
    }
  }, [isSuccessSession, sessionData?.id]);

  const handleStartSession = (packageId: Package['id']) => () => {
    startSession({ user_id: variables.USER_ID, package_id: packageId });
  };

  if (isFetchingPackages) {
    return <Loading />;
  }

  return (
    <div className="home__container">
      <div className="home__qb-content">
        <div className="home__session-link--container">
          {packages
            .filter(({ type }) => type === 'Question Bank')
            .map(({ id, name }) => (
              <a key={id} onClick={handleStartSession(id)}>
                {name}
              </a>
            ))}
        </div>
        <div className="home__qb-comment">
          <QBComment />
        </div>
      </div>
      <div className="home__pt-content">
        <div className="home__pt-comment">
          <PTComment />
        </div>
        <div className="home__session-link--container">
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

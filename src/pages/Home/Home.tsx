import React from 'react';
import { Link } from 'react-router-dom';
import { useGetPackagesQuery } from 'features/packages/api';
import { QBComment, PTComment } from './elements';
import * as routes from 'constants/routes';
import './_home.scss';

export const Home = () => {
  const { data, isLoading } = useGetPackagesQuery('');

  console.log({ data, isLoading });
  // TODO:: Fetch all packages and list here

  return (
    <div className="home__container">
      <div className="home__qb-content">
        <div className="home__session-link--container">
          {data
            ?.filter(({ type }) => type === 'Question Bank')
            .map(({ id, name }) => (
              <Link key={id} to={`${routes.SESSION}/${id}`}>
                {name}
              </Link>
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
          {data
            ?.filter(({ type }) => type === 'Practice Test')
            .map(({ id, name }) => (
              <Link key={id} to={`${routes.SESSION}/${id}`}>
                {name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSessionQuery } from 'features/sessions/api';
import { Loading } from 'components';
import { Header, SubHeader, Footer } from './elements';
import * as routes from 'constants/routes';
import './_session.scss';

export const Session = () => {
  const navigate = useNavigate();
  const { session_id } = useParams();

  const sessionId = Number(session_id);
  const { isLoading, isError } = useGetSessionQuery({ session_id: sessionId });

  useEffect(() => {
    if (isError) {
      navigate(routes.RESTRICTED);
    }
  }, [isError]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="session__container">
      <Header />
      <SubHeader />
      <div className="session__content"></div>
      <Footer />
    </div>
  );
};

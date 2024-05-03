import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import * as routes from 'constants/routes';
import { Home, Session, Restricted } from './pages';

const App = () => {
  return (
    <div id="root">
      <Router>
        <Routes>
          <Route path={`${routes.SESSION}/:session_id`} element={<Session />} />
          <Route path={routes.HOME} element={<Home />} />
          <Route path={routes.RESTRICTED} element={<Restricted />} />
          <Route path="*" element={<Navigate to={routes.RESTRICTED} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

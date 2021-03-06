import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { RequiredToken } from './pages/protected/RequiredToken';
import { Authenticated } from './pages/protected/Authenticated';
import RedirectGoogleAuth from './pages/Redirect';

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequiredToken>
                <Home />
              </RequiredToken>
            }
          />
          <Route
            path="/login"
            element={
              <Authenticated>
                <Login />
              </Authenticated>
            }
          />
          <Route
            path="/register"
            element={
              <Authenticated>
                <Register />
              </Authenticated>
            }
          />
          <Route path="/auth/google/redirect" element={<RedirectGoogleAuth />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

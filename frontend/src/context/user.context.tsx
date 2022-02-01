import React, { createContext, useState } from 'react';

interface ICurrentUser {
  auth: boolean;
  login(accessToken: string, refreshToken: string): void;
  logout(): void;
}

const currentUser = {
  auth: false,
  login: () => {},
  logout: () => {},
};

const userContext = createContext<ICurrentUser>(currentUser);

const UserProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<boolean>(false);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('currentUser', JSON.stringify({ accessToken, refreshToken }));
    setAuth(true);
  };
  const logout = () => {
    localStorage.clear();
    setAuth(false);
  };

  const value = { auth, login, logout };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export { UserProvider, userContext };

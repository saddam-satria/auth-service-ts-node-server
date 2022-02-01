import { useContext } from 'react';
import { userContext } from '../context/user.context';

interface IAuth {
  auth: boolean;
  refreshToken: string;
  accessToken: string;
}

const useAuth = (): IAuth | boolean => {
  const currentToken = JSON.parse(localStorage.getItem('currentUser'));
  const { auth } = useContext(userContext);

  if (!currentToken) return false;

  const { accessToken, refreshToken } = currentToken;
  return {
    accessToken,
    refreshToken,
    auth,
  };
};

export default useAuth;

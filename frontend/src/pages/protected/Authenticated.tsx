import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/auth.hook';

export const Authenticated = ({ children }) => {
  const currentToken = useAuth() as any;

  return currentToken || currentToken.auth ? <Navigate to={'/'} /> : children;
};

import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/auth.hook';

export const RequiredToken: any = ({ children }) => {
  const currentToken = useAuth() as any;

  return currentToken || currentToken.auth ? children : <Navigate to={'/login'} />;
};

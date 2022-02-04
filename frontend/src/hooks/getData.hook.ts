import { useQuery, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { refreshTokenQuery } from '../graphql/queries/refreshToken.query';
import useAuth from '../hooks/auth.hook';

const GetDataHook = (query: any) => {
  const currentToken = useAuth() as any;

  const customHeader: { Authorization: string } = {
    Authorization: `Bearer ${currentToken.accessToken}`,
  };

  const { data, error } = useQuery(query, {
    context: {
      headers: customHeader,
    },
  });

  const [getNewToken, response] = useLazyQuery(refreshTokenQuery);

  useEffect(() => {
    if (error && error.message) {
      if (error.message.includes('token expired')) {
        getNewToken({
          variables: {
            refreshToken: currentToken.refreshToken,
          },
        });
      }
      if (error.message.includes('invalid token')) {
        localStorage.clear();
      }
    }
  }, [error, currentToken.refreshToken, getNewToken, response.data]);

  useEffect(() => {
    if (response.data) {
      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          accessToken: response.data.refreshToken.accessToken,
          refreshToken: currentToken.refreshToken,
        })
      );
    }
  }, [response.data, currentToken.refreshToken]);

  return data;
};

export default GetDataHook;

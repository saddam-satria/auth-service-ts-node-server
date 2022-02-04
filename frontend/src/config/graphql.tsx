import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';
import React, { ReactNode } from 'react';
import { SERVER_URL } from './constant';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${SERVER_URL}/graphql`,
});

const apolloWrapper: React.FC<ReactNode> = ({ children }): JSX.Element => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default apolloWrapper;

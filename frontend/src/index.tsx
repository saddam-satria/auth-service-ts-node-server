import React from 'react';
import reactDOM from 'react-dom';
import App from './App';
import './Global.css';
import ApolloWrapper from './config/graphql';
import { UserProvider } from './context/user.context';

const root = document.getElementById('root-app');

reactDOM.render(
  <UserProvider>
    <ApolloWrapper>
      <App />
    </ApolloWrapper>
    ,
  </UserProvider>,
  root
);

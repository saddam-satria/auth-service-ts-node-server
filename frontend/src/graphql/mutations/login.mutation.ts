import { gql } from '@apollo/client';

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      message
      refreshToken
      accessToken
    }
  }
`;

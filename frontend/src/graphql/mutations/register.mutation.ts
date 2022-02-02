import { gql } from '@apollo/client';

export const registerMutation = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(user: { name: $name, email: $email, password: $password }) {
      message
      accessToken
      refreshToken
      status
    }
  }
`;

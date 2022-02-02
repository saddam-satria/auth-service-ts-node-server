import { gql } from '@apollo/client';

export const UsersQuery = gql`
  query Users($accessToken: String!) {
    users(accessToken: $accessToken) {
      name
      email
      id
    }
  }
`;

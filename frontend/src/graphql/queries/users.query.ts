import { gql } from '@apollo/client';

export const UsersQuery = gql`
  query {
    users {
      name
      email
      id
    }
  }
`;

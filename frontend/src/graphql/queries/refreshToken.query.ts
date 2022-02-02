import { gql } from '@apollo/client';

export const refreshTokenQuery = gql`
  query RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`;
